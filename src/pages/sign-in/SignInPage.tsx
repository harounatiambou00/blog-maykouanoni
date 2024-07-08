import {
  Alert,
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
import { auth } from "../../config/firebase-config";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
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
import {
  SignInUserWithEmailAndPasswordDTO,
  signInUserWithEmailAndPassword,
  signInUserWithGoogle,
} from "../../services/AuthService";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";
import { LoadingBackdrop } from "../../components/core";
const SignInPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useNavigate();
  const [credentialsError, setCredentialsError] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const dispatch = useAppDispatch();
  const [remenberMe, setRemenberMe] = React.useState(true);
  const signIn = async () => {
    try {
      setIsLoading(true);
      let response = await signInUserWithEmailAndPassword({
        email: email,
        password: password,
      } as SignInUserWithEmailAndPasswordDTO);
      if (response.success && response.data) {
        dispatch(
          setCurrentUser({
            user: response.data,
          })
        );
        setCredentialsError(false);
        navigate("/");
      } else {
        setCredentialsError(true);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setCredentialsError(true);
    }
  };
  const signInUsingGoogle = async () => {
    try {
      setIsLoading(true);
      let response = await signInUserWithGoogle();
      if (response.success && response.data) {
        dispatch(
          setCurrentUser({
            user: response.data,
          })
        );
        setCredentialsError(false);
        navigate("/");
      } else {
        setCredentialsError(true);
      }
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      setCredentialsError(true);
    }
  };
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6 py-12 lg:px-8 font-playwrite">
      <div className="p-10  rounded-md sm:w-full lg:w-5/12">
        <h1 className="font-kalnia sm:text-8xl lg:text-4xl font-semibold sm:mb-16 lg:mb-5">
          Connexion
        </h1>
        <p className="sm:text-3xl lg:text-base">
          Connectez-vous en entrant votre adresse e-mail et votre mot de passe.
          <br />
          Si vous n'avez pas encore de compte,{" "}
          <span
            className="text-blue-600 underline cursor-pointer"
            onClick={() => navigate("/sign-up")}
          >
            créez-en un
          </span>
          .
        </p>
        {credentialsError && (
          <Alert
            severity="error"
            className="sm:text-3xl lg:text-base font-playwrite text-red-600 sm:mt-7 lg:mt-2"
          >
            Les informations que vous avez fournies sont incorrectes. Veuillez
            vérifier les données saisies et essayer à nouveau.{" "}
          </Alert>
        )}
        <div className="flex flex-col sm:mt-14 lg:mt-5">
          <label
            htmlFor=""
            className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2"
          >
            Email
          </label>
          <OutlinedInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            startAdornment={
              <AiOutlineMail className="sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0" />
            }
            className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
          />
        </div>
        <div className="flex flex-col sm:mt-14 lg:mt-5">
          <label
            htmlFor=""
            className="font-normal font-kalnia sm:text-4xl lg:text-lg sm:mb-4 lg:mb-2 "
          >
            Mot de passe
          </label>
          <OutlinedInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            startAdornment={
              <MdLockOutline className="sm:text-7xl lg:text-3xl mr-3 sm:mx-5 lg:mx-0" />
            }
            endAdornment={
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                className="sm:text-7xl lg:text-3xl sm:mx-5 lg:mx-0"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="" />
                ) : (
                  <AiOutlineEye className="" />
                )}
              </IconButton>
            }
            className="rounded-lg sm:py-4 lg:py-0  pl-2 font-playwrite font-light sm:text-4xl lg:text-base"
          />
        </div>
        <p className="text-blue-600 underline cursor-pointer sm:mt-7 lg:mt-3 w-fit sm:text-3xl lg:text-base">
          Mot de passe oublie ?
        </p>
        <Button
          variant="contained"
          className="sm:mt-28 lg:mt-10 sm:py-6 lg:py-2 font-kalnia sm:text-6xl lg:text-xl font-light w-full rounded-lg bg-primary"
          onClick={signIn}
          disabled={isLoading}
        >
          Connexion
        </Button>
        <div className="flex items-center sm:mt-5 lg:mt-2">
          <FormControlLabel
            control={
              <Checkbox
                checked={remenberMe}
                onChange={() => setRemenberMe(!remenberMe)}
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
                Se souvenir de moi
              </p>
            }
          />
        </div>
        <Divider className="sm:mt-16 lg:mt-5">
          <span className="sm:text-4xl lg:text-base font-playwrite">OU</span>
        </Divider>
        <Button
          variant="outlined"
          className="w-full normal-case font-playwrite rounded-lg sm:mt-16 lg:mt-5 sm:text-4xl lg:text-xl sm:py-5 lg:py-2"
          startIcon={
            <IoLogoGoogle className="sm:text-7xl lg:text-3xl sm:mx-5 lg:mx-2 " />
          }
          onClick={signInUsingGoogle}
        >
          Continuer avec google
        </Button>
      </div>
      <LoadingBackdrop isLoading={isLoading} />
    </div>
  );
};

export default SignInPage;
