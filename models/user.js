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

   deleteItemFromCart(productId) {

    const updatedCartItems = this.cart.items.filter(item => {

      return item.productId.toString() !== productId.toString();

    });
    const db = dbAccess();
    return db.collection('users').updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: {items: updatedCartItems} } }
      );
  }

   getCart() {
    const db = dbAccess();

    const productIds = this.cart.items.map(i => {

      return i.productId;
    });

    return db
      .collection('products').find({ _id: { $in: productIds } }).toArray().then(products => {

        return products.map(p => {

          return {

            ...p,
            quantity: this.cart.items.find(i => {
              return i.productId.toString() === p._id.toString();
            }).quantity

          };
        });
      });
  }

  addOrder() {
    const db = dbAccess();
    return this.getCart()
      .then(products => {
        const order = {
          items: products,
          user: {
            _id: new ObjectId(this._id),
            name: this.userName
          }
        };
        return db.collection('orders').insertOne(order);
      })
      .then(result => {
        this.cart = { items: [] };
        return db
          .collection('users')
          .updateOne(
            { _id: new ObjectId(this._id) },
            { $set: { cart: { items: [] } } }
          );
      });
  }

  getOrders() {
    const db = dbAccess();
    return db
      .collection('orders')
      .find({ 'user._id': new ObjectId(this._id) })
      .toArray();
  }


  static findById(userId){
    let userCollection = dbAccess();
     return userCollection.collection('users').findOne({_id: new ObjectId(userId)})
   }
}
module.exports = User;
