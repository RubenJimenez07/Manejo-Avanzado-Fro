from PIL import Image
from pathlib import Path
base = Path('src/app/Páginas/Galería')
for path in sorted(base.glob('*.png')):
    try:
        with Image.open(path) as img:
            print(path.name, img.size, img.mode)
    except Exception as e:
        print(path.name, 'ERR', e)
