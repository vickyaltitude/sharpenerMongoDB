const {dbAccess} = require('../util/database')

class Product{

   constructor(title,price,description,imageUrl){
          this.title = title;
          this.price = price;
          this.description = description;
          this.imageUrl = imageUrl;
   }

   save(){

       let shopsDb = dbAccess();
       return shopsDb.collection('products').insertOne(this)

   }
}



module.exports = Product;
