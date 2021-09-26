const endPointURL = `http://localhost:9000/graphql`;

const graphqlRequests = async (query, variables = {}) => {
  const response = await fetch(endPointURL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  const responseBody = await response.json();
  return responseBody.data;
};

export const loadJobs = async () => {
  const query = `{
            jobs {
              company {
                id
                name
              }
              id
              title
            }
          }
          `;
  let { jobs } = await graphqlRequests(query);
  return jobs;
};

export const loadJob = async (id) => {
  const query = `query JobQuery($id: ID!) {
        job(id: $id) {
          id
          title
          company{
            id
            name
          }
          description
        }
      }
    `;
  let { job } = await graphqlRequests(query, { id });
  return job;
};

export const loadCompany = async (id) => {
  const query = `query CompanyQuery($id: ID!) {
          company(id: $id) {
            id
            name
            description
            jobs{
                id
                title
            }
          }
        }
        `;
  let { company } = await graphqlRequests(query, { id });
  return company;
};
