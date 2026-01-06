import React, { useState } from 'react'
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import PostDetails from "./pages/PostDetails";
import Users from "./pages/Users";
import Categories from "./pages/Categories";
import Home from './pages/Home'
import Comments from "./pages/Comments";
import {Routes, Route} from "react-router-dom"



function App() {

  const [sideBarCollapsed, setSideBarCollapsed] = useState(false);  //This line controls sidebar open/close
  const [currentPage, setCurrentPage] = useState("dashboard"); //This line tracks which page is shown


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50
  dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 transition-all duration-500">

      <div className='flex h-screen overflow-hidden'>
        <Sidebar
          collapsed={sideBarCollapsed}
          onToggle={() => setSideBarCollapsed(!sideBarCollapsed)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <div className="flex-1 flex flex-col overflow-hidden">
          <Header
            sideBarCollapsed={sideBarCollapsed}
            onToggleSideBar={() => setSideBarCollapsed(!sideBarCollapsed)}
          />

          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-6">
              
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts" element={<PostDetails />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/comments/:postId" element={<Comments />} />
              </Routes>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
