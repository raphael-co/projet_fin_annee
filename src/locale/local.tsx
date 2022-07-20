import en from './en.json';
import fr from './fr.json';
const data: any = {
  fr,
  en
};
export const translate = (keyWord = 'NOT_DEFINE', language: any) => {
  const setAppLang = () => {
    let trad = language;
    // Set par défaut une Langue si la langue du téléphone n'est pas traduite dans un JSON
    if (!data.hasOwnProperty(trad)) {
      trad = 'en';
    }
    return trad;
  };
  const lang = setAppLang();
  return data[lang].hasOwnProperty(keyWord)
    ? data[lang][keyWord]
    : data[lang]['NOT_DEFINE'];
};
