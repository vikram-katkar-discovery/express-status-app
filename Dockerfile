# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm ci --production

# Copy the current directory contents to the container at /app
COPY server.js ./

# Expose port 3000 to the outside world
EXPOSE 3000

# Set the default interval to 5 minutes (300 seconds)
ENV STATUS_INTERVAL_SECONDS 300

# Run the command to start your Express.js app
CMD ["node", "server.js"]
