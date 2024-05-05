const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");

const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

function togglePlay(){
    if(video.paused){
        video.play();
    }
    else
    video.pause();
}

function updateButton(){
    const icon = this.paused? '►': '| |';
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset.skip);
    video.currentTime += parseInt(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime = scrubTime;
}

video.addEventListener("click", togglePlay);
toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(btn => btn.addEventListener('click', skip));

ranges.forEach(e => e.addEventListener('change', handleRangeUpdate));
ranges.forEach(e => e.addEventListener('mousemove', handleRangeUpdate));

let mouseDown  = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', ()=>{
    if(mouseDown){
        scrub();
    }
});
progress.addEventListener('mousedown',() => mouseDown = true);
progress.addEventListener('mouseup',() => mouseDown = false);