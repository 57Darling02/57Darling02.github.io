import{_ as a,c as p,b as t,g as r}from"./chunks/framework.WHv14AEj.js";const u=JSON.parse('{"title":"线性规划学习笔记","description":"","frontmatter":{"title":"线性规划学习笔记","date":"2024-03-15T18:08:00.000Z","cover":"https://resource-un4.pages.dev/yspic/Marx&Engels.webp","tags":"Learn 学习笔记 优化算法","copyright":true},"headers":[],"relativePath":"posts/运筹线性规划.md","filePath":"posts/运筹线性规划.md"}'),l={name:"posts/运筹线性规划.md"};function i(c,e,s,o,d,n){return t(),p("div",null,e[0]||(e[0]=[r(`<h1 id="运筹学线性规划算法" tabindex="-1">运筹学线性规划算法: <a class="header-anchor" href="#运筹学线性规划算法" aria-label="Permalink to &quot;运筹学线性规划算法:&quot;">​</a></h1><pre><code>学习机器是怎么完成lp问题求解的
分算法原理部分，算法编程实现部分。
原理部分又分为基本原理解释和建模部分。
</code></pre><p>​</p><h2 id="先介绍点概念" tabindex="-1">先介绍点概念: <a class="header-anchor" href="#先介绍点概念" aria-label="Permalink to &quot;先介绍点概念:&quot;">​</a></h2><ol><li>凸多边集合(convex polyhedral set) <code>集合内任意两点连线，线上所有点都在集合内。</code></li></ol><p>凸组合：由两个点的坐标来表示该线段上的所有点</p><p>一个点集内所有的凸组合可以表示的所有点仍在集内，这个集合就是凸集。</p><p>凸集的极点为 Vi，则凸集的数学表达为</p><p><img src="https://resource-un4.pages.dev/article/0e048fdbafbc0fd6212eadd2472921f.jpg" alt="凸集数学表述"></p><p>性质 ：</p><ol><li><p>非极点可用不包含本身的极点凸组合表示。</p></li><li><p>有限凸集的极点通过凸组合能够表示集合内的所有点。</p></li><li><p>局部最优就是全局最优。</p></li><li><p>超平面: 三维以上的平面，我们使用类比能得到，一个确定的三维面可以表示二维线包含的某个区域，比如:x1+x2&lt;10就可以用x1+x2+x3=10，x3&gt;0来表示。之后我们将使用超平面来表示传统&gt;&lt;表示的可行域。也就是AX=b中的每一行都代表一个超平面。当一个点集的描述(或者说限制)是其中一行，当含有的维度(x个数)超过三时，这个点集就是超平面。</p><p>超平面的表示：AX=b中的每一行。</p><p>性质：超平面都是凸集</p><p>简单证明这个性质：</p><p><img src="https://resource-un4.pages.dev/article/37afc91f390ccfb78f7c16d55f13049.jpg" alt="超平面是凸集的证明"></p></li><li><p>基变量B和非基变量N</p></li></ol><blockquote><p>基变量是从线性规划标准式的n个设计变量中划分出来的，已经或试图通过m个等式约束用其余变量线性表示的m个设计变量。常记为Xb。其余的n-m个设计变量称为非基变量，常记为Xn。</p></blockquote><h2 id="解决线性规划问题" tabindex="-1">解决线性规划问题 <a class="header-anchor" href="#解决线性规划问题" aria-label="Permalink to &quot;解决线性规划问题&quot;">​</a></h2><p>先通过简单的例子了解如何使用向量等建模语言来表达线性规划问题。</p><p>​ 例一:</p><p><img src="https://resource-un4.pages.dev/article/02f7b6d8df6a168c83ae885b11fae6d.jpg" alt="例一"></p><h4 id="初中的图解法-最优点在-极点-上-或者-最优解是-∞" tabindex="-1">初中的图解法：最优点在 极点 上 或者 最优解是 -∞ <a class="header-anchor" href="#初中的图解法-最优点在-极点-上-或者-最优解是-∞" aria-label="Permalink to &quot;初中的图解法：最优点在 极点 上 或者 最优解是 -∞&quot;">​</a></h4><p>​ 根据目标函数的约束向量的方向找极点：</p><p>例题的目标函数约束向量就是(-2，-3),沿这个方向移动时目标函数增加，我们要求最小值，则应(-2,-3)的反方向找最远端极点，这个极点就是最优点。</p><h4 id="数学建模" tabindex="-1">数学建模 <a class="header-anchor" href="#数学建模" aria-label="Permalink to &quot;数学建模&quot;">​</a></h4><p>​ 确定线性规划的标准型，以便之后使用标准型抽象出通用求解方法：</p><p><img src="https://resource-un4.pages.dev/article/42d2a6d9ec3820596824a13ec7e4fd7.jpg" alt="标准型"> 通过标准型建模,增加变量来凑成标准型 (哪边小加哪边，哪边大减哪边，增加的变量&gt;0)，约束条件和目标函数值都需要相应改变。如下：</p><p><img src="https://resource-un4.pages.dev/article/e8e766b1f4b89fc201d5e53e31ae4bf.jpg" alt="化标准型"></p><p>​ 我们的目的是建模，因此需要矩阵形式将标准型表达：</p><p>​ <img src="https://resource-un4.pages.dev/article/4f6438e925ee5687c746086389f60df.jpg" alt="4f6438e925ee5687c746086389f60df"></p><h4 id="图解法" tabindex="-1">图解法： <a class="header-anchor" href="#图解法" aria-label="Permalink to &quot;图解法：&quot;">​</a></h4><p>​ 建模后目标函数变为：</p><p><img src="https://resource-un4.pages.dev/article/f54e8a3511279b771ce14c21ce66b67.jpg" alt="目标函数"></p><p>​ 从-c方向找最远端即可找出最优解。</p><p>​ 缺陷：开集不好找。</p><h4 id="为了表示开集的最优解-我们需要用到极方向" tabindex="-1">为了表示开集的最优解，我们需要用到极方向： <a class="header-anchor" href="#为了表示开集的最优解-我们需要用到极方向" aria-label="Permalink to &quot;为了表示开集的最优解，我们需要用到极方向：&quot;">​</a></h4><p><img src="https://resource-un4.pages.dev/article/0201195bd421fa36a3530b69f8b7414.jpg" alt="极方向加极点表示其他点"></p><p>一个极点+极方向表示所有极点时，得到凸集可行域：</p><p><img src="https://resource-un4.pages.dev/article/cdbdb81373c0a68573ba4917167712e.jpg" alt="凸集可行域格式"></p><p>目标函数通式：</p><p><img src="https://resource-un4.pages.dev/article/f7bf94f22763e0702622273aff1882c.jpg" alt="目标函数"></p><p>因此我们可以得到：</p><p>​ ???</p><h4 id="穷举法" tabindex="-1">穷举法 <a class="header-anchor" href="#穷举法" aria-label="Permalink to &quot;穷举法&quot;">​</a></h4><p>​ 在有限集中，最优解一定在极点上取得。将极点穷举出来的方法：</p><ul><li>极点 ：n个维度，m个约束，不考虑约束冗余(n&lt;m)的情况：有n-m个维度塌缩。</li><li>寻找极点：<em>比如一个二元一次方程，消掉一元x1（x1 = 0），剩下的一元x2就有一个确定值，通这个确定的(0，x2)就是极点 ，同理可以消去x2。n个维度，m个约束时，消掉n-m个维度后有唯一解,这个就是极点。被强制变为0的为非基变量（例子中的x1）,其他的则是基变量（例子中的x2）。所以共有n取n-m个极点</em></li><li>比较各极点大小，得到最优解。</li></ul><h5 id="缺陷" tabindex="-1">缺陷 <a class="header-anchor" href="#缺陷" aria-label="Permalink to &quot;缺陷&quot;">​</a></h5><ul><li>维度多时指数爆炸</li></ul><h4 id="单纯形法" tabindex="-1">单纯形法 <a class="header-anchor" href="#单纯形法" aria-label="Permalink to &quot;单纯形法&quot;">​</a></h4><p>​ 通过一个可行解极点，向邻居点寻找最优解（利用局部最优就是全局最优的凸集性质）。</p>`,45)]))}const f=a(l,[["render",i]]);export{u as __pageData,f as default};
