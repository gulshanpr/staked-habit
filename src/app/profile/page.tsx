'use client'
import React from 'react'
import GitHubRepoGraph from './graph';
import GitHubCommitHistoryGraph from './graph1'

function HomeProfile() {
  return (
    <div>
      <div className="mx-10 my-5 flex items-end justify-end">
        <nav className="flex items-end flex space-x-4">
          <a href="/home" className="text-black">
            Home
          </a>
          <a href="/leaderboard" className="text-black" >
            Leaderboard
          </a>
          <a href="/profile" className="text-black" >
            Profile
          </a>
        </nav>
      </div>

      <div>
        <GitHubRepoGraph/>
      </div>
      <div>
        <GitHubCommitHistoryGraph/>
      </div>
    </div>
  )
}

export default HomeProfile;