// 招待を送った人を表示するコンポーネント
import { Heading, View } from "@adobe/react-spectrum";
import { h } from "preact";
import { Link } from "preact-router";

import { Invitor } from "../type/user";

type Props = {
  invitor: Invitor;
};

export const Invitor = ({ invitor }: Props) => {
  return (
    <View>
      <Heading level={2}>nominated by</Heading>
      <View>
        from:
        <Link href={`/${invitor.invitedUserId}`}>
          {invitor.invitedUserName}
          <img src={invitor.invitedImage} />
        </Link>
      </View>
    </View>
  );
};
