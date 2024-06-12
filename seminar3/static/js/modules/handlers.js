import { URL, PREV_PHOTO_COUNT } from "./config.js";

const fillPhotoContent = async (photoElement, authorNameElement) => {
    const data = await getData();
    photoElement.src = data[0];
    photoElement.alt = data[1];
    authorNameElement.textContent = data[2];

    savePhoto(data[0], data[2]);
};

const likeButtonHandler = (
    currentLikes,
    likesCounterEl,
    likeButton,
    photoEl
) => {
    likeButton.addEventListener("click", () => {
        currentLikes += 1;
        likesCounterEl.textContent = currentLikes;
        localStorage.setItem("currentLikes", currentLikes);
        updateLikes(photoEl.src);
    });
};

const fillPrevPhotos = (historyAreaEl, emptyTitleEl) => {
    const prevPhotos = JSON.parse(localStorage.getItem("prevPhotos")) || [];

    if (prevPhotos.length > 0) {
        if (!emptyTitleEl.classList.contains("hidden"))
            emptyTitleEl.classList.add("hidden");
        prevPhotos.forEach(function (item) {
            const historyBox = document.createElement("div");
            const historyInfo = document.createElement("div");
            const historyImg = document.createElement("img");
            const historyAuthor = document.createElement("p");
            const historyLikes = document.createElement("p");
            historyBox.classList.add("history-box");
            historyInfo.classList.add("history-box__info");
            historyImg.classList.add("history-box__img");
            historyAuthor.classList.add("history-box__info-author");
            historyLikes.classList.add("history-box__info-likes");
            historyImg.src = item.url;
            historyAuthor.textContent = `${item.author}`;
            historyLikes.textContent = `Likes: ${item.likes}`;
            historyBox.append(historyImg);
            historyInfo.append(historyAuthor);
            historyInfo.append(historyLikes);
            historyBox.append(historyInfo);
            historyAreaEl.append(historyBox);
        });
    } else {
        if (emptyTitleEl.classList.contains("hidden"))
            emptyTitleEl.classList.remove("hidden");
    }
};

function savePhoto(photoUrl, authorName) {
    let prevPhotos = JSON.parse(localStorage.getItem("prevPhotos")) || [];
    let urlExist = prevPhotos.some((item) => item.url === photoUrl);
    console.log(urlExist);

    if (!urlExist) {
        prevPhotos.push({ url: photoUrl, author: authorName, likes: 0 });
    }

    if (prevPhotos.length > PREV_PHOTO_COUNT + 1) {
        prevPhotos.shift();
    }

    localStorage.setItem("prevPhotos", JSON.stringify(prevPhotos));
}

function updateLikes(photoUrl) {
    let prevPhotos = JSON.parse(localStorage.getItem("prevPhotos"));
    let urlExist = prevPhotos.some((item) => item.url === photoUrl);

    if (urlExist) {
        console.log(urlExist);
        const photoIndex = prevPhotos.findIndex(
            (item) => item.url === photoUrl
        );
        console.log(photoIndex);
        const savedLikes = localStorage.getItem("currentLikes");
        if (savedLikes) {
            prevPhotos[photoIndex].likes = savedLikes;
            localStorage.setItem("prevPhotos", JSON.stringify(prevPhotos));
        }
    }
}

async function getData() {
    try {
        const response = await fetch(URL);
        const data = await response.json();
        return [data.urls.small, data.alt_description, data.user.name];
    } catch (error) {
        console.error(`Fetching data error: ${error}`);
    }
}

export { fillPhotoContent, likeButtonHandler, fillPrevPhotos };
