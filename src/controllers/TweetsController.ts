import express from "express";
import { validationResult } from "express-validator";
import { TweetModel } from "../models/TweetModel";
import { UserModelInterface } from "../models/UserModel";
import { isValidObjectId } from "../utils/isValidObjectId";

class TweetsController {
  async index(_: any, res: express.Response): Promise<void> {
    try {
      const tweets = await TweetModel.find({}).exec(); // получить все твиты

      res.json({
        status: "success",
        data: tweets,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async show(req: any, res: express.Response): Promise<void> {
    try {
      const tweetId = req.params.id;

      if (!isValidObjectId(tweetId)) {
        res.status(400).send();
        return;
      }

      const tweet = await TweetModel.findById(tweetId).exec();

      if (!tweet) {
        res.status(404).send();
        return;
      }

      res.json({
        status: "success",
        data: tweet,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }

  async create(req: express.Request, res: express.Response): Promise<void> {
    try {

      const user = req.user as UserModelInterface;

      if (user?._id) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          res.status(400).json({ status: "error", errors: errors.array() });
          return;
        }
      }

      const data: any = {
        text: req.body.text,
        user: user?._id,
      };

      const tweet = await TweetModel.create(data);

      res.json({
        status: "success",
        data: tweet,
      });
    } catch (error) {}
  }

  async delete(req: express.Request, res: express.Response): Promise<void> {
    const user = req.user as UserModelInterface;

    try {
      if (user) {
        const tweetId = req.params.id;

        if (!isValidObjectId(tweetId)) {
          res.status(400).send();
          return;
        }

        const tweet = await TweetModel.findById(tweetId)

        if(tweet){
          tweet.remove();
          res.send();
        }else {
          res.status(404).send();
        }
      }
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error,
      });
    }
  }
}

export const TweetsCtrl = new TweetsController();