const fs = require("fs");
const { ethers } = require("ethers");
require("dotenv").config();

// Load contract ABI & address
const contractABI = require("../artifacts/contracts/BioSecurity.sol/BioSecurity.json").abi;
const contractAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9"; // Update after deployment

// Ensure PRIVATE_KEY is set
if (!process.env.PRIVATE_KEY) {
    throw new Error("❌ PRIVATE_KEY is missing in .env file");
}

// Connect to Hardhat local network
const provider = new ethers.JsonRpcProvider("http://localhost:8545");
console.log("✅ Connected to Hardhat");

const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
console.log("🔑 Using Pre-Funded Account:", wallet.address);

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Read biometric hash from file
const biometricHash = fs.readFileSync("biometric_hash.txt", "utf-8").trim();
console.log("🔍 Biometric Hash to Store:", biometricHash);

// Function to store the hash on blockchain
async function storeHash(userId, hash) {
    const tx = await contract.storeBioHash(userId, hash);
    const receipt = await tx.wait();  // Wait for confirmation
    console.log("✅ Transaction Receipt:", receipt);
    console.log(`✅ Hash stored for ${userId}`);
}


// Function to retrieve stored hash
async function getHash(userId) {
    const storedHash = await contract.getBioHash(userId);
    console.log(`🔍 Retrieved Hash for ${userId}: ${storedHash}`);
}

// Execute main functions
(async () => {
    await storeHash("user123", biometricHash);
    await getHash("user123");
})();
// Function to verify extracted biometric hash
async function verifyHash(userId) {
    // Read extracted hash from file
    const extractedHash = fs.readFileSync("extracted_hash.txt", "utf-8").trim();
    console.log(`🧐 Extracted Hash from Image: ${extractedHash}`);

    // Retrieve stored hash from blockchain
    const storedHash = await contract.getBioHash(userId);
    console.log(`🔗 Blockchain Stored Hash: ${storedHash}`);

    // Compare hashes
    if (storedHash === extractedHash) {
        console.log("✅ Hash Matched! Biometric verification successful. 🔓");
    } else {
        console.log("❌ Hash Mismatch! Possible tampering detected. 🔐");
    }
}

// Execute verification
verifyHash("user123");
