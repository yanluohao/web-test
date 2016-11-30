new Vue({
    el: "#transitionDemo",
    data: {
        show: true
    }
})


new Vue({
    el: "#transitionDemo2",
    data: {
        show: true
    }
})

new Vue({
    el: "#animationDemo",
    data: {
        show: true
    }
})


new Vue({
    el: "#list-demo",
    data: {
        items: [1, 2, 3, 4, 5, 6],
        nextNum: 7
    },
    methods: {
        randomIndex: function() {
            return Math.floor(Math.random() * this.items.length);
        },
        addNum: function() {
            this.items.splice(this.randomIndex(), 0, this.nextNum++);
        },
        removeNum: function() {
            this.items.splice(this.randomIndex(), 1);
        }
    }
})


//watch的使用	
var vm = new Vue({
    data: {
        a: 1,
        b: 2
    },
    watch: {
        'a': function(val, oldVal) {
            console.log('new:%s,old:%s', val, oldVal);
        },
        'b': function(val, oldVal) {
            var diff = parseInt(val) - parseInt(oldVal);
            console.log('difference:%s,%s', diff, oldVal);
        }
    }
})

vm.a = 3;
vm.b = 4;


//对象字面量
Vue.directive('demo', function(el, binding) {
        console.log(binding.value.color);
        console.log(binding.value.name);
    })
    //在2.0中对应绑定model的input栏添加value=""时会被Vue抛出警告，默认是它无效
new Vue({
    el: "#modelTest",
    data: {
        msg: ""
    },
    //注册局部自定义指令，组件中接受一个directives的选项
    directives: {
        focus: {
            inserted: function(el) {
                el.focus();
            }
        }
    }
})


/*
全局自定义指令暂时报错
 // 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
*/

//mixin为混合对象,
var mixin = {
    methods: {
        foo: function() {
            console.log('foo')
        },
        conflicting: function() {
            console.log('from mixin')
        }
    }
}
var vm = new Vue({
	//这一步是将混合对象和组件对象混合，两个对象键名冲突时，取组件对象的键值对。
    mixins: [mixin],  
    methods: {
        bar: function() {
            console.log('bar')
        },
        conflicting: function() {
            console.log('from self')
        }
    }
})
vm.foo() // -> "foo"
vm.bar() // -> "bar"
vm.conflicting() // -> "from self"
