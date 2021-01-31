import { h } from "preact";

import { useMypage } from "../hooks/useMypage";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
  const { user, logout } = useMypage();
  return (
    <div>
      {user ? (
        <div>
          <div>
            <span>{user.name}</span>
            <img src={user.image} />
          </div>
          {user.invitation > 0 && (
            <div>
              招待URL:
              {`${getHostUrl(getEnv())}/signup?token=${user.invitationKey}`}
            </div>
          )}
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        "no user"
      )}
    </div>
  );
};
