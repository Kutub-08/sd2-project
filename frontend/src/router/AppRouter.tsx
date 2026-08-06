import { Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import DashboardLayout from '../components/layout/DashboardLayout'
import Home from '../pages/Home'
import ListingsPage from '../pages/ListingsPage'
import ListingDetailsPage from '../pages/ListingDetailsPage'
import AISearchPage from '../pages/AISearchPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import TenantDashboard from '../pages/tenant/TenantDashboard'
import FavoritesPage from '../pages/tenant/FavoritesPage'
import SentInquiriesPage from '../pages/tenant/SentInquiriesPage'
import LandlordDashboard from '../pages/landlord/LandlordDashboard'
import CreateListingPage from '../pages/landlord/CreateListingPage'
import EditListingPage from '../pages/landlord/EditListingPage'
import ReceivedInquiriesPage from '../pages/landlord/ReceivedInquiriesPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<ListingsPage />} />
        <Route path="/listings/:id" element={<ListingDetailsPage />} />
        <Route path="/ai-search" element={<AISearchPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/dashboard" element={<DashboardLayout><TenantDashboard /></DashboardLayout>} />
        <Route path="/dashboard/favorites" element={<DashboardLayout><FavoritesPage /></DashboardLayout>} />
        <Route path="/dashboard/inquiries" element={<DashboardLayout><SentInquiriesPage /></DashboardLayout>} />

        <Route path="/landlord/dashboard" element={<DashboardLayout><LandlordDashboard /></DashboardLayout>} />
        <Route path="/landlord/listings/new" element={<DashboardLayout><CreateListingPage /></DashboardLayout>} />
        <Route path="/landlord/listings/:id/edit" element={<DashboardLayout><EditListingPage /></DashboardLayout>} />
        <Route path="/landlord/inquiries" element={<DashboardLayout><ReceivedInquiriesPage /></DashboardLayout>} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
