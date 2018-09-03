import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const postSchema = new Schema({
  src: { type: 'String', required: true },
  dst: { type: 'String', required: true },
  duration: { type: 'String', required: true },
  est: { type: 'String', required: true },
  status: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Traffic', postSchema);
