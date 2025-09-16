# Multi-stage Dockerfile for SkillPath Platform

# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY packages/web/package*.json ./
COPY packages/web/tsconfig.json ./
COPY packages/web/next.config.ts ./
COPY packages/web/tailwind.config.js ./
COPY packages/web/postcss.config.mjs ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY packages/web/src ./src
COPY packages/web/public ./public

# Build the application
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Create necessary directories
RUN mkdir -p /app/.next/cache && chown nextjs:nodejs /app/.next/cache

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/api/health || exit 1

# Start the application
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "server.js"]