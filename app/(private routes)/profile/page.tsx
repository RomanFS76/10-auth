"use client"

import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import {useAuthStore} from '@/lib/store/authStore'


const Page = () => {
  const {user} = useAuthStore();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src="https://images.epochtimes.ru/uploads/06/cinema/169_05_06_10_Alise_2.jpg"
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user?.username}</p>
          <p>Email: {user?.email || 'Email not available'}</p>
        </div>
      </div>
    </main>
  );
};

export default Page;
