FROM node:21-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

FROM base AS development
EXPOSE 4029
CMD ["npm", "run", "start:dev"]


