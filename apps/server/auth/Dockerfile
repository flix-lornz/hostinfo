FROM node:18 as builder
WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile
RUN yarn nx build auth --prod
RUN yarn nx prisma-deploy auth

#WORKDIR /app
#FROM node:18


#COPY --from=builder /build/dist/apps/server/auth /app
#COPY --from=builder /build/node_modules /app/node_modules
#COPY --from=builder /build/package.json /app
 

CMD [ "node", "/app/dist/apps/server/auth/main" ]
EXPOSE 3334