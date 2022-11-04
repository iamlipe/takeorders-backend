import 'express-async-errors';
import * as express from 'express';

import { Error } from './middlewares/error';
import { Auth } from './middlewares/auth';

import { LoginRouter } from './routes/login.routes';
import { RegisterRouter } from './routes/register.routes';
import { InvoiceRouter } from './routes/invoice.routes';
import { SpentRouter } from './routes/spent.routes';
import { StockRouter } from './routes/stock.routes';
import { CategoryRouter } from './routes/category.routes';
import { ProductRouter } from './routes/product.routes';
import { OrderRouter } from './routes/order.routes';
import { BillRouter } from './routes/bill.routes';
import { SaleRouter } from './routes/sale.routes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.route();
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,DELETE,OPTIONS,PUT,PATCH'
      );
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
  }

  private route(): void {
    this.app.use('/login', new LoginRouter().router);
    this.app.use('/register', new RegisterRouter().router);

    this.app.use(Auth.headers());
    this.app.use(Auth.jwt());

    this.app.use('/invoice', new InvoiceRouter().router);
    this.app.use('/spent', new SpentRouter().router);
    this.app.use('/stock', new StockRouter().router);
    this.app.use('/category', new CategoryRouter().router);
    this.app.use('/product', new ProductRouter().router);
    this.app.use('/order', new OrderRouter().router);
    this.app.use('/bill', new BillRouter().router);
    this.app.use('/sale', new SaleRouter().router);

    this.app.use(Error.yupError());
    this.app.use(Error.domainError());
    this.app.use(Error.serverError());
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Listening on ${PORT}`));
  }
}

export { App };
