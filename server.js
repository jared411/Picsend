const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

const PORT = process.env.PORT || 10000;
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET = process.env.SUPABASE_BUCKET || 'picsend';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}
const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  : null;

app.get('/health', (_req, res) => res.json({ ok: true, service: 'PicSend' }));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!supabase) return res.status(500).json({ error: 'Server storage is not configured.' });
    if (!req.file) return res.status(400).json({ error: 'No image supplied.' });
    if (!req.file.mimetype.startsWith('image/')) return res.status(400).json({ error: 'Only images are allowed.' });

    const ext = (req.file.originalname.split('.').pop() || 'jpg').replace(/[^a-z0-9]/gi, '').toLowerCase() || 'jpg';
    const id = crypto.randomUUID();
    const path = `${id}.${ext}`;

    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, req.file.buffer, {
      contentType: req.file.mimetype,
      upsert: false
    });
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
    res.json({ id, url: data.publicUrl, path });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || 'Upload failed.' });
  }
});

app.listen(PORT, () => console.log(`PicSend listening on ${PORT}`));
