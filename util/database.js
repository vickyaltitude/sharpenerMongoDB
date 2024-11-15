const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectId;

let getDb;
async function getDataBase(callBack){
 
    let connectDB = await MongoClient.connect('mongodb://localhost:27017');
     let shopsDb =  connectDB.db('sharpenershops')
     getDb = shopsDb
    callBack()
     
}

let dbAccess = ()=>{

  if(getDb) return getDb;
  else throw "couldn't connect to database"

}


module.exports = {getDataBase,dbAccess,ObjectID};