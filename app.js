const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
 //const User = require('./models/user')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/* app.use((req, res, next) => {

   User.findById('67385ae96cd256d20e86b01d')
    .then(user => {
      req.user = new User(user.userName,user.userEmail,user.cart,user._id);
      next();
    })
    .catch(err => console.log(err)); 

});
 */
app.use('/admin', adminRoutes);
app.use(shopRoutes); 

app.use(errorController.get404);

mongoose.connect('mongodb://localhost:27017/sharpenershops').then(result =>{

  app.listen(3000,()=> console.log(`Server is running on port ${3000}`))

}).catch(err => console.log(err))
