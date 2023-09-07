import React, { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

import { useUrl } from "@/hooks/useUrl";
import { PAGE_SIZE } from "@/utils/config";

interface PaginationProps {
  count: number;
  isLoading?:boolean;
}

const Pagination: FC<PaginationProps> = ({ count=0, isLoading }) => {
  const { getValue, addQueryToUrl } = useUrl();
  const currentPage = !getValue("page") ? 1 : Number(getValue("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (pageCount <= 1) return null;

  const nextPage = () => {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    addQueryToUrl({ page: next });
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    addQueryToUrl({ page: prev });
  };

  const buttonStyle = `border-none rounded-md font-medium text-[13.5px] flex items-center justify-between gap-1 py-[4px] px-2 bg-indigo-50 dark:bg-black dark:text-indigo-50 active:text-indigo-50 text-[inherit] pagination-btn disabled:cursor-not-allowed`;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-[14px] ml-2">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * PAGE_SIZE + 1}
        </span>{" "}
        to{" "}
        <span>
          {currentPage === pageCount ? count : currentPage * PAGE_SIZE}
        </span>{" "}
        of <span className="font-semibold">{count}</span> results
      </p>

      <div className="flex gap-[6px]">
        <button
          className={buttonStyle}
          onClick={prevPage}
          disabled={currentPage === 1 || isLoading}
        >
          <HiChevronLeft className="h-[16px] w-[16px]" /> <span>Previous</span>
        </button>

        <button
          className={buttonStyle}
          onClick={nextPage}
          disabled={currentPage === pageCount || isLoading}
        >
          <span>Next</span>
          <HiChevronRight className="h-[16px] w-[16px]" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;


