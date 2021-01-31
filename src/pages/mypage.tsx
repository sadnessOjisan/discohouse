import { h } from "preact";
import { Link } from "preact-router";

import { useMypage } from "../hooks/useMypage";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
  const { user, logout, invitor, name, image, handleImageChange } = useMypage();
  return (
    <div>
      {user ? (
        <div>
          <div>
            <input type="file" onChange={handleImageChange} />
            <img src={image} />
            <input value={name} />
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
