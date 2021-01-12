import React, { useState } from 'react'
import { View, TextInput, Button, Image } from 'react-native'

import firebase, { storage } from 'firebase'
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props) {
    const [caption, setCaption] = useState("");
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
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);

    }
    return (
        <View style={{flex: 1}}>
            <Image source={{uri: props.route.params.Image}}/>
            <TextInput
                Placeholder="Write a Caption . . ."
                OnChange={(caption) => setCaption(caption)}
                />
            <Button title="Save" onPress={() => UploadImage()} />
        </View>
    )
}
