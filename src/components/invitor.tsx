// 招待してくれた人を表示するコンポーネント
import {
  Flex,
  Heading,
  Image,
  Link as ALink,
  View,
} from "@adobe/react-spectrum";
import { h } from "preact";
import { Link } from "preact-router";

import { Invitor as InvitorType } from "../type/user";

type Props = {
  invitor: InvitorType;
};

export const Invitor = ({ invitor }: Props) => {
  return (
    <View>
      <Heading level={2}>nominated by</Heading>
      <View>
        <ALink key={invitor.invitedUserId} marginTop={24}>
          <Link
            href={`/${invitor.invitedUserId}`}
            style={{ display: "block", margin: "24px 0px" }}
          >
            <Flex alignItems="center">
              <Image
                src={invitor.invitedImage}
                alt="invitor image"
                width={40}
                height={40}
                UNSAFE_style={{ marginRight: 12 }}
              />
              <View marginLeft={12}>{invitor.invitedUserName}</View>
            </Flex>
          </Link>
        </ALink>
      </View>
    </View>
  );
};
