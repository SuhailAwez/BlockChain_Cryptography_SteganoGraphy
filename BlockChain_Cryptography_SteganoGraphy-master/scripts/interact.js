require("dotenv").config();
const ethers = require("ethers");

const provider = ethers.getDefaultProvider("http://127.0.0.1:8545");

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Replace with your private key
const wallet = new ethers.Wallet(privateKey, provider);

const contractAddress = "0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1"; // Update with latest contract address
const abi = [
  "function registerUser() public",
  "function storeBioHash(bytes32 _bioHash) public",
  "function getBioHash(address _user) public view returns (bytes32)",
  "function isUserRegistered(address _user) public view returns (bool)",
  "function getAllUsers() public view returns (address[])"
];

const contract = new ethers.Contract(contractAddress, abi, wallet);

async function main() {
    console.log("✅ Connected to Blockchain");

    // Register user
    console.log("👤 Checking if user is registered...");
    const isRegistered = await contract.isUserRegistered(wallet.address);
    if (!isRegistered) {
        console.log("🚀 Registering user...");
        let tx = await contract.registerUser();
        await tx.wait();
        console.log("✅ User registered!");
    } else {
        console.log("✅ User is already registered.");
    }

    // Store biometric hash
    console.log("🔑 Storing Biometric Hash...");
    const bioHash = "0xf02ded9feedb92a7aaa267d5b4b520350a1164e4e4469e6652c1f22f2ade6580"; // Replace with actual hash
    let tx = await contract.storeBioHash(bioHash);
    await tx.wait();
    console.log(`✅ Biometric Hash Stored: ${bioHash}`);

    // Retrieve Biometric Hash
    console.log("🔍 Retrieving Hash...");
    const storedHash = await contract.getBioHash(wallet.address);
    console.log(`✅ Retrieved Hash: ${storedHash}`);

    // Fetch all registered users
    console.log("📜 Fetching all registered users...");
    const users = await contract.getAllUsers();
    console.log("✅ Registered Users:", users);

    // Retrieve stored hashes for all users
    for (let user of users) {
        const storedHash = await contract.getBioHash(user);
        console.log(`🔍 User: ${user}, Hash: ${storedHash}`);
    }
}

main().catch((error) => {
    console.error("Error:", error);
});
