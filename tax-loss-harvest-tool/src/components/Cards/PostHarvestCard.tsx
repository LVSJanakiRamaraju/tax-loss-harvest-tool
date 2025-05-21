import React from "react";
import { CapitalGains } from "../../api/mockApi";

interface Props {
  updatedGains: CapitalGains;
  originalGains: CapitalGains;
}

const PostHarvestCard: React.FC<Props> = ({ updatedGains, originalGains }) => {
  const stcgNet = updatedGains.stcg.profits - updatedGains.stcg.losses;
  const ltcgNet = updatedGains.ltcg.profits - updatedGains.ltcg.losses;
  const totalNet = stcgNet + ltcgNet;

  const originalStcgNet = originalGains.stcg.profits - originalGains.stcg.losses;
  const originalLtcgNet = originalGains.ltcg.profits - originalGains.ltcg.losses;
  const originalTotalNet = originalStcgNet + originalLtcgNet;

  const savings = originalTotalNet - totalNet;

  return (
    <div className="bg-blue-100 text-gray-900 p-4 rounded-xl w-full md:w-1/2">
      <h2 className="text-lg font-bold mb-2">After Harvesting</h2>
      <div className="space-y-1">
        <p>Short-term Profits: ₹{updatedGains.stcg.profits}</p>
        <p>Short-term Losses: ₹{updatedGains.stcg.losses}</p>
        <p>Net Short-term Gains: ₹{stcgNet}</p>
        <hr className="my-2 border-blue-300" />
        <p>Long-term Profits: ₹{updatedGains.ltcg.profits}</p>
        <p>Long-term Losses: ₹{updatedGains.ltcg.losses}</p>
        <p>Net Long-term Gains: ₹{ltcgNet}</p>
        <hr className="my-2 border-blue-300" />
        <p className="font-semibold">Realised Capital Gains: ₹{totalNet}</p>
        {totalNet < originalTotalNet && (
          <p className="text-green-700 font-semibold">
            🎉 You're going to save upto ₹{savings}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostHarvestCard;
