import { Fragment, h } from "preact";
import { Link } from "preact-router";
import { useAuthState } from "react-firebase-hooks/auth";

import { useSignup } from "../hooks/useSignup";
import { auth } from "../infra/firebase";

export const Signup = () => {
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    handleLogout,
    token,
    handleSetToken,
    handleClickGithub,
  } = useSignup();
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : user ? (
        <div>
          <Link href={`/mypage`}>mypage</Link>
          <button onClick={handleLogout}>logout</button>
        </div>
      ) : error ? (
        <div>error</div>
      ) : token ? (
        <Fragment>
          <h1>signup</h1>
          <button onClick={handleClickGithub}>github signup</button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>email</label>
              <input
                name="email"
                type="email"
                onChange={(e) => {
                  handleSetEmail(e);
                }}
                value={email}
              />
            </div>
            <div>
              <label>password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleSetPassword}
              />
            </div>
            <div>
              <label>token</label>
              <input
                name="token"
                type="text"
                value={token}
                onChange={handleSetToken}
              />
            </div>
            <button>submit</button>
          </form>
          <p>
            アカウントを持っている方は<Link href="/signin">こちら</Link>から。
          </p>
        </Fragment>
      ) : (
        <div>you need token</div>
      )}
    </div>
  );
};
