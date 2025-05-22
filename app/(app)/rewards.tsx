import {StyleSheet} from "react-native";
import WebView from "react-native-webview";
import {useAuth} from "../../src/shared/services/AuthProvider";

const RewardsPage = () => {
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
    </head>
    <body>
        <pinata-reward-flow usertoken="${user.token}" style="font-size:clamp(0.8rem, 0.625rem + 0.875vw, 2.2rem);"/>
     
    </html>
  `;

    return (
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
    );
}


const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    webview: {
        width: '100%',
        flex: 1,
    },
});


export default RewardsPage;