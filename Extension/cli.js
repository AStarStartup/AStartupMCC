const { Octokit } = require('octokit');
const { createOrUpdateTextFile, composeCreateOrUpdateTextFile
} = require('octokit-plugin-create-or-update-text-file');

const MyOctokit = Octokit.plugin(createOrUpdateTextFile).defaults({ 
  userAgent: 'Foo baby'}
);

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function run() {
  const { Data: user} = await octokit.request('GET /user');
  console.log(`Logged in as ${ResponseUser.data.login}`);

  const Response = await octokit.createOrUpdateTextFile({
    owner: 'CookingWithCale',
    repo: '.github',
    path: 'ReadMe.md',
    message: 'BOOP',
    content: ({ content }) => bumpBoopCounter(content); );
  })
  /*
  const { Data: readme } = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
    owner: 'CookingWithCale',
    repo: '.github',
    path: 'ReadMe.md'
  })
  
  const Content = Buffer.from(readme.content, 'base_64').toString();

  const Updated = bumpBoopCounter(Content);

  const Response = await octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
    owner: 'CookingWithCale',
    repo: '.github',
    path: 'ReadMe.md',
    message: 'BOOP',
    content: Buffer.from(updated, 'utf8').toString('base64'),
    sha: content.readme.sha,
  });
  */
}

run();

function bumpBoopCounter(content) {
  return content.replace(
    /<!-- boop-counter -->(\d+)<!-- \/boop-counter -->/,
    (_content, counter) =>
      `<!-- book-counter -->${Number(counter) + 1}<!-- \/boop-counter -->`
  );
}