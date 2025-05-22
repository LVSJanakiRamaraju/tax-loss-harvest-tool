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
    <div className="w-full md:w-1/2 bg-[#1A1A1A] text-white rounded-xl p-6 shadow-md flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-4">Pre-Harvesting</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p>Profits (Short-term)</p>
          <p className="font-medium">₹{capitalGains.stcg.profits}</p>
        </div>
        <div>
          <p>Profits (Long-term)</p>
          <p className="font-medium">₹{capitalGains.ltcg.profits}</p>
        </div>
        <div>
          <p>Losses (Short-term)</p>
          <p className="font-medium">₹{capitalGains.stcg.losses}</p>
        </div>
        <div>
          <p>Losses (Long-term)</p>
          <p className="font-medium">₹{capitalGains.ltcg.losses}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-gray-700 pt-4">
        <p className="text-sm">Net Capital Gains</p>
        <p className="text-2xl font-semibold text-white">₹{totalNet}</p>
      </div>
    </div>
  );
};

export default PreHarvestCard;
