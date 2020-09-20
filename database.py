from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
load_dotenv()

from whim_server import app, db
from whim_server.models import User, Merchant, Product, Option

with app.app_context():
  db.drop_all()
  db.create_all()

  #Users
  u_list = [
      User(email="demo@whim.com", hashed_password="password", first_name="Dianna", last_name="Coulter", pic_url="https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_2.png", created_at=datetime.now() - timedelta(days=370), updated_at=datetime.now() - timedelta(days=370)),
  ]

  # random.shuffle(u_list)
  for u in u_list:
    db.session.add(u)
    u.set_password('D3m0P4ssw0rd')
  db.session.commit()

  m_list = [
  Merchant(merchant_name="SuperStore", pic_url="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-merchants/1.png")
  ]
  for m in m_list:
    db.session.add(m)
  db.session.commit()

  p_list = [
      Product(name="Classic Western Cowboy Shirt High Quality Men Stylish Embroidered Slim Fit Casual Long Sleeve Button Down Party Shirts", description="754/5000<br>MEN CASUAL SHIRT: Long Sleeve Cotton Western Shirts Floral Embroidered<br>FEATURE: Turn-down collar, Long sleeve length, Single breasted closure type, Fancy wild rose embroidery on front, contrast color on sleeve and chest<br>Material: 98 % Cotton, 2 % Polyester<br>Slim Fit<br>Long Sleeve<br>Size: XS, S, M, L, XL, XXL, XXXL<br>MATERIAL: 98 % Cotton, 2 % Polyester, Good capability of tenderness, air permeability and moisture absorption feels soft and comfy<br>OCCASIONS: Suitable for leisure, formal work, Costume Parties, themed parties, steetwear, daily life<br>ATTENTION: The sizes of these shirts aren't like standard EU size. Please refer to our size chart in our gallery on the left side or the size chart in Description Part. Otherwise, the shirts you buy might not fit you.", product_imgs="https://whim-bucket.s3-us-west-1.amazonaws.com/whim-products/product-1/", product_imgs_amt=12, category="clothing", instant_buy=False, add_on=False, verified=True, merchant_id=1)
  ]
  
  for p in p_list:
    db.session.add(p)
  db.session.commit()
  
