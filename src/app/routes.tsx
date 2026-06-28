import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { Home } from "./Home";
import { Archive } from "./Archive";
import { CardDetail } from "./CardDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "archive", Component: Archive },
      { path: "card/:id", Component: CardDetail },
    ],
  },
]);
