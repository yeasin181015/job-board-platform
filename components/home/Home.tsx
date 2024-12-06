import SearchBar from "./SearchBar";
import JobCategories from "./JobCategories";
import FeaturedJobsSlider from "./FeaturedJobsSlider";

const Home = async () => {
  const [categoriesRes, featuredJobRes] = await Promise.all([
    fetch(`https://joblistingplatform.netlify.app/api/job-categories`),
    fetch(`https://joblistingplatform.netlify.app/api/jobs?featured=true`),
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
