from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
load_dotenv()

from whim_server import app, db
from whim_server.models import User, Friendship

with app.app_context():
  db.drop_all()
  db.create_all()

  #Users
  u_list = [
    User( email = "demo@zenmo.com", username = "magicalworld", hashed_password = "password", first_name = "Teresa", last_name = "Knupp",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_1.png", balance = 925.15, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "RandiJVarney@teleworm.us", username = "_sightunseen_", hashed_password = "password", first_name = "Randi", last_name = "Varney",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_2.png", balance = 694.16, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "CarrieRLuongo@teleworm.us", username = "_woldandmoon", hashed_password = "password", first_name = "Carrie", last_name = "Luongo",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_3.png", balance = 522.7, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "DiannaBCoulter@cuvox.de", username = "032c", hashed_password = "password", first_name = "Dianna", last_name = "Coulter",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_4.png", balance = 4.28, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "SharonDSchulz@armyspy.com", username = "4thandbleeker", hashed_password = "password", first_name = "Sharon", last_name = "Schulz",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_5.png", balance = 717.28, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "MartaTLove@einrot.com", username = "abhorrenceo", hashed_password = "password", first_name = "Marta", last_name = "Love",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_6.png", balance = 850.51, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "CynthiaDScott@rhyta.com", username = "actultracrepid", hashed_password = "password", first_name = "Cynthia", last_name = "Scott",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_7.png", balance = 13.4, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "MarianneBReyes@superrito.com", username = "alagnakrisk", hashed_password = "password", first_name = "Marianne", last_name = "Reyes",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_8.png", balance = 931.2, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "StaceyDEdwards@rhyta.com", username = "albertacakewalk", hashed_password = "password", first_name = "Stacey", last_name = "Edwards",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_9.png", balance = 965.05, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "DoreenEHagerty@superrito.com", username = "clawnew", hashed_password = "password", first_name = "Doreen", last_name = "Hagerty",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_10.png", balance = 526.59, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "AndrewMHickey@teleworm.us", username = "modularblazar", hashed_password = "password", first_name = "Andrew", last_name = "Hickey",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_11.png", balance = 37.75, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "HumbertoCThoreson@cuvox.de", username = "buseagnight", hashed_password = "password", first_name = "Humberto", last_name = "Thoreson",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_12.png", balance = 873.71, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "AnthonyASimon@jourrapide.com", username = "oulaings", hashed_password = "password", first_name = "Anthony", last_name = "Simon",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_13.png", balance = 102.55, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "RodrigoASlayton@rhyta.com", username = "thicho", hashed_password = "password", first_name = "Rodrigo", last_name = "Slayton",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_14.png", balance = 590.34, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "JamesPSimmons@fleckens.hu", username = "asciage", hashed_password = "password", first_name = "James", last_name = "Simmons",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_15.png", balance = 370.54, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "TyroneCLake@gustr.com", username = "agaricest", hashed_password = "password", first_name = "Tyrone", last_name = "Lake",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_16.png", balance = 822.49, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "DennisCMcBride@superrito.com", username = "ahmetrigue", hashed_password = "password", first_name = "Dennis", last_name = "McBride",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_17.png", balance = 107.78, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "EarlCHubbard@superrito.com", username = "aloold", hashed_password = "password", first_name = "Earl", last_name = "Hubbard",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_18.png", balance = 178.24, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "TomasMHawks@superrito.com", username = "annothing", hashed_password = "password", first_name = "Tomas", last_name = "Hawks",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_19.png", balance = 711.1, created_at = datetime.now() - timedelta(days = 370) ),
    User( email = "LarryLFernandez@gustr.com", username = "begather", hashed_password = "password", first_name = "Larry", last_name = "Fernandez",   picUrl = "https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_20.png", balance = 976.23, created_at = datetime.now() - timedelta(days = 370) ),
  ]

  random.shuffle(u_list)
  for u in u_list:
    db.session.add(u)
    u.set_password('P4ssword')
  db.session.commit()

  #Friendships
  users = User.query.all()
  for user1 in users:
    for user2 in users:
      if user1.id != user2.id:
        if random.random() < 0.2:
          user1.befriend(user2)
          db.session.commit()
          if random.random() < 0.8:
            user1.accept(user2)
            db.session.commit()