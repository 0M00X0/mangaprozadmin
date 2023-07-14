import PageWithRole from "@/components/PageWithRole";
import Layout from "@/components/Layout";
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const MaxPage = ({ children }: LayoutProps) => {
    return (
      <PageWithRole allowedRoles={["max"]}>
        <Layout>
          {children}
        </Layout>
      </PageWithRole>
    );
  };

export default MaxPage;