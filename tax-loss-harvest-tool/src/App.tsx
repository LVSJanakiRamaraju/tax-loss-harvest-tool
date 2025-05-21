// src/App.tsx

import React, { useEffect, useState } from "react";
import { fetchCapitalGains, fetchHoldings, CapitalGains, Holding } from "./api/mockApi";

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
    <div className="p-5">
      <h1>Capital Gains:</h1>
      <pre>{JSON.stringify(capitalGains, null, 2)}</pre>

      <h1>Holdings:</h1>
      <pre>{JSON.stringify(holdings, null, 2)}</pre>
    </div>
  );
}

export default App;
