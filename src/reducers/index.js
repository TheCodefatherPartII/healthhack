const initialState = {
  selectedRegion: null,
  selectedYear: null,
  
  regionDetails: {},
  
  // polygons for LGAs
  mapRegions: [],
  
  heatmapData: [],

  indicators: ['wheelchair', 'hospital'],
}

export default (state, action) => {
  if (typeof state === 'undefined') {
    return initialState
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state
}