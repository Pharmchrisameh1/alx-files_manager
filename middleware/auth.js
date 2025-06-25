import redisClient from '../utils/redis';
import dbClient from '../utils/db';
import { ObjectId } from 'mongodb';

const authMiddleware = async (req, res, next) => {
  const token = req.header('X-Token');
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  const key = `auth_${token}`;
  const userId = await redisClient.get(key);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const user = await dbClient.usersCollection.findOne({ _id: ObjectId(userId) });
  if (!user) return res.status(401).json({ error: 'Unauthorized' });

  req.user = user;
  next();
};

export default authMiddleware;

