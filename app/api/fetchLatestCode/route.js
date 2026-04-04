import mongoose from "mongoose";
import Counter from "../../model/counter";
try {  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.error("Error connecting to MongoDB:", error.message);
}
export async function GET() {
  try {
    const links = await Counter.findOne({ latestCode: { $exists: true } });
    return new Response(JSON.stringify(links), { status: 200 });
  } catch (error) {
    console.error("Error fetching links:", error.message);
    return new Response(JSON.stringify({ message: "Failed to fetch links" }), {
      status: 500,
    });
  }
}