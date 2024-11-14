import { type Document } from 'mongoose';

export interface UserSchema extends Document {
  name: string;
  bio: string;
  emailAddress: string;
  password: string;
  photoUrl: string;
  isAuthGoogle: boolean;
  isAuthFacebook: boolean;
  mobileNumber: string;
}
