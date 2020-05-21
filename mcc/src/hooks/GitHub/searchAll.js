export default () => {
  /*
    const Octokit = require("@octokit/rest");
    const octokit = new Octokit();
    
    // Compare: https://developer.github.com/v3/repos/#list-organization-repositories
    octokit.repos
      .listForOrg({
        org: "a-startup",
        type: "public"
      })
      .then(({ data }) => {
        // handle data
      });
  */
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  
  const searchAPI = async searchTerm => {
    console.log("Searching for " + searchTerm);
    try {
      const response = await octokit.get("/search", {
        params: {
          term: searchTerm,
          limit: 50,
        }
      });
      setResults(response.data.organizations);
    }
    catch (err) {
      setErrorMessage("Something went wrong.");
    }
  };
}