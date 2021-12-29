## lesson_01 组件的定义及复用性-全局组件
- 全局组件，只用定义了，处处可以使用，性能不高，但是使用起来简单
    ```js
    // 组件的定义
    // 组件具备复用性
    // 全局组件，只用定义了，处处可以使用，性能不高，但是使用起来简单
    app = Vue.createApp({
        template: `
          <div>
              <parent-counter />
              <counter />
              <counter />
          </div>
        `
    });

    app.component("parent-counter", {
        template: `
        <div><counter \></div>
        `
    })

    app.component("counter", {
        data() {
           return {
               count: 1
           }
        },
        template: `
        <div @click="count += 1"><h1>{{count}}</h1></div>
        `
    });
    ```
## lesson_02 组件的定义及复用性-局部组件
- 全局组件，只用定义了，处处可以使用，性能不高，但是使用起来简单，名字建议 小写字母单词，中间用中横线连接
- 局部组件，定义后需要注册之后才能使用，性能比较高，使用起来比较麻烦，名字建议，建议首字母大写，驼峰式命名
  ```js
  // 全局组件，只用定义了，处处可以使用，性能不高，但是使用起来简单，名字建议 小写字母单词，中间用中横线连接
    // 局部组件，定义后需要注册之后才能使用，性能比较高，使用起来比较麻烦，名字建议，建议首字母大写，驼峰式命名
    Counter = {
        data() {
            return {
                count: 1
            }
        },
        template: `
        <div @click="count += 1"><h1>{{count}}</h1></div>
        `
    }
    HelloWorld = {
        template: `<div>Hello World</div>`
    }
    app = Vue.createApp({
        components: {
            // counter: Counter,
            // "hello-world": HelloWorld
            Counter, HelloWorld
        },
        template: `
          <div>
              <hello-world></hello-world>
              <counter></counter>
          </div>
        `
    });
  ```
## lesson_03 组件间传值和传值校验
1. 普通传参：   props: ["subContent"]
2. 校验参数类型：props: {"subContent": String}
3. type: String, Number, Boolean, Array, Object, Function, Symbol
4. 其他校验：required 必填， default 默认值, validator 自定义验证返回Boolean
    ```js
    // 1. 普通传参：   props: ["subContent"]
    // 2. 校验参数类型：props: {"subContent": String}
    // type: String, Number, Boolean, Array, Object, Function, Symbol
    // 3. 其他校验：required 必填， default 默认值, validator 自定义验证返回Boolean
    Test = {
      // props: ["subContent"],
      props: {
        "subContent": {
          type: Number,
          required: true,
          default: 222,
          validator: function (value) {
            return value < 100
          }
        }
      },
      template: `
              <div>{{ subContent }}</div>
            `
    }
    
    app = Vue.createApp({
      data() {
        return {
          content: 123
        }
      },
      components: {
        test: Test,
      },
      template: `
              <div>
              <test :subContent="content"/>
    <!--          <test />-->
              </div>
            `
    });
    ```

## lesson_04 单向数据流的理解
- 当传递到子组件的数据比较多的时候 使用 v-bind="obj"
- v-bind="content" 等价于下面
- :a="content.a" :b="content.b" :c="content.c" :d="content.d"
    ```js
    // 1. 当传递到子组件的数据比较多的时候 使用 v-bind="obj"
    // v-bind="content" 等价于下面
    // :a="content.a" :b="content.b" :c="content.c" :d="content.d"
    Test = {
        props: ["a", "b", "c", "d"],
        template: `
          <div>{{a}}--{{b}}--{{c}}--{{d}}</div>
        `
    }
    app = Vue.createApp({
        data() {
            return {
                content: {
                    a: 111,
                    b: 222,
                    c: 333,
                    d: 444
                }
            }
        },
        components: {
            test: Test,
        },
        template: `
          <div>
          <test v-bind="content"/>
          </div>
        `
    });
    ```
- 组件属性传递的时候,使用 hello-world 这种命名方式，子组件接的时候使用 helloWorld 命名
    ```js
    Test = {
        props: ["helloWorld"],
        template: `
          <div>{{helloWorld}}</div>
        `
    }
    app = Vue.createApp({
        data() {
            return {
                content: "1111"
            }
        },
        components: {
            test: Test,
        },
        template: `
          <div>
          <test :hello-world="content"/>
          </div>
        `
    });
    ```
- 单向数据流的概念：子组件可以使用父组件传递过来的值，但是不能修改传递过来的值（子组件可以通过，重新定义变量，实现修改）
    ```js
    // 单向数据流的概念：子组件可以使用父组件传递过来的值，但是不能修改传递过来的值（子组件可以通过，重新定义变量，实现修改）
    Test = {
        props: ["num"],
        data() {
            return {
                localNum: this.num
            }
        },
        template: `
    <!--          <div @click="num += 1">{{num}}</div>-->
          <div @click="localNum += 1">{{localNum}}</div>
        `
    }
    app = Vue.createApp({
        data() {
            return {
                num: 1
            }
        },
        components: {test: Test},
        template: `
          <div>
          <test :num="num"/>
          </div>
        `
    });
    ```
