import React from 'react';
import WalletConnect from './components/WalletConnect';
import Dashboard from './components/Dashboard';
import { useWallet } from './hooks/useWallet';

function App() {
  const { walletState } = useWallet();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Web3 DApp</h1>
            <WalletConnect />
          </div>
        </div>
      </nav>
      <Dashboard />
    </div>
  );
}

export default App; 