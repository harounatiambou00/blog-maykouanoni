import { Alert, Chip, Divider } from "@mui/material";
import React from "react";
import { auth } from "../../../config/firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const SignInPage = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [credentialsError, setCredentialsError] = React.useState(false);
  const navigate = useNavigate();
  const signIn = async () => {
    try {
      let response = await signInWithEmailAndPassword(auth, email, password);
      setCredentialsError(false);
      if (response) {
        navigate("/admin");
      }
    } catch (e) {
      setCredentialsError(true);
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 font-rubik">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 font-playfair">
          Veuillez vous connectez a votre compte
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="space-y-6">
          {credentialsError && (
            <Alert severity="error">
              Les informations fournies sont incorrectes.
            </Alert>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900 font-rubik"
            >
              Email
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete={undefined}
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mot de passe
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={() => signIn()}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Se connecter
            </button>
          </div>
        </div>
        <Divider className="my-6">
          <Chip label="OU" size="small" />
        </Divider>

        <div className="p-2 w-full rounded-md border border-primary flex items-center justify-center select-none cursor-pointer hover:bg-gray-50 bg-opacity-15">
          <img
            src={process.env.PUBLIC_URL + "/assets/images/logo-google.png"}
            className="h-6 mr-4"
          />
          <span>Continuer avec Google</span>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
