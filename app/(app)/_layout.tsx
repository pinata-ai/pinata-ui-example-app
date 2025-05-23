import {Redirect} from 'expo-router';
import {Drawer} from "expo-router/drawer";
import {StyleSheet, Text} from "react-native";
import {Pressable} from "react-native-gesture-handler";
import { useAuth } from '../../src/shared/services/AuthProvider';


export default function AppLayout() {
    const {user, logout} = useAuth()

    if (!user) {
        return <Redirect href="/login"/>
    }

    return (
        <>
            <Drawer
                screenOptions={{
                    drawerActiveTintColor: "#1e90ff",
                    drawerLabelStyle: { fontWeight: "bold" },
                }}
            >
                <Drawer.Screen
                    name="index"
                    options={{ title: "Wallet", }}
                />
                <Drawer.Screen
                    name="rewards"
                    options={{ title: "Rewards flow" }}
                />
            </Drawer>
            <Pressable style={styles.button} onPress={logout}>
                <Text style={styles.buttonText}>Logout</Text>
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#1e90ff",
        padding: 12,
        alignItems: "center",
        borderRadius: 6,
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});