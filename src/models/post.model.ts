import { IPost } from "../utils/@types";
import mongoose, { Schema } from "mongoose";
const PostSchema = new Schema<IPost>({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  },
  updatedOn: {
    type: Date,
  },
  tags: {
    type: [String],
    required: false,
  },
  category: {
    type: String,
    required: true,
  }
});

export const PostModel = mongoose.model<IPost>("Post", PostSchema);
