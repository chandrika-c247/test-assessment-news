import { Schema, model } from 'mongoose';

const schema = new Schema({
  title: { type: String, default: '' },
  body: { type: String, default: '' },
  authorEmail: { type: String, default: '' },
  publicationDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = model('articles', schema);
