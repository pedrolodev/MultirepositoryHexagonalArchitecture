#Each instruction in this file creates a new layer
#Here we are getting our node as Base image
FROM node:latest
#Creating a new directory for app files and setting path in the container
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/src
#setting working directory in the container
WORKDIR /usr/src/app
#copying the package.json file(contains dependencies) from project source dir to container dir
COPY package*.json /usr/src/app
RUN npm install
ADD src /usr/src/app/src
ADD test /usr/src/app/test
COPY tsconfig.json /usr/src/app/
# installing the dependencies into the container

#container exposed network port number
EXPOSE 5001
#command to run within the container
CMD ["npm","run","dev:ef:backend"]