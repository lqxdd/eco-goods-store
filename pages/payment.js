import Confirm from '@/components/Confirm';
import Format from '@/components/Format';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '@/services/Save';
import Cookies from 'js-cookie';

export default function PaymentPage() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/order');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push('/dostavka');
    }
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router, shippingAddress.address]);

  return (
    <Format title="Payment Method">
      <Confirm activeStep={2} />

      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h1 className="mb-4 text-xl">Вид доставки</h1>
        {['Укрпошта', 'Нова Пошта', 'Meest Express'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              name="paymentMethod"
              className="p-2 outline-none focus:ring-0"
              id={payment}
              type="radio"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />

            <label className="p-2" htmlFor={payment}>
              {payment}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push('/dostavka')}
            type="button"
            className="default-button"
          >
            Назад
          </button>
          <button className="primary-button">Далі</button>
        </div>
      </form>
    </Format>
  );
}

PaymentPage.auth = true;
