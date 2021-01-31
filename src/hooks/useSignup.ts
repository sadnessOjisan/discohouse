import firebase from "firebase";
import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";

import { FIRESTORE_KEY } from "../const/firestore-key";
import { auth, db } from "../infra/firebase";
import {
  FirestoreInvitationField,
  FirestoreUserField,
  SaveUser,
} from "../type/api";
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

  const handleClickGithub = () => {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const handleSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        if (!user.user) throw new Error("invalid user");
        const uid = user.user.uid;
        if (!user.user.email) throw new Error("invalid user");
        const data: SaveUser = {
          name: user.user.displayName,
          image: user.user.photoURL,
          invitation: 3,
          invitationKey: createToken(),
        };

        // 新規登録
        db.collection(FIRESTORE_KEY.USERS)
          .doc(uid)
          .set(data)
          .catch((e) => {
            console.error(e);
            throw new Error("firestore error");
          });

        // invitationの減少
        db.collection(FIRESTORE_KEY.USERS)
          .where("invitationKey", "==", token)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.size > 1) {
              console.error("same tokens");
            }
            querySnapshot.forEach(async (doc) => {
              const data: FirestoreUserField = doc.data() as any;
              // invitation logを作成
              const inv: FirestoreInvitationField = {
                from: doc.id,
                to: uid,
              };
              db.collection(FIRESTORE_KEY.INVITATIONS)
                .add(inv)
                .catch((e) => {
                  console.error(e);
                });
              await doc.ref.update({ invitation: data.invitation - 1 });
            });
          });
      })
      .catch((error) => {
        console.error(error);
        alert("会員登録に失敗しました。");
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
    handleClickGithub,
  };
};
