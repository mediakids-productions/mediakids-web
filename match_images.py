import re
import os
from difflib import SequenceMatcher

def get_context(content, start, end, window=100):
    # Get text around the match, cleaning up whitespace
    pre = content[max(0, start-window):start].replace('\n', ' ').replace('\r', '')
    post = content[end:min(len(content), end+window)].replace('\n', ' ').replace('\r', '')
    return (pre + post).strip()

def match_images():
    # Read current file (with broken links)
    try:
        with open('index.html', 'r', encoding='utf-8') as f:
            current_content = f.read()
    except Exception as e:
        print(f"Error reading index.html: {e}")
        return

    # Read old file (with original links)
    # Handle potential encoding issues from PowerShell redirection
    try:
        with open('index_old.html', 'r', encoding='utf-16') as f:
            old_content = f.read()
    except:
        try:
            with open('index_old.html', 'r', encoding='utf-8') as f:
                old_content = f.read()
        except Exception as e:
            print(f"Error reading index_old.html: {e}")
            return

    # Find broken links in current file
    # Looking for remaining-image-*.jpg and external-image-*.jpg
    broken_pattern = re.compile(r'src=["\'](images/(?:remaining|external)-image-[^"\']+)["\']')
    broken_matches = []
    for m in broken_pattern.finditer(current_content):
        context = get_context(current_content, m.start(), m.end())
        broken_matches.append({
            'file': m.group(1),
            'context': context,
            'full_match': m.group(0)
        })

    print(f"Found {len(broken_matches)} broken links in index.html")

    # Find original links in old file
    # Looking for http* images
    original_pattern = re.compile(r'src=["\'](http[^"\']+)["\']', re.IGNORECASE)
    original_matches = []
    for m in original_pattern.finditer(old_content):
        context = get_context(old_content, m.start(), m.end())
        original_matches.append({
            'url': m.group(1),
            'context': context
        })

    print(f"Found {len(original_matches)} external links in index_old.html")

    # Match them up
    restored_count = 0
    download_script = []
    
    print("\nMatches:")
    for broken in broken_matches:
        best_ratio = 0
        best_url = None
        
        for original in original_matches:
            # Calculate similarity of context
            ratio = SequenceMatcher(None, broken['context'], original['context']).ratio()
            if ratio > best_ratio:
                best_ratio = ratio
                best_url = original['url']
        
        if best_ratio > 0.6: # Threshold for match
            print(f"  {broken['file']} -> {best_url} (Confidence: {best_ratio:.2f})")
            restored_count += 1
            # Add to download list
            download_script.append((best_url, broken['file']))
        else:
            print(f"  NO MATCH FOUND for {broken['file']} (Best: {best_ratio:.2f})")

    # Generate a restore script
    if download_script:
        with open('restore_images.py', 'w', encoding='utf-8') as f:
            f.write("import urllib.request\nimport os\n\n")
            f.write("def restore():\n")
            f.write("    if not os.path.exists('images'): os.makedirs('images')\n")
            f.write("    images = [\n")
            for url, filename in download_script:
                # filename includes images/ prefix, remove it for the list if we join later, 
                # but here let's keep it simple
                clean_filename = filename.replace('images/', '')
                f.write(f"        ('{url}', 'images/{clean_filename}'),\n")
            f.write("    ]\n\n")
            f.write("    for url, path in images:\n")
            f.write("        print(f'Downloading {url} to {path}...')\n")
            f.write("        try:\n")
            f.write("            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})\n")
            f.write("            with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:\n")
            f.write("                out_file.write(response.read())\n")
            f.write("        except Exception as e:\n")
            f.write("            print(f'Failed: {e}')\n")
            
        print(f"\nGenerated restore_images.py with {len(download_script)} images.")

if __name__ == "__main__":
    match_images()
