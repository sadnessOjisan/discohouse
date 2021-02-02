export type User = {
  name: string;
  image: string;
  invitation: number;
  invitationKey: string;
  id: string;
};

export type Invitor = {
  invitedUserName: string;
  invitedUserId: string;
  invitedImage: string;
};
