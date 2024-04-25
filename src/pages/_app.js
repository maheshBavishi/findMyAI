import Wrapper from "@/shared/components/wrapper";
import "../styles/globals.css";
import '../styles/mixins/index.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
        <Component {...pageProps} />
    </Wrapper>
   
  )
    
}
