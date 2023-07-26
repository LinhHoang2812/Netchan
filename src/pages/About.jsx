import { styled } from "styled-components";

const About = () => {
  return (
    <Wrapper>
      <h2>Welcome to Netchan!</h2>
      <p>
        Netchan is waifu of Netflix and is powered by JikanAPI. I hope you have
        fun using Netchan
      </p>
    </Wrapper>
  );
};
export default About;

const Wrapper = styled.div`
  margin-top: 20rem;
  text-align: center;
  h2 {
    font-size: 2.5rem;
    color: #e6e5e5;
  }
`;
