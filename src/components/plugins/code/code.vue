<template>
    <el-dialog title="插入代码" :visible.sync="showCodeDialog" size="tiny">
        <span>
            
        </span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="showCodeDialog=false">取 消</el-button>
            <el-button type="primary" @click="updateValue(code)">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    export default{
        data(){
            return {
               
            }
        },
        props:['value'],
        methods:{
            updateValue(value){
                this.$emit('input', value);
            }
        }
    }
</script>

<style lang="scss">
    
</style>