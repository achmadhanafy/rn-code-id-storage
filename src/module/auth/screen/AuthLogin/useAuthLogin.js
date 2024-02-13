import {setAuth} from '@code-module-auth/redux/action';
import {useCallback, useState} from 'react';
import {useDispatch} from 'rn-codeid-storage';

function useAuthLogin() {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onFormChange = useCallback((key, value) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const onSubmit = useCallback(
    email => {
      dispatch(
        setAuth({
          token: '123',
          email,
        }),
      );
    },
    [dispatch],
  );

  return {form, onFormChange, onSubmit};
}

export default useAuthLogin;
