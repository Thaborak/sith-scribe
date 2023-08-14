# Use the official Node.js image as the base image
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .


# Expose the port that your application will listen on
EXPOSE 3001

# Start the application
CMD [ "npm", "start" ]
