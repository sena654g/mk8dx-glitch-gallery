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
  } else {
    document.getElementById("pageTitle").textContent = "Not Found";
    document.getElementById("courseTitle").textContent =
      lang === "ja" ? "ページが見つかりません" : "Page not found";
    document.getElementById("description").textContent =
      lang === "ja" ? "このコースのデータはまだ登録されていません。" : "This course has not been added yet.";
  }
}

// 動画は言語切り替えで作り直さないよう、最初の1回だけセットする
function setupVideos() {
  const first = document.getElementById("courseVideo");
  if (!first || !data) return;

  // videos配列があればそれを優先、なければ video / video2 を使う
  const list = data.videos || [data.video, data.video2].filter(Boolean);
  if (list.length === 0) return;

  first.src = list[0];

  let prev = first;
  for (let i = 1; i < list.length; i++) {
    const v = first.cloneNode(false); // controls等の属性を引き継ぐ
    v.removeAttribute("id");
    v.src = list[i];
    prev.insertAdjacentElement("afterend", v);
    prev = v;
  }
}

render();
setupVideos();
document.addEventListener("langchange", render);

// 音量の保存(追加した動画も含めて全部に適用)
document.querySelectorAll('video').forEach(video => {
  const savedVolume = localStorage.getItem('videoVolume');
  video.volume = savedVolume !== null ? parseFloat(savedVolume) : 1;
  video.addEventListener('volumechange', () => {
    localStorage.setItem('videoVolume', video.volume);
  });
});