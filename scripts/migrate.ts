import { config } from 'dotenv'
import { postgresConnectionString } from '@vercel/postgres'
import { neon } from '@neondatabase/serverless'
import { readdirSync, readFileSync } from 'fs'
import path from 'path'

async function migrate() {
  // Load environment variables from .env file
  config({ path: '.env.local' })

  // Connect to Neon
  const sql = neon(postgresConnectionString())

  // Create migrations table if it doesn't exist
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version TEXT PRIMARY KEY,
      applied_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );
  `

  // Get all migration files
  const migrationsDir = path.join(process.cwd(), 'db', 'migrations')
  const migrationFiles = readdirSync(migrationsDir)
    .filter((f) => f.endsWith('.sql'))
    .sort()

  // Get applied migrations
  const applied = await sql`
    SELECT version FROM schema_migrations;
  `
  const appliedVersions = new Set(applied.map((r) => r.version))

  // Apply new migrations
  for (const file of migrationFiles) {
    const version = file.split('_')[0]
    if (!appliedVersions.has(version)) {
      const content = readFileSync(path.join(migrationsDir, file), 'utf8')

      // Split the content by semicolons and execute each statement separately
      const statements = content
        .split(';')
        .map((s) => s.trim())
        .filter((s) => s.length > 0)

      console.log(`Applying migration: ${file}`)
      await sql.transaction((txn) => [
        ...statements.map((statement) => txn(statement)),
        txn`
          INSERT INTO schema_migrations (version) 
          VALUES (${version});
        `,
      ])
    }
  }
}

migrate()
  .then(() => {
    console.log('Migrations completed')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Migration failed:', err)
    process.exit(1)
  })