## lesson_05 Non-prop 属性
1. Non-prop 属性 是指子组件没有使用 props 接收的属性，通常可用于 样式的传递 style
2. 子组件获取指定Non-prop 属性 <div :msg1="$attrs.msg1">Hi</div>
3. 子组件获取所有Non-prop 属性 <div v-bind="$attrs">Hi</div>
4. 使用 "inheritAttrs: false" 默认将不继承Non-prop 属性
    ```js
    inheritAttrs: false,
    template: `<div>Hi</div>`
    ```
5. 可以使用 "this.$attrs, this.$attrs.msg1" 来接收 Non-prop 属性
    ```js
    // 1. Non-prop 属性 是指子组件没有使用 props 接收的属性，通常可用于 样式的传递 style
    // 2. 子组件获取指定Non-prop 属性 <div :msg1="$attrs.msg1">Hi</div>
    // 3. 子组件获取所有Non-prop 属性 <div v-bind="$attrs">Hi</div>
    // 4. 使用 "inheritAttrs: false" 默认将不继承Non-prop 属性
    /*inheritAttrs: false,
      template: `<div>Hi</div>`*/
    // 5. 可以使用 "this.$attrs, this.$attrs.msg1" 来接收 Non-prop 属性
    Test = {
        // inheritAttrs: false,
        data(){
          return {
              msg: this.$attrs.msg1,
              allMsg: this.$attrs
          }
        },
        template: `
    <!--          <div>Hi</div>-->
          <div :msg1="$attrs.msg1">{{msg}}</div>
          <div v-bind="$attrs">{{allMsg}}</div>
          <div :msg2="$attrs.msg2">{{allMsg.msg2}}</div>
        `
    }
    app = Vue.createApp({
        components: {test: Test},
        template: `
          <div >
          <test msg1="hello1" msg2="hello2" />
          </div>
        `
    });
    ```
## lesson_06 父子组件间如何通过事件进行通信
1. 子组件 生成自定义事件 "addOne"，父组件监听 "@add-one" 事件，并修改count值，实现counter
    ```js
    // 1. 子组件 生成自定义事件 "addOne"，父组件监听 "@add-one" 事件，并修改count值，实现counter
    Test = {
        props: ["count"],
        methods: {
            handleClick() {
                this.$emit("addOne")
            }
        },
        template: `<div @click="handleClick">{{count}}</div>`
    }
    app = Vue.createApp({
        components: {test: Test},
        data(){
          return {
              count: 1
          }
        },
        methods: {
            handleAddOne(){
                this.count += 1
            }
        },
        template: `
          <div >
          <test :count="count" @add-one="handleAddOne" />
          </div>
        `
    });
    ```
2. 子组件 生成的自定义事件 "Add" 时，可以为其传入参数
    ```js
    Test = {
        props: ["count"],
        methods: {
            handleClick() {
                // this.$emit("add", 2)
                this.$emit("add", this.count + 3)
            }
        },
        template: `<div @click="handleClick">{{count}}</div>`
    }
    app = Vue.createApp({
        components: {test: Test},
        data(){
          return {
              count: 1
          }
        },
        methods: {
            handleAdd(arg){
                this.count = arg
            }
        },
        template: `
          <div >
          <test :count="count" @add="handleAdd" />
          </div>
        `
    });
    ```
3. 子组件 可以声明自定义的事件名称(emits: ["add"]) 
4. 子组件 可以声明自定义的事件名称, 同时也可以对其入参进行验证
    ```js
    Test = {
        props: ["count"],
        // emits: ["add"],
        emits: {
            add: (arg) => {
                if (arg < 0) {
                    return true
                } else {
                    return false
                }
            }
        },
        methods: {
            handleClick() {
                // this.$emit("add", 2)
                this.$emit("add", this.count + 2)
            }
        },
        template: `
          <div @click="handleClick">{{ count }}</div>`
    }
    app = Vue.createApp({
        components: {test: Test},
        data() {
            return {
                count: 1
            }
        },
        methods: {
            handleAdd(arg) {
                this.count = arg
            }
        },
        template: `
          <div>
          <test :count="count" @add="handleAdd"/>
          </div>
        `
    });
    ```
