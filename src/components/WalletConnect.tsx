import React from 'react';
import { Wallet, LogOut, Copy, Check } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

const WalletConnect: React.FC = () => {
  const { walletState, connectWallet, disconnectWallet } = useWallet();
  const [copied, setCopied] = React.useState(false);

  const copyAddress = async () => {
    if (walletState.address) {
      await navigator.clipboard.writeText(walletState.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!walletState.isConnected) {
    return (
      <button
        onClick={connectWallet}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
      >
        <Wallet className="w-5 h-5" />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Wallet Connected</h2>
        <button
          onClick={disconnectWallet}
          className="text-red-600 hover:text-red-700 transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Address:</span>
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-gray-900">
              {walletState.address && formatAddress(walletState.address)}
            </span>
            <button
              onClick={copyAddress}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Balance:</span>
          <span className="text-sm font-semibold text-gray-900">
            {walletState.balance ? `${parseFloat(walletState.balance).toFixed(4)} ETH` : 'Loading...'}
          </span>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm font-medium text-gray-600">Network:</span>
          <span className="text-sm font-semibold text-gray-900">
            {walletState.chainId === 1 ? 'Ethereum Mainnet' :
             walletState.chainId === 11155111 ? 'Sepolia Testnet' :
             walletState.chainId === 1337 ? 'Local Network' :
             `Chain ID: ${walletState.chainId}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WalletConnect; 