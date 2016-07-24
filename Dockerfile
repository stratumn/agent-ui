FROM node:6

RUN mkdir /agent-ui

ADD package.json /agent-ui/package.json
RUN cd /agent-ui; npm install
ADD . /agent-ui/

WORKDIR /agent-ui

ENV NODE_ENV production

RUN npm run build

CMD npm run express
