import Confirm from '@/components/Confirm';
import Format from '@/components/Format';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Store } from '@/services/Save';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

export default function DostavkaPage() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [setValue, shippingAddress]);

  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );

    router.push('/payment');
  };

  return (
    <Format title="Shipping Address">
      <Confirm activeStep={1} />

      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Адреса доставки</h1>

        <div className="mb-4">
          <label htmlFor="fullName">ПІБ</label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Введіть ПІБ',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Адреса</label>
          <input
            className="w-full"
            id="address"
            {...register('address', {
              required: 'Введіть адресу',
              minLength: {
                value: 3,
                message: 'Адреса має містити більше 2 символів',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city">Місто</label>
          <input
            className="w-full"
            id="city"
            {...register('city', {
              required: 'Введіть місто',
            })}
          />
          {errors.city && (
            <div className="text-red-500 ">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode">Індекс</label>
          <input
            className="w-full"
            id="postalCode"
            {...register('postalCode', {
              required: 'Введіть індекс',
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500 ">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country">Країна</label>
          <input
            className="w-full"
            id="country"
            {...register('country', {
              required: 'Введіть країну',
            })}
          />
          {errors.country && (
            <div className="text-red-500 ">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Далі</button>
        </div>
      </form>
    </Format>
  );
}

DostavkaPage.auth = true;
