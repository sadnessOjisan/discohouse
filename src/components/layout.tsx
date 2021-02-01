import { View } from "@adobe/react-spectrum";
import { ComponentChild, h } from "preact";

export const Layout = ({ children }: { children: ComponentChild }) => {
  return <View padding={24}>{children}</View>;
};
