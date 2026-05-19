FROM node:22-slim

WORKDIR /app

COPY package.json ./
RUN corepack enable && pnpm install

COPY server/ ./server/
COPY web-client/ ./web-client/

EXPOSE 3000

ENV NODE_ENV=production
CMD ["node", "server/index.js"]
