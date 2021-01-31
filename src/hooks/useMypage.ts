import { route } from "preact-router";
import { useEffect, useState } from "preact/hooks";
import { useAuthState } from "react-firebase-hooks/auth";

import Avater from "../assets/avatar.png";
import { FIRESTORE_KEY } from "../const/firestore-key";
import { auth, db } from "../infra/firebase";
import { FirestoreInvitationField, FirestoreUserField } from "../type/api";
import { Invitor, User } from "../type/user";

export const useMypage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [invitor, setInvitor] = useState<Invitor | undefined>(undefined);
  const [currentUser] = useAuthState(auth);
  useEffect(() => {
    if (currentUser?.uid === undefined) return;
    db.collection(FIRESTORE_KEY.USERS)
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data: FirestoreUserField = doc.data() as any; // TODO: validation
          setUser({
            name: data.name || "undefined",
            image: data.image || Avater,
            invitation: data.invitation,
            invitationKey: data.invitationKey,
          });
        } else {
          console.log("No such document!");
        }
      });
  }, [currentUser?.uid]);

  useEffect(() => {
    console.log(currentUser?.uid);
    if (currentUser?.uid === undefined) return;
    db.collection(FIRESTORE_KEY.INVITATIONS)
      .where("to", "==", currentUser?.uid)
      .get()
      .then((snapshot) => {
        if (snapshot.size > 1) {
          console.error("same tokens");
        }
        snapshot.forEach(async (doc) => {
          const invitation: FirestoreInvitationField = doc.data() as any;
          db.collection(FIRESTORE_KEY.USERS)
            .doc(invitation.from)
            .get()
            .then((doc) => {
              if (doc.exists) {
                const data: FirestoreUserField = doc.data() as any; // TODO: validation
                setInvitor({
                  invitedUserName: data.name || "undefined",
                  invitedUserId: doc.id,
                  invitedImage: data.image || Avater,
                });
              } else {
                console.log("No such document!");
              }
            });
        });
      });
  }, [currentUser?.uid]);

  const logout = () => {
    auth.signOut();
    route("/signin", true);
  };

  return { user, invitor, logout };
};
