import urllib.request
import os

def restore():
    if not os.path.exists('images'): os.makedirs('images')
    images = [
        ('https://images.unsplash.com/photo-1531482615713-2c65a449abc1?q=80&w=2070&auto=format&fit=crop', 'images/remaining-image-1.jpg'),
        ('https://images.unsplash.com/photo-1533109721025-d1ae7de8437f?q=80&w=2070&auto=format&fit=crop', 'images/remaining-image-0.jpg'),
        ('https://images.unsplash.com/photo-1582265224397-cf9dc8bf4175?q=80&w=2069&auto=format&fit=crop', 'images/remaining-image-5.jpg'),
        ('https://images.unsplash.com/photo-1582265224397-cf9dc8bf4175?q=80&w=2069&auto=format&fit=crop', 'images/remaining-image-9.jpg'),
        ('https://images.unsplash.com/photo-1623100233155-2593d56a2373?q=80&w=2070&auto=format&fit=crop', 'images/remaining-image-10.jpg'),
        ('https://images.unsplash.com/photo-1582265224397-cf9dc8bf4175?q=80&w=2069&auto=format&fit=crop', 'images/remaining-image-7.jpg'),
        ('https://images.unsplash.com/photo-1582265224397-cf9dc8bf4175?q=80&w=2069&auto=format&fit=crop', 'images/remaining-image-6.jpg'),
        ('https://images.unsplash.com/photo-1589182333857-3c5836a3224b?q=80&w=2070&auto=format&fit=crop', 'images/remaining-image-3.jpg'),
        ('https://images.unsplash.com/photo-1582265224397-cf9dc8bf4175?q=80&w=2069&auto=format&fit=crop', 'images/remaining-image-4.jpg'),
        ('https://images.unsplash.com/photo-1611023995831-a83151b75225?q=80&w=1964&auto=format&fit=crop', 'images/remaining-image-2.jpg'),
        ('https://images.unsplash.com/photo-1588334434975-524d8542918b?q=80&w=2071&auto=format&fit=crop', 'images/remaining-image-4.jpg'),
        ('https://images.unsplash.com/photo-1582265224397-cf9dc8bf4175?q=80&w=2069&auto=format&fit=crop', 'images/remaining-image-8.jpg'),
        ('https://unpkg.com/aos@next/dist/aos.js', 'images/external-image-34.jpg'),
    ]

    for url, path in images:
        print(f'Downloading {url} to {path}...')
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
                out_file.write(response.read())
        except Exception as e:
            print(f'Failed: {e}')

if __name__ == "__main__":
    restore()
