import firebase from "firebase";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../infra/firebase";

export const useSignin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const handleSetEmail = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const email = (e.target as HTMLInputElement).value;
    setEmail(email);
  };

  const handleSetPassword = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const password = (e.target as HTMLInputElement).value;
    setPassword(password);
  };

  useEffect(() => {
    if (user) {
      route(`/mypage`, true);
    }
  }, [user]);

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (result.user) {
          route(`/mypage`, true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleClickGithub = () => {
    console.log("mypage");
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {
        console.log("mypage");
        route(`/user/mypage`, true);
      });
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        route(`/user/${user.user?.uid}`, true);
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
    handleClickGithub,
    user,
    loading,
    error,
  };
};
