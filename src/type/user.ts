export type User = {
  name?: string;
  email: string;
  image?: string;
  invitation: number;
  invitationKey: string;
};

export type Invitor = {
  invitedUserName: string;
  invitedUserId: string;
};
