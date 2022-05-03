const db = require('mongoose')

db.Promise = global.Promise;

const connect = async (url) => {
  await db.connect(url, {
    useUnifiedTopology:true,
    useNewUrlParser:true
  });
  console.log('Se conecto a la base de datos')
}

module.exports = connect;

/*
const MONGODB_URI = 'mongodb://localhost/PW2'

mongoose.connect(MONGODB_URI,{
  useUnifiedTopology:true,
  useNewUrlParser:true
})

      .then(db => console.log('Se conecto a la base de datos'))
      .catch(err => console.log(err));
*/
