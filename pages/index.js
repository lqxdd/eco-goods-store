import Format from '@/components/Format';
import Item from '@/components/Item';
import Product from '@/schemas/Product';
import db from '@/services/database';
import { Store } from '@/services/Save';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { useEffect } from 'react';

export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Товару немає в наявності');
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Товар доданий у кошик');
  };

  return (
    <Format title="Головна">
      <p className="descr">
        🌿 Розкрийте свою свідомість та прийміть виклик бути екологічно
        відповідальними. У нашому магазині ви знайдете величезний вибір
        екологічно чистих продуктів, які допоможуть вам створити здорове та
        екологічно збалансоване життя 🌿
      </p>
      <h1 className="h2 my-4">Товари</h1>
      <div></div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Item
            product={product}
            key={product.slug}
            addToCartHandler={addToCartHandler}
          ></Item>
        ))}
      </div>
    </Format>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
