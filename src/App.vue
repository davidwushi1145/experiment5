<template>
  <el-container>
    <el-header>
      <nav>
        <router-link to="/">Login</router-link>
        |
        <router-link to="/register">Register</router-link>
      </nav>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer class="Footer" height="4vh">版权所有 © 2021-2022 无诗</el-footer>
  </el-container>

</template>

<style lang="less">
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
Footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  left: 0;
  display: flex;
  background: #0048ff;
  align-items: center;
  color:white;
  justify-content: center;
}
</style>
