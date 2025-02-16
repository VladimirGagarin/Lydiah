'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelectorAll('main section');
    const introDiv = document.querySelector('.intro-div');
    const homeBtn = document.querySelector('header  button');
    const ReadBtn = document.querySelectorAll('.letter-div .overlay-letter-div span')[0];
    
    const letter = new Audio("ldyiah_letter.mp3");
    const audios = [
        {song:"audio28.mp3", text:"LOVE"},
        {song:"audio5.mp3", text:"Best wish is you"},
        {song:"audio24.mp3", text:"You are  my sunshine"},
        {song:"audio21.mp3", text: "For you, my world"},
        {song:"audio022.mp3", text: "A million dreams, all about you"},
        {song:"audio1.mp3", text:"simply the best"},
        {song:"audio25.mp3", text:"Someday, somewhere—it's us"},
        {song:"audio15.mp3", text: "Wish you Good Life"},
        {song:"audio17.mp3", text: "Fight for you"},
        {song:"audio16.mp3", text: "Wish you Good Health"},
        {song:"audio2.mp3", text: "I can go the distance for you"},
        {song:"audio3.mp3", text: "I can do anything for you"},
        {song:"audio4.mp3", text: "Divine soul in my world"},
        {song:"audio12.mp3", text: "For you Always"},
        {song:"audio11.mp3", text: "Lost in time & space"},
        {song:"audio18.mp3", text:"Into your arms"},
        {song:"audio19.mp3", text:"Bring Me Back"},
        {song:"audio10.mp3", text: "Defying gravity for love"},
        {song:"audio29.mp3", text:"You Perfect always"},
        {song:"audio30.mp3", text:"From this moment"},
        {song:"audio6.mp3", text: "Adorned with memories of you"},
        {song:"audio8.mp3", text: "My heart lingerswith memories of you"},
        {song:"lydiahfav.mp3", text: "Wish you Good time"},
        {song:"audio27.mp3", text: "My Heart burst"},
        {song:"audio14.mp3", text: "A Star is Born"},
        {song:"audio7.mp3", text: "Wish you Happiness"},
        {song:"audio13.mp3", text: "All My hope  is for you"},
        {song:"audio23.mp3", text: "L.O.V.E"},
        {song:"audio26.mp3", text: "My chiquitita"},
        {song:"audio20.mp3", text: "You are my together"},
 
    ];
    const audioElements = audios.map(audio => new Audio(audio.song)); // Creates audio elements

    let currentAudio = null;

    const photos = ['lydia.jpg', 'lydia02.jpg','lydia03.jpg','lydia04.jpg', 'lydia05.jpg',"lyd2.jpg", 'lydia02.jpg', "lyd.jpg"];

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

    function showLoading(state){
        document.querySelector('.loading-page').style.display = state ? "flex" : "none";
    }

    setTimeout(function() {
        showLoading(false);
    },6000)

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
        // const photoIndex = Math.floor(Math.random() * photos.length);
        templateDiv.style.backgroundImage = `url('${photos[photoIndex]}')`;
    
        setTimeout(function() {templateDiv.innerHTML = `<span>${ad.text}</span>`;},2000)
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
                        entry.target.scrollIntoView({ behavior: "smooth", block: "center" });
                        entry.target.classList.add('entrance');

                        setTimeout(() => {
                            currentAudio.play();
                        }, 500);
              
                        // When the current song ends, play the next one
                        currentAudio.addEventListener('ended', () => {
                            let nextIndex = (currentIndex + 1) % audioElements.length; // Move to next or loop to start
                            let nextAudio = audioElements[nextIndex];

                            // Scroll to next template-div
                            let nextEntry = section[1].children[nextIndex];
                            if (nextEntry) {
                                nextEntry.scrollIntoView({ behavior: "smooth", block: "center" });
                                nextEntry.classList.add('entrance');
                            }

                            setTimeout(() => {
                                nextAudio.play();
                            }, 500);
                        });

                        handlePlaying();
                        // Remove previous event listeners to avoid stacking
                        currentAudio.removeEventListener('stalled', handleStalled);
                        currentAudio.removeEventListener('playing', handlePlaying);
                        currentAudio.removeEventListener('waiting', handleWaiting);
                        currentAudio.removeEventListener('error', handleError);

                        // Define event handler functions
                        function handleStalled() {
                            entry.target.classList.add('loading');
                            showLoading(true);
                        }

                        function handlePlaying() {
                            entry.target.classList.remove('loading');
                            showLoading(false);
                        }

                        function handleWaiting() {
                            entry.target.classList.add('loading');
                            showLoading(true);
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


                        document.addEventListener('visibilitychange', () => {
                            if (document.visibilityState === "hidden") {
                                currentAudio.pause();
                            } else {
                                currentAudio.play();
                            }
                        });                        
                    }
                }

                
            });
        }, { root: null, threshold: 0.5 });

        section[1].querySelectorAll('.template-div').forEach(div => observer.observe(div));
    
});
