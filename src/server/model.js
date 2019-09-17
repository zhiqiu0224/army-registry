const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;

const armySchema = new Schema({
    name: String,
    sex: String,
    rank: String,
    startDate: String,
    phone: String,
    email: String,
    superior: { type: Schema.Types.ObjectId, ref: 'Army'},
    avatar: String,
    ds: [{type: Schema.Types.ObjectId, ref: 'Army'}],
});

armySchema.plugin(mongoosePaginate);

const Army = mongoose.model('Army', armySchema);

module.exports = Army;