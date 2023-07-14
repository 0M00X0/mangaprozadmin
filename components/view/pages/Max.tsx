import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import MaxPage from "@/roles/pages/MaxPage";
import UnknownPage from "@/roles/pages/UnknownPage";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const ViewSiteMax = ({ children }: LayoutProps) => {
  const { data: session } = useSession();


  if (session?.user) {
    switch (session?.user?.role) {
      case "max":
        return <MaxPage>{children}</MaxPage>;
      case "admin":
        return <UnknownPage />;
      case "editor":
        return <UnknownPage />;
      case "member":
        return <UnknownPage />;
      case "unknown":
        return <UnknownPage />;
      default:
        return <Login />;
    }
  } else {
    return <Login />;
  }
};

export default ViewSiteMax;
