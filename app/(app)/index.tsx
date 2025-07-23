import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { PinataPointsWallet } from "pinata-ui-react-native";
import { useAuth } from "../../src/shared/services/AuthProvider";

const HomePage = () => {
  const { user } = useAuth();
  const { push } = useRouter();

  return (
    <View style={styles.wrapper}>
      <PinataPointsWallet
        onClick={() => {
          push("/rewards");
        }}
        environment="sandbox"
        token={user?.token}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },
  webview: {
    width: "100%",
  },
});

export default HomePage;
