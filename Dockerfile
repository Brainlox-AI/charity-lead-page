
# Use a Node.js base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

# Install dependencies using npm ci
RUN npm install

RUN npm run build

# Expose the port on which your app runs
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]