import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AdminProvider } from "@/hooks/useAdmin";
import { RouteHead } from "@/components/seo/RouteHead";
import { BusinessSchema } from "@/components/seo/BusinessSchema";
import { Analytics } from "@/components/analytics/Analytics";
import Index from "./pages/Index";
import MarketUpdates from "./pages/MarketUpdates";
import YouTubeHub from "./pages/YouTubeHub";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Insights from "./pages/Insights";
import SellerServices from "./pages/SellerServices";
import SellerGuide from "./pages/SellerGuide";
import HomeEvaluation from "./pages/HomeEvaluation";
import Areas from "./pages/Areas";
import Milton from "./pages/areas/Milton";
import MiltonNeighbourhood from "./pages/areas/milton/MiltonNeighbourhood";
import Mississauga from "./pages/areas/Mississauga";
import MississaugaNeighbourhood from "./pages/areas/mississauga/MississaugaNeighbourhood";
import Oakville from "./pages/areas/Oakville";
import Burlington from "./pages/areas/Burlington";
import Hamilton from "./pages/areas/Hamilton";
import Brampton from "./pages/areas/Brampton";
import About from "./pages/About";
import Testimonials from "./pages/Testimonials";
import Staging from "./pages/Staging";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import BuyerGuide from "./pages/BuyerGuide";
import BuyerTips from "./pages/BuyerTips";
import Portfolio from "./pages/Portfolio";
import PropertyDetail from "./pages/PropertyDetail";
import CostOfSellingMilton from "./pages/CostOfSellingMilton";
import CostOfSellingMississauga from "./pages/CostOfSellingMississauga";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPropertyForm from "./pages/AdminPropertyForm";
import AdminBlogList from "./pages/AdminBlogList";
import AdminBlogForm from "./pages/AdminBlogForm";
import AdminBlogDrafts from "./pages/AdminBlogDrafts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AdminProvider>
          <BrowserRouter>
            <RouteHead />
            <BusinessSchema />
            <Analytics />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/market-updates" element={<MarketUpdates />} />
              <Route path="/youtube" element={<YouTubeHub />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/seller-services" element={<SellerServices />} />
              <Route path="/seller-guide" element={<SellerGuide />} />
              <Route path="/home-evaluation" element={<HomeEvaluation />} />
              <Route path="/areas" element={<Areas />} />
              <Route path="/areas/milton" element={<Milton />} />
              <Route path="/areas/milton/:slug" element={<MiltonNeighbourhood />} />
              <Route path="/areas/mississauga" element={<Mississauga />} />
              <Route path="/areas/mississauga/:slug" element={<MississaugaNeighbourhood />} />
              <Route path="/areas/oakville" element={<Oakville />} />
              <Route path="/areas/burlington" element={<Burlington />} />
              <Route path="/areas/hamilton" element={<Hamilton />} />
              <Route path="/areas/brampton" element={<Brampton />} />
              <Route path="/about" element={<About />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/staging" element={<Staging />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/buyer-guide" element={<BuyerGuide />} />
              <Route path="/buyer-tips" element={<BuyerTips />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<PropertyDetail />} />
              <Route path="/cost-of-selling-a-house-in-milton" element={<CostOfSellingMilton />} />
              <Route path="/cost-of-selling-a-house-in-mississauga" element={<CostOfSellingMississauga />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/properties/new" element={<AdminPropertyForm />} />
              <Route path="/admin/properties/:id/edit" element={<AdminPropertyForm />} />
              <Route path="/admin/blog" element={<AdminBlogList />} />
              <Route path="/admin/blog/new" element={<AdminBlogForm />} />
              <Route path="/admin/blog/:id/edit" element={<AdminBlogForm />} />
              <Route path="/admin/blog-drafts" element={<AdminBlogDrafts />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
