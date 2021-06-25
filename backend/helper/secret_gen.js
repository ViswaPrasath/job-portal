const crypto = require('crypto');
const key = crypto.randomBytes(15).toString('hex');

console.log(key);