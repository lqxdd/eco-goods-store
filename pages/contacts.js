import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';

export default function About() {
  return (
    <Layout title="About">
      <h1 className="text-xl text-center ">Зв'язатися з нами</h1>
      <div className="flex flex-col justify-center p-5 items-center">
        <p className="mb-4">support@ecosense.com</p>
        <div className="mb-10 flex justify-between">
          <button className="primary-button">
            <a href="mailto: support@ecosense.com">Написати лист</a>
          </button>
        </div>

        <p className="mb-4">+(38)-093-000-00-00</p>
        <div className="mb-10 flex justify-between">
          <button className="primary-button">
            <a href="tel:+380930000000">Зателефонувати</a>
          </button>
        </div>

        <p className="mb-4">Соціальні мережі</p>
        <div className="mb-2">
          <SocialIcon url="https://twitter.com/" />
        </div>
        <div className="mb-2">
          <SocialIcon url="https://instagram.com/" />
        </div>

        <div className="mb-2">
          <SocialIcon url="https://youtube.com/" />
        </div>

        <div className="mb-2">
          <SocialIcon url="https://tiktok.com/" />
        </div>

        <div className="mb-2">
          <SocialIcon url="https://telegram.com/" />
        </div>

        <div className="mb-2">
          <SocialIcon url="https://facebook.com/" />
        </div>
      </div>
    </Layout>
  );
}
