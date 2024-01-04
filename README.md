# Ecolens System -- 基于 React + Vite + TypeScript 的高精度生态监测地图平台



### Ecolens System是一款开源地图服务平台，结合了高分辨率遥感数据和先进的图像处理技术，为用户提供全面、实时的生态环境信息

Visit us today and kickstart your next ecological adventure!

- [Ecolens System](http://www.ecolens.cn)ecolens.cn


# 产品功能展示

> 🌟 与 Ecolens 开始您的生态监测探索之旅！

## 产品首页

![图片1](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/b2243d69-5446-4306-ac77-07bdbfa55b49)

## 地图服务

#### 数据监控分析

#### 研究地区高精度遥感地图
![图片2](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/3926b7be-1c07-4aef-9652-2053dc65512c)
![图片3](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/ef964677-bf34-4115-ad0f-dd5337e8d0fc)

#### 松材线虫害区域无人机影像监测
![图片4](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/a7c2bd6f-bad7-4dde-88bc-fce969935136)
![图片5](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/bb96b985-867e-413c-b8d4-434e73c9f1d5)

#### 研究地区概况
![图片6](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/48aa824a-a1dc-4040-a477-4eb36d947953)

#### 研究地区生态状况
![图片7](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/32a5fc34-319a-4d9d-b77a-17702594fbfc)

#### 项目源代码仓库
![图片8](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/96b883a0-b8da-4a46-84ce-c9d9812d578d)

#### 开发者日志
![图片9](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/04ba51d4-82c6-47df-a7d8-bbd6aba45f51)

---

# 🌟 产品亮点

## 高精度小区域生态监测
Ecolens 通过先进的算法和高分辨率地图服务，能够实现对小区域生态变化的精确跟踪，这在传统的生态监测服务中往往被忽略。而 Ecolens 专注这一细分赛道，提高了监测数据的精准性，更使得对细微变化的捕捉成为可能。

## 实时监测与数据反馈
Ecolens 通过集成前端实时数据处理技术，使得地图服务平台能够提供即时的生态监测反馈。这包括实时数据采集、分析和可视化，使得用户能够快速识别和响应生态环境的变化。

## 可移植的产品模式
Ecolens 采用高度模块化和开箱即用的配置项，能够轻松地适应不同区域的监测需求。用户可以自定义监测的地区范围，使得平台不仅限于特定地理位置或生态类型，而是可以广泛适用于各种环境和规模的生态监测项目。

---

# 技术栈的选择及其优势

## 开源服务器：GeoServer

1. 数据兼容性与标准遵循：GeoServer支持多种数据源，包括PostGIS、Shapefile、GeoTIFF等，这使得它能够与各种地理数据无缝集成。它遵循开放地理空间联盟(OGC)标准，如Web Feature Service (WFS)、Web Map Service (WMS)、Web Coverage Service (WCS)，这保证了与其他GIS软件和服务的兼容性。
2. 空间数据发布：GeoServer支持向前端传输矢量数据(WFS)和栅格数据(WCS)，为复杂的地理空间分析和数据展示提供了基础。
3. 性能优化：GeoServer支持数据的预缓存，能够快速响应地图瓦片的请求，提高用户体验。它可以处理大量的并发请求，适合需要高性能地图服务的前端应用。

## 编程语言：JavaScript & TypeScript

1. JavaScript是构建现代Web应用的核心语言，尤其是对于地图产品这类动态和交互性强的前端应用，它的普遍性确保了广泛的开发者支持和成熟的生态系统。
2. TypeScript是基于JavaScript构建的强类型编程语言，提供静态类型检查和更多面向对象的特性。它的强类型系统有助于定义清晰的接口和模型，确保数据的正确性。它的编译时检查适用于大型项目中对复杂数据结构和API的管理，能够编写更可靠、可维护的代码。

## 地图库：OpenLayers

1. 强大的地图渲染能力：OpenLayers对矢量图、栅格图、Web地图服务(WMS)等均有出色的渲染能力。
2. 可扩展性：OpenLayers提供了一个灵活的架构，对于地图的行为和样式有丰富的宽容度和扩展性
3. 与GeoServer的良好兼容性：OpenLayers与GeoServer的WMS、WFS等服务无缝集成，简化地图数据的绘制与管理。
4. 跨平台和响应式：OpenLayers支持所有主流浏览器，并且可以创建响应式地图，利好地图平台的跨端开发。

## 前端框架：React

1. 组件化：React 的核心优势在于其组件化的架构，允许开发者构建独立、可复用的UI组件。在地图服务中，不同的地图控件、工具栏、信息窗口等可以作为组件被封装，易于管理和复用。
2. 声明式编程：React 采用声明式编程范式，让状态管理变得简单直观。这在地图应用中尤其有用，因为地图状态（如视图、图层、选中的要素等）的变化频繁且复杂。
3. 高效的DOM操作：React 的虚拟DOM技术可以最小化真实DOM操作的性能开销，对于地图数据量大、实时性要求高的应用尤其关键。
4. 完善的生态和社区支持：React生态提供了大量库和工具集成的React封装，并拥有庞大的开发者社区，这意味着丰富的资源、开源项目，以及快速的问题解决

## 构建和打包工具：Vite

1. 快速启动和热重载：Vite使用原生ES模块导入，可以实现极快的服务器启动和模块热重载
2. 出色的性能：Vite在生产环境中使用Rollup打包，实现了更快的加载时间，出色的性能对于地图服务应用来说尤为关键

## 单元测试工具：Jest

1. 模拟 (Mocking) 系统：Jest能够轻松地模拟依赖项如网络请求或OpenLayers等复杂的库
2. React集成与快照测试：Jest与React生态系统集成良好，同时其快照功能可以自动记录组件的输出，这在测试React组件时尤其有用


---
# 系统架构设计

## 整体架构图

![图片10](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/8083390d-558a-4f32-bb74-998d1f587804)

## 源代码架构图

![图片11](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/f5e6d307-e35d-452d-84a8-a0d5740983fb)


---

# 模块功能划分

## 产品首页
- 产品文档
- 源码仓库

## 产品服务
- 服务简介
- 监控分析
  - 归一化植被系数年际变化总览
  - 归一化植被系数线性拟合分析
  - 研究地区森林储蓄量
  - 妈的能不能快点出图
- 遥感地图
  - 研究地区夏、冬两季2米遥感影像图
  - 漫游式功能引导
  - 遥感地图说明和产品文档
- 虫害无人机影像图
  - 四张不同松材线虫受灾林区的无人机影像监测图
  - 受灾林区地图说明和产品文档
- 地区概况
  - 研究地区行政区划图与卫星地图(滑块切换)
  - 研究地区基本概况说明和产品文档
- 生态状况
  - 研究地区归一化植被系数五年渲染图
  - 研究地区气温十年渲染图
  - 气候及生态地区说明和产品文档
- 源码仓库
- 团队简介
- 开发者日志

# 组件设计
在React中，组件的封装思路就是面向对象思想，分而治之。Ecolens System 中的代码组件化提供了一种功能的抽象方式，有效降低了系统各个功能之间的耦合性，提高功能内部的聚合性，也同时最小化了diff算法以避免不必要的DOM操作。

## 地图容器组件 MapContainer
在 Ecolens 中，map-container 组件负责初始化 OpenLayers 的地图实例并将其嵌入React的生态系统中。map-container只关注地图的初始化和基本的生命周期管理。

![图片12](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/94aeb883-7a7a-4dc2-bfe9-92a40b26ac02)

## 地图控制组件 MapControlsz
在 Ecolens 中，map-control 组件负责地图的交互部分，如缩放按钮、平移控件、旋转控件等。每个控制组件都是独立的，可以被添加到地图容器中，并能够控制地图的某一特定行为。

![图片13](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/28943409-7d82-411b-8f79-78f1df9eea0f)

## 数据加载组件 DataLoaderComponent
在 Ecolens 中，data-loader-component 组件负责从外部源异步加载数据进行计算和渲染地图和图表，包括加载GeoJSON、WMS服务、WFS服务等。

![图片14](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/0d3c8886-fb0e-4975-bfa3-71778ff57606)

地图状态管理组件 StateComponent
在 Ecolens 中，状态管理组件是一个高阶组件或自定义Hook，它封装了对地图状态（如加载状态、当前视图、选中的图层、标记的位置等）的管理逻辑，能够在全局组件中管理和使用。

![图片15](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/4cc6135b-0f91-4604-a521-dc24e6672fa0)

## 图层组件 LayerComponent
在 Ecolens 中，layer-component 组件负责管理地图上矢量图层、图像图层、瓦片图层等图层的自定义渲染

## 工具栏组件 ToolbarComponent
在 Ecolens 中，toolbar-component 组件包含一系列操作地图的工具按钮，包括地图说明、图源属性、全屏缩放、显示经纬度和时区、在 Ecolens 中编辑等。工具栏能够触发对应的地图操作或激活特定的地图控制组件。

## 数据监控组件 InfoPanelComponent
在 Ecolens 中，data-loader-component 组件（overview页面）用于展示与地图相关的数据和统计信息，如用地状况、归一化植被系数、森林储蓄量、受灾面积等。它会响应地图事件并显示动态内容。

---
# 开发环境搭建与工程化
![图片16](https://github.com/LeonardoSya/Ecolens-System/assets/120240967/717e27b6-574d-4c4f-ae4b-bb120e746a89)

---
# 生产环境搭建与系统集成部署

本部分正在施工中

---

# 性能优化

## 地图瓦片懒加载
Ecolens 实现了地图组件的代码分割和懒加载 (React.Suspense, React.lazy)，只加载视域窗口内的瓦片，减少了不必要的网络请求和渲染

## 预加载和缓存
Ecolens 会预加载用户可能访问的地图区域的瓦片，同时在用户还未导航到地图页面时预渲染地图容器。同时地图瓦片可以被浏览器缓存和LocalStorage本地存储。

## 加载指示器
Ecolens 在资源预加载期间提供loader用户界面UI反馈，提高用户对加载状态的感知

## 分块与按需加载数据
Ecolens 对大量数据分块加载，避免一次性加载导致的UI卡顿。同时根据用户的操作和视域窗口的变化动态加载数据

## 交互性能优化
Ecolens 对窗口尺寸变化引起的地图渲染等进行了事件节流和防抖处理，降低事件处理频率以提高用户体验

## 虚拟DOM
Ecolens 使用React框架开发，使用了虚拟DOM的diff算法来管理DOM更新，减少了不必要的DOM操作以提高性能


进行了诸多性能优化后的地图渲染性能相当优异，基本满足企业级开发中地图服务的渲染速度要求。

---

# 技术迭代与优化方向

## 新增功能方向
- 开发时间轴控件，用于展示和分析随时间变化的生态数据。
- 实现自定义的图层管理器，允许用户创建、编辑和分享自己的地图图层。
- 集成机器学习模型，用于预测和模拟生态变化趋势。

## 前端性能优化
- 进一步优化地图数据的加载和渲染流程，通过Web Workers来处理大规模数据集，减轻主线程的负担。
- 实现更智能的地图瓦片预加载和缓存策略，以减少加载时间和提高用户体验。
- 使用Service Workers为经常访问的地图区域提供离线支持，特别是对于移动端用户。
  
## 后端性能优化
- 对GeoServer进行性能调优，包括但不限于JVM参数调整、数据存储优化、瓦片缓存策略等。
- 评估并实施数据库性能优化，使用空间索引、查询优化等。
- 采用负载均衡和服务分布策略以应对高并发访问。

## 技术栈更新
- 考虑使用WebAssembly来提高计算密集型任务的执行速度。
- 探索引入RxJS或其他响应式编程库，以优化事件处理和异步数据流。
- 考虑微前端架构以支持大型团队协作和模块独立部署。
  




