/* ALL STORY CONTENT LIVES HERE. Edit text, images and the timeline; no other file needs changes.
   Images: copy a file into /assets and set src (for example "assets/j4.jpg"). An empty src shows a labelled placeholder.
   optional:true hides a figure until you add an image. Crop out names, IDs and credentials before adding screenshots. */
window.STORY = {
  site: { title: "I Grew Up With PUBG MOBILE — 2019–2026" },
  hero: {
    label: "A PERSONAL STORY | 2019—2026",
    title: "I GREW UP WITH PUBG MOBILE.",
    sub: "From a Samsung J4 in 2019 to the memories I carry in 2026.",
    tag: "One game. Seven years. Countless memories."
  },
  images: {
    igi: { src: "", label: "A childhood IGI memory", hint: "assets/igi.jpg" },
    j4: { src: "", label: "My original Samsung J4", hint: "assets/j4.jpg" },
    early: { src: "", label: "Early PUBG MOBILE gameplay", hint: "assets/early.jpg" },
    history: { src: "", label: "A historical PUBG MOBILE screenshot", hint: "assets/history.jpg" },
    old: { src: "", label: "Original account memory", hint: "assets/old-account.jpg", optional: true },
    now: { src: "", label: "My current account", hint: "assets/current.jpg" }
  },
  timeline: [
    { y: "2019", t: "First experience with PUBG MOBILE." },
    { y: "2020–2022", t: "Years of playing and creating memories." },
    { y: "2023", t: "Losing the original account.", tone: "gone" },
    { y: "2024–2026", t: "Continuing the journey with a new account.", tone: "next" }
  ],
  chapters: [
    { id: "igi", n: "02", k: "Before the battleground", t: "crt", h: "BEFORE PUBG, THERE WAS IGI.",
      p: ["Before PUBG MOBILE entered my life, my childhood gaming memories were connected to IGI on PC. It was one of the games that introduced me to the world of gaming."],
      figs: ["igi"] },
    { id: "drop", n: "03", k: "The beginning", t: "phone", big: "2019", h: "THE FIRST DROP.",
      p: ["In 2019, when PUBG MOBILE became available in my country, I was incredibly excited to experience it for the first time.",
          "My device was a Samsung J4. Back then, the game was relatively lightweight, and I could enjoy approximately 40+ FPS.",
          "It wasn’t about having the best device or the highest graphics settings. It was about experiencing something completely new."],
      figs: ["early", "j4"] },
    { id: "years", n: "04", k: "Growing through the years", t: "years", h: "TIME PASSED. THE GAME EVOLVED. SO DID I.",
      p: ["From those early days to the different seasons, updates, and changes, PUBG MOBILE remained a part of my life.",
          "The experience changed, the technology improved, and I gradually grew older.",
          "Looking back, I realize that this game accompanied me through different stages of my life."],
      timeline: true, figs: ["history"] },
    { id: "lost", n: "05", k: "The unfortunate chapter", t: "dark", h: "SOME MEMORIES WERE LOST. THE JOURNEY WASN’T.",
      p: ["In 2023, I lost access to my original PUBG MOBILE account, which I had created around Season 12. Unfortunately, it was scammed from me by another person.",
          "Losing an account connected to years of memories was disappointing.",
          "But that wasn’t the end of my journey. I eventually started again with a new account."],
      figs: ["old"] },
    { id: "again", n: "06", k: "A new beginning", t: "warm", h: "STARTING AGAIN.",
      p: ["Despite losing my original account, my connection with PUBG MOBILE never completely disappeared.",
          "I continued with a new account, creating another chapter in a journey that had already become part of my life."],
      figs: ["now"] },
    { id: "me", n: "07", k: "The person behind the player", t: "profile", h: "THE PLAYER GREW UP.",
      p: [],
      facts: [["Age", "22"], ["Studying", "Computer Science undergraduate, fifth semester"], ["Character", "Generally outgoing and friendly, but values privacy and personal space"]],
      quote: "The person who first installed PUBG MOBILE on a Samsung J4 in 2019 is now a university student studying Computer Science." }
  ],
  final: {
    h: "I DIDN’T JUST PLAY PUBG MOBILE. I GREW UP WITH IT.",
    p: ["For some people, it’s just a mobile game. For me, it’s connected to my childhood, teenage years, and the memories I have collected along the way.",
        "I may have lost my original account, but I never lost the memories associated with this journey.",
        "Seven years later, the connection remains."],
    years: "2019 — 2026",
    end: "THE JOURNEY CONTINUES."
  }
};
