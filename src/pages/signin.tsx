import {
  ActionButton,
  AlertDialog,
  Button,
  DialogTrigger,
  Flex,
  Form,
  Heading,
  ProgressCircle,
  TextField,
  View,
} from "@adobe/react-spectrum";
import { Fragment, h } from "preact";
import { Link } from "preact-router";
import { Layout } from "../components/layout";

import { useSignin } from "../hooks/useSignin";

export const Signin = () => {
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    handleLogout,
    handleClickGithub,
    user,
    loading,
    error,
  } = useSignin();
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
            <Flex gap="size-200">
              <View
                UNSAFE_style={{
                  borderRadius: 8,
                  border: "solid 1px gray",
                  width: "50%",
                  padding: "64px 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Heading level={3}>Github</Heading>
                <Button onClick={handleClickGithub}>github signin</Button>
              </View>
              <View
                UNSAFE_style={{
                  borderRadius: 8,
                  border: "solid 1px gray",
                  width: "50%",
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
                  <Button type="submit">submit</Button>
                </Form>
              </View>
            </Flex>
          </Fragment>
        )}
      </div>
    </Layout>
  );
};
