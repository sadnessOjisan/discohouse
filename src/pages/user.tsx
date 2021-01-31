import { h } from "preact";
import { Link } from "preact-router";

import { useUser } from "../hooks/useUser";

interface Props {
  id?: string;
}

export const User = (props: Props) => {
  const { user, invitor, invited } = useUser(props.id);
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
          <Link href={`/${invitor.invitedUserId}`}>
            {invitor.invitedUserName}
            <img src={invitor.invitedImage} />
          </Link>
        </div>
      )}
      <h1>招待した人</h1>
      {invited.map((inv) => (
        <a key={inv.invitedUserId} href={`/${inv.invitedUserId}`}>
          <img src={inv.invitedImage} />
          <div>{inv.invitedUserName}</div>
        </a>
      ))}
    </div>
  );
};
