import {
  Box,
  GridItem,
  HStack,
  Heading,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import PlanContext from "../context/task";
import { plans_list } from "../../constants";
import PeriodContext from "../context/period";
import ErrorContext from "../context/error";

interface Item {
  name: string;
  priceMonth: string;
  priceYear: string;
  picture: string;
}

const SecondPage = () => {
  const { plan, setPlan } = useContext(PlanContext);
  const { monthly, setMonthly } = useContext(PeriodContext);
  const { setIsError } = useContext(ErrorContext);
  useEffect(() => {
    localStorage.setItem("isMonthly", JSON.stringify(monthly));
  }, [monthly]);
  useEffect(() => {
    if (plan.name === "") setIsError(true);
    return () => setIsError(false);
  }, [plan]);
  const [mouseOver, setMouseOver] = useState("");

  const normal_styles: React.CSSProperties = {
    boxShadow: "rgba(0, 0, 0, 0.2) 0px 1px 4px",
    borderRadius: "10%",
    padding: "15px",
    position: "relative",
    height: "170px",
    cursor: "pointer",
  };
  const clicked_styles = {
    ...normal_styles,
    boxShadow: "hsl(243, 100%, 62%) 0px 1px 4px",
    backgroundColor: "hsl(217, 100%, 97%)",
  };
  const hover_styles = {
    ...normal_styles,
    boxShadow: "hsl(243, 100%, 62%) 0px 1px 4px",
  };

  const handleClick = (item: Item) => {
    monthly
      ? setPlan({ name: item.name, price: item.priceMonth })
      : setPlan({ name: item.name, price: item.priceYear });
  };

  return (
    <>
      <Heading color="hsl(213, 96%, 18%)" fontWeight="bold">
        Select your plan
      </Heading>
      <Text color="hsl(231, 11%, 63%)" fontSize="13px">
        You have the option of monthly or yearly billing.
      </Text>
      <SimpleGrid columns={3} spacing={15} marginTop="30px">
        {plans_list.map((item) => (
          <GridItem key={item.name}>
            <Box
              style={
                item.name === plan.name
                  ? clicked_styles
                  : mouseOver === item.name
                  ? hover_styles
                  : normal_styles
              }
              onMouseOver={() => setMouseOver(item.name)}
              onMouseLeave={() => setMouseOver("")}
              onClick={() => handleClick(item)}
            >
              <img src={item.picture} />
              <Text
                style={{
                  position: "absolute",
                  bottom: "5px",
                  left: "15px",
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
                  {monthly ? item.priceMonth : item.priceYear}
                </span>
              </Text>
            </Box>
          </GridItem>
        ))}
      </SimpleGrid>

      <HStack
        align="normal"
        backgroundColor="hsl(217, 100%, 97%)"
        marginTop="30px"
        borderRadius="10px"
        paddingTop="15px"
        fontSize="14px"
        fontWeight="bold"
      >
        <Spacer />
        <Text
          style={
            monthly
              ? { color: "hsl(213, 96%, 18%)" }
              : { color: "hsl(231, 11%, 63%)" }
          }
        >
          Montly
        </Text>
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            checked={!monthly}
            onChange={() => setMonthly(!monthly)}
          />
        </div>
        <Text
          style={
            !monthly
              ? { color: "hsl(213, 96%, 18%)" }
              : { color: "hsl(231, 11%, 63%)" }
          }
        >
          Yearly
        </Text>
        <Spacer />
      </HStack>
    </>
  );
};

export default SecondPage;
