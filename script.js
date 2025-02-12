'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelectorAll('main section');
    const introDiv = document.querySelector('.intro-div');
    const homeBtn = document.querySelector('header  button');
    const ReadBtn = document.querySelectorAll('.letter-div .overlay-letter-div span')[0];
    const letter = new Audio("ldyiah_letter.mp3");
    const audios = [
        {song:"audio5.mp3", text:"You are the best wish"},
        {song:"audio1.mp3", text:"You are simply the best"}, 
        {song:"audio2.mp3", text: "I can go the distance for you"},
        {song:"audio3.mp3", text: "I can do anything for you"},
        {song:"audio4.mp3", text: "Who is this divine soul that graces my world?"},
        {song:"audio12.mp3", text: "For you Always"},
        {song:"audio11.mp3", text: "lost in the echoes of time and space, yet somehow, they still find their way back to us"},
        {song:"audio10.mp3", text: "Drifting through time, defying gravity, moments rise where even the stars dare not to fall"},
        {song:"audio6.mp3", text: "Each day is a treasure, adorned with your memories"},
        {song:"audio8.mp3", text: "My heart is lingered with your memories"},
        {song:"lydiahfav.mp3", text: "Wish you Good time"},
        {song:"audio7.mp3", text: "If happiness would be tangible, you're happiness"},
    ];
    const audioElements = audios.map(audio => new Audio(audio.song)); // Creates audio elements

    let currentAudio = null;

    const photos = ['lydia.jpg', 'lydia02.jpg','lydia03.jpg','lydia04.jpg', 'lydia05.jpg'];

    introDiv.querySelectorAll('.some-actions-chhoices button').forEach((btn, index) => {
        btn.onclick = () => showSection(true, index);
    });

    function showSection(state, index) {
        document.querySelectorAll('main section').forEach((sect) => {
            sect.style.display = 'none';    
        });

        section[index].style.display = state ? "flex" : "none";
        introDiv.style.display = state ? "none" : "flex";
        homeBtn.disabled = !state;
    }

    homeBtn.onclick = () => {
        document.querySelectorAll('main section').forEach((sect) => {
            sect.style.display = 'none';    
        });

        introDiv.style.display = 'flex';

        homeBtn.disabled = true;

        if(!letter.paused){
            letter.pause();
            letter.currentTime = 0;
        }

        audioElements.forEach(audio => {
            audio.pause(); 
            audio.currentTime = 0}
        );

        document.querySelector('.overlay-letter-div').style.display = 'flex';
    }

    

    ReadBtn.onclick = function () {
        if (letter.readyState >= 3) { // If already loaded
            document.querySelector('.overlay-letter-div').style.display = 'none';
            setTimeout(function() {
                letter.play();
            },1000);
        } else {
            letter.addEventListener("canplaythrough", function() {
                document.querySelector('.overlay-letter-div').style.display = 'none';
                setTimeout(function() {
                    letter.play();
                },1000);

            }, { once: true });
        }
    };
    

    audios.forEach((ad, index) => {
        const templateDiv = document.createElement('div');
        templateDiv.classList.add('template-div');
    
        // Loop through photos using modulus
        const photoIndex = index % photos.length;
        templateDiv.style.backgroundImage = `url('${photos[photoIndex]}')`;
    
        templateDiv.innerHTML = `<span>${ad.text}</span>`;
        section[1].appendChild(templateDiv);
    });
    

        // Create Intersection Observer
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const currentIndex = [...section[1].children].indexOf(entry.target);
                    
                    // Stop all other audio tracks
                    audioElements.forEach(audio => {
                        audio.pause(); 
                        audio.currentTime = 0;
                    });

                    section[1].querySelectorAll('.template-div').forEach(div => {div.classList.add('loading')});

                    // Play the audio corresponding to the visible template-div
                    if (currentIndex !== -1) {
                        currentAudio = audioElements[currentIndex];
                        currentAudio.play()
                        audioElements[currentIndex].loop = true; 
                        entry.target.scrollIntoView({ behavior: "smooth", block: "center" });

                        handlePlaying();
                        // Remove previous event listeners to avoid stacking
                        currentAudio.removeEventListener('stalled', handleStalled);
                        currentAudio.removeEventListener('playing', handlePlaying);
                        currentAudio.removeEventListener('waiting', handleWaiting);
                        currentAudio.removeEventListener('error', handleError);

                        // Define event handler functions
                        function handleStalled() {
                            entry.target.classList.add('loading');
                        }

                        function handlePlaying() {
                            entry.target.classList.remove('loading');
                        }

                        function handleWaiting() {
                            entry.target.classList.add('loading');
                        }

                        function handleError() {
                            document.querySelectorAll('main section').forEach((sect) => {
                                sect.style.display = 'none';
                            });

                            if (introDiv) introDiv.style.display = 'flex';
                        }

                        // Attach event listeners
                        currentAudio.addEventListener('stalled', handleStalled);
                        currentAudio.addEventListener('playing', handlePlaying);
                        currentAudio.addEventListener('waiting', handleWaiting);
                        currentAudio.addEventListener('error', handleError);
                    }
                }
            });
        }, { root: null, threshold: 0.4 });

        section[1].querySelectorAll('.template-div').forEach(div => observer.observe(div));
    
});
