import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import MemberPage from "@/roles/pages/MemberPage";
import UnknownPage from "@/roles/pages/UnknownPage";
import React, { ReactNode } from 'react';
 
interface LayoutProps {
  children: ReactNode;
}
const ViewSiteMember = ({ children }: LayoutProps) => {
  const { data: session } = useSession();

  switch (session?.user?.role) {
    case "max":
      return <MemberPage>{children}</MemberPage>;
    case "admin":
      return <MemberPage>{children}</MemberPage>;
    case "editor":
      return <MemberPage>{children}</MemberPage>;
    case "member":
      return <MemberPage>{children}</MemberPage>;
    case "unknown":
      return <UnknownPage />;
    default:
      return <Login />;
  }
};

export default ViewSiteMember;
