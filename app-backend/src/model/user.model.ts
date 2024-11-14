import { AggregatePaginateModel, model, Schema } from 'mongoose';
import { UserSchema } from 'src/schema';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const userSchema = new Schema<UserSchema>(
  {
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    password: {
      type: String,
    },
    photoUrl: {
      type: String,
    },
    isAuthFacebook: {
      type: Boolean,
    },
    isAuthGoogle: {
      type: Boolean,
    },
    mobileNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(aggregatePaginate);

const userModel = model<UserSchema, AggregatePaginateModel<UserSchema>>(
  'users',
  userSchema
);

export default userModel;
