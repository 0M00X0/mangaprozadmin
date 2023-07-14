import PageWithRole from "@/components/PageWithRole";
import Inactive from "@/components/Inactive";

const UnknownPage = () => {
    return ( 
      <PageWithRole allowedRoles={["max", "admin", "editor", "member", "unknown"]}>
        <Inactive />
      </PageWithRole>
    );
  };

export default UnknownPage;