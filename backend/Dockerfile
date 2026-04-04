# Dockerfile for Backend

# BUILD STAGE
FROM node:20-alpine AS builder

# Install build dependencies for native modules (like bcrypt)
RUN apk add --no-cache make gcc g++ python3

WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm ci

# Copy source and prisma
COPY prisma ./prisma/
COPY src ./src/

# Generate Prisma Client
RUN npx prisma generate

# PRODUCTION STAGE
FROM node:20-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

# ENV
ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "start"]
