import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  HomeLayout,
  Error,
  Home,
  Login,
  List,
  Search,
  SingleAnime,
} from "./pages";
import About from "./pages/About";
import { loader as homeLoader } from "./pages/Home";
import { loader as singleAnimeLoader } from "./pages/SingleAnime";
import { loader as searchLoader } from "./pages/Search";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <Error />,
      children: [
        {
          index: true,
          element: <Home />,
          loader: homeLoader(queryClient),
        },
        {
          path: "anime/:id",
          element: <SingleAnime />,
          loader: singleAnimeLoader(queryClient),
        },
        {
          path: "search",
          element: <Search />,
          loader: searchLoader(queryClient),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "list",
          element: <List />,
        },
        {
          path: "about",
          element: <About />,
        },
      ],
    },
  ],
  {
    basename: "/Netchan",
  }
);
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider
        router={router}
        fallbackElement={<h4>Loading....</h4>}
      ></RouterProvider>
    </QueryClientProvider>
  );
};
export default App;
