import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors({
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"]
}));
app.post('/api/auth/login', (req, res) => res.send('ok'));
app.listen(3456, () => console.log('started'));
