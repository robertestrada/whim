import React, { useEffect } from 'react';
import Loader from 'react-loader-spinner';
import '../../../styles/logIn.css';


const DemoButton = ({ emailLogin, setEmailLogin, passwordLogin, setPasswordLogin,
                      showDemoLoginLoader, setShowDemoLoginLoader, handleValidate
                    }) => {


  let i=0, k=0, spd = 25;
  const txt = 'demo@whim.com'
  const pwd = 'D3m0P4ssw0rd!'

  const handleClick = e => {
    e.preventDefault();
    setEmailLogin('')
    setPasswordLogin('')
    emailLogin = ''
    passwordLogin = ''
    typeEmail()
    setTimeout(typePassword, spd*txt.length)
  }

  const typeEmail = () => {
    if (i < txt.length) {
      setEmailLogin(emailLogin += txt.charAt(i))
      i++
      setTimeout(typeEmail, spd);
    }
  }

  const typePassword = () => {
    if (k < pwd.length) {
      setPasswordLogin(passwordLogin += pwd.charAt(k))
      k++;
      setTimeout(typePassword, spd);
    } else {
      setShowDemoLoginLoader(true);
    }
  }

  useEffect(() => {
    if (showDemoLoginLoader) {
      handleValidate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showDemoLoginLoader]);


  return (
    <button className="login__submit demo-button" onClick={handleClick}>
      { showDemoLoginLoader
        ? <Loader className="signup__submit-loader" type="ThreeDots" color="#ffffff" height={40} width={40} />
        : "Demo User"
      }
    </button>
  )
}

export default DemoButton;