import { h } from "preact";

import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
  } = useSignup();
  return (
    <div>
      <h1>sign up</h1>
      <button>github signup</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input
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
            type="password"
            value={password}
            onChange={handleSetPassword}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};
