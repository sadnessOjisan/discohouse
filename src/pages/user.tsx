import {
  AlertDialog,
  Flex,
  Image,
  ProgressCircle,
  Text,
  View,
} from "@adobe/react-spectrum";
import { h } from "preact";
import { useAuthState } from "react-firebase-hooks/auth";

import { Invited } from "../components/invited";
import { Invitor } from "../components/invitor";
import { Layout } from "../components/layout";
import { useUser } from "../hooks/useUser";
import { auth } from "../infra/firebase";

interface Props {
  id?: string;
}

export const User = (props: Props) => {
  const { user, invitor, invited, error } = useUser(props.id);
  const [authUser] = useAuthState(auth);
  return (
    <Layout user={authUser}>
      {" "}
      <div style={{ maxWidth: 924, margin: "0 auto" }}>
        {error ? (
          <Flex justifyContent="center" alignItems="center">
            <AlertDialog
              title="Error"
              variant="warning"
              primaryActionLabel="confirm"
              onPrimaryAction={() => {
                window.location.href = "/";
              }}
            >
              {error}
            </AlertDialog>
          </Flex>
        ) : user ? (
          <View>
            <View>
              <Flex alignItems="center" direction="column">
                <Image
                  src={user.image}
                  alt="invitor image"
                  width={100}
                  height={100}
                  objectFit="contain"
                />
                <p>
                  <Text>{user.name}</Text>
                </p>
              </Flex>
            </View>
            {invitor && <Invitor invitor={invitor} />}
            {invited.length > 0 && <Invited invitors={invited} />}
          </View>
        ) : (
          <div
            style={{
              position: "fixed",
              width: "100%",
              height: "100%",
              top: 0,
              left: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ProgressCircle aria-label="Loading…" isIndeterminate />
          </div>
        )}
      </div>
    </Layout>
  );
};
