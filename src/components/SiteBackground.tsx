import { getImage } from "../lib/apis/image"
import { onLoad } from "../lib/on-load"

const css = `
  #overlay {
    background-color: rgba(0, 0, 0, .4);
    z-index: 0;
    transition: all 300ms;
    position: absolute;
    width: 100%;
    height: 100%;
  }

  #background {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`

export default function SiteBackground() {
  return (
    <>
      <div id="overlay"></div>
      <div id="background"></div>
      <style>{css}</style>
    </>
  )
}

onLoad(async () => {
  const image = await getImage()

  const element   = document.querySelector<HTMLElement>("#background")!
  const copyright = document.querySelector<HTMLAnchorElement>("#copyright")!

  const url = image.url.replaceAll("1920x1080", "UHD")

  element.style.backgroundImage = `url('https://bing.com${url}')`

  copyright.href = image.copyrightlink

  const title = copyright.querySelector<HTMLElement>("strong")!
  const copy  = copyright.querySelector<HTMLElement>("small")!
  title.textContent = image.title
  copy.textContent  = image.copyright

  copyright.onmouseenter = () => document.body.classList.add("clean")
  copyright.onmouseleave = () => document.body.classList.remove("clean")
})
