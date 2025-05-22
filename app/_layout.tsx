import {AuthProvider} from "../src/shared/services/AuthProvider";
import {Stack} from "expo-router";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {GestureHandlerRootView} from "react-native-gesture-handler";

export default function RootLayout() {
    return (
        <GestureHandlerRootView>
            <SafeAreaProvider>
                <SafeAreaView style={{flex: 1}} edges={['bottom','left','right']}>
                    <AuthProvider>
                        <StatusBar/>
                        <Stack screenOptions={{headerShown: false, gestureEnabled: true}}/>
                    </AuthProvider>
                </SafeAreaView>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}