
# Use a Node.js base image
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code
COPY . .

RUN curl -o /app/.env "https://envvar.blob.core.windows.net/env/charity.txt?sp=r&st=2024-04-03T19:14:23Z&se=2029-02-28T03:14:23Z&spr=https&sv=2022-11-02&sr=b&sig=qX38jbCZgBa7hfubAls1r5C%2FjxZUrObotxm%2FkljQkYQ%3D"

# Install dependencies using npm ci
RUN npm install

RUN npm run build

# Expose the port on which your app runs
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
