export const secondsToHms = (d) => {
  d = Number(d);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h > 0 ? (h < 10 ? '0' : '') + h + ':' : '';
  const mDisplay = m > 0 ? (m < 10 ? '0' : '') + m + ':' : '';
  const sDisplay = s > 0 ? (s < 10 ? '0' : '') + s : '00';

  return hDisplay + mDisplay + sDisplay;
};

export const dateFormat = (time) => {
  const date = new Date(Number(time));
  return ` ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

export const stringToHmsFormat = (str) => {
  let modifedStr = '';

  switch (str.length) {
    case 1:
      modifedStr = '00:0' + str;
      break;
    case 2:
      modifedStr = '00:' + str;
      break;
    case 3:
      modifedStr = `0${str.charAt(0)}:${str.substring(1)}`;
      break;
    case 4:
      modifedStr = `${str.substring(0, 2)}:${str.substring(2)}`;
      break;
    case 5:
      modifedStr = `0${str.charAt(0)}:${str.substring(1, 3)}:${str.substring(3)}`;
      break;
    case 6:   
      modifedStr = `${str.substring(0, 2)}:${str.substring(2, 4)}:${str.substring(4, 6)}`;
      break;
    case 7:  
      modifedStr = `${str.substring(1, 3)}:${str.substring(3, 5)}:${str.substring(5, 7)}`;      
      break;
    default:
      modifedStr = str;
      break;
  }  
  
  return modifedStr;
};

