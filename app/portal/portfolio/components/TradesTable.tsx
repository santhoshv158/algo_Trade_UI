'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Trade } from '../interface/portfolio';
import { Card, CardHeader, CardTitle } from '@/app/common/components/card/Card';
import CardContent from '@mui/material/CardContent';

const Table = ({ children }: { children: React.ReactNode }) => (
  <div className="overflow-x-auto">
    <table className="w-full">{children}</table>
  </div>
);

const TableHeader = ({ children }: { children: React.ReactNode }) => (
  <thead className="bg-orange-500">{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => (
  <tbody className="divide-y divide-gray-200">{children}</tbody>
);

const TableHead = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <th
    className={`px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${className}`}
  >
    {children}
  </th>
);

const TableCell = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <td className={`px-4 py-3 text-sm text-gray-800 ${className}`}>{children}</td>
);

export const TradesTable: React.FC<{ trades: Trade[] }> = ({ trades }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-purple-400" />
              <span>Recent Trades</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-gray-400">Total P&L:</span>
              <span className="text-green-400 font-bold">₹2,88,450</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Stock</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Entry</TableHead>
                <TableHead>Exit/Current</TableHead>
                <TableHead>Qty</TableHead>
                <TableHead className="text-right">Return</TableHead>
                <TableHead>Status</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {trades.map((trade, index) => (
                <motion.tr
                  key={trade.stock}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <TableCell className="font-medium text-gray-900">
                    {trade.stock.replace(".NS", "")}
                  </TableCell>

                  <TableCell>
                    <span className="inline-block px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                      {trade.sector}
                    </span>
                  </TableCell>

                  <TableCell>₹{trade.buyPrice.toFixed(2)}</TableCell>

                  <TableCell>
                    {trade.status === "Holding" ? (
                      <span>₹{trade.currentPrice?.toFixed(2)}</span>
                    ) : (
                      <span>₹{trade.sellPrice?.toFixed(2)}</span>
                    )}
                  </TableCell>

                  <TableCell>{trade.quantity}</TableCell>

                  <TableCell
                    className={`text-right font-bold ${
                      trade.returnPercentage > 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <div className="flex items-center justify-end space-x-1">
                      {trade.returnPercentage > 0 ? (
                        <ArrowUpRight className="h-3 w-3" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3" />
                      )}
                      <span>{trade.returnPercentage.toFixed(2)}%</span>
                    </div>
                  </TableCell>

                  <TableCell>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                        trade.status === "Sold"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {trade.status}
                    </span>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};
