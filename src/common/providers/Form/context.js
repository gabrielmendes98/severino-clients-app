import { createContext } from 'react';

const FormContext = createContext();

FormContext.displayName = 'FormProvider';

const { Provider, Consumer } = FormContext;

export { Provider, Consumer, FormContext };
