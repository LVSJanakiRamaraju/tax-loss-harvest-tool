import React from "react";
import { CapitalGains } from "../../api/mockApi";

interface Props {
  capitalGains: CapitalGains;
}

const PreHarvestCard: React.FC<Props> = ({ capitalGains }) => {
  const stcgNet = capitalGains.stcg.profits - capitalGains.stcg.losses;
  const ltcgNet = capitalGains.ltcg.profits - capitalGains.ltcg.losses;
  const totalNet = stcgNet + ltcgNet;

  return (
    <div className="bg-gray-800 text-white p-4 rounded-xl w-full md:w-1/2">
      <h2 className="text-lg font-bold mb-2">Pre-Harvesting</h2>
      <div className="space-y-1">
        <p>Short-term Profits: ₹{capitalGains.stcg.profits}</p>
        <p>Short-term Losses: ₹{capitalGains.stcg.losses}</p>
        <p>Net Short-term Gains: ₹{stcgNet}</p>
        <hr className="my-2 border-gray-600" />
        <p>Long-term Profits: ₹{capitalGains.ltcg.profits}</p>
        <p>Long-term Losses: ₹{capitalGains.ltcg.losses}</p>
        <p>Net Long-term Gains: ₹{ltcgNet}</p>
        <hr className="my-2 border-gray-600" />
        <p className="font-semibold">Realised Capital Gains: ₹{totalNet}</p>
      </div>
    </div>
  );
};

export default PreHarvestCard;
