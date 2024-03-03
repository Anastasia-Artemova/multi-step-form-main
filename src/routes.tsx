import { createBrowserRouter } from "react-router-dom";
import FirstPage from "./assets/components/FirstPage";
import SecondPage from "./assets/components/SecondPage";
import ThirdPage from "./assets/components/ThirdPage";
import FourthPage from "./assets/components/FourthPage";
import App from "./App";
import ThankYouPage from "./assets/components/ThankYouPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <FirstPage /> },
      { path: "/2", element: <SecondPage /> },
      { path: "/3", element: <ThirdPage /> },
      { path: "/4", element: <FourthPage /> },
      { path: "/thanks", element: <ThankYouPage /> },
    ],
  },
]);

export default router;
