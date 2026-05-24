const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.moc3': 'application/octet-stream',
    '.moc': 'application/octet-stream',
    '.mtn': 'application/octet-stream',
    '.physics3.json': 'application/json',
    '.pose3.json': 'application/json',
    '.userData3.json': 'application/json',
};

const server = http.createServer((req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }

    // Decode URI to support spaces and special characters in paths
    let decodedUrl;
    try {
        decodedUrl = decodeURIComponent(req.url.split('?')[0]);
    } catch (e) {
        decodedUrl = req.url.split('?')[0];
    }

    // Intercept /affection API
    if (decodedUrl === '/affection') {
        const affectionPath = path.join(__dirname, 'affection.json');
        
        if (req.method === 'GET') {
            if (!fs.existsSync(affectionPath)) {
                // Generate record file if it does not exist
                const initialData = { points: 30, level: 1 };
                fs.writeFileSync(affectionPath, JSON.stringify(initialData, null, 4));
            }
            fs.readFile(affectionPath, (error, content) => {
                if (error) {
                    res.writeHead(500);
                    res.end(`Server Error: ${error.code}`);
                } else {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(content, 'utf-8');
                }
            });
            return;
        }
        
        if (req.method === 'POST') {
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                try {
                    const data = JSON.parse(body);
                    fs.writeFileSync(affectionPath, JSON.stringify(data, null, 4));
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ success: true }));
                } catch (e) {
                    res.writeHead(400);
                    res.end(JSON.stringify({ error: 'Invalid JSON body' }));
                }
            });
            return;
        }
    }

    let filePath = path.join(__dirname, decodedUrl === '/' ? 'index.html' : decodedUrl);
    
    // Safety check - prevent directory traversal
    if (!filePath.startsWith(__dirname)) {
        res.writeHead(403);
        res.end('403 Forbidden');
        return;
    }

    const extname = path.extname(filePath).toLowerCase();
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                res.writeHead(500);
                res.end(`Server Error: ${error.code}`);
            }
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
