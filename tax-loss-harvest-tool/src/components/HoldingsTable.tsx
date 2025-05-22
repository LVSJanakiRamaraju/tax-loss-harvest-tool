import React, { useState } from "react";
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
  const [sortKey, setSortKey] = useState<keyof Holding | "">("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const allSelected = selectedCoins.length === holdings.length;
  const visibleHoldings = showAll ? holdings : holdings.slice(0, 5);

  const sortedHoldings = [...visibleHoldings].sort((a, b) => {
    if (!sortKey) return 0;
    const aVal = a[sortKey as keyof Holding] as number;
    const bVal = b[sortKey as keyof Holding] as number;
    if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (key: keyof Holding) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="overflow-x-auto mt-6 rounded-xl bg-[#1A1A1A] text-white shadow-md p-4">
      <div className="hidden sm:block">
        <table className="min-w-full text-sm table-auto">
          <thead className="text-left border-b border-gray-700">
            <tr className="text-gray-400">
              <th className="p-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={(e) => onToggleAll(e.target.checked)}
                />
              </th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("coinName")}>Asset</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("averageBuyPrice")}>Avg Buy</th>
              <th className="p-3 cursor-pointer" onClick={() => handleSort("currentPrice")}>Current</th>
              <th className="p-3">ST Gain</th>
              <th className="p-3">LT Gain</th>
              <th className="p-3">To Sell</th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((h) => {
              const isChecked = selectedCoins.includes(h.coin);
              return (
                <tr
                  key={h.coin}
                  className={`border-b border-gray-700 transition-colors duration-150 hover:bg-[#2D2D2D] ${
                    isChecked ? "bg-[#2A2A2A]" : ""
                  }`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => onToggle(h.coin)}
                    />
                  </td>
                  <td className="p-3 flex items-center gap-2">
                    <img src={h.logo} alt={h.coin} className="w-5 h-5 rounded-full" />
                    <span>{h.coinName}</span>
                  </td>
                  <td className="p-3" title="Average Buy Price">₹{h.averageBuyPrice}</td>
                  <td className="p-3" title="Current Market Price">₹{h.currentPrice}</td>
                  <td className="p-3" title="Short-Term Capital Gain">
                    <span className={`${h.stcg.gain >= 0 ? "text-green-400" : "text-red-400"}`}>
                      ₹{h.stcg.gain}
                    </span>{" "}
                    <span className="text-gray-400 text-xs">({h.stcg.balance})</span>
                  </td>
                  <td className="p-3" title="Long-Term Capital Gain">
                    <span className={`${h.ltcg.gain >= 0 ? "text-green-400" : "text-red-400"}`}>
                      ₹{h.ltcg.gain}
                    </span>{" "}
                    <span className="text-gray-400 text-xs">({h.ltcg.balance})</span>
                  </td>
                  <td className="p-3 font-medium">{isChecked ? h.totalHolding : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block sm:hidden space-y-4">
        {sortedHoldings.map((h) => {
          const isChecked = selectedCoins.includes(h.coin);
          return (
            <div
              key={h.coin}
              className={`rounded-xl p-3 bg-[#2A2A2A] shadow transition-all duration-150 hover:bg-[#333] ${
                isChecked ? "border border-blue-400" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggle(h.coin)}
                  />
                  <img src={h.logo} alt={h.coin} className="w-6 h-6 rounded-full" />
                  <span className="font-medium">{h.coinName}</span>
                </div>
                <span className="text-sm">To Sell: {isChecked ? h.totalHolding : "-"}</span>
              </div>
              <div className="text-sm text-gray-300">
                <p>Avg Buy: ₹{h.averageBuyPrice}</p>
                <p>Current: ₹{h.currentPrice}</p>
                <p className="text-green-400">ST Gain: ₹{h.stcg.gain} ({h.stcg.balance})</p>
                <p className="text-green-400">LT Gain: ₹{h.ltcg.gain} ({h.ltcg.balance})</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-right">
        <button
          onClick={toggleShowAll}
          className="text-blue-400 hover:text-blue-500 underline text-sm"
        >
          {showAll ? "View Less" : "View All"}
        </button>
      </div>
    </div>
  );
};

export default HoldingsTable;
