# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
#COPY package-lock.js ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 8082

# Define environment variables
ENV PORT=8082

# Run the Next.js app in development mode by default
CMD ["npm", "run", "dev"]

# Build Stage
# To create a production build, use the following commands:
# 1. docker build -t your-app-name --target build .
# 2. docker run -p 8082:8082 your-app-name
#
# If you want to run the container in production mode, uncomment the following lines:
#
# FROM node:18-alpine AS build
# WORKDIR /app
# COPY package.json ./
# COPY package-lock.json ./
# RUN npm install
# COPY . .
# RUN npm run build
#
# FROM node:18-alpine AS production
# WORKDIR /app
# COPY --from=build /app ./
# EXPOSE 8082
# ENV NODE_ENV=production
# CMD ["npm", "run", "start"]
