import { CoreCreditReportingFlow } from "pinata-ui-react-native";
import { useAuth } from "../../src/shared/services/AuthProvider";

export const CRFlow = () => {
  const { user } = useAuth();
  return <CoreCreditReportingFlow token={user?.token} environment="sandbox" />;
};

export default CRFlow;
