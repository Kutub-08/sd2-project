import { describe, it, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AdminDashboard from '../src/pages/admin/AdminDashboard'
import ProtectedRoute from '../src/components/layout/ProtectedRoute'
import { renderWithProviders } from './testUtils'
import type { RootState } from '../src/app/store'

vi.mock('sonner', () => ({
  Toaster: () => null,
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
  },
}))

const adminState: Partial<RootState> = {
  auth: {
    user: {
      id: 'admin1',
      name: 'Admin User',
      email: 'admin@test.com',
      phone: '01800',
      role: 'ADMIN',
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    accessToken: 'test-access-token',
    isAuthenticated: true,
    role: 'ADMIN',
  },
}

function rowOf(name: string) {
  return screen.getByText(name).closest('tr') as HTMLTableRowElement
}

describe('AdminDashboard', () => {
  it('renders the users table', async () => {
    renderWithProviders(<AdminDashboard />, { preloadedState: adminState })

    expect(screen.getByText('Admin Console')).toBeInTheDocument()
    await screen.findByText('Rahim Khan')
    expect(screen.getByText('Karim Uddin')).toBeInTheDocument()
    expect(screen.getByText('Test Tenant')).toBeInTheDocument()
  })

  it('filters users by role', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AdminDashboard />, { preloadedState: adminState })

    await screen.findByText('Rahim Khan')

    await user.selectOptions(screen.getByLabelText('Filter users by role'), 'LANDLORD')

    await screen.findByText('Rahim Khan')
    expect(screen.getByText('Karim Uddin')).toBeInTheDocument()
    expect(screen.queryByText('Test Tenant')).not.toBeInTheDocument()
  })

  it('bans and unbans a user', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AdminDashboard />, { preloadedState: adminState })

    await screen.findByText('Rahim Khan')
    const row = rowOf('Rahim Khan')

    await user.click(within(row).getByRole('button', { name: 'Ban' }))
    await within(row).findByRole('button', { name: 'Unban' })

    await user.click(within(row).getByRole('button', { name: 'Unban' }))
    await within(row).findByRole('button', { name: 'Ban' })
  })

  it('changes a user role', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AdminDashboard />, { preloadedState: adminState })

    await screen.findByText('Karim Uddin')
    const row = rowOf('Karim Uddin')

    await user.selectOptions(screen.getByLabelText('Change role for Karim Uddin'), 'ADMIN')

    await screen.findByText('Admin Console')
    expect(within(row).getByLabelText('Change role for Karim Uddin')).toHaveValue('ADMIN')
  })

  it('shows listings and toggles status', async () => {
    const user = userEvent.setup()
    renderWithProviders(<AdminDashboard />, { preloadedState: adminState })

    await screen.findByText('Rahim Khan')

    await user.click(screen.getByRole('button', { name: 'Listings' }))
    await screen.findByText('Modern 2BR in Panchlaish')

    const row = rowOf('Modern 2BR in Panchlaish')
    await user.click(within(row).getByRole('button', { name: 'Take down' }))
    await within(row).findByRole('button', { name: 'Restore' })
  })

  it('blocks non-admin users from the admin page', () => {
    const tenantState: Partial<RootState> = {
      auth: {
        user: {
          id: 'tenant1',
          name: 'Test Tenant',
          email: 'tenant@test.com',
          phone: '01733333333',
          role: 'TENANT',
          isVerified: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        accessToken: 'test-access-token',
        isAuthenticated: true,
        role: 'TENANT',
      },
    }

    renderWithProviders(
      <ProtectedRoute allowedRoles={['ADMIN']}>
        <div>admin-only content</div>
      </ProtectedRoute>,
      { preloadedState: tenantState },
    )

    expect(screen.queryByText('admin-only content')).not.toBeInTheDocument()
  })
})