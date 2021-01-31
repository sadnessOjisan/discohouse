import { h } from "preact";

import { useUser } from "../hooks/useUser";

interface Props {
  id?: string;
}

export const User = (props: Props) => {
  const { user } = useUser(props.id);
  return (
    <div>
      {user ? (
        <div>
          user {JSON.stringify(user)}
          {user.invitation > 0 && <div>招待token: {user.invitationKey}</div>}
        </div>
      ) : (
        "no user"
      )}
    </div>
  );
};
