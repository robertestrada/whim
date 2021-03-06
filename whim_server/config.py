import os

class Config:
  SECRET_KEY=os.environ.get('SECRET_KEY')
  SQLALCHEMY_TRACK_MODIFICATIONS=False
  SQLALCHEMY_DATABASE_URI=os.environ.get('DATABASE_URL')
  SQLALCHEMY_ECHO=True
  JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
  JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
  JWT_BLACKLIST_ENABLED = True
  GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
  GOOGLE_API_KEY = os.environ.get('GOOGLE_API_KEY')
  RC_SITE_KEY = os.environ.get('RC_SITE_KEY')
