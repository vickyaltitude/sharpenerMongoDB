const MongoDb = require('mongodb')
const dbAccess = require('../util/database').dbAccess;

let ObjectId = MongoDb.ObjectId

class User{
   constructor(userName,userEmail,cart,id){
      this.userName = userName;
      this.userEmail = userEmail;
      this.cart = cart;
      this._id = id
       }

   save(){
     let userCollection = dbAccess();
     return userCollection.collection('users').insertOne(this)
   }

   addToCart(product){


    const updatedCart = {items :[{productId: new ObjectId(product._id),quantity:1}]} ;
    let userCollection = dbAccess();
   return userCollection.collection('users').updateOne({_id: new ObjectId(this._id)},{$set:{cart:updatedCart}})
      
   }

  static findById(userId){
    let userCollection = dbAccess();
     return userCollection.collection('users').findOne({_id: new ObjectId(userId)})
   }
}
module.exports = User;
