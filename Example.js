const express = require('express');
const app = express();
 
const { proxy } = require('rtsp-relay')(app);
 
const handler = proxy({
  url: `rtsp://82.188.122.210:7447/OluifM93AT7FMb7I`,
  // if your RTSP stream need credentials, include them in the URL as above
  verbose: false,
});
 
// the endpoint our RTSP uses
app.ws('/api/stream', handler);
 
// this is an example html page to view the stream
app.get('/', (req, res) =>
  res.send(`
  <canvas id='canvas'></canvas>
 
  <script src='https://cdn.jsdelivr.net/gh/phoboslab/jsmpeg@9cf21d3/jsmpeg.min.js'></script>
  <script>
    new JSMpeg.Player('ws://' + location.host + '/api/stream', {
      canvas: document.getElementById('canvas')
    })
  </script>
`),
);
 
app.listen(2000);
