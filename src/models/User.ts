import mongoose, { Schema, type HydratedDocument, type Types } from "mongoose";

export type LinkSubdocument = {
  _id: Types.ObjectId;
  title: string;
  url: string;
  order: number;
  clickCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserAttrs = {
  username: string;
  email: string;
  passwordHash: string;
  name: string;
  bio: string;
  avatarUrl: string | null;
  links: Types.DocumentArray<LinkSubdocument>;
};

export type UserDocument = HydratedDocument<UserAttrs>;

const LinkSchema = new Schema<LinkSubdocument>(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
    order: { type: Number, default: 0 },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const UserSchema = new Schema<UserAttrs>(
  {
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true },
    bio: { type: String, default: "" },
    avatarUrl: { type: String, default: null },
    links: { type: [LinkSchema], default: [] },
  },
  { timestamps: true },
);

export const User = mongoose.models.User ?? mongoose.model<UserAttrs>("User", UserSchema);
