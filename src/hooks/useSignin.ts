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
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (error) {
      setErrorMessage(
        "認証サービスにて不具合が発生しました。しばらくお待ちください。"
      );
    }
  }, [error]);

  const handleSetEmail = (email: string) => {
    setEmail(email);
  };

  const handleSetPassword = (password: string) => {
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
        setErrorMessage(
          "ユーザー情報の取得に失敗しました。再度GitHubアカウントでサインインしてください。"
        );
      });
  }, []);

  const handleClickGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase
      .auth()
      .signInWithRedirect(provider)
      .then(() => {
        console.log("mypage");
        route(`/user/mypage`, true);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          "サインインに失敗しました。GitHubアカウントをお持ちか確認してください。"
        );
      });
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    setSending(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        setSending(false);
        route(`/mypage`, true);
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage(
          "サインインに失敗しました。アドレス・パスワードが正しいものか確認してください。"
        );
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
    errorMessage,
    sending,
  };
};
