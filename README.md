# my-protfolio-app

## 容器开发

前提：设备上只需要安装 Docker Desktop，或其他支持 Docker Compose 的 Docker 环境。

启动开发服务器：

```sh
docker compose up --build
```

浏览器打开：

```text
http://localhost:5173
```

开发服务器只绑定到宿主机 `127.0.0.1`，不会通过宿主机端口暴露给局域网其他设备。

进入容器执行命令：

```sh
docker compose exec app sh
```

在宿主机不安装 Node 或 pnpm 的情况下运行检查：

```sh
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```

修改 `package.json` 或 `pnpm-lock.yaml` 里的依赖后，重建镜像并刷新依赖卷：

```sh
docker compose down -v
docker compose up --build
```

如果浏览器提示 `ERR_EMPTY_RESPONSE`，先查看日志：

```sh
docker compose logs app
```

然后重建并清理依赖卷：

```sh
docker compose down -v
docker compose up --build
```
