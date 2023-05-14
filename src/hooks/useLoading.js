import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const useLoading = () => {
  const [loading, setLoading] = useState(false);

  const error = useSelector((state) => state.error.error);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  return [loading, setLoading];
};

export default useLoading;
