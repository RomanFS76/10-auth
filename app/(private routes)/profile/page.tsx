

import Image from 'next/image';
import Link from 'next/link';
import css from './ProfilePage.module.css';
import { getMe } from '@/lib/api/serverApi';

const defaultLogo = '/default_foto.png';

const ProfilePage = async() => {


const {username,email,avatar} = await getMe();


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
            src={avatar ? "https://ac.goit.global/fullstack/react/default-avatar.jpg" : defaultLogo}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
