import SiteBackground from "./components/SiteBackground"
import SiteContact from "./components/SiteContact"
import SiteFooter from "./components/SiteFooter"
import SiteLastfm from "./components/SiteLastfm"
import SiteMain from "./components/SiteMain"

export const html = (
  <>
    <SiteBackground />
    <SiteContact />
    <SiteMain />
    <SiteLastfm />
    <SiteFooter />
  </>
)

// En dev no hay SSG (no existe #background) → pintamos en <body>.
// En build el HTML ya viene renderizado y solo hidratamos comportamiento.
if (typeof document !== "undefined" && !document.getElementById("background")) {
  document.body.insertAdjacentHTML("afterbegin", html as string)
}
