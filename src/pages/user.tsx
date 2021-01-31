import { h } from "preact";
import { Link } from "preact-router";

import { useUser } from "../hooks/useUser";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

interface Props {
  id?: string;
}

export const User = (props: Props) => {
  const { user, invitor } = useUser(props.id);
  return (
    <div>
      {user ? (
        <div>
          user {JSON.stringify(user)}
          {user.invitation > 0 && (
            <div>
              招待URL:
              {`${getHostUrl(getEnv())}/signup?token=${user.invitationKey}`}
            </div>
          )}
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
