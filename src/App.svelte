<script>
  import { setContext } from 'svelte';

  import Search from './components/Search';
  import Main from './components/Main';
  import Show from './components/Show';
  import Player from './components/Player';

  export let context;
  setContext('context', context);

  let searchword = '';
  const search = (e) => {
    const { value } = e.target;
    searchword = value;
  };

  let currentShow;
  const selectShow = (id) => {
    currentShow = id;
    if (id) {
      document.body.style = 'overflow: hidden';
    } else {
      document.body.removeAttribute('style');
    }
  };

  let currentEpisode;
  const selectEpisode = (id) => {
    currentEpisode = id;
  };
</script>

<Search {search} />
<Main {searchword} {selectShow} />
{#if currentShow}
  <Show {currentShow} {selectShow} {selectEpisode} />
{/if}
{#if currentEpisode}
  <Player {currentShow} {currentEpisode} {selectShow} {selectEpisode} />
{/if}
