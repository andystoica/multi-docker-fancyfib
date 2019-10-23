# Create a Multi Stage Production container for the Client Frontend

# STAGE 1
# Start from the Apline version of Node base image
FROM node:alpine as builder

# Copy the package.json and install all dependencies under /app
WORKDIR /app
COPY ./package*.json ./
RUN npm install

# Copy the remaining files and initiate the build
COPY ./ ./
CMD ["npm", "run", "build"]


# STAGE 2
# Start with a base nginx image
FROM nginx
EXPOSE 3000
# Copy only the build files from the builder stage
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
