import{_ as n,c as a,b as p,g as e}from"./chunks/framework.WHv14AEj.js";const u=JSON.parse('{"title":"columngeneration 列生成算法","description":"","frontmatter":{"title":"columngeneration 列生成算法","date":"2024-05-10T23:07:59.000Z","cover":"https://resource-un4.pages.dev/yspic/Marx&Engels.webp","tags":"Learn 优化算法","copyright":true},"headers":[],"relativePath":"posts/columngeneration.md","filePath":"posts/columngeneration.md"}'),l={name:"posts/columngeneration.md"};function i(t,s,c,r,o,m){return p(),a("div",null,s[0]||(s[0]=[e(`<h1 id="columgeneration-列生成算法gams代码解析" tabindex="-1">columgeneration 列生成算法gams代码解析 <a class="header-anchor" href="#columgeneration-列生成算法gams代码解析" aria-label="Permalink to &quot;columgeneration 列生成算法gams代码解析&quot;">​</a></h1><p>例题：</p><div class="language-gams vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">gams</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>set pp/1*1000/;</span></span>
<span class="line"><span>set p(pp);</span></span>
<span class="line"><span>set pi(pp);</span></span>
<span class="line"><span>*子集定义</span></span>
<span class="line"><span>set i /1,2,3/;</span></span>
<span class="line"><span>pi(&#39;3&#39;)=yes;</span></span>
<span class="line"><span>p(&#39;1&#39;)=yes;</span></span>
<span class="line"><span>p(&#39;2&#39;)=yes;</span></span>
<span class="line"><span>p(&#39;3&#39;)=yes;</span></span>
<span class="line"><span>*没写的部分就是没开，即不可使用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>table a(i,pp)</span></span>
<span class="line"><span>         1       2       3</span></span>
<span class="line"><span>1        1</span></span>
<span class="line"><span>2                1</span></span>
<span class="line"><span>3                        1</span></span>
<span class="line"><span>;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>parameter n(i)/</span></span>
<span class="line"><span>1        44</span></span>
<span class="line"><span>2        3</span></span>
<span class="line"><span>3        48</span></span>
<span class="line"><span>/;</span></span>
<span class="line"><span>parameter w(i)/</span></span>
<span class="line"><span>1        81</span></span>
<span class="line"><span>2        70</span></span>
<span class="line"><span>3        68</span></span>
<span class="line"><span>/;</span></span>
<span class="line"><span>parameter CW/218/;</span></span>
<span class="line"><span>*******************establish master problem</span></span>
<span class="line"><span>positive variable x(pp);</span></span>
<span class="line"><span>variable z_master;</span></span>
<span class="line"><span>equations</span></span>
<span class="line"><span>master_obj_func</span></span>
<span class="line"><span>master_demand_const(i);</span></span>
<span class="line"><span>master_obj_func..</span></span>
<span class="line"><span>         z_master=e=sum(p,x(p));</span></span>
<span class="line"><span>master_demand_const(i)..</span></span>
<span class="line"><span>         sum(p,a(i,p)*x(p))=g=n(i);</span></span>
<span class="line"><span>model master_pro/all/;</span></span>
<span class="line"><span>*solve master_pro using LP minimizing z_master;</span></span>
<span class="line"><span>*display x.l,z_master.l;</span></span>
<span class="line"><span>*display master_demand_const.m;</span></span>
<span class="line"><span>*********************establish sub problem</span></span>
<span class="line"><span>integer variable y(i);</span></span>
<span class="line"><span>variable z_sub;</span></span>
<span class="line"><span>equations</span></span>
<span class="line"><span>sub_obj_func</span></span>
<span class="line"><span>width_const;</span></span>
<span class="line"><span>sub_obj_func..</span></span>
<span class="line"><span>         z_sub=e=1-sum(i,master_demand_const.m(i)*y(i));</span></span>
<span class="line"><span>*可改为max sum(i,master_demand_const.m(i)*y(i))，即背包问题；</span></span>
<span class="line"><span>width_const..</span></span>
<span class="line"><span>         sum(i,y(i)*w(i))=l=CW;</span></span>
<span class="line"><span>model sub_pro/sub_obj_func,width_const/;</span></span>
<span class="line"><span>*之前还有equations，所以此处不能用all。</span></span>
<span class="line"><span>*solve sub_pro using MIP minimizing z_sub;</span></span>
<span class="line"><span>*display y.l,z_sub.l;</span></span>
<span class="line"><span>*******************************cg</span></span>
<span class="line"><span>set iter/1*20/;</span></span>
<span class="line"><span>parameter sub_value/-1/;</span></span>
<span class="line"><span>parameter results(iter,*);</span></span>
<span class="line"><span>*构造了一个table，行数为iter，列的名称为想要记录数据的名称，值为数据值</span></span>
<span class="line"><span>loop(iter$(sub_value&lt;0),</span></span>
<span class="line"><span>         solve master_pro using LP minimizing z_master;</span></span>
<span class="line"><span>         solve sub_pro using MIP minimizing z_sub;</span></span>
<span class="line"><span>         results(iter,&#39;z_master&#39;)=z_master.l;</span></span>
<span class="line"><span>         results(iter,&#39;pai_1&#39;)=master_demand_const.m(&#39;1&#39;);</span></span>
<span class="line"><span>*引用master_demand_const.m中的第几个数据，(&#39;1&#39;)要加单引号</span></span>
<span class="line"><span>         results(iter,&#39;pai_2&#39;)=master_demand_const.m(&#39;2&#39;);</span></span>
<span class="line"><span>         results(iter,&#39;pai_3&#39;)=master_demand_const.m(&#39;3&#39;);</span></span>
<span class="line"><span>         results(iter,&#39;z_sub&#39;)=z_sub.l;</span></span>
<span class="line"><span>         results(iter,&#39;y1&#39;)=y.l(&#39;1&#39;);</span></span>
<span class="line"><span>         results(iter,&#39;y2&#39;)=y.l(&#39;2&#39;);</span></span>
<span class="line"><span>         results(iter,&#39;y3&#39;)=y.l(&#39;3&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>         sub_value=z_sub.l;</span></span>
<span class="line"><span>         pi(pp)=pi(pp-1);</span></span>
<span class="line"><span>*第一次循环后，pi由3变为4。pp-1相当于pp整体往左移动了一个单位，此时3的位置变成了4。</span></span>
<span class="line"><span>         a(i,pi)=y.l(i);</span></span>
<span class="line"><span>         p(pi)=yes;</span></span>
<span class="line"><span>);</span></span>
<span class="line"><span>display results;</span></span></code></pre></div>`,3)]))}const d=n(l,[["render",i]]);export{u as __pageData,d as default};
