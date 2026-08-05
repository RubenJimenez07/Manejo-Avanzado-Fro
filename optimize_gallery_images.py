from PIL import Image, ImageOps
from pathlib import Path

base = Path('src/app/Páginas/Galería')
max_width = 1280
max_height = 720

for path in sorted(base.glob('*.png')):
    with Image.open(path) as img:
        img = ImageOps.exif_transpose(img)
        if img.mode in ('RGBA', 'LA', 'P'):
            img = img.convert('RGBA')
        else:
            img = img.convert('RGB')

        width, height = img.size
        if width > max_width or height > max_height:
            scale = min(max_width / width, max_height / height)
            new_size = (max(1, int(width * scale)), max(1, int(height * scale)))
            img = img.resize(new_size, Image.Resampling.LANCZOS)

        img.save(path, format='PNG', optimize=True, compress_level=9)
