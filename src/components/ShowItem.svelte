<script>
  export let show;
  export let selectShow;
</script>

<a
  id={show.id}
  on:click={() => {
    selectShow(show.id);
  }}
>
  <img
    src={`/assets/thumbs/${show.id}.jpg`}
    alt={show.title}
    draggable="false"
  />
  <h3>{show.title}</h3>
  <p>{show.year}</p>
</a>

<style>
  a {
    display: inline-block;
    vertical-align: top;
    margin: 0 var(--gutter) var(--gutter) 0;
    padding: var(--gutter);
    max-width: 200px;
    border-radius: var(--radius);
    transition: 0.3s all;
    cursor: pointer;
  }
  a:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  img {
    width: calc(200px - var(--gutter) * 2);
    height: calc(250px - var(--gutter) * 2);
    border-radius: var(--radius);
  }

  h3 {
    margin: 0;
    padding: 0;
    font-size: calc(var(--font-size) * 1.5);
    text-shadow: 0px 0px 2px var(--color-black);
  }

  p {
    margin: 0;
    padding: 0;
    color: var(--color-black);
  }
</style>
