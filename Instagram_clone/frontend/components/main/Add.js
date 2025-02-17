import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export default function Add({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {

      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const gallaryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(gallaryStatus.status === 'granted');
        
    })();
  }, []);

  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null);
        setImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  if (hasCameraPermission === null || hasGalleryPermission === null) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
        <View style={{ flex: 1}}>
            <View style={ styles.CameraContainer }>
                <Camera 
                    ref ={ref => setCamera(ref)}
                    style={ styles.fixedRatio }
                    type={type}
                    ratio= {'1:1'} />
            </View>
            <Button
                title="flip Image"
                onPress={() => {
                setType(
                    type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
                }}>
            </Button>
            <Button title="Take Picture" onPress={() => takePicture()} />
            <Button title="Image upload From gallery" onPress={() => pickImage()} />
            <Button title="Save" onPress={ () => navigation.navigate('Save', { image })} />
            {image && <Image source={{uri: image}} style={{flex: 1}} />}    
        </View>
    );
}

const styles = StyleSheet.create({
    CameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio: {
        flex: 1,
        aspectRatio: 1
    }
})