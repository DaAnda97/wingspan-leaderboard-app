import React, {FC, useState} from 'react';
import {Portal, Dialog, Button, Paragraph} from 'react-native-paper';
import {ScrollView} from "react-native";
import i18n from 'i18n-js';

interface Props {
    error: Error
    resetError: () => void
}

const ErrorFatal: FC<Props> = props => {
    const [error, setError] = useState<Error>(props.error)

    const onDismiss = () => {
        props.resetError()
        //send Error somewhere JSON.stringify(error, Object.getOwnPropertyNames(error))
    }

    return (
        <Portal>
            <Dialog visible={true} onDismiss={() => onDismiss()}>
                <Dialog.Title>{i18n.translate('fatal_error')}</Dialog.Title>
                <Dialog.Content>
                    <ScrollView>
                        <Paragraph>{error.message}</Paragraph>
                    </ScrollView>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={() => onDismiss()}>{i18n.translate('v')}</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}


export default ErrorFatal;