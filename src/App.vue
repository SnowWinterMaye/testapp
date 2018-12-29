<template>
  <div id="app">
    <!-- <div class="cover"
         style="
    width: 467px;
    height: 43px;
    border-width: 33px 839px 2160px 320px;
    display: block;
">

    </div>

    <div class="cover"
         style="
    width: 467px;
    height: 43px;
    border-width: 333px 839px 2160px 320px;
    display: block;
"> 

  </div>-->
    <div id="nav">
      <router-link v-mask
                   to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="less">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
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
<style>
  .cover {
    display: none;
    position: absolute;
    width: 0;
    height: 0;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border: 0 solid #000;
    opacity: 0.75;
    filter: alpha(opacity=75);
    z-index: 1119;
    /* 过渡效果 */
    transition: all 0.25s;
    /* 边缘闪动问题fix */
    box-shadow: 0 0 0 1px #000;
    overflow: hidden;
  }
  /* .cover::before {
                    content: '';
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 400px solid #000;
                    position: absolute;
                    left: -400px;
                    top: -400px;
                    box-shadow: inset 0 0 5px 2px rgba(0, 0, 0, 0.75);
                  } */
</style>
