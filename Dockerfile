FROM nikolaik/python-nodejs:python3.8-nodejs14 as base

WORKDIR /var/www
COPY . .

# Install Python Dependencies
RUN ["pip", "install", "-r", "requirements.txt"]


# Build our React App
RUN ["npm", "install", "--prefix", "client"]
ENV REACT_APP_BASE_URL=https://whim-app.herokuapp.com
ENV REACT_APP_GOOGLE_CLIENT_ID=notsecret
ENV REACT_APP_GOOGLE_API_KEY=notsecret
RUN ["npm", "run", "build", "--prefix", "client"]

# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
RUN ["cp", "-r", "client/build/", "whim_server/static"]

# Setup Flask environment
ENV FLASK_APP=whim_server
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV SECRET_KEY=notsecret
ENV JWT_SECRET_KEY=notsecret

EXPOSE 8000

# Run flask environment
CMD gunicorn whim_server:app
