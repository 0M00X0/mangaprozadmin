import PageWithRole from "@/components/PageWithRole";
import Layout from "@/components/Layout";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const MemberPage = ({ children }: LayoutProps) => {
    return (
      <PageWithRole allowedRoles={["max", "admin", "editor", "member"]}>
        <Layout>
          {children}
        </Layout>
      </PageWithRole>
    );
  };

export default MemberPage;