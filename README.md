# Sticky Navigation 

An example of a sticky navigation bar with the active element highlighted when scrolling

## Demo
https://paqmind.github.io/frontend-challenges/sticky-nav/solution/index.html

## Main Functionality

1. Sticky navigation: A navigation bar remains fixed at the top as users scroll 
through content within a single section.
   
2. Smooth scrolling: When a user clicks on a menu item, the page scrolls smoothly
to the corresponding section, aligning it directly below the sticky navigation bar.

3. Automatic highlighting: As users scroll up or down, the active item in 
the navigation changes dynamically based on which section is currently visible.


## Key code blocks

1. Sticky navigation

```css
.subnav {
  background: linear-gradient(white, white 90%, transparent);
  padding: 2rem 0;
  position: sticky;
  top: 0;
} 
```

2. Smooth scrolling

```js
link.addEventListener("click", (event) => {
  event.preventDefault()

  let subsectionY = subSections[index].getBoundingClientRect().y
  let navHeight = nav.getBoundingClientRect().height

  window.scrollTo({
    behavior: "smooth",
    top: window.scrollY + subsectionY - navHeight
  })
})
```

3a. Automatic highlighting via Scroll event

```js
window.addEventListener("scroll", () => {
  let active = -1
  active = subSections.findIndex((subSection, index) => {
    let elY = subSection.getBoundingClientRect().y
    let elHeight = subSection.getBoundingClientRect().height
    let navHeight = nav.getBoundingClientRect().height

    if (elY <= navHeight && elY + elHeight > navHeight) {
      return true
    }
  })

  links.forEach(link => {
    link.classList.remove("active")
  })
  if (active >= 0) {
    links[active].classList.add("active")
  }
})
```

3a. Automatic highlighting via Intersection Observer API

```js
let navHeight = nav.getBoundingClientRect().height
let screenHeight = document.documentElement.clientHeight
let buffer = 4
let options = {
  rootMargin: `
  -${navHeight + buffer}px
  0px
  -${screenHeight - navHeight - buffer}px
  0px`,
}

let currentId = null
let observer = new IntersectionObserver(
   (entries) => {
    entries.forEach(entry => {
      if (currentId != entry.target.id && entry.isIntersecting) {
         currentId = entry.target.id
         section.querySelector("a.active")?.classList.remove("active")
         section.querySelector(`a[href="#${currentId}"]`)
           .classList.add("active")
       } else if (currentId == entry.target.id && !entry.isIntersecting) {
         section.querySelector("a.active").classList.remove("active")
         currentId = null
       }
     })
   }, options
 )
subSections.forEach((s) => {observer.observe(s)})
```
