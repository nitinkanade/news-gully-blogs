import json

with open('content/2026-08-23-android-17-features/metadata.json', 'r') as f:
    data = json.load(f)

data['wordCount'] = 2783

with open('content/2026-08-23-android-17-features/metadata.json', 'w') as f:
    json.dump(data, f, indent=2)
