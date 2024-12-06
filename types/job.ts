export type Job = {
  id: number;
  title: string;
  description: string;
  category: string;
  location: string;
  type: string;
  company: string;
  requirements: Array<string>;
};

export type JobCategoryTypes = {
  title: string;
};
