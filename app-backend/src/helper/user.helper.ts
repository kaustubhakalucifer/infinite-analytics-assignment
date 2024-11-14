import { userModel } from '../model';

export async function validateAndUpdateUserDetails(
  emailAddress: string,
  data: {
    photoUrl: string;
    name: string;
  }
) {
  const checkUser = await userModel.findOne({ emailAddress });
  if (!checkUser) {
    await userModel.create({
      emailAddress,
      photoUrl: data.photoUrl,
      isAuthFacebook: false,
      isAuthGoogle: true,
      name: data.name,
    });
  }
  return true;
}
