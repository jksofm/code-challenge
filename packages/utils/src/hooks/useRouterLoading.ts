import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useRouterLoading = () => {
  const router = useRouter();

  const [isRouterLoading, setRouterLoading] = useState(false);

  useEffect(() => {
    const handleRouteChangeStart = () => setRouterLoading(true);
    const handleRouteChangeComplete = () => setRouterLoading(false);
    const handleRouteChangeError = () => setRouterLoading(false);
    if (router.events) {
      router.events.on("routeChangeStart", handleRouteChangeStart);
      router.events.on("routeChangeComplete", handleRouteChangeComplete);
      router.events.on("routeChangeError", handleRouteChangeError);

      // Cleanup listeners on unmount
    }
    return () => {
      router.events?.off("routeChangeStart", handleRouteChangeStart);
      router.events?.off("routeChangeComplete", handleRouteChangeComplete);
      router.events?.off("routeChangeError", handleRouteChangeError);
    };
  }, [router.events]);

  return { isRouterLoading };
};
