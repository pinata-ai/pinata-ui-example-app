import { PinataIdpWidget } from "pinata-ui-react-native";
import { useAuth } from "../../src/shared/services/AuthProvider";

export const Idp = () => {
  const { user } = useAuth();
  return <PinataIdpWidget token={user?.token} environment="sandbox" />;
};

export default Idp;
