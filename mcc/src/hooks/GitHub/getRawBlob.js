const octokit = require('@octokit/rest')({
  debug: false,
  headers: {
    'Accept': 'application/vnd.github.v3.raw'
  }
})

octokit.gitdata.getBlob({
  owner: 'octokit',
  repo: 'rest.js',
  sha: 'b361f529df9b49f2a6b5748b5d71b792c8383e5e'
})
