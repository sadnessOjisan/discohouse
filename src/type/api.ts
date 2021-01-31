export type FirestoreUserField = {
  name: string | null;
  image: string | null;
  invitation: number;
  invitationKey: string;
};

export type FirestoreInvitationField = {
  from: string;
  to: string;
};

export type SaveUser = FirestoreUserField;
