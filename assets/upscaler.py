from PIL import Image

# Load the image
image_path = "./CubicToucan.png"
image = Image.open(image_path)

# Resize the image to be bigger
new_size = (image.width * 8, image.height * 8)
resized_image = image.resize(new_size, Image.NEAREST)

# Save the resized image
resized_image_path = "./Toucan.png"
resized_image.save(resized_image_path)