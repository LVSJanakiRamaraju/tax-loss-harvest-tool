import React, { useEffect, useState } from "react";
import {
  fetchCapitalGains,
  fetchHoldings,
  CapitalGains,
  Holding,
} from "./api/mockApi";
import PreHarvestCard from "./components/Cards/PreHarvestCard";
import PostHarvestCard from "./components/Cards/PostHarvestCard";
import HoldingsTable from "./components/HoldingsTable";

function App() {
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const toggleShowAll = () => setShowAll(!showAll);

  useEffect(() => {
    fetchCapitalGains().then(setCapitalGains);
    fetchHoldings().then(setHoldings);
  }, []);

  const toggleSelection = (coin: string) => {
    setSelectedCoins((prev) =>
      prev.includes(coin) ? prev.filter((c) => c !== coin) : [...prev, coin]
    );
  };

  const toggleAll = (checked: boolean) => {
    setSelectedCoins(checked ? holdings.map((h) => h.coin) : []);
  };

  const computeUpdatedGains = (): CapitalGains => {
    if (!capitalGains)
      return {
        stcg: { profits: 0, losses: 0 },
        ltcg: { profits: 0, losses: 0 },
      };

    let updated = JSON.parse(JSON.stringify(capitalGains)) as CapitalGains;

    selectedCoins.forEach((coinId) => {
      const holding = holdings.find((h) => h.coin === coinId);
      if (!holding) return;

      if (holding.stcg.gain > 0)
        updated.stcg.profits += holding.stcg.gain;
      else updated.stcg.losses += Math.abs(holding.stcg.gain);

      if (holding.ltcg.gain > 0)
        updated.ltcg.profits += holding.ltcg.gain;
      else updated.ltcg.losses += Math.abs(holding.ltcg.gain);
    });

    return updated;
  };

  if (!capitalGains || holdings.length === 0) {
    return <div className="p-6 text-center text-gray-600">Loading...</div>;
  }

  const updatedGains = computeUpdatedGains();

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <header className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-gray-800">Tax Harvesting</h1>
          <a href="#" className="text-sm text-blue-600 hover:underline">
            How it works?
          </a>
        </header>

        {/* Info Disclaimer Box */}
        <div className="bg-blue-100 text-sm text-gray-700 border border-blue-200 rounded p-4 space-y-1">
          <p>
            ● Tax-loss harvesting is currently not allowed under Indian tax
            regulations. Please consult your tax advisor before making any
            decisions.
          </p>
          <p>
            ● Tax harvesting does not apply to derivatives or futures. These are
            handled separately as business income under tax rules.
          </p>
          <p>
            ● Price and market value data is fetched from Coingecko, not from
            individual exchanges. As a result, values may slightly differ from
            the ones on your exchange.
          </p>
          <p>
            ● Some countries do not have a short-term / long-term bifurcation.
            For now, we are calculating everything as long-term.
          </p>
          <p>
            ● Only realized losses are considered for harvesting. Unrealized
            losses in held assets are not counted.
          </p>
        </div>

        {/* Cards Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <PreHarvestCard capitalGains={capitalGains} />
          <PostHarvestCard
            updatedGains={updatedGains}
            originalGains={capitalGains}
          />
        </div>

        {/* Holdings Table */}
        <HoldingsTable
          holdings={holdings}
          selectedCoins={selectedCoins}
          onToggle={toggleSelection}
          onToggleAll={toggleAll}
          showAll={showAll}
          toggleShowAll={toggleShowAll}
        />
      </div>
    </div>
  );
}

export default App;
