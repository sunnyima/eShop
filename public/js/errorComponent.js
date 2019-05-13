Vue.component('show-error',{
    data(){
        return {
            errorText: ''
        }
    },
    methods:{
        setErrorText(errorText){
            this.errorText = errorText;
            console.log(this.errorText);
        },
        viewError(){
            alert(this.errorText);
        }
    },
    template: `<button type="button" @click="viewError">Показать ошибку</button>`
});