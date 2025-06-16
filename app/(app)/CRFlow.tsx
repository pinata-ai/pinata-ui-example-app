import {Text} from 'react-native'
import {useAuth} from "../../src/shared/services/AuthProvider";

export const CRFlow = () => {
    const {user} = useAuth()
    return (
        <Text>CRFlow</Text>
    )

}

export default CRFlow;