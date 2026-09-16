import { applyIcons } from "../lib/icons"
import { onLoad } from "../lib/on-load"

const css = `
  #contact {
    transition: all 300ms;
    z-index: 2;
    opacity: 1;
    margin: 4em auto 1em;
    max-width: 34em;
    padding: 0 1.2em;
    text-align: center;
  }

  .avatar {
    border-radius: 5em;
    margin: 1em auto;
    width: 15em;
  }

  .avatar img {
    cursor: pointer;
    margin: auto;
    transition: all 300ms;
    width: 100%;
    border-radius: 50%;
    border: .2em solid white;
  }

  .avatar img:hover, .avatar.active img {
    box-shadow: 0 0 1em white;
  }

  .social {
    text-align: center;
    display: flex;
    width: 100%;
  }

  a.icon {
    padding: .6em 2em;
    transition: all 300ms;
    flex-grow: 1;
    place-content: center;
    display: flex;
    border-radius: 5%;
  }

  a.bsky:hover, a.bsky.active {
    background: #0a7aff;
    box-shadow: 0 0 1em #0a7aff;
  }

  a.github:hover, a.github.active{
    background: black;
    box-shadow: 0 0 1em black;
  }

  a.google-plus:hover, a.google-plus.active {
    background: #db4b39;
    box-shadow: 0 0 1em #db4b39;
  }

  a.linkedin:hover, a.linkedin.active {
    background: #0077B5;
    box-shadow: 0 0 1em #0077B5;
  }

  a.mail:hover, a.mail.active {
    background: #00d492;
    box-shadow: 0 0 1em #00d492;
  }

  a.x:hover, a.x.active {
    background: black;
    box-shadow: 0 0 1em black;
  }

  a.calendar:hover, a.calendar.active {
    background: #4285F4;
    box-shadow: 0 0 1em #4285F4;
  }

  a.calendar:hover svg, a.calendar.active svg {
    fill: white;
  }

  a.icon svg {
    width: 1.6em;
  }

  .icon svg {
    fill: white;
  }

  @media screen and (max-width: 480px) {
    .social {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
  }
`

export default function SiteContact() {
  return (
    <>
      <section id="contact">
        <div class="avatar">
          <img src="https://avatars3.githubusercontent.com/u/3426238" alt="Alejandro Berzosa — aberigle" />
        </div>
        <div class="social">
          <a href="https://bsky.app/profile/aberigle.com" target="_blank" aria-label="Bluesky" class="icon bsky"></a>
          <a href="https://github.com/aberigle" target="_blank" aria-label="GitHub" class="icon github"></a>
          <a href="https://linkedin.com/in/aberigle" target="_blank" aria-label="LinkedIn" class="icon linkedin"></a>
          <a href="https://x.com/aberigle" target="_blank" aria-label="X" class="icon x"></a>
          <a href="mailto:hola@uhurus.com" aria-label="Email" class="icon mail"></a>
          <a href="https://calendar.app.google/S7ywUCJRonwUAQi5A" target="_blank" aria-label="Reservar 30 min" class="icon calendar"></a>
        </div>
      </section>
      <style>{css}</style>
    </>
  )
}

function animateElement(element: HTMLElement, delay: number, duration: number) {
  return setTimeout(() => {
    element.classList.toggle("active")
    return setTimeout(() => element.classList.toggle("active"), duration)
  }, delay)
}

function animate(random: boolean) {
  const avatar = document.querySelector<HTMLElement>(".avatar")!
  const list   = Array.from(document.querySelectorAll<HTMLElement>(".social .icon"))

  const hover = !!list.find(el => el.matches(":hover"))

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

onLoad(() => {
  applyIcons()
  setTimeout(animate, 1500)
})
