import * as jwt from 'jsonwebtoken';
import { TokenData } from '../interfaces/Token';

export default class JWT {
  public sign(payload: TokenData) {
    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { algorithm: 'HS256', expiresIn: '30d' }
    );
  }

  public verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['HS256'] });
  }
}