import { Box, HStack, Heading, Spacer, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import PlanContext from "../context/task";
import ServiceContext from "../context/services";
import PeriodContext from "../context/period";

const FourthPage = () => {
  const { plan } = useContext(PlanContext);
  const { services } = useContext(ServiceContext);
  const { monthly } = useContext(PeriodContext);

  const number_string = "0123456789";
  const check = (el: string) => {
    return number_string.includes(el);
  };

  const countTotal = () => {
    let servicesTotal = 0;
    for (const service of services) {
      const price = monthly ? service.priceMonth : service.priceYear;
      const priceArray = Array.isArray(price) ? price : price.split("");
      let elem = priceArray.reduce((x, y) => (check(y) ? x + y : x), "");
      servicesTotal += Number(elem);
    }

    servicesTotal += Number(
      [...plan.price].reduce((x, y) => (check(y) ? x + y : x), "")
    );
    return servicesTotal;
  };
  return (
    <>
      <Heading color="hsl(213, 96%, 18%)" fontWeight="bold">
        Finishing up
      </Heading>
      <Text color="hsl(231, 11%, 63%)" fontSize="13px">
        Double-check everything looks OK before confirming.
      </Text>
      <Box>
        <HStack
          borderRadius={5}
          style={{
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            padding: "10px",
          }}
        >
          <Text
            style={{ fontSize: "16px", fontWeight: "bold", lineHeight: "20px" }}
          >
            {plan.name}
            <br />
            <NavLink to="/page/2" style={{ fontSize: "14px" }}>
              <u>Change</u>
            </NavLink>
          </Text>
          <Spacer />
          <Text style={{ fontSize: "14px", fontWeight: "bold" }}>
            {plan.price}
          </Text>
        </HStack>

        <Box
          borderRadius={5}
          style={{
            fontSize: "14px",
            lineHeight: "30px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
            padding: "10px",
          }}
        >
          {services.map((service) => (
            <Text key={service.name} style={{ color: "hsl(231, 11%, 63%)" }}>
              {service.name}
              <span style={{ color: "black", float: "right" }}>
                {monthly ? service.priceMonth : service.priceYear}
              </span>
            </Text>
          ))}
        </Box>
        <HStack marginTop="30px">
          <Text style={{ color: "hsl(231, 11%, 63%)", fontSize: "14px" }}>
            Total {monthly ? "per month" : "per year"}
          </Text>
          <Spacer />
          <Text
            style={{
              fontSize: "18px",
              color: "hsl(243, 100%, 62%)",
              fontWeight: "bold",
            }}
          >
            +${countTotal()}
            {monthly ? "/mo" : "/yr"}
          </Text>
        </HStack>
      </Box>
    </>
  );
};

export default FourthPage;
