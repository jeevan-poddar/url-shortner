import mongoose from "mongoose";
import Link from "../../model/linkSchema";
try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}
export async function POST(request) {
  try {
    const data = await request.json();
    const link = await Link.findOne({ shortUrl: data.code });
    if (link) {
      return new Response(
        JSON.stringify({ message: "URL found", longURL: link.longUrl }),
        {
          status: 200,
        },
      );
    } else {
      return new Response(JSON.stringify({ message: "URL not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error fetching URL:", error.message);
    return new Response(JSON.stringify({ message: "Failed to fetch URL" }), {
      status: 500,
    });
  }
}
