import React from "react";

interface Plan {
    plan: {
        name: string,
        price: string,
    };
    setPlan: React.Dispatch<React.SetStateAction<{
        name: string;
        price: string;
    }>>;
}

const PlanContext = React.createContext<Plan>({} as Plan);
export default PlanContext;