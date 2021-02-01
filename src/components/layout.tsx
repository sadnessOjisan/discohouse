import { View } from "@adobe/react-spectrum";
import { h, ComponentChild } from "preact";
import { View } from "@adobe/react-spectrum";

export const Layout = ({ children }: { children: ComponentChild }) => {
  return <View padding={24}>{children}</View>;
};
