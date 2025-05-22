import BasePinataWebView from "../BasePinataWebView";

export const PinataPointsFlow = () => {
    return (
        <BasePinataWebView getHtml={(token) => `
                <pinata-points-flow usertoken="${token}" style="font-size:clamp(0.8rem, 0.625rem + 0.875vw, 2.2rem);"></pinata-points-flow>
            `}/>
    )
}