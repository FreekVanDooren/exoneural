import {MongoClient} from "mongodb";

let client: MongoClient;
export const getDbInstance = async (dbName: string) => {
    const {MONGO_DB_URL} = process.env;
    if (!MONGO_DB_URL) {
        console.error('Mongo DB URL not defined')
        process.exit(1)
    }
    if (!client && MONGO_DB_URL) {
        client = new MongoClient(MONGO_DB_URL);
        await (client.connect().catch(e => {
            console.error('connect', e);
            process.exit(1)
        }))
    }

    return client.db(dbName);
};
