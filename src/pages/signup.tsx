import { AlertDialog, Flex, ProgressCircle } from "@adobe/react-spectrum";
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
      {loading ? (
        <ProgressCircle aria-label="Loading…" isIndeterminate />
      ) : error ? (
        <div>error</div>
      ) : token ? (
        <Fragment>
          <h1>signup</h1>
          <button onClick={handleClickGithub}>github signup</button>
          <form onSubmit={handleSubmit}>
            <div>
              <label>email</label>
              <input
                name="email"
                type="email"
                onChange={(e) => {
                  handleSetEmail(e);
                }}
                value={email}
              />
            </div>
            <div>
              <label>password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={handleSetPassword}
              />
            </div>
            <button>submit</button>
          </form>
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
    </Layout>
  );
};
