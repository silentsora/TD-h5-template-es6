
/*
*
*  引入lib库文件和LESS文件
*  必须要引入,过滤器会过滤lib文件夹里面的JS文件,做一个简单的复制
*  复制到相应的文件夹
*  引入的less会对less进行编译存放到css文件夹
* */
import '../less/style.less';
import Loading from './app/Loading.js';
import Video from './app/Video.js';
import End from './app/End.js';

class Index {
    constructor () {
        this.loadingCtrl = new Loading();
        this.videoCtrl = new Video();
        this.endCtrl = new End();
    }

    phaseLoad () {
        this.loadingCtrl.init();
        this.loadingCtrl.preload()
            .then(this.loadingCtrl.mainLoad.bind(this.loadingCtrl))
            .then(this.loadingCtrl.promiseOnload.bind(this.loadingCtrl))
            .then(this.phaseVideo.bind(this));
    }

    phaseVideo () {
        this.videoCtrl.init();
        this.videoCtrl.playVideo()
            .then(() => {
                this.videoCtrl.show();
                this.loadingCtrl.hide();
            });
        this.videoCtrl.promiseVideoEnd()
            .then(this.phaseEnd.bind(this));
    }

    phaseEnd () {
        this.endCtrl.init();
        this.endCtrl.show();
        this.videoCtrl.hide();
        this.endCtrl.promiseRetry()
            .then(this.phaseVideo.bind(this));
    }
}

const index = new Index();
index.phaseLoad();
