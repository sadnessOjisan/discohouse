import {
  Button,
  Flex,
  Heading,
  Image,
  ProgressCircle,
  Text,
  TextField,
  View,
} from "@adobe/react-spectrum";
import { Fragment, h } from "preact";
import { Link } from "preact-router";

import { useMypage } from "../hooks/useMypage";
import { getEnv } from "../util/getEnv";
import { getHostUrl } from "../util/getHostUrl";

export const Mypage = () => {
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
  } = useMypage();

  return (
    <View padding={8} paddingLeft={24}>
      <Heading level={1}>Mypage</Heading>
      {user ? (
        <View>
          <Heading level={2}>invite</Heading>
          <View>
            {user.invitation > 0 && (
              <View>
                <p>
                  <Text> you have {user.invitation} invitations.</Text>
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
              </View>
            )}
          </View>
          <View>
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
              <View width={200} height={200} marginTop={8}>
                <Image src={image} alt="user image" />
              </View>
            </View>
            <Button onPress={saveProfile} marginTop={32} variant="cta">
              save
            </Button>
          </View>

          {invitor && (
            <Fragment>
              <Heading level={2}>nominated by</Heading>
              <View>
                from:
                <Link href={`/${invitor.invitedUserId}`}>
                  {invitor.invitedUserName}
                  <img src={invitor.invitedImage} />
                </Link>
              </View>
            </Fragment>
          )}
          {invited.length > 0 && (
            <Fragment>
              <Heading level={2}>sent invitation</Heading>
              {invited.map((inv) => (
                <a
                  key={inv.invitedUserId}
                  href={`/${inv.invitedUserId}`}
                  style={{ display: "block", margin: "24px 0px" }}
                >
                  <Flex alignItems="center">
                    <Image
                      src={inv.invitedImage}
                      alt="invitor image"
                      width={40}
                      height={40}
                      UNSAFE_style={{ marginRight: 12 }}
                    />
                    <View marginLeft={12}>{inv.invitedUserName}</View>
                  </Flex>
                </a>
              ))}
            </Fragment>
          )}

          <View>
            <Heading level={2}>Session</Heading>
            <Button onClick={logout} variant="negative">
              logout
            </Button>
          </View>
        </View>
      ) : (
        <ProgressCircle aria-label="Loading…" isIndeterminate />
      )}
    </View>
  );
};
