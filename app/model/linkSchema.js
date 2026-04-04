import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

let Link = mongoose.models.Link || mongoose.model("Link", linkSchema);

export default Link;