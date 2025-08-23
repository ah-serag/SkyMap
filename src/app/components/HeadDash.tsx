 import React from 'react'



 const HeadDash = () => {
  return (
      <header className="w-full bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-yellow-500/10 backdrop-blur-sm border-b border-accent py-3 px-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col items-start md:flex-row md:items-center md:justify-between">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Dashboard
        </h1>
      </div>
    </header>
  )
}

export default HeadDash

