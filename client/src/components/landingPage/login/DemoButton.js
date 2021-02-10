import React from 'react';
import '../../../styles/logIn.css';

export default function DemoButton({ email, setEmail, password, setPassword }) {

  let i=0, k=0, spd = 25;
  const txt = 'demo@whim.com'
  const pwd = 'D3m0P4ssw0rd'

  const handleClick = e => {
    e.preventDefault();
    setEmail('')
    setPassword('')
    email = ''
    password = ''
    typeEmail()
    setTimeout(typePassword, spd*txt.length)
  }

  const typeEmail = () => {
    if (i < txt.length) {
      setEmail(email += txt.charAt(i))
      i++
      setTimeout(typeEmail, spd);
    }
  }

  const typePassword = () => {
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
