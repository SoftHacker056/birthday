// ============================================
// VERCEL SERVERLESS FUNCTION
// Save User API Endpoint
// Educational / Demo Purpose Only
// ============================================

// In-memory storage for demo (in production, use a database)
// Note: This resets on serverless function restart
// For persistence, use Vercel KV, MongoDB, or similar
let userStorage = [];

// Vercel serverless function handler
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { name, accessType, visitTime, visitDate, location, device, birthDate, targetDate, timestamp } = req.body;
        
        // Validate required fields
        if (!name || !accessType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Create user record
        const userRecord = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: name,
            accessType: accessType,
            visitTime: visitTime || new Date().toLocaleString(),
            visitDate: visitDate || new Date().toISOString(),
            location: location || null,
            device: device || {},
            birthDate: birthDate || null,
            targetDate: targetDate || null,
            timestamp: timestamp || new Date().toISOString(),
            createdAt: new Date().toISOString()
        };
        
        // In production, save to database (e.g., MongoDB, PostgreSQL, etc.)
        // For demo: store in memory (will be lost on function restart)
        userStorage.push(userRecord);
        
        console.log('User saved:', userRecord.id, userRecord.name, userRecord.accessType);
        
        return res.status(200).json({
            success: true,
            message: 'User saved successfully',
            userId: userRecord.id
        });
        
    } catch (error) {
        console.error('Error saving user:', error);
        return res.status(500).json({
            error: 'Internal server error',
            message: error.message
        });
    }
}

// Note: In production, use a shared database (MongoDB, PostgreSQL, etc.)
// For Vercel, consider using Vercel KV or a database service
