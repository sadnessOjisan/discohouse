import { h } from "preact";
import { Link } from "preact-router";

export const Root = () => {
  return (
    <div>
      root <Link href="/signin">si</Link>
      <Link href="/users/1">us</Link>
    </div>
  );
};
