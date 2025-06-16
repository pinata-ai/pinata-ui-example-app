import {Text} from 'react-native'
import {useAuth} from "../../src/shared/services/AuthProvider";

const RewardsPage = () => {
    const {user} = useAuth()
    return (
        <Text>Rewards</Text>
    );
}


export default RewardsPage;