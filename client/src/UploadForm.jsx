import React, { useState } from "react";

export default function UploadForm() {
  const [data, setData] = useState("");
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();
  
    const res = await fetch('https://har-archive-api.shape-games.workers.dev', { method: 'PUT', body: data });
 
    if(res.status === 200) {
      const data = await res.json();
      window.location = `/${data.key}`
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        HAR pasted from Chrome/Firefox etc:
        <textarea
          value={data}
          onChange={e => setData(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}