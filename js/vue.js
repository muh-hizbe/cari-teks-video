new Vue({
    el: '#app',
    data: {
        url: 'https://www.youtube.com/watch?v=klnvttPfOUM',
        query: '',
        respons: [],
        isLoaded: false,
        pagination: {
            first: null,
            last: null,
            prev: null,
            next: null,
            total: 0,
            page: null,
        },                
    },
    watch: {
        query: pDebounce(function query(query) {            
                this.search(query, this.url);
        }, 500)
    },
    updated() {
        setTimeout(
            () => {
                this.isLoaded = true;
            }
        , 1000);
    },
    methods: {
        resetKey() {
            this.query = '';
        },
        resetUrl() {
            this.url = '';
        },
        first() {     
            this.search(this.query, this.url, this.pagination.first)                        
        },
        last() {      
            this.search(this.query, this.url, this.pagination.last)                        
        },
        prev() {      
            this.search(this.query, this.url, this.pagination.prev)                        
        },
        next() {
            this.search(this.query, this.url, this.pagination.next)                        
        },
        async search(query, url, pagination) {   
            if (query === '') {            
                this.isLoaded = true;                  
            } else {                
                this.isLoaded = false;                  
            }
            const baseUrl = 'https://cari-teks-video-api.vercel.app/api/search';
            let _url = `${baseUrl}?url=${encodeURIComponent(url)}&q=${query}`;
            try {
                if (pagination) {
                    _url = pagination;
                }
                const response = await fetch(_url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }                        
                    return [];
                })
                this.respons = response.data;
                this.pagination.first = response.first;
                this.pagination.prev = response.prev;
                this.pagination.next = response.next;
                this.pagination.last = response.last;
                this.pagination.total = response.total;
                this.pagination.page = response.page;                                              
            } catch (error) {
                console.log(error);
            }                    
        }
    },
})