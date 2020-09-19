from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
load_dotenv()

from whim_server import app, db
from whim_server.models import User

with app.app_context():
  db.drop_all()
  db.create_all()

  #Users
  u_list = [
      User(email="demo@whim.com", hashed_password="password", first_name="Teresa", last_name="Knupp",   pic_url="https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_1.png", created_at=datetime.now() - timedelta(days=370), updated_at=datetime.now() - timedelta(days=370)),
  ]

  # random.shuffle(u_list)
  for u in u_list:
    db.session.add(u)
    u.set_password('D3m0P4ssw0rd')
  db.session.commit()
