import { NextApiRequest, NextApiResponse } from 'next';

import { TokenStorage } from '../../api/auth-exchange';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
  TokenStorage.remove();
  res.status(200).json({ message: 'bye-bye' });
}
