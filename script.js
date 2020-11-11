const audioElements = Array.from(document.querySelectorAll("audio"));
const drumBoxes = Array.from(document.querySelectorAll(".drum-box"));

const dataKeyPredicate = (element, key) => element.getAttribute("data-key") === key;
const getAudioElementByKey = key => audioElements.filter(audio => dataKeyPredicate(audio, key))[0];
const getDrumBoxByKey = key => drumBoxes.filter(drumBox => dataKeyPredicate(drumBox, key))[0];

// Take into consideration the repeats of playing audio
const playTrack = audioElement => {
    audioElement.pause();
    audioElement.currentTime = 0;
    audioElement.play();
};

document.addEventListener("keypress", e => {
    const pressedKey = e.code[e.code.length - 1];

    const audioElement = getAudioElementByKey(pressedKey);
    const drumBox = getDrumBoxByKey(pressedKey);
    if(audioElement !== undefined) {
        playTrack(audioElement);
        drumBox.classList.add("activate");
        audioElement.addEventListener("ended", () => drumBox.classList.remove("activate"));
    }
});
