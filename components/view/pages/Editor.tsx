import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import EditorPage from "@/roles/pages/EditorPage";
import UnknownPage from "@/roles/pages/UnknownPage";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const ViewSiteEditor = ({ children }: LayoutProps) => {
  const { data: session } = useSession();
  switch (session?.user.role) {
    case "max":
      return <EditorPage>{children}</EditorPage>;
    case "admin":
      return <EditorPage>{children}</EditorPage>;
    case "editor":
      return <EditorPage>{children}</EditorPage>;
    case "member":
      return <UnknownPage />;
    case "unknown":
      return <UnknownPage />;
    default:
      return <Login />;
  }
};

export default ViewSiteEditor;
