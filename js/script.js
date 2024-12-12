navigator.requestMIDIAccess()
  .then(onMIDISuccess, onMIDIFailure);

function onMIDISuccess(midiAccess) {
  midiAccess.inputs.forEach((input)=> {
    input.onmidimessage = MIDIDrumHit;
    
  }) 
}

function onMIDIFailure() {
  console.log('Could not access your MIDI devices.');
}

function onMIDIMessage(event) {
    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    for (const character of event.data) {
      str += `0x${character.toString(16)} `;
    }
    //console.log(str);
    // console.log(event.data[0])
}
  
function startLoggingMIDIInput(midiAccess) {
    midiAccess.inputs.forEach((entry) => {
        entry.onmidimessage = onMIDIMessage;
    });
}


function MIDIDrumHit(message) {
    note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;
    //console.log(note)
    if (message.data[0] == 128) {
        return;
    }
    if (velocity < 32) {
        return;
    }
    if (note == 36) {

        drum = document.getElementById('kick');
        if(drum.classList.contains("playing")) return;
        drum.classList.add("playing");
        justPressed(drum);
        new Audio(`sounds/${drum.id}.wav`).play();
        setTimeout(()=>drum.classList.remove("playing"), 30);
    }
    if (note == 37) {
        drum = document.getElementById('snare');
        if(drum.classList.contains("playing")) return;
        drum.classList.add("playing");
        justPressed(drum);
        new Audio(`sounds/${drum.id}.wav`).play();
        setTimeout(()=>drum.classList.remove("playing"), 30);
    }
    if (note == 38) {
        drum = document.getElementById('hat');
        if(drum.classList.contains("playing")) return;
        drum.classList.add("playing");
        justPressed(drum);
        new Audio(`sounds/${drum.id}.wav`).play();
        setTimeout(()=>drum.classList.remove("playing"), 30);
    }

}


function justPressed(elem) {
    elem.classList.add("just-pressed");
    setTimeout(()=>{elem.classList.remove("just-pressed")}, 50)
}
Array.from(document.querySelectorAll('.drumpad')).forEach((drum)=> {
    drum.addEventListener("click", (e)=>  {
        e.preventDefault;
        justPressed(drum)
        new Audio(`sounds/${drum.id}.wav`).play();
    })
})

document.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if (e.key == 'a') {
        drum = document.getElementById('kick')
        justPressed(drum);
        new Audio(`sounds/${drum.id}.wav`).play();
    }
})

document.addEventListener('keydown', (e) => {
    if (e.key == 's') {
        drum = document.getElementById('snare')
        justPressed(drum)
        new Audio(`sounds/${drum.id}.wav`).play();
    }
})

document.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if (e.key == 'd') {
        drum = document.getElementById('hat')
        justPressed(drum)
        new Audio(`sounds/${drum.id}.wav`).play();
    }
})


 




