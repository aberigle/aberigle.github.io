export function onLoad(fn: () => void): void {
  if (typeof window === "undefined") return
  window.addEventListener("load", fn)
}
