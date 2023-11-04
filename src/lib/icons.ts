import { IconDefinition, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

interface SocialIcons {
  [key: string] : IconDefinition
}

const icons: SocialIcons = {
  "twitter"  : faTwitter,
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