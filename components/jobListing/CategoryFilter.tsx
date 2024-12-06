import { JobCategoryTypes } from "@/types/job";

interface CategoryFilterProps {
  category: string;
  updateFilters: (key: string, value: string | number) => void;
  jobCategories: Array<JobCategoryTypes>;
}

const CategoryFilter = ({
  category,
  updateFilters,
  jobCategories,
}: CategoryFilterProps) => {
  return (
    <select
      value={category}
      onChange={(e) => updateFilters("category", e.target.value)}
      className="rounded-md p-2 mr-0 sm:mr-2"
    >
      <option value="All">All Categories</option>
      {jobCategories.map((cat: JobCategoryTypes) => (
        <option key={cat.title} value={cat.title}>
          {cat.title}
        </option>
      ))}
    </select>
  );
};

export default CategoryFilter;
