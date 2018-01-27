const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  description: String,
  address: String,
}, {
timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model('User', userSchema);
module.exports = User;





// role: {
//     type: String,
//     enum: ['ADMIN', 'USER'],
//     default: 'USER'
// }