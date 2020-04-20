# Element UI components

Some examples of the Element UI plugin.

## Tabs

:::: el-tabs

::: el-tab-pane label=title
__markdown content__
:::


::: el-tab-pane label=javascript
``` javascript
() => {
  console.log('Javascript code example')
}
```
:::

::::

## Collapse

:::: el-collapse
::: el-collapse-item title="Click to see more"
More.
Some more.
Even more.
:::
::::

## Timeline

Time line

:::: el-timeline
::: el-timeline-item timestamp="2018/4/12" placement="top"
We started
:::
::: el-timeline-item timestamp="2019/4/12" placement="top"
We evolved
:::
::: el-timeline-item timestamp="2020/4/12" placement="top" color="#0bbd87"
We reached the top
:::
::::

## Steps

:::: el-steps :active="2" align-center
::: el-step title="Install" description="Install first"
:::
::: el-step title="Explore" description="Now start playing"
:::
::: el-step title="Advanced" description="Move forward"
:::
::::
