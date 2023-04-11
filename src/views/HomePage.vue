<template>
    <div class="home-page">
        <h1>Home Page</h1>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";

export default {
    name: "HomePage",
    computed: {
        ...mapState(["login"])
    },
    mounted() {
        if (!this.login) {
            this.$router.push("/login");
        }
    },
    methods: {
        ...mapMutations(["setLogin"])
    }
};
</script>

<style lang="less" scoped>

</style>
