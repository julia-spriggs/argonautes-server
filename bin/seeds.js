const mongoose = require('mongoose');
const User = require('../models/User.model');

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/argonautes-server';

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

  const names = [
    { name: 'Eleftheria' },
    { name: 'Gennadios' },
    { name: 'Lysimachos' },
  ];

  const usersPromise = User.create(names);

  Promise.all([usersPromise])
    .then((result) => {
        const usersCreated = result[0];
        console.log(`Number of users created... ${usersCreated.length}`);

        return mongoose.connection.close();
    })
    .then(() => console.log('connection closed'))
    .catch(e => console.log('error sending data to DB', e))