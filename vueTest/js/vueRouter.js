/*
    // 0. 如果使用模块化机制编程， 要调用 Vue.use(VueRouter)
    // 1. 定义（路由）组件。
    // 可以从其他文件 import 进来
    const firstPage = {
        template: '<div>firstpage</div>'
    }
    const secondPage = {
        template: '<div>secondpage</div>'
    }
    // 2. 定义路由
    // 每个路由应该映射一个组件。 其中"component" 可以是
    // 通过 Vue.extend() 创建的组件构造器，
    // 或者，只是一个组件配置对象。
    // 我们晚点在讨论嵌套路由。
    const routes = [{
        path: "/firstpage",
        component: firstPage
    }, {
        path: "/secondpage",
        component: secondPage
    }]
    // 3. 创建 router 实例，然后传 `routes` 配置
    // 你还可以传别的配置参数，不过先这么简单着吧。
    const router=new VueRouter({
        routes  
        // （缩写）相当于 routes: routes
    })
    // 4. 创建和挂载根实例。
    // 记得要通过 router 配置参数注入路由，
    // 从而让整个应用都有路由功能
    const app=new Vue({
        router
    }).$mount('#appTest');
*/

/*
    const User={
        template:"<div>{{$route.params.id}},{{$route.params.name}}</div>"
    }

    const router=new VueRouter({
        routes:[{
            path:"/user/:id/name/:name",component:User
        }]
    })

    const app2=new Vue({
        router
    }).$mount("#appTest2")
*/

const User = {
    template: '<div class="user"><h2>User{{$route.params.id}}</h2><router-view></router-view></div>'
}

const UserProfile = {
    template: '<div>it is profile</div>'
}

const UserCard = {
    template: '<div>it is card</div>'
}

const UserHome = {
    template: '<div>it is home</div>'
}

const router = new VueRouter({
    routes: [{
        path: "/user/:id",
        component: User,
        children: [
            { path: "", component: UserHome },
            { path: "profile", component: UserProfile },
            { path: "card", component: UserCard }
        ]
    }]
})

const app3 = new Vue({
    router
}).$mount("#appTest3")
