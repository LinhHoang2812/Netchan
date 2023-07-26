import { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
const override = {
  display: "block",
  margin: "15rem auto",
  borderColor: "white",
};

const Spinner = () => {
  return (
    <ClipLoader
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};
export default Spinner;
