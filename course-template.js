const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const data = courses[id];

function render() {
  const lang = getLang();
  if (data) {
    const title = lang === "ja" ? data.titleJa || data.title : data.title;
    const category = lang === "ja" ? data.categoryJa || data.category : data.category;

    document.getElementById("pageTitle").textContent = category + " > " + title;
    document.getElementById("categoryLink").href = data.categoryLink;
    document.getElementById("categoryLink").textContent = category;
    document.getElementById("courseTitle").textContent = title;

    // 選んだ言語を優先し、空なら反対の言語にフォールバック
    const text = lang === "ja"
      ? data.descriptionJa || data.description
      : data.description || data.descriptionJa;
    document.getElementById("description").innerHTML = text;
    document.getElementById("courseVideo").src = data.video;
  } else {
    document.getElementById("pageTitle").textContent = "Not Found";
    document.getElementById("courseTitle").textContent =
      lang === "ja" ? "ページが見つかりません" : "Page not found";
    document.getElementById("description").textContent =
      lang === "ja" ? "このコースのデータはまだ登録されていません。" : "This course has not been added yet.";
  }
}

render();
document.addEventListener("langchange", render);

document.querySelectorAll('video').forEach(video => {
  const savedVolume = localStorage.getItem('videoVolume');
  video.volume = savedVolume !== null ? parseFloat(savedVolume) : 1;
  video.addEventListener('volumechange', () => {
    localStorage.setItem('videoVolume', video.volume);
  });
});