interface LocationFilterProps {
  location: string;
  updateFilters: (key: string, value: string | number) => void;
}

const LocationFilter = ({ location, updateFilters }: LocationFilterProps) => {
  return (
    <select
      value={location}
      onChange={(e) => updateFilters("location", e.target.value)}
      className="rounded-md p-2"
    >
      <option value="">All Locations</option>
      <option value="Remote">Remote</option>
      <option value="On-site">On-site</option>
      <option value="Hybrid">Hybrid</option>
    </select>
  );
};

export default LocationFilter;
