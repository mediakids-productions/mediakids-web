import re
import os
import urllib.request
import hashlib

def get_extension(url):
    if 'placehold.co' in url:
        return '.png'
    # Default to jpg for unsplash/google drive if not specified, but let's try to be smart
    if '.png' in url: return '.png'
    if '.svg' in url: return '.svg'
    return '.jpg'

def migrate_images():
    html_path = 'index.html'
    images_dir = 'images'
    
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
        
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find all unique external image URLs
    # Matches src="http..." or src='http...'
    matches = set(re.findall(r'src=["\'](http[^"\']+)["\']', content))
    
    # Also find background images if any (though grep didn't find many, let's be safe)
    # matches.update(re.findall(r'url\(["\']?(http[^"\')]+)["\']?\)', content))
    
    print(f"Found {len(matches)} unique external images.")
    
    replacements = {}
    
    for i, url in enumerate(matches):
        # Generate a filename
        # We can use a hash of the URL to ensure uniqueness and consistency
        # Or just a simple counter if we don't care about preserving names across runs
        # But let's try to keep some semantic meaning if possible
        
        filename = ""
        if "drive.google.com" in url or "googleusercontent.com" in url:
            filename = f"google-drive-image-{i}.jpg"
        elif "unsplash.com" in url:
            filename = f"unsplash-image-{i}.jpg"
        elif "placehold.co" in url:
            filename = f"placeholder-{i}.png"
        else:
            ext = get_extension(url)
            filename = f"external-image-{i}{ext}"
            
        local_path = f"{images_dir}/{filename}"
        
        print(f"Downloading {url} -> {local_path}...")
        
        try:
            # Add headers to mimic a browser to avoid 403s
            req = urllib.request.Request(
                url, 
                data=None, 
                headers={
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
                }
            )
            
            with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
                
            replacements[url] = local_path
            print("Success.")
            
        except Exception as e:
            print(f"Failed to download {url}: {e}")
            
    # Replace in content
    new_content = content
    for url, local_path in replacements.items():
        new_content = new_content.replace(url, local_path)
        
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Updated index.html with local paths.")

if __name__ == "__main__":
    migrate_images()
