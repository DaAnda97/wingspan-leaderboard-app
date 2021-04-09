import React, {FC, useState} from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';


type Props = {
    errorMsg: string
    setErrorMsg: (newErrorMsg : string) => void
};

const ErrorView = ({ errorMsg, setErrorMsg }: Props) => {

    const onDismiss = () => {
        //send Error somewhere
        setErrorMsg("")
    }

    return (
        <Portal>
            <Dialog visible={!!errorMsg} onDismiss={() => onDismiss()}>
                <Dialog.Title>Fehler</Dialog.Title>
                <Dialog.Content>
                    <Paragraph>{errorMsg}</Paragraph>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => onDismiss()}>OK</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}


export default ErrorView;