// import Config from './Config.js';

const Utility = {};

Utility.fadeIn = (ele, delay) => {
    if (typeof delay !== 'number') {
        delay = 600;
    }
    ele.style.opacity = '0';
    ele.style.display = 'block';
    ele.style.transitionProperty = 'opacity';
    ele.style.webkitTransitionProperty = 'opacity';
    ele.style.animationDuration = delay.toString();
    ele.style.webkitAnimationDuration = delay.toString();
    ele.style.opacity = '1';

    setTimeout(() => {
        ele.style.transitionProperty = 'initial';
        ele.style.webkitTransitionProperty = 'initial';
        ele.style.animationDuration = 'initial';
        ele.style.webkitAnimationDuration = 'initial';
    }, delay);
};

Utility.fadeOut = (ele, delay) => {
    if (typeof delay !== 'number') {
        delay = 600;
    }
    ele.style.display = 'block';
    ele.style.transitionProperty = 'opacity';
    ele.style.webkitTransitionProperty = 'opacity';
    ele.style.animationDuration = delay.toString();
    ele.style.webkitAnimationDuration = delay.toString();
    ele.style.opacity = '0';

    setTimeout(() => {
        ele.style.display = 'none';
        ele.style.transitionProperty = 'initial';
        ele.style.webkitTransitionProperty = 'initial';
        ele.style.animationDuration = 'initial';
        ele.style.webkitAnimationDuration = 'initial';
    }, delay);
};

Utility.checkWord = (text, list) => {
    for (let i = 0; i < list.length; i++) {
        if (text === list[i]) {
            return true;
        }
    }
    return false;
};

Utility.initWebaudio = (url, autoplay) => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    let source = audioCtx.createBufferSource();
    var request = new XMLHttpRequest();

    request.open('GET', url, true);

    request.responseType = 'arraybuffer';

    window.bgm = null;

    request.onload = () => {
        var audioData = request.response;

        audioCtx.decodeAudioData(audioData, (buffer) => {
            source.buffer = buffer;

            source.connect(audioCtx.destination);
            source.loop = true;

            if (autoplay === 'autoplay') {
                source.start(0);
            }
            window.bgm = source;

            // return source;

            // document.querySelector('.btn-mute').addEventListener('click', () => {
            //     if (this.isMute) {
            //         this.isMute = false;
            //         source.connect(audioCtx.destination);
            //         document.querySelector('.btn-mute').classList.remove('mute');
            //         document.querySelector('video').muted = false;
            //     } else {
            //         this.isMute = true;
            //         source.disconnect(audioCtx.destination);
            //         document.querySelector('.btn-mute').classList.add('mute');
            //         document.querySelector('video').muted = true;
            //     }
            // });
        },
        (e) => {
            console.log(e);
        });
    };

    return request.send();
};

Utility.showSimpleMessage = (text) => {
    let msg = document.querySelector('.simple-msg');
    msg.innerHTML = text;
    msg.style.opacity = '1';
};

Utility.hideSimpleMessage = (callback) => {
    let msg = document.querySelector('.simple-msg');
    msg.style.opacity = '0';
    setTimeout(() => {
        callback && callback();
    }, 600);
};

Utility.showHideSimpleMessage = (text, callback) => {
    let msg = document.querySelector('.simple-msg');
    msg.innerHTML = text;
    msg.style.opacity = '1';

    setTimeout(() => {
        msg.style.opacity = '0';
    }, 2000);

    setTimeout(() => {
        callback && callback();
    }, 2600);
};

Utility.buildQrcode = (url) => {
    const $qrcode = document.createElement('div');
    const qrcode = new QRCode($qrcode, {
        text: url,
        width: 150,
        height: 150,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.L
    });

    console.log(qrcode);

    try {
        Config.defShare.link = url;
        TD.wxShare(Config.defShare);
    } catch (e) {
        console.log(e);
    }

    return $qrcode.lastChild;
};

Utility.buildCanvas = (imgList) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const imgCanvas = new Image();
    let shareImgData;

    canvas.width = 750;
    canvas.height = 1600;

    setTimeout(() => {
        for (let x in imgList) {
            ctx.drawImage(imgList[x], 0, 0, canvas.width, canvas.height);
        }
        shareImgData = canvas.toDataURL('image/png');
        imgCanvas.src = shareImgData;

        return imgCanvas;
    }, 100);
};

export default Utility;
