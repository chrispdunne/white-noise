
const audioContext = new AudioContext();
const bufferSource = audioContext.createBufferSource();

const lowPassFilter = audioContext.createBiquadFilter();
lowPassFilter.type = 'lowpass';
lowPassFilter.frequency.value = 500; 

const bufferSize = audioContext.sampleRate * 2; // 2 seconds buffer
const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
const output = buffer.getChannelData(0);

for (let i = 0; i < bufferSize; i++) {
  output[i] = Math.random() * 2 - 1;
}

let init = false;

document.querySelector('button').addEventListener('click', (e) => {

    const btn = e.target;

    if (!init) {
        bufferSource.buffer = buffer;
        bufferSource.loop = true;
        bufferSource.connect(audioContext.destination);
        bufferSource.connect(lowPassFilter);
        lowPassFilter.connect(audioContext.destination);

        init = true;
        bufferSource.start();
        console.log("start");
        btn.classList.add('on');
        btn.innerHTML = "Stop";
    } else {
        if (btn.classList.contains('on')) {
            bufferSource.disconnect();
            console.log("stop");
            btn.classList.remove('on');
            btn.innerHTML = "Start";
        } else {
            bufferSource.connect(audioContext.destination);
            console.log("start");
            btn.classList.add('on');
            btn.innerHTML = "Stop";
        }
    }
});

