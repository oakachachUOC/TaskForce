import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";

const client = new MongoClient("mongodb+srv://admin:admin@modulo-tareas-uoc.jg8jxtz.mongodb.net/?retryWrites=true&w=majority");

let conn;
try {
    conn = await client.connect();
} catch (e) {
    console.error(e);
}

let db = conn.db("test");

export default db;
