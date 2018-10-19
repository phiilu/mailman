# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:8.11.2

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install and configure `serve`.
CMD ["node", "build/main.js"]
EXPOSE 4000

RUN mkdir -p /opt/mailman/client
WORKDIR /opt/mailman

# Install all dependencies of the current project.
COPY package.json package.json
# Client
COPY client/package.json client/package.json

RUN npm install && cd client && npm install && cd -

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build && cd client && npm run build && cd - 