# Whim

Whim, a Wish clone, is a social network for sharing products. Users can find, collect, and share products with their friends, enabling a connected shopping experience.

[Live Demo: whim-app.herokuapp.com](http://whim-app.herokuapp.com/)

## Technologies
* Backend: Flask/SQLAlchemy/Alembic/PostgreSQL
* Frontend: React/Redux

## Features
* Secure frontend to backend user authentication using Werkzeug
* Dashboard displaying infinite feed of products available for purchase
* Product search capability by keyword hits in product names, descriptions, and sellers
* Shopping cart for gathering products for checkout
* Checkout process to convert shopping cart items into a demonstrative order and shipping confirmation
* Wishlists for organizing various products that can be added to the cart at a later time

#### Authorization
Users must sign up and login to use any of the apps features.  There are 4 infinite scrolling arrays of random products next the login panel to appeal to the user signing up.

### Dashboard
Once a user logs in, they are immediately redirected to their dashboard, which shows a product feed, feed filters, and a navbar.

### Feed
The feed shows a grid of profucts in an infinite scroll container that adjusts the amount of products on each row to the client's window size.

#### Fetching Product Information
For each product displayed in the feed, an SQLAlchemy query is executed on the backend which produces all the relevant product data, from S3 hosted images to descriptive information.

#### Cart
A product may be added to the user's shopping cart based on inventory levels and user selected product options like quantity or type.

#### Checkout
The checkout button takes the user to the shipping and order confirmation pages, when where ordering information must be filled out.  When, it comes to payment information, the fields will be pre-filled and inaccessible to ensure that the clone is only for demonstration purposes.  The user will be able to confirm the order, and shown a final confirmation page before being redirected to the dashboard.
