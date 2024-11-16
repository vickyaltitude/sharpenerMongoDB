const MongoDb = require('mongodb')
const dbAccess = require('../util/database').dbAccess;

let ObjectId = MongoDb.ObjectId

class User{
   constructor(userName,userEmail){
      this.userName = userName;
      this.userEmail = userEmail;
   }

   save(){
     let userCollection = dbAccess();
     return userCollection.collection('users').insertOne(this)
   }

  static findById(userId){
    let userCollection = dbAccess();
     return userCollection.collection('users').findOne({_id: new ObjectId(userId)})
   }
}
module.exports = User;
