import firebase from "firebase";
import { JSX } from "preact";
import { useState } from "preact/hooks";

import { auth } from "../infra/firebase";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSetEmail = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const email = (e.target as HTMLInputElement).value;
    setEmail(email);
  };

  const handleSetPassword = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const password = (e.target as HTMLInputElement).value;
    setPassword(password);
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.error(error);
        alert("会員登録に失敗しました。");
        // ..
      });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  return {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    handleLogout,
  };
};
