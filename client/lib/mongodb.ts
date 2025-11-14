import { MongoClient, Db } from "mongodb";

declare global {
  // these globals ensure the connection is reused in development (hot reload)
   
  var _mongoClientPromise: Promise<MongoClient> | undefined;
   
  var _mongoDB: Db | undefined;
}

const uri = process.env.MONGODB_URI!;
const dbName = process.env.MONGODB_DB!;

if (!uri) throw new Error("Please define MONGODB_URI in .env.local");
if (!dbName) throw new Error("Please define MONGODB_DB in .env.local");

let cachedClient: Promise<MongoClient> | undefined = global._mongoClientPromise;
let cachedDb: Db | undefined = global._mongoDB;

if (!cachedClient) {
  const client = new MongoClient(uri);
  cachedClient = client.connect();
  global._mongoClientPromise = cachedClient;
}

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;
  const client = await cachedClient!;
  cachedDb = client.db(dbName);
  global._mongoDB = cachedDb;
  return cachedDb;
}
