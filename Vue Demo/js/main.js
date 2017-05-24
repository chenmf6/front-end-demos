/*part 1*/
new Vue({
    el: '#app-1',
    data: {
        name: 'Vue.js'
    },
    methods:{
        reverseName: function(){
            this.name = this.name.split('').reverse().join('')
        }
    }
})

/* part2：使用Vue+VueRouter实现导航切换
*/
//定义组件
var home= {template:'<div><h1>Home</h1></div>'}
var news={template:'<div><h1>News</h1></div>'}
var sports={template:'<div><h1>Sports</h1></div>'}
var weather={template:'<div><h1>Weather</h1></div>'}
//创建VueRouter实例并定义路由
var router=new VueRouter({
    routes:[
        {path:'/', component: home},
        {path:'/home', component: home},
        {path:'/news', component: news},
        {path:'/sports', component: sports},
        {path:'/weather', component: weather}
    ]
})
//创建并挂载Vue实例
new Vue({
    router
}).$mount("#app-2")


/*part3*/
Vue.component('todo-item',{
    props:['todo'],
    template: '<li>{{todo.text}}</li>'
})

new Vue({
    el:'#app-3',
    data:{
        itemList:[
        {text: 'todo-item1'},
        {text: 'todo-item2'}
        ]
    }
})

/*part 4*/
new Vue({
    el: '#app-4',
    data: {
        message: 'Hello',
        firstName:'Foo',
        lastName:'Bar'
    },
    computed:{
        //getter
        reversedMessage: function(){
            return this.message.split('').reverse().join('')
        },
        fullName: function(){
            return this.firstName + ' ' + this.lastName
        }
    }
})

new Vue({
    el: '#app-5',
    data:{
        question:'',
        answer:'I cannot give you an answer until you ask me a question!'
    },
    watch:{
        question: function(newQuestion){
            this.answer = 'Waiting for you to stop typing...'
            this.getAnswer()
        }
    },
    methods:{
        getAnswer:_.debounce(function(){
            if(this.question.indexOf('?')===-1){
                this.answer = 'Questions usually contain a question mark. -)'
                return
            }
            this.answer = 'Thinking...'
            var vm = this
            axios.get('https://yesno.wtf/api')
            .then(function(response){
                vm.answer = _.capitalize(response.data.answer)
            })
            .catch(function(error){
                vm.answer = 'Error! Could not reach the API ' + error
            })
        }, 500)
    }
})

/*app-6*/
Vue.component('todo-item',{
    template: '<li>{{title}}\
    <button v-on:click="$emit(\'remove\')">X</button></li>',

    props: ['title']
})

new Vue({
    el:'#app-6',
    data:{
        newTodoText:'',
        todos:[
            'todo-1',
            'todo-2',
            'todo-3'
        ]
    },
    methods:{
        addNewTodo: function(){
            this.todos.push(this.newTodoText)
            this.newTodoText=''
        }
    }
})

Vue.component('button-counter',{
    template:'<button v-on:click="increment">{{counter}}</button>',
    data:function(){
        return {counter:0}
    },
    methods:{
        increment:function(){
            this.counter+=1
            this.$emit('increment')
        }
    },
})

new Vue({
    el:'#app-7',
    data:{
        total:0
    },
    methods:{
        incrementTotal:function(){
            this.total +=1
        }
    }
})

new Vue({
    el:'#app-8',
    data:{
        show:true,
        docState: 'editing',
        docStates:[
            'saved',
            'edited',
            'editing'
        ]
    },
    computed:{
        buttonMsg:function(){
            switch(this.docState){
                case 'saved': return 'Edit'
                case 'edited': return 'Save'
                case 'editing': return 'Cancel'
                default: return '...'
            }
        }
    }
})

new Vue({
    el:'#app-9',
    data:{
        view:'v-a'
    },

    components:{
        'v-a':{
            template:'<div>Component A</div>'
        },
        'v-b':{
            template:'<div>Component B</div>'
        }
    }
})

new Vue({
    el:'#app-10',
    data:{
        items:[1,2,3,4,5,6,7],
        nextNum: 8
    },
    methods:{
        randomIndex:function(){
            return Math.floor(Math.random() * this.items.length)
        },
        add:function(){
            this.items.splice(this.randomIndex(), 0, this.nextNum++)
        },
        remove:function(){
            this.items.splice(this.randomIndex(), 1)
        },
        shuffle:function(){
            this.items=_.shuffle(this.items)
        }
    }
})

new Vue({
    el:'#sudoku-demo',
    data:{
        cells:Array.apply(null, {length:81})
            .map(function(_,index){
                return {
                    id: index,
                    number: index % 9 + 1
                }
            })
    },
    methods:{
        shuffle:function(){
            this.cells=_.shuffle(this.cells)
        }
    }
})

new Vue({
    el:'#staggered-list-demo',
    data:{
        query:'',
        list:[
            { msg: 'Bruce Lee' },
            { msg: 'Jackie Chan' },
            { msg: 'Chuck Norris' },
            { msg: 'Jet Li' },
            { msg: 'Kung Fury' }
        ]
    },
    computed:{
        computedList: function(){
            var vm = this;
            return this.list.filter(function(item){
                return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
            })
        }
    },
    methods:{
        beforeEnter: function(el){
            el.style.opacity = 0
            el.style.height = 0
        },
        enter: function(el, done){
            var delay = el.dataset.index * 150
            setTimeout(function(){
                Velocity(
                    el,
                    {opacity:1, height: '1.6em'},
                    {complete: done}
                )
            }, delay)
        },
        leave: function(el, done){
            var delay = el.dataset.index*150
            setTimeout(function(){
                Velocity(
                    el,
                    {opacity: 0, height:0},
                    {complete:done}
                )
            }, delay)
        }
    }
})

new Vue({
    el:'#dynamic-fade-demo',
    data:{
        show: true,
        fadeInDuration: 1000,
        fadeOutDuration: 1000,
        maxFadeDuration: 1500,
        stop: false
    },
    mounted: function(){
        this.show = false
    },
    methods:{
        beforeEnter:function(el){
            el.style.opacity = 0
        },
        enter:function(el, done){
            var vm = this
            Velocity(el,
                {opacity:1},
                {
                    duration:this.fadeInDuration,
                    complete:function(){
                        done()
                        if(!vm.stop) vm.show = false
                    }
                }
            )
        },
        leave: function(el, done){
            var vm = this
            Velocity(el,
                {opacity:0},
                {
                    duration:this.fadeOutDuration,
                    complete:function(){
                        done()
                        vm.show = true
                    }
                }
            )
        }
    }
})

