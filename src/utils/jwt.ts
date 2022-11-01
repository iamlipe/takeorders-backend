import * as jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { TokenData } from '../interfaces/Token';

export default class JWT {
  private _password: string;

  constructor() {
    this._password = readFileSync('jwt.evaluation.key', { encoding: 'utf8' });
  }

  public sign(payload: TokenData) {
    return jwt.sign(payload, this._password, { algorithm: 'HS256', expiresIn: '1h' });
  }

  public verify(token: string) {
    return jwt.verify(token, this._password, { algorithms: ['HS256'] });
  }
}