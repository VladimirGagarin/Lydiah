'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelectorAll('main section');
    const introDiv = document.querySelector('.intro-div');
    const homeBtn = document.querySelector('header  button');
    const ReadBtn = document.querySelectorAll('.letter-div .overlay-letter-div span')[0];
    const vidContainer = document.querySelector('.video-div');
    const lydiahVideo = vidContainer.querySelector('video');
    const playVidBtn =  vidContainer.querySelectorAll('.controls-video .buttons-actions button')[0];
    const muteBtn = vidContainer.querySelectorAll('.controls-video .buttons-actions button')[1];
    const  fullScreenBtn = vidContainer.querySelectorAll('.controls-video .buttons-actions button')[2];
    const progressBar = vidContainer.querySelector('.controls-video .progress-video-truck .progress-video-bar');
    let isMute = false;
    let isPlayingVid = false;
    let isFullscreen = false;
    let wasPlaying = false;
    let isPlayingAnim = false;

    let currentLyricIndex = 0; // initialized because of  state 
    let timeUpdateListener = null; // **To prevent multiple event listeners**
    let isCurrentLyricShown = false; // Move it outside so it persists!

    const bubbleSong = new Audio("magic audio.mp3");
    const animOverlay = document.querySelector('.animation');
    const bubblePlayBtn = animOverlay.querySelectorAll('.actions-animation span')[1];
    const bubbleExitBtn = animOverlay.querySelectorAll('.actions-animation span')[0];
    const animVid = animOverlay.querySelector('#bg-video');
    
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
        {song:"audio29.mp3", text:"You are Perfect always"},
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

    const lyricForBubbles = [
        {
            text: "Roses Of Rome presents",
            start: 0,
            end: 6
        },
        {
            text: "Most Beloved Wish - Lydiah Wambui",
            start: 7,
            end: 15
        }, {
            text: "If happiness was a tangible thing, it would be you",
            start: 16,
            end: 20
        }, {
            text: "If you'd told me the feeling you'd bring, I'd think it untrue",
            start: 21,
            end: 27
        }, {
            text: "And people search for a wonder like you all of their lives",
            start: 28,
            end: 33
        }, {
            text: "You still amaze me after all this time",
            start: 34,
            end: 40
        }, {
            text: "You pull me in like some kind of wind",
            start: 41,
            end: 45
        }, {
            text: "Mesmerized by the hold I'm in",
            start: 46,
            end: 48
        }, {
            text: "Leave you here, I don't wanna",
            start: 49,
            end: 52
        }, {
            text: "I wanna",
            start: 53,
            end: 54
        }, {
            text: "Promise, as one does",
            start: 55,
            end: 59
        }, {
            text: "I, I will protect you at all costs",
            start: 60,
            end: 66
        }, {
            text: "Keep you safe here in my arms",
            start: 67,
            end: 72
        }, {
            text: "I, I will protect you at all costs",
            start: 73,
            end: 80
        }, {
            text: "At all costs",
            start: 81,
            end: 86
        }, {
            text: "What's pain when I look at you",
            start: 87,
            end: 90
        }, {
            text: "No way I could explain you",
            start: 91,
            end: 93
        }, {
            text: "Even if I tried to",
            start: 94,
            end: 96
        }, {
            text: "I'll never dream like I used to do",
            start: 97,
            end: 100
        }, {
            text: "If someone tried to hurt you",
            start: 101,
            end: 103
        }, {
            text: "I don't see how that could happen",
            start: 104,
            end: 106
        }, {
            text: "I'd fight for you in ways you can't imagine",
            start: 107,
            end: 106
        }, {
            text: "Felt this? No, I haven't",
            start: 108,
            end: 109
        }, {
            text: "I hope it would be alright to",
            start: 110,
            end: 109
        }, {
            text: "Stay right here beside you",
            start: 110,
            end: 113
        }, {
            text: "And promise, as one does",
            start: 114,
            end: 119
        }, {
            text: "I, I will protect you at all costs",
            start: 120,
            end: 125
        }, {
            text: "Keep you safe here in my arms",
            start: 126,
            end: 132
        }, {
            text: "I, I will protect you at all costs",
            start: 133,
            end: 139
        }, {
            text: "At all costs",
            start: 140,
            end: 142
        }, {
            text: "If you're ever feeling like you're lost, I'll come find you",
            start: 143,
            end: 147
        }, {
            text: "Man all fronts",
            start: 148,
            end: 146
        }, {
            text: "There's no ocean I won't swim across to be right by you",
            start: 150,
            end: 154
        }, {
            text: "And not just once",
            start: 155,
            end: 156
        }, {
            text: "Here and now, I swear on my response",
            start: 157,
            end: 156
        }, {
            text: "I'll remind you",
            start: 157,
            end: 161
        }, {
            text: "And promise, as one does",
            start: 162,
            end: 166
        }, {
            text: "I, I will protect you at all costs",
            start: 167,
            end: 173
        }, {
            text: "Keep you safe here in my arms",
            start: 174,
            end: 180
        }, {
            text: "I, I will protect you at all costs",
            start: 181,
            end: 187
        }, {
            text: "At all costs",
            start: 188,
            end: 194
        }
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
    },10000)

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

        wasPlaying = false;

        document.querySelector('.overlay-letter-div').style.display = 'flex';

        if(!lydiahVideo.paused) {
            lydiahVideo.pause();
            lydiahVideo.currentTime = 0;
            isPlayingVid = false;
            isMute = true;
            lydiahVideo.muted = isMute;
            muteBtn.innerHTML = '&#128264;';
            playVidBtn.innerHTML = "&#9654;";
        }
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
                            let nextIndex = currentIndex + 1;
                        
                            if (nextIndex < audioElements.length) {
                                // If there's a next song, play it
                                let nextAudio = audioElements[nextIndex];
                                let nextEntry = section[1].children[nextIndex];
                        
                                if (nextEntry) {
                                    nextEntry.scrollIntoView({ behavior: "smooth", block: "center" });
                                    nextEntry.classList.add('entrance');
                                }
                        
                                setTimeout(() => {
                                    nextAudio.play();
                                }, 500);
                            } else {
                                // If it's the last song, scroll to the top of the page
                                document.documentElement.scrollTop = 0;
                                
                                audioElements.forEach(audio => {
                                    audio.pause(); 
                                    audio.currentTime = 0;
                                });
                            }
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
                            wasPlaying = false;
                        }

                        function handlePlaying() {
                            entry.target.classList.remove('loading');
                            showLoading(false);
                            wasPlaying = true;
                        }

                        function handleWaiting() {
                            entry.target.classList.add('loading');
                            showLoading(true);
                            wasPlaying = false;
                        }

                        function handleError() {
                            document.querySelectorAll('main section').forEach((sect) => {
                                sect.style.display = 'none';
                            });

                            if (introDiv) introDiv.style.display = 'flex';

                            wasPlaying = false;
                        }

                        // Attach event listeners
                        currentAudio.addEventListener('stalled', handleStalled);
                        currentAudio.addEventListener('playing', handlePlaying);
                        currentAudio.addEventListener('waiting', handleWaiting);
                        currentAudio.addEventListener('error', handleError);


                        document.addEventListener('visibilitychange', () => {
                            if (document.visibilityState === "hidden") {
                                if (!currentAudio.paused) {
                                    wasPlaying = true;
                                    currentAudio.pause();
                                }
                            } else {
                                if (wasPlaying) {
                                    currentAudio.play();
                                    wasPlaying = false; // Reset after resuming
                                }
                            }
                        });                        
                    }
                }

                
            });
        }, { root: null, threshold: 0.5 });

        section[1].querySelectorAll('.template-div').forEach(div => observer.observe(div));
    
    lydiahVideo.muted = isMute;
    muteBtn.innerHTML = isMute ? '&#128264;' : '&#128266;';
    muteBtn
    lydiahVideo.addEventListener('click', () => {
        isPlayingVid = !isPlayingVid;
        playVideo(isPlayingVid);
    });

    function playVideo(state) {
        if(state) {
            lydiahVideo.play();
        }
        else{
            lydiahVideo.pause();
        }

        playVidBtn.innerHTML = state ? '&#10074;&#10074;' : "&#9654;";

        lydiahVideo.ontimeupdate = function () {
            const percent = (lydiahVideo.currentTime / lydiahVideo.duration) * 100;

            progressBar.style.width = `${percent}%`;
        }

        lydiahVideo.addEventListener('stalled', () => showLoading(true));
        lydiahVideo.addEventListener('playing', () => showLoading(false));
        lydiahVideo.addEventListener('waiting', () => showLoading(true));
        lydiahVideo.addEventListener('error', () => location.reload());
        
        lydiahVideo.addEventListener("ended", () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
                isFullscreen = false;
                fullScreenBtn.innerHTML = "&#x26F6;";
            }

            isPlayingVid = false;
            playVidBtn.innerHTML = "&#9654;";
            progressBar.style.width = 0;

        });
        
    }

    playVidBtn.onclick = function (e) {
        e.stopPropagation();
        isPlayingVid = !isPlayingVid;
        playVideo(isPlayingVid)
    }

    muteBtn.onclick = function () {
        isMute = !isMute;

        lydiahVideo.muted = isMute;
        muteBtn.innerHTML = isMute ? '&#128264;' : '&#128266;';
    }

    fullScreenBtn.addEventListener("click", () => {
        isFullscreen = !isFullscreen

        if (!document.fullscreenElement) {
            if (vidContainer.requestFullscreen) {
                vidContainer.requestFullscreen();
            } else if (vidContainer.mozRequestFullScreen) { // Firefox
                vidContainer.mozRequestFullScreen();
            } else if (vidContainer.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                vidContainer.webkitRequestFullscreen();
            } else if (vidContainer.msRequestFullscreen) { // IE/Edge
                vidContainer.msRequestFullscreen();
            }

            vidContainer.requestFullscreen();
            isFullscreen =true;
        } else {
            document.exitFullscreen();
            isFullscreen = false;
        }

        fullScreenBtn.innerHTML = isFullscreen ? "&#x2715;" : "&#x26F6;";

        setTimeout(function() {
            vidContainer.scrollIntoView({behavior:"smooth", block:"center"})
        },2000);

    });

    lydiahVideo.oncontextmenu = (e) => {
        e.preventDefault();
    }

    function defaultBubblePage() {
        const WonderfulNames = [
            { favName: "Bella", favSentiment: "Lydiah, my Bella, the most breathtaking masterpiece ever painted by the hands of fate.", favRead:"sent1.mp3"},
            { favName: "Chérie", favSentiment:   "Lydiah Wambui, your name lingers on my lips like the sweetest melody, a song my heart will hum for eternity.", favRead:"sent2.mp3" },
            { favName: "Amada", favSentiment: "Wambui, Mi Amada, you are the love story my heart has been writing long before we met.",favRead:"sent3.mp3" },
            { favName: "Dulce", favSentiment: "Lydiah, your laughter is the golden sunrise that awakens my heart, a melody that lingers in my soul long after the song has ended.",favRead:"sent4.mp3" },
            { favName: "Luna", favSentiment: "Lydiah Wambui, my Luna, in the vast night sky of my soul, your love is the radiant moonlight that always leads me home.",favRead:"sent5.mp3" },
            { favName: "Mon Amour", favSentiment: "Lydiah, you are the poetry my heart has always longed to write, the forever I never knew I was searching for.",favRead:"sent6.mp3" },
            { favName: "Reina", favSentiment: "Vin Lydez, my queen, your love is the crown I wear proudly over my heart.",favRead:"sent7.mp3" },
            { favName: "Fleur", favSentiment: "Wambui is my delicate flower, blooming with the fragrance of love, beauty, and grace, yet strong enough to weather any storm.",favRead:"sent8.mp3" },
            { favName: "Cielo", favSentiment: "Lydiah you are the infinite sky where my heart takes flight, the quiet serenity where my soul finds rest, and the boundless eternity where love knows no end.",favRead:"sent9.mp3" },
            { favName: "Miel", favSentiment: "Lydiah if I had a thousand lifetimes, I would spend each one falling for you again. If I had a million words, none would ever be enough to capture the depth of what I feel. You are the golden warmth in my days, the soft whisper in my nights, the sweetness my soul will crave for eternity.",favRead:"sent10.mp3" }
        ];
    
        document.getElementById('bubble-container').innerHTML = '';
    
        const uniquePhotos = [...new Set(photos)]; // Remove duplicates

        WonderfulNames.forEach((m, index) => {
            createBubbles(m, uniquePhotos[index % uniquePhotos.length], false); 
        });

    }

    document.getElementById('magicBtn').onclick = function () {
        animOverlay.style.display = 'flex'
        defaultBubblePage();
    };

    
    

    function createBubbles(wn, image, isAnimating, index) {

        const container = document.getElementById('bubble-container');
        const perspectivecontainer = document.querySelector('.photo-container')
    
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.setAttribute('data-index', index);
        
        const myanim = ['fadedown', 'fadeup'];
        
        // Set animation dynamically
        bubble.style.animation = `10s warp infinite, ${myanim[Math.floor(Math.random() * myanim.length)]} 5s ease 0s 1 normal forwards;`;
        
        bubble.innerHTML = `
            <div class="text-div">
                <span id="startBtn">${typeof wn === "object" ? wn.favName : wn}</span>
            </div>`;
    
        bubble.querySelector('.text-div').style.backgroundImage = `url('${image}')`;
    
        container.appendChild(bubble);

        perspectivecontainer.classList.remove('anim');
        container.style.position = 'absolute';
        animVid.style.display = 'none';
    
        if (isAnimating) {

            // Make sure the container has position: relative
            container.style.position = 'relative';
            // Set random position with padding to avoid being too close to the edges
            const padding = 20; // Minimum padding from edges
            const randomTop = Math.random() * (perspectivecontainer.offsetHeight - padding * 2 - 100); // Random Y position (subtract padding and bubble size)
            const randomLeft = Math.random() * (perspectivecontainer.offsetWidth - padding * 2 - 100); // Random X position (subtract padding and bubble size)
    
            // Apply the random position to the bubble
            bubble.style.position = 'absolute'; // Make sure the bubble is positioned absolutely within the container
            bubble.style.top = `${randomTop + padding}px`;  // Add padding to prevent it from going too close to the top
            bubble.style.left = `${randomLeft + padding}px`;  // Add padding to prevent it from going too close to the left

            perspectivecontainer.classList.add('anim');
            animVid.style.display = 'block';
    
            // You can add some animation logic here if you want the bubble to float, bounce, etc.
        }

        else{
            
            bubble.onclick = function() {
                showSentiments(wn);
            }
        }
    }

    let writerId;

    function showSentiments(wn){
        const overlay = document.querySelector('.overlay-sentiment');
        const content = overlay.querySelector('.sentiment-content');
        const  exitBtn = overlay.querySelector('.exit-overlay')

        overlay.style.display = 'flex';
       exitBtn.style.display = 'none';

        const reader = new Audio(wn.favRead);
        setTimeout(function() {
            reader.play();
        },1500)

        clearTimeout(writerId);
        content.textContent = ""; // Reset text before starting
    

        typeWriteEffect(wn.favSentiment, content, Math.floor(reader.duration))

        reader.onended = function () {
            exitBtn.style.display = 'flex';
        }

        exitBtn.onclick = function () {
            overlay.style.display = 'none';
            clearTimeout(writerId);
        }

        overlay.onclick = function() {
            if(reader.ended){
                overlay.style.display = 'none'; 
                clearTimeout(writerId);
            }
        }
    }



    function typeWriteEffect(message, element, dur) {
        let i = 0;
        let speed = dur || 100; // Speed in milliseconds per character
        
    
        // Create the blinking cursor
        let cursor = document.createElement("span");
        cursor.classList.add("blinking-cursor");
        element.innerHTML = ""; // Reset content
        element.appendChild(cursor); // Append cursor first
    
        function type() {
            if (i < message.length) {
                cursor.insertAdjacentText("beforebegin", message.charAt(i));
                i++;
                writerId = setTimeout(type, speed);
                cursor.scrollIntoView({behavior:"smooth", block:"center"})
            }
        }
    
        clearTimeout(writerId); // Prevent overlapping
        type();
    }
    
    

    bubblePlayBtn.onclick = function (){ 
        isPlayingAnim = !isPlayingAnim;

        bubblePlayBtn.innerHTML = isPlayingAnim  ?  '&#10074;&#10074;' : "&#9654;";
        
        if(isPlayingAnim){

            if (animOverlay.requestFullscreen) {
                animOverlay.requestFullscreen();
            } else if (animOverlay.mozRequestFullScreen) { // Firefox
                animOverlay.mozRequestFullScreen();
            } else if (animOverlay.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                animOverlay.webkitRequestFullscreen();
            } else if (animOverlay.msRequestFullscreen) { // IE/Edge
                animOverlay.msRequestFullscreen();
            }

           animVid.currentTime = bubbleSong.currentTime;
            bubbleSong.play();
            animVid.play();
        }
        else{
            bubbleSong.pause();
            animVid.pause();
        }

        showLyricsAndBubbles(isPlayingAnim);

        bubbleSong.onended = function () {
            isPlayingAnim = false;
            bubblePlayBtn.innerHTML = isPlayingAnim  ?  '&#10074;&#10074;' : "&#9654;";
            currentLyricIndex = 0;
            animVid.pause();
            animVid.currentTime = 0;
            showLyricsAndBubbles(isPlayingAnim);
            showLoading(false);
        }

        animVid.addEventListener('timeupdate', () => {
            animVid.currentTime = bubbleSong.currentTime;
        });

        animVid.addEventListener('stalled', () => {
            showLoading(true);
        });

        animVid.addEventListener('playing', () => {
            showLoading(false);
        });
      
    }

    
    bubbleExitBtn.onclick = function () {
        isPlayingAnim = false;
        bubblePlayBtn.innerHTML = isPlayingAnim  ?  '&#10074;&#10074;' : "&#9654;";
        currentLyricIndex = 0;
        animVid.pause();
        bubbleSong.pause();
        bubbleSong.currentTime = 0;
        animVid.currentTime = 0;
        showLyricsAndBubbles(isPlayingAnim);

        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        animOverlay.style.display = 'none';
    }

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            const isDisplayed = window.getComputedStyle(animOverlay).display;

            if(isDisplayed !== "none"){
                isPlayingAnim = false;
                bubblePlayBtn.innerHTML = "&#9654;";
                bubbleSong.pause();
                animVid.pause();
                currentLyricIndex = 0;
                bubbleSong.currentTime = 0;
                animVid.currentTime = 0;
                showLyricsAndBubbles(isPlayingAnim);

                animOverlay.style.display = 'none';
            }
        }
    });

    function showLyricsAndBubbles(state) {
        const container = document.getElementById('bubble-container');
        container.innerHTML = ''; // This removes all existing bubbles from the container

        
        if (timeUpdateListener) {
            bubbleSong.removeEventListener('timeupdate', timeUpdateListener);
        }

         if (state) {
            timeUpdateListener = function () {
                if (currentLyricIndex < lyricForBubbles.length) {
                    const currentLyrics = lyricForBubbles[currentLyricIndex];

                    if (bubbleSong.currentTime >= currentLyrics.start && bubbleSong.currentTime <= currentLyrics.end) {
                        if(!isCurrentLyricShown) {
                            const message = currentLyrics.text;
                            const img = photos[Math.floor(Math.random() * photos.length)];
                            // Remove any previous bubble with the same lyric text
                            const previousBubble = Array.from(document.getElementById('bubble-container').children).find(div => 
                                div.getAttribute("data-index") !== currentLyricIndex
                            );
                            
                            if (previousBubble) {
                                previousBubble.classList.add("exit");
                                setTimeout(() => {previousBubble.remove()}, 1000)
                            }
                           
                            createBubbles(message, img, true);
                            isCurrentLyricShown = true;
                        }
                       
                    }

                    if (bubbleSong.currentTime >= currentLyrics.end) {
                        currentLyricIndex++; // Move to next lyric
                        isCurrentLyricShown = false;
                    }
                }
            };

            bubbleSong.addEventListener('timeupdate', timeUpdateListener);
        } else {
            defaultBubblePage();
        }
        
    }
    
    

});
