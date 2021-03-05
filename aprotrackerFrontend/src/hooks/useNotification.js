import { useEffect, useState } from 'react';


const useNotification = () => {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    let timeoutID = setTimeout(() => {
      setNotification('');
    }, 5000);

    return () => clearTimeout(timeoutID);
  }, [notification]);

  return [notification, setNotification];
};

export default useNotification;