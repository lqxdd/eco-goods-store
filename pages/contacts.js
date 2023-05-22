import { useRouter } from 'next/router';
import React from 'react';
import Format from '../components/Format';
import ReactDOM from 'react-dom';
import { SocialIcon } from 'react-social-icons';

export default function About() {
  return (
    <Format title="About">
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

        <div className="mb-2 mb-20">
          <SocialIcon url="https://facebook.com/" />
        </div>

        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSd6phuQSZMv1_lWv-9Qzc50VuTv55WLEgIABL2Ke2pu4P67Zg/viewform?embedded=true"
          width="640"
          height="500"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
        >
          Loading…
        </iframe>
      </div>
    </Format>
  );
}
