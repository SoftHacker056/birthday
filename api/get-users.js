// ============================================
// VERCEL SERVERLESS FUNCTION
// Get All Users from Neon PostgreSQL
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
        
        // Fetch all users, ordered by most recent first
        const users = await sql`
            SELECT 
                id,
                name,
                device,
                latitude,
                longitude,
                visit_time,
                created_at
            FROM users
            ORDER BY visit_time DESC
            LIMIT 100
        `;
        
        return res.status(200).json({
            success: true,
            count: users.length,
            users: users
        });
        
    } catch (error) {
        console.error('Error fetching users:', error);
        
        // If table doesn't exist, return empty array
        if (error.message && error.message.includes('does not exist')) {
            return res.status(200).json({
                success: true,
                count: 0,
                users: [],
                message: 'Table does not exist yet. Save a user first!'
            });
        }
        
        return res.status(500).json({
            error: 'Failed to fetch users',
            message: error.message
        });
    }
}
