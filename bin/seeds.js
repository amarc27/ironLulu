const mongoose = require("mongoose");
const User = require('../models/user');
const Campaign = require('../models/campaign');
mongoose.connect('mongodb://localhost/ironlulu');

const myUser = ({
  firstname: 'John',
  lastname: 'Doe',
  email: 'john.doe@gmail.com',
  password: 'john',
  description: 'I\' work in digital company'
});

const myCampaigns = [
  {
    name: 'Repassage de chemises',
    description: 'I need someone ironing my shirts',
    _creator: 'John Doe',
    address: '34 rue de Clery',
    execDate: new Date(2018,2,10,20,0),
    category: 'Menage & repassage'
  },
  {
    name: 'Déménagement',
    description: 'Lorem ipsum',
    _creator: 'John Doe',
    address: '32 rue du mail',
    execDate: new Date(2018,3,18),
    category: 'Déménagement'
  },
  {
    name: 'Bricolage',
    description: 'Vade retro',
    _creator: 'John Doe',
    address: '3 rue du test',
    execDate: new Date(2018,5,8),
    category: 'Bricolage'
  }
];

User.remove()
 .then(() => {
   User.create(myUser)
    .then(myDoc => {

      Campaign.remove()
        .then(() => {
          for (var i = 0; i < myCampaigns.length; i++) {
            myCampaigns[i]._creator = myDoc._id
          }
          Campaign.create(myCampaigns)
           .then(myDocs => {
             mongoose.disconnect();
           })
           .catch(err => { console.log(err) })
        });
    })
    .catch(err => { console.log(err) })
 });
