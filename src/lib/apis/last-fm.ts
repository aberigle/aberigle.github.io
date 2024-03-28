const url : string = "https://backsheet.dev/api/proxy/slaeiggb-g1ntgf64"
const example: string = '{"artist":{"mbid":"5a85c140-dcf9-4dd2-b2c8-aff0471549f3","#text":"Sam Smith"},"streamable":"0","image":[{"size":"small","#text":"https://lastfm.freetls.fastly.net/i/u/34s/649956aa44ebfbb5b6153edbd70b0da0.jpg"},{"size":"medium","#text":"https://lastfm.freetls.fastly.net/i/u/64s/649956aa44ebfbb5b6153edbd70b0da0.jpg"},{"size":"large","#text":"https://lastfm.freetls.fastly.net/i/u/174s/649956aa44ebfbb5b6153edbd70b0da0.jpg"},{"size":"extralarge","#text":"https://lastfm.freetls.fastly.net/i/u/300x300/649956aa44ebfbb5b6153edbd70b0da0.jpg"}],"mbid":"a2cded0a-6216-41f1-b9da-dc90738e5d46","album":{"mbid":"","#text":"Gloria"},"name":"How to Cry","@attr":{"nowplaying":"true"},"url":"https://www.last.fm/music/Sam+Smith/_/How+to+Cry"}'

export async function getNowPlaying(user: string) {
  if (!import.meta.env.PROD) return JSON.parse(example)

  const uri : URL = new URL(url)
  console.log(user)
  
  uri.searchParams.append("format", "json")
  uri.searchParams.append("method", "user.getrecenttracks")
  uri.searchParams.append("user", user)
  uri.searchParams.append("limit", "1")
  
  const response  = await fetch(uri)
  const body = await response.json()
  return body.recenttracks?.track?.find((track : any) => track["@attr"]?.nowplaying)
}
