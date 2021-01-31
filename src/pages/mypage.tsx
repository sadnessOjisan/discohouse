import { h } from "preact";
import { Link } from "preact-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useUser } from "../hooks/useUser";
import { auth } from "../infra/firebase";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
  const { user, invitor } = useUser();
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
