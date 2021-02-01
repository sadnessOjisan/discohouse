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
import { Link } from "preact-router";
import { useAuthState } from "react-firebase-hooks/auth";

import { Layout } from "../components/layout";
import { useSignup } from "../hooks/useSignup";
import { auth } from "../infra/firebase";

export const Signup = () => {
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    handleLogout,
    token,
    handleSetToken,
    handleClickGithub,
    user,
    loading,
    error,
  } = useSignup();
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
        ) : token ? (
          <Fragment>
            <Heading level={1} UNSAFE_style={{ textAlign: "center" }}>
              signup
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
                <Button onClick={handleClickGithub} variant="cta">
                  signup
                </Button>
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
                  <Button type="submit" variant="cta">
                    submit
                  </Button>
                </Form>
              </View>
            </Flex>

            <p>
              If you already have an acount, please sign in from{" "}
              <Link href="/signin">here</Link>.
            </p>
          </Fragment>
        ) : (
          <Flex
            justifyContent="center"
            alignItems="center"
            UNSAFE_style={{ heidht: "100%" }}
          >
            <AlertDialog
              title="Error"
              variant="warning"
              primaryActionLabel="confirm"
              onPrimaryAction={() => {
                window.location.href = "/";
              }}
            >
              Please come to signup page with invitation URL.
            </AlertDialog>
          </Flex>
        )}
      </div>
    </Layout>
  );
};
