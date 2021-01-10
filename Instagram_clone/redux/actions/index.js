import { useState } from 'react'
import { USER_STATE_CHANGE } from '../constants/index'
import * as firebase from 'firebase'

export function fetchUser(){

    return((dispatch) => {
        firebase.firestore().collection("users").doc("75cpW2kxNHUzVuFr4h19XjddBUY2").get()
        .then((snapshot) => {
            if(snapshot.exists){
                console.log("dummy data: " + snapshot.data())

                // actual Required Code    
                firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get()
                .then((result)=>{
                    if(result.exists){
                        console.log(result.data())
                        dispatch({type: USER_STATE_CHANGE, currentUser: result.data()})
                    }
                    else{
                        console.log("No User Found");
                    }    
                })

            }
            else{
                console.log('does not exist')
            }
        })
    })
        
}