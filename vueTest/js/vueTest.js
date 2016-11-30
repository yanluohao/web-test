new Vue({
    el: '#app',
    data: {
        message: "hello,Vue",
        message1: "YLH",
        names: [{
            bookName: "angularJS"
        }, {
            bookName: "react Native"
        }, {
            bookName: "vue.js"
        }]
    },
    methods: {
        reverseMessage: function() {
            this.message = this.message.split("").reverse().join("");
        }
    }
})
new Vue({
    el: "#testApp",
    data: {
        newsomeTest: "",
        tests: [
            { text: "这是一个默认的例子" }
        ]
    },
    methods: {
        addTest: function() {
            var text = this.newsomeTest.trim();
            if (text) {
                this.tests.push({ text: text });
                this.newsomeTest = "";
            }
        },
        removeMessage: function(index) {
            this.tests.splice(index, 1);
        }
    }
})
var exampleData = { name: " john " };
var exampleData2 = { name: " lily " };
new Vue({
    el: "#testexample",
    data: exampleData2
})
var vm = new Vue({
    el: "#addExample",
    data: {
        a: 1
    },
    computed: {
        //一个计算属性的getter
        b: function() {
            //this指向vm实例
            return this.a + 1
        }
    }
})

//计算属性setter and getter
var vm2 = new Vue({
        el: "#computeModule",
        data: {
            firstname: "joo",
            lastname: "nick"
        },
        computed: {
            // fullname:function(){
            // 	return this.firstname+" "+this.lastname
            // }
            fullname: {
                //getter
                get: function() {
                    return this.firstname + " " + this.lastname;
                },
                //setter
                set: function(newVal) {
                    var names = newVal.split(" ");
                    this.firstname = names[0];
                    this.lastname = names[names.length - 1];
                }
            }
        }
    })
    //绑定HTML Class
new Vue({
        el: "#classTest",
        data: {
            A: true,
            B: false,
            //类名绑定在一个数据里的一个对象
            classObject: {
                classC: true,
                classD: false
            },
            ok: true,
            no: false,
            male: true,
            condition: true,
            showTest: false
        },
        methods: {
            changeClass: function() {
                if (this.A) {
                    this.A = false;
                    this.B = true;
                } else {
                    this.A = true;
                    this.B = false;
                }
            }
        }
    })
    //v-for 的使用
var forTest = new Vue({
    el: ".forTest",
    data: {
        items: [{
            message: "firstMsg"
        }, {
            message: "secondMsg"
        }, {
            message: "thirdMsg"
        }, {
            message: "fourthMsg"
        }]
    }
})

new Vue({
    el:"#modelTest",
    data:{
        checkedNames:[],
        selected:"A",
        options:[{
            text:"One",value:"A"
        },{
            text:"Two",value:"B"
        },{
            text:"Three",value:"C"
        }],
        msg:"",
        choice:"",
        msg2:""
    }
})

new Vue({
    el:"#transition",
    data:{
        show:true
    }
})


//组件定义
var firstComponent=Vue.extend({
    template:'<div>first Try</div>'
})

//组件注册
Vue.component("first-component",firstComponent);

Vue.component("quick-component",{
   template:"<div>Quick</div>"
})

Vue.component("myslot-component",{
    template:'<div>'+
    '<slot name="cpu">请在这输入您的CPU</slot>'+
    '<slot name="gpu">请在这输入您的显卡</slot>'+
    '<slot name="memory">请在这输入您的内存</slot></div>'
})

//局部注册的另一种做法，目前存在报错
/*
Vue.component("parent-component",Parent);
var Parent=Vue.extend({
    components:{
        "child1-component":{
            template:"<div> i am child1</div>"
        }
    }
})
*/
//使用Props
Vue.component("child",{
    //声明props
    props:['msg'],
    template:'<span>{{msg}}</span>'
})

//创建根实例
new Vue({
    el:"#exampleComponent",
    data:{
        parentMsg:""
    }
})

//父子组件局部注册
//暂时存在报错
/*
var Child=Vue.extend({
    template:"<div>Child</div>"
})
var parent=Vue.extend({
    template:"<div>Parent:<child></child></div>",
    components:{
        "child":Child
    }
})

Vue.component("parent",parent);
new Vue({
    el:"#exampleComponent"
})
*/


Vue.component("manage-posts",{
    template:"#manage-template",
    data:function(){
        return {
            posts:[
            'Vue.js','React Native','Node.js'
            ]
        }
    }
})

Vue.component("create-posts",{
    template:"#create-template"
})


//异步组件的案例
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    resolve({
      template: '<div @click="show">I am async!</div><input type="text" v-model="val"/>',
      data:function(){
        return{
            val:"just do IT"
        }
      },
      methods:{
        show:function(){
            alert("show");
        }
      }
    })
  }, 1000)
})

new Vue({
    el:"body",
    data:{
        currentView:"create-posts"
    }
})

