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
    error,
  } = useSignin();
  const isWide = useMedia({ minWidth: "768" });
  return (
    <Layout>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        {loading ? (
          <ProgressCircle aria-label="Loading…" isIndeterminate />
        ) : error ? (
          <Flex justifyContent="center" alignItems="center">
            <AlertDialog
              title="Error"
              variant="warning"
              primaryActionLabel="confirm"
              onPrimaryAction={() => {
                window.location.href = "/";
              }}
            >
              session confirm error. please reload this page.
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
                <Form onSubmit={handleSubmit}>
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
                  <Button type="submit" variant="cta">
                    submit
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
