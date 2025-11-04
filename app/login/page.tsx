import React from "react";
import Chat from "./compontes/chat";
import Link from "next/link";
import Button from "../common/components/Button";

function LoginPage() {
  return (
    <>
      <div>Home</div>
      <Chat />
      <Link href="/">Logout</Link>
      <Button text="Submit" />
    </>
  );
}

export default LoginPage;
