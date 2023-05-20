import User from '@/schemas/User';
import db from '@/services/database';
import Product from '@/schemas/Product';

const handler = async (req, res) => {
  await db.connect();
  await User.deleteMany();

  await Product.deleteMany();

  await db.disconnect();
  res.send({ message: 'success' });
};
export default handler;
