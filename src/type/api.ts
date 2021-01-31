export type FirestoreUserField = {
  name: string | null;
  email: string;
  image: string | null;
  invitation: number;
  invitationKey: string;
};

export type FirestoreInvitationField = {
  from: string;
  to: string;
};

export type SaveUser = FirestoreUserField;
