import db from '@/services/database';
import Product from '@/schemas/Product';

const handler = async (req, res) => {
  await db.connect();
  const product = await Product.findById(req.query.id);
  await db.disconnect();
  res.send(product);
};

export default handler;
