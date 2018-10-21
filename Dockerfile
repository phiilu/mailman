FROM node:8.12.0

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

RUN mkdir -p /opt/mailman/app
RUN mkdir /opt/mailman/frontend
RUN mkdir /opt/mailman/backend
WORKDIR /opt/mailman

# Backend
COPY ./backend/package.json /opt/mailman/backend/package.json
RUN cd /opt/mailman/backend && npm install && cd -

# Frontend
COPY ./frontend/package.json /opt/mailman/frontend/package.json
RUN cd /opt/mailman/frontend && npm install && cd -

# Copy all local files into the image.
COPY . .

# Backend
RUN cd /opt/mailman/backend && npm run build
RUN mv build ../app

# Frontend
RUN cd /opt/mailman/frontend && npm run build 
RUN mv build ../app/client

RUN rm -rf backend frontend

CMD ["node", "app/main.js"]
EXPOSE 4000