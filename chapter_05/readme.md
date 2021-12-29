## lesson_01 Mixin 混入的基础语法

1. 全局 mixin 和 局部 mixin
2. 组件 data, methods 优先级高于 mixin 中的 data, methods
3. 生命周期函数， 限制性 mixin 中的，后执行组件中的
4. （1，2，3）详见代码： "chapter_05/lesson_01/index_1.html"
5. 自定义属性，组件的自定义属性高于 mixin 中的自定义属性
6. 可以修改自定义属性的优先级: app.config.optionMergeStrategies.xxx_attr = (mixinValue, appValue) => {return mixinValue || appValue}

## lesson_02 自定义指令 directive  
1. 全局 自定义指令，局部自定义指令
2. 不使用自定义指令实现输入框的聚焦，使用自定义指令实现聚焦
3. 自定化指令的生命周期函数示例 <br >beforeMount mounted <br >beforeUpdate updated<br > beforeUnmount unmounted
4. (1, 2, 3) 详见代码 "chapter_05/lesson_02/index_1.html"
5. directive 的传参 v-xxx:arg_xxx="value_xxx" , <br>可通过第二个参数binding获取： binding.arg 就是 arg_xxx, binding.value 就是 value_xxx
6. 简写 directive 中的 mounted 和 updated 生命周期函数
7. (4，5) 详见代码 "chapter_05/lesson_02/index_2.html"

## lesson_03 Teleport 传送门功能
- teleport 可以将组件内部的标签 传送到 其他指定的 dom 上
- 代码详见： "chapter_05/lesson_03/index_1.html"

## lesson_04 render 函数
- template -> render -> h -> 虚拟DOM(JS对象) -> 真实DOM -> 展示到页面上
- 代码详见： "chapter_05/lesson_04/index_1.html"

## lesson_05 插件的定义和使用 plugin
- plugin 插件，把通用型的功能封装起来

## lesson_06 对数据做校验的插件