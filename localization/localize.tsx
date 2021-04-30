import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import {I18nManager} from 'react-native'

export const translationGetters = {
    'en': () => require('./en.json'),
    'de': () => require('./de.json'),
};

export const initI18n = async () => {
    let language = await AsyncStorage.getItem('language')

    if(language === null) {
        await AsyncStorage.setItem('language', "en");
        language = "en"
    }

    console.log(language)
    // update layout direction
    I18nManager.forceRTL(Localization.isRTL);
    // set i18n-js config
    i18n.translations = {
        [language]: translationGetters[language](),
    };
    i18n.locale = language;
};

export const updateLanguage = async (lang: string) => {
    await AsyncStorage.setItem('language', lang);
    await initI18n()
};
