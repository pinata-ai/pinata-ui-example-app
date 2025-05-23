import {StyleSheet, Image, View} from "react-native";
import {PinataPointsFlow} from "pinata-ui-react-native";
import {useAuth} from "../../src/shared/services/AuthProvider";


const HomePage = () => {
    const {user} = useAuth()
    return (
        <View style={styles.wrapper}>
            <Image
                source={{uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"}}
                style={{width: '100%', height: 200}}/>
            <PinataPointsFlow token={user?.token}/>
        </View>
    );
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white'
    },
    webview: {
        width: '100%',
    },
});


export default HomePage;