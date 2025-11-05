
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import {
  DollarSign,
  TrendingUp,
  CheckCircle,
  Percent,
  Activity,
  Shield,
} from "lucide-react";
import { PortfolioData } from "./portfolio";

export const generateMockData = (): PortfolioData => {
  const today = new Date();
  const lastMonth = subMonths(today, 1);
  const twoMonthsAgo = subMonths(today, 2);
  const threeMonthsAgo = subMonths(today, 3);

  const month3 = {
    date: threeMonthsAgo,
    name: format(threeMonthsAgo, "MMMM yyyy"),
    short: format(threeMonthsAgo, "MMM"),
  };
  const month2 = {
    date: twoMonthsAgo,
    name: format(twoMonthsAgo, "MMMM yyyy"),
    short: format(twoMonthsAgo, "MMM"),
  };
  const month1 = {
    date: lastMonth,
    name: format(lastMonth, "MMMM yyyy"),
    short: format(lastMonth, "MMM"),
  };

  return {
    header: {
      title: "Algorithmic Trading Portfolio",
      subtitle: "Advanced AI-Powered Investment Dashboard",
      duration: `${month3.name} - ${month1.name}`,
      lastUpdated: format(new Date(), "PPpp"),
    },
    kpis: [
      {
        title: "Portfolio Value",
        value: "₹12,88,450",
        subtitle: "+28.85%",
        icon: DollarSign,
        changeType: "positive",
        trend: [10000, 10500, 11200, 11800, 12400, 12884],
      },
      {
        title: "Total P&L",
        value: "₹2,88,450",
        subtitle: "+28.85%",
        icon: TrendingUp,
        changeType: "positive",
        trend: [0, 500, 1200, 1800, 2400, 2884],
      },
      {
        title: "Win Rate",
        value: "73.8%",
        subtitle: "+2.1%",
        icon: CheckCircle,
        changeType: "positive",
        trend: [70, 71, 72, 73, 74, 73.8],
      },
      {
        title: "Monthly Return",
        value: "8.81%",
        subtitle: "Avg",
        icon: Percent,
        changeType: "positive",
        trend: [8.2, 10.1, 9.3, 8.8, 9.1, 8.81],
      },
      {
        title: "Sharpe Ratio",
        value: "2.34",
        subtitle: "Excellent",
        icon: Activity,
        changeType: "positive",
        trend: [2.1, 2.2, 2.3, 2.4, 2.35, 2.34],
      },
      {
        title: "Max Drawdown",
        value: "4.2%",
        subtitle: "Low Risk",
        icon: Shield,
        changeType: "positive",
        trend: [5.1, 4.8, 4.5, 4.3, 4.1, 4.2],
      },
    ],
    // ... rest of the data structure
    monthlyReports: [],
    charts: {
      portfolioGrowth: [],
      monthlyReturns: [],
      winLoss: [],
      sectorAllocation: [],
    },
    trades: [],
    withdrawals: [],
    strategyNotes: "",
    riskMetrics: {
      var95: "₹45,230",
      beta: "0.85",
      correlation: "0.72",
      volatility: "18.5%",
    },
  };
};