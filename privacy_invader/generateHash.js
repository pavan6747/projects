const bcrypt = require('bcrypt');

// Your plaintext password
const plaintextPassword = 'Pavan@6747';

// Number of rounds for the bcrypt algorithm (the higher, the more secure but slower)
const saltRounds = 10;

// Generate a salt and hash the password
bcrypt.hash(plaintextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error generating hash:', err);
  } else {
    console.log('Generated password hash:', hash);
  }
});
