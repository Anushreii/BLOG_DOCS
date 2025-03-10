import  { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments'
import DashboardComp from '../components/DashboardComp'

export default function Dashboard() {
  const location = useLocation()
const [tab, setTab] = useState('')
useEffect(()=>{
  const urlParams = new URLSearchParams(location.search)
  const tabFromUrl = urlParams.get('tab')
 // console.log(tabFromUrl);
 if(tabFromUrl) {
  setTab(tabFromUrl);
 }
}, [location.search])

  return(
    <div className='min-h-screen flex flex-col md:flex-row '>
      <div className="md:w-56 w-full md:flex-shrink-0">
      {/* sidebar */}
      <DashSidebar></DashSidebar>
    </div>
          
    {/* profile */}
    {/* <div className='flex-1 p-4'> */}
    {tab === 'profile' && <DashProfile></DashProfile>}

    {/* posts */}
    {tab === 'posts' && <DashPosts></DashPosts>}

    {/* users */}

    {tab === 'users' && <DashUsers></DashUsers>}

    {/* dash-commetns */}
    {tab === 'comments' && <DashComments></DashComments>}

    {/* dash comp */}
    {tab === 'dash' && <DashboardComp></DashboardComp>}
     


    </div>
    
  );
}

