<script>
  import Logo from "./Logo";

  export let siteTitle;
</script>

<style>
  header {
    display: block;
    position: sticky;
    top: 0;
    margin: 0;
    padding: calc(var(--gutter) / 2) var(--gutter);
    background-color: var(--color-black);
    z-index: 99;
  }

  div {
    display: inline-block;
    vertical-align: middle;
    margin: 0 0 0 calc(var(--gutter) / 2);
    padding: 0;
    height: var(--logo-size);
    line-height: var(--logo-size);
    color: var(--color-white);
    font-size: 30px;
    font-weight: 700;
  }
</style>

<header>
  <Logo />
  <div>{siteTitle}</div>
</header>
