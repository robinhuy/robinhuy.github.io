const HIGHLIGHT_OFFSET = 50;
const anchorElements = document.querySelectorAll(".toc-body ul li a");
const headingElements = document.querySelectorAll(
  ".post-content h2, .post-content h3, .post-content h4"
);
const headingElementsOffsetTop = [];
headingElements.forEach((element) => {
  headingElementsOffsetTop.push(element.offsetTop);
});

// Check when all images in page loaded
let imagesInPage = document.images,
  imageLoadedCount = 0;
const checkImageLoaded = () => {
  imageLoadedCount++;

  if (imageLoadedCount === imagesInPage.length) {
    headingElementsOffsetTop.length = 0;
    console.log("All images loaded!");
    headingElements.forEach((element) => {
      headingElementsOffsetTop.push(element.offsetTop);
    });
  }
};

// Update heading positions when all images in page loaded
[].forEach.call(imagesInPage, function (img) {
  if (img.complete) {
    checkImageLoaded();
  } else {
    img.addEventListener("load", checkImageLoaded, false);
  }
});

const highlightIndex = (index) => {
  currentHeadingIndex = index;

  // Reset highlight
  document.querySelectorAll(`.toc-body ul li a`).forEach((element) => {
    element.style.borderColor = "transparent";
  });

  if (index === -1) return;

  // Highlight by index
  const anchorElements = document.querySelector(
    `.toc-body ul li a[href="#${headingElements[index].id}"]`
  );
  if (anchorElements) {
    anchorElements.style.borderColor = "#727272";
  }
};
const throttle = (callback, time) => {
  if (throttleTimer) return;

  throttleTimer = true;

  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
};

let throttleTimer = false;
let currentHeadingIndex = -1;

// Init highlight
for (let i = 0; i < headingElementsOffsetTop.length; i++) {
  if (window.pageYOffset >= headingElementsOffsetTop[i] - HIGHLIGHT_OFFSET) {
    highlightIndex(i);
  }
}

// Handle highlight when scrolling
window.addEventListener("scroll", () => {
  throttle(() => {
    const currentPosition = window.pageYOffset;
    const lastIndex = headingElementsOffsetTop.length - 1;

    for (let i = lastIndex; i >= currentHeadingIndex; i--) {
      if (currentPosition >= headingElementsOffsetTop[i] - HIGHLIGHT_OFFSET) {
        highlightIndex(i);
        return;
      }
    }

    highlightIndex(-1);
  }, 100);
});
