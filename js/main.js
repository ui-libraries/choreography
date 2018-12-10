const player = videojs('example_video_1')
let videoOrder = []

player.on('playlistchange', function() {
  videojs.log('It changed!!');
  console.log(player.playlist())
})

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


let list = [videoClips['dance1'], videoClips['dance2'], videoClips['dance3'], videoClips['dance4']]

player.playlist(list)

// Play through the playlist automatically.
player.playlist.autoadvance(0)


function createPlaylistFromLayout(layout) {
  let playlist
  
  layout.forEach((item) => {
    playlist.push(danceList[item])
  })

  return playlist
}

initGrid()

function initGrid() {
  var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: false
  }).on('move', function () {
    saveLayout(grid)
  })

  var layout = window.localStorage.getItem('layout')
  if (layout) {
    loadLayout(grid, layout)
  } else {
    grid.layout(true)
  }
}

function serializeLayout(grid) {
  //console.log(typeof(grid.getItems()))

  var itemIds = grid.getItems().map(function (item) {
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
  let layout = serializeLayout(grid)
  let videoList = layoutToList(grid)

  videoList.forEach((item) => {    
    videoOrder.push(videoClips[item])
  })

  player.playlist(videoOrder)

// Play through the playlist automatically.
  player.playlist.autoadvance(0)
  window.localStorage.setItem('layout', layout)
}

function loadLayout(grid, serializedLayout) {
  var layout = JSON.parse(serializedLayout)
  var currentItems = grid.getItems()
  var currentItemIds = currentItems.map(function (item) {
    return item.getElement().getAttribute('data-id')
  })
  var newItems = [];
  var itemId
  var itemIndex

  for (var i = 0; i < layout.length; i++) {
    itemId = layout[i]
    itemIndex = currentItemIds.indexOf(itemId);
    if (itemIndex > -1) {
      newItems.push(currentItems[itemIndex])
    }
  }

  grid.sort(newItems, {layout: 'instant'})
}