const player = videojs('example_video_1')

let dance1 = {
  sources: [{
    src: '../video/dance1.mp4',
    type: 'video/mp4'
  }],
  poster: '../video/dance1.png'
}

let dance2 = {
  sources: [{
    src: '../video/dance2.mp4',
    type: 'video/mp4'
  }],
  poster: '../video/dance2.png'
}

let dance3 = {
  sources: [{
    src: '../video/dance3.mp4',
    type: 'video/mp4'
  }],
  poster: '../video/dance3.png'
}

let dance4 = {
  sources: [{
    src: '../video/dance4.mp4',
    type: 'video/mp4'
  }],
  poster: '../video/dance4.png'
}


let list = [dance4, dance1, dance3, dance2]

player.playlist(list)

// Play through the playlist automatically.
player.playlist.autoadvance(0)

initGrid();

function initGrid() {
  var grid = new Muuri('.grid', {
    dragEnabled: true,
    layoutOnInit: false
  }).on('move', function () {
    saveLayout(grid);
  });

  var layout = window.localStorage.getItem('layout');
  if (layout) {
    loadLayout(grid, layout);
  } else {
    grid.layout(true);
  }
}

function serializeLayout(grid) {
  var itemIds = grid.getItems().map(function (item) {
    return item.getElement().getAttribute('data-id');
  });
  return JSON.stringify(itemIds);
}

function saveLayout(grid) {
  var layout = serializeLayout(grid);
  window.localStorage.setItem('layout', layout);
}

function loadLayout(grid, serializedLayout) {
  var layout = JSON.parse(serializedLayout);
  var currentItems = grid.getItems();
  var currentItemIds = currentItems.map(function (item) {
    return item.getElement().getAttribute('data-id')
  });
  var newItems = [];
  var itemId;
  var itemIndex;

  for (var i = 0; i < layout.length; i++) {
    itemId = layout[i];
    itemIndex = currentItemIds.indexOf(itemId);
    if (itemIndex > -1) {
      newItems.push(currentItems[itemIndex])
    }
  }

  grid.sort(newItems, {layout: 'instant'});
}

