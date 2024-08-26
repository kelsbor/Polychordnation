// First we need to define style and user interface (chord input, graphical representation)
// Different colors for different chords.
// We are going to store the chords in arrays of numbers.
// function to generate all possible combinations of chords.

// 1. Lets define how we are going to add chords..
// We going to use three selectors: First chord, second chord, Key Tone. + inversion button.

/* TODO LIST
1. Trasponse Function OK
2. Add degrees OK
3. Add qualities of chords
4. Add inversions function
5. Display Everything right on the keyboard...
*/

console.log('i am here')
const functional_chords = {
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

const keys ={
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
function transpose(chordIntervals, key) {
    const keyRoot = keys[key];
    return chordIntervals.map(interval => (interval + keyRoot) % 12);
}

function generatePolychord(base, upper, key){
    const baseChord = transpose(functional_chords[base],key)
    const upperChord = transpose(functional_chords[upper],key)

    return polychord = {
        'base': baseChord,
        'upper': upperChord
    }
     
function highlightPolychord(polychord) {
  
    // Reset all keys to default color
    document.querySelectorAll('rect').forEach(key => key.setAttribute('fill', key.id.includes('sharp') ? 'black' : 'white'));
    
    const notes = polychord.base
    // Highlight the keys corresponding to the chord
    notes.forEach(noteIndex => {
        const noteName = notes[noteIndex];
        const keyElement = document.getElementById(noteName); // Get the SVG element by ID
        if (keyElement) {
        keyElement.setAttribute('fill', 'blue'); // Change color to blue to indicate it's part of the chord
        }
    });
}


}
function generateChord() {
    const selectedKey = document.getElementById("keys").value;

    //degree and quality of base chord
    const selectedBase = document.getElementById("base").value;
    const selectedType1 = document.getElementById("typeBase").value;

    //degree and quality of second chord
    const selectedUpper = document.getElementById("upper").value;
    const selectedType2 = document.getElementById("typeUpper").value

    const polychord = generatePolychord(selectedBase, selectedUpper, selectedKey);
    highlightPolychord(polychord)
    console.log(polychord)
} 