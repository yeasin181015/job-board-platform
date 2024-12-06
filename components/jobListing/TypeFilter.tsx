interface TypeFilterProps {
  type: string;
  updateFilters: (key: string, value: string | number) => void;
}

const TypeFilter = ({ type, updateFilters }: TypeFilterProps) => {
  return (
    <select
      value={type}
      onChange={(e) => updateFilters("type", e.target.value)}
      className="rounded-md p-2 mr-0 sm:mr-2"
    >
      <option value="">All Types</option>
      <option value="Full-time">Full-time</option>
      <option value="Part-time">Part-time</option>
    </select>
  );
};

export default TypeFilter;
