const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const moment   = require('moment');
const TYPES    = require('./campaign-types');

const campaignSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  _creator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  address: { type: String, required: true },
  execDate: { type: Date, required: true },
  category: { type: String, enum: TYPES, required: true },
  applicants: [{ type: Schema.Types.ObjectId, ref: 'User'}]
},
{
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

campaignSchema.virtual('timeRemaining').get(function () {
  let remaining = moment(this.execDate).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return { days, unit };
});

campaignSchema.virtual('inputFormattedDate').get(function(){
  return moment(this.execDate).format('YYYY-MM-DD');
});


campaignSchema.methods.belongsTo = function(user){
  return user && this._creator.equals(user._id);
};

const Campaign = mongoose.model('Campaign', campaignSchema);
module.exports = Campaign;
