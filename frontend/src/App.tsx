import AppRouter from './router/AppRouter'
import ErrorBoundary from './components/layout/ErrorBoundary'
import Toast from './components/ui/Toast'

export default function App() {
  return (
    <ErrorBoundary>
      <AppRouter />
      <Toast />
    </ErrorBoundary>
  )
}
