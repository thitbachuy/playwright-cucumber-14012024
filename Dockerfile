FROM node:21-alpine3.18

WORKDIR /app
 
COPY package.json .
COPY src src
COPY cucumber.js .
COPY playwright.config.ts .
 
RUN npm install
RUN npx playwright install 

CMD ["npm", "test"]