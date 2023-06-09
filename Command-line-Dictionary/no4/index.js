const readline = require('readline');
const https = require('https');

const api_key = '4ee6d020-710d-4c37-9be9-60c7e4abd6cc'; // replace with your own API key

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a word: ', (word) => {
  const options = {
    hostname: 'dictionaryapi.com',
    path: `/api/v3/references/thesaurus/json/${word}`,
    method: 'GET',
    headers: {
      'app_id': 'YOUR_APP_ID', // replace with your own app ID
      'app_key': api_key
    }
  };

  const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      const result = JSON.parse(data);
      const definitions = result.results[0].lexicalEntries[0].entries[0].senses.map(sense => sense.definitions[0]);

      console.log(`Definitions for ${word}:`);
      definitions.forEach((definition, index) => {
        console.log(`${index + 1}. ${definition}`);
      });

      rl.close();
    });
  });

  req.on('error', (error) => {
    console.error(error);
  });

  req.end();
});
