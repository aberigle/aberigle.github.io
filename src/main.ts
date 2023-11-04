import getImage from './lib/apis/image'
import { getSVGIcon } from './lib/icons'
import './style.css'

document.querySelectorAll<HTMLElement>(".icon")
.forEach(async (element: HTMLElement) => {
  const icon: string = Array
    .from(element.classList)
    .find((item: string) => item !== "icon")!
  return element.innerHTML = getSVGIcon(icon)
})

async function checkListening() {

}

async function checkBackground() {
  const image = await getImage()
  const element   : HTMLElement       = document.querySelector<HTMLElement>("#background")!
  const copyright : HTMLAnchorElement = document.querySelector<HTMLAnchorElement>("#copyright")!

  element.style.backgroundImage = `url('https://bing.com${image.url}}')`
  copyright.href = image.copyrightlink
  copyright.textContent = image.copyright
}

checkListening()
checkBackground()