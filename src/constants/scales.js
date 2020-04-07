export default[ 
  {
    id:'main',
    name: 'Principal',
    children: [
      {
        name: 'Cromática',
        id: 'chromatic',
        type: 'major',
        fingers: 4
      },
      {
        name: 'Mayor',
        id: 'major',
        type: 'major',
        fingers: 3
      },
      { 
        name: 'Menor Natural',
        id: 'naturalMinor',
        type: 'minor',
        fingers: 3
      },
      {
        name: 'Menor Harmónica',
        id: 'harmonicMinor',
        type: 'minor',
        fingers: 3
      },
      {
        name: 'Menor Melódica',
        id: 'melodicMinor',
        type: 'minor',
        fingers: 3
      },
      {
        name: 'Tono Completo',
        id: 'wholeTone',
        type: 'major',
        fingers: 3
      },
    ]
  },
  {
    id:'pentatonics',
    name: 'Pentatónicas',
    children: [
      {
        name: 'Blues',
        id:'blues',
        steps: [3 , 2, 1, 1, 3, 2],
        type: 'minor',
        fingers: 2
      },
      { 
        name: 'Pentatónica Mayor',
        id: 'majorPentatonic',
        type: 'major',
        fingers: 2
      },
      { 
        name: 'Pentatónica Menor',
        id: 'minorPentatonic',
        type: 'minor',
        fingers: 2
      },
      { 
        name: 'Pentatónica Kuomi',
        id: 'kuomiPentatonic',
        type: 'major',
        fingers: 2
      },
      { 
        name: 'Pentatónica China',
        id: 'chinesePentatonic',
        type: 'major',
        fingers: 2
      },
    ]
  },
  {
    id: 'modes',
    name: 'Modos',
    children: [
      {
        name: 'Jónico (M)',
        type: 'major',
        id: 'ionian',
        steps: [2, 2, 1, 2, 2, 2, 1],
        fingers: 3
      },
      {
        name: 'Dórico (m)',
        type: 'minor',
        id: 'dorian',
        steps: [2, 1, 2, 2, 2, 1, 2],
        fingers: 3
      },
      {
        name: 'Frigio (m)',
        type: 'minor',
        id: 'phrygian',
        steps: [1, 2, 2, 2, 1, 2, 2],
        fingers: 3
      },
      {
        name: 'Lidio (M)',
        type: 'Mayor',
        id: 'lydian',
        steps: [2, 2, 2, 1, 2, 2, 1],
        fingers: 3
      },
      {
        name: 'Mixolidio (M)',
        type: 'Mayor',
        id: 'mixolydian',
        steps: [2, 2, 1, 2, 2, 1, 2],
        fingers: 3
      },
      {
        name: 'Eólico (m)',
        type: 'minor',
        id: 'aeolian',
        steps: [2, 1, 2, 2, 1, 2, 2],
        fingers: 3
      },
      {
        name: 'Locrio (m)',
        type: 'minor',
        id: 'locrian',
        steps: [1, 2, 2, 1, 2, 2, 2],
        fingers: 3
      },
    ]
  },
  {
    id: 'other',
    name: 'Otras'
  }

]
