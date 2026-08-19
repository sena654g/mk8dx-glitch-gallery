const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const data = courses[id];

if (data) {
    document.getElementById("pageTitle").textContent = data.category + " > " + data.title;
    document.getElementById("categoryLink").href = data.categoryLink;
    document.getElementById("categoryLink").textContent = data.category;
    document.getElementById("courseTitle").textContent = data.title;
    document.getElementById("description").textContent = data.description;
    document.getElementById("courseVideo").src = data.video;
} else {
    document.getElementById("pageTitle").textContent = "Not Found";
    document.getElementById("courseTitle").textContent = "ページが見つかりません";
    document.getElementById("description").textContent = "このコースのデータはまだ登録されていません。";
}