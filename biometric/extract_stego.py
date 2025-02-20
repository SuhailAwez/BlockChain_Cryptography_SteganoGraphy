from cryptography.fernet import Fernet
from stegano.lsb import reveal

# Load the secret key
def load_key():
    return open("secret.key", "rb").read()

# Decrypt biometric data
def decrypt_biometric_data(encrypted_data):
    key = load_key()
    cipher = Fernet(key)
    decrypted_data = cipher.decrypt(encrypted_data.encode())
    return decrypted_data.decode()

# Extract encrypted data from the image
def extract_from_image(image_path):
    return reveal(image_path)

# Main function
if __name__ == "__main__":
    stego_image_path = "stego_image.png"  # Make sure this file exists
    print("🔍 Extracting hidden data from stego image...")

    try:
        encrypted_data = extract_from_image(stego_image_path)
        decrypted_hash = decrypt_biometric_data(encrypted_data)
        print(f"✅ Decrypted Biometric Hash: {decrypted_hash}")
    except Exception as e:
        print("❌ Error:", e)
