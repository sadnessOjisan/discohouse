import {
  AlertDialog,
  Button,
  Flex,
  Heading,
  Image,
  ProgressCircle,
  Text,
  TextField,
  View,
} from "@adobe/react-spectrum";
import Copy from "@spectrum-icons/workflow/Copy";
import Send from "@spectrum-icons/workflow/Send";
import UserCheckedOut from "@spectrum-icons/workflow/UserCheckedOut";
import { h } from "preact";
import { useState } from "preact/hooks";

import { Invited } from "../components/invited";
import { Invitor } from "../components/invitor";
import { Layout } from "../components/layout";
import { useMypage } from "../hooks/useMypage";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
  const [copied, setCopyState] = useState(false);
  const {
    user,
    logout,
    invitor,
    invited,
    name,
    image,
    handleImageChange,
    saveProfile,
    handleChangeName,
    error,
    isSending,
  } = useMypage();

  return (
    <Layout>
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
            <View marginBottom={32}>
              {user.invitation > 0 && (
                <View>
                  <Heading level={2}>invite</Heading>
                  <p>
                    <Text>
                      you have{" "}
                      <Text
                        color="magenta-500"
                        UNSAFE_style={{ color: "rgb(202, 41, 150)" }}
                      >
                        {user.invitation}
                      </Text>{" "}
                      invitations.
                    </Text>
                  </p>
                  <p>
                    <Text marginEnd={12}>invitation url:</Text>
                    <Text
                      color="magenta-500"
                      UNSAFE_style={{ color: "rgb(202, 41, 150)" }}
                    >
                      {`${getHostUrl(getEnv())}/signup?token=${
                        user.invitationKey
                      }`}
                    </Text>
                  </p>
                  <Button
                    onClick={() => {
                      setCopyState(true);
                      navigator.clipboard.writeText(
                        `${getHostUrl(getEnv())}/signup?token=${
                          user.invitationKey
                        }`
                      );
                      setTimeout(() => {
                        setCopyState(false);
                      }, 1000);
                    }}
                    variant="cta"
                    isDisabled={copied}
                  >
                    <Copy />
                    <Text>{copied ? "Copied" : "Copy"}</Text>
                  </Button>
                </View>
              )}
            </View>
            <View marginBottom={32}>
              <Heading level={2}>edit my profile</Heading>
              <TextField
                label="your name"
                value={name}
                onChange={handleChangeName}
              />
              <View marginTop={32}>
                <label
                  style={{
                    boxSizing: "border-box",
                    color: "rgb(162, 162, 162)",
                    colorScheme: "light dark",
                    cursor: "Default",
                    display: "flex",
                    fontFamily:
                      'adobe-clean-han-japanese, "Yu Gothic", "メ イ リ オ", "ヒ ラ ギ ノ 角 ゴ Pro W3", "Hiragino Kaku Gothic Pro W3", Osaka, "Ｍ Ｓ Ｐ ゴ シ ッ ク", "MS PGothic", -apple-system, system-ui, "Segoe UI", Roboto, sans-serif',
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    height: "24px",
                    lineHeight: "15.6px",
                    textAlign: "left",
                    verticalAlign: "top",
                    width: "192px",
                  }}
                >
                  your image
                </label>
                <input
                  type="file"
                  onChange={handleImageChange}
                  style={{ color: "rgba(0, 0, 0, 0)" }}
                />
                <View width={200} marginTop={8}>
                  <Image
                    src={image}
                    alt="user image"
                    width="200"
                    height="200"
                    objectFit="contain"
                  />
                </View>
              </View>
              <Button
                onPress={saveProfile}
                marginTop={32}
                variant="cta"
                isDisalbed={isSending}
              >
                <Send />
                <Text>{isSending ? "sending" : "save"}</Text>
              </Button>
            </View>
            <View marginBottom={32}>
              {invitor && <Invitor invitor={invitor} />}
            </View>
            <View marginBottom={32}>
              {invited.length > 0 && <Invited invitors={invited} />}
            </View>

            <View marginBottom={32}>
              <Heading level={2}>Session</Heading>
              <Button onClick={logout} variant="negative">
                <UserCheckedOut />
                <Text>logout</Text>
              </Button>
            </View>
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
