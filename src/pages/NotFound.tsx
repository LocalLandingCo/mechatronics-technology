<<<<<<< HEAD
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
=======
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useSEO({
    title: 'Page Not Found | Mechatronics Technology',
    description: 'The page you are looking for could not be found.',
    path: location.pathname,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center noise-bg dot-grid py-32">
        <div className="text-center px-4">
          <div className="font-rajdhani font-bold text-6xl md:text-8xl text-primary text-glow-cyan mb-4">404</div>
          <p className="font-rajdhani font-semibold text-xl md:text-2xl text-foreground mb-2">Page Not Found</p>
          <p className="font-barlow text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or may have moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-rajdhani font-semibold px-6 py-3 rounded bg-primary text-primary-foreground hover:brightness-110 transition-all cyan-glow"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
>>>>>>> claude/mechatronics-tech-website-3a370a
