import React from "react";

import Filter from "@/components/Filter";
import SortBy from "@/components/SortBy";
import { discountFilterOptions, sortByOptions } from "@/utils/constants";

const CabinTableOperation = () => {
  return (
    <div className="flex items-center gap-4">
      <Filter options={discountFilterOptions} filterField="discount"/>
      <SortBy options={sortByOptions} />
    </div>
  );
};

export default CabinTableOperation;
