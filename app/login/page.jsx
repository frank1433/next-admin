import React from 'react'
import styles from '@/app/ui/login/login.module.css'
function LoginPage
() {
  return (
    <div className={styles.container}>
        <form action="" className={styles.form}>
          <h1>Login</h1>
          <input type="text" placeholder='username'  name='username' />
          <input type="text" placeholder='password' name='password' />
           <button type='button'>Login</button>
        </form>
    </div>
  )
}

export default LoginPage