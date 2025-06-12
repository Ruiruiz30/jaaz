import os
import sys
import io
# Ensure stdout and stderr use utf-8 encoding to prevent emoji logs from crashing python server
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8")
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding="utf-8")

from routers import config, agent, workspace, image_tools, canvas, ssl_test, chat_router, websocket_router, settings
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import argparse
from contextlib import asynccontextmanager

root_dir = os.path.dirname(__file__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # onstartup
    await agent.initialize()
    yield
    # onshutdown

app = FastAPI(lifespan=lifespan)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5174",  # 本地开发前端
        "http://127.0.0.1:5174",  # 本地开发前端
        "https://jaaz.zeabur.app",  # 生产环境前端域名
        "https://*.zeabur.app",  # 允许所有zeabur子域名
    ],
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有HTTP方法
    allow_headers=["*"],  # 允许所有请求头
)

# Include routers
app.include_router(config.router)
app.include_router(settings.router)
app.include_router(agent.router)
app.include_router(canvas.router)
app.include_router(workspace.router)
app.include_router(image_tools.router)
app.include_router(ssl_test.router)
app.include_router(chat_router.router)
app.include_router(websocket_router.wsrouter)
# Mount the React build directory
react_build_dir = os.environ.get('UI_DIST_DIR', os.path.join(
    os.path.dirname(root_dir), "react", "dist"))

static_site = os.path.join(react_build_dir, "assets")
if os.path.exists(static_site):
    app.mount("/assets", StaticFiles(directory=static_site), name="assets")


@app.get("/")
async def serve_react_app():
    return FileResponse(os.path.join(react_build_dir, "index.html"))


if __name__ == "__main__":
    # bypas localhost request for proxy, fix ollama proxy issue
    _bypass = {"127.0.0.1", "localhost", "::1"}
    current = set(os.environ.get("no_proxy", "").split(",")) | set(
        os.environ.get("NO_PROXY", "").split(","))
    os.environ["no_proxy"] = os.environ["NO_PROXY"] = ",".join(
        sorted(_bypass | current - {""}))

    parser = argparse.ArgumentParser()
    # 默认从环境变量获取端口，如果没有则使用57988
    default_port = int(os.environ.get('PORT', '57988'))
    parser.add_argument('--port', type=int, default=default_port,
                        help='Port to run the server on')
    args = parser.parse_args()
    import uvicorn
    print("🌟Starting server, UI_DIST_DIR:", os.environ.get('UI_DIST_DIR'))
    # 在生产环境中绑定到0.0.0.0以接受外部连接
    host = "0.0.0.0" if os.environ.get('ENVIRONMENT') == 'production' else "127.0.0.1"
    uvicorn.run(app, host=host, port=args.port)
