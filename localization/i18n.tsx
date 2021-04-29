import memoize from 'lodash.memoize';
import AsyncStorage from "@react-native-async-storage/async-storage";
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import { I18nManager } from 'react-native';

export const translationGetters = {
    'en': () => require('./en.json'),
    'de': () => require('./de.json'),
};

export const IMLocalized = memoize(
    (key, config) =>
        i18n.t(key, config).includes('missing') ? key : i18n.t(key, config),
    (key, config) => (config ? key + JSON.stringify(config) : key),
);

export const initI18n = async () => {
    let language = await AsyncStorage.getItem('language')

    if(language === null) {
        await changeLanguage("en")
        language = "en"
    }

    console.log(language)
    let isRTL = Localization.isRTL;

    IMLocalized.cache.clear();
    // update layout direction
    I18nManager.forceRTL(isRTL);
    // set i18n-js config
    i18n.translations = {
        [language]: translationGetters[language](),
    };
    i18n.locale = language;
};


export const changeLanguage = async lang => {
    await AsyncStorage.setItem('language', lang);
    await initI18n()
};
