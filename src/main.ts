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

  const img    : HTMLImageElement = element.querySelector<HTMLImageElement>(".art")!
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

  const url : String = image.url.replaceAll("1920x1080", "UHD")

  element.style.backgroundImage = `url('https://bing.com${url}}')`

  copyright.href        = image.copyrightlink

  const title = copyright.querySelector<HTMLElement>("strong")!
  const copy  = copyright.querySelector<HTMLElement>("small")!
  title.textContent = image.title
  copy.textContent  = image.copyright

  copyright.onmouseenter = () => document.body.classList.add("clean")
  copyright.onmouseleave = () => document.body.classList.remove("clean")

  return true
}

function animateElement(element: HTMLElement, delay: number, duration : number) {
  return setTimeout(() => {
    element.classList.toggle("active")
    return setTimeout(() => element.classList.toggle("active"), duration)
  }, delay)
}

function animate(random: boolean) {
  const avatar : HTMLElement        = document.querySelector<HTMLElement>(".avatar")!
  const list   : Array<HTMLElement> = Array.from(document.querySelectorAll<HTMLElement>(".social .icon"))

  const hover: boolean = !!list.find(el => el.matches(":hover"))

  if (!hover) {
    let time = 0,
        next = 0

    for (let item of list) {
      if (random) {
        next = Math.random() * 1000
      } else {
        next = time += 100
      }

      animateElement(item, next, 200)
    }

    animateElement(avatar, time + 150, 500)
  }

  return setTimeout(() => animate(!hover), hover ? 0 : Math.random() * 20000)
}

checkListening()
checkBackground()

setTimeout(animate, 1500)