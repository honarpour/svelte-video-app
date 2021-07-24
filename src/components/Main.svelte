<script>
  import { getContext } from 'svelte';

  import ShowItem from './ShowItem';

  export let searchword;
  export let selectShow;

  const sortByYearDesc = (array) => array.sort((a, b) => b.year - a.year);
  const groupBy = (array, key) =>
    array.reduce((rv, x) => {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});

  const { data } = getContext('context');
  const groupedData = groupBy(data, 'genre');
  const genres = Object.keys(groupedData).sort();

  const formatEntries = ({ genre, filter }) =>
    !!filter
      ? sortByYearDesc(groupedData[genre].filter((e) => e.id.includes(filter)))
      : sortByYearDesc(groupedData[genre]);
</script>

<main>
  {#each genres as genre}
    <grid>
      <div>
        <h2>{genre}</h2>
      </div>
      <div class="no-padding">
        {#each formatEntries({ genre, filter: searchword }) as show}
          <ShowItem {show} {selectShow} />
        {/each}
      </div>
    </grid>
  {/each}
</main>

<style>
  main {
    margin: 0;
    padding: var(--gutter);
    min-height: 100vh;
    background-image: url('/assets/img/bg.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

  grid {
    display: grid;
    grid-template-columns: 1fr 4fr;
    gap: var(--gutter);
    margin: calc(var(--gutter) * 5) 0;
    padding: 0;
  }
  grid:first-child {
    margin-top: calc(var(--gutter) * 2);
  }
  grid:last-child {
    margin-bottom: calc(var(--gutter) * 2);
  }

  div {
    margin: 0;
    padding: var(--gutter);
  }
  div.no-padding {
    padding: 0;
  }

  h2 {
    display: inline-block;
    margin: 0;
    padding: 0 10px;
    font-size: calc(var(--font-size) * 2);
    text-transform: capitalize;
    border-radius: var(--radius);
    color: var(--color-green);
    background-color: var(--color-black);
  }
</style>
