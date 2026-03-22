# Assigning a base image for the Dockerfile
FROM node:20-alpine

# Setting the working directory inside the container
WORKDIR /app

# Copying the package.json file to the container
COPY package.json .

# Installing the dependences
RUN npm install

# Copying all the files
COPY . .

# Exposing the container
EXPOSE 3000

# Start Up command
CMD [ "npm", "start"]