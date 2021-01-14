import React, { useState } from 'react'
import { View, TextInput, Button, Image } from 'react-native'

import firebase, { storage } from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props) {
    const [caption, setCaption] = useState(null);
    console.log(props.route.params.image);

    const UploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase.storage().ref().child(childPath).put(blob)

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                console.log(snapshot)
                savePostData(snapshot);
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);

    }

    const savePostData = (DownloadURL) => {
        firebase.firestore().collection('posts').doc(firebase.auth().currentUser.uid).collection("userPosts").add({
            DownloadURL,
            caption,
            creation: firebase.firestore.FieldValue.serverTimestamp()
        }).then(( function() {
            props.navigation.popToTop()
        }))
    }

    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.Image}}/>
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button title="Save" onPress={() => UploadImage()} />
        </View>
    )
}
