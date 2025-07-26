# Deployment Guide

This guide will help you deploy the Web3 DApp to different networks.

## Prerequisites

1. **Node.js** (v16 or higher)
2. **MetaMask** browser extension
3. **Test ETH** for gas fees (for testnet deployment)

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
# Private key for contract deployment (keep this secret!)
PRIVATE_KEY=your_private_key_here

# RPC URLs for different networks
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/your_project_id
MAINNET_RPC_URL=https://mainnet.infura.io/v3/your_project_id

# Etherscan API key for contract verification
ETHERSCAN_API_KEY=your_etherscan_api_key
```

## Getting API Keys

### Infura
1. Go to [Infura](https://infura.io/)
2. Create an account and a new project
3. Copy the project ID and use it in the RPC URL

### Etherscan
1. Go to [Etherscan](https://etherscan.io/)
2. Create an account and get your API key
3. Use this key for contract verification

## Local Development

### Start Local Hardhat Node
```bash
npx hardhat node
```

### Deploy to Local Network
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Start Frontend
```bash
npm run dev
```

## Testnet Deployment (Sepolia)

### 1. Get Test ETH
- Visit [Sepolia Faucet](https://sepoliafaucet.com/)
- Request test ETH for your wallet

### 2. Deploy Contract
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 3. Verify Contract (Optional)
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

### 4. Update Frontend
Update the contract address in your frontend code with the deployed address.

## Mainnet Deployment

⚠️ **Warning**: Mainnet deployment requires real ETH and should be done carefully.

### 1. Ensure Contract is Tested
- Test thoroughly on testnets
- Audit your smart contract
- Have sufficient ETH for gas fees

### 2. Deploy Contract
```bash
npx hardhat run scripts/deploy.js --network mainnet
```

### 3. Verify Contract
```bash
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS
```

## Frontend Deployment

### Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build your project: `npm run build`
2. Upload the `dist` folder to Netlify

### IPFS (Decentralized)
1. Build your project: `npm run build`
2. Upload to IPFS using services like Fleek or Pinata

## Security Considerations

1. **Never commit private keys** to version control
2. **Use environment variables** for sensitive data
3. **Test thoroughly** on testnets before mainnet
4. **Audit your smart contracts** before deployment
5. **Keep your private keys secure** and backed up

## Troubleshooting

### Common Issues

1. **Insufficient Gas**: Ensure you have enough ETH for gas fees
2. **Network Issues**: Check your RPC URL configuration
3. **Contract Verification**: Make sure your contract is verified on Etherscan
4. **Frontend Issues**: Check browser console for errors

### Getting Help

- Check the [Hardhat documentation](https://hardhat.org/docs)
- Visit [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
- Join the [Ethereum Discord](https://discord.gg/ethereum)

## Next Steps

After deployment:

1. **Test all functionality** on the deployed network
2. **Monitor transactions** and contract interactions
3. **Update documentation** with deployed addresses
4. **Share your dapp** with the community! 