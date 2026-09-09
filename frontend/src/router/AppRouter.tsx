import { Routes, Route } from 'react-router-dom'
import AppLayout from '../components/layout/AppLayout'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import DashboardLayout from '../components/layout/DashboardLayout'
import Home from '../pages/Home'
import ListingsPage from '../pages/ListingsPage'
import ListingDetailsPage from '../pages/ListingDetailsPage'
import AISearchPage from '../pages/AISearchPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import VerifyEmailPage from '../pages/VerifyEmailPage'
import ProfilePage from '../pages/ProfilePage'
import NotFoundPage from '../pages/NotFoundPage'
import TenantDashboard from '../pages/tenant/TenantDashboard'
import FavoritesPage from '../pages/tenant/FavoritesPage'
import SentInquiriesPage from '../pages/tenant/SentInquiriesPage'
import LandlordDashboard from '../pages/landlord/LandlordDashboard'
import CreateListingPage from '../pages/landlord/CreateListingPage'
import EditListingPage from '../pages/landlord/EditListingPage'
import ReceivedInquiriesPage from '../pages/landlord/ReceivedInquiriesPage'
import AdminDashboard from '../pages/admin/AdminDashboard'

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
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/verify-email" element={<ProtectedRoute><VerifyEmailPage /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

        <Route
          path="/dashboard"
          element={<ProtectedRoute allowedRoles={['TENANT']}><DashboardLayout><TenantDashboard /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/dashboard/favorites"
          element={<ProtectedRoute allowedRoles={['TENANT']}><DashboardLayout><FavoritesPage /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/dashboard/inquiries"
          element={<ProtectedRoute allowedRoles={['TENANT']}><DashboardLayout><SentInquiriesPage /></DashboardLayout></ProtectedRoute>}
        />

        <Route
          path="/landlord/dashboard"
          element={<ProtectedRoute allowedRoles={['LANDLORD']}><DashboardLayout><LandlordDashboard /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/landlord/listings/new"
          element={<ProtectedRoute allowedRoles={['LANDLORD']}><DashboardLayout><CreateListingPage /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/landlord/listings/:id/edit"
          element={<ProtectedRoute allowedRoles={['LANDLORD']}><DashboardLayout><EditListingPage /></DashboardLayout></ProtectedRoute>}
        />
        <Route
          path="/landlord/inquiries"
          element={<ProtectedRoute allowedRoles={['LANDLORD']}><DashboardLayout><ReceivedInquiriesPage /></DashboardLayout></ProtectedRoute>}
        />

        <Route
          path="/admin"
          element={<ProtectedRoute allowedRoles={['ADMIN']}><DashboardLayout><AdminDashboard /></DashboardLayout></ProtectedRoute>}
        />

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}