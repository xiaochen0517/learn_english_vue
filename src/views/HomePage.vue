<template>
    <div class="home-page">
        <h1>Home Page</h1>
        <hello-world/>
    </div>
</template>

<script>
import {mapState, mapMutations} from "vuex";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
    name: "HomePage",
    components: {HelloWorld},
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
