export type FirestoreUserField = {
  name: string | null;
  email: string;
  image: string | null;
  invitation: number;
  invitationKey: string;
};

export type SaveUser = FirestoreUserField;
