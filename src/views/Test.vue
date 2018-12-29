<template>
  <div class="about">
    <h1>This is an Test page</h1>
    <h2>namespace:{{ namespace }}</h2>
    <h2>page:{{ page }}</h2>
    <h3 v-mask="{callback:hideMask,model:showmask}"
        @click="renderMask">
      {{windowWidth}}
    </h3>
    <testname :namespace="namespace"
              :page="page" />
  </div>
</template>
<script>
  import testname from './testname.vue'
  import vue from 'vue'
  export default {
    components: {
      testname
    },
    props: {
      namespace: {
        type: String,
        default: undefined
      },
      page: {
        type: String,
        default: undefined
      }
    },
    data() {
      return {
        windowWidth: 0,
        showmask: false
      }
    },
    computed: {
      component() {
        return this.page
      }
    },
    methods: {
      renderMask() {
        this.showmask = true
      },
      hideMask() {
        this.showmask = false
      }
    },
    mounted() {
      window.onresize = () => {
        this.windowWidth = window.innerWidth
      }
    }
  }
</script>
