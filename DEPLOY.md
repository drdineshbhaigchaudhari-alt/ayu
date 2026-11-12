# Deploying on Hostinger (Node.js web app)

The Express server serves the built React site and the `/api` routes from one process.

## Hostinger hPanel steps
1. hPanel > Websites > **Add website** > **Node.js Apps** > **Import Git Repository**.
2. Connect GitHub and choose the `ayu` repository, branch `main`.
3. Build settings:
   - Framework: **Express** (or "Other")
   - Node version: 20.x or 22.x
   - Install command: `npm install` (default)
   - Build command: `npm run build`
   - Start command: `npm start`
   - Entry file: `server/index.js`
4. Deploy. Then connect the domain **ayuvivantmultihospital.com** (Domains section) and enable the free SSL.
5. To update the site later: push to GitHub, then press **Redeploy** in hPanel.

The root `npm run build` installs and builds the React app, then copies it into `server/public`, which the server serves.

## Before going live
- Put the real phone numbers and emails in `client/src/config/site.js`.
- Form submissions are saved in `server/data/*.json` on the server. They are not emailed yet.
- Replace placeholder doctor names and bios in `client/src/data/doctors.js`.
