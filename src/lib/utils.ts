// /lib/utils.ts
export function scrollToElement(elementId: string) {
  if (typeof window === "undefined") return;
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function scrollToBooking() {
  scrollToElement("booking");
}
