// ============================================
// NEON DATABASE TEST - FRONTEND
// ============================================

// Show loading state
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('statusCard').style.display = 'none';
    document.getElementById('tableContainer').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

// Hide loading state
function hideLoading() {
    document.getElementById('loading').style.display = 'none';
}

// Show error
function showError(message) {
    hideLoading();
    const errorDiv = document.getElementById('errorMessage');
    document.getElementById('errorText').textContent = message;
    errorDiv.style.display = 'block';
}

// Test database connection
async function testDatabase() {
    showLoading();
    
    // Disable button during request
    const btn = document.getElementById('testDbBtn');
    btn.disabled = true;
    
    try {
        const response = await fetch('/api/test-db');
        const data = await response.json();
        
        hideLoading();
        btn.disabled = false;
        
        if (response.ok) {
            // Show success status
            const statusCard = document.getElementById('statusCard');
            const statusContent = document.getElementById('statusContent');
            
            statusContent.innerHTML = `
                <p><strong>Status:</strong> <span style="color: #10b981;">${data.status}</span></p>
                <p><strong>Message:</strong> ${data.message}</p>
                <p><strong>PostgreSQL Version:</strong></p>
                <code>${data.version}</code>
            `;
            
            statusCard.style.display = 'block';
        } else {
            showError(`Error: ${data.error} - ${data.message || data.details || ''}`);
        }
        
    } catch (error) {
        hideLoading();
        btn.disabled = false;
        showError(`Connection error: ${error.message}`);
        console.error('Error:', error);
    }
}

// Load users from database
async function loadUsers() {
    showLoading();
    
    // Disable button during request
    const btn = document.getElementById('loadUsersBtn');
    btn.disabled = true;
    
    try {
        const response = await fetch('/api/get-users');
        const data = await response.json();
        
        hideLoading();
        btn.disabled = false;
        
        if (response.ok) {
            const tableContainer = document.getElementById('tableContainer');
            const tableBody = document.getElementById('usersTableBody');
            const noData = document.getElementById('noData');
            
            if (data.users && data.users.length > 0) {
                // Clear existing rows
                tableBody.innerHTML = '';
                
                // Add user rows
                data.users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td><strong>${user.name || 'N/A'}</strong></td>
                        <td>${user.device || 'N/A'}</td>
                        <td>${user.latitude ? parseFloat(user.latitude).toFixed(4) : 'N/A'}</td>
                        <td>${user.longitude ? parseFloat(user.longitude).toFixed(4) : 'N/A'}</td>
                        <td>${user.visit_time ? new Date(user.visit_time).toLocaleString() : 'N/A'}</td>
                    `;
                    tableBody.appendChild(row);
                });
                
                // Update table header count
                const tableContainer = document.getElementById('tableContainer');
                const h2 = tableContainer.querySelector('h2');
                h2.textContent = `Users Data (${data.count} users)`;
                
                noData.style.display = 'none';
                tableContainer.style.display = 'block';
            } else {
                noData.style.display = 'block';
                tableContainer.style.display = 'block';
                tableBody.innerHTML = '';
            }
        } else {
            showError(`Error: ${data.error} - ${data.message || ''}`);
        }
        
    } catch (error) {
        hideLoading();
        btn.disabled = false;
        showError(`Connection error: ${error.message}`);
        console.error('Error:', error);
    }
}

// Save demo user
async function saveDemoUser() {
    showLoading();
    
    // Disable button during request
    const btn = document.getElementById('saveDemoBtn');
    btn.disabled = true;
    
    // Generate demo data
    const demoData = {
        name: `Demo User ${Math.floor(Math.random() * 1000)}`,
        device: navigator.userAgent.substring(0, 50),
        latitude: (Math.random() * 180 - 90).toFixed(6),
        longitude: (Math.random() * 360 - 180).toFixed(6),
        visit_time: new Date().toISOString()
    };
    
    try {
        const response = await fetch('/api/save-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(demoData)
        });
        
        const data = await response.json();
        
        hideLoading();
        btn.disabled = false;
        
        if (response.ok) {
            // Show success message
            const statusCard = document.getElementById('statusCard');
            const statusContent = document.getElementById('statusContent');
            
            statusContent.innerHTML = `
                <p style="color: #10b981;"><strong>✅ User saved successfully!</strong></p>
                <p><strong>Name:</strong> ${data.user.name}</p>
                <p><strong>ID:</strong> ${data.user.id}</p>
                <p>Click "Load Users" to see all users.</p>
            `;
            
            statusCard.style.display = 'block';
            
            // Auto-load users after 1 second
            setTimeout(() => {
                loadUsers();
            }, 1000);
        } else {
            showError(`Error: ${data.error} - ${data.message || ''}`);
        }
        
    } catch (error) {
        hideLoading();
        btn.disabled = false;
        showError(`Connection error: ${error.message}`);
        console.error('Error:', error);
    }
}
