import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;
let tableInitialized = false;

export function getMysqlPool(): mysql.Pool | null {
  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;
  const port = Number(process.env.MYSQL_PORT) || 3306;

  // If MySQL credentials are not configured, return null (graceful fallback)
  if (!host || !user || !database) {
    return null;
  }

  if (!pool) {
    pool = mysql.createPool({
      host,
      user,
      password: password || "",
      database,
      port,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 5000,
    });
  }

  return pool;
}

export async function ensureLeadsTableExists(connectionPool: mysql.Pool): Promise<void> {
  if (tableInitialized) return;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS leads (
      id VARCHAR(255) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255) DEFAULT '',
      company VARCHAR(255) DEFAULT '',
      productInterested VARCHAR(255) DEFAULT 'General Inquiry',
      requirement TEXT,
      message TEXT,
      city VARCHAR(100) DEFAULT '',
      state VARCHAR(100) DEFAULT '',
      source VARCHAR(100) DEFAULT 'Website Contact Form',
      status ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  try {
    await connectionPool.execute(createTableQuery);
    tableInitialized = true;
  } catch (err) {
    console.warn("Could not auto-create MySQL leads table:", err);
  }
}
