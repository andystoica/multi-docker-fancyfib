# Create a Development Container for the Worker Backend
# Start from the Apline version of Node base image
FROM node:alpine

# Copy the package.json and install all dependencies under /app
WORKDIR /app
COPY ./package.json ./
RUN npm install

# Copy the remaining files
COPY ./ ./

# On Container startup, run the start script
CMD ["npm", "run", "start"]
