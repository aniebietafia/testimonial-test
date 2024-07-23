// src/services/UserService.ts
import { AppDataSource } from "../data-source";
import { User } from "../models/user";
import { Profile } from "../models";
import { IUserService, IUserProfileUpdate } from "../types";
import { cloudinary } from "../config/multer";

export class UserService implements IUserService {
  public async getUserById(id: string): Promise<User | null> {
    const user = await User.findOne({
      where: { id },
      relations: ["profile"],
    });
    return user;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await User.find({
      relations: ["profile", "products", "organizations"],
    });
    return users;
  }

  public async updateUserProfile(
    id: string,
    payload: IUserProfileUpdate,
    file?: Express.Multer.File
  ): Promise<User | null> {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const profileRepository = AppDataSource.getRepository(Profile);

      const user = await userRepository.findOne({
        where: { id },
        relations: ["profile"],
      });

      if (!user) {
        throw new Error("User not found");
      }

      const userUpdates = {};

      const profile: Partial<Profile> = {
        first_name: payload.first_name,
        last_name: payload.last_name,
        phone: payload.phone,
        avatarUrl: file ? file.path : undefined,
      };

      if (profile) {
        const userProfile = await profileRepository.findOne({
          where: { id: user.profile.id },
        });

        if (!userProfile) {
          throw new Error("Profile not found");
        }

        if (file) {
          // delete old image from cloudinary
          const oldImage = userProfile.avatarUrl;
          if (oldImage) {
            const publicId = oldImage.split("/").pop()?.split(".")[0];
            await cloudinary.uploader.destroy(publicId);
          }

          // upload new image to cloudinary
          const { path } = file;
          const result = await cloudinary.uploader.upload(path);
          userProfile.avatarUrl = result.secure_url;

          userUpdates["profile"] = userProfile;
        }

        await profileRepository.update(userProfile.id, profile);
        await profileRepository.save({ ...userProfile, ...profile });

        if (profile.first_name || profile.last_name) {
          user.name = `${userProfile.first_name} ${userProfile.last_name}`;
        }

        user.profile = userProfile;
      }

      await userRepository.save({ ...user, ...userUpdates });

      const updatedUser = await userRepository.findOne({
        where: { id },
        relations: ["profile"],
      });

      // remove password from response
      if (updatedUser) {
        delete updatedUser.password;
      }

      return updatedUser;
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  // public async updateUserProfile(
  //   id: string,
  //   payload: Partial<IUserProfileUpdate>,
  //   file?: Express.Multer.File
  // ): Promise<User> {
  //   try {
  //     // const allowedProps = ["avatarUrl", "first_name", "last_name", "phone"];

  //     const { avatarUrl, first_name, last_name, phone } = payload;

  //     const userRepository = AppDataSource.getRepository(User);
  //     const profileRepository = AppDataSource.getRepository(Profile);

  //     const user = await userRepository.findOne({
  //       where: { id },
  //       relations: ["profile"],
  //     });

  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     // const propsToBeUpdated = Object.keys(payload).filter((key) =>
  //     //   allowedProps.includes(key)
  //     // );
  //     // const profile = await Profile.findOne({
  //     //   where: { id: user.profile.id },
  //     // });

  //     // if (!profile) {
  //     //   throw new Error("Profile not found");
  //     // }

  //     if (first_name !== undefined) user.profile.first_name = first_name;
  //     if (last_name !== undefined) user.profile.last_name = last_name;
  //     if (phone !== undefined) user.profile.phone = phone;

  //     if (file) {
  //       const oldImage = user.profile.avatarUrl;
  //       if (oldImage) {
  //         const publicId = oldImage.split("/").pop()?.split(".")[0];
  //         await cloudinary.uploader.destroy(publicId);
  //       }

  //       const { path } = file;
  //       const result = await cloudinary.uploader.upload(path);
  //       user.profile.avatarUrl = result.secure_url;
  //     }

  //     if (first_name || last_name) {
  //       user.name = `${first_name} ${last_name}`;
  //     }

  //     await profileRepository.save(user.profile);
  //     await userRepository.save(user);

  //     const updatedUser = await userRepository.findOne({
  //       where: { id },
  //       relations: ["profile"],
  //     });

  //     console.log(updatedUser);

  //     if (updatedUser) {
  //       delete updatedUser.password;
  //     }

  //     return updatedUser;

  //     // propsToBeUpdated.forEach((prop) => {
  //     //   profile[prop] = payload[prop];
  //     // });

  //     // await Profile.update(profile.id, profile);

  //     // if (profile.first_name || profile.last_name) {
  //     //   user.name = `${profile.first_name} ${profile.last_name}`;
  //     // }

  //     // await User.update(user.id, { profile });

  //     // const updatedUser = await User.findOne({
  //     //   where: { id },
  //     //   relations: ["profile"],
  //     // });

  //     // if (updatedUser) {
  //     //   delete updatedUser.password;
  //     // }

  //     // return updatedUser;
  //   } catch (error) {
  //     // console.error(error);
  //     throw new Error(error.message);
  //   }
  // }
}
