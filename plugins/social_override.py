import re

def on_page_context(context, page, config, **kwargs):
    if page.meta and 'image' in page.meta:
        page.custom_image = page.meta['image']
    return context

def on_post_page(output, page, config, **kwargs):
    if not hasattr(page, 'custom_image'):
        return output

    site_url = config['site_url'].rstrip('/')
    image_path = '/' + page.custom_image.lstrip('/')
    full_image_url = site_url + image_path

    for pattern, replacement in [
        (r'<meta(\s+)property="og:image"[^>]*?>', f'<meta property="og:image" content="{full_image_url}">'),
        (r'<meta(\s+)name="twitter:image"[^>]*?>', f'<meta name="twitter:image" content="{full_image_url}">'),
    ]:
        output = re.sub(pattern, replacement, output)

    return output
