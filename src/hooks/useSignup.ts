import firebase from "firebase";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { FIRESTORE_KEY } from "../const/firestore-key";
import { auth, db } from "../infra/firebase";
import { SaveUser } from "../type/api";
import { createToken } from "../util/createToken";
import { getParam } from "../util/getParam";

export const useSignup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = getParam("token", window.location.href);
    setToken(token || undefined);
  }, []);

  const handleSetEmail = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const email = (e.target as HTMLInputElement).value;
    setEmail(email);
  };

  const handleSetPassword = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const password = (e.target as HTMLInputElement).value;
    setPassword(password);
  };

  const handleSetToken = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const password = (e.target as HTMLInputElement).value;
    setToken(password);
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (!user.user) throw new Error("invalid user");
        if (!user.user.email) throw new Error("invalid user");
        const data: SaveUser = {
          email: user.user.email,
          name: user.user.displayName,
          image: user.user.photoURL,
          invitation: 3,
          invitationKey: createToken(),
        };
        db.collection(FIRESTORE_KEY.USERS)
          .doc(user.user?.uid)
          .set(data)
          .catch((e) => {
            console.error(e);
            throw new Error("firestore error");
          });
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
    token,
    handleSetToken,
  };
};
