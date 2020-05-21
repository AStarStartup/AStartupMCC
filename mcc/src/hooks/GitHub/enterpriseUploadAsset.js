const octokit = require('@octokit/rest')({
  debug: true,
  baseUrl: 'https://github.my-ghe-enabled-company.com/api/v3'
})

octokit.authenticate({
  type: 'oauth',
  token: 'add-your-real-token-here'
})

octokit.repos.getReleaseByTag({
  owner: 'octokit-fixture-org',
  repo: 'release-assets',
  tag: 'v1.0.0'
})

  .then(result => {
    return octokit.repos.uploadAsset({
      url: result.data.upload_url,
      file: 'Hello, world!\n',
      contentType: 'text/plain',
      contentLength: 14,
      name: 'test-upload.txt',
      label: 'test'
    })
  })
