// src/api/mockApi.ts

export interface CapitalGains {
  stcg: { profits: number; losses: number };
  ltcg: { profits: number; losses: number };
}

export interface Holding {
  coin: string;
  coinName: string;
  logo: string;
  totalHoldings: number;
  averageBuyPrice: number;
  currentPrice: number;
  stcg: { gain: number; balance: number };
  ltcg: { gain: number; balance: number };
}

const initialCapitalGains: CapitalGains = {
  stcg: { profits: 100, losses: 500 },
  ltcg: { profits: 1200, losses: 100 },
};

const holdingsData: Holding[] = [
  {
    coin: "ETH",
    coinName: "Ethereum",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    totalHoldings: 5,
    averageBuyPrice: 1200,
    currentPrice: 1400,
    stcg: { gain: 500, balance: 3 },
    ltcg: { gain: -1000, balance: 2 },
  },
  // Add more holdings if you want for testing
  {
    coin: "BTC",
    coinName: "Bitcoin",
    logo: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
    totalHoldings: 2,
    averageBuyPrice: 20000,
    currentPrice: 30000,
    stcg: { gain: 1000, balance: 1 },
    ltcg: { gain: 2000, balance: 1 },
  },
];

export function fetchCapitalGains(): Promise<CapitalGains> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(initialCapitalGains), 500);
  });
}

export function fetchHoldings(): Promise<Holding[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(holdingsData), 500);
  });
}
