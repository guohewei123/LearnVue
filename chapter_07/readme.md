[# Vue 项目开发配套工具
## lesson_01 VueCLI 的使用

1. 安装 nodejs > v12.xx
    ```shell
    node -v  # node版本: v12.14.0
    npm -v   # npm版本:  6.13.4
    # 安装 nodejs命令
    yum install -y wget
    wget https://nodejs.org/download/release/v12.14.0/node-v12.14.0-linux-x64.tar.xz
    sudo mkdir -p /usr/local/lib/nodejs
    sudo tar -xf node-v12.14.0-linux-x64.tar.xz -C /usr/local/lib/nodejs
    export PATH=/usr/local/lib/nodejs/node-v12.14.0-linux-x64/bin:$PATH
    node -v
    npm -v
    ```
2. 安装 nrm： 
    ```shell
    # 1. 安装 nrm
    $ npm install nrm -g
    # 2. 查看镜像原：nrm ls
    $ nrm ls
    
      npm ---------- https://registry.npmjs.org/
      yarn --------- https://registry.yarnpkg.com/
      tencent ------ https://mirrors.cloud.tencent.com/npm/
      cnpm --------- https://r.cnpmjs.org/
      taobao ------- https://registry.npmmirror.com/
      npmMirror ---- https://skimdb.npmjs.com/registry/
    
    # 3. 设置使用镜像原为 taobao
    $ nrm use taobao
    
       Registry has been set to: https://registry.npmmirror.com/
    
    ```
3. 安装 vue-cli
    ```shell
    # 1. 先删除 旧的 vue-cli
    $ npm uninstall vue-cli -g
    $ yarn global remove vue-cli
    
    # 2. 安装 vue-cli
    $ npm install -g @vue/cli
    $ npm install -g @vue/cli@4.5.9  # 指定安装版本
    ```

4. 创建项目
   ```shell
   $ vue create dome
   
      cd demo
      npm run serve  
   ```

5. 启动项目
   ```shell
   $ cd demo
   $ npm run serve  
   ```
6. Todo-List 功能代码："chapter_07/lesson_01/demo"

## lesson_02 Vue-Router 路由的理解和使用
1. 路由是指根据 url 的不 同，展示不同的内容
2. router-link 是跳转路由的标签
3. router-view 是负责展 示当前路由对应的组件内容
4. 惰性加载的路由: 首次页面不会加载，只有跳转到指定路由的时候才会加载 <br>
   component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
5. 示例代码: "chapter_07/lesson_02/demo"


## lesson_03 Vuex 的语法详解
1. VueX 数据管理架构
2. VueX 创建了一个全局唯一的仓库，用来存放全局数据
3. 修改 VueX 中的数据 总共分4步
   1. 第一步：dispatch 方法， 派发一个 action, 名字叫做 change
   2. 第二步：store 感知到 change 这个 action， 执行 store 中 actions 下面的方法 change 方法
   3. 第三步：(actions 下面的方法 change 方法) 会提交 commit 一个 叫做 change 的数据改变
   4. 第四步：mutation 感知到提交的 change 改变， 执行 mutations 下面的 change 方法, 进行改变数据
4. 如果只是同步操作的话，可以执行通过 执行 commit 方法 调用 "第四步" 进行修改
5. 为什么需要这么多步呢？VueX mutations 中写同步代码，actions 中写异步代码
6. mutations 里面只允许写同步代码，不允许写异步代码 但是 actions 中是可以写异步代码的，可以在异步代码中调用 commit
7. dispatch 和 actions 做关联，commit 和 mutations 关联
8. 通过 Composition API 使用 VueX 数据

## lesson_04 使用 axios 发送 ajax 请求
1. 安装 axios: `npm install axios --save`
2. 使用 axios 请求接口
