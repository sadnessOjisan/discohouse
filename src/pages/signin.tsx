import { h } from "preact";

export const Signin = () => {
  <h1>sign in</h1>;
  return (
    <div>
      <button>github login</button>
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
