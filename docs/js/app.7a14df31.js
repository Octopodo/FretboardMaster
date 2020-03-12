(function(t){function e(e){for(var r,a,s=e[0],c=e[1],l=e[2],f=0,d=[];f<s.length;f++)a=s[f],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&d.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);u&&u(e);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,s=1;s<n.length;s++){var c=n[s];0!==o[c]&&(r=!1)}r&&(i.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={app:0},i=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/fretboard-generator/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],c=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var u=c;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"029a":function(t,e,n){},"21d3":function(t,e,n){"use strict";var r=n("7ba4"),o=n.n(r);o.a},"272a":function(t,e,n){"use strict";var r=n("fc74"),o=n.n(r);o.a},"2e47":function(t,e,n){"use strict";var r=n("84ff"),o=n.n(r);o.a},"32e5":function(t,e,n){"use strict";var r=n("cf9d"),o=n.n(r);o.a},"53fd":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{attrs:{id:"app"}},[n("fretboard-content")],1)},i=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",[n("v-col",{attrs:{cols:"2"}},[n("scale-selector")],1),n("v-col",{attrs:{xs:"10"}},[n("fretboard",{staticClass:"fretboard"}),n("tone-selector",{staticClass:"tone-selector"}),n("div",{staticClass:"divider"}),n("options")],1)],1)],1)},s=[],c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(t.stringCount,(function(e,r){return n("div",{key:r,staticClass:"string-container mt-0"},[n("fretboard-string",{attrs:{top:0==r,bottom:r==t.stringCount-1,stringIndex:r}})],1)})),0)},l=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"string"},t._l(t.fretCount,(function(e,r){return n("fret",{key:r,attrs:{hidden:0==r,stringIndex:t.stringIndex,index:r,top:t.top,bottom:t.bottom}})})),1)},f=[],d=(n("a9e3"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"fret-group"},[n("fret-tone",{staticClass:"fret-tone",attrs:{index:t.index,stringIndex:t.stringIndex,root:t.root}}),t.top||t.hidden?n("div",[n("div",{staticClass:"fret hidden-fret"}),n("div",{staticClass:"diapason hidden-fret"}),n("div",{staticClass:"fret hidden-fret"})]):n("div",{staticClass:"fret-container"},[n("div",{staticClass:"fret fret-color"}),n("div",{staticClass:"diapason diapason-color"}),n("div",{staticClass:"fret fret-color"})]),t.hidden?n("div",[n("div",{staticClass:"string hidden"})]):n("div",[n("div",{staticClass:"string string-color"})]),t.bottom||t.hidden?n("div",[n("div",{staticClass:"fret hidden-fret"}),n("div",{staticClass:"diapason hidden-fret"}),n("div",{staticClass:"fret hidden-fret"})]):n("div",{staticClass:"fret-container"},[n("div",{staticClass:"fret fret-color"}),n("div",{staticClass:"diapason diapason-color"}),n("div",{staticClass:"fret fret-color"})])],1)}),v=[],p=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"scale-transition"}},[t.visible?n("div",{staticClass:"fret"},[n("div",{ref:"fret",staticClass:"tone-background principal",class:t.computedClass,style:t.computedStyle,on:{click:function(e){return e.preventDefault(),t.select()}}},[n("div",{staticClass:"tone white--text"},[t._v(" "+t._s(t.fret.tone)+" ")])])]):t._e()])},m=[],h=(n("d3b7"),n("25f0"),{props:{index:{type:Number,default:0},stringIndex:{type:Number,default:void 0},root:{type:Boolean,default:!1}},computed:{fret:function(){return this.$store.getters["tone/fretTone"](this.index,this.stringIndex)},visible:function(){return!!this.root||this.$store.getters["tone/toneIsVisible"](this.fret.tone,this.index,this.stringIndex)},computedStyle:function(){return{backgroundColor:this.harmonicColor}},computedClass:function(){return{"selected-fret":this.isSelected}},harmonicColor:function(){return this.$store.getters["tone/getHarmonicColor"](this.fret.tone)+"!important"}},data:function(){return{isSelected:!1,id:this.stringIndex.toString()+"-"+this.index.toString(),toneData:""}},created:function(){},methods:{select:function(){this.isSelected=!this.isSelected}}}),g=h,b=(n("21d3"),n("2877")),S=Object(b["a"])(g,p,m,!1,null,"5b882ddb",null),C=S.exports,x={components:{FretTone:C},props:{top:{type:Boolean,default:!1},bottom:{type:Boolean,default:!1},marker:{type:String,default:void 0},hidden:{type:Boolean,default:!1},tone:{type:String,default:""},index:{type:Number,default:0},stringIndex:{type:Number,default:0},root:{type:Boolean,default:!1}},methods:{edge:function(t){return"top"==t?!!this.top:"bottom"==t&&!!this.bottom}}},T=x,y=(n("70e5"),Object(b["a"])(T,d,v,!1,null,"1df5208f",null)),_=y.exports,O={components:{Fret:_},props:{stringIndex:{type:Number,default:void 0},top:{type:Boolean,default:!1},bottom:{type:Boolean,default:!1}},computed:{tuning:function(){return this.$store.getters["tone/tunning"](this.stringIndex)}},data:function(){return{fretCount:20}},methods:{fretTone:function(){}}},E=O,k=Object(b["a"])(E,u,f,!1,null,"1832dddb",null),w=k.exports,I={components:{FretboardString:w},computed:{scale:function(){return this.$store.state.tone.currentScale.notes}},data:function(){return{stringCount:6}},created:function(){this.$store.commit("tone/SET_POSITIONS")},methods:{stringTone:function(t){return this.$store.getters["tone/stringTunning"](t)}}},N=I,P=(n("272a"),Object(b["a"])(N,c,l,!1,null,"81828f9a",null)),F=P.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-treeview",{staticClass:"custom-treeview",attrs:{activatable:"",dense:"",active:[t.active],hoverable:!0,items:t.scales},on:{"update:active":t.changeScale}})],1)},$=[],j={props:{group:{type:String,default:""}},computed:{scales:function(){return this.$store.state.tone.scales},active:function(){return this.$store.state.tone.currentScaleId}},data:function(){return{currentTone:0,openedGroups:["main"]}},methods:{changeScale:function(t){this.$store.dispatch("tone/setCurrentScale",t[0])},getOpenedGroups:function(t){}}},A=j,D=(n("32e5"),n("6544")),R=n.n(D),B=n("eb2a"),L=Object(b["a"])(A,M,$,!1,null,"268cd20d",null),V=L.exports;R()(L,{VTreeview:B["a"]});var U=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",{staticClass:"grey lighten-2 pl-6"},[n("v-col",{staticClass:"pl-0",attrs:{cols:"3"}},[n("v-row",{staticClass:"mb-0"},[n("v-col",{staticClass:"pb-0",attrs:{cols:"4"}},[t._v(" INTERVALOS ")]),n("v-col",{staticClass:"d-flex align-start pb-0"},[n("v-switch",{staticClass:"ml-0 mt-0",attrs:{dense:"",label:"Ocultar no marcadas"},model:{value:t.hideUnmarkedNotes,callback:function(e){t.hideUnmarkedNotes=e},expression:"hideUnmarkedNotes"}})],1)],1),n("interval-selector",{staticClass:"mb-12 ml-6"})],1),n("v-col",{staticClass:"mt-4",attrs:{cols:"3"}},[n("div",{staticClass:"mb-3"},[t._v(" POSICIONES ")]),n("v-row",[n("v-btn-toggle",{staticClass:"mb-7 ml-6",attrs:{multiple:""},model:{value:t.activePositions,callback:function(e){t.activePositions=e},expression:"activePositions"}},t._l(t.positionCount,(function(e,r){return n("v-btn",{key:r,staticClass:"font-weight-bold"},[t._v(" "+t._s(r+1)+"ª ")])})),1),n("v-col",[n("div",{staticClass:"mb-3"},[t._v(" DEDOS ")]),n("v-row",[n("v-btn-toggle",{staticClass:"ml-6",model:{value:t.fingerCount,callback:function(e){t.fingerCount=e},expression:"fingerCount"}},t._l(t.maxFingers,(function(e){return n("v-btn",{key:e-1,staticClass:"font-weight-bold"},[t._v(" "+t._s(e)+" ")])})),1)],1)],1)],1)],1)],1)],1)},G=[],H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-row",[n("v-col",{staticClass:"pa-0",staticStyle:{"max-width":"60px!important"},attrs:{cols:"1"}},[n("v-menu",{attrs:{"close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on;return[n("div",t._g({style:t.colorStyle("all")},r))]}}])},[n("v-color-picker",{model:{value:t.allColors,callback:function(e){t.allColors=e},expression:"allColors"}})],1)],1),n("v-col",{staticClass:"pa-0",staticStyle:{height:"30px!important",width:"60px!important"},attrs:{cols:"2"}},[n("v-checkbox",{staticClass:"mt-0",attrs:{label:"Todos"},model:{value:t.allSelected,callback:function(e){t.allSelected=e},expression:"allSelected"}})],1)],1),n("v-row",[n("div",{staticClass:"separator"})]),t._l(t.intervals,(function(e,r){return n("div",{key:r},[n("v-row",[n("v-col",{staticClass:"pa-0",staticStyle:{"max-width":"60px!important"},attrs:{cols:"1"}},[n("v-menu",{attrs:{"close-on-content-click":!1},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on;return[n("div",t._g({style:t.colorStyle(r)},o))]}}],null,!0)},[n("v-color-picker",{model:{value:t.intervals[r].color,callback:function(e){t.$set(t.intervals[r],"color",e)},expression:"intervals[index].color"}})],1)],1),n("v-col",{staticClass:"pa-0",staticStyle:{height:"30px!important",width:"60px!important"}},[n("v-checkbox",{staticClass:"mt-0",attrs:{label:t.intervalOutputName(r,e)},model:{value:e.visible,callback:function(n){t.$set(e,"visible",n)},expression:"interval.visible"}})],1)],1)],1)}))],2)},J=[],K=(n("99af"),{computed:{intervals:function(){return this.$store.getters["tone/getScaleHarmonicFrets"]},allColors:{get:function(){return this.$store.state.tone.allColors},set:function(t){this.$store.commit("tone/SET_ALL_FRET_COLORS",t)}},allSelected:{get:function(){return this.$store.state.tone.allSelected},set:function(t){this.$store.commit("tone/SELECT_ALL_FRETS",t)}}},data:function(){return{colorPicker:!1}},methods:{colorStyle:function(t){var e="all"==t?this.allColors:this.intervals[t].color;return{"background-color":e+"!important",cursor:"pointer",border:"4px solid white",height:"30px",width:"50px"}},intervalOutputName:function(t,e){return"".concat(e.outputName," (").concat(this.$store.getters["tone/getScaleTone"](t),")")}}}),Q=K,z=(n("2e47"),n("ac7c")),X=n("62ad"),q=n("03a4"),W=n("e449"),Y=n("0fd9"),Z=Object(b["a"])(Q,H,J,!1,null,"517b9c20",null),tt=Z.exports;R()(Z,{VCheckbox:z["a"],VCol:X["a"],VColorPicker:q["a"],VMenu:W["a"],VRow:Y["a"]});var et={components:{IntervalSelector:tt},computed:{positionCount:function(){return this.$store.state.tone.currentScale.notes.length},maxFingers:function(){return this.$store.state.tone.maxFingers},activePositions:{get:function(){return this.$store.state.tone.activePositions},set:function(t){this.$store.commit("tone/SET_ACTIVE_POSITIONS",t)}},fingerCount:{get:function(){return this.$store.state.tone.fingerCount-1},set:function(t){this.$store.dispatch("tone/changeFingerCount",t+1)}},hideUnmarkedNotes:{get:function(){return this.$store.state.tone.hideUnmarkedNotes},set:function(t){this.$store.commit("tone/SET_HIDE_UNMARKED_NOTES",t)}}},methods:{getPositionRoot:function(t){return this.$store.tone.positions[t].root}}},nt=et,rt=n("8336"),ot=n("a609"),it=n("b73d"),at=Object(b["a"])(nt,U,G,!1,null,"125bdc48",null),st=at.exports;R()(at,{VBtn:rt["a"],VBtnToggle:ot["a"],VCol:X["a"],VRow:Y["a"],VSwitch:it["a"]});var ct=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("v-col",[n("v-btn-toggle",{staticClass:"buttons",attrs:{dark:""}},t._l(t.availableTones,(function(e,r){return n("v-btn",{key:r,on:{click:function(e){return t.changeTone(r)}}},[t._v(" "+t._s(e)+" ")])})),1),n("v-row",{staticClass:"scale-notes d-flex justify-center"},t._l(t.scale,(function(e,r){return n("v-row",{key:r,staticClass:"display-2 font-weight-bold error--text mx-2",attrs:{cols:"1"}},[n("div",[t._v(" "+t._s(e)+" ")]),r<t.availableTones.length?n("div",{},[t._v(" - ")]):t._e()])})),1)],1)],1)},lt=[],ut={computed:{tone:function(){return this.$store.state.tone.currentTone},availableTones:function(){return this.$store.state.tone.availableTones},scale:function(){return this.$store.state.tone.currentScale.notes}},methods:{changeTone:function(t){this.$store.dispatch("tone/changeTone",t)}}},ft=ut,dt=(n("77b0"),Object(b["a"])(ft,ct,lt,!1,null,"11869d5d",null)),vt=dt.exports;R()(dt,{VBtn:rt["a"],VBtnToggle:ot["a"],VCol:X["a"],VRow:Y["a"]});var pt={name:"App",components:{Fretboard:F,ScaleSelector:V,ToneSelector:vt,Options:st}},mt=pt,ht=(n("e551"),Object(b["a"])(mt,a,s,!1,null,"6a2dcc0e",null)),gt=ht.exports;R()(ht,{VCol:X["a"],VRow:Y["a"]});var bt={name:"App",components:{FretboardContent:gt}},St=bt,Ct=(n("cf25"),n("7496")),xt=Object(b["a"])(St,o,i,!1,null,null,null),Tt=xt.exports;R()(xt,{VApp:Ct["a"]});var yt=n("2f62"),_t=(n("7db0"),n("c975"),n("d81d"),n("b0c0"),n("ac1f"),n("1276"),n("caad"),n("fb6a"),n("a434"),n("2909")),Ot=n("d4ec"),Et=n("bee2"),kt=n("fbcf"),wt=n.n(kt),It=[{id:"main",name:"Principal",children:[{name:"Cromática",id:"chromatic",type:"major",fingers:4},{name:"Mayor",id:"major",type:"major",fingers:3},{name:"Menor Natural",id:"naturalMinor",type:"minor",fingers:3},{name:"Menor Harmónica",id:"harmonicMinor",type:"minor",fingers:3},{name:"Menor Melódica",id:"melodicMinor",type:"minor",fingers:3},{name:"Tono Completo",id:"wholeTone",type:"major",fingers:3}]},{id:"pentatonics",name:"Pentatónicas",children:[{name:"Blues",id:"blues",steps:[3,2,1,1,3,2],type:"minor",fingers:2},{name:"Pentatónica Mayor",id:"majorPentatonic",type:"major",fingers:2},{name:"Pentatónica Menor",id:"minorPentatonic",type:"minor",fingers:2},{name:"Pentatónica Kuomi",id:"kuomiPentatonic",type:"major",fingers:2},{name:"Pentatónica China",id:"chinesePentatonic",type:"major",fingers:2}]},{id:"modes",name:"Modos",children:[{name:"Jónico (M)",type:"major",id:"ionian",steps:[2,2,1,2,2,2,1],fingers:3},{name:"Dórico (m)",type:"minor",id:"dorian",steps:[2,1,2,2,2,1,2],fingers:3},{name:"Frigio (m)",type:"minor",id:"phrygian",steps:[1,2,2,2,1,2,2],fingers:3},{name:"Lidio (M)",type:"Mayor",id:"lydian",steps:[2,2,2,1,2,2,1],fingers:3},{name:"Mixolidio (M)",type:"Mayor",id:"mixolydian",steps:[2,2,1,2,2,1,2],fingers:3},{name:"Eólico (m)",type:"minor",id:"aeolian",steps:[2,1,2,2,1,2,2],fingers:3},{name:"Locrio (m)",type:"minor",id:"locrian",steps:[1,2,2,1,2,2,2],fingers:3}]},{id:"other",name:"Otras"}],Nt=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],Pt=["C","Db","D","Eb","E","F","Gb","G","Ab","A","Bb","B"],Ft=["F","Bb","Eb","Ab","Db","Gb","d","g","c","f","bb","eb"],Mt={m:1,M:2,A:3,X:4},$t=function(){function t(e){Object(Ot["a"])(this,t),this.tonic=e,this.usesFlats=!1,this.chromaticScale=[]}return Object(Et["a"])(t,[{key:"chromatic",value:function(){return this.usesFlats=Ft.includes(this.tonic),this.chromaticScale=this.usesFlats?Pt:Nt,this.chromaticScale}},{key:"interval",value:function(t){var e=this,n=this.tonic[0].toUpperCase()+this.tonic.slice(1),r=this.chromatic().indexOf(n),o=t instanceof Array?this.intervalsToNotation(t):t;return Object(_t["a"])(o).map((function(t){var n=e.chromatic()[r];return r=(r+Mt[t])%e.chromatic().length,n}))}},{key:"intervalsToNotation",value:function(t){for(var e="",n=0;n<t.length;n++){var r=t[n],o=t[n+1],i=o-r;e+=this.findStep(i)}return e}},{key:"findStep",value:function(t){var e="";for(var n in Mt)e=Mt[n]==t?e=n:e;return e}}]),t}(),jt={ScaleMaker:wt.a,scales:It,sharps:Nt,flats:Pt,chromaticScale:function(t,e){return"b"!=t&&"flats"!=t||!e?"b"==t||"flats"==t?Pt:Nt:Pt.slice(7).concat(Pt.slice(0,7))},make:function(t,e,n){var r=e+"0",o="minor"==this.getScaleType(t)?e.toLowerCase():e,i=wt.a.makeScale(t,r,n),a=new $t(o);return i.notes=a.interval(i.inSemiTones),i.usesFlats=a.usesFlats,i.chromatic=a.chromaticScale,this.scaleLift(i),i},scaleLift:function(t){for(var e=t.notes[0],n=t.notes.length,r=1;r<t.notes.length;r++)if(t.notes[r]==e){n=r;break}t.notes.splice(n),t.inSemiTones.splice(n),t.inHertz.splice(n),t.inCents.splice(n)},scaleExists:function(t){var e=wt.a.getScaleNames();return-1!=e.indexOf(t)},getToneIntervals:function(t,e){var n=e.notes.indexOf(t),r=e.inSemiTones[n];return r},generateScalePaterns:function(t){for(var e in t){var n=t[e];if(void 0==n.children){var r=this.scaleExists(n.id);r||void 0==n.steps||wt.a.addScale(n.id,n.steps)}else this.generateScalePaterns(n.children)}},getLowestTone:function(t){t[0];for(var e=t[0],n=0;n<t;++n)e=e[0]<t[n][0]?e:t;return e},arrangeScaleOctaves:function(t){var e=t.indexOf("C");if(e=-1!=e?e:t.indexOf("C#"),e=-1!=e?e:t.indexOf("Cb"),e=-1!=e?e:t.indexOf(this.getLowestTone(t)),0==e)return t;var n=t.slice(e);return n=n.concat(t.slice(0,e)),t=n,t},getScaleType:function(t){var e=this.getScaleDef(t);return e.type},getScaleDef:function(t,e){var n,r=e||It;for(var o in r){var i=r[o];if(void 0!=n)break;void 0==i.children?i.id==t&&(n=i):n=this.getScaleDef(t,i.children)}return n},isHigherPitch:function(t,e,n){return e.oct>n.oct||t.indexOf(e.tone)>t.indexOf(n.tone)},generatePositions:function(t,e,n){for(var r,o=[],i=[],a=[],s=this.arrangeScaleOctaves(e),c=n[n.length-1],l=0;l<n.length;l++)a.push(0);for(l=0;l<n.length;l++)r=n[l],r=this.getStringPositions(s,r),o.push(r);for(var u=o[o.length-1],f=0;f<u.length-(t-1);f++){for(var d={matrix:[]},v="",p=o.length-1;p>=0;p--){var m=[],h=0;r=o[p],a[p]=f;for(var g=a[p];g<r.length;g++){if(h>=t)break;var b=r[g],S=""==v||this.isHigherPitch(s,b,v);S&&(m.push(b.fret),a[p]++,h++,v=b)}d.matrix.push(m)}d.root=d.matrix[0][0],d.matrix.reverse(),d.number=e.indexOf(c[d.root].tone),i.push(d)}return i},getStringPositions:function(t,e){for(var n=[],r=0;r<e.length;r++)-1!=t.indexOf(e[r].tone)&&n.push(e[r]);return n},findNote:function(t,e,n,r){for(var o=0;o<n.length;o++){var i=r[n[o]][t];if(-1!=i.indexOf(e))return!0}return!1},init:function(){this.generateScalePaterns(It)}},At={standart:[{tone:"E",oct:4,fret:0},{tone:"B",oct:3,fret:0},{tone:"G",oct:3,fret:0},{tone:"D",oct:3,fret:0},{tone:"A",oct:2,fret:0},{tone:"E",oct:2,fret:0}]},Dt=function(t,e,n){var r=e,o=t instanceof Array?t:At[t.toLowerCase()],i=n.chromatic,a=[];this.getFrets=function(){return r},this.getStrings=function(){return o.length},this.matrix=function(){return a},this.tunning=function(){return o},this.generate=function(t){for(var e=0;e<o.length;e++){var n=o[e],i=[n],s=n.oct,c=t.indexOf(n.tone),l=0;while(l<r)c++,s=c>=t.length?s+1:s,c=c>=t.length?0:c,i.push({tone:t[c],oct:s,fret:l+1}),l++;a.push(i)}},this.generate(i)},Rt=[{id:"tonic",name:"Tónica",steps:0,visible:!0,color:"#F44336"},{id:"minr2",name:"Segunda Menor",steps:1,visible:!1,color:"#E91E63"},{id:"maj2",name:"Segunda Mayor",steps:2,visible:!1,color:"#9C27B0"},{id:"min3",name:"Tercera Menor",steps:3,visible:!1,color:"#673AB7"},{id:"maj3",name:"Tercera Mayor",steps:4,visible:!1,color:"#3F51B5"},{id:"perf4",name:"Cuarta Justa",steps:5,visible:!1,color:"#2196F3"},{id:"aug4",name:"Cuarta Aumentada::Quinta Disminuida",steps:6,visible:!1,color:"#03A9F4"},{id:"perf5",name:"Quinta Justa",steps:7,visible:!1,color:"#00BCD4"},{id:"aug5",name:"Quinta Aumentada::Sexta Menor",steps:8,visible:!1,color:"#009688"},{id:"maj6",name:"Sexta Mayor::Séptima Disminuida",steps:9,visible:!1,color:"#4CAF50"},{id:"min7",name:"Séptima Menor",steps:10,visible:!1,color:"#8BC34A"},{id:"maj7",name:"Séptima Mayor",steps:11,visible:!1,color:"#CDDC39"}],Bt={map:Rt};jt.init();var Lt=jt.make("chromatic","C",13),Vt=[{tone:"E",oct:4,fret:0},{tone:"B",oct:3,fret:0},{tone:"G",oct:3,fret:0},{tone:"D",oct:3,fret:0},{tone:"A",oct:2,fret:0},{tone:"E",oct:2,fret:0}],Ut={namespaced:!0,state:{fretboard:new Dt("standart",20,Lt),chromaticScale:jt.chromaticScale(),currentScale:jt.make("major","C",13),currentScaleId:"major",scales:jt.scales,availableTones:jt.sharps,currentTone:"C",positions:[],activePositions:[],fingerCount:3,maxFingers:4,tunning:Vt,intervalsMap:Bt.map,toneColor:"#42A5F5",allColors:"#42A5F5",allSelected:!1,hideUnmarkedNotes:!1},mutations:{SET_ALL_FRET_COLORS:function(t,e){t.allColors=e;for(var n=0;n<t.intervalsMap.length;n++)t.intervalsMap[n].color=e},SELECT_ALL_FRETS:function(t,e){t.allSelected=e;for(var n=0;n<t.intervalsMap.length;n++)t.intervalsMap[n].visible=e},SET_HIDE_UNMARKED_NOTES:function(t,e){t.hideUnmarkedNotes=e},SET_FRETBOARD:function(t){var e=new Dt(t.tunning,20,t.currentScale);t.fretboard=e},SET_CURRENT_SCALE:function(t,e){t.currentScaleId=e||t.currentScaleId,t.currentScale=jt.make(t.currentScaleId,t.currentTone,13),t.maxFingers=jt.getScaleDef(t.currentScaleId).fingers,t.fingerCount=t.maxFingers},CHANGE_TONE:function(t,e){t.currentTone=t.availableTones[e]},SET_POSITIONS:function(t){t.positions=jt.generatePositions(t.fingerCount,t.currentScale.notes,t.fretboard.matrix())},SET_ACTIVE_POSITIONS:function(t,e){t.activePositions=e},SET_FINGER_COUNT:function(t,e){t.fingerCount=e}},getters:{getScaleTone:function(t){return function(e){return t.currentScale.notes[e]}},getScaleHarmonicFrets:function(t){for(var e=[],n="",r="",o=!1,i=t.currentScale.inSemiTones,a=function(){var a=i[s],c=t.intervalsMap.find((function(t){return t.steps==a}));void 0!=c&&(r=c.name.split(" ")[0],o=r==n,r=c.name.split("::"),c.outputName=o&&void 0!=r[1]?r[1]:r[0],n=c.outputName.split(" ")[0],e.push(c))},s=0;s<i.length;s++)a();return e},getHarmonicColor:function(t){return function(e){var n=jt.getToneIntervals(e,t.currentScale),r=t.intervalsMap.find((function(t){return t.steps==n}));return r.visible?r.color:t.toneColor}},stringTune:function(t){return function(e){return t.fretboard.tunning()[e]}},fretTone:function(t){return function(e,n){return t.fretboard.matrix()[n][e]}},toneIsVisible:function(t){return function(e,n,r){if(t.currentScale==[]||0==t.currentScale.notes.length)return!0;var o=t.activePositions.length<=0||t.positions.length<=0,i=-1!=t.currentScale.notes.indexOf(e);if(i&&!o)for(var a=0;a<t.positions.length;a++){var s=t.positions[a];if(-1!=t.activePositions.indexOf(s.number)&&(o=-1!=s.matrix[r].indexOf(n),o))break}var c=void 0==t.intervalsMap.find((function(n){var r=jt.getToneIntervals(e,t.currentScale);return n.steps==r&&n.visible}))&&t.hideUnmarkedNotes;return o&&i&&!c}},getCurrentScaleId:function(t){return function(e){return void 0!=e[t.currentScaleId]?t.currentScaleId:void 0}}},actions:{setCurrentScale:function(t,e){var n=t.commit;n("SET_CURRENT_SCALE",e),n("SET_FRETBOARD"),n("SET_POSITIONS")},changeTone:function(t,e){var n=t.commit;n("CHANGE_TONE",e),n("SET_CURRENT_SCALE"),n("SET_FRETBOARD"),n("SET_POSITIONS")},changeFingerCount:function(t,e){var n=t.commit;n("SET_FINGER_COUNT",e),n("SET_POSITIONS")}}};r["a"].use(yt["a"]);var Gt=new yt["a"].Store({modules:{tone:Ut},state:{},mutations:{},actions:{}}),Ht=n("f309");r["a"].use(Ht["a"]);var Jt=new Ht["a"]({});r["a"].config.productionTip=!1,new r["a"]({store:Gt,vuetify:Jt,render:function(t){return t(Tt)}}).$mount("#app")},"5b5d":function(t,e,n){},"70e5":function(t,e,n){"use strict";var r=n("c8c9"),o=n.n(r);o.a},"77b0":function(t,e,n){"use strict";var r=n("5b5d"),o=n.n(r);o.a},"7ba4":function(t,e,n){},"84ff":function(t,e,n){},c8c9:function(t,e,n){},cf25:function(t,e,n){"use strict";var r=n("029a"),o=n.n(r);o.a},cf9d:function(t,e,n){},e551:function(t,e,n){"use strict";var r=n("53fd"),o=n.n(r);o.a},fc74:function(t,e,n){}});
//# sourceMappingURL=app.7a14df31.js.map