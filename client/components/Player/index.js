import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Progress from '../Progress';
import Blobimg from '../Blobimg';
import { PLAY, PAUSE } from '../../constants';

export default class Player extends Component {
  constructor() {
    super();
    this.audio = new Audio();
    this.state = {
      progress: '0',
      currentTime: '0:00',
      isPlay: false
    };
  }

  render() {
    const { song, handle, play, pause, toggleChannelsShow, toggleLoginShow } = this.props;
    if(!song) {
      return <div/>
    }
    let {
      picture,
      artist,
      album,
      albumtitle,
      title,
      like
    } = song;

    function getUrl(url){
      if(/^https?\:\/\//.test(url)){
        return url;
      }
      return `http://music.douban.com/${url}`;
    }

    return (
      <div className="player clearfix">
        <a className="player-side" href={getUrl(album)} target="_blank">
          <Blobimg className="player-picture" src={picture} />
        </a>
        <div className="player-main">
          <div className="text-right"><span onClick={toggleLoginShow} className="btn btn-hz"></span><span className="btn btn-hz" onClick={toggleChannelsShow}></span></div>
          <div className="player-info">
            <div className="artist">{artist}</div>
            <div className="album">{albumtitle}</div>
            <div className="title">{title}</div>
          </div>
          <Progress now={this.state.progress} />
          <div className="player-time">
            {this.state.currentTime}
          </div>
          <div className="player-control">
            <span className={ 'btn ' + (this.state.isPlay ? 'btn-pause' : 'btn-play')} onClick={this.state.isPlay ? pause : play }></span>
            <span className={'btn ' + (like ? 'btn-like-active' : 'btn-like')} onClick={() => {
              if(like) {
                handle('unrate')
              } else {
                handle('rate')
              }
            }}></span>
            <span className="btn btn-byb" onClick={() => {
              handle('byb')
            }}></span>
            <span className="btn btn-next" onClick={() => {
              handle('skip')
            }}></span>
          </div>
         </div>
      </div>
    )
  }

  componentDidMount() {
    let { audio } = this;
    let { song, handle } = this.props;
    audio.addEventListener('timeupdate', this.updateProgress.bind(this));
    audio.addEventListener('playing', this.onPlay.bind(this));
    audio.addEventListener('pause', this.onPause.bind(this));
    audio.addEventListener('ended', () => { handle('end')})
    if(song && song.url && song.control === PLAY) {
      audio.src = song.url;
      audio.play();
    }
  }

  componentWillUnmount() {
    audio.removeEventListener('timeupdate', this.updateProgress.bind(this));
    audio.removeEventListener('playing', this.onPlay.bind(this));
    audio.removeEventListener('pause', this.onPause.bind(this));
    audio.removeEventListener('ended', () => { handle('end')})
  }

  componentWillReceiveProps(nextProps) {
    let { audio } = this
    if(nextProps.control === PLAY) {
      if(audio.src !== nextProps.song.url) {
        audio.src = nextProps.song.url;
      }
      audio.play();
    } else if(nextProps.control === PAUSE) {
      audio.pause();
    }
  }

  onPlay() {
    this.setState({
      isPlay: true
    });
  }

  onPause() {
    this.setState({
      isPlay: false
    });
  }

  updateProgress() {
    let { audio } = this;
    let progress = (audio.currentTime / audio.duration) * 100 + '%';
    let currentTime = '-' + moment(audio.duration - audio.currentTime, 'X').format('mm:ss');
    this.setState({
       progress,
       currentTime
    });
  }
}


Player.PropTypes = {
  song: PropTypes.object.isRequired,
  control: PropTypes.string.isRequired,
  handle: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
}
