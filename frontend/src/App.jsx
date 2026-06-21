import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './Layout';
import Home from './pages/Home';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Portfolio from './pages/Portfolio';
import About from './pages/About';
import AboutFounders from './pages/AboutFounders';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Internships from './pages/Internships';
import Unsubscribe from './pages/Unsubscribe';
import WhatWeThink from './pages/WhatWeThink';
import Apply from './pages/Apply';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import FAQ from './pages/FAQ';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminRoute from './components/admin/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* ── Public site (with Header/Footer layout) ── */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:serviceId" element={<ServiceDetail />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/about" element={<About />} />
          <Route path="/about-founders" element={<AboutFounders />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/apply/:type/:id" element={<Apply />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/what-we-think" element={<WhatWeThink />} />
          <Route path="/internships" element={<Internships />} />
          <Route path="/unsubscribe" element={<Unsubscribe />} />
        </Route>

        {/* ── Admin panel (isolated, no public layout) ── */}
        <Route path="/founders-room/login" element={<AdminLogin />} />
        <Route
          path="/founders-room/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
