export interface Kpi {
  title: string;
  value: string;
  subtitle?: string;
  icon: any;
  changeType?: "positive" | "negative";
  trend?: number[];
}

export interface MonthlyReport {
  month: string;
  monthlyReturn: number;
  wins: number;
  losses: number;
  bestPerformer: { stock: string; return: number };
  worstPerformer: { stock: string; return: number };
  totalTrades: number;
  avgHoldTime: number;
}

export interface Trade {
  stock: string;
  buyPrice: number;
  sellPrice?: number;
  currentPrice?: number;
  returnPercentage: number;
  status: "Sold" | "Holding";
  buyDate: string;
  sellDate?: string;
  quantity: number;
  sector: string;
  liveChange?: number;
  liveChangePercent?: number;
}

export interface Withdrawal {
  date: string;
  amount: string;
  destination: string;
  status: "Completed" | "Pending";
}

export interface PortfolioData {
  header: {
    title: string;
    subtitle: string;
    duration: string;
    lastUpdated: string;
  };
  kpis: Kpi[];
  monthlyReports: MonthlyReport[];
  charts: {
    portfolioGrowth: any[];
    monthlyReturns: any[];
    winLoss: any[];
    sectorAllocation: any[];
  };
  trades: Trade[];
  withdrawals: Withdrawal[];
  strategyNotes: string;
  riskMetrics: {
    var95: string;
    beta: string;
    correlation: string;
    volatility: string;
  };
}