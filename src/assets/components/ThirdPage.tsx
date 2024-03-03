import { HStack, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import ServiceContext, { ServiceDetail } from "../context/services";
import { services_list } from "../../constants";
import PeriodContext from "../context/period";

const ThirdPage = () => {
  const { services, setService } = useContext(ServiceContext);
  const { monthly } = useContext(PeriodContext);
  const [mouseOver, setMouseOver] = useState("");

  useEffect(() => {
    localStorage.setItem("selectedServices", JSON.stringify(services));
  }, [services]);

  const handleCheckboxChange = (item: ServiceDetail) => {
    const existingService = services.find(
      (service) => service.name === item.name
    );
    if (existingService) {
      setService(services.filter((service) => service.name !== item.name));
    } else {
      setService([
        ...services,
        {
          name: item.name,
          priceMonth: item.priceMonth,
          priceYear: item.priceYear,
        },
      ]);
    }
  };

  const normal_styles: React.CSSProperties = {
    boxShadow: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingTop: "10px",
    borderRadius: "10px",
  };
  const clicked_styles = {
    ...normal_styles,
    boxShadow: "hsl(243, 100%, 62%) 0px 1px 4px",
    backgroundColor: "hsl(217, 100%, 97%)",
  };
  const hover_styles = {
    ...normal_styles,
    boxShadow: " hsl(243, 100%, 62%) 0px 1px 4px",
  };

  return (
    <>
      <Heading color="hsl(213, 96%, 18%)" fontWeight="bold">
        Pick add-ons
      </Heading>
      <Text color="hsl(231, 11%, 63%)" fontSize="13px">
        Add-ons help enhance your gsming experience.
      </Text>
      <SimpleGrid columns={1} spacing={15}>
        {services_list.map((item) => (
          <HStack
            key={item.name}
            onMouseOver={() => setMouseOver(item.name)}
            onMouseLeave={() => setMouseOver("")}
            style={
              services.find((service) => service.name === item.name)
                ? clicked_styles
                : mouseOver === item.name
                ? hover_styles
                : normal_styles
            }
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={item.name}
                checked={services.some((service) => service.name === item.name)}
                onChange={() => handleCheckboxChange(item)}
              />
            </div>
            <div>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  lineHeight: "20px",
                }}
              >
                {item.name}
                <br />
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "normal",
                    color: "hsl(231, 11%, 63%)",
                  }}
                >
                  {item.description}
                </span>
              </Text>
            </div>
            <Spacer />
            <Text
              style={{
                fontSize: "14px",
                color: "hsl(243, 100%, 62%)",
                fontWeight: "bold",
              }}
            >
              {monthly ? item.priceMonth : item.priceYear}
            </Text>
          </HStack>
        ))}
      </SimpleGrid>
    </>
  );
};

export default ThirdPage;
