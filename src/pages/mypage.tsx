import { h } from "preact";
import { Link } from "preact-router";

import { useMypage } from "../hooks/useMypage";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
  const { user, invitor } = useMypage();
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
