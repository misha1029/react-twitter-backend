import { model, Schema, Document } from 'mongoose';

export interface TweetModelInterface {
  _id?: string;
  text: string;
  user: string;
}

export type UserModelDocumentInterface = TweetModelInterface & Document;

const TweetSchema = new Schema<TweetModelInterface>({
  text: {
    required: true,
    type: String,
    maxlength: 280,
  },
  user: {
    required: true,
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
});

//@ts-ignore
export const TweetModel = model<UserModelDocumentInterface>('Tweet', TweetSchema);
