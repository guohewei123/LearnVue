# Composition API

## lesson_01 setup 函数使用
- 代码详情："chapter_06/lesson_01/index_1.html"

## lesson_02 ref, reactive 响应式的引用
1. 为什么需要 响应式的引用：
  因为 Vue 中的 data 定义的返回数据就是响应式引用， 当数据发生变化时，模板也会随之发生变化，
  但是 setup 函数返回的数据默认是 非相应式的， 所以需要通过 ref, reactive 将其转换成响应式变量
2. ref, reactive 原理：通过 proxy 对数据进行封装，当数据变化时触发模板等内容更新
3. ref 处理基础类型数据：String Number 等 <br>
  let name = ref("dell")  proxy 将 "dell" 变成 proxy({value: "dell"}) 这样的响应式引用
4. reactive 处理非基础类型数据 如 array object 等 <br>
  let  nameObj= reactive({name: "dell"}) proxy 将 "{name: "dell"}" 变成 proxy({name: "dell"}) 这样的响应式引用 
- 以上代码代码详见："chapter_06/lesson_02/index_1.html"

5. readonly 可限制响应式引用, 修饰后不可以响式修改
6. toRefs 可已将  proxy({name: "dell"}) 转换成 {name: proxy({value: "dell"})]
- 以上 5，6 代码详见： "chapter_06/lesson_02/index_2.html"

7. toRef 的功能与 toRefs 类似，区别是当 const {age} = toRef(nameObj, "age") 当 nameObj 中不存在age属性时不会报错，或给默认的 undefined
- 代码详见： "chapter_06/lesson_02/index_3.html"
8. setup 的 context 参数
   - context 参数
   - const {attrs, slots, emit} = context;
   - attrs 中放置 None-Props属性
   - slots 中放置相关插槽的虚拟 DOM
   - emit 实现自定义事件
   - 代码详见： "chapter_06/lesson_02/index_4.html"
## lesson_03 使用 Composition API 开发 TodoList
1. 实现方法一  "chapter_06/lesson_03/index_1.html"
2. 实现方法二  "chapter_06/lesson_03/index_2.html"
3. 实现方法三  "chapter_06/lesson_03/index_3.html"

## lesson_04 使用computed 方法生成计算属性
- 使用 computed 方法生成计算属性
- 使用 computed 中的 get 和 set 属性

## lesson05 watch 和 watchEffect 的使用和差异性

### 1. watch 的使用
- watch 默认配置具备一定的惰性 lazy，即第一次页面加载时不会被侦听
- watch 可以通过传入 {immediate: true} 变成非惰性，页面加载后立即执行
- 参数可以拿到原始值 和 当前值
- 使用一个侦听器，侦听多个数据的变化
- 通过 stop() 取消侦听
- 以上代码详见 "chapter_06/lesson_05/ index_1.html index_2.html index_3.html "

### 2. watchEffect 的使用
- watchEffect 不需要传递很多参数，只需要传递一个回调函数
- watchEffect 是立即执行，第一加载页面就会执行 immediate
- watchEffect 检查到内部没有数据依赖时，就不会重复执行，侦听
- watchEffect 只能获取当前参数的值，不能获取之前的值
- 通过 stop() 取消侦听 
- watch 和 watchEffect 对比 代码详见："chapter_06/lesson_05/index_4.html"

## lesson_06 生命周期函数的新写法
- beforeMount    ==  onBeforeMount
- mounted        ==  onMounted
- beforeUpdate   ==  onBeforeUpdate
- updated        ==  onUpdated
- beforeUnmount  ==  onBeforeUnmount
- Unmounted      ==  onUnmounted
- onRenderTracked 每次渲染后，重新搜集响应式依赖时执行
- onRenderTriggered 每次触发页面重新渲染时自动执行
- 详见代码："chapter_06/lesson_06/index_1.html"

## lesson_07 Provide, Inject 和模板 Dom Ref 的用法

- Provide, Inject 的用法: 详见代码：`chapter_06/lesson_07/index_1.html`

- 如何在 Composition API 中通过 Dom ref 获取 Dom 元素
  1. 需要在模板中定义 ref: <div ref="hello">Hello</div>
  2. 需要在 setup 函数中创建一个空的响应式变量，名字与 Dom ref 一致： const {ref} = Vue; let hello = ref(null)
  3. 需要在 setup 函数中返回 创建的 空响应式变量，变量名字要与 Dom ref 一致
  4. 代码详见：`chapter_06/lesson_07/index_2.html`
