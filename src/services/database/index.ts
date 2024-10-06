import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

var mongod: any;

const getConnectionString = async () => {
    var connectionString;
    if (process.env.NODE_ENV === 'test') {
        mongod = await MongoMemoryServer.create();
        connectionString = mongod.getUri();
    } else {
        connectionString = process.env.MONGODBURL;
    }
    return connectionString
}

const connect = async () => {
    const connectionString = await getConnectionString()
    const connectionReady = mongoose.connections[0].readyState

    if (!connectionReady) {
        await mongoose.connect(connectionString, {
            // useUnifiedTopology: true,
            // useNewUrlParser: true
        })
    }
}

const close = async () => {
    await mongoose.connection.close()
    if (process.env.NODE_ENV === 'test') {
        await mongod.stop()
    }
}

const Database = {
    connect,
    close
}

export default Database
export { getConnectionString }