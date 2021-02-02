import { useEffect, useState } from "preact/hooks";

import Avater from "../assets/avatar.png";
import { FIRESTORE_KEY } from "../const/firestore-key";
import { db } from "../infra/firebase";
import { FirestoreUserField } from "../type/api";
import { User } from "../type/user";

export const useRoot = () => {
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const [error, setError] = useState("");

  useEffect(() => {
    db.collection(FIRESTORE_KEY.USERS)
      .orderBy("timestamp")
      .limit(5)
      .get()
      .then((snapshot) => {
        const promises = snapshot.docs.map((doc) => {
          const data: FirestoreUserField = doc.data() as any; // TODO: validation
          return {
            name: data.name || "undefined",
            image: data.image || Avater,
            invitation: data.invitation,
            invitationKey: data.invitationKey,
            id: doc.id,
          };
        });
        Promise.all(promises)
          .then((data) => setUsers(data))
          .catch((e) => {
            console.error(e);
            setError("data fetch error");
          });
      });
  }, []);
  return { users, error };
};
