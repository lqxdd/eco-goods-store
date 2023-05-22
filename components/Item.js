import React from 'react';
import Link from 'next/link';

export default function Item({ product, addToCartHandler }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <a>
          <img
            src={product.image}
            alt={product.name}
            className="rounded shadow"
          />
        </a>
      </Link>

      <div className="flex flex-col items-left justify-center p-5">
        <Link href={`/product/${product.slug}`}>
          <a>
            <h2 className="text-lg">{product.name}</h2>
          </a>
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p>{product.price} грн</p>
        <button
          className="primary-button"
          type="button"
          onClick={() => addToCartHandler(product)}
        >
          Додати в кошик
        </button>
      </div>
    </div>
  );
}
