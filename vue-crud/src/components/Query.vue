<template>
    <div>
        <el-form ref="queryForm">
            <el-form-item >
                <el-select v-model="value">
                    <el-option label="按姓名查找" value="0" />
                    <el-option label="按邮箱查找" value="1"/>
                </el-select>
                <el-input v-model="queryWord" placeholder="输入查询关键字"></el-input>
            </el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form>
        <el-table :data="infos" style="width: 100%" stripe>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="100">
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="100">
            </el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="180">
                <template slot-scope="scope">
                    <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
                    <el-button type="text" size="small" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="deleteRow(scope.$index,infos)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑"
                   :visible.sync="editFormVisible"
                   :close-on-click-modal="false"
                   class="edit-form"
                   :before-close="handleClose">
            <el-form :model="editForm" label-width="80px"  ref="editForm">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="editForm.email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="handleCancel()">取消</el-button>
                <el-button type="primary" @click.native="handleUpdate()">更新</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Qs from "qs"
    export default {
        data() {
            return {
                editForm:{
                    id:null,
                    name:"",
                    email:null,
                },
                editFormVisible:false,
                value:"0",
                queryWord:"",
                infos:[],
            }
        },
        methods:{
            handleCancel(){
                this.editFormVisible = false;
            },
            handleClose(){
                this.editFormVisible = false;
            },
            handleUpdate(){
                var url='/api/update?id='+this.editForm.id+"&name="+this.editForm.name+"&email="+this.editForm.email
                console.log(this.editForm.name,this.editForm.email)
                this.$axios
                    .get(url)
                    .then((response) =>{
                        this.onSubmit();
                        alert(response.data)
                    }).catch(function (error) {
                    alert("修改失败");
                });

                this.editFormVisible = false;
            },
            handleEdit(row){

                this.editFormVisible = true;
                this.editForm = Object.assign({}, row);
            },
            deleteRow(index,rows) {
                var row=rows[index]
                rows.splice(index,1)
                this.$axios
                    .get('/api/delete/'+row.id
                    )
                    .then((response) =>{
                        alert(response.data)

                    })
                    .catch(function (error) {
                        alert("删除失败");
                    });
            },

            onSubmit(){
                this.infos=[]
                switch (this.value) {
                    case "0":
                        this.$axios
                            .get('/api/getByName?name='+this.queryWord
                            )
                            .then((response) =>{
                                var i=0
                                while(i<response.data.length){
                                    this.infos.push(response.data[i])
                                    i++
                                }

                            })
                            .catch(function (error) {
                                alert("查询失败");
                            });
                        break;

                    default:
                        this.$axios
                            .get('/api/getByEmail?email='+this.queryWord
                            )
                            .then((response) =>{
                                var i=0
                                while(i<response.data.length){
                                    this.infos.push(response.data[i])
                                    i++
                                }

                            }).catch(function (error) {
                            alert("查询失败");
                        });
                        break;
                }
            }
        }
    }
</script>

<style>
    el-form-item{
        display: inline;
    }
</style>