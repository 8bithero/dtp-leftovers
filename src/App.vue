<template>
  <nav class="bg-white dark:bg-slate-900">
    <router-link to="/">Home</router-link> |
    <router-link to="/dtp">Pandas</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style lang="scss">
@font-face {
  font-family: "Splatter Kings";
  src: local("Splatter Kings"),
   url(~@/assets/fonts/splatter_kings/Splatter-Kings.ttf) format("truetype");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
