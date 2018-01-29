const mongoose = require("mongoose");
const User = require('../models/user');
const Campaign = require('../models/campaign');
mongoose.connect('mongodb://localhost/ironLulu');

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
    deadline: 19/Apr/2010:06:36:15 -0700,
    category: 'Menage & repassage'
  },
  {
    name: 'Déménagement',
    description: 'Lorem ipsum',
    _creator: 'John Doe',
    address: '32 rue du mail',
    deadline: 04/Apr/2010:06:36:15 -0700,
    category: 'Déménagement'
  },
  {
    name: 'Bricolage',
    description: 'Vade retro',
    _creator: 'John Doe',
    address: '3 rue du test',
    deadline: 12/Apr/2010:06:36:15 -0700,
    category: 'Bricolage'
  }
];

User.remove()
 .then(() => {
   User.create(myUser)
    .then(myDocs => {
      console.log(myDocs);
    })
    .catch(err => { console.log(error) })
 });

 Campaign.remove()
  .then(() => {
    User.create(myCampaigns)
     .then(myDocs => {
       console.log(myDocs);
     })
     .catch(err => { console.log(error) })
  });
