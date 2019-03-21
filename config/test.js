const config = {
  port: process.env.PORT || 3000,
  mongo: {
    uri: 'mongodb://paspam:smashingBoxesTest9@ds335275.mlab.com:35275/todo-app-test',
    options: {
      keepAlive: process.env.MONGO_KEEPALIVE || 300000,
      connectTimeoutMS: process.env.MONGO_CONNECT_TIMEOUT || 300000,
      useNewUrlParser: true
    }
  }
};

module.exports = config;
