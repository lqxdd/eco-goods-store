import Layout from '@/components/Layout';
import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import data from '@/utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '@/utils/Store';
import Product from '@/models/Product';
import db from '@/utils/db';
import axios from 'axios';
import { toast } from 'react-toastify';


export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {
    return <Layout title="Product Not Found">Товар не знайдено</Layout>;
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Товар закінчився');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href="/">Назад до товарів</Link>
      </div>

      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout="responsive"
          ></Image>
        </div>

        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Категорія: {product.category}</li>
            <li>Бренд: {product.brand}</li>
            <li>
              {product.rating} з {product.numReviews} відгуків
            </li>
            <li>Опис: {product.description}</li>
          </ul>
        </div>

        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Ціна</div>
              <div>{product.price} грн</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Статус</div>
              <div>
                {product.countInStock > 0 ? 'В наявності' : 'Немає в наявності'}
              </div>
            </div>
            <button
              className="primary-button w-full"
              onClick={addToCartHandler}
            >
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
