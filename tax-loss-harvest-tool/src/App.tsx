import React, { useEffect, useState } from "react";
import { fetchCapitalGains, fetchHoldings, CapitalGains, Holding } from "./api/mockApi";
import PreHarvestCard from "./components/Cards/PreHarvestCard";
import PostHarvestCard from "./components/Cards/PostHarvestCard";

function App() {
  const [capitalGains, setCapitalGains] = useState<CapitalGains | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);

  useEffect(() => {
    fetchCapitalGains().then(setCapitalGains);
    fetchHoldings().then(setHoldings);
  }, []);

  if (!capitalGains || holdings.length === 0) {
    return <div className="p-5">Loading...</div>;
  }

  return (
    <div className="p-5 space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <PreHarvestCard capitalGains={capitalGains} />
        <PostHarvestCard updatedGains={capitalGains} originalGains={capitalGains} />
      </div>
    </div>
  );
}

export default App;
