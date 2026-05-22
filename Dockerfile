FROM node:22-bookworm-slim AS dev

WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["sh", "-c", "pnpm run posts && pnpm exec vite --host 0.0.0.0"]
