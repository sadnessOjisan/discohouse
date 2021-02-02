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
import useMedia from "use-media";

import { Layout } from "../components/layout";
import { useSignup } from "../hooks/useSignup";

export const Signup = () => {
  const isWide = useMedia({ minWidth: "768px" });
  const {
    email,
    handleSetEmail,
    password,
    handleSetPassword,
    handleSubmit,
    token,
    handleClickGithub,
    loading,
    errorMessage,
    sending,
  } = useSignup();
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
        ) : errorMessage ? (
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
        ) : token ? (
          <Fragment>
            <Heading level={1} UNSAFE_style={{ textAlign: "center" }}>
              signup
            </Heading>
            <div style={{ display: "flex" }}>
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
                  marginRight: 12,
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
                    {sending ? "sending" : "submit"}
                  </Button>
                </Form>
              </View>
            </div>

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
