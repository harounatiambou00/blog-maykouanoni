import {
  Button,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  OutlinedInput,
  Switch,
} from "@mui/material";
import React from "react";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import { IoLogoGoogle } from "react-icons/io5";
import {
  MdLockOutline,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  EmailErrorMessages,
  EmailErrorType,
  Errors,
  ValuesType,
} from "./types";
import { auth } from "../../config/firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  signInUserWithGoogle,
  signUpUserWithEmailAndPassword,
  signUpUserWithGoogle,
} from "../../services/AuthService";
import { useAppDispatch } from "../../hooks";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [values, setValues] = React.useState<ValuesType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptedToReceivePromotions: false,
  });

  const [errors, setErrors] = React.useState<Errors>({
    emailError: false,
    passwordError: false,
    confirmPassowrdError: false,
  });
  const [emailErrorType, setEmailErrorType] =
    React.useState<EmailErrorType>("none");

  /**
   * handle the onChange event of our email input and
   * check the validity of the current email
   */
  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, email: event.target.value });
    if (event.target.value === "") {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isRequired");
    } else if (
      !event.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setErrors((currentState) => ({
        ...currentState,
        emailError: true,
      }));
      setEmailErrorType("isInvalid");
    } else {
      setErrors((currentState) => ({
        ...currentState,
        emailError: false,
      }));
      setEmailErrorType("none");
    }
  };

  /**
   * handle the onChange event of our password input and
   * check the validity of the current password
   */
  const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, password: event.target.value });
    if (event.target.value.length < 8) {
      setErrors({ ...errors, passwordError: true });
    } else {
      setErrors({ ...errors, passwordError: false });
    }
    if (event.target.value !== values.confirmPassword) {
      setErrors({ ...errors, confirmPassowrdError: true });
    } else {
      setErrors({ ...errors, confirmPassowrdError: false });
    }
  };

  const handleChangeConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, confirmPassword: event.target.value });

    if (event.target.value !== values.password) {
      setErrors({ ...errors, confirmPassowrdError: true });
    } else {
      setErrors({ ...errors, confirmPassowrdError: false });
    }
  };
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignUp = async () => {
    if (
      !errors.emailError &&
      !errors.passwordError &&
      !errors.confirmPassowrdError
    ) {
      if (values.email === "") {
        setErrors((currentState) => ({ ...currentState, emailError: true }));
        setEmailErrorType("isRequired");
        //If the email field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({ ...currentState, emailError: false }));
      }
      if (values.password === "") {
        setErrors((currentState) => ({ ...currentState, passwordError: true }));
        //If the password field is not filled, we want to stop the function
        return;
      } else {
        setErrors((currentState) => ({
          ...currentState,
          passwordError: false,
        }));
      }

      try {
        setIsLoading(true);
        let request = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
          acceptedToReceivePromotions: values.acceptedToReceivePromotions,
        };
        let response = await signUpUserWithEmailAndPassword(request);
        if (response.success && response.data) {
          dispatch(
            setCurrentUser({
              user: response.data,
            })
          );
          navigate("/");
        } else {
          if (response.message === "EMAIL_ALREADY_TAKEN") {
            setEmailErrorType("isAlreadyTaken");
          } else if (response.message === "USER_NOT_FOUND") {
          }
        }
        setIsLoading(false);
      } catch (error) {
        console.log("");
        setIsLoading(false);
      }
    }
  };

  const signUpUsingGoogle = async () => {
    try {
      setIsLoading(true);
      let response = await signUpUserWithGoogle();
      if (response.success && response.data) {
        dispatch(
          setCurrentUser({
            user: response.data,
          })
        );
        navigate("/account");
      } else {
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-12 lg:px-8">
      <div className="p-10 rounded-md sm:w-full lg:w-7/12">
        <h1 className="font-kalnia sm:text-8xl lg:text-4xl font-semibold sm:mb-16 lg:mb-5">
          Création d'un compte
        </h1>
        <p className="sm:text-3xl lg:text-base">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum
          quos inventore voluptates, molestias architecto minus voluptatem.
          <br />
          Avez-vous déja un compte ?{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/sign-in")}
          >
            connectez-vous ici
          </span>
          .
        </p>
        <div className="grid grid-cols-2 sm:gap-10 lg:gap-5 mt-10">
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Prénom
            </label>
            <OutlinedInput
              value={values.firstName}
              onChange={(e) =>
                setValues({ ...values, firstName: e.target.value })
              }
              type="text"
              className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Nom
            </label>
            <OutlinedInput
              value={values.lastName}
              onChange={(e) =>
                setValues({ ...values, lastName: e.target.value })
              }
              type="text"
              className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
            />
          </div>
          <div className="flex flex-col col-span-2">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Adresse mail{" "}
              <span className="font-playwrite text-red-600">*</span>
            </label>
            <OutlinedInput
              error={errors.emailError}
              value={values.email}
              onChange={handleChangeEmail}
              type="email"
              startAdornment={
                <AiOutlineMail
                  className={
                    errors.emailError
                      ? "sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0 text-red-600"
                      : "sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0"
                  }
                />
              }
              className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
            />
            <small className="text-red-600 font-playwrite font-light sm:text-2xl lg:text-sm">
              {errors.emailError && emailErrorType !== "none"
                ? EmailErrorMessages[emailErrorType]
                : ""}
            </small>
          </div>

          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Mot de passe{" "}
              <span className="font-playwrite text-red-600">*</span>
            </label>
            <OutlinedInput
              error={errors.passwordError}
              value={values.password}
              onChange={handleChangePassword}
              type={showPassword ? "text" : "password"}
              startAdornment={
                <MdLockOutline
                  className={
                    errors.passwordError
                      ? "sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0 text-red-600"
                      : "sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0"
                  }
                />
              }
              endAdornment={
                <IconButton
                  color={errors.passwordError ? "error" : "default"}
                  onClick={() => setShowPassword(!showPassword)}
                  className="sm:text-7xl lg:text-3xl sm:mx-5 lg:mx-0"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </IconButton>
              }
              className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
            />
          </div>
          <div className="flex flex-col sm:col-span-2 lg:col-span-1">
            <label
              htmlFor=""
              className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
            >
              Confirmez le mot de passe{" "}
              <span className="font-playwrite text-red-600">*</span>
            </label>
            <OutlinedInput
              error={values.confirmPassword !== values.password}
              value={values.confirmPassword}
              onChange={handleChangeConfirmPassword}
              type={showPassword ? "text" : "password"}
              startAdornment={
                <MdLockOutline
                  className={
                    errors.confirmPassowrdError
                      ? "sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0 text-red-600"
                      : "sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0"
                  }
                />
              }
              endAdornment={
                <IconButton
                  color={
                    values.confirmPassword !== values.password
                      ? "error"
                      : "default"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  className="sm:text-7xl lg:text-3xl sm:mx-5 lg:mx-0"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </IconButton>
              }
              className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
            />
          </div>
        </div>

        <div className="w-full flex flex-col items-center sm:mt-28 lg:mt-10">
          <p className="sm:text-11/12 lg:w-1/2 text-center sm:text-3xl lg:text-base">
            En créant un compte, vous acceptez les conditions d'utilisation et
            la politique de confidentialité.
          </p>
          <Button
            variant="contained"
            className="sm:mt-5 lg:mt-1 sm:py-6 lg:py-2 font-kalnia sm:text-6xl lg:text-xl font-light w-full rounded-lg bg-primary"
            onClick={handleSignUp}
            disabled={isLoading}
            size="large"
          >
            Créer le compte
          </Button>
          <div className="flex items-center sm:mt-10 lg:mt-2">
            <FormControlLabel
              control={
                <Checkbox
                  checked={values.acceptedToReceivePromotions}
                  onChange={() =>
                    setValues((current) => ({
                      ...current,
                      acceptedToReceivePromotions:
                        !current.acceptedToReceivePromotions,
                    }))
                  }
                  icon={
                    <MdOutlineCheckBoxOutlineBlank className="sm:text-5xl lg:text-base" />
                  }
                  checkedIcon={
                    <MdOutlineCheckBox className="sm:text-5xl lg:text-base" />
                  }
                  className="sm:text-4xl lg:text-sm"
                />
              }
              label={
                <p className="font-playwrite sm:text-3xl lg:text-base">
                  Souhaitez-vous recevoir régulièrement des nouvelles sur les
                  sujets d'actualité ?
                </p>
              }
            />
          </div>
        </div>
        <Divider className="sm:mt-16 lg:mt-5">
          <span className="sm:text-4xl lg:text-base font-playwrite">OU</span>
        </Divider>
        <div className="w-full flex justify-center">
          <Button
            variant="outlined"
            className="sm:w-full lg:w-fit normal-case font-playwrite rounded-lg sm:mt-16 lg:mt-5 sm:text-4xl lg:text-xl sm:py-5 lg:py-2"
            startIcon={
              <IoLogoGoogle className="sm:text-7xl lg:text-3xl sm:mx-5 lg:mx-2 " />
            }
            onClick={signUpUsingGoogle}
          >
            Continuer avec google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
