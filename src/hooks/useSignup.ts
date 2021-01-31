import firebase from "firebase";
import { JSX } from "preact";
import { useState } from "preact/hooks";

import { FIRESTORE_KEY } from "../const/firestore-key";
import { auth, db } from "../infra/firebase";

export const useSignup = () => {
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
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        db.collection(FIRESTORE_KEY.USERS)
          .doc(user.user?.uid)
          .set({
            email: user.user?.email,
            name: user.user?.displayName,
            image: user.user?.photoURL,
          })
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
  };
};
