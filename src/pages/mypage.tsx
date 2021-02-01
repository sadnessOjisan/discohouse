import { Fragment, h } from "preact";
import { Link } from "preact-router";

import { useMypage } from "../hooks/useMypage";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
  const {
    user,
    logout,
    invitor,
    invited,
    name,
    image,
    handleImageChange,
    saveProfile,
    handleChangeName,
  } = useMypage();
  return (
    <div>
      {user ? (
        <div>
          <div>
            <input type="file" onChange={handleImageChange} />
            <img src={image} />
            <input value={name} onChange={handleChangeName} />
            <button onClick={saveProfile}>save</button>
          </div>
          {user.invitation > 0 && (
            <div>
              招待URL:
              {`${getHostUrl(getEnv())}/signup?token=${user.invitationKey}`}
              you have {user.invitation} invitations.
            </div>
          )}
          <button onClick={logout}>logout</button>
        </div>
      ) : (
        "no user"
      )}
      <h1>invite from</h1>
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
