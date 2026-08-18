import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Index from "./pages/Index";
import Category from "./pages/Category";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Disclaimer from "./pages/Disclaimer";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminEditor from "./pages/AdminEditor";
import ScheduledPosts from "./pages/ScheduledPosts";
import Apps from "./pages/Apps";
import Blog from "./pages/Blog";
import Airdrops from "./pages/Airdrops";
import Proof from "./pages/Proof";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/editor" element={<AdminEditor />} />
                <Route path="/admin/editor/:id" element={<AdminEditor />} />
                <Route path="/admin/scheduled" element={<ScheduledPosts />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/websites" element={<Blog />} />
                <Route path="/airdrops" element={<Airdrops />} />
                <Route path="/proof" element={<Proof />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
