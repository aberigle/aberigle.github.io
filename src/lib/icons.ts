import {
  IconDefinition,
  faBluesky,
  faGithub,
  faLinkedin,
  faXTwitter
} from '@fortawesome/free-brands-svg-icons'
import { faCalendarAlt, faCoffee, faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface SocialIcons {
  [key: string] : IconDefinition
}

const icons: SocialIcons = {
  "bsky"     : faBluesky,
  "github"   : faGithub,
  "linkedin" : faLinkedin,
  "x"        : faXTwitter,
  "mail"     : faEnvelope,
  "coffee"   : faCoffee,
  "calendar" : faCalendarAlt
}

export function getSVGIcon(icon: string) : string {
  if (!icon || !icons.hasOwnProperty(icon)) return ""

  const [width, height, , , path] = icons[icon].icon

  return `
    <svg viewBox="0 0 ${width} ${height}">
      <path d="${path}" />
    </svg>
    `
}

// Rellena los <span class="icon x"> con su SVG. Idempotente: si ya tiene
// svg (otro componente ya lo rellenó) no lo pisa.
export function applyIcons(root: ParentNode = document) : void {
  root.querySelectorAll<HTMLElement>(".icon").forEach((element: HTMLElement) => {
    if (element.querySelector("svg")) return
    const icon = Array.from(element.classList).find((item: string) => item !== "icon")
    if (icon) element.innerHTML = getSVGIcon(icon)
  })
}