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
                this.search(query, this.url)  
        }, 500)
    },
    updated(){
        setTimeout(
            ()=> {
                this.isLoaded = true;
            }
        ,2000)
    },
    methods: {
        resetKey(){
            this.query = '';
        },
        resetUrl(){
            this.url = '';
        },
        first(){     
            this.search(this.query, this.url, this.pagination.first)                        
        },
        last(){      
            this.search(this.query, this.url, this.pagination.last)                        
        },
        prev(){      
            this.search(this.query, this.url, this.pagination.prev)                        
        },
        next(){
            this.search(this.query, this.url, this.pagination.next)                        
        },
        async search(query, url, pagination){   
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
        },
        // loading(){
        //     let result = document.getElementById('result');
        //     result.innerHTML = `
        //     <span id="loading">
        //         <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        //             style="margin: auto; background: none; display: block; shape-rendering: auto;" width="231px"
        //             height="231px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        //             <circle cx="84" cy="50" r="10" fill="#9b56f1">
        //                 <animate attributeName="r" repeatCount="indefinite" dur="0.3623188405797101s"
        //                     calcMode="spline" keyTimes="0;1" values="5;0" keySplines="0 0.5 0.5 1" begin="0s">
        //                 </animate>
        //                 <animate attributeName="fill" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1"
        //                     values="#9b56f1;#f1c8fe;#d3a6f1;#b885f8;#9b56f1" begin="0s"></animate>
        //             </circle>
        //             <circle cx="16" cy="50" r="10" fill="#9b56f1">
        //                 <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;5;5;5"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        //                 <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate>
        //             </circle>
        //             <circle cx="50" cy="50" r="10" fill="#b885f8">
        //                 <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;5;5;5"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        //                     begin="-0.3623188405797101s"></animate>
        //                 <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        //                     begin="-0.3623188405797101s"></animate>
        //             </circle>
        //             <circle cx="84" cy="50" r="10" fill="#d3a6f1">
        //                 <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;5;5;5"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        //                     begin="-0.7246376811594202s"></animate>
        //                 <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        //                     begin="-0.7246376811594202s"></animate>
        //             </circle>
        //             <circle cx="16" cy="50" r="10" fill="#f1c8fe">
        //                 <animate attributeName="r" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;5;5;5"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        //                     begin="-1.0869565217391304s"></animate>
        //                 <animate attributeName="cx" repeatCount="indefinite" dur="1.4492753623188404s"
        //                     calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84"
        //                     keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
        //                     begin="-1.0869565217391304s"></animate>
        //             </circle>
        //             <!-- [ldio] generated by https://loading.io/ -->
        //         </svg>
        //     </span>
        //     `;
        // }
    },
})