import {connect, connection} from "mongoose";

interface ConnectedDB {
    isConnected: boolean;
}

interface Connections {
    databaseName: string;
    readyState: number;
}

const connectedDB: ConnectedDB = {
    isConnected: false
} 

export async function connectDB(): Promise<void> {

    if(connectedDB.isConnected) return;

    const mongooseConnection = await connect(process.env.MONGO_URI as string);
    const db: Connections = {
        databaseName: mongooseConnection.connection.db.databaseName,
        readyState: mongooseConnection.connections[0].readyState
    };
}

connection.on('connected', () => {
    console.log('Mongoose connected to db');
    
});

connection.on('error', (err) => {
    console.log('Mongoose connection error: ', err);   
});