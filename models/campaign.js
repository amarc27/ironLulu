const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const TYPES    = require('./campaign-types');

const campaignSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  deadline: { type: Date, required: true },
  category: { type: String, enum: TYPES, required: true },
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;