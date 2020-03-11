const tunnings = {
  standart:[
    {tone:'E', oct: 4, fret: 0},
    {tone:'B', oct: 3, fret: 0},
    {tone:'G', oct: 3, fret: 0},
    {tone:'D', oct: 3, fret: 0},
    {tone:'A', oct: 2, fret: 0},
    {tone:'E', oct: 2, fret: 0}, 
  ]
}

export default function(newTunning, newFrets, scale) {
  const frets = newFrets;
  const tunning = newTunning instanceof Array? newTunning : tunnings[newTunning.toLowerCase()];
  var intervals = scale.chromatic
  var fretboard = [];

  this.getFrets = function() {
    return frets
  }

  this.getStrings= function() {
    return tunning.length
  }

  this.matrix = function() {
    return fretboard
  }

  this.tunning = function() {
    return tunning
  }

  this.generate = function(intervals) {
    let f = fretboard
    for(var t = 0; t < tunning.length; t++) {
      let tune = tunning[t]
      let string = [tune];
      let oct = tune.oct;
      let fret = intervals.indexOf(tune.tone);
      let i = 0;
      while(i < frets) {
        fret++
        oct =  fret >= intervals.length ? oct + 1 : oct
        fret = fret >= intervals.length ? 0 : fret;
        string.push({tone: intervals[fret], oct: oct, fret: i + 1});
        i++
      }
      fretboard.push(string);
    }
  }
  this.generate(intervals)
}