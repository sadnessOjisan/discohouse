import { Header, View } from "@adobe/react-spectrum";
import { ComponentChild, h } from "preact";
import { Link } from "preact-router";

export const Layout = ({ children }: { children: ComponentChild }) => {
  return (
    <View padding={8}>
      <Header>
        <Link
          style={{
            fontSize: 20,
            color: "white",
            textDecoration: "none",
            fontWeight: 700,
          }}
          href="/"
        >
          <span>✌️ </span>Discohouse
        </Link>
      </Header>
      <View padding={16}>{children}</View>
    </View>
  );
};
