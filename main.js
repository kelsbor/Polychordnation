// function to generate all possible combinations of chords.

/* TODO LIST
1. Trasponse Function OK
2. Add degrees OK
3. Add qualities of chords (Next) OK
4. Add inversions function Maybe - Nah
5. Display Everything right on the keyboard... OK
    5.1 Display upper chord in the keyboard... OK
6. Use OOP code... OK
*/

//Class for Piano Keyboard
class Piano {
    constructor() {
        //Each note corresponds to a number in the keyboard (C central is 0)
        this.noteNames={
            0: 'C',
            1: 'C#',
            2: 'D',
            3: 'D#',
            4: 'E',
            5: 'F',
            6: 'F#',
            7: 'G',
            8: 'G#',
            9: 'A',
            10: 'A#',
            11: 'B',
            12: 'C2',
            13: 'C#2',
            14: 'D2',
            15: 'D#2',
            16: 'E2',
            17: 'F2',
            18: 'F#2',
            19: 'G2',
            20: 'G#2',
            21: 'A2',
            22: 'A#2',
            23: 'B2'
        }
    }

    //Clean keyboard keys before painting it again
    resetKeys() {
        document.querySelectorAll('rect').forEach(key => 
            key.setAttribute('fill', key.id.includes('#') ? 'black' : 'white'))
    }

    //Paint keys in the SVG Keyboard
    displayNotes(polychord) {
        this.resetKeys()

        //Get polychord object base and upper chords
        const baseNotes = polychord.base.selectedChord
        const upperNotes = polychord.upper.selectedChord

        console.log(baseNotes)
        console.log(upperNotes)
        // Highlight the keys corresponding to the chord
        baseNotes.forEach(noteIndex => {
            const noteName = this.noteNames[noteIndex] //Get the name of each note
            console.log(noteName)
            const keyElement = document.getElementById(noteName) // Get the SVG element by ID
            console.log(keyElement)
            if (keyElement) {
                keyElement.setAttribute('fill', 'blue') // Change the color of the select note in Piano 
            }
        });

        //repeat process for upper chord
        upperNotes.forEach(noteIndex => { 
            const noteName = this.noteNames[noteIndex]
            console.log(noteIndex)
            const keyElement = document.getElementById(noteName); // Get the SVG element by ID
            console.log(keyElement)
            if (keyElement) {
                keyElement.setAttribute('fill', 'green'); // Change the color of the select note in Piano
            }
        });
    }
}

//create piano object
const piano = new Piano()

//Audio Player 
class AudioPlayer {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    async loadNoteAudio(noteFile) {
        const response = await fetch(noteFile);
        const arrayBuffer = await response.arrayBuffer();
        this.audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
    }

    playSound(pitchShift = 0) {
        const soundSource = this.audioContext.createBufferSource();
        soundSource.buffer = this.audioBuffer;
        
        // Change pitch using detune (shift in cents)
        soundSource.detune.value = pitchShift;  // Use cents, 100 cents = 1 semitone
        
        soundSource.connect(this.audioContext.destination);
        soundSource.start(0);
    }
}

