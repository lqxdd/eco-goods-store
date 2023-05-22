import Format from '@/components/Format';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { getError } from '@/services/error';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

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
    formState: { errors },
  } = useForm();
  const submitHandler = async ({ email, password }) => {
    try {
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
    <Format title="Login">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Логін</h1>
        <div className="mb-4">
          <label htmlFor="email">Пошта</label>
          <input
            type="email"
            {...register('email', {
              required: 'Введіть імейл',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Введіть правильний імейл',
              },
            })}
            className="w-full"
            id="email"
            autoFocus
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

        <div className="mb-4 ">
          <button className="primary-button">Логін</button>
        </div>
        <div className="mb-4 ">
          Немає акаунту? &nbsp;
          <Link href={`/register?redirect=${redirect || '/'}`}>Реєстрація</Link>
        </div>
      </form>
    </Format>
  );
}
