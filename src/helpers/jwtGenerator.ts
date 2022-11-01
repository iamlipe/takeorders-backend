import * as jwt from 'jsonwebtoken';

import { TokenData } from '../interfaces/Token';

const jwtConfig = { expiresIn: '1d' };

const SECRET = process.env.JWT_SECRET;

export default (data: TokenData) => SECRET && jwt.sign({ data }, SECRET, jwtConfig);