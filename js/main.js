const player = videojs('example_video_1')

/* player.playlist([{
  sources: [{
    src: '../video/dance1.mp4',
    type: 'video/mp4'
  }]
}, {
  sources: [{
    src: '../video/dance2.mp4',
    type: 'video/mp4'
  }]
}, {
  sources: [{
    src: '../video/dance3.mp4',
    type: 'video/mp4'
  }]
}, {
  sources: [{
    src: '../video/dance4.mp4',
    type: 'video/mp4'
  }]
}]) */

let dance1 = {
  sources: [{
    src: '../video/dance1.mp4',
    type: 'video/mp4'
  }]
}

let dance2 = {
  sources: [{
    src: '../video/dance2.mp4',
    type: 'video/mp4'
  }]
}

let dance3 = {
  sources: [{
    src: '../video/dance3.mp4',
    type: 'video/mp4'
  }]
}

let dance4 = {
  sources: [{
    src: '../video/dance4.mp4',
    type: 'video/mp4'
  }]
}


let list = [dance4, dance2]

player.playlist(list)

// Play through the playlist automatically.
player.playlist.autoadvance(0)

