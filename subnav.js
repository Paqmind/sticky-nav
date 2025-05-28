window.addEventListener("DOMContentLoaded", () => {
  initSectionNav("section2")
})

function initSectionNav(sectionId) {
  let section = document.getElementById(sectionId)
  let nav = section.querySelector(".subnav")
  let links = [...nav.querySelectorAll("a")]
  let subSections = links.map(link => section.querySelector(
    link.getAttribute("href"))
  )

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault()

      let subsectionY = subSections[index].getBoundingClientRect().y
      let navHeight = nav.getBoundingClientRect().height

      window.scrollTo({
        behavior: "smooth",
        top: window.scrollY + subsectionY - navHeight
      })
    })
  })



  // OPTION 1 -- via scroll event
  // window.addEventListener("scroll", () => {
  //   let active = -1
  //   active = subSections.findIndex((subSection, index) => {
  //     let elY = subSection.getBoundingClientRect().y
  //     let elHeight = subSection.getBoundingClientRect().height
  //     let navHeight = nav.getBoundingClientRect().height
  //
  //     if (elY <= navHeight && elY + elHeight > navHeight) {
  //       return true
  //     }
  //   })
  //
  //   links.forEach(link => {
  //     link.classList.remove("active")
  //   })
  //   if (active >= 0) {
  //     links[active].classList.add("active")
  //   }
  // })


  // OPTION 2 -- via intersection observer
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
}
