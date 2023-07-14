import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import AdminPage from "@/roles/pages/AdminPage";
import UnknownPage from "@/roles/pages/UnknownPage";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const ViewSiteAdmin = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
  switch (session?.user.role) {
    case "max":
      return <AdminPage>{children}</AdminPage>;
    case "admin":
      return <AdminPage>{children}</AdminPage>;
    case "editor":
      return <UnknownPage />;
    case "member":
      return <UnknownPage />;
    case "unknown":
      return <UnknownPage />;
    default:
      return <Login />;
  }
};

export default ViewSiteAdmin;
