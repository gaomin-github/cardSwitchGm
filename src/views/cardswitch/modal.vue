<template>
    <div class="modal-wrapper">
        <transition name="mask">
            <div class="modal-mask" v-show="showModal" @click="closeModal">

            </div>
        </transition>
        <transition name="modalcon">
            <div class="modal-con" v-show="showModal" :style="`backgroundImage:url(${bgUrl})`">
                <div class="modal-con-title">启动失败！</div>
                <div class="modal-con-subtitle">资源需要网络访问，请检查你的网络！</div>
                <div class="modal-con-btn actbtn" @click="closeModal">确定</div>
                <div class="modal-con-btn" @click="closeModal">返回</div>

            </div>

        </transition>
    </div>
</template>
<script>
    export default{
        props:{
            showModal:{
                type:Boolean,
                default:false
            },
            bgUrl:{
                type:String,
                default:''
            }
        },
        methods:{
            closeModal(){
                this.$emit('closeModal',false)
            }
        }
    }
</script>
<style lang="scss" scoped>
.modal-wrapper{
    position:fixed;
    width:100%;
    height:100%;
    z-index:10;
}
.modal-mask{
    position:fixed;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.6);
    z-index:30;
}
.modal-con{
    position:absolute;
    z-index:50;
    width:500px;
    height: 300px;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    background:rgba(255,255,255,0.9);
    text-align:center;
    overflow:hidden;
    background-size: auto 100%;
    color:#fff;
    &-bg{
        position:absolute;
        /* width:100%; */
        height:100%;
        display:block;
        z-index:-1;
    }
    &-title{
        line-height:100px;
    }
    &-subtitle{
        line-height: 40px;
    }
    &-btn{
        width:180px;
        line-height:50px;
        border-radius:15px;
        margin:0 auto;
        margin-top:10px;
        border:1px #fff solid;
    }
}
.mask-enter,
.mask-leave-to{
    opacity:0;
}
.mask-enter-active,.mask-leave-active{
    transition: all .5s ease-in;
}
.modalcon-enter,
.modalcon-leave-to{
    height:0px;
    width:0px;
    /* transform:scale(0.1,0.1) translate(-50%,-50%); */
    opacity:0;
}
.modalcon-enter-to,
.modalcon-leave{
    /* transform:scale(1,1); */
    /* transform:translate(-50%,-50%); */


}
.modalcon-enter-active,.modalcon-leave-active{
    transition: all .8s ease;
}

</style>