 Vue.component('add-btn',{
    template: `
    <div>
    <button v-if="!showEdit" @click="showEdit = true">+</button> 
    <div style="display: flex" v-else>
    <input v-model="key" type="text">:
    <div>
    <button v-if="!showEditOptions" @click="showEditOptions = true">value</button>
    <input v-if="showEditOptions == true && selectedValueType == 'simpleValue'" type="text" v-model="value">
    <select v-if="showEditOptions" v-model="selectedValueType">
    <option v-for="opt in valueOptions" :value="opt">{{opt}}</option>
    </select>
    </div>
    <button @click="saveProp()"><i class="fas fa-save"></i></button>
    <button @click="showEdit = false">x</button>
    </div>
    </div>
    `,
    props:{
        datatype: String
    },
    data(){
        return{
            key:null,
            selectedValueType:null,
            value:null,
            showEdit: false,
            showEditOptions: false,
            valueOptions: ["simpleValue", "array", "object"]

        }
    },

    methods: {
        saveProp(msg) {
            if(this.key === null || this.selectedValueType === null){
                return alert("missing values")
            }

            const val = {
               simpleValue: this.parseSimpleVal(),
               array: [],
               object: {}
           }[this.selectedValueType]

           this.$emit("saved", {[this.key]: val})
           this.reset()
       },

       parseSimpleVal(){

        if(['true','false'].includes(this.value)){
            return this.value === 'true';
        }

        return isNaN(parseInt(this.value)) ? this.value : parseInt(this.value)
    },

    reset(){
        this.showEdit = false;
        this.showEditOptions = false;
        this.key=null;
        this.selectedValueType=null;
        this.value=null;
    }
}
})