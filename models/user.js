const MongoDb = require('mongodb')
const dbAccess = require('../util/database').dbAccess;

let ObjectId = MongoDb.ObjectId

class User{
   constructor(userName,userEmail,cart = [],id){
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

    console.log(this)
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      updatedCartItems.push({
        productId: new ObjectId(product._id),
        quantity: newQuantity
      });
    }
    const updatedCart = {
      items: updatedCartItems
    };
    const db = dbAccess();
    return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
      
   }

  static findById(userId){
    let userCollection = dbAccess();
     return userCollection.collection('users').findOne({_id: new ObjectId(userId)})
   }
}
module.exports = User;
