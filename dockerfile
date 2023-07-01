FROM node:18-alpine AS base

# dependency 설치
FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /usr/src/app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.bashrc" SHELL="$(which bash)" bash -
RUN pnpm i --frozen-lockfile; 

# 프로젝트를 빌드하는 컨테이너입니다.
FROM base AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

# 프로덕션에서 실행되는 이미지입니다. 빌드된 결과물과 public asset을 가지고 와서 next를 실행합니다.
FROM base AS runner

WORKDIR /usr/src/app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV NEXT_PUBLIC_API_URL https://api.jalingobi.com
ENV NEXT_PUBLIC_KAKAO_CLIENT_ID 05853a15a5b25d2003a144e6e4c312c7
ENV NEXT_PUBLIC_KAKAO_REDIRECT_URL https://jalingobi.com/auth/kakao
ENV NEXT_PUBLIC_KAKAO_CLIENT_SECRET p7ABkLq3Izo05Ci78aPfKRN21ASoWyLT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /usr/src/app/public ./public
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /usr/src/app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
