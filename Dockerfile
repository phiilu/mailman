# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.6.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
CMD npm start
EXPOSE 4000

# Install all dependencies of the current project.
COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production && cd client && npm run build --production && cd -