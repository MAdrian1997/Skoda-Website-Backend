import { MongoClient } from "mongodb";

// Replace the uri string with your MongoDB deployment's connection string.
var uri =
  "mongodb+srv://AdrianMoisii:MoisiiAdrian@cluster0.cjpmgrc.mongodb.net/test";

async function insereazaProdus(produsDeInserat) {
  const client = new MongoClient(uri);
  try {
    // Daca n-am primit nimic ca parametru, nu insera nimic
    if (!produsDeInserat) return;

    // Altfel

    const database = client.db("Skoda");
    const produse = database.collection("Modele");

    const result = await produse.insertOne(produsDeInserat);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  } catch (error) {
    console.log("error este", error);
  } finally {
    await client.close();
  }
}
async function citesteProduse() {
  const client = new MongoClient(uri);
  try {
    const database = client.db("Skoda");
    const produse = database.collection("Modele");

    const result = await produse.find();
    return result;
  } catch (error) {
    console.log("error este", error);
  } finally {
    // await client.close();
  }
}
// run().catch(console.dir);

export { insereazaProdus, citesteProduse };
