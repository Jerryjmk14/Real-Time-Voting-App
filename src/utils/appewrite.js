import { Client, Databases } from "appwrite";

const client = new Client();
const DB_ID = "669fdfac000525bd3961";
const COLLECTION_ID = "669fdfd5000fbeb09c19";

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("669fdd44003c6aa38bbc");

export const databases = new Databases(client);

export { client, DB_ID, COLLECTION_ID };
