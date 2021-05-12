FROM node:12

# Create app directory
RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Installing dependencies
# COPY package.json .
# COPY package-lock.json .
# RUN npm install

# # Copying source files
# COPY . .

# # Building app
# RUN npm run build
# EXPOSE 3000

# # Running the app
# CMD ["npm run", "dev"]

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app
# Installing dependencies
COPY package*.json ./
RUN npm install
# Copying source files
COPY . .
# Building app
RUN npm run build
# Running the app
CMD [ "npm", "start" ]