5. 高级实现：父组件通过 v-model="count" 双向绑定，子组件接收固定参数 "modelValue", 触发 "update:modelValue" 事件返回 新的值绑定到 count
6. "modelValue" 是固定值，也可以自定义，通过 v-model:countValue="count" 这样就实现了自定义为 "countValue"
    ```js
    // 1. 子组件 生成自定义事件 "addOne"，父组件监听 "@add-one" 事件，并修改count值，实现counter
    // 2. 子组件 生成的自定义事件 "Add" 时，可以为其传入参数
    // 3. 子组件 可以声明自定义的事件名称 emits: ["add"]
    // 4. 子组件 可以声明自定义的事件名称, 同时也可以对其入参进行验证
    // 5. 高级实现：父组件通过 v-model="count" 双向绑定，子组件接收固定参数 "modelValue", 触发 "update:modelValue" 事件返回 新的值绑定到 count
    // 6. "modelValue" 是固定值，也可以自定义，通过 v-model:countValue="count" 这样就实现了自定义为 "countValue"
    /*Test = {
        props: ["modelValue"],
        methods: {
            handleClick() {
                this.$emit("update:modelValue", this.modelValue + 2)
            }
        },
        template: `
          <div @click="handleClick">{{ modelValue }}</div>`
    }
    app = Vue.createApp({
        components: {test: Test},
        data() {
            return {
                count: 1
            }
        },
        template: `
          <div>
          <test v-model="count"/>
          </div>
        `
    });*/

    // 6. "modelValue" 是固定值，也可以自定义，通过 v-model:countValue="count" 这样就实现了自定义为 "countValue"
    Test = {
        props: ["countValue"],
        methods: {
            handleClick() {
                this.$emit("update:countValue", this.countValue + 2)
            }
        },
        template: `
          <div @click="handleClick">{{ countValue }}</div>`
    }
    app = Vue.createApp({
        components: {test: Test},
        data() {
            return {
                count: 1
            }
        },
        template: `
          <div>
          <test v-model:countValue="count"/>
          </div>
        `
    });
    ```
7. 自定义修饰符 uppercase ... , 子组件通过 modelModifiers 接收修饰符
    ```js
    // 1. 子组件 生成自定义事件 "addOne"，父组件监听 "@add-one" 事件，并修改count值，实现counter
    // 2. 子组件 生成的自定义事件 "Add" 时，可以为其传入参数
    // 3. 子组件 可以声明自定义的事件名称 emits: ["add"]
    // 4. 子组件 可以声明自定义的事件名称, 同时也可以对其入参进行验证
    // 5. 高级实现：父组件通过 v-model="count" 双向绑定，子组件接收固定参数 "modelValue", 触发 "update:modelValue" 事件返回 新的值绑定到 count
    // 6. "modelValue" 是固定值，也可以自定义，通过 v-model:countValue="count" 这样就实现了自定义为 "countValue"
    // 7. 自定义修饰符 uppercase ... , 子组件通过 modelModifiers 接收修饰符
    Test = {
        props: {
            modelValue: String,
            modelModifiers: {
                default: ()=> ({})   // 如果没有传入修饰符时，modelModifiers 会使用默认值 空对象{}
            }
        },

        methods: {
            handleClick() {
                let newValue = this.modelValue + "b"
                if (this.modelModifiers.uppercase) {   // 判断 this.modelModifiers.uppercase == true
                    newValue = newValue.toUpperCase()
                }
                this.$emit("update:modelValue", newValue)
            }
        },
        template: `
          <div @click="handleClick">{{ modelValue }}</div>`
    }
    app = Vue.createApp({
        components: {test: Test},
        data() {
            return {
                count: "a"
            }
        },
        template: `
          <div>
          <test v-model.uppercase="count"/>
          </div>
        `
    });
    ```
## lesson_07 使用插槽和具有名插槽解决组件内容传递问题
1. slot 插槽
2. 父模板里调用的数据属性，使用的都是父模板里的数据
3. 子模板里调用的数据属性，使用的都是子模板里的数据
4. slot 设置默认值 <slot> <button>默认提交</button></slot>
    ```js
    // 1. slot 插槽
    // 2. 父模板里调用的数据属性，使用的都是父模板里的数据
    // 3. 子模板里调用的数据属性，使用的都是子模板里的数据
    // 4. slot 设置默认值 <slot> <button>默认提交</button></slot>
    Test = {
        methods: {
            handleClick() {
                alert(123)
            }
        },
        template: `
          <div>
              <input />
              <span @click="handleClick">
                <slot> <button>默认提交</button></slot>
              </span>
          </div>
        `
    }
    app = Vue.createApp({
        components: {test: Test},
        data() {
            return {
                text: "提交"
            }
        },
        template: `
          <div>
            <test>
                <div>{{text}}</div>
            </test>
            <test>
                <button>{{text}}</button>
            </test>
            <test />
          </div>
        `
    });
    ```
