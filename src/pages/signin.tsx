import {
  AlertDialog,
  Button,
  Flex,
  Form,
  Heading,
  ProgressCircle,
  TextField,
  View,
} from "@adobe/react-spectrum";
import Send from "@spectrum-icons/workflow/Send";
import { Fragment, h } from "preact";
import useMedia from "use-media";

import { Layout } from "../components/layout";
import { useSignin } from "../hooks/useSignin";

export const Signin = () => {
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    handleClickGithub,
    loading,
    errorMessage,
    sending,
  } = useSignin();
  const isWide = useMedia({ minWidth: "768px" });
  return (
    <Layout>
      <div style={{ maxWidth: 924, margin: "0 auto" }}>
        {loading ? (
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
        ) : errorMessage !== undefined ? (
          <Flex justifyContent="center" alignItems="center">
            <AlertDialog
              title="Error"
              variant="warning"
              primaryActionLabel="confirm"
              onPrimaryAction={() => {
                window.location.href = "/";
              }}
            >
              {errorMessage}
            </AlertDialog>
          </Flex>
        ) : (
          <Fragment>
            <Heading level={1} UNSAFE_style={{ textAlign: "center" }}>
              signin
            </Heading>
            <Flex gap="size-200" direction={isWide ? "row" : "column"}>
              <View
                UNSAFE_style={{
                  borderRadius: 8,
                  border: "solid 1px gray",
                  width: isWide ? "50%" : "calc(100%-48px)",
                  padding: "64px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Heading level={3}>Github</Heading>
                <Button onClick={handleClickGithub} variant="cta">
                  <Send />
                  github signin
                </Button>
              </View>
              <View
                UNSAFE_style={{
                  borderRadius: 8,
                  border: "solid 1px gray",
                  width: isWide ? "50%" : "calc(100%-48px)",
                  padding: "64px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Heading level={3}>Email</Heading>
                <Form onSubmit={handleSubmit} width={isWide ? "80%" : "50%"}>
                  <TextField
                    label="email"
                    name="email"
                    type="email"
                    onChange={handleSetEmail}
                    value={email}
                  />
                  <TextField
                    label="password"
                    name="password"
                    type="password"
                    onChange={handleSetPassword}
                    value={password}
                  />
                  <Button
                    type="submit"
                    variant="cta"
                    marginTop={24}
                    isDisabled={sending}
                  >
                    <Send />
                    {sending ? "sending" : "submit"}
                  </Button>
                </Form>
              </View>
            </Flex>
          </Fragment>
        )}
      </div>
    </Layout>
  );
};
