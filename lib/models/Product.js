import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: String, required: true },
  category: { type: String, default: 'Uncategorized' },
  imageUrl: { type: String }, // stored via Cloudinary
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
