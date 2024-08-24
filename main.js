// First we need to define style and user interface (chord input, graphical representation)
// Different colors for different chords.
// We are going to store the chords in arrays of numbers.
// function to generate all possible combinations of chords.

// 1. Lets define how we are going to add chords..
// We going to use three selectors: First chord, second chord, Key Tone. + inversion button.

const functional_chords = {
    "I": [0,4,7],
    "ii": [2,5,9]
    
}

const keys ={
    'C': 0,
    'C#':1,
    'Db': 1,
    'D': 2,
    'D#': 3,
    'Eb': 3,
    'E': 4,
    'F': 5,
    'F#': 6,
    'Gb': 6,
    'G': 7,
    'G#': 8,
    'Ab': 8,
    'A': 9,
    'A#': 10,
    'Bb': 10,
    'B': 11
}
function transpose(chordIntervals, key) {
    const keyRoot = keys[key];
    return chordIntervals.map(interval => (interval + keyRoot) % 12);
}

function generatePolychord(chord1, chord2, key){
    const base = transpose(functional_chords[chord1],key)
    const upper = transpose(functional_chords[chord2],key)
    return polychord = {
        'base': base,
        'upper': upper
    }
     
}
function generateChord() {
    const selectedKey = document.getElementById("key").value;
    const selectedChord1 = document.getElementById("chord1").value;
    const selectedChord2 = document.getElementById("chord2").value
    const result = generatePolychord(selectedChord1, selectedChord2, selectedKey);
    console.log(result)
} 