import Image from 'next/image'
import css from './EditProfilePage.module.css'

const page = () => {
  return (
    <main className={css.mainContent}>
  <div className={css.profileCard}>
    <h1 className={css.formTitle}>Edit Profile</h1>

    <Image src="https://images.epochtimes.ru/uploads/06/cinema/169_05_06_10_Alise_2.jpg"
      alt="User Avatar"
      width={120}
      height={120}
      className={css.avatar}
    />

    <form className={css.profileInfo}>
      <div className={css.usernameWrapper}>
        <label htmlFor="username">Username:</label>
        <input id="username"
          type="text"
          className={css.input}
        />
      </div>

      <p>Email: user_email@example.com</p>

      <div className={css.actions}>
        <button type="submit" className={css.saveButton}>
          Save
        </button>
        <button type="button" className={css.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  </div>
</main>

  )
}

export default page