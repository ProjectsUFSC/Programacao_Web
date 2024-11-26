import qrcode
import random
import os

# Directory to save QR code images
output_dir = "qr_codes"
os.makedirs(output_dir, exist_ok=True)

# Generate 10 unique QR codes
for i in range(10):
    # Generate a random unique 5-digit number
    code = f"{random.randint(10000, 99999)}"
    
    # Create QR code
    qr = qrcode.QRCode(
        version=1,  # Controls the size of the QR Code, from 1 to 40
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(code)
    qr.make(fit=True)
    
    # Create an image of the QR code
    img = qr.make_image(fill="black", back_color="white")
    
    # Save the image as a PNG file
    img.save(os.path.join(output_dir, f"qr_code_{code}.png"))
    print(f"Saved QR code for {code}")

print(f"All QR codes saved in {output_dir}/")
