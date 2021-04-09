

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
}

export async function handleRequest(request: Request): Promise<Response> {
  const method = request.method
  const url = new URL(request.url)
  const key = url.pathname.substring(1)
  

  let data;

  if(method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
        "Access-Control-Allow-Origin": "*"
      },
    })
  } else if (method === 'GET' && key !== "")  {
    data = await HAR_ARCHIVE.get(key)
  } else if (method === 'PUT') {
    const key = uuidv4();
    await HAR_ARCHIVE.put(key, request.body)
    data = JSON.stringify({ key })
  } else {
    data = `Thank you for all the fish`
  }

  const response = new Response(data);
  response.headers.set("Access-Control-Allow-Origin", "*")
  // response.headers.append("Vary", "Origin")
  return response;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}