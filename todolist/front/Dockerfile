FROM alpine:3.14
RUN apk --no-cache add nodejs npm yarn
ARG NPM_TOKEN 
ARG PACKAGE_VERSION
WORKDIR /core
RUN echo -e "\n//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
RUN echo -e "\n@vanessa-lanquetin:registry=https://npm.pkg.github.com" >> .npmrc
RUN yarn add "@vanessa-lanquetin/todolist-front@${PACKAGE_VERSION}"
RUN rm -f .npmrc

CMD node node_modules/@vanessa-lanquetin/todolist-front/server.js
