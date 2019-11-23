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
RUN npm install

# Setup app environment variables
ENV NODE_ENV='production'
ENV PORT='3040'
ENV CORS_WHITELIST='https://localhost:3000,https://localhost:3001'
ENV PUBLIC_KEY='./keys/public.key'
ENV JWT_ISSUER='diivix.com'
ENV JWT_AUDIENCE='diivix.com'
ENV JWT_EXPIRES_IN='12h'
ENV SPELLS_DATA='../../Data/compendium/spells.json'

CMD [ "npm", "start" ]
