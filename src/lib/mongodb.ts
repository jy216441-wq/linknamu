import mongoose from "mongoose";

declare global {
  var mongooseConnectionPromise: Promise<typeof mongoose> | undefined;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다.");
  }

  if (!globalThis.mongooseConnectionPromise) {
    globalThis.mongooseConnectionPromise = mongoose.connect(uri);
  }

  return globalThis.mongooseConnectionPromise;
}
