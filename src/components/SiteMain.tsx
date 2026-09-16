const css = `
  #main {
    transition: all 150ms;
    z-index: 2;
    opacity: 1;
    margin: 0 auto;
    max-width: 34em;
    padding: 0 1.2em;
    text-align: center;
  }

  .projects {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 1em;
    width: 100%;
  }

  a.project {
    display: flex;
    flex-direction: column;
    place-content: center;
    padding: 1em 1.4em;
    transition: all 150ms;
    border-radius: 5%;
    text-decoration: none;
    text-align: left;
    color: white;
    background: #0c0f0e;
    border: 1px solid #232a28;
  }

  a.project .favicon {
    width: 0;
    height: 1em;
    margin-right: 0;
    vertical-align: -.15em;
    opacity: 0;
    transition: all 150ms;
  }

  a.project span {
    font-size: .85em;
    color: rgba(255, 255, 255, .75);
  }

  a.project:hover .favicon,
  a.project:focus-visible .favicon {
    width: 1em;
    margin-right: .4em;
    opacity: 1;
  }

  a.project:hover span {
    color: white;
  }

  a.uhurus-card:hover {
    background: #00d492;
    border-color: #00d492;
    box-shadow: 0 0 1em #00d492;
  }

  a.lopago-card:hover {
    background: #FFBF00;
    border-color: #FFBF00;
    box-shadow: 0 0 1em #FFBF00;
  }
`

export default function SiteMain() {
  return (
    <>
      <section id="main">
        <div class="projects">
          <a class="project uhurus-card" href="https://uhurus.com?utm_source=aberigle.com" target="_blank">
            <strong><img class="favicon" src="https://uhurus.com/favicon.ico" alt="" />uhurus</strong>
            <span>laboratorio de producto</span>
          </a>
          <a class="project lopago-card" href="https://lopago.es?utm_source=aberigle.com" target="_blank">
            <strong><img class="favicon" src="https://lopago.es/favicon.ico" alt="" />lopago.</strong>
            <span>cobrar online fácil fácil</span>
          </a>
        </div>
      </section>
      <style>{css}</style>
    </>
  )
}
