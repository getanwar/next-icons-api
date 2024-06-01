import {
  createContext,
  useCallback,
  useContext,
  useState,
  useRef,
} from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import debounce from "lodash/debounce";

const IconContext = createContext();

export const useIcons = () => {
  return useContext(IconContext);
};

export const IconProvider = ({ children }) => {
  const iconsRef = useRef([]);
  const [loading, setLoading] = useState(false);

  const fetchIcons = debounce((icons) => {
    setLoading(true);
    fetch("/api/icons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ icons }),
    })
      .then((res) => res.json())
      .then((data) => {
        library.add(...data.icons);
      })
      .finally(() => {
        setLoading(false);
        iconsRef.current = [];
      });
  }, 500);

  const getIcon = useCallback((icon) => {
    iconsRef.current.push(icon);
    fetchIcons(iconsRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IconContext.Provider value={{ getIcon, loading }}>
      {children}
    </IconContext.Provider>
  );
};
