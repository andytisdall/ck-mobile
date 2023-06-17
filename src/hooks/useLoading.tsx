import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '../state/Root';

const useLoading: () => [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>,
] = () => {
  const [loading, setLoading] = useState(false);

  const error = useSelector((state: RootState) => state.popup.error);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return [loading, setLoading];
};

export default useLoading;
