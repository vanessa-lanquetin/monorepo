FROM alpine:3.17
RUN apk --no-cache add gcc g++ make python3 nodejs npm yarn
WORKDIR /core
ARG NPM_TOKEN 
ARG PACKAGE_VERSION
RUN echo -e "\n//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
RUN echo -e "\n@vanessa-lanquetin:registry=https://npm.pkg.github.com" >> .npmrc
RUN yarn add "@vanessa-lanquetin/meteo@${PACKAGE_VERSION}"
RUN rm -f .npmrc

# Add your source files
CMD ./node_modules/.bin/meteo
