import { CreditReportingFlow } from "pinata-ui-react-native";
import { useAuth } from "../../src/shared/services/AuthProvider";

export const CRFlow = () => {
  const { user } = useAuth();
  return <CreditReportingFlow token={user?.token} environment="sandbox" />;
};

export default CRFlow;
