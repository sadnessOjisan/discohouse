import { h } from "preact";
import { Link } from "preact-router";

import { useUser } from "../hooks/useUser";

interface Props {
  id?: string;
}

export const User = (props: Props) => {
  const { user, invitor } = useUser(props.id);
  return (
    <div>
      {user ? (
        <div>
          <div>
            <p>
              <span>{user.name}</span>
              <img src={user.image} />
            </p>
          </div>
        </div>
      ) : (
        "no user"
      )}
      {invitor && (
        <div>
          from:
          <Link href={`/users/${invitor.invitedUserId}`}>
            {invitor.invitedUserName}
            <img src={invitor.invitedImage} />
          </Link>
        </div>
      )}
    </div>
  );
};
