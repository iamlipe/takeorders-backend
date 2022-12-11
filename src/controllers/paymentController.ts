import { Request, Response, raw } from 'express';
import { UserService } from '../services/userService';
import { PlanService } from '../services/planService';

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  typescript: true
})

export class PaymentController {
  private UserService: UserService;

  private PlanService: PlanService;

  constructor() {
    this.UserService = new UserService();
    this.PlanService = new PlanService();
  }

  public checkoutSession = async(req: Request, res: Response) => {
    const { userId, planId } = req.body;

    console.log(userId, planId);

    const SUCCESS_URL = `${process.env.URL}/payment/success/?userId=${userId}&planId=${planId}&sessionId={CHECKOUT_SESSION_ID}`;
    const CANCEL_URL = `${process.env.URL}/payment/canceled`;

    if (userId && planId) {
      
      // await this.UserService.existUser(userId);
      // await this.PlanService.existPlan(planId);
      
      const prices = await stripe.prices.list({
        lookup_keys: [req.body.lookup_key],
        expand: ['data.product'],
      });
      
      const session = await stripe.checkout.sessions.create({
        billing_address_collection: 'auto',
        line_items: [
          {
            price: prices.data[0].id,
            quantity: 1,
          },
        ],
        mode: 'subscription',
        success_url: SUCCESS_URL,
        cancel_url: CANCEL_URL,
      });
    
      return res.redirect(303, session.url);
    }

    return res.send('something went wrong')
  }

  public portalSession = async(req: Request, res: Response) => {
    const {sessionId, planId, userId } = req.query;

    const returnUrl = `https://www.google.com.br`;

    if (typeof sessionId === 'string' && typeof planId === 'string' && userId === 'string') {
      const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId);

      if (checkoutSession.payment_status === 'paid') {
        await this.UserService.subscription({ userId: userId, planId: planId })
        
        const portalSession = await stripe.billingPortal.sessions.create({
          customer: typeof checkoutSession.customer  === 'string' ? checkoutSession.customer : '',
          return_url: returnUrl,
        });

        res.redirect(303, portalSession.url);
      }

      return res.json({ error: checkoutSession.payment_status })
    }

    res.json({ error: 'invalid session_id' })
  }

  // public Webhook = async(req: Request, res: Response) => {
  //   raw({ type: 'application/json' }),
  //   (request: Request, response: Response) => {
  //     let event = request.body;
  //     // Replace this endpoint secret with your endpoint's unique secret
  //     // If you are testing with the CLI, find the secret by running 'stripe listen'
  //     // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
  //     // at https://dashboard.stripe.com/webhooks
  //     const endpointSecret = 'whsec_12345';
  //     // Only verify the event if you have an endpoint secret defined.
  //     // Otherwise use the basic event deserialized with JSON.parse
  //     if (endpointSecret) {
  //       // Get the signature sent by Stripe
  //       const signature = request.headers['stripe-signature'];
  //       try {
  //         event = stripe.webhooks.constructEvent(
  //           request.body,
  //           signature,
  //           endpointSecret
  //         );
  //       } catch (err) {
  //         console.log(`⚠️  Webhook signature verification failed.`, err.message);
  //         return response.sendStatus(400);
  //       }
  //     }
  //     let subscription;
  //     let status;
  //     // Handle the event
  //     switch (event.type) {
  //       case 'customer.subscription.trial_will_end':
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription trial ending.
  //         // handleSubscriptionTrialEnding(subscription);
  //         break;
  //       case 'customer.subscription.deleted':
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription deleted.
  //         // handleSubscriptionDeleted(subscriptionDeleted);
  //         break;
  //       case 'customer.subscription.created':
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription created.
  //         // handleSubscriptionCreated(subscription);
  //         break;
  //       case 'customer.subscription.updated':
  //         subscription = event.data.object;
  //         status = subscription.status;
  //         console.log(`Subscription status is ${status}.`);
  //         // Then define and call a method to handle the subscription update.
  //         // handleSubscriptionUpdated(subscription);
  //         break;
  //       default:
  //         // Unexpected event type
  //         console.log(`Unhandled event type ${event.type}.`);
  //     }
  //     // Return a 200 response to acknowledge receipt of the event
  //     response.send();
  //   }
  // }
}