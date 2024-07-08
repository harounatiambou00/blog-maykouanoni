import { doc, getDoc, setDoc } from "firebase/firestore";
import { ServiceResponse, UserType } from "../data";
import { auth, firestore, googleAuthProvider } from "../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export type SignUpUserWithEmailAndPasswordDTO = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  acceptedToReceivePromotions: boolean;
};
export const signUpUserWithEmailAndPassword = async (
  request: SignUpUserWithEmailAndPasswordDTO
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    request.email,
    request.password
  );
  const user = userCredential.user;
  if (user.uid) {
    let today = new Date();
    try {
      await setDoc(doc(firestore, "users", user.uid), {
        uid: user.uid,
        firstName: request.firstName,
        lastName: request.lastName,
        email: request.email,
        isAdmin: false,
        photoURL: "",
        acceptedToReceivePromotions: request.acceptedToReceivePromotions,
        createdAt:
          "" +
          (today.getDate() <= 9 ? "0" + today.getDate() : today.getDate()) +
          "-" +
          (today.getMonth() <= 9 ? "0" + today.getMonth() : today.getDate()) +
          "-" +
          today.getFullYear(),
      });
      let addedUser = await getDoc(doc(firestore, "users", user.uid));
      if (addedUser.exists()) {
        let data = addedUser.data();
        return {
          data: data as UserType,
          success: true,
          message: "USER_ADDED_SUCCESSFULLY",
        } as ServiceResponse<UserType>;
      } else {
        return {
          data: null,
          success: false,
          message: "USER_NOT_FOUND",
        } as ServiceResponse<UserType>;
      }
    } catch (error) {
      return {
        data: null,
        success: false,
        message: error,
      } as ServiceResponse<UserType>;
    }
  } else {
    return {
      data: null,
      success: false,
      message: "EMAIL_ALREADY_TAKEN",
    } as ServiceResponse<UserType>;
  }
};

export type UpdateUserDTO = {
  uid: string;
  firstName?: string;
  lastName?: string;
  isAdmin: boolean;
  profilPhotoFile?: File;
  acceptedToReceivePromotions: boolean;
};
export const updateUser = async (request: UpdateUserDTO) => {};

export type SignInUserWithEmailAndPasswordDTO = {
  email: string;
  password: string;
  remenberMe: boolean;
};
export const signInUserWithEmailAndPassword = async (
  request: SignInUserWithEmailAndPasswordDTO
) => {
  let response = await signInWithEmailAndPassword(
    auth,
    request.email,
    request.password
  );
  let user = response.user;
  if (response.user) {
    let userAdditionalInfo = await getDoc(doc(firestore, "users", user.uid));
    if (userAdditionalInfo.exists()) {
      let data = userAdditionalInfo.data();
      return {
        data: data as UserType,
        success: true,
        message: "USER_LOGGED_IN_SUCCESSFULLY",
      } as ServiceResponse<UserType>;
    } else {
      return {
        data: null,
        success: false,
        message: "USER_NOT_FOUND",
      } as ServiceResponse<UserType>;
    }
  } else {
    return {
      data: null,
      success: false,
      message: "USER_NOT_FOUND",
    } as ServiceResponse<UserType>;
  }
};

export const signInUserWithGoogle: () => Promise<
  ServiceResponse<UserType>
> = async () => {
  try {
    let response = await signInWithPopup(auth, googleAuthProvider);
    let user = response.user;
    if (user) {
      let userAdditionalInfo = await getDoc(doc(firestore, "users", user.uid));
      if (userAdditionalInfo.exists()) {
        let data = userAdditionalInfo.data();
        return {
          data: data as UserType,
          success: true,
          message: "USER_LOGGED_IN_SUCCESSFULLY",
        } as ServiceResponse<UserType>;
      } else {
        return {
          data: null,
          success: false,
          message: "USER_NOT_FOUND",
        } as ServiceResponse<UserType>;
      }
    } else {
      return {
        data: null,
        success: false,
        message: "USER_NOT_FOUND",
      } as ServiceResponse<UserType>;
    }
  } catch (e) {
    return {
      data: null,
      success: false,
      message: "INVALID_CREDENTIALS",
    } as ServiceResponse<UserType>;
  }
};

export const signUpUserWithGoogle: () => Promise<
  ServiceResponse<UserType>
> = async () => {
  try {
    let response = await signInWithPopup(auth, googleAuthProvider);
    let user = response.user;
    if (user) {
      let today = new Date();
      try {
        await setDoc(doc(firestore, "users", user.uid), {
          uid: user.uid,
          firstName: "",
          lastName: "",
          email: user.email,
          isAdmin: false,
          photoURL: "",
          acceptedToReceivePromotions: false,
          createdAt:
            "" +
            (today.getDate() <= 9 ? "0" + today.getDate() : today.getDate()) +
            "-" +
            (today.getMonth() <= 9 ? "0" + today.getMonth() : today.getDate()) +
            "-" +
            today.getFullYear(),
        });
        let addedUser = await getDoc(doc(firestore, "users", user.uid));
        if (addedUser.exists()) {
          let data = addedUser.data();
          return {
            data: data as UserType,
            success: true,
            message: "USER_ADDED_SUCCESSFULLY",
          } as ServiceResponse<UserType>;
        } else {
          return {
            data: null,
            success: false,
            message: "USER_NOT_FOUND",
          } as ServiceResponse<UserType>;
        }
      } catch (error) {
        return {
          data: null,
          success: false,
          message: error,
        } as ServiceResponse<UserType>;
      }
    } else {
      return {
        data: null,
        success: false,
        message: "EMAIL_ALREADY_TAKEN",
      } as ServiceResponse<UserType>;
    }
  } catch (e) {
    return {
      data: null,
      success: false,
      message: "INVALID_CREDENTIALS",
    } as ServiceResponse<UserType>;
  }
};

export const isAdmin: (
  uid: string
) => Promise<ServiceResponse<boolean>> = async (uid: string) => {
  let userAdditionalInfo = await getDoc(doc(firestore, "users", uid));
  if (userAdditionalInfo.exists()) {
    let data = userAdditionalInfo.data();
    return {
      data: data.isAdmin as boolean,
      success: true,
      message: "USER_LOGGED_IN_SUCCESSFULLY",
    } as ServiceResponse<boolean>;
  } else {
    return {
      data: null,
      success: false,
      message: "USER_NOT_FOUND",
    } as ServiceResponse<boolean>;
  }
};
