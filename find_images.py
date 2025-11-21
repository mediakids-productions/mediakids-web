import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all img src="..."
matches = re.findall(r'<img[^>]+src=["\'](http[^"\']+)["\']', content)

# Also find background images in style="..." if any (though user said logos)
# matches += re.findall(r'url\(["\']?(http[^"\')]+)["\']?\)', content)

unique_urls = sorted(list(set(matches)))

print(f"Found {len(unique_urls)} external images:")
for url in unique_urls:
    print(url)
