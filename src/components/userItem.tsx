// 招待してくれた人を表示するコンポーネント
import { Flex, Image, Link as ALink, View } from "@adobe/react-spectrum";
import { h } from "preact";
import { Link } from "preact-router";

import { User } from "../type/user";

type Props = {
  user: User;
};

export const UserItem = ({ user }: Props) => {
  return (
    <View marginTop={24}>
      <ALink key={user.id}>
        <Link href={`/${user.id}`}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              src={user.image}
              alt="invitor image"
              width={40}
              height={40}
              UNSAFE_style={{ marginRight: 12 }}
            />
            <View marginLeft={12}>{user.name}</View>
          </div>
        </Link>
      </ALink>
    </View>
  );
};
