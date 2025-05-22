import BasePinataWebView from "../BasePinataWebView";

export const PinataRewardsFlow = () => {
    return <BasePinataWebView
        getHtml={(token) => `<pinata-reward-flow usertoken="${token}" style="font-size:clamp(0.8rem, 0.625rem + 0.875vw, 2.2rem);"/>`}/>
}