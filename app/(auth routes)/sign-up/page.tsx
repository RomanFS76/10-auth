'use client';

import css from './SignUpPage.module.css';
import { register } from '@/lib/api';
import {useAuthStore} from '@/lib/store/authStore'

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUpPage = () => {
  const [error, setError] = useState('');

  const {setUser} = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (formData: FormData): Promise<void> => {
    const userEmail = formData.get('email') as string;
    const userPassword = formData.get('password') as string;

    try {
      const res = await register({ email: userEmail, password: userPassword });
      console.log(res)
      if (res) {
        setUser(res);
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default SignUpPage;