5. 具名插槽, 通过给插槽定义名字，使用的时候可以指定要使用插槽名称，具名插槽 需要外层包 <template v-slot:header> </template>
6. 具名插槽 "v-slot:header" 可简写成 "#header"
    ```js
    Test = {
        template: `
          <div>
            <slot name="header"></slot>
            <div>content</div>
            <slot name="footer"></slot>
          </div>
        `
    }
    app = Vue.createApp({
        components: {test: Test},
        template: `
          <div>
            <test>
    <!--                <template v-slot:header>-->
                <template #header>
                    <div>header</div>
                </template>
                <template v-slot:footer>
                    <div>footer</div>
                </template>
            </test>

          </div>
        `
    });
    ```
7. 作用域插槽
    ```js
    // 1. slot 作用域插槽 子组件可以将值传递给父组件，由父组件决定如何展示 v-slot="slotData" {{slotData.item}}
    // 2. 通过对象解构简写：v-slot="slotData" {{slotData.item}} 可简写 v-slot="{item}" {{item}}
    Test = {
        data() {
            return {list: [1, 2, 3]}
        },
        template: `
          <div>
            <slot v-for="item in list" :item="item"></slot>
          </div>
        `
    }
    app = Vue.createApp({
        components: {test: Test},
        template: `
          <div>
    <!--            <test v-slot="slotData">-->
    <!--                <div>{{slotData.item}}</div>-->
            <test v-slot="{item}">
              <div>{{item}}</div>
            </test>

          </div>
        `
    });
    ```
## lesson_08 动态组件 和 异步组件
### 动态组件
1. 动态组件：通过 component 标签的 :is="" 属性动态切换组件 (可以替代 v-show 的实现方式)
2. 使用 keep-alive 可以缓存组件切换数据
    ```js
    // 1. 动态组件：通过 component 标签的 :is="" 属性动态切换组件 (可以替代 v-show 的实现方式)
    // 2. 使用 keep-alive 可以缓存组件切换数据
    Test = {
        template: `<input />`
    }

    Test1 = {
        template: `<div>Hello World</div>`
    }
    app = Vue.createApp({
        components: {test: Test, test1: Test1},
        data() {
            return {
                "componentName": "test"
            }
        },
        methods: {
            buttonClickHandle () {
                this.componentName = this.componentName === "test"? "test1":"test"
            }
        },
        template: `
    <!--    1. 使用 v-show 实现
            <test v-show="componentName === 'test'"/>
            <test1 v-show="componentName === 'test1'"/>-->
    <!--    2. 使用 动态组件实现-->
            <keep-alive>
                <component :is="componentName" />
            </keep-alive>
            <button @click="buttonClickHandle">切换</button>

        `
    });
    ```
### 异步组件
1. 异步组件, 异步执行某些组件的逻辑
    ```js
    // 1. 异步组件, 异步执行某些组件的逻辑
    Test = {
        template: `<div>Hello World</div>`
    }

    asyncCommonItem = Vue.defineAsyncComponent(()=>{
        return new Promise((resolve, reject) => {
            setTimeout(()=> {
                resolve({
                    template: `<div> this is a async component </div>`
                })
            }, 4000)
        })
    })

    app = Vue.createApp({
        components: {test: Test, "async-common-item": asyncCommonItem},
        template: `
            <test></test>
            <async-common-item />

        `
    });
    ```
## lesson_09 语法知识补漏
1. v-once 只渲染一次
    ```js
    app = Vue.createApp({
        data() {
            return {
                "count": 1
            }
        },
        methods: {
            buttonClickHandle () {
                this.count += 1
            }
        },
        template: `<div @click="buttonClickHandle" v-once>{{count}}</div>`
    });
    ```

2. ref 的使用（获取 dom 节点或者子组件的引用）
    ```js
    // 1. ref 获取 dom 节点 或者 子组件的引用 的一个语法
    // 2. 通过 ref 获取子组件的引用，然后调用子组件的方法等
    app = Vue.createApp({
        data() {
            return {
                "count": 1
            }
        },
        mounted(){
            console.log(this.$refs.count)
            this.$refs.count.innerHTML = "<div>Hello</div>"
            console.log(this.$refs.common)
            this.$refs.common.sayHello()
        },
        template: `
            <div ref="count">{{count}}</div>
            <common-item ref="common"/>

        `
    });

    app.component("common-item", {
        methods: {
            sayHello(){
                alert("hello")
            }
        },
        template: `<div>Hello World</div>`
    })
    ```
3. provide / inject 实现跨组件多层传递
    ```js
    app = Vue.createApp({
        data() {
            return {
                "count": 1
            }
        },
        /*provide: {
            count: 1
        },*/
        provide () {
            return {
                count: this.count
            }
        },
        template: `
            <child />

        `
    });

    app.component("child", {
        template: `<child-child />`
    })

    app.component("child-child", {
        inject: ["count"],
        template: `<div>{{count}}</div>`
    })
    ```
