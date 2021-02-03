import { Heading, Image, View } from "@adobe/react-spectrum";
import { h } from "preact";
import useMedia from "use-media";

import Mypage from "../assets/mypage.png";
import Signup from "../assets/signup.png";
import Social from "../assets/social.png";
import { Layout } from "../components/layout";
import { UserItem } from "../components/userItem";
import { useRoot } from "../hooks/useRoot";

export const Root = () => {
  const { users } = useRoot();
  const isWide = useMedia({ minWidth: "768px" });
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
        <Image src={Social} alt="top image" width={isWide ? "60%" : "100%"} />

        <Heading level={1}>How to use</Heading>
        <p>1. Sign-up from invitation</p>
        <Image
          src={Signup}
          alt="signup flow"
          width={isWide ? "60%" : "90%"}
          UNSAFE_style={{ border: "solid 1px gray" }}
        />

        <p>2. Send your friends invitation</p>
        <Image
          src={Mypage}
          alt="send invitation"
          width={isWide ? "60%" : "90%"}
          UNSAFE_style={{ border: "solid 1px gray" }}
        />

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
