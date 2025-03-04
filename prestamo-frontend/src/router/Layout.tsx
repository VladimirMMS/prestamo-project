import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Loader from './Loader'
import Navbar from './Navigation'

export default function Layout() {
  return (
    <>

        <Navbar/>
        <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  )
}
