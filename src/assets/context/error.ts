import React from "react";

interface Error{
    isError: boolean;
    setIsError: React.Dispatch<React.SetStateAction<boolean>>;
};

const ErrorContext = React.createContext<Error>({} as Error);

export default ErrorContext;