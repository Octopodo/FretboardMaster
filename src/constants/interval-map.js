import {Scale, ScaleType, Note, Interval, Pcset} from '@tonaljs/tonal'

const intervalMap = [
  { id: "1P", step:0 },
  { id: "2m", step:1 },
  { id: "2M", step:2 },
  { id: "3m", step:3 },
  { id: "3M", step:4 },
  { id: "4d", step:4 },
  { id: "4P", step:5 },
  { id: "4A", step:6 },
  { id: "5d", step:6 },
  { id: "5P", step:7 },
  { id: "5A", step:8 },
  { id: "6m", step:8 },
  { id: "6M", step:9 },
  { id: "7m", step:10 },
  { id: "7M", step:11 },
  { id: "8P", step:12 }
]


function Intervals(){
  this.init = function() {
    
  },
  this.get = function(){
    return intervalMap
  }
  this.init()
}
export default new Intervals()