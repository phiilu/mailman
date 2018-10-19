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
COPY client/.env.production client/.env.production

RUN npm install && cd client && npm install && cd -

# Copy all local files into the image.
COPY . .

RUN sed -i'' -e 's/"homepage": "http:\/\/localhost:4000\/"/"homepage": "http:\/\/localhost:4000\/mailman"/g' client/package.json
RUN sed -i'' -e 's/REACT_APP_BASENAME=\//REACT_APP_BASENAME=\/mailman/g' client/.env.production

# Build for production.
RUN npm run build && cd client && npm run build && cd - 