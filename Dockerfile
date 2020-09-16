FROM nikolaik/python-nodejs:python3.8-nodejs14 as base

WORKDIR /var/www
COPY . .

# Install Python Dependencies
RUN ["pip", "install", "-r", "requirements.txt"]


# Build our React App
RUN ["npm", "install", "--prefix", "whim_client"]
ENV REACT_APP_BASE_URL=https://whim-app.herokuapp.com
RUN ["npm", "run", "build", "--prefix", "whim_client"]

# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
RUN ["cp", "-r", "whim_client/build/", "whim_server/static"]

# Setup Flask environment
ENV FLASK_APP=whim_server
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True
ENV SECRET_KEY=lkasjdf09ajsdkfljalsiorj12n3490re9485309irefvn,u90818734902139489230

EXPOSE 8000

# Run flask environment
CMD gunicorn whim_server:app
