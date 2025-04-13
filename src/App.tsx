import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Population from '@/pages/Population/view'
import './App.css'

function App() {
  return (
    <div className="flex min-h-screen bg-gray-100 w-full">
      <Sidebar />
      <div className="lg:ml-64 flex-1 flex flex-col">
        <Navbar />
        <main className="p-6 pb-18">
          <Population />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
