import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
    latestCode: { type: String, required: true },
});

let Counter = mongoose.models.Counter || mongoose.model("Counter", linkSchema);

export default Counter;