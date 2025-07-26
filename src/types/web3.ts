export interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
  chainId: number | null;
}

export interface TokenInfo {
  name: string;
  symbol: string;
  totalSupply: string;
  balance: string;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string;
  timestamp: number;
} 