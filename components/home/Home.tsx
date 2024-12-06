import SearchBar from "./SearchBar";
import JobCategories from "./JobCategories";
import FeaturedJobsSlider from "./FeaturedJobsSlider";

const Home = async () => {
  const [categoriesRes, featuredJobRes] = await Promise.all([
    fetch(`${process.env.LOCALSERVER}/api/job-categories`),
    fetch(`${process.env.LOCALSERVER}/api/jobs?featured=true`),
  ]);

  const [categories, { jobs }] = await Promise.all([
    categoriesRes.json(),
    featuredJobRes.json(),
  ]);

  return (
    <div>
      <SearchBar />
      <FeaturedJobsSlider jobs={jobs} />
      <JobCategories categories={categories} />
    </div>
  );
};

export default Home;
