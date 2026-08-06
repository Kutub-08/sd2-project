export default function Footer() {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 text-xs text-gray-500">
        <span>&copy; {new Date().getFullYear()} To-Let. All rights reserved.</span>
        <span>Flat Rental Marketplace</span>
      </div>
    </footer>
  )
}
