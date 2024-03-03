import { GridItem, Grid, Box } from "@chakra-ui/react";
import NavBar from "./assets/components/NavBar";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import React, { useState } from "react";
import PlanContext from "./assets/context/task";
import ServiceContext from "./assets/context/services";
import PeriodContext from "./assets/context/period";
import ErrorContext from "./assets/context/error";

function App() {
  const ids = ["", 2, 3, 4];
  const [currentId, setCurrentId] = useState(ids[0]);
  const [nextId, setNextId] = useState(ids[1]);
  const [previousId, setPreviousId] = useState(ids[0]);

  const handleNextClick = () => {
    setPreviousId(currentId);
    setCurrentId(nextId);
    if (nextId == ids[ids.length - 1]) setNextId(ids[0]);
    else {
      const index = ids.indexOf(nextId);
      setNextId(ids[index + 1]);
    }
  };

  const handlePreviousClick = () => {
    setNextId(currentId);
    setCurrentId(previousId);
    if (previousId === ids[0]) return;

    const index = ids.indexOf(previousId);
    setPreviousId(ids[index - 1]);
  };

  const [planName, setPlanName] = useState({ name: "", price: "" });
  const [services, setService] = useState([
    { name: "", priceMonth: "", priceYear: "" },
  ]);
  const [isMonthly, setIsMonthly] = useState(true);
  const [isError, setIsError] = useState(false);

  const location = useLocation();

  const button_style: React.CSSProperties = {
    position: "absolute",
    bottom: "30px",
    right: "25px",
    fontSize: "15px",
    fontWeight: "bold",
  };

  return (
    <form
      style={{
        position: "absolute",
        marginLeft: "50%",
        marginTop: "10%",
        translate: "-50%",
        backgroundImage: `url("/public/1.jpeg")`,
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <Grid templateColumns="repeat(5, 150px)" height="450px">
        <PlanContext.Provider value={{ plan: planName, setPlan: setPlanName }}>
          <ServiceContext.Provider value={{ services, setService }}>
            <PeriodContext.Provider
              value={{ monthly: isMonthly, setMonthly: setIsMonthly }}
            >
              <GridItem
                colSpan={2}
                style={{
                  backgroundImage: `url("/public/bg-sidebar-desktop.svg")`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  paddingTop: "15px",
                }}
              >
                <NavBar id={currentId} />
              </GridItem>
              <GridItem colSpan={3} style={{ position: "relative" }}>
                <ErrorContext.Provider value={{ isError, setIsError }}>
                  <Outlet />
                  {location.pathname !== "/thanks" && (
                    <Box>
                      {location.pathname !== "/4" ? (
                        <NavLink to={`/${nextId}`}>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={button_style}
                            disabled={isError ? true : false}
                            onClick={handleNextClick}
                          >
                            Next Step
                          </button>
                        </NavLink>
                      ) : (
                        <NavLink to={"/thanks"}>
                          <button
                            style={button_style}
                            className="btn btn-primary"
                            type="submit"
                          >
                            Confirm
                          </button>
                        </NavLink>
                      )}

                      {location.pathname !== "/" ? (
                        <NavLink to={`/${previousId}`}>
                          <button
                            style={{
                              position: "absolute",
                              bottom: "30px",
                              left: "0px",
                              color: "#0D6EFD",
                              fontWeight: "bold",
                            }}
                            className="btn btn-light"
                            onClick={handlePreviousClick}
                          >
                            Go Back
                          </button>
                        </NavLink>
                      ) : null}
                    </Box>
                  )}
                </ErrorContext.Provider>
              </GridItem>
            </PeriodContext.Provider>
          </ServiceContext.Provider>
        </PlanContext.Provider>
      </Grid>
    </form>
  );
}

export default App;
