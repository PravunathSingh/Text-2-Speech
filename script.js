// Init Speech Synthesis API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init Voices array
let voices = [];

const getVoices = () => {
    voices = synth.getVoices(); 

    //loop through voices and create an option for each voice
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = `${voice.name} (${voice.lang})`;

        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        
        voiceSelect.appendChild(option);
    })
}

getVoices();
if(synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

const speak = () => {
    body.style.background = '#141414 url(../resources/wave.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 93%';

    // Check if speaking
    if(synth.speaking) {
        console.error('Already speaking...');
        return;
    }
    if(textInput.value !== '') {
        // Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);
        
        // speak end
        speakText.onend = e => {
            console.log('Done speaking...');
            body.style.background = '#141414';
        }

        // speak error
        speakText.onerror = e => {
            console.error('Something went wrong!!!!');
        }

        // selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        voices.forEach(voice => {
            if(voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        })

        // set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // speak
        synth.speak(speakText);
    }
}

// event listeners
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});

rate.addEventListener('change', e => {
    rateValue.textContent = rate.value
});

pitch.addEventListener('change', e => {
    pitchValue.textContent = pitch.value
});

voiceSelect.addEventListener('change', e => {
    speak();
});