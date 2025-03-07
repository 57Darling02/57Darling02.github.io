import{_ as n,c as a,b as i,g as p}from"./chunks/framework.WHv14AEj.js";const o=JSON.parse('{"title":"search_method (二)","description":"","frontmatter":{"title":"search_method (二)","date":"2024-10-04T17:34:45.000Z","cover":"https://resource-un4.pages.dev/yspic/dm2.webp","tags":"Learn 优化算法","copyright":true},"headers":[],"relativePath":"posts/search_method2.md","filePath":"posts/search_method2.md"}'),e={name:"posts/search_method2.md"};function t(l,s,h,r,k,d){return i(),a("div",null,s[0]||(s[0]=[p(`<h1 id="search-method-二" tabindex="-1">search_method（二） <a class="header-anchor" href="#search-method-二" aria-label="Permalink to &quot;search_method（二）&quot;">​</a></h1><p>​ 在篇文章中，将通过一个简单的图问题展示各种搜索算法的实例。不过在此之前，有必要先仔细研究搜索算法的定义。这篇文章更像是我思考的心路历程，逻辑比较混乱，后面再出一篇逻辑清晰的。</p><p>​ 因为我有一个朋友之前跟我一样学过运筹学，在运筹学中也学习了很多关于图的算法，例如Dijkstra最短路算法和弗洛伊德算法（floyd-warshall）来找到最短路径。但是实际上搜索问题和优化问题有着很大区别：以图（graph）问题为例，搜索问题的解只是<strong>目标节点</strong>，而优化问题的解由 <strong>初始节点-&gt;目标节点</strong> 的完整路径 构成。</p><p>接下来通过具体问题了解他们的区别：</p><p><img src="https://resource-un4.pages.dev/article/image-20241004180135844.png" alt="例题"></p><p>​ 上面是一道运筹优化问题的例题，我们将它简化成为一道搜索问题：只用他的地图，其他都不用。 同样的地图，骑手在v1（id=0）点，他现在想前往v37点（id=36），但是骑手没有地图，他只知道v1有三条路可以走，也知道路多长，但是不知道路通向的下一个节点有什么。该怎么在完全无知的情况下找到点v37呢？</p><p>这就是一道典型的搜索问题。我们先将图构建出来：</p><p><img src="https://resource-un4.pages.dev/article/image-20241004181301529.png" alt="ori_graph"></p><p>其中第n行第m列表示点vn通向点vm的距离，M表示并没有直接连通。此时我们的在点v1,也就是说只能访问图的第一行，而且不能确定通往的节点是否是我们想要的节点，只有确定前往那个节点（Vx）后,才能知道Vx是否是我们想要的节点，以及Vx能够前往什么地方（访问图第x行）。</p><p>我们使用BFS寻找。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>originGraph ,optimizedGraph = graph_process.read_graph(&#39;original_graph.xlsx&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(f&quot;originGraph:{originGraph}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># we can use BFS to find the end_node</span></span>
<span class="line"><span>def BFS(graph, start, end):</span></span>
<span class="line"><span>    # create a queue </span></span>
<span class="line"><span>    queue = []</span></span>
<span class="line"><span>    # create a list to store the visited nodes</span></span>
<span class="line"><span>    visited = [start]</span></span>
<span class="line"><span>    # create a list to store the path</span></span>
<span class="line"><span>    path = []</span></span>
<span class="line"><span>    # add the start node to the queue</span></span>
<span class="line"><span>    queue.append(start)</span></span>
<span class="line"><span>    # while the queue is not empty</span></span>
<span class="line"><span>    while queue:</span></span>
<span class="line"><span>        # get the first element in the queue</span></span>
<span class="line"><span>        node = queue.pop(0)</span></span>
<span class="line"><span>        # add the node to the path</span></span>
<span class="line"><span>        path.append(node)</span></span>
<span class="line"><span>        # if the node is the end node</span></span>
<span class="line"><span>        if node == end:</span></span>
<span class="line"><span>            return path</span></span>
<span class="line"><span>        # get the neighbors of the node</span></span>
<span class="line"><span>        for x in range(len(graph)):</span></span>
<span class="line"><span>            # if the node is not visited and the distance between the node and the neighbor is not infinite</span></span>
<span class="line"><span>            if x not in visited and graph[node][x] != float(&#39;inf&#39;):</span></span>
<span class="line"><span>                # add the neighbor to the queue</span></span>
<span class="line"><span>                queue.append(x)</span></span>
<span class="line"><span>                visited.append(x)</span></span>
<span class="line"><span>    return path # 得出搜索路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span># we assume that the start point is 0 (v1)</span></span>
<span class="line"><span># and the end point is 36 (v37)</span></span>
<span class="line"><span>path = BFS(originGraph, 0, 36)</span></span>
<span class="line"><span>print(f&quot;BFS search_path:{path} \\nlen:{len(path)}&quot;)</span></span></code></pre></div><p>BFS的每一步都有详细注释，我就不赘述了。这时也许有人疑惑了，为什么不在探索邻居节点那一步就return呢？我再打个比方：外卖小哥要找的目标并不是v37，而是某个住在v37点里的小a，骑手不知道小a住在哪里，他只知道要找的人是小a。但是每一个点里都住了100户人，骑手每访问一个节点，就要挨家挨户问这一百户人家有没有叫小a的，这时就要将 <code>if node == end: </code>换成<code>if 小a in node: </code>，此时，我探索邻居节点是决定要前往的节点，而不是真实的探索了那些个节点的100户人家到底有没有小a.</p><p>(顺带解释，这个visited 列表并不是存储访问过的节点，而是储存计划前往的节点，目的是防止成环导致死循环，同一个点找了又找)</p><p>同时我们发现，BFS根本没用到点与点之间的距离，只是使用了点之间能否连通。没错，BFS就是根本不考虑这个。</p><p>最后，我们得到BFS的搜索路径：<code>BFS search_path:[0, 1, 3, 8, 2, 5, 4, 17, 9, 13, 6, 7, 10, 12, 18, 23, 14, 25, 11, 22, 15, 24, 36] len:23</code></p><p>也就是说，骑手在访问了22个节点每个节点100户人家后，才在最后一个节点找到了小a。</p><p>同样的，我们也可以使用DFS来搜索：DFS大多使用递归，因为递归自带栈操作。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>def DFS_in_recursion(graph, start, end, method_type):</span></span>
<span class="line"><span>    # create a list to store the path</span></span>
<span class="line"><span>    path = []</span></span>
<span class="line"><span>    # if method_type is 0 ,we use pre-order</span></span>
<span class="line"><span>    if method_type == 0:</span></span>
<span class="line"><span>        def dfs(graph, node, visited=None):</span></span>
<span class="line"><span>            nonlocal path</span></span>
<span class="line"><span>            if visited is None:</span></span>
<span class="line"><span>                visited = set()  # 初始化已访问节点集合</span></span>
<span class="line"><span>            if node not in visited:</span></span>
<span class="line"><span>                visited.add(node)  # 将当前节点标记为已访问</span></span>
<span class="line"><span>                path.append(node)  # 访问当前节点（你可以在这里进行其他处理）</span></span>
<span class="line"><span>                if node == end:</span></span>
<span class="line"><span>                    return True</span></span>
<span class="line"><span>                # get the neighbors of the node</span></span>
<span class="line"><span>                for x in range(len(graph)):</span></span>
<span class="line"><span>                    # if the node is not visited and the distance between the node and the neighbor is not infinite</span></span>
<span class="line"><span>                    if x not in visited and graph[node][x] != float(&#39;inf&#39;):</span></span>
<span class="line"><span>                        if dfs(graph, x, visited):</span></span>
<span class="line"><span>                            return True</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span>    # if method_type is 1 ,we use post-order</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        def dfs(graph, node, visited=None):</span></span>
<span class="line"><span>            nonlocal path</span></span>
<span class="line"><span>            if visited is None:</span></span>
<span class="line"><span>                visited = set()  # 初始化已访问节点集合</span></span>
<span class="line"><span>            if node not in visited:</span></span>
<span class="line"><span>                visited.add(node)  # 将当前节点标记为已访问</span></span>
<span class="line"><span>                # get the neighbors of the node</span></span>
<span class="line"><span>                for x in range(len(graph)):</span></span>
<span class="line"><span>                    # if the node is not visited and the distance between the node and the neighbor is not infinite</span></span>
<span class="line"><span>                    if x not in visited and graph[node][x] != float(&#39;inf&#39;):</span></span>
<span class="line"><span>                        if dfs(graph, x, visited):</span></span>
<span class="line"><span>                            return True</span></span>
<span class="line"><span>                path.append(node)  # 访问当前节点</span></span>
<span class="line"><span>                if node == end:</span></span>
<span class="line"><span>                    return True</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span>    dfs(graph, start)</span></span>
<span class="line"><span>    return path # 得出搜索路径</span></span></code></pre></div><p>运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>path = DFS_in_recursion(originGraph, 0, 36, 0)</span></span>
<span class="line"><span>print(f&quot;DFS_in_recursion0 search_path:{path} \\nlen:{len(path)}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>path = DFS_in_recursion(originGraph, 0, 36, 1)</span></span>
<span class="line"><span>print(f&quot;DFS_in_recursion1 search_path:{path} \\nlen:{len(path)}&quot;)</span></span></code></pre></div><p>得到相应结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>DFS_in_recursion pre-order search_path:[0, 1, 2, 6, 5, 9, 8, 13, 12, 4, 3, 17, 18, 24, 23, 36] </span></span>
<span class="line"><span>len:16</span></span>
<span class="line"><span>DFS_in_recursion post-order search_path:[7, 37, 39, 38, 33, 34, 35, 40, 30, 22, 21, 29, 28, 27, 19, 20, 16, 11, 10, 15, 14, 26, 25, 32, 31, 36] </span></span>
<span class="line"><span>len:26</span></span></code></pre></div><p>对比上述结果我们可以看到，当<strong>不考虑路程成本</strong>，仅考虑<strong>每个节点的搜索成本</strong>时，访问节点最少的是先序深度优先搜索，最菜的是后序深度优先搜索。</p><p>如果问题变成这样：</p><p>**问题1：**每个节点有100户人家，骑手从v1节点出发，寻找一个叫做小a的人（实际住在v37，但是骑手不知道），从出发节点开始挨家挨户的问：你是不是小a？</p><p>​ 不考虑节点到节点之前移动的开销，那么最快是先序深度优先搜索（问了1500-1600家），最慢是后序深度优先（2500-2600），宽度优先和后序深度优先差不了多少（2200-2300）</p><p>​ 但如果我们只考虑如何从出发节点最短路程走到目标节点，我们可以使用Dijkstra最短路算法。但当我回顾之前写的Dijkstra最短路算法时，我发现其实Dijkstra就是代价一致搜索加上路径记录，因此我在传统的代价一致搜索(UniformCostSearch)加上稍作修改就能得到Dijkstra算法，同时得到<strong>搜索路径</strong>和<strong>实际起点到终点</strong>的最短路径：</p><div class="language-python vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">python</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">def</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> Dijkstra</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ori_graph, start, end): </span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    search_path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># search_path use to record the order which the node is real visited</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    n </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> len</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(ori_graph)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dist</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">np.full(n, np.inf)</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;">    # record the previous node (Dijk)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    pred</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">np.full(n,</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    visitd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> []</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    dist[start]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> i </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(n):</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> np.inf</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        min_index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> -</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> j </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(n):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> j </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">not</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> visitd </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist[j] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;=</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> min</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">                min</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> =</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist[j]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                min_index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> j</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        visitd.append(min_index)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        for</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> j </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">in</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> range</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(n):</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ori_graph[min_index][j] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">np.inf </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> (j </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">not</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> in</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> visitd) </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist[min_index]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">np.inf </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">and</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist[min_index] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ori_graph[min_index][j] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">&lt;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> dist[j]:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                dist[j]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">dist[min_index] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">+</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> ori_graph[min_index][j]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">                pred[j]</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">min_index</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        search_path.append(min_index)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">        if</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> min_index </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">==</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> end:</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">            print</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&#39;Dijkstra find the end node&#39;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">            break</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    current </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> end</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    path </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[] </span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"># real path form start to end (Dijk)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    while</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">(current</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">!=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">start):</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        current </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> pred[current]</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">        path.insert(</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,current)</span></span>
<span class="line"><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">    return</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> path ,search_path</span></span></code></pre></div><p>实际上Dijkstra算法就是代价一致搜索加上<code>pred</code>记录前置点，再通过最后一部分输出最短路：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>current = end</span></span>
<span class="line"><span>    path =[] # real path form start to end (Dijk)</span></span>
<span class="line"><span>    while(current!=start):</span></span>
<span class="line"><span>        current = pred[current]</span></span>
<span class="line"><span>        path.insert(0,current)</span></span></code></pre></div><p>运行：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>path ,search_path = Dijkstra(originGraph, 0, 36)</span></span>
<span class="line"><span>print(f&#39;Dijkstra_Path:{path}\\nsearch_path:{search_path}\\nlen:{len(search_path)}&#39;)</span></span></code></pre></div><p>结果得到：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Dijkstra_Path:[0, 8, 13, 12, 18, 24, 31, 36]</span></span>
<span class="line"><span>search_path:[0, 1, 8, 5, 6, 2, 9, 11, 10, 13, 16, 15, 14, 12, 20, 7, 28, 19, 21, 29, 27, 18, 3, 35, 30, 25, 26, 24, 22, 17, 4, 40, 23, 34, 32, 39, 31, 38, 37, 33, 36]</span></span>
<span class="line"><span>len:41</span></span></code></pre></div><p>我们分析数据：search_path 里的顺序时节点访问的顺序，而代价一致搜索访问节点的顺序是按照每个节点离初始节点的距离来决定的，因此由searchpath可见，v37 (36)是最后一个，也就是v37是所有点中距离v1最远的点。如果搜索不考虑点之间移动成本，只考虑每个节点的访问成本时，代价一致搜索(Dijkstra)反而是效率最低下的。但如果骑手不在乎花多少时间才能找到小a,只希望以后再去小a家时能最快，<strong>完整的路径</strong>才是我的目标，那么代价一致搜索才能够完成。</p><p>那么能否同时兼顾搜索效率和路径的优略呢？当然有。A*算法就是兼顾了二者的搜索算法。</p><p>欲知后事如何，且听下回分解。</p>`,37)]))}const g=n(e,[["render",t]]);export{o as __pageData,g as default};
