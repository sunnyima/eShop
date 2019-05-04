Vue.component('filter-products',{
    data(){
        return {
            userSearch: '',
        }
    },
    template: `<form action="#" class="search-form" @submit.prevent ="$emit('filter-goods', userSearch)">
                    <input id="searchInput" class="search-input" type="text" v-model="userSearch" >
                    <button class="search-button" type="submit" id="searchButton">Найти</button>
                </form>`
});