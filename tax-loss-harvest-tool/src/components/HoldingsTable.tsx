import React from "react";
import { Holding } from "../api/mockApi";

interface Props {
  holdings: Holding[];
  selectedCoins: string[];
  onToggle: (coin: string) => void;
  onToggleAll: (checked: boolean) => void;
  showAll: boolean;
  toggleShowAll: () => void;
}


const HoldingsTable: React.FC<Props> = ({
  holdings,
  selectedCoins,
  onToggle,
  onToggleAll,
    showAll,
    toggleShowAll,
}) => {
  const allSelected = selectedCoins.length === holdings.length;

  const visibleHoldings = showAll ? holdings : holdings.slice(0, 5);

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onToggleAll(e.target.checked)}
              />
            </th>
            <th className="p-2 text-left">Asset</th>
            <th className="p-2 text-left">Avg Buy Price</th>
            <th className="p-2 text-left">Current Price</th>
            <th className="p-2 text-left">Short-Term Gain</th>
            <th className="p-2 text-left">Long-Term Gain</th>
            <th className="p-2 text-left">Amount to Sell</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((h) => {
            const isChecked = selectedCoins.includes(h.coin);
            return (
              <tr key={h.coin} className="border-t">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(h.coin)}
                  />
                </td>
                <td className="p-2 flex items-center gap-2">
                  <img src={h.logo} alt={h.coin} className="w-6 h-6" />
                  <span>{h.coinName}</span>
                </td>
                <td className="p-2">₹{h.averageBuyPrice}</td>
                <td className="p-2">₹{h.currentPrice}</td>
                <td className="p-2">₹{h.stcg.gain} ({h.stcg.balance})</td>
                <td className="p-2">₹{h.ltcg.gain} ({h.ltcg.balance})</td>
                <td className="p-2">
                  {isChecked ? h.totalHoldings : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-2 text-right">
        <button
            onClick={toggleShowAll}
            className="text-blue-600 underline hover:text-blue-800"
        >
            {showAll ? "View Less" : "View All"}
        </button>
        </div>
    </div>
  );
};

export default HoldingsTable;
