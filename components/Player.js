import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import Progress from './Progress.js';
import Blobimg from './Blobimg.js';
import { PLAY, PAUSE, NEXT } from '../constant/index.js';

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
    const { song, play, pause, skip, end } = this.props;
    let {
      picture,
      artist,
      album,
      albumtitle,
      title
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
          <div className="text-right"><span className="btn btn-hz"></span></div>
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
            <span className={ 'btn ' + (this.state.isPlay ? 'btn-pause' :  'btn-play')} onClick={ this.state.isPlay ? pause : play }></span>
            <span className="btn btn-like" onClick={this.rate}></span>
            <span className="btn btn-dislike" onClick={this.bye}></span>
            <span className="btn btn-next" onClick={skip}></span>
          </div>
         </div>
      </div>
    )
  }

  componentDidMount() {
    let { audio } = this;
    let { song, control } = this.props;
    audio.addEventListener('timeupdate', this.updateProgress.bind(this));
    audio.addEventListener('playing', this.onPlay.bind(this));
    audio.addEventListener('pause', this.onPause.bind(this));
    audio.addEventListener('error', this.skip.bind(this));
    audio.addEventListener('ended', this.end.bind(this));
    if(song && song.url && song.control === PLAY) {
      audio.src = song.url;
      audio.play();
    }
  }

  componentWillReceiveProps(nextProps) {
    let { audio } = this;
    if(nextProps.song.control === PLAY) {
      if(!this.props.song || this.props.song.url !== nextProps.song.url) {
        audio.src = nextProps.song.url;
      }
      audio.play();
    } else if(nextProps.song.control === PAUSE) {
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

  playNext() {
    this.props.playNext();
  }

  play() {
    this.props.play();
  }

  pause() {
    this.props.pause();
  }

  end() {
    console.log(end);
    this.props.end();
  }

  skip() {
    this.props.skip();
  }

  end() {
    this.props.end();
  }

  like() {
    // id
    this.props.like();
  }

  dislike() {
    // id
    this.props.dislike();
  }

  trash() {
    // id
    this.props.trash();
  }
}

Player.propTypes = {
  playNext: PropTypes.func.isRequired,
  play: PropTypes.func.isRequired,
  pause: PropTypes.func.isRequired,
  like: PropTypes.func.isRequired,
  dislike: PropTypes.func.isRequired,
  trash: PropTypes.func.isRequired,
  song: PropTypes.object.isRequired,
  control: PropTypes.oneOf(PLAY, PAUSE, NEXT).isRequired
}


