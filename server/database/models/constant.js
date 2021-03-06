const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const SchemaConstant = new Schema({
  slug: { type: String, slug: 'name' },
  name:  String,
  symbol:      String,
  description: String,
  value:       Number,
  lang: {
    es: {
      name: String,
      description: String
    }
  },
  category: { 
    type: Schema.Types.ObjectId,
    ref:  'Category'
  },
  unit: {
    type: Schema.Types.ObjectId,
    ref:  'Unit'
  },
  values: [{
    value: Schema.Types.Mixed,
    exact: Boolean,
    unit: {
      type: Schema.Types.ObjectId,
      ref:  'Unit'
    }
  }]
});

module.exports = mongoose.model('Constant', SchemaConstant);