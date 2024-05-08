import BackToTopButton from './BackToTopButton';
import "../styles/footer.css"


const Footer = ({token, setToken}) => {
  return (
    <>
      <section className="footer" id="rampart-one-regular">
      <BackToTopButton />
      </section>
    </>
  );
};

export default Footer;