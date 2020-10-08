# pull official base image
FROM node:12-alpine

# Create frontend directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install

COPY . .

# Make port 3000 available to the world outside this container
# EXPOSE 3000

# start app
CMD ["npm", "start"]