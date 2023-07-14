import PageWithRole from "@/components/PageWithRole";
import Layout from "@/components/Layout";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const EditorPage = ({ children }: LayoutProps) => {
    return (
      <PageWithRole allowedRoles={["max", "admin", "editor"]}>
        <Layout>
          {children}
        </Layout>
      </PageWithRole>
    );
  };

export default EditorPage;