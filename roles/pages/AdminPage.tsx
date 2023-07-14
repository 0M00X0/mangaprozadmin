import PageWithRole from "@/components/PageWithRole";
import Layout from "@/components/Layout";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}
const AdminPage = ({ children }: LayoutProps) => {
    return (
      <PageWithRole allowedRoles={["max", "admin"]}>
        <Layout>
          {children}
        </Layout>
      </PageWithRole>
    );
};

export default AdminPage;
