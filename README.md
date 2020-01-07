# SpotifySnap :notes:
"Snap" a photo of a track or album on Spotify

Using puppeteer might be overkill but here goes!

## What it does
- Downloads a track based on the id

#### Problems I ran into
- If puppeteer does not install, use the following command (from issue #[375](https://github.com/puppeteer/puppeteer/issues/375)):
```
sudo npm install --save puppeteer --unsafe-perm=true
```

#### Future features
- allow URL input & extract id
- change image dimensions
- extract song name from request
- check for 404 statuses & send back errors (try/catch)
- progress bar