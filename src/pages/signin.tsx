import { Fragment, h } from "preact";
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
  } = useSignin();
  const [user, loading, error] = useAuthState(auth);
  return (
    <div>
      {user ? (
        <button onClick={handleLogout}>logout</button>
      ) : (
        <Fragment>
          <h1>sign in</h1>
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
        </Fragment>
      )}
    </div>
  );
};
