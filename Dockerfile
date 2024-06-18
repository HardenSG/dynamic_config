# 基于node@16.20.2
FROM node:16

# 创建一个目录
RUN mkdir -p /usr/src/nest/

# 工作目录
WORKDIR /usr/src/nest/

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY . /usr/src/nest/
RUN cd /usr/src/nest/
RUN npm ci

# 构建应用
RUN npm run build

# 复制 package.json 和 Dockerfile 到 dist 目录
COPY package.json /usr/src/nest/dist
COPY Dockerfile /usr/src/nest/dist

# 全局安装 PM2
RUN npm install pm2 -g

EXPOSE 3000

# 使用 PM2 启动应用
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
