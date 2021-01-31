import { h } from "preact";

interface Props {
  id?: number;
}

export const User = (props: Props) => {
  if (props.id === undefined) throw new Error("id is no");
  return <div>user {props.id}</div>;
};
