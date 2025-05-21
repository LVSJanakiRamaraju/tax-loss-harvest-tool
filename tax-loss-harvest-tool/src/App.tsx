import React, { useEffect, useState } from "react";
import { fetchCapitalGains, fetchHoldings, CapitalGains, Holding } from "./api/mockApi";
import PreHarvestCard from "./components/Cards/PreHarvestCard";
import PostHarvestCard from "./components/Cards/PostHarvestCard";
import HoldingsTable from "./components/HoldingsTable";

function App() {
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  const [selectedCoins, setSelectedCoins] = useState<string[]>([]);

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
    if (!capitalGains) return {
      stcg: { profits: 0, losses: 0 },
      ltcg: { profits: 0, losses: 0 },
    };

    let updated = JSON.parse(JSON.stringify(capitalGains)) as CapitalGains;

    selectedCoins.forEach((coinId) => {
      const holding = holdings.find((h) => h.coin === coinId);
      if (!holding) return;

      if (holding.stcg.gain > 0)
        updated.stcg.profits += holding.stcg.gain;
      else
        updated.stcg.losses += Math.abs(holding.stcg.gain);

      if (holding.ltcg.gain > 0)
        updated.ltcg.profits += holding.ltcg.gain;
      else
        updated.ltcg.losses += Math.abs(holding.ltcg.gain);
    });

    return updated;
  };

  if (!capitalGains || holdings.length === 0) {
    return <div className="p-5">Loading...</div>;
  }

  const updatedGains = computeUpdatedGains();

  return (
    <div className="p-5 space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <PreHarvestCard capitalGains={capitalGains} />
        <PostHarvestCard
          updatedGains={updatedGains}
          originalGains={capitalGains}
        />
      </div>
      <HoldingsTable
        holdings={holdings}
        selectedCoins={selectedCoins}
        onToggle={toggleSelection}
        onToggleAll={toggleAll}
      />
    </div>
  );
}

export default App;
