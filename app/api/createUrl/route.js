import mongoose from "mongoose";
import Link from "../../model/linkSchema";
import Counter from "../../model/counter";
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}
export async function POST(request) {
  try {
    const data = await request.json();
    const newLink = new Link({
      longUrl: data.longUrl,
      shortUrl: data.shortUrl,
    });
    await newLink.save();
    const counter = await Counter.findOneAndUpdate(
      { latestCode: { $exists: true } },
      { latestCode: data.shortUrl },
      { new: true }
    );
    
    if (!counter) {
      const newCounter = new Counter({ latestCode: data.shortUrl });
      await newCounter.save();
    }
    return new Response(JSON.stringify({ message: "URL saved successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error saving URL:", error.message);
    return new Response(JSON.stringify({ message: "Failed to save URL" }), {
      status: 500,
    });
  }
}
