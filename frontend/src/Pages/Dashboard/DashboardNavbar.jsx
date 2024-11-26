import React from 'react'

function DashboardNavbar({role}) {
  return (
    <div>
        <p className='font-semibold text-lg'> <span className="text-orange-500 capitalize ">{role}</span> Dashboard</p>
    </div>
  )
}

export default DashboardNavbar