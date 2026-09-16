import { getNowPlaying } from "../lib/apis/last-fm"
import { onLoad } from "../lib/on-load"
import equalizer from "../assets/equalizer.gif"

const css = `
  #lastfm.show {
    transition: all 300ms;

    display: flex;
    flex-direction: row;

    cursor: pointer;
    position: fixed;
    bottom: 5em;
    right: 2em;
    padding: .5em;
    background-color: #0c0f0e;
    box-shadow: 0 0 .3em #0c0f0e;
    border-radius: 3%;
    max-width:20em;
  }

  #lastfm .info {
    font-size: .8em;
    margin-left: 1em;
    margin-top: .5em;

    display: flex;
    flex-direction: column;
  }

  #lastfm:hover {
    box-shadow: 0 0 .5em #0c0f0e;
    max-width:30em;
  }

  #lastfm .art {
    transition: height 300ms;
    border-radius: 3%;
    height: 5em;
    box-shadow: 0 0 .3em #0c0f0e;
  }

  #lastfm:hover .art {
    height: 15em;
  }

  #lastfm .eq {
    align-self: flex-end;
    height: 2em;
    margin-left: 1em;
  }

  .clean #lastfm, #lastfm:not(.show) {
    margin-bottom: -10em;
    opacity: 0;
  }
`

export default function SiteLastfm() {
  return (
    <>
      <section id="lastfm">
        <a target="_blank" href="https://www.last.fm/user/Jayle23">
          <img class="art" alt="" />
        </a>
        <div class="info">
          <strong class="song"></strong>
          <small class="artist"></small>
        </div>
        <img class="eq" alt="" />
      </section>
      <style>{css}</style>
    </>
  )
}

onLoad(async () => {
  document.querySelector<HTMLImageElement>("#lastfm .eq")!.src = equalizer

  const track = await getNowPlaying("jayle23")
  const element = document.querySelector<HTMLElement>("#lastfm")!

  if (track) {
    const img    = element.querySelector<HTMLImageElement>(".art")!
    const artist = element.querySelector<HTMLElement>(".artist")!
    const song   = element.querySelector<HTMLElement>(".song")!

    img.src          = track.image[track.image.length - 1]["#text"]
    song.innerText   = track.name
    artist.innerText = track.artist["#text"]

    element.classList.add("show")
  }
})
