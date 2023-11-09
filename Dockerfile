# Pull Alpine Linux Image
FROM alpine:latest

# Creating and setting app dir
RUN mkdir /casa-roma
WORKDIR /casa-roma

# Copy all elements to the image see .dockerignore
COPY . .

# Install nodejs
RUN apk add --update nodejs npm

# Install yarn
RUN npm install --global yarn

# Exposing app port
EXPOSE 5001

# Install dependencies and start the app
ENTRYPOINT [ "sh", "-c" ]
CMD [ "yarn && yarn start" ]
