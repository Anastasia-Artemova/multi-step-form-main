import React from "react";

interface Period{
    monthly: boolean;
    setMonthly: React.Dispatch<React.SetStateAction<boolean>>
}

const PeriodContext = React.createContext<Period>({} as Period);

export default PeriodContext;