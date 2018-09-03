import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  summary: { type: 'String', required: true },
  temperature: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Weather', postSchema);
