import React, { useEffect, useRef } from 'react';
import '../../../styles/signUp.css';
import '../../../styles/logIn.css';


const SignUpSurvey = () => {


  return (
    <div className="landing__panel-right-wrapper">
      <div className="signup-user-collect__panel-wrapper" style={{ animation: `fadeIn 0.5s` }}>
        <div className="signup-user-collect__logo-wrapper">
          <svg className="signup-user-collect__logo-svg" viewBox="0 0 143 48" xmlns="http://www.w3.org/2000/svg">
            <g fill="#2fb7ec" fillRule="evenodd">
              <path d="M71.04 10.045c-.867-1.022-1.192-2.273-.974-3.757.217-1.48.91-2.734 2.076-3.755C73.309 1.51 74.629 1 76.105 1c1.475 0 2.647.511 3.513 1.533.868 1.02 1.192 2.274.975 3.755-.218 1.484-.91 2.735-2.076 3.757-1.168 1.02-2.49 1.532-3.964 1.532-1.476 0-2.647-.511-3.514-1.532M59.272 15.146c-1.732 0-3.343 1.411-3.582 3.134l-1.76 12.833c-.194 1.398-.864 2.61-2.008 3.638-1.145 1.028-2.435 1.542-3.865 1.542-1.392 0-2.52-.503-3.381-1.511-.864-1.007-1.195-2.23-.997-3.669l1.062-7.788c.032-1.554-1.134-2.77-2.742-2.77h-4.21c-1.608 0-3.112 1.216-3.508 2.77l-1.097 7.788c-.198 1.44-.87 2.662-2.012 3.669-1.142 1.008-2.409 1.511-3.799 1.511-1.392 0-2.528-.514-3.408-1.542-.881-1.027-1.224-2.24-1.031-3.638l2.358-17.028c.25-1.658-.732-3.39-2.23-4.093 0 0-17.758-7.402-18.915-7.878-1.172-.48-2.5.596-2.954 2.39L.108 8.787c-.455 1.794.57 3.834 2.275 4.533l11.901 4.926-1.783 12.867c-.598 4.315.413 8.007 3.038 11.069 2.624 3.064 6.084 4.594 10.382 4.594 3.967 0 7.59-1.335 10.865-4.008 2.616 2.673 5.89 4.008 9.818 4.008 4.297 0 8.181-1.53 11.654-4.594 3.472-3.062 5.508-6.754 6.106-11.069 0 0 1.865-13.579 1.899-13.816.162-1.184-1.12-2.15-2.851-2.15h-4.14zM76.717 15h-3.72c-1.557 0-3.005 1.267-3.22 2.815 0 0-3.747 26.755-3.764 26.886-.147 1.063 1.005 1.933 2.561 1.933h3.72c1.556 0 3.004-1.267 3.218-2.815l3.765-26.886C79.424 15.87 78.272 15 76.717 15M140.49 18.517c-2.133-2.517-5.02-3.776-8.663-3.776-3.644 0-7.046.798-10.4 3.693l2.375-16.463C123.952.887 122.776 0 121.19 0h-3.795c-1.589 0-3.067 1.292-3.284 2.873l-6.097 41.94c-.15 1.083 1.025 1.971 2.613 1.971h3.795c1.559 0 3.008-1.246 3.268-2.787h.005l1.91-13.08c.386-2.643 1.4-4.647 3.044-6.01 1.643-1.364 3.436-2.046 5.375-2.046 3.92 0 5.503 2.602 4.744 7.804l-2.035 14.108c-.15 1.084 1.026 1.971 2.614 1.971h3.793c1.59 0 3.066-1.292 3.286-2.873l2.345-15.283c.612-4.196-.148-7.554-2.28-10.071M105.235 23.153l1.775-2.266c.752-.96.77-2.437.045-3.447-.318-.547-1.242-1.078-2.086-1.534l-.095-.052c-2.67-1.448-5.294-1.994-8.772-1.824-3.778.185-7.002 1.3-9.581 3.315-2.6 2.03-4.07 4.601-4.366 7.64-.301 3.084.74 5.386 3.091 6.843 1.117.706 2.138 1.244 3.034 1.6.89.357 2.2.775 3.895 1.245 1.646.459 2.9.98 3.724 1.543.756.52 1.094 1.077 1.032 1.703-.063.654-.401 1.183-1.031 1.616-.655.45-1.53.706-2.598.758-2.888.141-5.605-.533-8.075-2.004l-1.833-1.015a1.853 1.853 0 0 0-.99-.224 1.938 1.938 0 0 0-1.444.742l-2.636 3.494c-.27.358-.376.787-.3 1.207.073.408.308.76.664.998.863.68 1.76 1.273 2.668 1.764a19.146 19.146 0 0 0 3.8 1.579c2.49.736 4.961 1.05 7.34.934 3.586-.176 6.684-1.306 9.21-3.36 2.543-2.067 3.99-4.755 4.307-7.989.321-3.282-.62-5.61-2.798-6.922-1.116-.662-2.102-1.152-2.932-1.456-.825-.3-2.22-.724-4.147-1.258-1.904-.526-3.27-1.008-4.063-1.43-.698-.372-.992-.87-.924-1.567.127-1.307 1.47-2.032 3.988-2.154 2.025-.1 4.057.368 6.029 1.383.405.223.852.49 1.26.752.507.283.897.396 1.269.377.548-.026 1.023-.331 1.54-.99z"></path>
            </g>
          </svg>
        </div>
        <div className="signup-user-collect__header">Tell us more about yourself!</div>
        <div className="signup-user-collect__survey-wrapper">
          <div className="signup-user-collect__question">Who do you shop for?</div>
          <div className="signup-user-collect__gender-buttons">
            <div className="signup-user-collect__gender-button-wrapper">
              <div className="signup-user-collect__gender-button">Women</div>
            </div>
            <div className="signup-user-collect__gender-button-wrapper last-button">
              <div className="signup-user-collect__gender-button gender-button-pressed">Men</div>
            </div>
          </div>
          <div className="signup-user-collect__question">How old are you?</div>
          <div height="48px" className="signup-user-collect__select-box">
            <div className="signup-user-collect__select-box-text">Select ...</div>
            <div className="signup-user-collect__select-box-dropdown-arrow">
              <svg className="signup-user-collect__select-box-svg" viewBox="0 0 8 5">
                <g fill="none" fillRule="evenodd">
                  <path d="M-4-6h16v16H-4z"></path>
                  <path d="M1 0a1.003 1.003 0 0 0-.71 1.71l3 3c.18.18.43.29.71.29.28 0 .53-.11.71-.29l3-3A1.003 1.003 0 0 0 7 0H1z" fill="#48636f"></path>
                </g>
              </svg>
            </div>
            <div className="signup-user-collect__select-box-dropdown">
              <div className="signup-user-collect__select-box-dropdown-item">13 - 17</div>
              <div className="signup-user-collect__select-box-dropdown-item">18 - 24</div>
              <div className="signup-user-collect__select-box-dropdown-item">25 - 29</div>
              <div className="signup-user-collect__select-box-dropdown-item">30 - 34</div>
              <div className="signup-user-collect__select-box-dropdown-item">35 - 39</div>
              <div className="signup-user-collect__select-box-dropdown-item">40 - 44</div>
              <div className="signup-user-collect__select-box-dropdown-item">45 - 49</div>
              <div className="signup-user-collect__select-box-dropdown-item">50 - 54</div>
              <div className="signup-user-collect__select-box-dropdown-item">55 - 64</div>
              <div className="signup-user-collect__select-box-dropdown-item">65+</div>
            </div>
          </div>
        </div>
        <div className="signup-user-collect__button-finish button-finish-pressed">Finish</div>
        <div className="signup-user-collect__trust-wrapper">
          <svg className="signup-user-collect__trust-svg" viewBox="0 0 36 36" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.3999 13.7866C11.2935 12.6455 14.0428 11.062 17.3187 9.90259C19.8352 10.9126 22.3144 11.9481 25.3488 13.7866C24.6554 23.2856 17.3743 27.3173 17.3743 27.3173C17.3743 27.3173 9.54144 22.0155 9.3999 13.7866Z" fill="#2fb7ec"></path>
            <path opacity="0.822634" fillRule="evenodd" clipRule="evenodd" d="M17.282 19.3725L15.3975 20.3997L15.8184 18.337L14.2329 16.9091L16.3774 16.6614L17.282 14.7517L18.1865 16.6614L20.331 16.9091L18.7455 18.337L19.1664 20.3997L17.282 19.3725Z" fill="white"></path>
          </svg>
          <div className="signup-user-collect__trust-words">Free returns for 30 days</div>
        </div>
      </div>
    </div>
  );
}
export default SignUpSurvey;
