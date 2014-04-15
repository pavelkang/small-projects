var googleapis = require('googleapis'),
    readline = require('readline');

var CLIENT_ID = '587641874812-l99v3ovdo5aiu479ca5ocjdn8s922e8k.apps.googleusercontent.com',
    CLIENT_SECRET = '5EtekBkyxZJB-r2WsI70rCLj',
    REDIRECT_URL = 'http://small-projects.herokuapp.com/googleAuthFinished',
    SCOPE = 'https://www.googleapis.com/auth/drive.file';

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var auth = new googleapis.OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

googleapis.discover('drive', 'v2').execute(function(err, client) {
  var url = auth.generateAuthUrl({ scope: SCOPE });
  var getAccessToken = function(code) {
    auth.getToken(code, function(err, tokens) {
      if (err) {
        console.log('Error while trying to retrieve access token', err);
        return;
      }
      auth.credentials = tokens;
      upload();
    });
  };
  var upload = function() {
    client.drive.files
      .insert({ title: 'My Document', mimeType: 'text/plain' })
      .withMedia('text/plain', 'Hello World!')
      .withAuthClient(auth).execute(console.log);
  };
  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', getAccessToken);
});