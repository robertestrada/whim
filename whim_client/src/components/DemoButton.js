import React from 'react';
import '../styles/LogIn.css';

export default function DemoButton ({ email, setEmail, password, setPassword }) {

  let i=0, k=0, spd = 25;
  let txt = 'demo@whim.com'
  let pwd = 'D3m0P4ssw0rd'

  let handleClick = (e) => {
    e.preventDefault();
    setEmail('')
    setPassword('')
    email = ''
    password = ''
    typeEmail()
    setTimeout(typePassword, spd*txt.length)
  }

  function typeEmail() {
    if (i < txt.length) {
      setEmail(email += txt.charAt(i))
      i++
      setTimeout(typeEmail, spd);
    }
  }

  function typePassword() {
    if (k < pwd.length) {
      setPassword(password += pwd.charAt(k))
      k++;
      setTimeout(typePassword, spd);
    } else {
      document.querySelector('.login__submit.login-button').click()
    }
  }



  return (
    <button className="login__submit demo-button" onClick={handleClick}>Demo User</button>
  )
}
