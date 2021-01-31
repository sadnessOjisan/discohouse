import { h } from "preact";
import { Link } from "preact-router";

export const Root = () => {
  return (
    <div>
      root <Link href="/signin">si</Link>
    </div>
  );
};
