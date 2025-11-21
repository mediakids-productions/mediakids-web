import os
import urllib.request

images = [
    {'url': 'https://lh3.googleusercontent.com/u/0/d/1g9LEi54_CyfjNAD0QM0OM9EScC3nNIre=w2000', 'name': 'partner-1.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/1mwCZhaxyVoHDBDvNoybUMkpsIbc-7wGq=w2000', 'name': 'partner-2.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/19ogpzkPvsnsOrBuxk06VzeUUymCNB9od=w2000', 'name': 'partner-3.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/1KOshNinnfQSX3AJeNEkl_0_SkIJonpTN=w2000', 'name': 'partner-4.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/185gwH4nitPLQQfciT0dqm_Tx9OGsSiim=w2000', 'name': 'partner-5.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/1Lh8JQEFvmQ0NE6wP9uMiiJTMvIPpRbmt=w2000', 'name': 'journey-visa.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/12Y7QxFCCVxOdGCYzUO2zw2Z21EY2XbB2=w2000', 'name': 'testimonial-sarah.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/19tAwaFYL3jKtYH-aEVVP1AWh4xgJ6nX1=w2000', 'name': 'post-1.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/1ljLbiSsssZF1JuTGERGCV7y2Q7G7TbQD=w2000', 'name': 'post-2.jpg'},
    {'url': 'https://lh3.googleusercontent.com/u/0/d/1psArqXEfXnHw_uKw1t_aFHXrNLW2c01d=w2000', 'name': 'post-3.jpg'}
]

if not os.path.exists('images'):
    os.makedirs('images')

for img in images:
    print(f"Downloading {img['name']}...")
    try:
        urllib.request.urlretrieve(img['url'], f"images/{img['name']}")
        print(f"Downloaded {img['name']}")
    except Exception as e:
        print(f"Failed to download {img['name']}: {e}")
