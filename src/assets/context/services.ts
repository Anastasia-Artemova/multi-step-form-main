import React from "react";

export interface ServiceDetail{
    name: string;
    priceMonth: string;
    priceYear: string;
}

interface Service {
    services: ServiceDetail[];
    setService: React.Dispatch<React.SetStateAction<{
        name: string;
        priceMonth: string;
        priceYear: string;
    }[]>>;
}

const ServiceContext = React.createContext<Service>({} as Service);
export default ServiceContext;