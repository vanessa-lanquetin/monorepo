FROM alpine:3.14
RUN apk add --upgrade --no-cache vips-dev build-base --repository https://alpine.global.ssl.fastly.net/alpine/v3.10/community/
RUN apk --no-cache add gcc g++ make python3 nodejs npm yarn vips udev ttf-freefont chromium harfbuzz nss musl
ARG NPM_TOKEN 
ARG PACKAGE_VERSION
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
WORKDIR /core
RUN echo -e "\n//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
RUN echo -e "\n@vanessa-lanquetin:registry=https://npm.pkg.github.com" >> .npmrc
RUN yarn add "@vanessa-lanquetin/todolist-server@${PACKAGE_VERSION}"
RUN rm -f .npmrc

# Add your source files
CMD ./node_modules/.bin/todolist-server
