import { useRouteError, Link } from "react-router-dom";
import img from "../assets/not-found.svg";
import styled from "styled-components";
const Error = () => {
  const error = useRouteError();
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} />
          <h3>Oops</h3>
          <p>We can't seem to find page you are looking for</p>
          <Link to="/">Back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h3>something went wrong....</h3>
      </div>
    </Wrapper>
  );
};
export default Error;

const Wrapper = styled.div`
  min-height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c1bfbfe2;
  img {
    width: 90vw;
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
    margin-top: -3rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }

  p {
    line-height: 1.5;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    color: white;
  }
  a {
    color: red;
    text-transform: capitalize;
  }
`;
