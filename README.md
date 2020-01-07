# SpotifySnap :notes:
"Snap" a photo of a track or album on Spotify

Using puppeteer might be overkill but here goes!

## What it does
- Downloads a track based on the id

### Getting started
```
npm install # see below if errors install Puppeteer
node prompt.js
```

#### Problems I ran into
- If puppeteer does not install, use the following command (from issue #[375](https://github.com/puppeteer/puppeteer/issues/375)):
```
sudo npm install --save puppeteer --unsafe-perm=true
# "--save" adds dependency to package.json
# "--unsafe-perm" -- https://stackoverflow.com/questions/48869749/npm-install-puppeteer-showing-permission-denied-errors/
```

#### Future features
- allow URL input & extract id
- change image dimensions
- extract song name from request
- check for 404 statuses & send back errors (try/catch)
- progress bar
- song search