// ============================================
// VERCEL SERVERLESS FUNCTION
// Save User to Neon PostgreSQL
// ============================================

import { neon } from '@neondatabase/serverless';

// Vercel serverless function handler
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
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
        
        // Get data from request body
        const { name, device, latitude, longitude, visit_time } = req.body;
        
        // Validate required fields
        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }
        
        // Create Neon client
        const sql = neon(databaseUrl);
        
        // Create table if it doesn't exist
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                device VARCHAR(255),
                latitude DECIMAL(10, 8),
                longitude DECIMAL(11, 8),
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        
        // Insert user data
        const result = await sql`
            INSERT INTO users (name, device, latitude, longitude, visit_time)
            VALUES (${name}, ${device || null}, ${latitude || null}, ${longitude || null}, ${visit_time ? new Date(visit_time) : new Date()})
            RETURNING id, name, device, latitude, longitude, visit_time
        `;
        
        return res.status(200).json({
            success: true,
            message: 'User saved successfully',
            user: result[0]
        });
        
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({
            error: 'Failed to save user',
            message: error.message
        });
    }
}
