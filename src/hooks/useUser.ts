import { useEffect, useState } from "preact/hooks";

import { FIRESTORE_KEY } from "../const/firestore-key";
import { db } from "../infra/firebase";
import { FirestoreUserField } from "../type/api";
import { User } from "../type/user";

export const useUser = (uid?: string) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  useEffect(() => {
    if (uid === undefined) return;
    console.log(uid);
    db.collection(FIRESTORE_KEY.USERS)
      .doc(uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const data: FirestoreUserField = doc.data() as any; // TODO: validation
          setUser({
            name: data.name || undefined,
            image: data.image || undefined,
            email: data.email,
            invitation: data.invitation,
            invitationKey: data.invitationKey,
          });
        } else {
          console.log("No such document!");
        }
      });
  }, [uid]);
  return { user };
};
