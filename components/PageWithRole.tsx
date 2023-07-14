import { useSession, signIn } from "next-auth/react";
import React, { ReactNode } from "react";

interface PageWithRoleProps {
  allowedRoles: any;
  children: ReactNode;
}
const PageWithRole = ({ allowedRoles, children }: PageWithRoleProps) => {
  //   const [session, loading] = useSession();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <>
        <p>You must be signed in to view this page</p>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  const isAllowedRole =
    session.user &&
    "role" in session.user &&
    allowedRoles.includes(session.user.role);

  if (!isAllowedRole) {
    return <p>You do not have permission to access this page.</p>;
  }
  return <>{children}</>;
};

export default PageWithRole;
