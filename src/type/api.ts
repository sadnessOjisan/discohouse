import firebase from "firebase";

export type FirestoreUserField = {
  name: string | null;
  image: string | null;
  invitation: number;
  invitationKey: string;
  timestamp: firebase.firestore.FieldValue;
};

export type FirestoreInvitationField = {
  from: string;
  to: string;
  timestamp: firebase.firestore.FieldValue;
};

export type SaveUser = FirestoreUserField;
