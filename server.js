const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 3000;

// 启用 CORS
app.use(cors());
app.use(express.json());
// 服务静态文件
app.use(express.static(path.join(__dirname, '.')));

// 代理 API 请求
app.post('/api/chat', async (req, res) => {
    const model = req.body.model || 'qwen-turbo';
    const apiKey = req.headers.authorization;
    
    if (!apiKey) {
        return res.status(401).json({ error: 'API Key is required' });
    }

    try {
        let response;
        if (model === 'qwen-turbo') {
            response = await fetch('https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation', {
                method: 'POST',
                headers: {
                    'Authorization': apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });
        } else if (model === 'deepseek-chat' || model === 'deepseek-reasoner') {
            // DeepSeek API 转发
            response = await fetch('https://api.deepseek.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });
        } else {
            return res.status(400).json({ error: 'Unsupported model' });
        }

        if (!response.ok) {
            const error = await response.json();
            return res.status(response.status).json(error);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('API request failed:', error);
        res.status(500).json({ error: 'Failed to process request' });
    }
});

app.listen(port, () => {
    console.log(`服务器运行在 http://localhost:${port}`);
}); 