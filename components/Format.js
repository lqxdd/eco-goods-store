import Head from 'next/head';
import React, { useContext, useEffect, useState } from 'react';
import { Store } from '../services/Save';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import { signOut, useSession } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { Menu } from '@headlessui/react';
import Dropdown from './Dropdown';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { SearchIcon } from '@heroicons/react/outline';

export default function Format({ title, children }) {
  const { status, data: session } = useSession();

  const { state, dispatch } = useContext(Store);
  const { cart: box } = state;

  const [boxItemsCount, setboxItemsCount] = useState(0);
  useEffect(() => {
    setboxItemsCount(box.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [box.cartItems]);

  const logoutClickHandler = () => {
    Cookies.remove('cart');
    dispatch({ type: 'CART_RESET' });
    signOut({ callbackUrl: '/login' });
  };

  const [query, setQuery] = useState('');

  const router = useRouter();
  const submitHandler = (e) => {
    e.preventDefault();
    router.push(`/search?query=${query}`);
  };

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute(
      'src',
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'uk',
        includedLanguages: 'en,fr,pl,ar,lv,ro,es,tr', // include this for selected languages
        layout: google.translate.TranslateElement.InlineLayout.VERTICAL,
        autoDisplay: false,
      },
      'google_translate_element'
    );
  };

  return (
    <>
      <Head>
        <title>{title ? title + ' - EcoSense' : 'Eco-goods Store'}</title>
        <meta
          name="description"
          content="Ласкаво просимо в магазин екотоварів EcoSense!"
        />

        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} />

      <div className="flex min-h-screen flex-col justify-between ">
        <header className="bg-slate-200">
          <nav className="flex h-12 items-center px-4 justify-between shadow-md">
            <div className="flex h-12 px-4 justify-between items-center shadow-inner">
             

              <div className="trn">
                <div classname="invisible" id="google_translate_element"></div>
              </div>

              <Link legacyBehavior href="/">
                <a className="text-lg font-bold">EcoSense</a>
              </Link>
            </div>

            <a className="text-lg font-bold" href="/about">
              Про нас
            </a>

            <div>
              <form
                onSubmit={submitHandler}
                className="mx-auto  hidden w-full justify-center md:flex searchform"
              >
                <input
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  className="rounded-tr-none rounded-br-none p-1 text-sm   focus:ring-0"
                  placeholder="Пошук товарів"
                />
                <button
                  className="rounded rounded-tl-none rounded-bl-none bg-cyan-400 p-1 text-sm dark:text-black"
                  type="submit"
                  id="button-addon2"
                >
                  <SearchIcon className="h-5 w-5"></SearchIcon>
                </button>
              </form>
            </div>

           

            <a className="text-lg font-bold" href="/contacts">
              Контакти
            </a>

            

            <div>

              <Link href="/korzina">
                <a className="p-2 text-lg font-bold">
                  Кошик
                  {boxItemsCount > 0 && (
                    <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                      {boxItemsCount}
                    </span>
                  )}
                </a>
              </Link>

              {status === 'loading' ? (
                'Loading'
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-600">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right bg-white  shadow-lg ">
                    <Menu.Item>
                      <Link className="dropdown-link" href="/account">
                        Профіль
                      </Link>
                    </Menu.Item>

                    <Menu.Item>
                      <a
                        className="dropdown-link"
                        href="#"
                        onClick={logoutClickHandler}
                      >
                        Вийти
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login">
                  <a className="p-2 text-lg font-bold">Логін</a>
                </Link>
              )}
            </div>
          </nav>
        </header>

        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-12 px-4 justify-between items-center shadow-inner">
          <div>
            <a href="/about">Про нас</a>
          </div>
          <p>Copyright © 2023 EcoSense</p>
          <a href="/contacts">Контакти</a>
        </footer>
      </div>
    </>
  );
}
