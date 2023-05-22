import Format from '@/components/Format';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '@/services/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function LoginPage() {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post('/api/auth/signup', {
        name,
        email,
        password,
      });

      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };
  return (
    <Format title="Create Account">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Створити акаунт</h1>
        <div className="mb-4">
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            className="w-full"
            id="name"
            autoFocus
            {...register('name', {
              required: 'Введіть ПІБ',
            })}
          />
          {errors.name && (
            <div className="text-red-500">{errors.name.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email">Пошта</label>
          <input
            type="email"
            {...register('email', {
              required: 'Введіть пошту',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Введіть правильну пошту',
              },
            })}
            className="w-full"
            id="email"
          ></input>
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            {...register('password', {
              required: 'Введіть пароль',
              minLength: { value: 6, message: 'Пароль менше 6 символів' },
            })}
            className="w-full"
            id="password"
            autoFocus
          ></input>
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword">Підтвердіть пароль </label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
              required: 'Введіть пароль повторно',
              validate: (value) => value === getValues('password'),
              minLength: {
                value: 6,
                message: 'Пароль менше 6 символів',
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="text-red-500 ">
              {errors.confirmPassword.message}
            </div>
          )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <div className="text-red-500 ">Паролі не співпадають</div>
            )}
        </div>

        <div className="mb-4 ">
          <button className="primary-button">Реєстрація</button>
        </div>
      </form>
    </Format>
  );
}
