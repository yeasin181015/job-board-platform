interface PaginationProps {
  totalPages: number;
  page: number;
  updateFilters: (key: string, value: string | number) => void;
}

const CustomPagination = ({
  totalPages,
  page,
  updateFilters,
}: PaginationProps) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => updateFilters("page", pageNum)}
          className={`px-4 py-2 mx-1 ${
            pageNum === page ? "bg-[#E9DED3] text-white" : "bg-gray-200"
          }`}
        >
          {pageNum}
        </button>
      ))}
    </div>
  );
};

export default CustomPagination;
