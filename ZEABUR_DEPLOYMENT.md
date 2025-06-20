# Zeabur 部署指南

这个项目包含一个React前端和一个FastAPI后端，可以分别部署到Zeabur上。

## 部署步骤

### 方法一：分别部署前后端（推荐）

#### 1. 部署后端服务

1. 在Zeabur控制台创建新项目
2. 选择从GitHub导入代码
3. 选择 `server` 目录作为根目录
4. Zeabur会自动检测到Python项目并使用FastAPI框架
5. 设置环境变量：
   - `ENVIRONMENT=production`
   - 其他必要的API密钥和配置

#### 2. 部署前端服务

1. 在同一个Zeabur项目中添加新服务
2. 选择从GitHub导入代码
3. 选择 `react` 目录作为根目录
4. Zeabur会自动检测到Node.js项目并构建React应用
5. 配置环境变量以连接到后端API：
   - `VITE_API_URL=https://jaazapi.zeabur.app`

### 方法二：单体部署

如果您希望将前后端部署为单个服务：

1. 确保在 `server/main.py` 中正确配置了静态文件服务
2. 先构建前端：在 `react` 目录运行 `npm run build`
3. 将构建后的文件复制到适当位置
4. 部署整个项目到Zeabur

## 环境变量配置

### 后端必要环境变量：
- `PORT`: Zeabur会自动设置
- `ENVIRONMENT=production`
- `UI_DIST_DIR`: 如果使用单体部署，指向前端构建目录

### 前端环境变量：
- `VITE_API_URL=https://jaazapi.zeabur.app`: 后端API的URL

## 本地开发

保持原有的开发流程：

```bash
# 启动前端
cd react
npm i && npm run dev

# 启动后端
cd server
pip install -r requirements.txt
python main.py
```

## 注意事项

1. 确保所有必要的API密钥已在Zeabur环境变量中配置
2. 如果使用数据库，需要在Zeabur中配置相应的数据库服务
3. ✅ CORS已配置：后端已配置允许 `jaaz.zeabur.app` 访问 `jaazapi.zeabur.app`
4. 确保所有依赖都在requirements.txt和package.json中正确列出

## 故障排除

### CORS错误
如果遇到CORS错误：
- 确保后端的CORS配置包含了前端域名
- 当前已配置允许: `https://jaaz.zeabur.app` 和 `https://*.zeabur.app`
- 如果前端域名变更，需要更新 `server/main.py` 中的 `allow_origins` 列表

### 构建错误
✅ 已修复的问题：
- TypeScript错误：`'await' expressions are only allowed within async functions`
- API调用错误：所有API调用现在都使用 `buildApiUrl()` 函数
- 前端构建现在可以正常完成

### API连接问题
✅ 已修复的问题：
- 405 Method Not Allowed错误：前端现在正确连接到后端域名
- API URL配置：开发环境使用代理，生产环境直接连接到 `jaazapi.zeabur.app`

## 配置文件说明

- `react/zbpack.json`: React前端的Zeabur构建配置
- `server/zbpack.json`: Python后端的Zeabur构建配置

这些配置文件告诉Zeabur如何构建和运行您的应用程序。 