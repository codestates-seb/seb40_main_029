import { useState } from 'react';

const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const reset = () => {
    setValue(initialValue);
  };

  const bind = {
    value,
    onChange: e => {
      setValue(e.target.value);
    },
  };

  const init = content => setValue(content);

  return [value, bind, reset, init];
};

export default useInput;
