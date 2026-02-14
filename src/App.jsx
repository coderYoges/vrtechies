import { useEffect, useReducer, Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "react-error-boundary";

/**
 * LAZY LOADED COMPONENTS
 */

const HmomePage = lazy(() => import("./pages/homePage"));
const AboutUs = lazy(() => import("./components/AboutUs"));
const Services = lazy(() => import("./components/Services"));
const ProjectTiles = lazy(() => import("./components/Projects"));
const Footer = lazy(() => import("./components/Footer"));
const LoadingScreen = lazy(() => import("./pages/loadingScreen"));
const NavbarCmpt = lazy(() => import("./pages/navbar"));
const Divider = lazy(() => import("./components/Divider"));
const BackToTop = lazy(() => import("./hooks/BackToTop"));
const ContactNow = lazy(() => import("./hooks/ContactNow"));
const ErrorFallback = lazy(() => import("./pages/errorScreen"));

const initialState = { isLoading: true, isRevealing: false };

function reducer(state, action) {
  switch (action.type) {
    case "REVEAL":
      return { ...state, isRevealing: true };
    case "COMPLETE":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

// --- Main App ---
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const rT = setTimeout(() => dispatch({ type: "REVEAL" }), 1000);
    const cT = setTimeout(() => dispatch({ type: "COMPLETE" }), 1500);
    return () => {
      clearTimeout(rT);
      clearTimeout(cT);
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense fallback={<LoadingScreen isRevealing={state.isRevealing} />}>
        {state.isLoading ? (
          <LoadingScreen isRevealing={state.isRevealing} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
          >
            <NavbarCmpt />
            <HmomePage />

            {/*
          
            <Divider />
            <Services />
            <Divider />
            <ProjectTiles />
            <Divider />
            <Footer />
            <BackToTop />
            <ContactNow /> */}
          </motion.div>
        )}
      </Suspense>
    </ErrorBoundary>
  );
}
