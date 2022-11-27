import { Router } from 'express';
import { SignatureController } from '../controllers/signatureController';

export class SignatureRouter {
  public router: Router;

  private SignatureController: SignatureController;

  constructor() {
    this.SignatureController = new SignatureController();
    this.router = Router();
    this.route();
  }

  private route(): void {
    this.router.post('/', this.SignatureController.create);
    this.router.get('/', this.SignatureController.get);
    this.router.get('/:id', this.SignatureController.getById);
    this.router.put('/:id', this.SignatureController.update);
    this.router.delete('/:id', this.SignatureController.remove);
  }
}