# Whim
Whim, a [Wish.com](https://whim-app.herokuapp.com/) clone, is a full-stack single-page web application where users can browse, search, filter, and save products in a cart by type and quantity before ordering.

Live Demo: [whim-app.herokuapp.com](https://whim-app.herokuapp.com/)
<br />
<br />

## Technologies
* Backend: Python / Flask / SQLAlchemy / Alembic / PostgreSQL
* Frontend: React / Redux / JavaScript / CSS3 / HTML / Google Oauth2 / Google ReCAPTCHA / Webpack / NPM
* Containerization: Docker
* Hosting: Heroku / SSL / AWS S3 (images)
<br />
<br />

## Features
* Secure frontend to backend user authentication using Werkzeug
* Dashboard displaying infinite feed of products available for purchase
* Product search with auto-suggest/keyboard-navigable using product keywords
* Product filtering by rating, price, and shipping speed using SQLAlchemy and Postgres trigrams
* Shopping cart for gathering products for checkout with adjustable quantities/deletion and checkout.
* Google invisible ReCAPTCHA & Secure Sockets Layer with HTTPS redirect to bolster user authentication and security
* Developed randomized, infinitely scrolling, and dynamically-resizing image carousels using CSS and React functions to entice user login
<br />
<br />

## User Actions
#### Authorization & Authentication
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-dynamic-1.gif)
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-signup-recaptcha-s-1.gif)
<br />
Auth features:
- Users must sign up and login to use any of the apps features.  The user has the option of traditionally signing up or creating an account through Google Oauth2.  
- There are 4 infinite scrolling arrays of random products next the login panel to appeal to the user signing up.  
- When the user attempts to sign up and create an account, Google ReCAPTCHA runs invisibly to make sure the user behavior is legitimately human and prompts the user with an iframe from Google if more verification is necessary.
<br />
<br />

### Dashboard & Feed
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-scroll-1.gif)
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-filter-1.gif)
<br />
Dashboard & Feed features:
- Once a user logs in, they are immediately redirected to their dashboard, which shows a product feed, navbar, search bar, and sidecart if there are products in their cart. 
- The feed shows a grid of products in an infinite scroll container that adjusts the amount of products on each row to the client's window size.  
- The feed shows a feed filter and filtering tabs when a search is executed and displayed in the feed.
<br />
<br />

#### Fetching Product Information
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-select-product-1.gif)
<br />
Fetching features:
- For each product displayed in the feed, an SQLAlchemy query is executed on the backend which produces all the relevant product data, from S3 hosted images to descriptive information.  
- A further more detailed query is made to display product information through a modal overlay when a product is clicked from the feed.
<br />
<br />

#### Search
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-search-1.gif)
<br />
Search features:
- As soon as a user enters a single character into the search field at the top of the Dashboard, a dropdown list of 10 keywords that start with that character immediately displays ranked in order according to most commonly found in all products.  
- Also, the input field initially shows the top keyword(s) as grayed out letters that complete the rest of the word.  As the user continues typing, the keywords delivered in the list readjust to keywords that start with the new, growing input search string.  
- A keyword in the list can be selected by cursor or directional keys and tabbing, and set as the search term to find specific products.
<br />
<br />

#### Cart
![](https://rme-portfolio.s3-us-west-2.amazonaws.com/whim-checkout-1.gif)
<br />
Cart features:
- A product may be added to the user's shopping cart based on inventory levels and user selected product options like quantity or type.  Items may be increased in quantity or removed.  
- When the user is ready, the checkout button can be pressed to end the project's demo of the ordering process.
<br />
<br />

## Installation
After downloading this repo, you must setup the front-end & back-end apps, as well as deployment files.
### Docker Setup
- In the Dockerfile at the top-level folder, you must set the "REACT_APP_BASE_URL" to the domain you wish to use: i.e. "https://whim-app.herokuapp.com".

### Back-end Setup
The whim_server app backend uses Python, Flask, SQLAlchemy, Alembic, and PostgreSQL for routing, models, and database migrations.  In development, the back-end address is "http://localhost:5000".

*Python Shell Setup:*
- In the /whim_server folder, you can install the python pip dependencies with: "pipenv install --python=python3".
- Once installed, you must enter the pipenv shell with "pipenv shell".  You can then start the backend with "flask run".

*.env Setup:*
- In the top-level folder, you must set your own key values in a .env file that follows the example of the .env.example file.  In particular, the following keys must be created by you: SECRET_KEY, DATABASE_URL, JWT_SECRET_KEY, RC_SITE_KEY, GOOGLE_API_KEY, GOOGLE_CLIENT_ID.  
- This app uses Google Oauth2 and invisible ReCAPTCHA, which will need you to create accounts and keys for use in the .env file.

*Database Setup:* 
- This app uses PostgreSQL for the database, so you will need to create a database with name, username, and password that you then use to adjust the DATABASE_URL key's value.  
- Also, this app requires installing trigram functionality in postgres.  Log in to postgres's interface in terminal and connect to the database you made with "psql -U <DB_USERNAME>" and then "\c <DB_NAME>".  
- Install the extension with: "CREATE EXTENSION pg_trgm;".   Then, upgrade the database with the models/tables with "pipenv run flask db upgrade".
- Then, to seed the database with the users, products, reviews, etc., run the following in the top most folder up a level: "python database.py".  This will take some time (~30 minutes) depending on your computer to create many tens of thousands of seeds.  
- Also, to re-initialize and run a new migration later, use the following commands in this order in /whim_server: "pipenv run flask db init", "pipenv run flask db migrate -m "create simple_people table"", "pipenv run flask db upgrade".  To downgrade the db, run: "pipenv run flask db downgrade".

### **Front-end React App Setup**
- In the /client folder, install dependencies by running "npm install --client".  Then, you can start the client app with "npm start".  The front-end address is "http://localhost:3000".  
- The front-end will fetch images from an AWS S3 bucket that have already been pulled and uploaded from real products on Wish.com.  There are 200 products in total, along with AI-generated fake user images and miscellaneous resource images.

### **Heroku Deployment & Docker Setup**
- First, create a new project in Heroku.  
- Then, under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".  
- For the environment variables, input the values consistent with what you used for the development.env file, except FLASK_ENV should be set to "production".  The "DATABASE_URL" key will be set automaticcally by heroku/postgres.  
- Then, install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command-line) in terminal.  In terminal in the top most folder, run "heroku login", and then log in to the heroku container registry "heroku container:login".  
- Update the `REACT_APP_BASE_URL` variable in the Dockerfile if you have not already.  This should be the full URL of your react app: i.e. "https://whim-app.herokuapp.com".  
- Push your docker container to heroku (this will build the dockerfile, and push) with "heroku container:push web -a whim-app", then release your docker container to heroku "heroku container:release web -a whim-app".  
- Finally, set up your database with "heroku run python -m database -a whim-app".