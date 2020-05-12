import { isEmpty } from 'lodash';

const getLang = () => {
  const priorLanguage = !isEmpty(navigator.languages) ? navigator.languages[0] : navigator.language;
  const dashIndex = priorLanguage.indexOf('-');
  return dashIndex >= 0 ? priorLanguage.substring(0, dashIndex) : priorLanguage;
};

export {
  getLang,
};
