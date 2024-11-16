const MongoDb = require('mongodb')
const {dbAccess} = require('../util/database')

class Product{

   constructor(title,price,description,imageUrl,id){
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
          this._id = id ? id : null;
   }

   save(){

     if(!this._id){
      let shopsDb = dbAccess();
      return shopsDb.collection('products').insertOne(this)
     }else{
      let shopsDb = dbAccess();
      return shopsDb.collection('products').updateOne({_id : new MongoDb.ObjectId(this._id)},{$set:this})
     }
    

   }

   static fetchAll(){

    let shopsDb = dbAccess();
    return shopsDb.collection('products').find().toArray().then(result => {
      console.log(result)
      return result
    }).catch(err => console.log(err))

   }

   static findById(id){

     let shopsDb = dbAccess();
     return shopsDb.collection('products').find({_id: new MongoDb.ObjectId(id) }).next().then(product => {
      console.log(product)
      return product
     }).catch(err => console.log(err))

   }

   static deleteById(prodId){
       let shopsDb = dbAccess();

       return shopsDb.collection('products').deleteOne({_id: new MongoDb.ObjectId(prodId) }).then(product => {
        console.log(product)
        return product
       }).catch(err => console.log(err))
   }
}



module.exports = Product;
