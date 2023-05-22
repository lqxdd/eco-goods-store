import React, { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { getError } from '@/services/error';
import axios from 'axios';
import Format from '@/components/Format';

export default function ProfilePage() {
  const { data: session } = useSession();

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue('name', session.user.name);
    setValue('email', session.user.email);
  }, [session.user, setValue]);

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.put('/api/auth/update', {
        name,
        email,
        password,
      });
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      toast.success('Profile updated successfully');
      if (result.error) {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <Format title="Profile">
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Оновити профіль</h1>

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
          <label htmlFor="email">Електронна пошта</label>
          <input
            type="email"
            className="w-full"
            id="email"
            {...register('email', {
              required: 'Введіть імейл',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                message: 'Please enter valid email',
              },
            })}
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="password">Пароль</label>
          <input
            className="w-full"
            type="password"
            id="password"
            {...register('password', {
              minLength: { value: 6, message: 'Пароль менше 6 символів' },
            })}
          />
          {errors.password && (
            <div className="text-red-500 ">{errors.password.message}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="confirmPassword">Підтвердіть пароль</label>
          <input
            className="w-full"
            type="password"
            id="confirmPassword"
            {...register('confirmPassword', {
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
        <div className="mb-4">
          <button className="primary-button">Оновити</button>
        </div>
      </form>
    </Format>
  );
}

ProfilePage.auth = true;
