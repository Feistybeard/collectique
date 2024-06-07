import mongoose, { Document, Schema } from "mongoose";

interface ICollection extends Document {
  name: string;
  description: string;
  owner: Schema.Types.ObjectId;
  visibility: string;
  collectionItems: Schema.Types.ObjectId[];
}

const CollectionSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
      required: true,
    },
    collectionItems: [
      {
        type: Schema.Types.ObjectId,
        ref: "collectionItems",
      },
    ],
  },
  { collection: "collections", timestamps: true }
);

interface ICollectionItem extends Document {
  name: string;
  type: string;
  description: string;
  img: string;
  belongToCollection: Schema.Types.ObjectId;
  owner: Schema.Types.ObjectId;
}

const CollectionItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    img: {
      type: String,
    },
    collection: {
      type: Schema.Types.ObjectId,
      ref: "collections",
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { collection: "collectionItems", timestamps: true }
);

export const Collection = mongoose.model<ICollection>(
  "Collection",
  CollectionSchema
);

export const CollectionItem = mongoose.model<ICollectionItem>(
  "CollectionItem",
  CollectionItemSchema
);
