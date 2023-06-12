#------------ 1. Stage

FROM node:18 as builder
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn nx build auth --prod
RUN yarn nx prisma-deploy auth

#----------- 2. Stage

#FROM 


FROM node:18

ENV NODE_ENV=production

WORKDIR /app

COPY --from=builder /build/package.json .
COPY --from=builder /build/yarn.lock .
COPY --from=builder /build/node_modules/@hostinfo/auth-prisma node_modules/@hostinfo/auth-prisma
RUN yarn install --frozen-lockfile --prod

CMD [ "node", "/app/main" ]
EXPOSE 3334