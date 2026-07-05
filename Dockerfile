FROM node:20-alpine AS base
WORKDIR /app

# Install dependencies
COPY Documents/Cal/package.json Documents/Cal/package-lock.json ./
RUN npm ci

# Copy source and build
COPY Documents/Cal/. ./
RUN npm run build


FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=7860
ENV HOSTNAME="0.0.0.0"

# Copy standalone build output
COPY --from=base /app/.next/standalone ./
COPY --from=base /app/.next/static ./.next/static
COPY --from=base /app/public ./public

EXPOSE 7860

CMD ["node", "server.js"]
