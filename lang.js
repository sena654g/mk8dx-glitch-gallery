function getLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "ja" || q === "en") return q;
  const saved = localStorage.getItem("lang");
  if (saved === "ja" || saved === "en") return saved;
  return navigator.language.startsWith("ja") ? "ja" : "en";
}

function setLang(lang) {
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;
  document.dispatchEvent(new Event("langchange"));
}

document.documentElement.lang = getLang();

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.createElement("button");
  btn.className = "lang-toggle";
  const update = () => (btn.textContent = getLang() === "ja" ? "EN" : "JA");
  update();
  btn.addEventListener("click", () => {
    setLang(getLang() === "ja" ? "en" : "ja");
    update();
  });
  document.body.appendChild(btn);
});