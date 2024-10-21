import {
  IconDefinition,
  faBluesky,
  faGithub,
  faLinkedin
} from '@fortawesome/free-brands-svg-icons'
import { faCoffee, faEnvelope } from '@fortawesome/free-solid-svg-icons'

interface SocialIcons {
  [key: string] : IconDefinition
}

const icons: SocialIcons = {
  "bsky"     : faBluesky,
  "github"   : faGithub,
  "linkedin" : faLinkedin,
  "mail"     : faEnvelope,
  "coffee"   : faCoffee
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