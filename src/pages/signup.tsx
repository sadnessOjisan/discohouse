import { h } from "preact";

export const Signup = () => {
  return (
    <div>
      <h1>sign up</h1>
      <button>github signup</button>
      <form>
        <div>
          <label>email</label>
          <input type="email" />
        </div>
        <div>
          <label>password</label>
          <input type="password" />
        </div>
      </form>
    </div>
  );
};
