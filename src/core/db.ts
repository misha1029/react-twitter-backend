import mongoose from 'mongoose';

mongoose.Promise = Promise;/* mongodb://localhost:27017 */

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/twitter');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

export { db, mongoose };
