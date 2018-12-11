const player = videojs('example_video_1')

let videoClips = {
  "dance1": {
    sources: [{
      src: '../video/dance1.mp4',
      type: 'video/mp4'
    }],
    poster: '../video/dance1.png'
  },
  "dance2": {
    sources: [{
      src: '../video/dance2.mp4',
      type: 'video/mp4'
    }],
    poster: '../video/dance2.png'
  },
  "dance3": {
    sources: [{
      src: '../video/dance3.mp4',
      type: 'video/mp4'
    }],
    poster: '../video/dance3.png'
  },
  "dance4": {
    sources: [{
      src: '../video/dance4.mp4',
      type: 'video/mp4'
    }],
    poster: '../video/dance4.png'
  }
}

initGrid()

function initGrid() {
  let grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: true
  }).on('move', function () {
    saveLayout(grid)
  })

  let layout = window.localStorage.getItem('layout')
  if (layout) {
    loadLayout(grid, layout)
    saveLayout(grid)
  } else {
    grid.layout(true)
    saveLayout(grid)
  }
}

function serializeLayout(grid) {
  //console.log(typeof(grid.getItems()))

  let itemIds = grid.getItems().map(function (item) {
    return item.getElement().getAttribute('data-id')
  })

  return JSON.stringify(itemIds)
}

function layoutToList(grid) {
  let list = []

  grid.getItems().map((item) => {
    list.push(item.getElement().getAttribute('data-id'))
  })

  return list
}

function saveLayout(grid) {
  videoOrder = []
  let layout = serializeLayout(grid)
  let videoList = layoutToList(grid)

  videoList.forEach((item) => {    
    videoOrder.push(videoClips[item])
  })
  
  //clear the playlist before setting it. Every. Time.
  player.playlist([])
  player.playlist(videoOrder)
  
  // Play through the playlist automatically.
  player.playlist.autoadvance(0)
  window.localStorage.setItem('layout', layout)
}

function loadLayout(grid, serializedLayout) {
  let layout = JSON.parse(serializedLayout)
  let currentItems = grid.getItems()
  let currentItemIds = currentItems.map(function (item) {
    return item.getElement().getAttribute('data-id')
  })
  let newItems = []
  let itemId
  let itemIndex

  for (let i = 0; i < layout.length; i++) {
    itemId = layout[i]
    itemIndex = currentItemIds.indexOf(itemId)
    if (itemIndex > -1) {
      newItems.push(currentItems[itemIndex])
    }
  }

  grid.sort(newItems, {layout: 'instant'})
}