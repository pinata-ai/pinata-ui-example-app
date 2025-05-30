import z from "zod";
import {useForm, Controller} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {TextInput, View, StyleSheet, Text} from "react-native";
import {Pressable} from "react-native-gesture-handler";
import {useAuth} from "../src/shared/services/AuthProvider";
import {Redirect, useRouter} from "expo-router";
import {PinataService} from "../src/shared/services/pinataservice";
import Constants from 'expo-constants';

const fieldRequiredMessage = "This field is required" as const;

const formSchema = z.object({
    clientID: z.string().trim().min(1, {message: fieldRequiredMessage}).max(64),
    clientKey: z.string().trim().min(1, {message: fieldRequiredMessage}).max(64),
    clientSecret: z.string().trim().min(1, {message: fieldRequiredMessage}).max(64),
    userEmail: z.string().trim().email({message: "Invalid email"}).min(1, {message: fieldRequiredMessage}),
    isProd: z.boolean().optional(),
});

const LoginPage = () => {
    const {login, user} = useAuth();
    const {replace} = useRouter();

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            clientID: Constants.expoConfig?.extra?.CLIENT_ID || "",
            clientKey: Constants.expoConfig?.extra?.CLIENT_KEY || "",
            clientSecret: Constants.expoConfig?.extra?.CLIENT_SECRET || "",
            userEmail: Constants.expoConfig?.extra?.USER_EMAIL || "",
            isProd: false,
        },
    });

    if (user) {
        return <Redirect href={"/"}/>
    }

    const onSubmit = async ({clientID, clientKey, clientSecret, userEmail}: any) => {
        try {
            const pinataService = new PinataService(false);
            const {accessToken: companyAccessToken} = await pinataService.auth.getCompanyTokens({
                clientID,
                clientKey,
                clientSecret,
            });
            const {accessToken: userAccessToken} = await pinataService.auth.getUserTokens({
                companyAccessToken,
                userEmail,
            });

            await login({
                email: userEmail,
                token: userAccessToken,
                isProd: false,
            });

            replace("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <View style={styles.wrapper}>
            {([
                {name: "clientID", placeholder: "Client ID"},
                {name: "clientKey", placeholder: "Client Key"},
                {name: "clientSecret", placeholder: "Client Secret", secureTextEntry: true},
                {name: "userEmail", placeholder: "User Email", keyboardType: "email-address"},
            ] as const).map(({name, ...inputProps}) => (
                <View key={name} style={styles.inputWrapper}>
                    <Controller
                        control={control}
                        name={name}
                        render={({field: {onChange, onBlur, value}}) => (
                            <TextInput
                                style={[styles.input, errors[name] && styles.inputError]}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                value={value}
                                {...inputProps}
                            />
                        )}
                    />
                    {errors[name] && <Text style={styles.errorText}>{errors[name]?.message}</Text>}
                </View>
            ))}

            <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 15,
        justifyContent: "center",
    },
    inputWrapper: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 6,
        padding: 10,
    },
    inputError: {
        borderColor: "#f00",
    },
    errorText: {
        color: "#f00",
        marginTop: 5,
    },
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

export default LoginPage;
