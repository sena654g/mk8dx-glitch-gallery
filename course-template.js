const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const data = courses[id];

if (data) {
    document.getElementById("pageTitle").textContent = data.category + " > " + data.title;
    document.getElementById("categoryLink").href = data.categoryLink;
    document.getElementById("categoryLink").textContent = data.category;
    document.getElementById("courseTitle").textContent = data.title;
    document.getElementById("descriptionJa").innerHTML = data.descriptionJa;
    document.getElementById("description").innerHTML = data.description;
    document.getElementById("courseVideo").src = data.video;
} else {
    document.getElementById("pageTitle").textContent = "Not Found";
    document.getElementById("courseTitle").textContent = "ページが見つかりません";
    document.getElementById("description").textContent = "このコースのデータはまだ登録されていません。";
}

document.querySelectorAll('video').forEach(video => {
    // 保存されている音量があれば使う、なければ初期値0.2
    const savedVolume = localStorage.getItem('videoVolume');
    video.volume = savedVolume !== null ? parseFloat(savedVolume) : 1;

    // ユーザーが音量を変えたら、その都度保存する
    video.addEventListener('volumechange', () => {
        localStorage.setItem('videoVolume', video.volume);
    });
});