//Class for Chords
class Chord {
    constructor(functionalName, chordQuality, key) {
        //Equivalent notes for each degree
        this.functional_chords = {
            "I": [0,4,7],
            "bII": [1,5,8],
            "II": [2,6,9],
            "bIII": [3,7,10],
            "III": [4,8,11],
            "IV": [5,9,12],
            "bV": [6,10,13],
            "V": [7,11,14],
            "bVI": [8,12,15],
            "VI": [9,13,16],
            "bVII": [10,14,17],
            "VII": [11,15,18]
        }

        //Map the Key name and index
        this.keys ={
            'C': 0,
            'C#':1,
            'D': 2,
            'D#': 3,
            'E': 4,
            'F': 5,
            'F#': 6,
            'G': 7,
            'G#': 8,
            'A': 9,
            'A#': 10,
            'B': 11
        }


        //Selected Key, Function, Quality, SelectedChord
        this.functionalName = functionalName
        this.key = key
        this.chordQuality = chordQuality
        this.selectedChord = this.functional_chords[this.functionalName]
        
        console.log(this.chordQuality)
    }

    
    addQualities() {
        switch (this.chordQuality) {
            //Add the logic for each type of chord (adding 7th, +5, 7b, etc)
            case 'major':
                break
            
            case 'minor':
                this.selectedChord[1] = this.selectedChord[1] - 1
                console.log('Modified chord:', this.selectedChord);
                break

            case 'diminished':
                this.selectedChord[1] = this.selectedChord[1] - 1
                this.selectedChord[2] = this.selectedChord[2] - 1
                break

            case 'augmented':
                this.selectedChord[2] = this.selectedChord[2] + 1
                break

            case 'major7':
                this.selectedChord.push(this.selectedChord[0] + 11)
                break

            case 'major7aug':
                this.selectedChord[2] = this.selectedChord[2] + 1
                this.selectedChord.push(this.selectedChord[0] + 11)
                break

            case 'minor7':
                this.selectedChord[1] = this.selectedChord[1] - 1
                this.selectedChord.push(this.selectedChord[0] + 10)
                break

            case 'minormaj7':
                this.selectedChord[1] = this.selectedChord[1] - 1
                this.selectedChord.push(this.selectedChord[0] + 11)
                break

            case 'dom7':
                this.selectedChord.push(this.selectedChord[0] + 10)
                break

            case 'dom7aug':
                this.selectedChord[2] = this.selectedChord[2] + 1
                this.selectedChord.push(this.selectedChord[0] + 10)
                break
            
            case 'half-diminished':
                this.selectedChord[1] = this.selectedChord[1] - 1
                this.selectedChord[2] = this.selectedChord[2] - 1
                this.selectedChord.push(this.selectedChord[0] + 10)
                break

            case 'fully-diminished':
                this.selectedChord[1] = this.selectedChord[1] - 1
                this.selectedChord[2] = this.selectedChord[2] - 1
                this.selectedChord.push(this.selectedChord[0] + 9)
                break
                
            default:
                console.error('Unknown chord quality')
        }
        
    }
    
   
    transpose(octave) {
        const keyRoot = this.keys[this.key];
        this.selectedChord = this.selectedChord.map(note => (note + keyRoot) % 12 + 12*octave);
    }
}

//Joint the two chords
class Polychord {
    constructor(baseChord, upperChord) {
        this.base = baseChord
        this.upper = upperChord
    }
}

async function playChord(polychord, playMode) {
    const audioPlayer = new AudioPlayer();

    // Load a single audio sample (e.g., C4)
    await audioPlayer.loadNoteAudio("sounds/C4.mov");

    // Polychord Notes
    const baseNotes = polychord.base.selectedChord
    const upperNotes = polychord.upper.selectedChord
    console.log(playMode)

    if (playMode == 'Chord') {
        //Note *100 to shift in cents.
        baseNotes.forEach(note => {
            audioPlayer.playSound(note*100)
        });

        upperNotes.forEach(note => {
            audioPlayer.playSound(note*100)
        });

    }
    if (playMode == 'Arpeggio') {
        let time = 0
        baseNotes.forEach(note => {
            setTimeout(() => audioPlayer.playSound(note*100), time*100)
            time += 1
        });

        upperNotes.forEach(note => {
            setTimeout(() => audioPlayer.playSound(note*100), time*100)
            time += 1
        });
    }
}

//Executed when the Generate button is activated
function generateChord() {
    const selectedKey = document.getElementById("keys").value;

    //degree and quality of base chord
    const selectedBase = document.getElementById("base").value;
    const selectedType1 = document.getElementById("typeBase").value;

    //degree and quality of second chord
    const selectedUpper = document.getElementById("upper").value;
    const selectedType2 = document.getElementById("typeUpper").value

    //Create two Chord objects
    const baseChord = new Chord(selectedBase,selectedType1, selectedKey)
    const upperChord = new Chord(selectedUpper, selectedType2, selectedKey)

    //Configs
    const sound = document.getElementById('sound').checked
    const playMode = document.querySelector('input[name="playMode"]:checked').value

    //Call the methods for each chord
    baseChord.addQualities()
    baseChord.transpose(0)
    upperChord.addQualities()
    upperChord.transpose(1)

    //Create the Polychord object
    const polychord = new Polychord(baseChord, upperChord)

    //Display notes on Piano
    piano.displayNotes(polychord)

    //Play the notes
    console.log(sound)
    console.log(playMode)
    if (sound == true) {
       playChord(polychord, playMode)
    }
} 