const config = {
  port: process.env.PORT || 5000,
  mongo: {
    uri: 'mongodb://paspam:smashingBoxes9@ds117866.mlab.com:17866/sb-todo-app',
    options: {
      keepAlive: process.env.MONGO_KEEPALIVE || 300000,
      connectTimeoutMS: process.env.MONGO_CONNECT_TIMEOUT || 300000,
      useNewUrlParser: true
    }
  }
};

module.exports = config;
