
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Kpi } from '../interface/portfolio';

const MiniSparkline = ({
  data,
  color = "#10B981",
}: {
  data: number[];
  color?: string;
}) => (
  <div className="w-16 h-8">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data.map((value, index) => ({ value, index }))}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const KpiCard = ({ kpi, index }: { kpi: Kpi; index: number }) => {
  const Icon = kpi.icon;
  const trendColor =
    kpi.changeType === "positive" ? "text-green-500" : "text-red-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full"
    >
      <div className="p-4 sm:p-5 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-500 truncate">

              {kpi.title}
            </p>
            <div className="text-gray-400">
              <Icon size={20} />
            </div>
          </div>
          <h3 className="text-[32px] sm:text-[23px] font-extrabold text-black mt-2">
            {kpi.value}
          </h3>
        </div>
        <div className="mt-2">
          {kpi.subtitle && (
            <p className={`text-xs flex items-center ${trendColor}`}>
              {kpi.changeType === "positive" ? (
                <TrendingUp size={14} className="mr-1" />
              ) : (
                <TrendingDown size={14} className="mr-1" />
              )}
              <span>{kpi.subtitle}</span>
            </p>
          )}
          <div className="w-18 h-8 mt-1">
            {kpi.trend && <MiniSparkline data={kpi.trend} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const KpiCards: React.FC<{ kpis: Kpi[] }> = ({ kpis }) => {
  return (
    <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
      {kpis.map((kpi, i) => (
        <KpiCard key={i} kpi={kpi} index={i} />
      ))}
    </div>
  );
};