import { Alert, Image, View } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, HelperText, IconButton, Text, TextInput } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import ImagePicker from 'react-native-image-crop-picker'
import { useMyContextController } from '../store';
import DialogPopup from './dialogPopup';

const ServicesDetail = ({ route, navigation }) => {

  const [controller, dispatch] = useMyContextController();
  const { userLogin } = controller;
  const { idservice } = route.params.item
  const [pathImage, setPathImage] = useState(null)
  const [services, setService] = useState([]);
  const hasErrorServiceName = () => services.serviceName == "";

  const [visible, setVisible] = useState(false);

  const SERVICES = firestore().collection('SERVICES')

  useEffect(() => {
    SERVICES.doc(idservice).onSnapshot(response => {
      setService(response.data())
    })
  }, [])

  const uploadImage = () => {
    ImagePicker.openPicker({
      cropping: true,
      width: 300,
      height: 400,
      mediaType: 'photo'
    })
      .then(image => setPathImage(image.path))
      .catch(e => console.log(e.message))
  }

  useEffect(() => {
    if (userLogin == null)
      navigation.navigate("Login")
  }, [userLogin])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: (props) => <IconButton icon={'dots-vertical'} onPress={() => setVisible(true)} />
    })
  })

  const handleUpdateServices = async () => {
    if (!services.serviceName || !services.price || !pathImage) {
      console.log('Vui lòng nhập đầy đủ thông tin')
    }
    else {
      const refImage = storage().ref("/services/" + idservice + ".png")
      refImage.putFile(pathImage)
        .then(() => {
          refImage.getDownloadURL().then(link => {
            SERVICES.doc(idservice)
              .update({ ...services, image: link })
              .then(() => 
                console.log("Update Service"),
                navigation.navigate('Admin')
            )
              .catch(e => console.log(e.message))
          })
        })
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#ffffff' }}>
      <Button onPress={uploadImage}>
        Upload Image
      </Button>
      {
        services && services.image && services.image !== '' ? (
          <Image source={{ uri: services.image }}
            resizeMode='contain'
            style={{ height: 300, width: 400 }}
          />
        ):
        (
          <></>
        )
      }
      <TextInput label={"Service Name"} value={services && services.serviceName} onChangeText={(text) => setService({ ...services, serviceName: text })}
        style={{ margin: 10 }}
      />
      <HelperText type='error' visible={services && hasErrorServiceName()}>
        Service Name is empty
      </HelperText>
      <TextInput label={"Price"} value={services && services.price} onChangeText={(text) => setService({ ...services, price: text })}
        style={{ margin: 10 }}
      />
      <Button mode='contained-tonal' onPress={handleUpdateServices} buttonColor='#f5456e'
        style={{
          margin: 10,
          padding: 5
        }}
        labelStyle={{
          fontSize: 20
        }}
      >
        Update
      </Button>
      <DialogPopup visible={visible} hideDialog={() => setVisible(false)} navigation={navigation} idservice={idservice} />
    </View>
  );
};

export default ServicesDetail;