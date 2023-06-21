import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';

import {RootState} from '../state/Root';

const useLoading: (
  initialState?: boolean,
) => [boolean, React.Dispatch<React.SetStateAction<boolean>>] = (
  initialState = false,
) => {
  const [loading, setLoading] = useState(initialState);

  const error = useSelector((state: RootState) => state.popup.error);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return [loading, setLoading];
};

export default useLoading;
