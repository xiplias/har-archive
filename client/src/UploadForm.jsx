import React, { useState } from "react";

export default function UploadForm() {
  const [data, setData] = useState("");
  
  const uploadData = async (evt) => {
    evt.preventDefault();
  
    const res = await fetch('https://har-archive-api.shape-games.workers.dev', { method: 'PUT', body: data });
 
    if(res.status === 200) {
      const data = await res.json();
      window.location = `/${data.key}`
    }
  }
  
  const setFile = async e => {
    e.preventDefault()
    const reader = new FileReader()
    reader.onload = async (e) => { 
      const text = e.target.result
      console.log(text)
      setData(text)
    };
    reader.readAsText(e.target.files[0])  
  }
  
  return (
    <>
      <div className="top">
        <h1>HAR Persistant Archive</h1>
        <p>Upload your HAR archive and you will get a unique url that can be shared with your team</p>
      </div>
      <div className="parent">
  
        <div className="left">
          <form onSubmit={uploadData}>
            <h2>
              Upload HAR file or paste into textarea:
            </h2>
            <input type="file" onChange={(e) => setFile(e)} />
            <textarea
              value={data}
              onChange={e => setData(e.target.value)}
              style={{width: "98%", height: "500px"}}
            />
            <input type="submit" value="Submit" />  
          </form>
        </div>
        <div className="right">
          <div style={{padding: 20}}>
            Help with export HAR file from your source:
            <ul>
              <li>
                <a href="https://support.zendesk.com/hc/en-us/articles/204410413-Generating-a-HAR-file-for-troubleshooting" target="_blank" rel="noreferrer">Export HAR file from browsers</a>
              </li>
              <li>
                <a href="https://doc.octoperf.com/design/create-virtual-user/record-charles-har/" target="_blank" rel="noreferrer">Export HAR files from charles</a>
              </li>
              <li>
                <a href="https://proxyman.io/posts/2019-08-16-Share-HTTPS-requests-with-HAR-file%20copy" target="_blank" rel="noreferrer">Export HAR files from Proxyman</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}