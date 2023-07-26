import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Login from "./Login";

const HomeLayout = () => {
  // const navigation = useNavigation();
  // const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Navbar />
      <section className="page">
        <Outlet />
      </section>
      <Footer />
    </>
  );
};
export default HomeLayout;
