#!/usr/bin/env node
/**
 * Automatic Database Migration Script for Railway
 * Runs migrations without interactive prompts
 */

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { migrate } from 'drizzle-orm/mysql2/migrator';
// Schema will be loaded from migrations folder

async function runMigration() {
  console.log('🔄 Starting database migration...');
  
  const DATABASE_URL = process.env.DATABASE_URL;
  
  if (!DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set');
    process.exit(1);
  }

  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection(DATABASE_URL);
    console.log('✅ Connected to database');
    
    // Create drizzle instance
    const db = drizzle(connection, { mode: 'default' });
    
    // Run migrations
    console.log('🔄 Running migrations from drizzle folder...');
    await migrate(db, { migrationsFolder: './drizzle' });
    
    console.log('✅ Database migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
      console.log('✅ Database connection closed');
    }
  }
}

// Run migration
runMigration().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
