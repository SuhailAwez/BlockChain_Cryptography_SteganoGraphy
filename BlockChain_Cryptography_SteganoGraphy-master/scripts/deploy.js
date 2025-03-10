const hre = require("hardhat");

async function main() {
    // Get the contract factory
    const BioSecurity = await hre.ethers.getContractFactory("BioSecurity");

    // Deploy the contract
    const bioSecurity = await BioSecurity.deploy();

    // Wait for deployment to complete
    await bioSecurity.waitForDeployment();

    // Get the deployed contract address
    const contractAddress = await bioSecurity.getAddress();
    console.log("✅ Contract deployed at:", contractAddress);
}

main().catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
});
