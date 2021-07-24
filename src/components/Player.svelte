<script>
  import { getContext } from 'svelte';

  export let currentShow;
  export let selectShow;
  export let currentEpisode;
  export let selectEpisode;

  const { data } = getContext('context');
  const show = data.find((e) => e.id === currentShow);

  let autoPlay = localStorage.getItem('autoPlay') === 'true' || false;
  const toggleAutoPlay = () => {
    autoPlay = !autoPlay;
    localStorage.setItem('autoPlay', autoPlay);
  };

  const checkSeen = () => {
    const player = document.getElementsByTagName('video')[0];
    const percent = Math.round((player.currentTime / player.duration) * 100);
    if (percent >= 10 || player.currentTime >= 300) {
      const seen = localStorage.getItem(show.id)
        ? localStorage.getItem(show.id).split(',')
        : [];
      if (!seen.includes(String(currentEpisode))) {
        localStorage.setItem(show.id, [...seen, currentEpisode].join(','));
      }
      if (seenInterval) clearInterval(seenInterval);
      selectShow();
      setTimeout(() => {
        selectShow(show.id);
      }, 100);
    }
  };
  const seenInterval = setInterval(checkSeen, 60000);

  const getVideoSrc = async (episode) => {
    return `/assets/video/${show.id}/${episode}.mp4`;
  };

  let videoSrc;
  const setVideo = async ({ episode, autoPlay }) => {
    videoSrc = await getVideoSrc(episode);
    selectEpisode(episode);
    const player = document.getElementsByTagName('video')[0];
    player.load();
    if (autoPlay) player.play();
  };

  const handleVideoEneded = () => {
    if (autoPlay) {
      setVideo({ episode: currentEpisode + 1, autoPlay });
    }
  };

  setVideo({ episode: currentEpisode, autoPlay });
</script>

<container>
  <button
    on:click={() => {
      selectEpisode();
    }}
  >
    &larr;
  </button>
  <div>
    <flex>
      <h2>{show.title} <span>Episode {currentEpisode}</span></h2>
      <label>
        Auto-play
        <input type="checkbox" checked={autoPlay} on:click={toggleAutoPlay} />
      </label>
    </flex>
    <video
      controls
      width="100%"
      on:seeked={checkSeen}
      on:ended={handleVideoEneded}
    >
      <source src={videoSrc} type="video/mp4" />
      <track kind="captions" />
      Sorry, your browser doesn't support embedded videos.
    </video>
  </div>
</container>

<style>
  container {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: var(--color-black);
    color: var(--color-white);
    z-index: 9999;
    overflow-x: hidden;
    overflow-y: auto;
  }

  button {
    position: fixed;
    margin-top: -1px;
    top: var(--gutter);
    left: var(--gutter);
    background-color: var(--color-black);
    color: var(--color-gray-light);
    border: 2px solid var(--color-gray-dark);
    border-radius: var(--radius);
    font-size: calc(var(--font-size) * 1.5);
    transition: 0.3s all;
    cursor: pointer;
  }
  button:hover {
    color: var(--color-white);
    border: 2px solid var(--color-white);
  }

  container > div {
    margin: var(--gutter) auto;
    padding: var(--gutter) 0;
    width: 60vw;
    border-top: 2px solid var(--color-green);
  }

  flex {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  h2 {
    display: inline-block;
    margin: 0;
    padding: 0;
    font-size: calc(var(--font-size) * 2);
    color: var(--color-green);
  }
  h2 span {
    color: var(--color-gray-light);
    font-size: var(--font-size);
    text-transform: capitalize;
  }

  video {
    margin: calc(var(--gutter) * 2) 0 var(--gutter) 0;
  }

  label {
    display: flex;
    align-items: center;
    font-size: calc(var(--font-size) * 0.7);
    cursor: pointer;
  }

  input[type='checkbox'] {
    height: 23px;
    width: 43px;
    border-radius: 16px;
    display: inline-block;
    position: relative;
    margin: 0 0 0 10px;
    border: 2px solid #474755;
    background: linear-gradient(180deg, #2d2f39 0%, #1f2027 100%);
    transition: all 0.2s ease;
    -webkit-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
    cursor: pointer;
  }
  input[type='checkbox']:focus {
    outline: 0;
  }
  input[type='checkbox']:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 2px rgba(44, 44, 44, 0.2);
    transition: all 0.2s cubic-bezier(0.5, 0.1, 0.75, 1.35);
  }
  input[type='checkbox']:checked {
    border-color: white;
  }
  input[type='checkbox']:checked:after {
    transform: translatex(20px);
  }
</style>
