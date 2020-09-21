from dotenv import load_dotenv
from datetime import datetime, timedelta
import random
import string
load_dotenv()

from whim_server import app, db
from whim_server.models import User, Merchant, Product, Option

with app.app_context():
  db.drop_all()
  db.create_all()

  #Users
  u_list = [
      User(email="demo@whim.com", hashed_password="password", first_name="Miranda", last_name="Perez", pic_url="https://zenmo-bucket.s3-us-west-1.amazonaws.com/profile-photos/profile_photo_6.png", created_at=datetime.now() - timedelta(days=370), updated_at=datetime.now() - timedelta(days=370)),
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
      Product(name="Classic Western Cowboy Shirt High Quality Men Stylish Embroidered Slim Fit Casual Long Sleeve Button Down Party Shirts", description="754/5000<br>MEN CASUAL SHIRT: Long Sleeve Cotton Western Shirts Floral Embroidered<br>FEATURE: Turn-down collar, Long sleeve length, Single breasted closure type, Fancy wild rose embroidery on front, contrast color on sleeve and chest<br>Material: 98 % Cotton, 2 % Polyester<br>Slim Fit<br>Long Sleeve<br>Size: XS, S, M, L, XL, XXL, XXXL<br>MATERIAL: 98 % Cotton, 2 % Polyester, Good capability of tenderness, air permeability and moisture absorption feels soft and comfy<br>OCCASIONS: Suitable for leisure, formal work, Costume Parties, themed parties, steetwear, daily life<br>ATTENTION: The sizes of these shirts aren't like standard EU size. Please refer to our size chart in our gallery on the left side or the size chart in Description Part. Otherwise, the shirts you buy might not fit you.", product_imgs_amt=13, category="clothing", instant_buy=False, add_on=False, advert=True, shipping_speed=0, shipping_usa=True, verified=True, merchant_id=1),
      Product(name="1/2/4 Pack 96 LED Waterproof Flickering Flame Solar Torch Lights Outdoor Waterproof Landscape Decoration Lighting Lamp for Garden Yard Patio Lawn Pathways Night Lights", description="Feature:<br>1. Dancing Flames Design: Consists of 96 LEDs, each LED flickers warm yellow lights, dozens of changes of flame, mimic extremely realistic & natural dancing flames.<br>2. Auto On/Off from Dusk to Dawn: Solar lights with daylight sensor, auto solar power charging all day, then turn on the bulb automatically at dusk and turn it off when it's dawn.<br>3. Easy Installation: No wiring required, simply install flame solar lights outside like yard, pathways, pool, garden, bench, patio, fence, deck, or outdoor events like party, camping, barbecue, wedding, Christmas, Halloween festival.<br>4. Weatherproof Eternal Flame: P65 Waterproof and Durable, withstand all kinds of weather all-round the year.<br>5. Charge by the solar panel during the day time(17 % efficiency) and turn on automatically at weak light(2200mAh lithium battery). Eco-Friendly and Energy-Saving.<br><br>Specification:<br>Item Type: 96 LED Solar Lantern<br>Material: ABS + PS plastic<br>Waterproof Level: IP65<br>Battery Capacity: 3.7V/2200mAh Li-ion Battery(include)<br>Solar Panels: Monocrystalline Silicon 5.5V / 1.2W<br>Lamp Beads: SMD2835*96pcs<br>Charging time: 6-8 Hours(charging time will be influenced by weather condition)<br>Working Time: 10-12 Hours< br > <br > Package List: (Optional) < br > 1/2/4 x 96 LED Solar Lantern < br > 1/2/4 x Extend Pipe < br > 1/2/4 x Ground Spike < br > 1/2/4 x User Manual", product_imgs_amt=11, category="outdoor", instant_buy=True, add_on=False, advert=False, shipping_speed=0, shipping_usa=True, verified=False, merchant_id=1),
      Product(name="LIGE New steel Black smart watch men leather smart watch sport For iPhone Heart rate blood pressure Fitness tracker smartwatch", description="description<br>100 % new label and high quality<br>Operating mode one-touch<br>Open long press function key<br>1, open the manual<br>2, there is a QR code on the manual.<br>3, scan QR code download APP<br>4, open the Bluetooth connection clock<br>IP67 waterproof<br>Charging voltage 5 V current 1A to 2.1A charging time 2 hours<br>About 5 to 7 days standby time<br>All-day activity tracking: steps, calories burned, mileage and heart rate.<br>Smart reminder: call reminder, SMS push, sitting reminder.<br>More features: mobile search, remote camera shooting, stopwatch.<br>Continuous Heart Rate Monitor: Continuous, automatic heart rate tracking of your wrists every second.<br>Bluetooth 4.0, compatible with Android 4.1 and above, ios 8.0 and above.<br>Bracelet push support language: Chinese and English<br>APP support language Chinese, English, Japanese, Turkish, Spanish, German, Russian, Finnish, Arabic, French, Malay, Indonesian, Korean, Portuguese<br>Package included<br>Host, charger, wrist strap, manual, box", product_imgs_amt=16, category="technology", instant_buy=False, add_on=True, advert=True, shipping_speed=1, shipping_usa=True, verified=False, merchant_id=1),
  ]
  
  for i in range(1, 31):
    letters = string.ascii_letters
    name = f"Feed Dummy Product - #{''.join(random.choice(letters) for i in range(20))}"
    description = f"Dummy Product Description - {''.join(random.choice(letters) for i in range(40))}"
    p_list.append(Product(name=name, description=description, product_imgs_amt=1, category="clothing", instant_buy=False, add_on=False, advert=False, shipping_speed=random.randint(0, 1), shipping_usa=bool(random.getrandbits(1)), verified=bool(random.getrandbits(1)), merchant_id=1))
  
  for i in range(1, 31):
    letters = string.ascii_letters
    name = f"Feed Dummy Product - #{''.join(random.choice(letters) for i in range(20))}"
    description = f"Dummy Product Description - {''.join(random.choice(letters) for i in range(40))}"
    p_list.append(Product(name=name, description=description, product_imgs_amt=1, category="outdoor", instant_buy=False, add_on=False, advert=False, shipping_speed=random.randint(0, 1), shipping_usa=bool(random.getrandbits(1)), verified=bool(random.getrandbits(1)), merchant_id=1))
    
  for i in range(1, 31):
    letters = string.ascii_letters
    name = f"Feed Dummy Product - #{''.join(random.choice(letters) for i in range(20))}"
    description = f"Dummy Product Description - {''.join(random.choice(letters) for i in range(40))}"
    p_list.append(Product(name=name, description=description, product_imgs_amt=1, category="technology", instant_buy=False, add_on=False, advert=False, shipping_speed=random.randint(0, 1), shipping_usa=bool(random.getrandbits(1)), verified=bool(random.getrandbits(1)), merchant_id=1))
  
  for p in p_list:
    db.session.add(p)
  db.session.commit()
  
  o_list = [
      Option(size="xs", color="white", price_starting=16.00, price_ending=9.00, inventory_starting=10000, inventory_ending=800, weight=2.00, product_id=1),
      Option(size="xs", color="black", price_starting=20.00, price_ending=20.00, inventory_starting=20000, inventory_ending=10000, weight=2.00, product_id=1),
      Option(size="s", color="white", price_starting=20.00, price_ending=20.00, inventory_starting=5000, inventory_ending=2000, weight=2.00, product_id=1),
      Option(size="s", color="black", price_starting=20.00, price_ending=20.00, inventory_starting=6000, inventory_ending=4000, weight=2.00, product_id=1),
      Option(size="m", color="white", price_starting=20.00, price_ending=20.00, inventory_starting=9000, inventory_ending=3000, weight=2.00, product_id=1),
      Option(size="m", color="black", price_starting=20.00, price_ending=20.00, inventory_starting=7000, inventory_ending=4000, weight=2.00, product_id=1),
      Option(size="l", color="white", price_starting=20.00, price_ending=20.00, inventory_starting=2000, inventory_ending=1000, weight=2.00, product_id=1),
      Option(size="l", color="black", price_starting=20.00, price_ending=20.00, inventory_starting=3000, inventory_ending=2000, weight=2.00, product_id=1),
      Option(size="xl", color="white", price_starting=20.00, price_ending=20.00, inventory_starting=8000, inventory_ending=3000, weight=2.00, product_id=1),
      Option(size="xl", color="black", price_starting=20.00, price_ending=20.00, inventory_starting=1000, inventory_ending=500, weight=2.00, product_id=1),
      Option(size="1 pack", color="", price_starting=75.00, price_ending=16.00, inventory_starting=2000, inventory_ending=1800, weight=6.00, product_id=2),
      Option(size="2 pack", color="", price_starting=12.00, price_ending=12.00, inventory_starting=4000, inventory_ending=500, weight=10.00, product_id=2),
      Option(size="4 pack", color="", price_starting=34.00, price_ending=34.00, inventory_starting=6000, inventory_ending=1000, weight=20.00, product_id=2),
      Option(size="", color="black", price_starting=29.00, price_ending=29.00, inventory_starting=10000, inventory_ending=300, weight=1.00, product_id=3),
      Option(size="", color="gold", price_starting=29.00, price_ending=29.00, inventory_starting=8000, inventory_ending=700, weight=1.00, product_id=3),
      Option(size="", color="blue", price_starting=29.00, price_ending=29.00, inventory_starting=8000, inventory_ending=700, weight=1.00, product_id=3),
      Option(size="", color="silver & white", price_starting=29.00, price_ending=29.00, inventory_starting=8000, inventory_ending=700, weight=1.00, product_id=3),
  ]
  
  for i in range(4, 94):
    o_list.append(Option(size="", color="", price_starting=16.00, price_ending=9.00, inventory_starting=10000, inventory_ending=800, weight=2.00, product_id=i))
    
  for o in o_list:
    db.session.add(o)
  db.session.commit()
