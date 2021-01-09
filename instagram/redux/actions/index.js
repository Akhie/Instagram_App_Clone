import { USER_STATE_CHANGE } from '../constants/index'
import * as firebase from 'firebase'


export function fetchUser(){
    return((dispatch) => {
        firebase.firestore()
            .collection("users")
            .doc("5Cadai14IjMLzmFGMl9iG8EPTuv1")
            .get()
            .then((snapshot) => {
                if(snapshot.exists){
                    console.log(snapshot.data())
                    dispatch({type: USER_STATE_CHANGE, currentUser: snapshot.data()})
                }
                else{
                    console.log('does not exist')
                }
            })
    })
}