FROM pytorch/pytorch

CMD ["bash"]

# Install Node.js 8 and npm 5
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
RUN apt-get -y install nodejs
#RUN mkdir -p /workspace
WORKDIR /workspace

RUN rm -rf node_modules && npm install

COPY package.json ./
RUN npm install
RUN mkdir /workspace/images

COPY . .
EXPOSE 3000
ENTRYPOINT npm start
