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
  } = useSignup();
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
          <h1>signup</h1>
          <button>github signup</button>
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
            アカウントを持っている方は<Link href="/signin">こちら</Link>から。
          </p>
        </Fragment>
      )}
    </div>
  );
};
