import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  image1: { type: 'String', required: true },
  image2: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Camera', postSchema);
