const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll('.screen')];
function go(id) { screens.forEach(s => s.classList.toggle('active', s.id === id)); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function modal(title, msg) { $('#modalTitle').textContent = title; $('#modalMessage').textContent = msg; $('#modal').classList.add('show'); }
function closeModal() { $('#modal').classList.remove('show'); }
$('#close').onclick = closeModal; $('#modalOk').onclick = closeModal; $('#modal').addEventListener('click', e => { if (e.target.id === 'modal') closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
$('#homeLink').onclick = e => { e.preventDefault(); go('welcome'); };

$('#yes').onclick = () => { modal('Yaaay! 💜', 'YES barbie sabi ko na e .'); go('questions'); };
$('#no').onclick = () => { $('#tease').textContent = 'Huyyy! Bawal ang NO dito. Try again, pretty girl! 😘'; $('#no').animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-12px)' }, { transform: 'translateX(12px)' }, { transform: 'translateX(0)' }], { duration: 360 }); };
const answers = [null, null, null];
document.querySelectorAll('.choices button').forEach(b => b.addEventListener('click', () => {
    const q = Number(b.dataset.q); answers[q] = b.dataset.a;
    document.querySelectorAll(`.choices button[data-q="${q}"]`).forEach(x => x.classList.toggle('selected', x === b));
    $('#qFeedback').textContent = answers.every(Boolean) ? 'Perfect! You got all three. Ready for your memories? ♡' : 'Nice choice! Answer the other questions too. ♡';
    $('#toPhotos').disabled = !answers.every(Boolean);
}));  
$('#toPhotos').onclick = () => { photoIndex = 0; showPhoto(); go('memories'); };
let photoIndex = 0;
const photos = ['assets/photos/photo1.jpg', 'assets/photos/photo2.jpg', 'assets/photos/photo3.jpg'];
const captions = ['One of my favorite moments with you ♡', 'A memory I want to keep forever 💜', 'More beautiful memories with my favorite person ✨'];
function showPhoto() { const img = $('#memoryPhoto'); img.onerror = () => { img.onerror = null; img.src = 'assets/photos/placeholder.svg'; }; img.src = photos[photoIndex]; $('#memoryCaption').textContent = captions[photoIndex];[...$('#photoDots').children].forEach((d, i) => d.classList.toggle('on', i === photoIndex)); }
$('#nextPhoto').onclick = () => { if (photoIndex < 2) { photoIndex++; showPhoto(); } else go('birthday'); };
$('#toWish').onclick = () => go('wish');
$('#saveWish').onclick = () => { const v = $('#wishText').value.trim(); if (!v) { $('#wishFeedback').textContent = 'Write your wish first, birthday love. ♡'; return; } $('#wishFeedback').textContent = 'Your wish has been sent to the stars. ✨'; modal('Wish granted in my heart 🌙', '“' + v + '” itong message mong to isesend ko kay lord.'); setTimeout(() => go('candle'), 450); };
$('#blow').onclick = () => { const off = $('#flame').classList.toggle('off'); $('#candleText').textContent = off ? 'Yaaay! Your wish is on its way! ✨' : 'Make a wish, then blow your candle!'; $('#blow').textContent = off ? 'Relight candle' : '✨ Blow the candle'; if (off) { modal('Happy birthday, my love! 🎂', 'May this year bring you endless happiness, good health, dahil deserved mo lahat yan love ko.'); setTimeout(() => go('portrait'), 900); } };
$('#toLetter').onclick = () => go('letter'); $('#toGifts').onclick = () => go('gifts');
let chosen = false;
const giftDetails = {
    makeup: {
        title: 'Yay! Makeup ang pinili mo! 💄',
        photo: 'assets/photos/make%20up.jpg',
        message: 'Sana magustuhan mo ang little surprise ko, Love! Deserve mong ma-spoil at mapasaya. Happy birthday, mahal ko! ❤️'
    },
    chocolate: {
        title: 'Yay! Pinerana ni Idol! ',
        photo: 'assets/photos/chocolates.jpg',
        message: 'PLAY MONEY TO HAHAAHHAHA joke, Sana mapasaya ka nito kahit papaano at bilhin mo gusto mo. Happy birthday, Love! ❤️'
    }
};
document.querySelectorAll('.gift').forEach(btn => btn.addEventListener('click', () => {
    if (chosen) return;
    chosen = true;
    const gift = giftDetails[btn.dataset.gift];
    btn.classList.add('chosen');
    document.querySelectorAll('.gift').forEach(x => {
        x.disabled = true;
        if (x !== btn) x.classList.add('not-chosen');
    });
    $('#giftFeedback').textContent = 'Pinili mo ang ' + (btn.dataset.gift === 'makeup' ? 'MAKEUP 💄' : 'CHOCOLATE 🍫') + '! Heto ang surprise mo, Love. ♡';
    $('#giftRevealTitle').textContent = gift.title;
    $('#giftRevealPhoto').src = gift.photo;
    $('#giftRevealPhoto').alt = btn.dataset.gift === 'makeup' ? 'Makeup gift' : 'Chocolate gift';
    $('#giftRevealMessage').textContent = gift.message;
    $('#giftReveal').hidden = false;
    $('#giftReveal').scrollIntoView({ behavior: 'smooth', block: 'center' });
    $('#finish').hidden = false;
}));
$('#finish').onclick = () => modal('I love you, Love! 💜', 'Thank you for choosing your gift! Kahit ano pa ang piliin mo, deserve mong mapasaya at ma-spoil. Happy birthday ulit, mahal ko!');
const audio = $('#audio');
$('#chooseMusic').onclick = () => $('#musicFile').click();
$('#musicFile').onchange = e => { const f = e.target.files[0]; if (!f) return; audio.src = URL.createObjectURL(f); audio.play().then(() => $('#playMusic').textContent = 'Ⅱ').catch(() => $('#playMusic').textContent = '▶'); };
$('#playMusic').onclick = () => { if (!audio.src) { $('#musicFile').click(); return; } if (audio.paused) { audio.play(); $('#playMusic').textContent = 'Ⅱ'; } else { audio.pause(); $('#playMusic').textContent = '▶'; } };
audio.onpause = () => $('#playMusic').textContent = '▶';
const stars = $('.stars'); for (let i = 0; i < 45; i++) { let s = document.createElement('i'); s.textContent = Math.random() > .5 ? '✦' : '·'; s.style.cssText = `position:fixed;left:${Math.random() * 100}vw;top:${Math.random() * 100}vh;color:#f4c5ff;opacity:${.2 + Math.random() * .6};font-size:${8 + Math.random() * 15}px;pointer-events:none;z-index:-1;animation:twinkle ${2 + Math.random() * 4}s ease-in-out infinite alternate`; stars.appendChild(s); }
const st = document.createElement('style'); st.textContent = '@keyframes twinkle{to{opacity:.08;transform:scale(.55)}}'; document.head.appendChild(st);
