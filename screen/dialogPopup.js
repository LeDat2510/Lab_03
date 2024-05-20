import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Dialog, Portal } from 'react-native-paper';
import { deleteService } from '../store';

const DialogPopup = ({ visible, hideDialog, navigation, idservice }) => {

    const [visibleDialog, setVisibleDialog] = useState(false);

    useEffect(() => {
        setVisibleDialog(visible);
    }, [visible]);

    const handleDeleteItem = () => {
        deleteService(idservice);
        navigation.navigate('Admin');
    }

    return (
        <Portal>
            <Dialog visible={visibleDialog} onDismiss={hideDialog} style={{backgroundColor: 'white'}}>
                <Dialog.Title>Warning</Dialog.Title>
                <Dialog.Content>
                    <Text>Are you sure you want to remove this service ? This operation can't be returned</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={handleDeleteItem} textColor='green'>DELETE</Button>
                    <Button onPress={hideDialog} textColor='green'>CANCEL</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}

export default DialogPopup