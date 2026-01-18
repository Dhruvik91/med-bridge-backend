# ----------------------------
# Build Stage
# ----------------------------
FROM node:22-slim AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source code and build
COPY . .
RUN npm run build


# ----------------------------
# Production Stage
# ----------------------------
FROM node:22-slim

WORKDIR /app
ENV NODE_ENV=production

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy compiled app
COPY --from=builder /app/dist ./dist

# Use non-root user
USER node

# Default port
ENV PORT=3000
EXPOSE 3000

CMD ["node", "dist/main.js"]
