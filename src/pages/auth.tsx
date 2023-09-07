import Input from '@/components/Input';
import axios from 'axios';
import React, {useCallback, useState} from 'react';
import {signIn} from 'next-auth/react';

import {FcGoogle} from 'react-icons/fc';
import {FaGithub} from 'react-icons/fa';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant =>
      currentVariant === 'login' ? 'register' : 'login',
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      });
    } catch (error) {
      console.error(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        username,
        password,
      });

      await login();
    } catch (error) {
      console.error(error);
    }
  }, [email, username, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input
                  id="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target?.value)
                  }
                  value={username}
                  label="Username"
                />
              )}
              <Input
                id="email"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target?.value)
                }
                value={email}
                label="Email or Phone Number"
              />
              <Input
                id="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target?.value)
                }
                value={password}
                label="Password"
                type="password"
              />
            </div>
            <button
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-rose-700 transition"
              onClick={variant === 'login' ? login : register}
            >
              {variant === 'login' ? 'Login' : 'Sign Up'}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn('google', {callbackUrl: '/profiles'})}
                className="w-10 h-10 bg-white rounded-full flex  items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', {callbackUrl: '/profiles'})}
                className="w-10 h-10 bg-white rounded-full flex  items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size="30" />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login'
                ? 'First time using Netflix?'
                : 'Already have an account?'}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
