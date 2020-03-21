# SpotifySnap :notes:
"Snap" a photo of a track or album on Spotify

## What it does
- Downloads an image of a track based on the id
- helped fill my [100-days-of-code](https://github.com/samarthdave/100-days-of-code) repository w/ images
- generates an image like below from a given track id

![Generated Image (Middle Child)](/media/middle-child.jpg)

### Usage
```
npm install # see below if errors install Puppeteer
node prompt.js
# ...
# ? Is it an album or a track? ... track
# ? What is the track link/id? 2JvzF1RMd7lE3KmFlsyZD8
# ... downloads MIDDLE CHILD by J Cole into media folder
```

### Tools used
- enquirer - great tool for CLIs
- Puppeteer (runs Chromium) - is it overkill? yes

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