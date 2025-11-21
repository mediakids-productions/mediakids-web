import re
import os
import urllib.request
import shutil

def force_migrate():
    html_path = 'index.html'
    images_dir = 'images'
    placeholder_path = f'{images_dir}/placeholder.jpg'
    
    if not os.path.exists(images_dir):
        os.makedirs(images_dir)
        
    # Create a simple placeholder if it doesn't exist
    if not os.path.exists(placeholder_path):
        try:
            # Try to download a real placeholder
            urllib.request.urlretrieve('https://placehold.co/600x400/EEE/31343C?text=Image+Not+Found', placeholder_path)
        except:
            # Create a dummy file if internet fails completely
            with open(placeholder_path, 'wb') as f:
                f.write(b'Placeholder Image')

    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Find all remaining external images
    matches = set(re.findall(r'src=["\'](http[^"\']+)["\']', content))
    
    print(f"Found {len(matches)} remaining external images.")
    
    replacements = {}
    
    for i, url in enumerate(matches):
        filename = f"remaining-image-{i}.jpg"
        local_path = f"{images_dir}/{filename}"
        
        print(f"Processing {url}...")
        
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0'}
            )
            with urllib.request.urlopen(req) as response, open(local_path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"  Downloaded to {local_path}")
            replacements[url] = local_path
        except Exception as e:
            print(f"  Failed to download: {e}")
            print(f"  Using placeholder for {url}")
            # Copy placeholder to the specific filename so we have a unique file (optional, but good for caching)
            # Or just point to the single placeholder file
            # Let's point to the single placeholder to save space, OR copy it if we want unique filenames
            # Let's copy it so we can replace it later if needed
            shutil.copy(placeholder_path, local_path)
            replacements[url] = local_path
            
    # Replace in content
    new_content = content
    for url, local_path in replacements.items():
        new_content = new_content.replace(url, local_path)
        
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
    print("Updated index.html with local paths (including placeholders).")

if __name__ == "__main__":
    force_migrate()
