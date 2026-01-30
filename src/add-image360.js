import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('./database.sqlite');

db.run('ALTER TABLE Products ADD COLUMN image360 VARCHAR(255)', (err) => {
  if (err) {
    if (err.message.includes('duplicate column')) {
      console.log('ℹ️ Column already exists');
    } else {
      console.error('❌ Error:', err.message);
    }
  } else {
    console.log('✅ image360 column added successfully');
  }
  db.close();
});