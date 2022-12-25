<template>
  <header>
    <nav>
      <router-link to="/">
        <img src="@/assets/logo.svg" id="desktop_logo" width="200" alt="What is today logo">
      </router-link>
    </nav>
  </header>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans+SC:ital,wght@0,100;0,300;0,400;0,500;0,700;0,800;0,900;1,100;1,300;1,400;1,500;1,700;1,800;1,900&display=swap');

:root {
  --wit-white: #fff;
  --wit-red: #ca3433;
  --wit-gray-dark: #3f4348;
  --wit-orange: #f9b31c;
}

#app {
  font-family: 'Alegreya Sans SC', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--wit-gray-dark);
  max-width: 992px;
  margin: auto;
}

h1,h2,h3 {
  color: var(--wit-orange);
  text-transform: capitalize;
}
</style>
