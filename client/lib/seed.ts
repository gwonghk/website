import "dotenv/config";
import { getDb } from "./mongodb.ts";

async function seed() {
  try {
    const db = await getDb();
    const itemsCollection = db.collection("items");

    // Optional: clear existing items
    await itemsCollection.deleteMany({});

    // Sample items
    const sampleItems = [
      { name: "Apple", createdAt: new Date() },
      { name: "Banana", createdAt: new Date() },
      { name: "Carrot", createdAt: new Date() },
      { name: "Donut", createdAt: new Date() },
    ];

    const result = await itemsCollection.insertMany(sampleItems);
    console.log(`Inserted ${result.insertedCount} items successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
