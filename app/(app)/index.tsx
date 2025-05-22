import {StyleSheet, Text, Image, View} from "react-native";
import WebView from "react-native-webview";
import {useAuth} from "../../src/shared/services/AuthProvider";


const HomePage = () => {
    const {user} = useAuth()

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta
    name="viewport"
    content="width=device-width,
             initial-scale=1,
             maximum-scale=1,
             user-scalable=no"
  />
      <link  rel="preconnect" href="https://static.pinata.ai/static/ui/pinata-ui.1.3.0-sandbox.js" />
      <script type="module" src="https://static.pinata.ai/static/ui/pinata-ui.1.3.0-sandbox.js"></script>
      <style>
</style>
    </head>
    <body>
       <pinata-points-flow usertoken="${user.token}" style="font-size:clamp(0.8rem, 0.625rem + 0.875vw, 2.2rem);"></pinata-points-flow>
       
     
    </html>
  `;

    return (
        <View style={styles.wrapper}>
            <Image
                source={{uri: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"}}
                style={{width: '100%', height: 200}}/>
            <WebView
                originWhitelist={['*']}
                source={{html}}
                style={styles.webview}
                javaScriptEnabled
                domStorageEnabled
                allowFileAccess
                allowFileAccessFromFileURLs
                allowUniversalAccessFromFileURLs
                onMessage={e => console.log('Message from WebView:', e.nativeEvent.data)}
                onError={e => {
                    console.warn('WebView error:', e.nativeEvent);
                }}
                mixedContentMode="always"
            />
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