import re
import os
from urllib.parse import unquote

def verify_links():
    html_path = r'f:\global_teach_thailand\index.html'
    base_dir = os.path.dirname(html_path)
    
    with open(html_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Find all src attributes
    # This regex is simple and might miss some edge cases but good for a quick check
    # It looks for src="value" or src='value'
    src_matches = re.finditer(r'src=["\']([^"\']+)["\']', content)
    
    missing_files = []
    external_links = []
    local_links_count = 0
    
    print(f"Scanning {html_path}...")
    
    for match in src_matches:
        src = match.group(1)
        
        # Skip data URIs
        if src.startswith('data:'):
            continue
            
        # Check if external
        if src.startswith('http://') or src.startswith('https://'):
            external_links.append(src)
            continue
            
        # It's a local link
        local_links_count += 1
        
        # Resolve path
        # Handle absolute paths starting with / (assuming relative to project root)
        if src.startswith('/'):
            local_path = os.path.join(base_dir, src.lstrip('/'))
        else:
            local_path = os.path.join(base_dir, src)
            
        # Unquote URL (e.g. %20 to space)
        local_path = unquote(local_path)
        
        if not os.path.exists(local_path):
            missing_files.append(src)
            
    print(f"Found {local_links_count} local links.")
    print(f"Found {len(external_links)} external links.")
    
    if external_links:
        print("\nExternal Links (should only be scripts/CDNs):")
        for link in external_links:
            print(f" - {link}")
            
    if missing_files:
        print("\nMISSING FILES:")
        for file in missing_files:
            print(f" - {file}")
    else:
        print("\nAll local files exist!")

if __name__ == "__main__":
    verify_links()
