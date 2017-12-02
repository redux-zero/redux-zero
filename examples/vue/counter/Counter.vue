<template>
  <div>
      <h1>{{count}}</h1>
      <div>
        <button @click="increment()" class="button">+</button>
        <button @click="decrement()" class="button">-</button>
      </div>
  </div>
</template>

<script>
import { connect } from '../../../vue';
import { actions } from "./actions";

const mapToProps = ({ count }) => ({ count });

export default {
  data () {
    return {
      count: 0
    }
  },
  created() {
    connect(this, this.$store, mapToProps, actions);
  },
}
</script>

<style>
.button {
    font-size: 20px;
    min-width: 30px;
}
h1 {
    color: #42b983;
}
</style>