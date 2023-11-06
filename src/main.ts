import { getImage } from './lib/apis/image'
import { getNowPlaying } from './lib/apis/last-fm'
import { getSVGIcon } from './lib/icons'
import './styles/'

document.querySelectorAll<HTMLElement>(".icon")
.forEach(async (element: HTMLElement) => {
  const icon: string = Array
    .from(element.classList)
    .find((item: string) => item !== "icon")!
  return element.innerHTML = getSVGIcon(icon)
})

async function checkListening() {
  const track = await getNowPlaying("jayle23")
  const element : HTMLElement = document.querySelector<HTMLElement>("#lastfm")!

  if (!track) return element.classList.remove("show")

  const img    : HTMLImageElement      = element.querySelector<HTMLImageElement>(".art")!
  const artist : HTMLElement = element.querySelector<HTMLElement>(".artist")!
  const song   : HTMLElement = element.querySelector<HTMLElement>(".song")!

  img.src          = track.image[track.image.length -1]["#text"]
  song.innerText   = track.name
  artist.innerText = track.artist["#text"]

  return element.classList.add("show")
}

async function checkBackground() {
  const image = await getImage()
  const element   : HTMLElement       = document.querySelector<HTMLElement>("#background")!
  const copyright : HTMLAnchorElement = document.querySelector<HTMLAnchorElement>("#copyright")!

  element.style.backgroundImage = `url('https://bing.com${image.url}}')`
  copyright.href        = image.copyrightlink
  copyright.textContent = image.copyright

  copyright.onmouseenter = () => document.body.classList.add("clean")
  copyright.onmouseleave = () => document.body.classList.remove("clean")

  return true
}

checkListening()
checkBackground()