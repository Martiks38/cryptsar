import texts from "./assets/texts.json" assert { type: "json" };

const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  const introduction = $("#introduction");
  const label = $("[html=displacement]");

  const lang = window.localStorage.getItem("lang");
  const isEncrypt = window.localStorage.getItem("encrypt");

  if (!lang) window.localStorage.setItem("lang", "en");

  const { displacement, exchange, intro } = lang === "es" ? texts.es : texts.en;

  // if (isEncrypt) {
  const actionHeader = $(".action");
  const heads = Array.from(actionHeader.querySelectorAll("h2"));
  console.log(heads);
  heads.forEach((head, ind) => (head.innerText = exchange[ind]));
  // }

  introduction.innerText = intro;
  label.innerText = displacement;
});
