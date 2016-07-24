FROM node:6

RUN mkdir /agent-ui

RUN npm install -g bower

ADD package.json /agent-ui/package.json
ADD bower.json /agent-ui/bower.json
RUN cd /agent-ui; npm install && bower install --allow-root
ADD . /agent-ui/

WORKDIR /agent-ui

ENV NODE_ENV production

RUN npm run build

CMD npm run express
