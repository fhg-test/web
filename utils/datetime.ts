import tz from './tz';

const getDateTimeString = (date: string | Date) => {
  if (!date) {
    return '';
  }

  try {
    const dateObj = new Date(date);
    dateObj.setMinutes(dateObj.getMinutes() - dateObj.getTimezoneOffset());

    return /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}/.exec(new Date(dateObj).toISOString())[0];
  } catch (e) {
    return '';
  }
};

const getTz = () => {
  const offset = - new Date().getTimezoneOffset();

  return /^\((.*)\)/.exec(tz.find(i => i.offset === offset).text)[1];
};

export default { getDateTimeString, getTz };
export { getDateTimeString, getTz };
