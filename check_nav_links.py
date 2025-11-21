import re

# Read HTML
with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all nav-page links with data-page
nav_links = re.findall(r'data-page="([^"]+)"[^>]*class="[^"]*nav-page', content)
nav_links += re.findall(r'class="[^"]*nav-page[^"]*"[^>]*data-page="([^"]+)"', content)

# Remove duplicates
nav_links = list(set(nav_links))

print(f"Found {len(nav_links)} unique nav-page data-page values:")
for link in sorted(nav_links):
    print(f"  - {link}")

# Find all section IDs
section_ids = re.findall(r'<section\s+id="([^"]+)"', content)

print(f"\nFound {len(section_ids)} section IDs:")
for sid in sorted(section_ids):
    print(f"  - {sid}")

# Check for missing pages
print("\n=== CHECKING MISSING PAGES ===")
missing = []
for link in nav_links:
    if link not in section_ids and link != 'main':
        missing.append(link)
        print(f"❌ MISSING: {link} - No section with this ID!")
    else:
        print(f"✅ OK: {link}")

if missing:
    print(f"\n⚠️ Found {len(missing)} missing pages!")
else:
    print("\n✅ All nav-page links point to existing sections!")
