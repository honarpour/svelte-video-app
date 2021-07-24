<script>
  import Logo from './Logo';

  export let search;

  const handleLogoClick = () => {
    search({ target: { value: '' } });
    document.getElementsByTagName('input')[0].value = '';
  };
</script>

<header>
  <div on:click={handleLogoClick} title="Click to clear search">
    <Logo />
  </div>
  <input type="text" placeholder="Search for title" on:input={search} />
</header>

<style>
  header {
    display: grid;
    grid-template-columns: 50px 1fr;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
    background-color: white;
    z-index: 99;
  }

  div {
    cursor: pointer;
  }

  input {
    margin: 0;
    padding: 20px;
    background-color: var(--color-black);
    color: var(--color-white);
    border: 0;
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    font-size: var(--font-size);
    width: 100%;
  }
  input::placeholder {
    font-style: italic;
    color: var(--color-white);
  }
</style>
