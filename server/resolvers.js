const { jobs, companies } = require("./db");
const Query = {
  company: (root, args) => companies.get(args.id),
  job: (root, args) => jobs.get(args.id),
  jobs: () => jobs.list(),
};

const Job = {
  company: (job) => companies.get(job.companyId),
};

const Company = {
  jobs: (company) => jobs.list().filter((job) => job.companyId === company.id),
};

module.exports = { Query, Job, Company };
