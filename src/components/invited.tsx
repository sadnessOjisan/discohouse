// 招待を送った人を表示するコンポーネント
import { Flex, Heading, Image, View } from "@adobe/react-spectrum";
import { h } from "preact";
import { Link } from "preact-router";

import { Invitor } from "../type/user";

type Props = {
  invitors: Invitor[];
};

export const Invited = ({ invitors }: Props) => {
  return (
    <View>
      <Heading level={2}>sent invitation</Heading>
      {invitors.map((inv) => (
        <Link
          key={inv.invitedUserId}
          href={`/${inv.invitedUserId}`}
          style={{ display: "block", margin: "24px 0px" }}
        >
          <Flex alignItems="center">
            <Image
              src={inv.invitedImage}
              alt="invitor image"
              width={40}
              height={40}
              UNSAFE_style={{ marginRight: 12 }}
            />
            <View marginLeft={12}>{inv.invitedUserName}</View>
          </Flex>
        </Link>
      ))}
    </View>
  );
};
