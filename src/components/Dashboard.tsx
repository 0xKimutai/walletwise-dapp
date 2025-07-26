import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Activity, Send, RefreshCw, Wallet } from 'lucide-react';
import { ethers } from 'ethers';
import { useWallet } from '../hooks/useWallet';
import { TokenInfo, Transaction } from '../types/web3';
import Web3Info from './Web3Info';
import Notification from './Notification';

const Dashboard: React.FC = () => {
  const { walletState, provider, signer } = useWallet();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error' | 'info' | 'warning';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  // Mock token data - in a real app, you'd fetch this from your smart contract
  useEffect(() => {
    if (walletState.isConnected) {
      setTokenInfo({
        name: 'SimpleToken',
        symbol: 'SIMP',
        totalSupply: '1,000,000',
        balance: '1,250.50',
      });
    }
  }, [walletState.isConnected]);

  const refreshData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info') => {
    setNotification({
      message,
      type,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

  const sendTransaction = async () => {
    if (!signer) {
      showNotification('Please connect your wallet first!', 'warning');
      return;
    }
    
    try {
      const tx = await signer.sendTransaction({
        to: "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
        value: ethers.parseEther("0.001")
      });
      await tx.wait();
      showNotification('Transaction sent successfully!', 'success');
    } catch (error) {
      console.error('Transaction failed:', error);
      showNotification('Transaction failed!', 'error');
    }
  };

  const handleMintTokens = () => {
    if (!walletState.isConnected) {
      showNotification('Please connect your wallet to mint tokens!', 'warning');
      return;
    }
    showNotification('Mint tokens functionality - requires wallet connection', 'info');
  };

  const handleBurnTokens = () => {
    if (!walletState.isConnected) {
      showNotification('Please connect your wallet to burn tokens!', 'warning');
      return;
    }
    showNotification('Burn tokens functionality - requires wallet connection', 'info');
  };

  if (!walletState.isConnected) {
    return (
      <>
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
          onClose={hideNotification}
        />
        <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Activity className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to Web3 DApp
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore the decentralized world! Connect your wallet to view your balances, 
            manage tokens, and perform transactions. You can browse the dapp features 
            without connecting, but wallet connection is required for interactive features.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center gap-2 mx-auto"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet to Get Started
          </button>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Wallet Management</h3>
            <p className="text-gray-600">Connect your wallet to view balances and manage your digital assets.</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Token Operations</h3>
            <p className="text-gray-600">Mint, burn, and transfer your custom SimpleToken (SIMP).</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Send className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Transactions</h3>
            <p className="text-gray-600">Send ETH and view your transaction history.</p>
          </div>
        </div>

        {/* Token Information Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">SimpleToken (SIMP) Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Token Name</p>
              <p className="text-lg font-semibold text-gray-900">SimpleToken</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Token Symbol</p>
              <p className="text-lg font-semibold text-gray-900">SIMP</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-600">Total Supply</p>
              <p className="text-lg font-semibold text-gray-900">1,000,000 SIMP</p>
            </div>
          </div>
        </div>

        {/* Web3 Educational Content */}
        <Web3Info />
      </div>
      </>
    );
  }

  return (
    <>
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
      <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <button
          onClick={refreshData}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">ETH Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                {walletState.balance ? parseFloat(walletState.balance).toFixed(4) : '0.0000'}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Token Balance</p>
              <p className="text-2xl font-bold text-gray-900">
                {tokenInfo?.balance || '0.00'}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Supply</p>
              <p className="text-2xl font-bold text-gray-900">
                {tokenInfo?.totalSupply || '0'}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Network</p>
              <p className="text-2xl font-bold text-gray-900">
                {walletState.chainId === 1 ? 'Mainnet' :
                 walletState.chainId === 11155111 ? 'Sepolia' :
                 walletState.chainId === 1337 ? 'Local' : 'Unknown'}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Token Information */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Token Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Token Name</p>
            <p className="text-lg font-semibold text-gray-900">{tokenInfo?.name}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Token Symbol</p>
            <p className="text-lg font-semibold text-gray-900">{tokenInfo?.symbol}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm font-medium text-gray-600">Your Balance</p>
            <p className="text-lg font-semibold text-gray-900">{tokenInfo?.balance} {tokenInfo?.symbol}</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={sendTransaction}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Send className="w-5 h-5" />
            Send ETH
          </button>
          <button 
            onClick={handleMintTokens}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <Activity className="w-5 h-5" />
            Mint Tokens
          </button>
          <button 
            onClick={handleBurnTokens}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            <TrendingDown className="w-5 h-5" />
            Burn Tokens
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No transactions yet</p>
              <p className="text-sm">Your transaction history will appear here</p>
            </div>
          ) : (
            transactions.map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Send className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{tx.hash.slice(0, 10)}...</p>
                    <p className="text-sm text-gray-600">{new Date(tx.timestamp).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{tx.value} ETH</p>
                  <p className="text-sm text-gray-600">{tx.to.slice(0, 8)}...</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default Dashboard; 