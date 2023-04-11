<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <el-button type="primary" @click="handleClick">
            按钮
        </el-button>
    </div>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String
    },
    methods: {
        handleClick() {
            this.$confirm("此操作将永久删除该文件, 是否继续?")
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
