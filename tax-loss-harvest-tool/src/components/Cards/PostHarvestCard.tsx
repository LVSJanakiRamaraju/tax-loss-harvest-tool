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

  const originalStcgNet =
    originalGains.stcg.profits - originalGains.stcg.losses;
  const originalLtcgNet =
    originalGains.ltcg.profits - originalGains.ltcg.losses;
  const originalTotalNet = originalStcgNet + originalLtcgNet;

  const savings = originalTotalNet - totalNet;

  return (
    <div className="w-full md:w-1/2 bg-[#0061EB] text-white rounded-xl p-6 shadow-md flex flex-col justify-between">
      <h2 className="text-lg font-semibold mb-4">After Harvesting</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p>Profits (Short-term)</p>
          <p className="font-medium">₹{updatedGains.stcg.profits}</p>
        </div>
        <div>
          <p>Profits (Long-term)</p>
          <p className="font-medium">₹{updatedGains.ltcg.profits}</p>
        </div>
        <div>
          <p>Losses (Short-term)</p>
          <p className="font-medium">₹{updatedGains.stcg.losses}</p>
        </div>
        <div>
          <p>Losses (Long-term)</p>
          <p className="font-medium">₹{updatedGains.ltcg.losses}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-blue-300 pt-4">
        <p className="text-sm">Net Capital Gains</p>
        <p className="text-2xl font-semibold text-white">₹{totalNet}</p>
        {totalNet < originalTotalNet && (
          <p className="mt-2 text-sm text-green-300">
            ✅ You are going to save up to ₹{savings}
          </p>
        )}
      </div>
    </div>
  );
};

export default PostHarvestCard;
