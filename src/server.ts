import dotenv from 'dotenv';
dotenv.config();

import './core/db';

import express from 'express';
import multer from 'multer';
import bodyParser from 'body-parser';

import { UserCtrl } from './controllers/UserController';
import { registerValidations } from './validations/register';
import { passport } from './core/passport';
import session from 'express-session';
import { TweetsCtrl } from './controllers/TweetsController';
import { createTweetValidations } from './validations/createTweet';
import { UploadFileCtrl } from './controllers/UploadFileController';

const app = express();
app.use(session({ secret: 'SECRET' }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

const storage = multer.memoryStorage();
const upload = multer({ storage });





app.get('/users', UserCtrl.index);
app.get('/users/me', passport.authenticate('jwt'), UserCtrl.getUserInfo);
app.get('/users/:id', UserCtrl.show);


app.get('/tweets', TweetsCtrl.index);
app.get('/tweets/:id', TweetsCtrl.show);
app.get('/tweets/user/:id', TweetsCtrl.getUserTweets);
app.post('/tweets',passport.authenticate('jwt'), createTweetValidations, TweetsCtrl.create);
app.patch('/tweets/:id',passport.authenticate('jwt'), createTweetValidations, TweetsCtrl.update);
app.delete('/tweets/:id', passport.authenticate('jwt'), TweetsCtrl.delete);


app.get('/auth/verify', registerValidations, UserCtrl.verify);
app.post('/auth/register', registerValidations, UserCtrl.create);
app.post('/auth/login', passport.authenticate('local'), UserCtrl.afterLogin);

app.post('/upload', upload.single('image'), UploadFileCtrl.upload);



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
