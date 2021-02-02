import { Heading, Image, View } from "@adobe/react-spectrum";
import { h } from "preact";

import Social from "../assets/social.png";
import { Layout } from "../components/layout";
import { UserItem } from "../components/userItem";
import { useRoot } from "../hooks/useRoot";

export const Root = () => {
  const { users } = useRoot();

  return (
    <Layout>
      <div
        style={{
          maxWidth: 924,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Heading level={1} justifySelf="center">
          Discohouse is an invitation-only SNS.
        </Heading>
        <View>
          <Heading level={3}>You can just invite your firends.</Heading>
        </View>
        <Image src={Social} alt="top image" width="60%" />
        <Heading level={1}>Latest users</Heading>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          {users && users.map((user) => <UserItem key={user.id} user={user} />)}
        </div>
      </div>
    </Layout>
  );
};
