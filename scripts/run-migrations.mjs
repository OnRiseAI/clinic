import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Direct connection to database
const config = {
  host: 'db.dpewhfmgipjympxlxwij.supabase.co',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: '.fRbmJtafN4$!Rz',
  ssl: { rejectUnauthorized: false },
  connectionTimeoutMillis: 30000
};

async function runMigrations() {
  const client = new pg.Client(config);

  try {
    console.log('Connecting to database...');
    console.log('Host:', config.host);
    console.log('User:', config.user);
    await client.connect();
    console.log('Connected!\n');

    // Run schema migration
    const schemaPath = path.join(__dirname, '..', 'supabase', 'migrations', '001_initial_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');

    console.log('Running 001_initial_schema.sql...');
    await client.query(schemaSql);
    console.log('Schema created successfully!\n');

    // Run RLS policies migration
    const rlsPath = path.join(__dirname, '..', 'supabase', 'migrations', '002_rls_policies.sql');
    const rlsSql = fs.readFileSync(rlsPath, 'utf8');

    console.log('Running 002_rls_policies.sql...');
    await client.query(rlsSql);
    console.log('RLS policies created successfully!\n');

    console.log('All migrations completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
    if (error.detail) console.error('Detail:', error.detail);
    if (error.hint) console.error('Hint:', error.hint);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
