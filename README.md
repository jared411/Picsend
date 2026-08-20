# PicSend — GitHub/Render Ready

## Render settings
- Root Directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`

## Environment variables
Add these in Render (do not commit them to GitHub):
- `SUPABASE_URL` = your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` = your Supabase service-role key
- `SUPABASE_BUCKET` = `picsend`

The server exposes `GET /health` and `POST /upload`.

After deployment, test:
`https://YOUR-RENDER-DOMAIN/health`
