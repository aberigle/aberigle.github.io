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
  const background = await getImage()
  const element : HTMLElement = document.querySelector<HTMLElement>("#background")!

  element.style.backgroundImage = `url(#{'https://bing.com' + image.url})`
  console.log(background)
}

checkListening()
checkBackground()