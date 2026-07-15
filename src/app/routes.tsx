import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./components/pages/Home";
import { About } from "./components/pages/About";
import { Travel } from "./components/pages/Travel";
import { Climbing } from "./components/pages/Climbing";
import { Portfolio } from "./components/pages/Portfolio";
import { ProductCaseStudies } from "./components/pages/ProductCaseStudies";
import { ProcessImprovement } from "./components/pages/ProcessImprovement";
import { SoftwareProjects } from "./components/pages/SoftwareProjects";
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
      { path: "portfolio", Component: Portfolio },
      { path: "portfolio/product-case-studies", Component: ProductCaseStudies },
      { path: "portfolio/process-improvement", Component: ProcessImprovement },
      { path: "portfolio/software-projects", Component: SoftwareProjects },
      { path: "resume", Component: Resume },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
