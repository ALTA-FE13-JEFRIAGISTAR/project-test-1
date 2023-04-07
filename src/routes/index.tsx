import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { FC } from "react";
import axios from "axios";

import Home from "@/pages/index";
import Detail from "@/pages/detail"
axios.defaults.baseURL = "https://api.todoist.com/rest/v2";

const Router: FC = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/detail/:id",
      element: <Detail />,
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;
