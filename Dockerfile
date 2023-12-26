# Pull Alpine Linux Image with node 18 LTS
FROM node:18.1.0-alpine

# Creating and setting app dir
RUN mkdir /casa-roma
WORKDIR /casa-roma

# Copy all elements to the image see .dockerignore
COPY . .

# Exposing app port
EXPOSE 5001

# Install dependencies and start the app
ENTRYPOINT [ "sh", "-c" ]
CMD [ "yarn && yarn start" ]
