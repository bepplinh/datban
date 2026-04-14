import { readFileSync, writeFileSync } from 'fs';
let file = readFileSync('backend/src/config/redis.js', 'utf8');
if (!file.includes('family: 4,')) {
  file = file.replace('maxRetriesPerRequest: null,', 'maxRetriesPerRequest: null,\n  family: 4,');
  writeFileSync('backend/src/config/redis.js', file);
}
