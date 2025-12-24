// ============================================
// VERCEL SERVERLESS FUNCTION
// Test Neon PostgreSQL Connection
// ============================================

import { neon } from '@neondatabase/serverless';

// Vercel serverless function handler
export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        // Get database URL from environment variable
        const databaseUrl = process.env.DATABASE_URL;
        
        if (!databaseUrl) {
            return res.status(500).json({
                error: 'DATABASE_URL environment variable not set'
            });
        }
        
        // Create Neon client
        const sql = neon(databaseUrl);
        
        // Test connection with simple query
        const result = await sql`SELECT version() as version`;
        
        return res.status(200).json({
            status: 'connected',
            version: result[0]?.version || 'Unknown',
            message: 'Successfully connected to Neon PostgreSQL!'
        });
        
    } catch (error) {
        console.error('Database connection error:', error);
        return res.status(500).json({
            error: 'Database connection failed',
            message: error.message,
            details: error.toString()
        });
    }
}
