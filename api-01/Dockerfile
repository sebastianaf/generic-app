FROM node:16
COPY ["package.json","package-lock.json","/org/app/"]
WORKDIR /usr/org/app
RUN npm install
RUN npm run build
COPY [".","/org/app/"]
EXPOSE ${API_PORT}
CMD ["npm", "start"]
