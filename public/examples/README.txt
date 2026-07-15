Screenshot thumbnails of the real client sites live here:

  josh-hd.png      (joshuacowell.com)
  david-hd.png     (davidcowell.com)
  caroline-hd.png  (carolinethomas.netlify.app)

They show on the Styles page: on phones as the card image, on desktop
for a moment while the live preview loads. Paths are set in
src/config/site.js under realSites.

To refresh one (or add a new client), run this in PowerShell from the
project folder, swapping the name and URL:

  & "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" `
    --headless=new --disable-gpu --hide-scrollbars `
    --virtual-time-budget=9000 --window-size=1280,800 `
    --screenshot="public\examples\newclient.png" https://theirsite.com

(A PNG straight from that command works fine; the existing PNG versions were
just compressed to keep the repo light. Update the thumb path in
site.js to match whatever extension you save.)

Manual alternative: open the site, press F12, Ctrl+Shift+P, type
"screenshot", pick "Capture screenshot".
