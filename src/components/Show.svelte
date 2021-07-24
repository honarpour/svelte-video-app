<script>
  import { getContext } from 'svelte';

  export let currentShow;
  export let selectShow;
  export let selectEpisode;

  const { data } = getContext('context');
  const show = data.find((e) => e.id === currentShow);

  let seen = [];
  const getSeen = () => {
    seen = localStorage.getItem(show.id)
      ? localStorage.getItem(show.id).split(',')
      : [];
  };
  getSeen();

  const handleEpisodeClick = (index) => () => {
    selectEpisode(index + 1);
    getSeen();
  };
</script>

<container>
  <button
    on:click={() => {
      selectShow();
    }}
  >
    &larr;
  </button>
  <div>
    <flex>
      <h2>{show.title} <span>{show.year} &mdash; {show.genre}</span></h2>
      <img
        src={`/assets/thumbs/${show.id}.jpg`}
        alt={show.title}
        draggable="false"
      />
    </flex>
    <ul>
      {#each Array.from({ length: show.episodes }) as episode, index}
        <li
          on:click={handleEpisodeClick(index)}
          class={seen.includes(String(index + 1)) ? 'seen' : ''}
        >
          Episode {index + 1}
        </li>
      {/each}
    </ul>
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
    background-color: rgba(0, 0, 0, 0.93);
    color: var(--color-white);
    z-index: 999;
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

  div {
    margin: var(--gutter) auto;
    padding: var(--gutter) 0;
    width: 60vw;
    border-top: 2px solid var(--color-green);
  }

  flex {
    display: flex;
    justify-content: space-between;
  }

  img {
    width: calc(150px - var(--gutter) * 2);
    height: calc(150px - var(--gutter) * 2);
    border-radius: var(--radius);
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

  ul {
    margin: var(--gutter) 0 0 0;
    padding: 0;
    list-style-type: none;
  }

  li {
    position: relative;
    margin: 0;
    padding: calc(var(--gutter) / 2) var(--gutter);
    border-radius: var(--radius);
    transition: 0.3s all;
    cursor: pointer;
  }
  li.seen::after {
    content: 'L';
    font-family: Arial;
    transform: scaleX(-1) rotate(-45deg);
    position: absolute;
    top: 14px;
    left: 12px;
    color: var(--color-green);
  }
  li:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
</style>
