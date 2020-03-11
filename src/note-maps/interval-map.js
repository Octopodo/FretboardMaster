const intervalMap = [
  { id: "tonic", name:"Tónica", steps:0, visible: true, color:'#F44336'},
  { id: "minr2", name:"Segunda Menor", steps:1, visible: false, color:'#E91E63'},
  { id: "maj2", name:"Segunda Mayor", steps:2, visible: false, color: '#9C27B0'},
  { id: "min3", name:"Tercera Menor", steps:3, visible: false, color: '#673AB7'},
  { id: "maj3", name:"Tercera Mayor", steps:4, visible: false, color: '#3F51B5'},
  { id: "perf4", name:"Cuarta Justa", steps:5, visible: false, color: '#2196F3'},
  { id: "aug4", name:"Cuarta Aumentada::Quinta Disminuida", steps:6, visible: false, color: '#03A9F4'},
  { id: "perf5", name:"Quinta Justa", steps:7, visible: false, color: '#00BCD4'},
  { id: "aug5", name:"Quinta Aumentada::Sexta Menor", steps:8, visible: false, color: '#009688'},
  { id: "maj6", name:"Sexta Mayor::Séptima Disminuida", steps:9, visible: false, color: '#4CAF50'},
  { id: "min7", name:"Séptima Menor", steps:10, visible: false, color: '#8BC34A'},
  { id: "maj7", name:"Séptima Mayor", steps:11, visible: false, color: '#CDDC39'},
  // { id: "oct", name:"Octava", steps:"12", visible: false, color: '#F44336'},
]

export default {
  map: intervalMap
}