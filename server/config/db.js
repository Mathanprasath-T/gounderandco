import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gounder_and_co';

  try {
    mongoose.set('strictQuery', false);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000, // Quick timeout if Mongo service isn't running locally
    });

    isConnected = true;
    console.log(`[MongoDB] Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.warn(`[MongoDB Notice] MongoDB not available locally: ${error.message}`);
    console.log(`[Backend Resiliency] Operating in fallback mode. Enquiries will be persisted safely to server/data/enquiries.json.`);
  }
}

export function isDbConnected() {
  return isConnected && mongoose.connection.readyState === 1;
}

