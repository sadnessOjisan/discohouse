import { h } from "preact";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const { email, handleSetEmail } = useSignup();
  return (
    <div>
      <h1>sign up</h1>
      <button>github signup</button>
      <form>
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
          <input type="password" />
        </div>
      </form>
    </div>
  );
};
