### 安装必要环境

- Node.js：[下载地址](https://nodejs.org/)
- Ollama（可选，用于本地模式）：[下载地址](https://ollama.ai)

### 配置 API Key（仅在线API模式需要）

- 复制 `config.example.js` ，并将新文件重命名为 `config.js`
- 根据其中的备注，配置至少一个在线模型的 API Key

#### Windows

```bash
# 使用Git Bash
sh start.sh
```

```bash
# 或使用 PowerShell/CMD
bash start.sh
```

启动脚本会自动：
- 检查环境依赖
- 安装所需包
- 启动服务器