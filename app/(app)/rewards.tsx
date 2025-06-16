import {PinataRewardsFlow} from "pinata-ui-react-native";
import {useAuth} from "../../src/shared/services/AuthProvider";

const RewardsPage = () => {
    const {user} = useAuth()
    return (
        <PinataRewardsFlow token={user?.token}/>
    );
}


export default RewardsPage;