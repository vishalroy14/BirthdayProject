const $ = s => document.querySelector(s);
const heartsLayer = $('#hearts-layer');
const balloonsLayer = $('#balloons-layer');

/* ❤️ Heart Rain */
function createHeart(){
  const heart = document.createElement('div');
  heart.className = 'small-heart';
  heart.textContent = '💖';
  heart.style.left = Math.random()*100 + 'vw';
  heart.style.top = Math.random()*20 + 'vh';
  heartsLayer.appendChild(heart);
  setTimeout(()=>heart.remove(),6000);
}
function startHeartRain(count=30){ for(let i=0;i<count;i++) setTimeout(createHeart,i*150); }

/* 🎈 Balloon Rain */
function createBalloon(){
  const balloon = document.createElement('div');
  balloon.className = 'balloon';
  const emojis = ['🎈','🎉','🎊','🎁'];
  balloon.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  balloon.style.left = Math.random()*100 + 'vw';
  balloon.style.bottom = '-5vh';
  balloonsLayer.appendChild(balloon);
  setTimeout(()=>balloon.remove(),6000);
}
function startBalloonRain(count=25){ for(let i=0;i<count;i++) setTimeout(createBalloon,i*200); }

/* 🎁 Gift Boxes */
if($('#gifts-grid')){
  const giftGrid = $('#gifts-grid');
  const giftMsg = $('#gift-msg');
  const quotes = [
    "You’ll Always Share With Me When You’re Upset",
    "Talk To Me whenever something Bothers You, I Promise I’ll Listen.",
    "You’ll Never Carry Your Worries Alone, I’M Always With You",
    "Whenever Your Heart Feels Heavy, Come To Me, I’ll Hold It Gently",
    "I Promise To Make You Smile Always."
  ];

  // Big first box
  const bigBox = document.createElement('div');
  bigBox.className = 'gift-box big';
  bigBox.textContent = 'TAP';
  // Create audio element
   const audio = document.getElementById('bgAudio');
   audio.play();

  bigBox.addEventListener('click', async () => {
  if (bigBox.classList.contains('opened')) return;
  bigBox.classList.add('opened');

  // Try playing audio

  startHeartRain(60);

  let i = 0;
  const showQuotes = setInterval(() => {
    giftMsg.innerHTML = `<div style="font-weight:700;color:var(--accent)">${quotes[i]}</div>`;
    i++;
    if (i === quotes.length) {
      clearInterval(showQuotes);
      $('#love-ask').style.display = 'block';
    }
  }, 2000);
});

  giftGrid.appendChild(bigBox);
}

/* 💕 Accept & Video */
$('#accept-btn')?.addEventListener('click', ()=>{
  const audio = document.getElementById('bgAudio');
  audio.pause();
  $('#love-ask').style.display='none';
  $('#accept-video-wrap').classList.add('active');
  const vid = $('#accept-video');
  vid.play().catch(()=>{});
  vid.onended = ()=>{
    $('#accept-video-wrap').classList.remove('active');
    $('#cake-area').style.display='flex';
    startHeartRain(40);
    new Audio('assets/sounds_effect/cake_song.mp3').play().catch(()=>{});
    const nextBtn = document.querySelector('.next');
    if(nextBtn) nextBtn.disabled = false;
  };
});

/* 🎂 Cake + Knife Interaction */
const knife = $('#knife');
const cakeArea = $('#cake-area');

function celebrate(){
  startHeartRain(80);
  startBalloonRain(40);
  const txt = document.createElement('div');
  txt.className = 'hb-text';
  txt.innerHTML = 'Happy Birthday Preeti, Stay Pretty Always🫀';
  document.body.appendChild(txt);
  setTimeout(()=>txt.remove(),5000);
}

if(knife && cakeArea){
  knife.addEventListener('dragstart', e => e.dataTransfer.setData('text/plain','knife'));
  cakeArea.addEventListener('dragover', e => e.preventDefault());
  cakeArea.addEventListener('drop', e=>{
    e.preventDefault();
    if(e.dataTransfer.getData('text/plain')==='knife') celebrate();
  });
  // Touchscreen support
  knife.addEventListener('touchstart', e=>{
    e.preventDefault();
    knife.dataset.dragging='true';
  });
  document.addEventListener('touchmove', e=>{
    if(knife.dataset.dragging==='true'){
      const touch = e.touches[0];
      knife.style.position='fixed';
      knife.style.left = touch.clientX+'px';
      knife.style.top = touch.clientY+'px';
    }
  });
  document.addEventListener('touchend', e=>{
    if(knife.dataset.dragging==='true'){
      knife.dataset.dragging='false';
      const cakeRect = $('#cake').getBoundingClientRect();
      const x = parseInt(knife.style.left), y = parseInt(knife.style.top);
      if(x>cakeRect.left && x<cakeRect.right && y>cakeRect.top && y<cakeRect.bottom){
        celebrate();
      }
      knife.style.position='static';
    }
  });
}
