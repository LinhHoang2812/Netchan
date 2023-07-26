import { styled } from "styled-components";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <Wrapper>
      <div className="social-media">
        <FaFacebookF className="icon" />
        <FaInstagram className="icon" />
        <FaTwitter className="icon" />
        <FaYoutube className="icon" />
      </div>
      <div className="footer-info">
        <div className="info">
          <p>Audio description</p>
          <p>Investor relations</p>
          <p>Legal note</p>
        </div>
        <div className="info">
          <p>Assistant center</p>
          <p>Work with us</p>
          <p>Cookies preference</p>
        </div>
        <div className="info">
          <p>Gift cards</p>
          <p>Use condition</p>
          <p>Information</p>
        </div>
        <div className="info">
          <p>Media center</p>
          <p>Privacy</p>
          <p>Contact us</p>
        </div>
      </div>
      <div className="copyright">
        <small>© {year} by Linh Hoang</small>
      </div>
    </Wrapper>
  );
};
export default Footer;

const Wrapper = styled.footer`
  margin: 1rem 2rem;
  padding: 0 2rem;
  .social-media {
    display: flex;
    gap: 2rem;

    margin-bottom: 2rem;
  }
  .icon {
    font-size: 1.5rem;
    cursor: pointer;
  }

  .copyright {
    /* padding: 0 2rem; */
    font-size: 0.8rem;
  }
  .footer-info {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    /* padding: 0 2rem; */
    font-size: 0.75rem;
    color: #dcd9d9;
    margin-bottom: 2rem;
  }
  p {
    cursor: pointer;
  }
  p:hover {
    text-decoration: underline;
  }
  @media (max-width: 800px) {
    margin: 1rem 1rem;
    padding: 0 0.5rem;
    .footer-info {
      grid-template-columns: 1fr 1fr;
    }
  }
`;
