FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Bundle app source
COPY . .

RUN mkdir -p /data/keys
# If you are building your code for production
# RUN npm ci --only=production
RUN npm install
# RUN npm ci --only=production
# RUN node_modules/.bin/sequelize db:migrate
# RUN node_modules/.bin/sequelize db:seed:all

# Setup app environment variables
ENV NODE_ENV='production'
ENV PORT='3040'
ENV CORS_WHITELIST='https://localhost:3000,https://localhost:3001'
ENV SERVER_KEY='/data/keys/server.key'
ENV SERVER_CERT='/data/keys/server.crt'
ENV PRIVATE_KEY='/data/keys/private.key'
ENV PUBLIC_KEY='/data/keys/public.key'
ENV JWT_ISSUER='ticketboothauth.com'
ENV JWT_AUDIENCE='compendium.com'
ENV JWT_EXPIRES_IN='12h'

CMD [ "npm", "start" ]
