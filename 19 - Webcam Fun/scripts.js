const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({ video: true, audio: false})
    .then(localMediaStream => {
        console.log(localMediaStream);
        video.srcObject = localMediaStream;
       video.play();
    })
    .catch(err => {
        console.error(`Camera Access de de bhai`, err);
    });
}

function paintToCanvas(){
    const w = video.videoWidth;
    const h = video.videoHeight;
    canvas.width = w;
    canvas.height = h;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, w, h);
        let pixels = ctx.getImageData(0,0,w,h);
        //console.log(pixels);
        
        // pixels = redEffect(pixels);
        
        // pixels = rgbSplit(pixels);

        pixels = greenScreen(pixels);

        // ctx.globalAlpha = 0.1
        ctx.putImageData(pixels, 0, 0);
        //debugger;
    }, 16);
}

// paintToCanvas();

function takePhoto(){
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL('image/jpeg');
    //console.log(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'handsome');
    //link.textContent = 'Download Image';
    link.innerHTML = `<img src="${data}" alt="Smartyy">`;
    strip.insertBefore(link, strip.firstChild);
}

function redEffect(pix){
    for(let i=0;i<pix.data.length;i+=4){
        pix.data[i+0] = pix.data[i+0] + 100; 
        pix.data[i+1] = pix.data[i+1] - 50; 
        pix.data[i+2] = pix.data[i+2] * 0.5; 
    }
    return pix;
}

function rgbSplit(pix){
    for(let i=0;i<pix.data.length;i+=4){
        pix.data[i-150] = pix.data[i+0]; 
        pix.data[i+100] = pix.data[i+1]; 
        pix.data[i-150] = pix.data[i+2]; 
    }
    return pix;
}

function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }
  
getVideo();


video.addEventListener('canplay', paintToCanvas);