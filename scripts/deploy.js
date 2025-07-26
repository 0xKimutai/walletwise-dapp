const hre = require("hardhat");

async function main() {
  console.log("Deploying SimpleToken contract...");

  const SimpleToken = await hre.ethers.getContractFactory("SimpleToken");
  const simpleToken = await SimpleToken.deploy();

  await simpleToken.waitForDeployment();

  const address = await simpleToken.getAddress();
  console.log("SimpleToken deployed to:", address);

  // Log some initial information
  const name = await simpleToken.name();
  const symbol = await simpleToken.symbol();
  const totalSupply = await simpleToken.totalSupply();
  const owner = await simpleToken.owner();

  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Total Supply:", hre.ethers.formatEther(totalSupply));
  console.log("Owner:", owner);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 