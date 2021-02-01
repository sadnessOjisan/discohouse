import {
  Flex,
  Heading,
  Image,
  ProgressCircle,
  Text,
  View,
} from "@adobe/react-spectrum";
import { h } from "preact";
import { Link } from "preact-router";
import { Invited } from "../components/invited";
import { Invitor } from "../components/invitor";
import { Layout } from "../components/layout";

import { useUser } from "../hooks/useUser";

interface Props {
  id?: string;
}

export const User = (props: Props) => {
  const { user, invitor, invited } = useUser(props.id);
  return (
    <Layout>
      {user ? (
        <View>
          <View>
            <Flex alignItems="center" direction="column">
              <Image
                src={user.image}
                alt="invitor image"
                width={100}
                height={100}
              />
              <p>
                <Text>{user.name}</Text>
              </p>
            </Flex>
          </View>
        </View>
      ) : (
        <ProgressCircle aria-label="Loading…" isIndeterminate />
      )}
      {invitor && <Invitor invitor={invitor} />}
      {invited.length > 0 && <Invited invitors={invited} />}
    </Layout>
  );
};
