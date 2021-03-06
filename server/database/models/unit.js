const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const SchemaUnit = new Schema({
  name: String,
  slug: { 
    type: String,
    slug: 'name'
  },
  symbol:      String,
  description: String,
  category: { 
    type: Number,
    ref:  'Category'
  },
  type: {
    type:    String,
    default: 'SI'     // 'SI' International System of Units / 'EN' English Units
  }  
});

SchemaUnit.index({ name: 'text' });

module.exports = Unit = mongoose.model('Unit', SchemaUnit);