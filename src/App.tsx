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
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="274" height="568" fill="none" viewBox="0 0 274 568"><rect width="274" height="568" fill="%23483EFF" rx="10"/><mask id="a" width="274" height="568" x="0" y="0" maskUnits="userSpaceOnUse" style="mask-type:alpha"><rect width="274" height="568" fill="%23fff" rx="10"/></mask><g mask="url(%23a)"><path fill="%236259FF" fill-rule="evenodd" d="M-34.692 543.101C3.247 632.538 168.767 685.017 211.96 612.52c43.194-72.497-66.099-85.653-104.735-160.569-38.635-74.916-68.657-121.674-124.482-104.607-55.824 17.068-55.375 106.32-17.436 195.757Z" clip-rule="evenodd"/><path fill="%23F9818E" fill-rule="evenodd" d="M233.095 601.153c60.679-28.278 92.839-143.526 41.875-171.528-50.965-28.003-57.397 47.579-108.059 75.987-50.662 28.408-82.14 50.207-69.044 88.241 13.096 38.034 74.549 35.578 135.228 7.3Z" clip-rule="evenodd"/><path stroke="%23fff" stroke-linecap="round" stroke-linejoin="bevel" stroke-width="5" d="m165.305 469.097 10.607-10.806M209.461 474.581l-12.506-10.503M187.56 488.991l-6.908 14.798"/><path fill="%23FFAF7E" d="M.305 546.891c37.003 0 67-29.997 67-67s-29.997-67-67-67-67 29.997-67 67 29.997 67 67 67Z"/></g></svg>')`,
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
