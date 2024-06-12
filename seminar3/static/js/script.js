import {
    fillPhotoContent,
    fillPrevPhotos,
    likeButtonHandler,
} from "./modules/handlers.js";

const photoElement = document.querySelector(".photo-box__image");
const authorNameElement = document.querySelector(".photo-box__info-author");
const likeButton = document.querySelector(".photo-box__likes-icon");
const likesCounterElement = document.querySelector(".photo-box__likes-counter");
let currentLikes = 0;
const historyAreaEl = document.querySelector(".history-area");
const emptyTitleEl = document.querySelector(".empty-title")


document.addEventListener("DOMContentLoaded", function () {
    fillPhotoContent(photoElement, authorNameElement);
    fillPrevPhotos(historyAreaEl, emptyTitleEl)
});

likeButtonHandler(
    currentLikes,
    likesCounterElement,
    likeButton,
    photoElement,
);
