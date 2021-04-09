import React from 'react'
import { NetworkViewer } from 'network-viewer';
import useSWR from 'swr'
import './App.css'
import UploadForm from './UploadForm'

function App() {
  const key = document.location.pathname.substring(1)
  const { error, data} = useSWR(key ? `https://har-archive-api.shape-games.workers.dev/${key}` : null)



  if(!key) {
    return (
      <UploadForm />
    )
  }

  if(error) {
    return <h1>No HAR with id</h1>
  }

  return (
    <div className="App">
      <NetworkViewer
        data={data}
        options={{ showImportHAR: false }}
      />
    </div>
  )
}

export default App
