import { IconProvider } from "@/lib/icons";
import "@/styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (
    <IconProvider>
      <Component {...pageProps} />
    </IconProvider>
  );
}
