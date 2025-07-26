import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { WalletState } from '../types/web3';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    balance: null,
    isConnected: false,
    chainId: null,
  });

  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setProvider(provider);
      setSigner(signer);
      setWalletState({
        address,
        balance: ethers.formatEther(balance),
        isConnected: true,
        chainId: Number(network.chainId),
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setProvider(null);
    setSigner(null);
    setWalletState({
      address: null,
      balance: null,
      isConnected: false,
      chainId: null,
    });
  }, []);

  const updateBalance = useCallback(async () => {
    if (provider && walletState.address) {
      try {
        const balance = await provider.getBalance(walletState.address);
        setWalletState(prev => ({
          ...prev,
          balance: ethers.formatEther(balance),
        }));
      } catch (error) {
        console.error('Error updating balance:', error);
      }
    }
  }, [provider, walletState.address]);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          connectWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners();
      }
    };
  }, [connectWallet, disconnectWallet]);

  return {
    walletState,
    provider,
    signer,
    connectWallet,
    disconnectWallet,
    updateBalance,
  };
}; 