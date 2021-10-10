let app = new Vue({
        el:"#app",
        created(){
            this.json = JSON.parse(localStorage.getItem("json")) ||  {}
        },
        data(){
            return{
                json: {},
            }
        },
        computed:{
            jsonString(){
                return JSON.stringify(this.json);
            }
        },
        methods:{
            addNew(e){
                this.json = Object.assign({}, this.json, e)
            }
        },
        watch:{
            json: function(val){
                localStorage.setItem("json", this.jsonString)
            }
        }


    })