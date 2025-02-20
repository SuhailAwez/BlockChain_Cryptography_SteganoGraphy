import hashlib
from cryptography.fernet import Fernet
from stegano import lsb

from cryptography.fernet import Fernet

def generate_key():
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)

generate_key()
print("✅ Secret key generated and saved as 'secret.key'")

# 1️⃣ Load encryption key
def load_key():
    return open("secret.key", "rb").read()

# 2️⃣ Encrypt biometric data
def encrypt_biometric_data(data):
    key = load_key()
    cipher = Fernet(key)
    return cipher.encrypt(data.encode())

# 3️⃣ Hide encrypted data inside an image
def hide_in_image(image_path, encrypted_data):
    secret_img = lsb.hide(image_path, encrypted_data.decode())
    secret_img.save("stego_image.png")
    print("✅ Encrypted biometric data hidden in stego_image.png")

# 4️⃣ Generate SHA-256 hash of encrypted data
def generate_hash(data):
    return hashlib.sha256(data).hexdigest()

# Encrypt biometric hash
biometric_hash = "sample_biometric_hash"
encrypted_hash = encrypt_biometric_data(biometric_hash)

# Hide encrypted data inside an image
hide_in_image("chatbotimg.png", encrypted_hash)

# Generate a SHA-256 hash of the encrypted data
biometric_data_hash = generate_hash(encrypted_hash)

print(f"🔍 Generated Hash: {biometric_data_hash}")

# Save the hash to a file for blockchain storage
with open("biometric_hash.txt", "w") as file:
    file.write(biometric_data_hash)
