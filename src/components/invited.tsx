// 招待を送った人を表示するコンポーネント
import {
  Flex,
  Heading,
  Image,
  Link as ALink,
  View,
} from "@adobe/react-spectrum";
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
        <View marginTop={24} key={inv.invitedUserId}>
          <ALink>
            <Link
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
                  objectFit="contain"
                />
                <View marginLeft={12}>{inv.invitedUserName}</View>
              </Flex>
            </Link>
          </ALink>
        </View>
      ))}
    </View>
  );
};
