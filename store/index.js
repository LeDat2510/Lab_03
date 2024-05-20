import { Children, createContext, useContext, useMemo, useReducer } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { Alert } from "react-native";

const MyContext = createContext();
MyContext.displayName = 'MyContextContext'

const reducer = (state, action) => {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, userLogin: action.value }
        case "USER_LOGOUT":
            return { ...state, userLogin: null }
        default:
            return new Error("Action not found")
    }
}

const MyContextControllerProvider = ({ children }) => {
    const initialState = {
        userLogin: null,
        selectedItem: null,
    }

    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return (
        <MyContext.Provider value={value}>
            {children}
        </MyContext.Provider>
    )
}

//{ admin: "AAA", gmail: "abc@gmail.com" }

const useMyContextController = () => {
    const context = useContext(MyContext)
    if (!context) {
        throw new Error("useMyContextController must inside in MyContextControllerProvider");
    }
    return context;
}

const USERS = firestore().collection('USERS');
const SERVICES = firestore().collection('SERVICES');

const login = (dispatch, email, password) => {
    auth().signInWithEmailAndPassword(email, password)
        .then(
            () => USERS.doc(email)
                .onSnapshot(u => {
                    const value = u.data();
                    console.log('Đăng nhập thành công với user: ', value);
                    dispatch({ type: "USER_LOGIN", value})
                })
        )
        .catch(e => Alert.alert("Sai user và password"))
}

const logout = (dispatch) => {
    dispatch({ type: "USER_LOGOUT", })
}

const createNewService = (newService) => {
    newService.finalUpdate = firestore.FieldValue.serverTimestamp();
    SERVICES.add(newService)
        .then(() => Alert.alert("Add new service !"))
        .catch((e) => Alert.alert(e))
}


const deleteService = (serviceId) => {
    SERVICES.doc(serviceId).delete()
        .then(() => Alert.alert("Delete service sucessfully"))
        .catch((e) => Alert.alert(e))
}

export { MyContextControllerProvider, useMyContextController, login, logout, createNewService, deleteService }


