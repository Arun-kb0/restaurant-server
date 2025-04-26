# * build 
FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx prisma generate

RUN npm run build

# * prod
FROM node:lts-alpine
WORKDIR /app

RUN apk add --no-cache openssl curl

COPY --from=builder /app/package*.json ./
RUN npm ci --production

COPY --from=builder /app/build        ./build

COPY --from=builder /app/src/generated/prisma ./src/generated/prisma

EXPOSE 3001
CMD ["node", "build/index.js"]
