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
    flex-direction: column;
    align-items: stretch;
    gap: 1em;
    width: 100%;
  }

  a.project {
    --project-accent: transparent;
    display: flex;
    flex-direction: column;
    place-content: center;
    padding: 1.3em 2em;
    transition: all 150ms;
    border-radius: 5%;
    text-decoration: none;
    text-align: left;
    color: white;
    background: #0c0f0e;
    box-shadow: 0 0 .3em #0c0f0e;

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

  a.project:hover,
  a.project:focus-visible {
    // background: var(--project-accent);

    border-left: .5em solid var(--project-accent);
    border-color: var(--project-accent);
    box-shadow: 0 0 .5em var(--project-accent);
  }
`

export default function SiteMain() {
  return (
    <>
      <section id="main">
        <div class="projects">
          <a class="project" style="--project-accent: #00d492" href="https://uhurus.com?utm_source=aberigle.com" target="_blank">
            <strong><img class="favicon" src="https://uhurus.com/favicon.ico" alt="" />uhurus</strong>
            <span>laboratorio de producto</span>
          </a>
          <a class="project" style="--project-accent: #FFBF00" href="https://lopago.es?utm_source=aberigle.com" target="_blank">
            <strong><img class="favicon" src="https://lopago.es/favicon.ico" alt="" />lopago.</strong>
            <span>cobrar online fácil fácil</span>
          </a>

          <a class="project" style="--project-accent: oklch(76.662% 0.135 153.45)" href="https://csvifier.com?utm_source=aberigle.com" target="_blank">
            <strong><img class="favicon" src="https://csvifier.com/favicon.ico" alt="" />csvifier</strong>
            <span>JSON to CSV online parser</span>
          </a>
        </div>
      </section>
      <style>{css}</style>
    </>
  )
}
