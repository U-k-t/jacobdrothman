import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Travel } from "./components/pages/Travel";
import { Climbing } from "./components/pages/Climbing";
import { Work } from "./components/pages/Work";
import { Project } from "./components/pages/Project";
import { CaseStudy } from "./components/pages/CaseStudy";
import { Resume } from "./components/pages/Resume";
import { Contact } from "./components/pages/Contact";
import { NotFound } from "./components/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "about", Component: About },
      { path: "about/travel", Component: Travel },
      { path: "about/climbing", Component: Climbing },
      { path: "work", Component: Work },
      { path: "work/projects/:slug", Component: Project },
      { path: "work/:slug", Component: CaseStudy },
      // Old URLs from the previous structure
      { path: "portfolio", element: <Navigate to="/work" replace /> },
      { path: "portfolio/product-case-studies", element: <Navigate to="/work#selected-work" replace /> },
      { path: "portfolio/process-improvement", element: <Navigate to="/work/product-operations" replace /> },
      { path: "portfolio/software-projects", element: <Navigate to="/work#projects" replace /> },
      { path: "portfolio/*", element: <Navigate to="/work" replace /> },
      { path: "resume", Component: Resume },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
