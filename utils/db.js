import { MongoClient } from 'mongodb';

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const dbName = process.env.DB_DATABASE || 'files_manager';

    this.client = new MongoClient(`mongodb://${host}:${port}/${dbName}`, { useUnifiedTopology: true });
    this.client.connect().then(() => {
      this.db = this.client.db(dbName);
      console.log('Connected to MongoDB');
    });
  }

  isAlive() {
    return this.client && this.client.isConnected();
  }

  nbUsers() {
    return this.db.collection('users').countDocuments();
  }
}

const dbClient = new DBClient();
export default dbClient;

