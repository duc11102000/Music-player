const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const cover = document.querySelector('#cover');

//Title của nhạc
const songs = ['Music1', 'Music2', 'Music3'];
let songIndex = 2;

//Detail nhạc (tên, ảnh các thứ)
loadSong(songs[songIndex]);  

function loadSong(song){
    title.innerText = song;
    audio.src=`music/${song}.mp3`;
    cover.src =`images/${song}.jpg`;
}

// Play nhạc
function playSong(){
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}

// Pause nhạc
function pauseSong(){
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}

// Lùi nhạc
function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1; //Lùi về 1 bài 
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Nhạc kế tiếp
function nextSong(){
    songIndex++;
    if(songIndex > songs.length - 1){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Thanh progress của nhạc ( thanh tiến trình) (khó hỉu ??)
function updateProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Tùy chỉnh tiến trình của nhạc (khó hỉu ??)
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

// tạo event
playBtn.addEventListener('click',() =>{
    const isPlaying = musicContainer.classList.contains('play');
    if(isPlaying){
        pauseSong();
    }else{
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);