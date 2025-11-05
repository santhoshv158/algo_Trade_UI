
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, Eye, EyeOff, RefreshCw, Download } from 'lucide-react';
import { format } from 'date-fns';

interface PortfolioHeaderProps {
  title: string;
  subtitle: string;
  duration: string;
  showValues: boolean;
  setShowValues: (show: boolean) => void;
  refreshing: boolean;
  onRefresh: () => void;
}

export const PortfolioHeader: React.FC<PortfolioHeaderProps> = ({
  title,
  subtitle,
  duration,
  showValues,
  setShowValues,
  refreshing,
  onRefresh,
}) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Brain className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-100 via-pink-100 to-violet-100 bg-clip-text" style={{ color: 'var(--text-primary)' }}>
              {title}
            </h1>
          </div>
          <p className="text-gray-600 text-xs">{subtitle}</p>
          <p className="text-sm text-blue-400 font-medium mt-1">{duration}</p>
        </div>

        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 bg-orange-500 rounded-lg px-3 py-2">
            <Clock className="h-4 w-4 text-white" />
            <span className="text-xs text-white">
              Last updated: {format(new Date(), "HH:mm")}
            </span>
          </div>

          <button
            onClick={() => setShowValues(!showValues)}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 rounded-lg px-3 py-2 transition-colors"
          >
            {showValues ? (
              <Eye className="h-4 w-4 text-white" />
            ) : (
              <EyeOff className="h-4 w-4 text-white" />
            )}
            <span className="text-xs text-white">
              {showValues ? "Hide" : "Show"}
            </span>
          </button>

          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 rounded-lg px-3 py-2 transition-colors disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 text-white ${refreshing ? "animate-spin" : ""}`}
            />
            <span className="text-xs text-white">Refresh</span>
          </button>

          <button className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 rounded-lg px-3 py-2 transition-colors">
            <Download className="h-4 w-4 text-white" />
            <span className="text-xs text-white">Export</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
};