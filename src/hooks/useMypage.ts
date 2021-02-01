import { JSX } from "preact";
import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import { useAuthState } from "react-firebase-hooks/auth";

import Avater from "../assets/avatar.png";
import { CLOUDSTORAGE_KEY, FIRESTORE_KEY } from "../const/firestore-key";
import { auth, db, storage } from "../infra/firebase";
import { FirestoreInvitationField, FirestoreUserField } from "../type/api";
import { Invitor, User } from "../type/user";

export const useMypage = () => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [invitor, setInvitor] = useState<Invitor | undefined>(undefined);
  const [invited, setInvited] = useState<Invitor[]>([]); // 自分が招待した人
  const [currentUser] = useAuthState(auth);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setImage(user?.image || "");
  }, [user]);

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
          console.error("not found user");
          setError("該当するユーザーが見つかりませんでした。");
        }
      });
  }, [currentUser?.uid]);

  // 招待してくれた人
  useEffect(() => {
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

  // 招待した人
  useEffect(() => {
    if (currentUser?.uid === undefined) return;
    db.collection(FIRESTORE_KEY.INVITATIONS)
      .where("from", "==", currentUser?.uid)
      .get()
      .then((snapshot) => {
        const promises = snapshot.docs.map(async (doc) => {
          const invitation: FirestoreInvitationField = doc.data() as any;
          return db
            .collection(FIRESTORE_KEY.USERS)
            .doc(invitation.to)
            .get()
            .then((doc) => {
              const data: FirestoreUserField = doc.data() as any; // TODO: validation
              return {
                invitedUserName: data.name || "undefined",
                invitedUserId: doc.id,
                invitedImage: data.image || Avater,
              };
            });
        });
        Promise.all(promises).then((data) => setInvited(data));
      });
  }, [currentUser?.uid]);

  const logout = () => {
    auth.signOut();
    route("/signin", true);
  };

  const handleImageChange = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const files = (e.target as HTMLInputElement).files;
    if (!files) {
      throw new Error("should choose file");
    }
    const file = files[0];
    const ref = storage.ref().child(CLOUDSTORAGE_KEY.USER_IMAGE);
    ref.put(file).then((snapshot) => {
      snapshot.ref.getDownloadURL().then((value) => {
        setImage(value);
      });
    });
  };

  const handleChangeName = (e: JSX.TargetedEvent<HTMLInputElement, Event>) => {
    const name = (e.target as HTMLInputElement).value;
    setName(name);
  };

  const saveProfile = () => {
    db.collection(FIRESTORE_KEY.USERS).doc(currentUser.uid).update({
      name: name,
      image: image,
    });
  };

  return {
    user,
    invitor,
    invited,
    logout,
    name,
    handleChangeName,
    image,
    handleImageChange,
    saveProfile,
  };
};
