import { Fragment, h } from "preact";
import { Link } from "preact-router";
import { useAuthState } from "react-firebase-hooks/auth";

import { useSignin } from "../hooks/useSignin";
import { auth } from "../infra/firebase";

export const Signin = () => {
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    handleLogout,
    handleClickGithub,
  } = useSignin();
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : user ? (
        <button onClick={handleLogout}>logout</button>
      ) : error ? (
        <div>error</div>
      ) : (
        <Fragment>
          <h1>sign in</h1>
          <button onClick={handleClickGithub}>github signin</button>
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
            <button>submit</button>
          </form>
          <p>
            アカウント作成は<Link href="/signup">こちら</Link>から。
          </p>
        </Fragment>
      )}
    </div>
  );
};
