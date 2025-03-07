import{_ as s,c as a,b as p,g as e}from"./chunks/framework.XMefctHU.js";const h=JSON.parse('{"title":"搜索与优化","description":"","frontmatter":{"title":"搜索与优化","date":"2024-10-04T22:47:50.000Z","cover":"https://resource-un4.pages.dev/yspic/dm2.webp","tags":"Learn 优化算法","copyright":true},"headers":[],"relativePath":"posts/searchmethods3.md","filePath":"posts/searchmethods3.md"}'),l={name:"posts/searchmethods3.md"};function t(i,n,c,o,r,d){return p(),a("div",null,n[0]||(n[0]=[e(`<h1 id="搜索与优化" tabindex="-1">搜索与优化 <a class="header-anchor" href="#搜索与优化" aria-label="Permalink to &quot;搜索与优化&quot;">​</a></h1><h2 id="搜索算法" tabindex="-1">搜索算法 <a class="header-anchor" href="#搜索算法" aria-label="Permalink to &quot;搜索算法&quot;">​</a></h2><p>​ 一个工作园区内存在多个仓库，不同的仓库内存放着不同的物品。现在从仓库中取出物体&quot;A&quot;,但因为管理系统临时损坏，只能在园区不同仓库内查找.</p><p>园区的仓库这样分布，其中v n 是 id 为 n-1 的仓库（例如：v1是id为0的仓库），边（edge）上数字是仓库之间联通的道路长度。</p><p><img src="https://resource-un4.pages.dev/article/fe3dc05d83ed4da5dc5e51d597e3518.png" alt="仓库图"></p><p>​ 工人现在决定每到一个仓库就对仓库内所有点物品进行排查。如果安排排查的工人只有一人，该以怎样的顺序搜索才能最快找到A呢？</p><p>​ (⊙﹏⊙)我们将实际的邻接矩阵构建出来（M代表不邻接）。</p><p><img src="https://resource-un4.pages.dev/article/image-20241004181301529.png" alt="ori_graph"></p><p>​ 假设A实际在仓库v37(id = 36),我们将点使用代码构建出来</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>originGraph ,optimizedGraph = graph_process.read_graph(&#39;original_graph.xlsx&#39;)</span></span>
<span class="line"><span>class Node:</span></span>
<span class="line"><span>    def __init__(self, id, position):</span></span>
<span class="line"><span>        self.id = id</span></span>
<span class="line"><span>        self.name = f&quot;v{id+1}&quot;</span></span>
<span class="line"><span>        self.position = None</span></span>
<span class="line"><span>        self.neighbor = []</span></span>
<span class="line"><span>        self.inhabitant = []</span></span>
<span class="line"><span>        if id == 36:</span></span>
<span class="line"><span>            self.inhabitant.append(&quot;A&quot;)</span></span>
<span class="line"><span>        self.f = 0</span></span>
<span class="line"><span>    def search(self,name):</span></span>
<span class="line"><span>        if name in self.inhabitant:</span></span>
<span class="line"><span>            return True</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            return False</span></span>
<span class="line"><span></span></span>
<span class="line"><span>Nodes = {}</span></span>
<span class="line"><span>for i in range(len(originGraph)):</span></span>
<span class="line"><span>    node = Node(i, (0, 0))</span></span>
<span class="line"><span>    for j in range(len(originGraph)):</span></span>
<span class="line"><span>        if originGraph[i][j] != float(&#39;inf&#39;):</span></span>
<span class="line"><span>            node.neighbor.append(j)</span></span>
<span class="line"><span>    Nodes[i] = node</span></span>
<span class="line"><span>start_node = 0</span></span></code></pre></div><h3 id="bfs" tabindex="-1">BFS <a class="header-anchor" href="#bfs" aria-label="Permalink to &quot;BFS&quot;">​</a></h3><p>我们使用BFS搜索顺序进行搜查：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># we can use BFS to find the A</span></span>
<span class="line"><span>def BFS(start, target):</span></span>
<span class="line"><span>    # create a queue</span></span>
<span class="line"><span>    queue = []</span></span>
<span class="line"><span>    # create a list to store the visited nodes and the node which is planned to visit</span></span>
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
<span class="line"><span>        # search current node</span></span>
<span class="line"><span>        if Nodes[node].search(target):</span></span>
<span class="line"><span>            return path</span></span>
<span class="line"><span>        # get the neighbors of the node</span></span>
<span class="line"><span>        for neighbor_node in Nodes[node].neighbor:</span></span>
<span class="line"><span>            # if the node is not visited and the distance between the node and the neighbor is not infinite</span></span>
<span class="line"><span>            if neighbor_node not in visited:</span></span>
<span class="line"><span>                # add the neighbor to the queue</span></span>
<span class="line"><span>                queue.append(neighbor_node)</span></span>
<span class="line"><span>                visited.append(neighbor_node)</span></span>
<span class="line"><span>    return path # 得出搜索路径</span></span>
<span class="line"><span>path = BFS(start_node, &quot;A&quot;)</span></span>
<span class="line"><span>print(f&quot;BFS search_path:{path} \\nlen:{len(path)}&quot;)</span></span></code></pre></div><p>可以得到结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BFS search_path:[0, 1, 3, 8, 2, 5, 4, 17, 9, 13, 6, 7, 10, 12, 18, 23, 14, 25, 11, 22, 15, 24, 36] </span></span>
<span class="line"><span>len:23</span></span></code></pre></div><p>工人使用BFS算法排查到第23个仓库才找到了A</p><h3 id="dfs" tabindex="-1">DFS <a class="header-anchor" href="#dfs" aria-label="Permalink to &quot;DFS&quot;">​</a></h3><p>现在我们使用DFS算法尝试寻找A</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def DFS_recur(start, target, visited = [], path = []):</span></span>
<span class="line"><span>    visited.append(start)</span></span>
<span class="line"><span>    path.append(start)</span></span>
<span class="line"><span>    if Nodes[start].search(target):</span></span>
<span class="line"><span>        return path</span></span>
<span class="line"><span>    for neighbor_node in Nodes[start].neighbor:</span></span>
<span class="line"><span>        if neighbor_node not in visited:</span></span>
<span class="line"><span>            result = DFS_recur(neighbor_node, target, visited, path)</span></span>
<span class="line"><span>            if result:</span></span>
<span class="line"><span>                return result</span></span>
<span class="line"><span>    return None</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def DFS_recur_post_order(start, target, visited = [], path = []):</span></span>
<span class="line"><span>    visited.append(start)</span></span>
<span class="line"><span>    for neighbor_node in Nodes[start].neighbor:</span></span>
<span class="line"><span>        if neighbor_node not in visited:</span></span>
<span class="line"><span>            result = DFS_recur_post_order(neighbor_node, target, visited, path)</span></span>
<span class="line"><span>            if result:</span></span>
<span class="line"><span>                return result</span></span>
<span class="line"><span>    path.append(start)</span></span>
<span class="line"><span>    if Nodes[start].search(target):</span></span>
<span class="line"><span>        return path</span></span>
<span class="line"><span>    return None</span></span></code></pre></div><p>运行</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>path = DFS_recur(start_node, &quot;A&quot;)</span></span>
<span class="line"><span>print(f&quot;DFS_recur_preorder search_path:{path} \\nlen:{len(path)}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>path = DFS_recur_post_order(start_node, &quot;A&quot;)</span></span>
<span class="line"><span>print(f&quot;DFS_recur_post_order search_path:{path} \\nlen:{len(path)}&quot;)</span></span></code></pre></div><p>得到结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>DFS_recur_preorder search_path:[0, 1, 2, 6, 5, 9, 8, 13, 12, 4, 3, 17, 18, 24, 23, 36] </span></span>
<span class="line"><span>len:16</span></span>
<span class="line"><span>DFS_recur_post_order search_path:[7, 37, 39, 38, 33, 34, 35, 40, 30, 22, 21, 29, 28, 27, 19, 20, 16, 11, 10, 15, 14, 26, 25, 32, 31, 36] </span></span>
<span class="line"><span>len:26</span></span></code></pre></div><p>也就是说工人以先序深度优先搜索的顺序排查，可以在排查15个仓库后找到A。后序深度优先则更慢。</p><p>此时，运输设备停在出发点v1（id=0）等待工人找到A的位置后去将其运出。</p><p>假设工人并不熟悉园区的环境，即使找到了A货物所在的地点，也只能按照一路找来的仓库原路返回，再从出发点按照探索节点的顺序一路走到货物A所在节点。为了提高效率找到不绕圈的路径，工人使用了一致代价搜索。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># we can use Dijkstra to find the path</span></span>
<span class="line"><span>def UniformCostSearch(ori_graph, start, target):</span></span>
<span class="line"><span>    dist={} # record the distance from start to the node</span></span>
<span class="line"><span>    # record the previous node</span></span>
<span class="line"><span>    pred={}</span></span>
<span class="line"><span>    search_path = [start] # search_path use to record the order which the node is real visited</span></span>
<span class="line"><span>    if Nodes[start].search(target):</span></span>
<span class="line"><span>        path = [start]</span></span>
<span class="line"><span>        return search_path , path</span></span>
<span class="line"><span>    dist[start]=0</span></span>
<span class="line"><span>    while True:</span></span>
<span class="line"><span>        min = np.inf</span></span>
<span class="line"><span>        min_index = -1</span></span>
<span class="line"><span>        for visited_node in search_path:</span></span>
<span class="line"><span>            for neighbor_node in Nodes[visited_node].neighbor:</span></span>
<span class="line"><span>                if neighbor_node not in search_path and dist[visited_node] + ori_graph[visited_node][neighbor_node] &lt; dist.get(neighbor_node, np.inf):</span></span>
<span class="line"><span>                    dist[neighbor_node] = dist[visited_node] + ori_graph[visited_node][neighbor_node]</span></span>
<span class="line"><span>                    pred[neighbor_node] = visited_node</span></span>
<span class="line"><span>                if neighbor_node not in search_path and dist[neighbor_node] &lt;= min:</span></span>
<span class="line"><span>                    min = dist[neighbor_node]</span></span>
<span class="line"><span>                    min_index = neighbor_node</span></span>
<span class="line"><span>        search_path.append(min_index)</span></span>
<span class="line"><span>        if Nodes[min_index].search(target):</span></span>
<span class="line"><span>            print(&#39;find the end node&#39;)</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>        if len(search_path) == len(Nodes):</span></span>
<span class="line"><span>            print(&#39;can not find the A&#39;)</span></span>
<span class="line"><span>            return search_path, []</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    current = search_path[-1]</span></span>
<span class="line"><span>    path =[current] # real path form start to end</span></span>
<span class="line"><span>    while(current!=start):</span></span>
<span class="line"><span>        current = pred[current]</span></span>
<span class="line"><span>        path.insert(0,current)</span></span>
<span class="line"><span>    return path ,search_path</span></span>
<span class="line"><span># run code</span></span>
<span class="line"><span>path ,search_path = UniformCostSearch(originGraph, 0, &#39;A&#39;)</span></span>
<span class="line"><span>print(f&#39;Dijkstra_Path:{path}\\nuniform cost search_path:{search_path}\\nlen:{len(search_path)}&#39;)</span></span></code></pre></div><p>得到结果</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Dijkstra_Path:[0, 8, 13, 12, 18, 24, 31, 36]</span></span>
<span class="line"><span>uniform cost search_path:[0, 1, 5, 8, 6, 2, 9, 10, 11, 13, 14, 15, 16, 12, 20, 7, 28, 19, 21, 29, 27, 18, 3, 35, 30, 25, 26, 24, 22, 17, 4, 23, 40, 32, 34, 39, 31, 38, 37, 33, 36]</span></span>
<span class="line"><span>len:41</span></span></code></pre></div><p>​ 因此，一致代价搜索找到了从出发点到目标点的最短路径。</p><p>​ 但是，使用UniformCost Search排查的顺序是按照距离出发点的顺序来的，正巧A所在的仓库v37是离仓库v1最远的点，因此是排查耗时最久，直至排查到最后一个仓库才找到了货物。也就是舍弃了排查成本而注重运输成本。</p><h3 id="无信息搜索算法-结论" tabindex="-1">无信息搜索算法 结论 <a class="header-anchor" href="#无信息搜索算法-结论" aria-label="Permalink to &quot;无信息搜索算法 结论&quot;">​</a></h3><p>​ 上述几个算法中，BFS和后序DFS搜索效果都不是特别好，先序DFS搜索可以节约排查成本，最快速的找到货物A所在地，但是没办法同时找出起点到目标所在点的合理路径。我们又通过一致代价搜索（DIJKSTRA）算法，找到目标点同时得出起点到目标点的最短路径，但这种算法寻找离起点远的对象时，排查效率极低。在规模更大的地图上，甚至难以找出结果。</p><h3 id="有信息搜索算法" tabindex="-1">有信息搜索算法 <a class="header-anchor" href="#有信息搜索算法" aria-label="Permalink to &quot;有信息搜索算法&quot;">​</a></h3><p>​ 现实世界中，我们很少遇到没有信息盲目排查的情况，同时也难以接受找不到合理路径的结果。假如我们可以得到有关结果的信息，我们可以利用这个信息为启发，有方向的寻找。既要减少排查的成本，也要同时找到合理的路径减少运输的成本。</p><p>例如，现在我知道园区内仓库的分布有一定的规律，与目标货物A位置越接近的仓库，存放的货物与A就有越多的相似特征。</p><h3 id="a-算法" tabindex="-1">A*算法 <a class="header-anchor" href="#a-算法" aria-label="Permalink to &quot;A*算法&quot;">​</a></h3><p>​ 使用A*算法：我们使用detect函数和heuristic启发函数模拟计算某个仓库货物与A货物的特征差异，距离A越远的仓库，返回的差异数值越大。工人每次从周围连接的几个仓库中选择差异数值最小的排查。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def detect(target):</span></span>
<span class="line"><span>    return 36</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def heuristic(node, target):</span></span>
<span class="line"><span>    # 使用欧几里得距离作为启发式函数</span></span>
<span class="line"><span>    return np.linalg.norm(np.array(Nodes[node].position) - np.array(Nodes[target].position))</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def trynext(graph, current_node, try_node, target_node):</span></span>
<span class="line"><span>    g_score = graph[current_node][try_node]</span></span>
<span class="line"><span>    h_score = heuristic(try_node, target_node)</span></span>
<span class="line"><span>    f_score = g_score + h_score</span></span>
<span class="line"><span>    return f_score</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def A_star_search(graph, start, target):</span></span>
<span class="line"><span>    current_node = start</span></span>
<span class="line"><span>    path = [current_node]</span></span>
<span class="line"><span>    search_path = [current_node]</span></span>
<span class="line"><span>    while not Nodes[current_node].search(target):</span></span>
<span class="line"><span>        f_score = np.inf</span></span>
<span class="line"><span>        next_node = None</span></span>
<span class="line"><span>        for neighbor_node in Nodes[current_node].neighbor:</span></span>
<span class="line"><span>            if neighbor_node not in search_path:</span></span>
<span class="line"><span>                search_path.append(neighbor_node)</span></span>
<span class="line"><span>                f = trynext(graph, current_node, neighbor_node, detect(target))</span></span>
<span class="line"><span>                if f &lt; f_score:</span></span>
<span class="line"><span>                    f_score = f</span></span>
<span class="line"><span>                    next_node = neighbor_node</span></span>
<span class="line"><span>        if next_node is None:</span></span>
<span class="line"><span>            print(&#39;can not find the A&#39;)</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>        path.append(next_node)</span></span>
<span class="line"><span>        current_node = next_node</span></span>
<span class="line"><span>    return path,search_path</span></span>
<span class="line"><span></span></span>
<span class="line"><span>path  = A_star_search(originGraph, start_node, &#39;A&#39;)</span></span>
<span class="line"><span>print(f&#39;path:{path}\\nlen:{len(path)}\\nsearchpath{search_path}\\nlen:{len(search_path)}&#39;)</span></span></code></pre></div><p>得到结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>path:[0, 1, 5, 6, 11, 16, 20, 28, 27, 26, 25, 32, 33, 38, 37, 36]</span></span>
<span class="line"><span>len:16</span></span></code></pre></div><p>这里的探索的节点十六个，但是探索的路径是一条实际可行的路径</p><p>对比Dijkstra算法和A*算法：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Dijkstra_Path:[0, 8, 13, 12, 18, 24, 31, 36]</span></span>
<span class="line"><span>uniform cost search_path:[0, 1, 5, 8, 6, 2, 9, 10, 11, 13, 14, 15, 16, 12, 20, 7, 28, 19, 21, 29, 27, 18, 3, 35, 30, 25, 26, 24, 22, 17, 4, 23, 40, 32, 34, 39, 31, 38, 37, 33, 36]</span></span>
<span class="line"><span>len:41</span></span>
<span class="line"><span>real path length:26.0</span></span>
<span class="line"><span>path:[0, 1, 5, 6, 11, 16, 20, 28, 27, 26, 25, 32, 33, 38, 37, 36]</span></span>
<span class="line"><span>len:16</span></span>
<span class="line"><span>real path length:35.0</span></span></code></pre></div><p>可见A*虽然路径不是最优，但是他只探索了16个节点就找到了目标节点，排查成本上相较于代价一致算法要低上一倍不止，但是路径成本只差了不到1/3.</p><h2 id="优化算法" tabindex="-1">优化算法 <a class="header-anchor" href="#优化算法" aria-label="Permalink to &quot;优化算法&quot;">​</a></h2><p>​ 管理系统修好后，有了全图视野</p><p><img src="https://resource-un4.pages.dev/article/fe3dc05d83ed4da5dc5e51d597e3518.png" alt="仓库图"></p><h3 id="弗洛伊德算法" tabindex="-1">弗洛伊德算法 <a class="header-anchor" href="#弗洛伊德算法" aria-label="Permalink to &quot;弗洛伊德算法&quot;">​</a></h3><p>工人得到了全图视野后，也得到了邻接矩阵，但是现在工人师傅接到了新的任务：计算任意两仓库之间移动的最短路径长度。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>def floydWarshall(graph):</span></span>
<span class="line"><span>    # 获取顶点的数量</span></span>
<span class="line"><span>    n = len(graph)</span></span>
<span class="line"><span>    # 初始化距离矩阵和路径矩阵</span></span>
<span class="line"><span>    dist = [row[:] for row in graph]</span></span>
<span class="line"><span>    # 执行Floyd-Warshall算法</span></span>
<span class="line"><span>    for k in range(n):  # 对于每一个顶点作为中间顶点</span></span>
<span class="line"><span>        for i in range(n):  # 遍历每一个起始顶点</span></span>
<span class="line"><span>            for j in range(n):  # 遍历每一个终点</span></span>
<span class="line"><span>                if dist[i][j] &gt; dist[i][k] + dist[k][j]:</span></span>
<span class="line"><span>                    dist[i][j] = (int)(dist[i][k] + dist[k][j])</span></span>
<span class="line"><span>    return dist</span></span></code></pre></div><p>读取邻接矩阵并根据弗洛伊德算法计算最短路长度，将其变为全连通矩阵：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>df = pd.read_excel(&#39;data.xlsx&#39;, sheet_name=0,header=None)</span></span>
<span class="line"><span># 将DataFrame中的所有&#39;M&#39;替换为numpy.inf</span></span>
<span class="line"><span>df.replace(&#39;M&#39;, M, inplace=True)</span></span>
<span class="line"><span># 如果需要将数据转换为二维数组（numpy数组）</span></span>
<span class="line"><span>graph = np.copy(df.values)</span></span>
<span class="line"><span># print(df)</span></span>
<span class="line"><span>dist= floydWarshall(df.values)</span></span></code></pre></div><p>于是，工人解决了问题。</p><h3 id="tsp模型结合贪婪算法" tabindex="-1">TSP模型结合贪婪算法 <a class="header-anchor" href="#tsp模型结合贪婪算法" aria-label="Permalink to &quot;TSP模型结合贪婪算法&quot;">​</a></h3><p>假设V5其实是整个园区的货物入口，现在新进一批货物在V5暂留，这批货物应该被分别运往不同仓库如下：</p><table tabindex="0"><thead><tr><th>目标仓库（v）</th><th>1</th><th>3</th><th>13</th><th>15</th><th>21</th><th>28</th><th>33</th><th>37</th></tr></thead><tbody><tr><td>物资量(单位/t)</td><td>4</td><td>5</td><td>8</td><td>3</td><td>2</td><td>6</td><td>7</td><td>2</td></tr></tbody></table><p>每次从配送点v5出发，且配送员每次最多可以配送的物资量为4t。当配送员剩余可配送量为零时，认为配送员完成单次派送，返回配送点进行下一次配送，直至所有的物资都被送到指定仓库。求这一过程中总配送路程的最小值以及配送路径。</p><h4 id="思路" tabindex="-1">思路 <a class="header-anchor" href="#思路" aria-label="Permalink to &quot;思路&quot;">​</a></h4><p>已知配送员的配送起点、起点的单次最大物资量、需求点及需求点的需求量。出发点和终点都相同，且要使运输总路程最短，我们认为这是一个变形的TSP问题（也可以是VRP问题）。经过推理可以得出，若直接考虑离出发点最近的派送点，可能产生由于最远点需求较大不得不多次派送从而使总路径增大的问题。因此，通过以下步骤，可以合理规划配送路径并最小化总路径长度，同时确保各需求点的需求得到满足。</p><p>①初始化：</p><p>定义初始变量：设配送员的起点为物资点(C)，每次配送的最大载重量为cap= 4t。获取所有需求点及其对应的需求量。初始化记录剩余需求量和路径总长度的变量。将所需要配送的点分为已选择点集和未选择点集，已选择点集中最初仅有出发点。</p><p>②选择能够一次性满足的需求点：</p><p>在当前所有需求点中，判断是否有需求量小于或等于cap的点。如果存在这样的点，则从中选择能与已选点集中所有点构成的tsp回路最短的需求点进行配送。更新该需求点的需求量并增加路径总长度。</p><p>③更新状态：</p><p>如果配送员还有剩余载物量且仍有符合条件的需求点，重复步骤 2。如果当前没有能够一次性满足的需求点，转到步骤4。</p><p>④处理需求量较大的点：</p><p>如果存在需求量超过cap的需求点，仍优先选择能与已选点集中所有点构成tsp回路最短的点。对该需求点进行部分满足，并更新需求量和路径长度。</p><p>⑤返回仓库：</p><p>每次完成单次配送任务后，需要返回仓库，并更新总路径长度。从仓库出发，重新开始下一次配送。</p><p>⑥终止条件：</p><p>当所有需求点的需求量均为零时，停止计算，并输出总路径长度。</p><h4 id="代码实现" tabindex="-1">代码实现 <a class="header-anchor" href="#代码实现" aria-label="Permalink to &quot;代码实现&quot;">​</a></h4><p><strong>调用gurobi进行TSP建模求解</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import gurobipy as gp</span></span>
<span class="line"><span>from gurobipy import GRB</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span># tsp模型</span></span>
<span class="line"><span>def tsp(graph):</span></span>
<span class="line"><span>    model = gp.Model(&quot;tsp&quot;)</span></span>
<span class="line"><span>    model.setParam(GRB.Param.OutputFlag, 0)</span></span>
<span class="line"><span>    n = len(graph[0])</span></span>
<span class="line"><span>    # 定义决策变量</span></span>
<span class="line"><span>    x = model.addVars(n, n, vtype=GRB.BINARY, name=&quot;x&quot;)</span></span>
<span class="line"><span>    # 目标函数：最小化总距离</span></span>
<span class="line"><span>    z = gp.quicksum(x[i, j] * graph[i][j] for i in range(n) for j in range(n) if i != j)</span></span>
<span class="line"><span>    model.setObjective(z, GRB.MINIMIZE)</span></span>
<span class="line"><span>    # 约束条件</span></span>
<span class="line"><span>    # 每个节点只能离开一次</span></span>
<span class="line"><span>    for i in range(n):</span></span>
<span class="line"><span>        model.addConstr(gp.quicksum(x[i, j] for j in range(n) if i != j) == 1, name=&quot;out_{}&quot;.format(i))</span></span>
<span class="line"><span>    # 每个节点只能进入一次</span></span>
<span class="line"><span>    for j in range(n):</span></span>
<span class="line"><span>        model.addConstr(gp.quicksum(x[i, j] for i in range(n) if i != j) == 1, name=&quot;in_{}&quot;.format(j))</span></span>
<span class="line"><span>    for k in range(n):</span></span>
<span class="line"><span>        model.addConstr(gp.quicksum(x[i, k] for i in range(n) if i == k) == 0, name=&quot;fuck_{}&quot;.format(k))</span></span>
<span class="line"><span>    # 子回路约束</span></span>
<span class="line"><span>    u = model.addVars(n, lb=-GRB.INFINITY, ub=GRB.INFINITY, name=&quot;u&quot;)</span></span>
<span class="line"><span>    for i in range(n):</span></span>
<span class="line"><span>        for j in range(n):</span></span>
<span class="line"><span>            if i != j and i &gt; 0 and j &gt; 0:</span></span>
<span class="line"><span>                # 将辅助变量u与决策变量x连接起来</span></span>
<span class="line"><span>                model.addConstr(u[i] - u[j] + n * x[i, j] &lt;= n - 1, &quot;break_{}_{}&quot;.format(i, j))</span></span>
<span class="line"><span>    # 配置求解器并求解</span></span>
<span class="line"><span>    model.optimize()</span></span>
<span class="line"><span>    # 输出结果</span></span>
<span class="line"><span>    x_list=[]</span></span>
<span class="line"><span>    if model.status == GRB.OPTIMAL:</span></span>
<span class="line"><span>        # print(f&quot;The optimal objective is {model.objVal}&quot;)</span></span>
<span class="line"><span>        for v in model.getVars():</span></span>
<span class="line"><span>            if v.X &gt;= 0.5 and v.varName.startswith(&#39;x&#39;):</span></span>
<span class="line"><span>                # print(f&quot;{v.varName} : {v.X}&quot;)</span></span>
<span class="line"><span>                x_list.append(f&quot;{v.varName}&quot;)</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        print(&quot;No optimal solution found.&quot;)</span></span>
<span class="line"><span>        return None</span></span>
<span class="line"><span>    return model.objVal ,x_list</span></span></code></pre></div><p><strong>贪婪算法</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>G = np.loadtxt(&quot;opt_graph.txt&quot;) #使用弗洛伊德算法优化的全连通矩阵</span></span>
<span class="line"><span>OG = np.loadtxt(&quot;ori_graph.txt&quot;) # 原邻接矩阵</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#配送中心为 v5</span></span>
<span class="line"><span>start = 4</span></span>
<span class="line"><span>capacity = 4</span></span>
<span class="line"><span>all_lenth=0</span></span>
<span class="line"><span>all_path = []</span></span>
<span class="line"><span>count=0</span></span>
<span class="line"><span>#需求节点为 v3 v5 v9 v12  [index, need]</span></span>
<span class="line"><span>need = [</span></span>
<span class="line"><span>    [0,4],</span></span>
<span class="line"><span>    [2,5],</span></span>
<span class="line"><span>    [12,8],</span></span>
<span class="line"><span>    [14,3],</span></span>
<span class="line"><span>    [20,2],</span></span>
<span class="line"><span>    [27,6],</span></span>
<span class="line"><span>    [32,7],</span></span>
<span class="line"><span>    [36,2]</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>while(need):</span></span>
<span class="line"><span>    overplus = capacity</span></span>
<span class="line"><span>    tspnow = [start]</span></span>
<span class="line"><span>    x_tsp = []</span></span>
<span class="line"><span>    ####断点检查</span></span>
<span class="line"><span>    print(f&quot;*************从起点出发****************\\n当前需求need([需求点,需求量]):\\n{need}&quot;)</span></span>
<span class="line"><span>    flag = True</span></span>
<span class="line"><span>    while(overplus&gt;0):</span></span>
<span class="line"><span>        max1 = [0, -1]  # [长度, need_index]</span></span>
<span class="line"><span>        max2 = [0, -1]</span></span>
<span class="line"><span>        min1 = [M, -1]</span></span>
<span class="line"><span>        min2 = [M, -1]</span></span>
<span class="line"><span>        for i in range(len(need)):</span></span>
<span class="line"><span>            if overplus &gt;= need[i][1]:</span></span>
<span class="line"><span>                tsptry = tspnow.copy()</span></span>
<span class="line"><span>                tsptry.append(need[i][0])</span></span>
<span class="line"><span>                temp_g = [[0 for _ in range(len(tsptry))] for _ in range(len(tsptry))]</span></span>
<span class="line"><span>                for k in range(len(tsptry)):</span></span>
<span class="line"><span>                    for j in range(len(tsptry)):</span></span>
<span class="line"><span>                        temp_g[k][j] = G[tsptry[k]][tsptry[j]]</span></span>
<span class="line"><span>                pathlen, meiyy = optalg.tsp(temp_g)</span></span>
<span class="line"><span>                if max1[0] &lt; pathlen:</span></span>
<span class="line"><span>                    max1[0] = pathlen</span></span>
<span class="line"><span>                    max1[1] = i</span></span>
<span class="line"><span>                if min1[0] &gt; pathlen:</span></span>
<span class="line"><span>                    min1[0] = pathlen</span></span>
<span class="line"><span>                    min1[1] = i</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                tsptry = tspnow.copy()</span></span>
<span class="line"><span>                tsptry.append(need[i][0])</span></span>
<span class="line"><span>                temp_g = [[0 for _ in range(len(tsptry))] for _ in range(len(tsptry))]</span></span>
<span class="line"><span>                for k in range(len(tsptry)):</span></span>
<span class="line"><span>                    for j in range(len(tsptry)):</span></span>
<span class="line"><span>                        temp_g[k][j] = G[tsptry[k]][tsptry[j]]</span></span>
<span class="line"><span>                pathlen, meiyy = optalg.tsp(temp_g)</span></span>
<span class="line"><span>                if max2[0] &lt; pathlen:</span></span>
<span class="line"><span>                    max2[0] = pathlen</span></span>
<span class="line"><span>                    max2[1] = i</span></span>
<span class="line"><span>                if min2[0] &gt; pathlen:</span></span>
<span class="line"><span>                    min2[0] = pathlen</span></span>
<span class="line"><span>                    min2[1] = i</span></span>
<span class="line"><span>        print(f&quot;##overplus = {overplus},tspnow = {tspnow},need={need}&quot;)</span></span>
<span class="line"><span>        if min1[1] &gt; -1:</span></span>
<span class="line"><span>            tspnow.append(need[min1[1]][0])</span></span>
<span class="line"><span>            overplus -= need[min1[1]][1]</span></span>
<span class="line"><span>            need.pop(min1[1])</span></span>
<span class="line"><span>            pass</span></span>
<span class="line"><span>        elif min2[1] &gt; -1:</span></span>
<span class="line"><span>            # print(f&quot;max2={max2[1]}&quot;)</span></span>
<span class="line"><span>            tspnow.append(need[min2[1]][0])</span></span>
<span class="line"><span>            need[min2[1]][1] -= overplus</span></span>
<span class="line"><span>            overplus = 0</span></span>
<span class="line"><span>            pass</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            break</span></span>
<span class="line"><span>        print(f&quot;##overplus = {overplus},tspnow = {tspnow},x_tsp = {x_tsp},need={need}&quot;)</span></span>
<span class="line"><span>    print(f&quot;overplus = {overplus},tspnow = {tspnow},x_tsp = {x_tsp},need={need}&quot;)</span></span>
<span class="line"><span>    ##得到第一个tsp圈</span></span>
<span class="line"><span>    temp_g = [[0 for _ in range(len(tspnow))] for _ in range(len(tspnow))]</span></span>
<span class="line"><span>    for k in range(len(tspnow)):</span></span>
<span class="line"><span>        for j in range(len(tspnow)):</span></span>
<span class="line"><span>            temp_g[k][j] = G[tspnow[k]][tspnow[j]]</span></span>
<span class="line"><span>    length_temp,x_temp = optalg.tsp(temp_g)</span></span>
<span class="line"><span>    # print(f&quot;x-temp={x_temp}&quot;)</span></span>
<span class="line"><span>    for i in x_temp:</span></span>
<span class="line"><span>        var_name, indices = i.split(&#39;[&#39;)</span></span>
<span class="line"><span>        indices = indices[:-1]  # 去掉最后一个&#39;]&#39;字符</span></span>
<span class="line"><span>        x_tsp.append(tspnow[(int)(indices.split(&#39;,&#39;)[0])]) # 分割索引为列表</span></span>
<span class="line"><span>    x_tsp.append(start)</span></span>
<span class="line"><span>    full_path=[]</span></span>
<span class="line"><span>    for i in range(len(x_tsp)-1):</span></span>
<span class="line"><span>        full_path.extend(optalg.dijk(OG,x_tsp[i],x_tsp[i+1]))</span></span>
<span class="line"><span>    full_path.append(x_tsp[-1])</span></span>
<span class="line"><span>    all_lenth+=length_temp</span></span>
<span class="line"><span>    all_path.append(x_tsp)</span></span>
<span class="line"><span>    print(f&quot;路长{length_temp},路径{x_tsp}\\nfullpath:{full_path}&quot;)</span></span>
<span class="line"><span>    count+=1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>print(&quot;**************************&quot;)</span></span>
<span class="line"><span>print(f&quot;总长{all_lenth},圈数：{count},{all_path}&quot;)</span></span></code></pre></div><p><em>结果均为节点的索引，故v1对应0，类推</em></p><table tabindex="0"><thead><tr><th>圈数</th><th>路长</th><th>路径</th></tr></thead><tbody><tr><td>1</td><td>18</td><td>[4, 12, 13, 14, 13, 12, 4]</td></tr><tr><td>2</td><td>49</td><td>[4, 12, 13, 14, 15, 19, 20, 28, 27, 34, 39, 38, 37, 36, 31, 24, 18, 12, 4]</td></tr><tr><td>3</td><td>38</td><td>[4, 12, 13, 8, 0, 8, 13, 12, 4]</td></tr><tr><td>4</td><td>12</td><td>[4, 12, 4]</td></tr><tr><td>5</td><td>32</td><td>[4, 12, 13, 14, 15, 19, 27, 19, 15, 14, 13, 12, 4]</td></tr><tr><td>6</td><td>32</td><td>[4, 12, 13, 14, 15, 19, 27, 19, 15, 14, 13, 12, 4]</td></tr><tr><td>7</td><td>41</td><td>[4, 12, 13, 14, 15, 19, 27, 26, 25, 32, 25, 13, 12, 4]</td></tr><tr><td>8</td><td>36</td><td>[4, 12, 13, 25, 32, 25, 13, 12, 4]</td></tr><tr><td>9</td><td>36</td><td>[4, 12, 13, 14, 15, 10, 5, 6, 2, 6, 5, 9, 14, 13, 12, 4]</td></tr><tr><td>10</td><td>36</td><td>[4, 12, 13, 14, 15, 10, 5, 6, 2, 6, 5, 9, 14, 13, 12, 4]</td></tr><tr><td>总和</td><td>330</td><td>[[4, 14, 12, 4], [4, 20, 36, 4], [4, 0, 4], [4, 12, 4], [4, 12, 27, 4], [4, 27, 4], [4, 27, 32, 4], [4, 32, 4], [4, 2, 4], [4, 2, 4]]</td></tr></tbody></table><h2 id="货物错位归仓问题" tabindex="-1">货物错位归仓问题 <a class="header-anchor" href="#货物错位归仓问题" aria-label="Permalink to &quot;货物错位归仓问题&quot;">​</a></h2><p>仓库管理人员在维护仓库时发现了部分货物错误入库，现在需要把错误入库的货物送回正确的仓库。错误入库的货物信息如下：</p><table tabindex="0"><thead><tr><th>货物编号</th><th>所在仓库</th><th>正确仓库</th></tr></thead><tbody><tr><td>0</td><td>4</td><td>0</td></tr><tr><td>1</td><td>5</td><td>14</td></tr><tr><td>2</td><td>18</td><td>32</td></tr><tr><td>3</td><td>25</td><td>36</td></tr><tr><td>4</td><td>40</td><td>27</td></tr><tr><td>5</td><td>11</td><td>14</td></tr><tr><td>6</td><td>6</td><td>8</td></tr><tr><td>7</td><td>6</td><td>8</td></tr><tr><td>8</td><td>7</td><td>8</td></tr><tr><td>9</td><td>8</td><td>40</td></tr><tr><td>10</td><td>9</td><td>8</td></tr><tr><td>11</td><td>10</td><td>22</td></tr><tr><td>12</td><td>11</td><td>22</td></tr><tr><td>13</td><td>29</td><td>36</td></tr><tr><td>14</td><td>35</td><td>36</td></tr></tbody></table><p>现在工人师傅从V5出发，要将错误入库的货物送回正确的仓库，如何安排取货和送货的顺序高效完成任务呢？</p><p><strong>条件假设</strong></p><ol><li>配送员在路上行驶的平均速度是40<em>km/h</em>；</li><li>配送过程不存在道路拥堵的状况；</li><li>配送过程的取货用时和货物归仓用时是随机的。这里我们假设都满足正态分布且取正值，其中，顾客响应时间满足标准差为0.5，均值为3的正态分布；物资取用时间是标准差0.5，均值为1的正态分布;</li></ol><h2 id="动态规划" tabindex="-1">动态规划 <a class="header-anchor" href="#动态规划" aria-label="Permalink to &quot;动态规划&quot;">​</a></h2><p>​ 因为动态规划会遇上指数爆炸的问题，因此我们假设配送师傅工作时间只有一个小时，也就是将送货时长超过60分钟的情况剪枝，并且每五秒钟输出一次当前最优解。</p><p><strong>思路</strong>：</p><p>​ 使用动态规划配合分支定界的剪枝算法来求解：以接单量n为阶段标志，接单的组合为状态标志。</p><p>1)初始化：</p><p>没有接单，阶段<em>n</em>=0,只有一种状态：接单组合为空。这个状态下，配送时长为0，小于截至时间，故可以通过这个状态发展下一个阶段的状态。</p><p>2)逐步增加订单：</p><p>n=1阶段下所有状态都由前一阶段的状态发展而来，再对这个阶段所有状态判断能否发展下一阶段的状态，进而发展下一阶段的各个状态。由此类推。</p><p>3)退出条件：</p><p>当发展至某一阶段所有的状态都不符合发展下一阶段状态的条件时，停止发展。</p><p>4)得到最优解：</p><p>从已发展的阶段中寻找阶段最大且符合条件的状态后，进而筛选耗时最短的状态作为最优解。</p><p>第三问则在第二问的基础上增加每个状态的效益的计算。下一个状态是否可以发展的条件则是在满足时间约束同时满足效益得到优化这一约束。</p><p><strong>代码实现如下：</strong></p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import math</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import optalg</span></span>
<span class="line"><span>import time</span></span>
<span class="line"><span>M = math.inf</span></span>
<span class="line"><span>start_time = time.time()</span></span>
<span class="line"><span>optresult=[] # {itercount:opt_status}</span></span>
<span class="line"><span>G = np.loadtxt(&quot;opt_graph.txt&quot;)</span></span>
<span class="line"><span>OG = np.loadtxt(&quot;ori_graph.txt&quot;)</span></span>
<span class="line"><span># 等待错误货物取出的时间 min</span></span>
<span class="line"><span>def throw_wait(x=1):</span></span>
<span class="line"><span>    # 定义正态分布的参数：均值（mean），标准差（stddev）</span></span>
<span class="line"><span>    mean = 3  # 均值</span></span>
<span class="line"><span>    stddev = 0.6  # 标准差</span></span>
<span class="line"><span>    if x==0:</span></span>
<span class="line"><span>        return mean</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return max(0.1 ,np.random.normal(mean, stddev))</span></span>
<span class="line"><span># 货物入库时间</span></span>
<span class="line"><span>waittime2 = 1</span></span>
<span class="line"><span>def pick_wait(x=1):</span></span>
<span class="line"><span>    # 定义正态分布的参数：均值（mean），标准差（stddev）</span></span>
<span class="line"><span>    mean = 1  # 均值</span></span>
<span class="line"><span>    stddev = 0.2  # 标准差</span></span>
<span class="line"><span>    if x==0:</span></span>
<span class="line"><span>        return mean</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        return max(0.1 ,np.random.normal(mean, stddev))</span></span>
<span class="line"><span>#平均每分钟移动的距离 60km/h = 1km/min  40km/h = 0.667km/h</span></span>
<span class="line"><span>averspeed = 0.667</span></span>
<span class="line"><span># 最后一单送达时间限制</span></span>
<span class="line"><span>limit_time = 60</span></span>
<span class="line"><span>def printresult(stage,opt_status,OG):</span></span>
<span class="line"><span>    for n,stagelist in stage.items():</span></span>
<span class="line"><span>        print(f&quot;**************第{n}阶段:***************&quot;)</span></span>
<span class="line"><span>        count=1</span></span>
<span class="line"><span>        for status0 in stagelist:</span></span>
<span class="line"><span>            print(f&quot;*****第{n}阶段状态{count}:&quot;)</span></span>
<span class="line"><span>            count+=1</span></span>
<span class="line"><span>            time0=status0.get(&quot;time&quot;)</span></span>
<span class="line"><span>            # list(status0.get(&quot;ReceviedOrder&quot;))</span></span>
<span class="line"><span>            ifew = status0.get(&quot;active&quot;)</span></span>
<span class="line"><span>            bh = status0.get(&quot;ReceviedOrder&quot;)</span></span>
<span class="line"><span>            print(f&quot;货物编号:{bh}\\n完成订单最短耗时:{time0}\\n能否额外接单{ifew}&quot;)</span></span>
<span class="line"><span>    print_opt(opt_status,OG)</span></span>
<span class="line"><span>def print_opt(opt_status,OG):</span></span>
<span class="line"><span>    print(&quot;***************opt*******************&quot;)</span></span>
<span class="line"><span>    print(opt_status)</span></span>
<span class="line"><span>    full_path=[]</span></span>
<span class="line"><span>    path0=[]</span></span>
<span class="line"><span>    path0.extend(opt_status.get(&quot;path&quot;))</span></span>
<span class="line"><span>    for i in range(len(path0) - 1):</span></span>
<span class="line"><span>        full_path.extend(optalg.dijk(OG, path0[i], path0[i + 1]))</span></span>
<span class="line"><span>    full_path.append(path0[-1])</span></span>
<span class="line"><span>    print(f&quot;fullpath:{full_path}&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def GetTime(start_time,opt_status,OG,itercount):</span></span>
<span class="line"><span>    T = time.time()</span></span>
<span class="line"><span>    if  T- start_time &gt;= 5:</span></span>
<span class="line"><span>        if not hasattr(GetTime, &#39;last_run_time&#39;):</span></span>
<span class="line"><span>            GetTime.last_run_time = T</span></span>
<span class="line"><span>            print(&quot;运行超过5s,输出当前最优结果:&quot;)</span></span>
<span class="line"><span>            print(f&quot;当前迭代次数{itercount}&quot;)</span></span>
<span class="line"><span>            print_opt(opt_status,OG)</span></span>
<span class="line"><span>            print(&quot;程序继续运行,将会在最优解得到更新时输出&quot;)</span></span>
<span class="line"><span>        elif T - GetTime.last_run_time &gt;= 5:</span></span>
<span class="line"><span>            print(&quot;当前最优结果:&quot;)</span></span>
<span class="line"><span>            print(f&quot;当前迭代次数{itercount}&quot;)</span></span>
<span class="line"><span>            print_opt(opt_status, OG)</span></span>
<span class="line"><span>            print(&quot;程序继续运行...&quot;)</span></span>
<span class="line"><span>            GetTime.last_run_time = T</span></span>
<span class="line"><span>    return T</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>########################################Q1</span></span>
<span class="line"><span># 出发位置为 v1 index=0</span></span>
<span class="line"><span>start = 4</span></span>
<span class="line"><span># 可接订单列表[pick, throw]</span></span>
<span class="line"><span># pick为取货点，throw为送货点</span></span>
<span class="line"><span>take_out = [</span></span>
<span class="line"><span>    [4,0],</span></span>
<span class="line"><span>    [5,14],</span></span>
<span class="line"><span>    [18,32],</span></span>
<span class="line"><span>    [25,36],</span></span>
<span class="line"><span>    [40,27],</span></span>
<span class="line"><span>    [11,14],</span></span>
<span class="line"><span>    [6,8], #0.06</span></span>
<span class="line"><span>    [6,8], # 1.4</span></span>
<span class="line"><span>    [7,8], # 10.777399063110352 seconds</span></span>
<span class="line"><span>    [8,40], #  13.456018447875977 seconds</span></span>
<span class="line"><span>    [9,8], # 15.147678852081299 seconds</span></span>
<span class="line"><span>    [10,22], # 16.096506595611572 seconds</span></span>
<span class="line"><span>    [11,22], # 29.35</span></span>
<span class="line"><span>    [12,36],</span></span>
<span class="line"><span>    [13,36],</span></span>
<span class="line"><span>    [14,36],</span></span>
<span class="line"><span>    [29,36],</span></span>
<span class="line"><span>    [35,36],</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>take_out_index = list(range(len(take_out)))</span></span>
<span class="line"><span># opttakeout = []</span></span>
<span class="line"><span># for i in take_out:</span></span>
<span class="line"><span>#     if not opttakeout:</span></span>
<span class="line"><span>#         for j in range(len(opttakeout)):</span></span>
<span class="line"><span>#             if opttakeout[j][0] == i[0] and opttakeout[j][1]==i[1]:</span></span>
<span class="line"><span>#                 opttakeout[2].append(j)</span></span>
<span class="line"><span>#             else:</span></span>
<span class="line"><span>#                 i.append([j])</span></span>
<span class="line"><span>#                 opttakeout.append(i)</span></span>
<span class="line"><span>#     else:</span></span>
<span class="line"><span>#         opttakeout.append([take_out[0],[0]])</span></span>
<span class="line"><span># print(opttakeout)</span></span>
<span class="line"><span>##init</span></span>
<span class="line"><span>n=0</span></span>
<span class="line"><span>stage ={} # 放所有阶段 stage[0]就算n=0</span></span>
<span class="line"><span>allstatus =[] # 放本阶段包含的所有</span></span>
<span class="line"><span>opt_status={&quot;time&quot;:0,&quot;stage&quot;:0,&quot;ReceviedOrder&quot;: set(),&quot;active&quot;:True,&quot;path&quot;:[]}</span></span>
<span class="line"><span>allstatus.append(opt_status)</span></span>
<span class="line"><span>stage[0] = allstatus</span></span>
<span class="line"><span>itercount = 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>##动态规划</span></span>
<span class="line"><span>while True:</span></span>
<span class="line"><span>    n+=1 #阶段数/单量</span></span>
<span class="line"><span>    if n&gt;7:</span></span>
<span class="line"><span>        print(&quot;over6&quot;)</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>    allstatus =[] #放本阶段包含的所有</span></span>
<span class="line"><span>    for prestage_statu in stage[n-1]:</span></span>
<span class="line"><span>        if not prestage_statu[&quot;active&quot;]:</span></span>
<span class="line"><span>            continue</span></span>
<span class="line"><span>        # trystatus = prestage_statu</span></span>
<span class="line"><span>        canadd = list(set(take_out_index) - prestage_statu[&quot;ReceviedOrder&quot;])</span></span>
<span class="line"><span>        for add_index in canadd:</span></span>
<span class="line"><span>            flag = False</span></span>
<span class="line"><span>            # new_get_index = prestage_statu.get(&quot;ReceviedOrder&quot;).copy().add(add_index)</span></span>
<span class="line"><span>            new_get_index = prestage_statu[&quot;ReceviedOrder&quot;].copy()</span></span>
<span class="line"><span>            new_get_index.add(add_index)</span></span>
<span class="line"><span>            # print(new_get_index)</span></span>
<span class="line"><span>            for check in allstatus:</span></span>
<span class="line"><span>                if check.get(&quot;ReceviedOrder&quot;) == new_get_index:</span></span>
<span class="line"><span>                    flag = True</span></span>
<span class="line"><span>                    break</span></span>
<span class="line"><span>            if flag: #新的订单集合已经存在</span></span>
<span class="line"><span>                continue</span></span>
<span class="line"><span>            #新的订单集合不存在</span></span>
<span class="line"><span>            # print(new_get_index)</span></span>
<span class="line"><span>            dingdamn = [take_out[i] for i in new_get_index]</span></span>
<span class="line"><span>            newlenth,newpath = optalg.dpmin(G,start,dingdamn)</span></span>
<span class="line"><span>            newtime = (n-1)*throw_wait(0)+ newlenth/averspeed +n*pick_wait(0)</span></span>
<span class="line"><span>            estimatedtime = (n-1)*throw_wait()+ newlenth/averspeed +n*pick_wait()</span></span>
<span class="line"><span>            if newtime &lt; limit_time:</span></span>
<span class="line"><span>                newstatus = {&quot;time&quot;: newtime,&quot;estimatedtime&quot;:estimatedtime, &quot;stage&quot;: n, &quot;ReceviedOrder&quot;: new_get_index, &quot;active&quot;: True,&quot;path&quot;:newpath}</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                newstatus = {&quot;time&quot;: newtime,&quot;estimatedtime&quot;:estimatedtime,  &quot;stage&quot;: n, &quot;ReceviedOrder&quot;: new_get_index, &quot;active&quot;: False,&quot;path&quot;:newpath}</span></span>
<span class="line"><span>            # 找最优</span></span>
<span class="line"><span>            itercount+=1</span></span>
<span class="line"><span>            temptime = GetTime(start_time, opt_status, OG, itercount) - start_time</span></span>
<span class="line"><span>            if newstatus.get(&quot;time&quot;)&lt;=limit_time and newstatus.get(&quot;stage&quot;)&gt;=opt_status.get(&quot;stage&quot;):</span></span>
<span class="line"><span>                # if newstatus.get(&quot;stage&quot;)&gt;opt_status.get(&quot;stage&quot;):</span></span>
<span class="line"><span>                opt_status = newstatus</span></span>
<span class="line"><span>                optresult.append(f&quot;接单数{n},迭代次数{itercount},运行至此耗时{round(temptime,2)}s&quot;)</span></span>
<span class="line"><span>                # elif newstatus.get(&quot;time&quot;)&lt;opt_status.get(&quot;time&quot;):</span></span>
<span class="line"><span>                #     opt_status = newstatus</span></span>
<span class="line"><span>                    # optresult.append(f&quot;接单数{n},迭代次数{itercount},运行至此耗时{round(temptime, 2)}s&quot;)</span></span>
<span class="line"><span>            allstatus.append(newstatus)</span></span>
<span class="line"><span>    # print(allstatus)</span></span>
<span class="line"><span>    if not allstatus:</span></span>
<span class="line"><span>        break</span></span>
<span class="line"><span>    stage[n]=allstatus</span></span>
<span class="line"><span>printresult(stage,opt_status,OG)</span></span>
<span class="line"><span>print(f&quot;exc:{time.time()-start_time}&quot;)</span></span>
<span class="line"><span>for i in optresult:</span></span>
<span class="line"><span>    print(i)</span></span></code></pre></div><p>于是得到结果</p><p>因为动态规划状态数增长太快，因此设置每五秒钟输出一次答案。以便观察优化结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>运行超过5s,输出当前最优结果:</span></span>
<span class="line"><span>当前迭代次数1326</span></span>
<span class="line"><span>***************opt*******************</span></span>
<span class="line"><span>{&#39;time&#39;: 54.97901049475262, &#39;estimatedtime&#39;: 53.528791967788415, &#39;stage&#39;: 4, &#39;ReceviedOrder&#39;: {10, 5, 6, 7}, &#39;active&#39;: True, &#39;path&#39;: [4, 11, 6, 6, 9, 8, 8, 8, 14]}</span></span>
<span class="line"><span>fullpath:[4, 12, 13, 14, 15, 16, 11, 6, 5, 9, 8, 9, 14]</span></span>
<span class="line"><span>程序继续运行,将会在最优解得到更新时输出</span></span>
<span class="line"><span>当前最优结果:</span></span>
<span class="line"><span>当前迭代次数1346</span></span>
<span class="line"><span>***************opt*******************</span></span>
<span class="line"><span>{&#39;time&#39;: 54.97901049475262, &#39;estimatedtime&#39;: 53.528791967788415, &#39;stage&#39;: 4, &#39;ReceviedOrder&#39;: {10, 5, 6, 7}, &#39;active&#39;: True, &#39;path&#39;: [4, 11, 6, 6, 9, 8, 8, 8, 14]}</span></span>
<span class="line"><span>fullpath:[4, 12, 13, 14, 15, 16, 11, 6, 5, 9, 8, 9, 14]</span></span>
<span class="line"><span>程序继续运行...</span></span>
<span class="line"><span>当前最优结果:</span></span>
<span class="line"><span>当前迭代次数1363</span></span>
<span class="line"><span>***************opt*******************</span></span>
<span class="line"><span>{&#39;time&#39;: 58.97901049475262, &#39;estimatedtime&#39;: 60.7242975447131, &#39;stage&#39;: 5, &#39;ReceviedOrder&#39;: {1, 5, 6, 7, 10}, &#39;active&#39;: True, &#39;path&#39;: [4, 11, 6, 6, 5, 9, 8, 8, 8, 14, 14]}</span></span>
<span class="line"><span>fullpath:[4, 12, 13, 14, 15, 16, 11, 6, 5, 9, 8, 9, 14]</span></span>
<span class="line"><span>程序继续运行...</span></span>
<span class="line"><span>......</span></span></code></pre></div><p><strong>运行结果</strong></p><p>​ 运行程序，可以得出接单数量与迭代次数，接单数量与运行用时之间的关系如下表所示：</p><table tabindex="0"><thead><tr><th>接单数</th><th>迭代次数</th><th>运行至此耗时</th></tr></thead><tbody><tr><td>1</td><td>1</td><td>0.0s</td></tr><tr><td>2</td><td>19</td><td>0.0s</td></tr><tr><td>3</td><td>180</td><td>0.01s</td></tr><tr><td>4</td><td>820</td><td>0.3s</td></tr><tr><td>5</td><td>1356</td><td>8.97s</td></tr></tbody></table><p>​ 将已接单数目与运行时间和迭代次数之间的关系分别可视化，具体关系如下图所示</p><p><img src="https://resource-un4.pages.dev/article/image-20241008205702403.png" alt="图3 运行时间和已接收订单数目之间的关系"></p><p><img src="https://resource-un4.pages.dev/article/image-20241008205811501.png" alt=" 图4 迭代次数和已接收订单数目之间的关系"></p><p><img src="https://resource-un4.pages.dev/article/image-20241008210115891.png" alt="图5 优化时间与订单数目之间的关系"></p><p><img src="https://resource-un4.pages.dev/article/image-20241008210052849.png" alt="图6 订单数目与迭代次数之间的关系"></p><p>由运行结果可知在不超过截止时间的前提下，他最多一次性能接5单，接编号为1、5、6、7、10的订单，取餐送餐路线为：4, 12, 13, 14, 15, 16, 11, 6, 5, 9, 8, 9, 14，预计到达最后一个送货点所在地需要58.98分钟.</p><p>​ 假如我要全部送完，那动态规划遭遇了指数爆炸，肯定没戏了，因此我们可以使用：</p><h2 id="遗传算法" tabindex="-1">遗传算法 <a class="header-anchor" href="#遗传算法" aria-label="Permalink to &quot;遗传算法&quot;">​</a></h2><p>​ 直接上代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>import random</span></span>
<span class="line"><span>from copy import deepcopy</span></span>
<span class="line"><span>from collections import Counter</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>from tqdm import tqdm</span></span>
<span class="line"><span></span></span>
<span class="line"><span>import graph_process</span></span>
<span class="line"><span></span></span>
<span class="line"><span>originGraph ,optimizedGraph = graph_process.read_graph(&#39;original_graph.xlsx&#39;)</span></span>
<span class="line"><span>start = 4</span></span>
<span class="line"><span>take_out = [</span></span>
<span class="line"><span>    [4,0],</span></span>
<span class="line"><span>    [5,14],</span></span>
<span class="line"><span>    [18,32],</span></span>
<span class="line"><span>    [25,36],</span></span>
<span class="line"><span>    [40,27],</span></span>
<span class="line"><span>    [11,14],</span></span>
<span class="line"><span>    [6,8],</span></span>
<span class="line"><span>    [6,8],</span></span>
<span class="line"><span>    [7,8],</span></span>
<span class="line"><span>    [8,40],</span></span>
<span class="line"><span>    [9,8],</span></span>
<span class="line"><span>    [10,22],</span></span>
<span class="line"><span>    [11,22],</span></span>
<span class="line"><span>    [12,36],</span></span>
<span class="line"><span>    [13,36],</span></span>
<span class="line"><span>    [14,36],</span></span>
<span class="line"><span>    [29,36],</span></span>
<span class="line"><span>    [35,36],</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span>alldata = []</span></span>
<span class="line"><span>for i in take_out:</span></span>
<span class="line"><span>    alldata.append(i[0])</span></span>
<span class="line"><span>    alldata.append(i[1])</span></span>
<span class="line"><span>element_counts = Counter(alldata)</span></span>
<span class="line"><span># Convert to dictionary</span></span>
<span class="line"><span>element_counts_dict = dict(element_counts)</span></span>
<span class="line"><span>print(element_counts_dict)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>VARY = 0.05  # 变异几率</span></span>
<span class="line"><span>class Gene:</span></span>
<span class="line"><span>    def __init__(self, name=&#39;Gene&#39;, data=None):</span></span>
<span class="line"><span>        self.name = name</span></span>
<span class="line"><span>        self.length =2*len(take_out)</span></span>
<span class="line"><span>        if data is None:</span></span>
<span class="line"><span>            self.data = self._getGene()</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            self.data = data</span></span>
<span class="line"><span>        self.giggity = None</span></span>
<span class="line"><span>        self.fit = self.getFit()</span></span>
<span class="line"><span>        self.chooseProb = 0  # 选择概率</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _getGene(self):</span></span>
<span class="line"><span>        data = []</span></span>
<span class="line"><span>        for i in take_out:</span></span>
<span class="line"><span>            data.append(i[0])</span></span>
<span class="line"><span>            data.append(i[1])</span></span>
<span class="line"><span>        random.shuffle(data)</span></span>
<span class="line"><span>        return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    # return fitness</span></span>
<span class="line"><span>    def getFit(self):</span></span>
<span class="line"><span>        fit = 0</span></span>
<span class="line"><span>        order_list = take_out.copy()</span></span>
<span class="line"><span>        get_order = []</span></span>
<span class="line"><span>        self.giggity = []</span></span>
<span class="line"><span>        for i in self.data:</span></span>
<span class="line"><span>            tempLog = []</span></span>
<span class="line"><span>            tempLog.append([&quot;到达&quot;, i])</span></span>
<span class="line"><span>            poplist = []</span></span>
<span class="line"><span>            for j in range(len(order_list)):</span></span>
<span class="line"><span>                if i == order_list[j][0]:</span></span>
<span class="line"><span>                    poplist.append(j)</span></span>
<span class="line"><span>                    tempLog.append([&quot;装货&quot;, order_list[j]])</span></span>
<span class="line"><span>            for j in range(len(poplist)):</span></span>
<span class="line"><span>                get_order.append(order_list.pop(poplist[j]-j))</span></span>
<span class="line"><span>            poplist.clear()</span></span>
<span class="line"><span>            for j in range(len(get_order)):</span></span>
<span class="line"><span>                if i == get_order[j][1]:</span></span>
<span class="line"><span>                    poplist.append(j)</span></span>
<span class="line"><span>                    tempLog.append([&quot;卸货&quot;, get_order[j]])</span></span>
<span class="line"><span>            for j in range(len(poplist)):</span></span>
<span class="line"><span>                get_order.pop(poplist[j]-j)</span></span>
<span class="line"><span>            if len(tempLog) != 1:</span></span>
<span class="line"><span>                self.giggity.append(tempLog)</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if len(order_list) != 0:</span></span>
<span class="line"><span>            self.giggity = &#39;error&#39;</span></span>
<span class="line"><span>        elif len(get_order) != 0:</span></span>
<span class="line"><span>            fit += np.inf</span></span>
<span class="line"><span>            self.giggity = &#39;error&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        dist = []  # from this to next</span></span>
<span class="line"><span>        # calculate distance</span></span>
<span class="line"><span>        i = 1</span></span>
<span class="line"><span>        while i &lt; len(self.data):</span></span>
<span class="line"><span>            v1 = self.data[i - 1]</span></span>
<span class="line"><span>            v2 = self.data[i]</span></span>
<span class="line"><span>            dist.append(optimizedGraph[v1][v2])</span></span>
<span class="line"><span>            i += 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # distance cost</span></span>
<span class="line"><span>        distCost = sum(dist)+optimizedGraph[start][self.data[0]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        fit += distCost</span></span>
<span class="line"><span>        return 1/fit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def updateChooseProb(self, sumFit):</span></span>
<span class="line"><span>        self.chooseProb = self.fit / sumFit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def moveRandSubPathLeft(self):</span></span>
<span class="line"><span>        path = random.randrange(len(self.data))  # choose a path index</span></span>
<span class="line"><span>        swapped_list = self.data[path:] + self.data[:path]</span></span>
<span class="line"><span>        self.data = swapped_list</span></span>
<span class="line"><span></span></span>
<span class="line"><span># return a bunch of random genes</span></span>
<span class="line"><span>def getRandomGenes(size):</span></span>
<span class="line"><span>    genes = []</span></span>
<span class="line"><span>    for i in range(size):</span></span>
<span class="line"><span>        genes.append(Gene(&quot;Gene &quot;+str(i)))</span></span>
<span class="line"><span>    return genes</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def getSumFit(genes):</span></span>
<span class="line"><span>    sumFit = 0</span></span>
<span class="line"><span>    for gene in genes:</span></span>
<span class="line"><span>        sumFit += gene.fit</span></span>
<span class="line"><span>    return sumFit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>def updateChooseProb(genes):</span></span>
<span class="line"><span>    sumFit = getSumFit(genes)</span></span>
<span class="line"><span>    for gene in genes:</span></span>
<span class="line"><span>        gene.updateChooseProb(sumFit)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 计算累计概率</span></span>
<span class="line"><span>def getSumProb(genes):</span></span>
<span class="line"><span>    sum = 0</span></span>
<span class="line"><span>    for gene in genes:</span></span>
<span class="line"><span>        sum += gene.chooseProb</span></span>
<span class="line"><span>    return sum</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 选择复制，选择前 1/3</span></span>
<span class="line"><span>def choose(genes):</span></span>
<span class="line"><span>    num = int(geneNum/6) * 2    # 选择偶数个，方便下一步交叉</span></span>
<span class="line"><span>    # sort genes with respect to chooseProb</span></span>
<span class="line"><span>    key = lambda gene: gene.chooseProb</span></span>
<span class="line"><span>    genes.sort(reverse=True, key=key)</span></span>
<span class="line"><span>    # return shuffled top 1/3</span></span>
<span class="line"><span>    return genes[0:num]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 交叉一对</span></span>
<span class="line"><span>def crossPair(gene1, gene2, crossedGenes):</span></span>
<span class="line"><span>    gene1.moveRandSubPathLeft()</span></span>
<span class="line"><span>    gene2.moveRandSubPathLeft()</span></span>
<span class="line"><span>    key = lambda gene: gene.fit</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    possible = []</span></span>
<span class="line"><span>    for _ in range(10):</span></span>
<span class="line"><span>        newGene1 = []</span></span>
<span class="line"><span>        p1= random.randrange(len(gene1.data))</span></span>
<span class="line"><span>        p2 = 0</span></span>
<span class="line"><span>        tempdict = element_counts_dict.copy()</span></span>
<span class="line"><span>        while p2 != p1:</span></span>
<span class="line"><span>            ele = gene1.data[p2]</span></span>
<span class="line"><span>            newGene1.append(ele)</span></span>
<span class="line"><span>            tempdict[ele] -= 1</span></span>
<span class="line"><span>            p2 += 1</span></span>
<span class="line"><span>        # copy data not exits in father gene</span></span>
<span class="line"><span>        for pos in gene2.data:</span></span>
<span class="line"><span>            if tempdict[pos] &gt; 0:</span></span>
<span class="line"><span>                tempdict[pos] -= 1</span></span>
<span class="line"><span>                newGene1.append(pos)</span></span>
<span class="line"><span>        possible.append(Gene(data=newGene1))</span></span>
<span class="line"><span>    possible.sort(reverse=True, key=key)</span></span>
<span class="line"><span>    crossedGenes.append(possible[0])</span></span>
<span class="line"><span>    possible = []</span></span>
<span class="line"><span>    for _ in range(10):</span></span>
<span class="line"><span>        newGene2 = []</span></span>
<span class="line"><span>        p1 = random.randrange(len(gene2.data))</span></span>
<span class="line"><span>        p2 = 0</span></span>
<span class="line"><span>        tempdict = element_counts_dict.copy()</span></span>
<span class="line"><span>        while p2 != p1:</span></span>
<span class="line"><span>            ele = gene1.data[p2]</span></span>
<span class="line"><span>            newGene2.append(ele)</span></span>
<span class="line"><span>            tempdict[ele] -= 1</span></span>
<span class="line"><span>            p2 += 1</span></span>
<span class="line"><span>        # copy data not exits in father gene</span></span>
<span class="line"><span>        for pos in gene1.data:</span></span>
<span class="line"><span>            if tempdict[pos] &gt; 0:</span></span>
<span class="line"><span>                tempdict[pos] -= 1</span></span>
<span class="line"><span>                newGene2.append(pos)</span></span>
<span class="line"><span>        possible.append(Gene(data=newGene2))</span></span>
<span class="line"><span>    possible.sort(reverse=True, key=key)</span></span>
<span class="line"><span>    crossedGenes.append(possible[0])</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 交叉</span></span>
<span class="line"><span>def cross(genes):</span></span>
<span class="line"><span>    crossedGenes = []</span></span>
<span class="line"><span>    for i in range(0, len(genes), 2):</span></span>
<span class="line"><span>        crossPair(genes[i], genes[i+1], crossedGenes)</span></span>
<span class="line"><span>    return crossedGenes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 合并</span></span>
<span class="line"><span>def mergeGenes(genes, crossedGenes):</span></span>
<span class="line"><span>    # sort genes with respect to chooseProb</span></span>
<span class="line"><span>    key = lambda gene: gene.chooseProb</span></span>
<span class="line"><span>    genes.sort(reverse=True, key=key)</span></span>
<span class="line"><span>    pos = geneNum - 1</span></span>
<span class="line"><span>    for gene in crossedGenes:</span></span>
<span class="line"><span>        genes[pos] = gene</span></span>
<span class="line"><span>        pos -= 1</span></span>
<span class="line"><span>    return  genes</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 变异一个</span></span>
<span class="line"><span>def varyOne(gene):</span></span>
<span class="line"><span>    varyNum = 10</span></span>
<span class="line"><span>    variedGenes = []</span></span>
<span class="line"><span>    for i in range(varyNum):</span></span>
<span class="line"><span>        p1, p2 = random.choices(list(range(1,len(gene.data)-2)), k=2)</span></span>
<span class="line"><span>        newGene = gene.data.copy()</span></span>
<span class="line"><span>        newGene[p1], newGene[p2] = newGene[p2], newGene[p1] # 交换</span></span>
<span class="line"><span>        variedGenes.append(Gene(data=newGene.copy()))</span></span>
<span class="line"><span>    key = lambda gene: gene.fit</span></span>
<span class="line"><span>    variedGenes.sort(reverse=True, key=key)</span></span>
<span class="line"><span>    return variedGenes[0]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 变异</span></span>
<span class="line"><span>def vary(genes):</span></span>
<span class="line"><span>    for index, gene in enumerate(genes):</span></span>
<span class="line"><span>        # 精英主义，保留前三十</span></span>
<span class="line"><span>        if index &lt; 30:</span></span>
<span class="line"><span>            continue</span></span>
<span class="line"><span>        if random.random() &lt; VARY:</span></span>
<span class="line"><span>            genes[index] = varyOne(gene)</span></span>
<span class="line"><span>    return genes</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot; :</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    geneNum = 100</span></span>
<span class="line"><span>    generationNum = 3000  # 迭代次数</span></span>
<span class="line"><span>    genes = getRandomGenes(geneNum) # 初始种群</span></span>
<span class="line"><span>    # 迭代</span></span>
<span class="line"><span>    for i in tqdm(range(generationNum)):</span></span>
<span class="line"><span>        updateChooseProb(genes)</span></span>
<span class="line"><span>        # sumProb = getSumProb(genes)</span></span>
<span class="line"><span>        chosenGenes = choose(deepcopy(genes))   # 选择</span></span>
<span class="line"><span>        crossedGenes = cross(chosenGenes)   # 交叉</span></span>
<span class="line"><span>        genes = mergeGenes(genes, crossedGenes) # 复制交叉至子代种群</span></span>
<span class="line"><span>        genes = vary(genes) # under construction</span></span>
<span class="line"><span>    # sort genes with respect to chooseProb</span></span>
<span class="line"><span>    key = lambda gene: gene.fit</span></span>
<span class="line"><span>    genes.sort(reverse=True, key=key)   # 以fit对种群排序</span></span>
<span class="line"><span>    print(&#39;\\r\\n&#39;)</span></span>
<span class="line"><span>    print(&#39;data:&#39;, genes[0].data)</span></span>
<span class="line"><span>    print(&#39;fit:&#39;, genes[0].fit)</span></span>
<span class="line"><span>    print(f&#39;从{start}到出发&#39;)</span></span>
<span class="line"><span>    for i in genes[0].giggity:</span></span>
<span class="line"><span>        for j in i:</span></span>
<span class="line"><span>            if j[0] != &#39;到达&#39;:</span></span>
<span class="line"><span>                index = take_out.index(j[1])</span></span>
<span class="line"><span>                print(f&#39;{j[0]}:任务编号{index}&#39;)</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                print(f&#39;{j[0]}:{j[1]}&#39;)</span></span></code></pre></div><h3 id="结果" tabindex="-1">结果 <a class="header-anchor" href="#结果" aria-label="Permalink to &quot;结果&quot;">​</a></h3><p>可以得到整个任务的最优解：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data: [4, 12, 35, 29, 11, 11, 6, 6, 7, 5, 10, 14, 9, 0, 8, 8, 8, 8, 8, 13, 14, 14, 22, 22, 40, 40, 27, 25, 18, 36, 36, 36, 36, 36, 36, 32]</span></span>
<span class="line"><span>fit: 0.008130081300813009</span></span>
<span class="line"><span>从4到出发</span></span>
<span class="line"><span>到达:4</span></span>
<span class="line"><span>装货:任务编号0</span></span>
<span class="line"><span>到达:12</span></span>
<span class="line"><span>装货:任务编号13</span></span>
<span class="line"><span>到达:35</span></span>
<span class="line"><span>装货:任务编号17</span></span>
<span class="line"><span>到达:29</span></span>
<span class="line"><span>装货:任务编号16</span></span>
<span class="line"><span>到达:11</span></span>
<span class="line"><span>装货:任务编号5</span></span>
<span class="line"><span>装货:任务编号12</span></span>
<span class="line"><span>到达:6</span></span>
<span class="line"><span>装货:任务编号6</span></span>
<span class="line"><span>装货:任务编号6</span></span>
<span class="line"><span>到达:7</span></span>
<span class="line"><span>装货:任务编号8</span></span>
<span class="line"><span>到达:5</span></span>
<span class="line"><span>装货:任务编号1</span></span>
<span class="line"><span>到达:10</span></span>
<span class="line"><span>装货:任务编号11</span></span>
<span class="line"><span>到达:14</span></span>
<span class="line"><span>装货:任务编号15</span></span>
<span class="line"><span>卸货:任务编号5</span></span>
<span class="line"><span>卸货:任务编号1</span></span>
<span class="line"><span>到达:9</span></span>
<span class="line"><span>装货:任务编号10</span></span>
<span class="line"><span>到达:0</span></span>
<span class="line"><span>卸货:任务编号0</span></span>
<span class="line"><span>到达:8</span></span>
<span class="line"><span>装货:任务编号9</span></span>
<span class="line"><span>卸货:任务编号6</span></span>
<span class="line"><span>卸货:任务编号6</span></span>
<span class="line"><span>卸货:任务编号8</span></span>
<span class="line"><span>卸货:任务编号10</span></span>
<span class="line"><span>到达:13</span></span>
<span class="line"><span>装货:任务编号14</span></span>
<span class="line"><span>到达:22</span></span>
<span class="line"><span>卸货:任务编号12</span></span>
<span class="line"><span>卸货:任务编号11</span></span>
<span class="line"><span>到达:40</span></span>
<span class="line"><span>装货:任务编号4</span></span>
<span class="line"><span>卸货:任务编号9</span></span>
<span class="line"><span>到达:27</span></span>
<span class="line"><span>卸货:任务编号4</span></span>
<span class="line"><span>到达:25</span></span>
<span class="line"><span>装货:任务编号3</span></span>
<span class="line"><span>到达:18</span></span>
<span class="line"><span>装货:任务编号2</span></span>
<span class="line"><span>到达:36</span></span>
<span class="line"><span>卸货:任务编号13</span></span>
<span class="line"><span>卸货:任务编号17</span></span>
<span class="line"><span>卸货:任务编号16</span></span>
<span class="line"><span>卸货:任务编号15</span></span>
<span class="line"><span>卸货:任务编号14</span></span>
<span class="line"><span>卸货:任务编号3</span></span>
<span class="line"><span>到达:32</span></span>
<span class="line"><span>卸货:任务编号2</span></span></code></pre></div><h3 id="最优性比较" tabindex="-1">最优性比较 <a class="header-anchor" href="#最优性比较" aria-label="Permalink to &quot;最优性比较&quot;">​</a></h3><p>为了比较遗传算法的优化性能，我们将任务列表删减为<strong>动态规划</strong>得出的最优解，比较两种算法的结果差异：</p><p><strong>遗传算法</strong></p><p>省略了出发站点4</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>data: [11, 6, 6, 5, 9, 8, 8, 8, 14, 14]</span></span>
<span class="line"><span>fit: 0.03571428571428571</span></span>
<span class="line"><span>从4到出发</span></span>
<span class="line"><span>到达:11</span></span>
<span class="line"><span>装货:任务编号1</span></span>
<span class="line"><span>到达:6</span></span>
<span class="line"><span>装货:任务编号2</span></span>
<span class="line"><span>装货:任务编号2</span></span>
<span class="line"><span>到达:5</span></span>
<span class="line"><span>装货:任务编号0</span></span>
<span class="line"><span>到达:9</span></span>
<span class="line"><span>装货:任务编号4</span></span>
<span class="line"><span>到达:8</span></span>
<span class="line"><span>卸货:任务编号2</span></span>
<span class="line"><span>卸货:任务编号2</span></span>
<span class="line"><span>卸货:任务编号4</span></span>
<span class="line"><span>到达:14</span></span>
<span class="line"><span>卸货:任务编号1</span></span>
<span class="line"><span>卸货:任务编号0</span></span></code></pre></div><p><strong>动态规划</strong></p><p>看path</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>***************opt*******************</span></span>
<span class="line"><span>{&#39;time&#39;: 58.97901049475262, &#39;estimatedtime&#39;: 60.7242975447131, &#39;stage&#39;: 5, &#39;ReceviedOrder&#39;: {1, 5, 6, 7, 10}, &#39;active&#39;: True, &#39;path&#39;: [4, 11, 6, 6, 5, 9, 8, 8, 8, 14, 14]}</span></span>
<span class="line"><span>fullpath:[4, 12, 13, 14, 15, 16, 11, 6, 5, 9, 8, 9, 14]</span></span></code></pre></div><h3 id="结论" tabindex="-1">结论 <a class="header-anchor" href="#结论" aria-label="Permalink to &quot;结论&quot;">​</a></h3><p>显然两种算法小规模的解一致，但动态规划算法求解受到规模约束，而遗传算法不会。因此遗传算法更优越。</p><h2 id="禁忌搜索" tabindex="-1">禁忌搜索 <a class="header-anchor" href="#禁忌搜索" aria-label="Permalink to &quot;禁忌搜索&quot;">​</a></h2><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Function: Tabu Search Demo</span></span>
<span class="line"><span>import random</span></span>
<span class="line"><span>import numpy as np</span></span>
<span class="line"><span>import graph_process</span></span>
<span class="line"><span>from tqdm import tqdm</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 输入条件</span></span>
<span class="line"><span># input condition</span></span>
<span class="line"><span>start = 4</span></span>
<span class="line"><span>take_out = [</span></span>
<span class="line"><span>    [4,0],</span></span>
<span class="line"><span>    [5,14],</span></span>
<span class="line"><span>    [18,32],</span></span>
<span class="line"><span>    [25,36],</span></span>
<span class="line"><span>    [40,27],</span></span>
<span class="line"><span>    [11,14],</span></span>
<span class="line"><span>    [6,8],</span></span>
<span class="line"><span>    [6,8],</span></span>
<span class="line"><span>    [7,8],</span></span>
<span class="line"><span>    [8,40],</span></span>
<span class="line"><span>    [9,8],</span></span>
<span class="line"><span>    [10,22],</span></span>
<span class="line"><span>    [11,22],</span></span>
<span class="line"><span>    [12,36],</span></span>
<span class="line"><span>    [13,36],</span></span>
<span class="line"><span>    [14,36],</span></span>
<span class="line"><span>    [29,36],</span></span>
<span class="line"><span>    [35,36],</span></span>
<span class="line"><span>]</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># setting parameters</span></span>
<span class="line"><span>length_tabulist = 40</span></span>
<span class="line"><span>candidate_number = 300</span></span>
<span class="line"><span>loop_times = 3000</span></span>
<span class="line"><span>tabu_list = []</span></span>
<span class="line"><span>solution_record = []</span></span>
<span class="line"><span>originGraph ,optimizedGraph = graph_process.read_graph(&#39;original_graph.xlsx&#39;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>class Solution:</span></span>
<span class="line"><span>    def __init__(self, data = None , action = None):</span></span>
<span class="line"><span>        if data is None:</span></span>
<span class="line"><span>            self.data = self._get_original_salution()</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            self.data = data</span></span>
<span class="line"><span>        self.cost = self.get_cost()</span></span>
<span class="line"><span>        self.action = action</span></span>
<span class="line"><span>        self.giggity = [] #记录操作流程</span></span>
<span class="line"><span>    def get_cost(self):</span></span>
<span class="line"><span>        cost = 0</span></span>
<span class="line"><span>        order_list = take_out.copy()</span></span>
<span class="line"><span>        get_order = []</span></span>
<span class="line"><span>        self.giggity = []</span></span>
<span class="line"><span>        for i in self.data:</span></span>
<span class="line"><span>            tempLog = []</span></span>
<span class="line"><span>            tempLog.append([&quot;到达&quot;, i])</span></span>
<span class="line"><span>            poplist = []</span></span>
<span class="line"><span>            for j in range(len(order_list)):</span></span>
<span class="line"><span>                if i == order_list[j][0]:</span></span>
<span class="line"><span>                    poplist.append(j)</span></span>
<span class="line"><span>                    tempLog.append([&quot;装货&quot;, order_list[j]])</span></span>
<span class="line"><span>            for j in range(len(poplist)):</span></span>
<span class="line"><span>                get_order.append(order_list.pop(poplist[j]-j))</span></span>
<span class="line"><span>            poplist.clear()</span></span>
<span class="line"><span>            for j in range(len(get_order)):</span></span>
<span class="line"><span>                if i == get_order[j][1]:</span></span>
<span class="line"><span>                    poplist.append(j)</span></span>
<span class="line"><span>                    tempLog.append([&quot;卸货&quot;, get_order[j]])</span></span>
<span class="line"><span>            for j in range(len(poplist)):</span></span>
<span class="line"><span>                get_order.pop(poplist[j]-j)</span></span>
<span class="line"><span>            if len(tempLog) != 1:</span></span>
<span class="line"><span>                self.giggity.append(tempLog)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        if len(order_list) != 0:</span></span>
<span class="line"><span>            self.giggity = &#39;error&#39;</span></span>
<span class="line"><span>        elif len(get_order) != 0:</span></span>
<span class="line"><span>            cost += np.inf</span></span>
<span class="line"><span>            self.giggity = &#39;error&#39;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        dist = []  # from this to next</span></span>
<span class="line"><span>        # calculate distance</span></span>
<span class="line"><span>        i = 1</span></span>
<span class="line"><span>        while i &lt; len(self.data):</span></span>
<span class="line"><span>            v1 = self.data[i - 1]</span></span>
<span class="line"><span>            v2 = self.data[i]</span></span>
<span class="line"><span>            dist.append(optimizedGraph[v1][v2])</span></span>
<span class="line"><span>            i += 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        # distance cost</span></span>
<span class="line"><span>        distCost = sum(dist)+optimizedGraph[start][self.data[0]]</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        cost += distCost</span></span>
<span class="line"><span>        return cost</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def _get_original_salution(self):</span></span>
<span class="line"><span>        data = []</span></span>
<span class="line"><span>        for i in take_out:</span></span>
<span class="line"><span>            data.append(i[0])</span></span>
<span class="line"><span>            data.append(i[1])</span></span>
<span class="line"><span>        random.shuffle(data)</span></span>
<span class="line"><span>        return data</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>    def reverse(self, a, b):</span></span>
<span class="line"><span>        # 翻转索引a到b-1之间的城市</span></span>
<span class="line"><span>        self.data = self.data[:a] + self.data[a:b][::-1] + self.data[b:]</span></span>
<span class="line"><span>        return (0, a, b)</span></span>
<span class="line"><span>    def swap(self, a, b):</span></span>
<span class="line"><span>        # 交换两个城市的位置</span></span>
<span class="line"><span>        self.data[a], self.data[b] = self.data[b], self.data[a]</span></span>
<span class="line"><span>        return (1, a, b)</span></span>
<span class="line"><span>    def move(self, a, b):</span></span>
<span class="line"><span>        # 将城市a移动到城市b之后</span></span>
<span class="line"><span>        self.data.insert(b+1, self.data.pop(a))</span></span>
<span class="line"><span>        return (2, a, b)</span></span>
<span class="line"><span>    def get_neighborhood(self):</span></span>
<span class="line"><span>        # 随机选择两个城市</span></span>
<span class="line"><span>        a, b = random.sample(range(len(self.data)), 2)</span></span>
<span class="line"><span>        option = random.randint(0, 2)</span></span>
<span class="line"><span>        return (option, a, b)</span></span>
<span class="line"><span>    def generate_candidate(self , action):</span></span>
<span class="line"><span>        # 生成候选解</span></span>
<span class="line"><span>        option , a, b = action</span></span>
<span class="line"><span>        if option == 0:</span></span>
<span class="line"><span>            self.reverse(a, b)</span></span>
<span class="line"><span>        elif option == 1:</span></span>
<span class="line"><span>            self.swap(a, b)</span></span>
<span class="line"><span>        else:</span></span>
<span class="line"><span>            self.move(a, b)</span></span>
<span class="line"><span>        self.action = action</span></span>
<span class="line"><span>        self.cost = self.get_cost()</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>def optimize_solution(best_solution:Solution):</span></span>
<span class="line"><span>    global tabu_list ,solution_record</span></span>
<span class="line"><span>    current_solution = best_solution</span></span>
<span class="line"><span>    posible_solution = [current_solution]</span></span>
<span class="line"><span>    if len(tabu_list) &gt; length_tabulist:</span></span>
<span class="line"><span>        for i in range(int(len(tabu_list)/5)):</span></span>
<span class="line"><span>            tabu_list.pop(i)</span></span>
<span class="line"><span>    for _ in range(candidate_number):</span></span>
<span class="line"><span>        new_solution = Solution(current_solution.data)</span></span>
<span class="line"><span>        neighbor = new_solution.get_neighborhood()</span></span>
<span class="line"><span>        if neighbor not in tabu_list:</span></span>
<span class="line"><span>            new_solution.generate_candidate(neighbor)</span></span>
<span class="line"><span>            if new_solution.cost &lt; current_solution.cost:</span></span>
<span class="line"><span>                current_solution = new_solution</span></span>
<span class="line"><span>                posible_solution.append(current_solution)</span></span>
<span class="line"><span>            continue</span></span>
<span class="line"><span>    # choose the best solution form the posible_solution</span></span>
<span class="line"><span>    choose_solution = min(posible_solution, key=lambda x: x.cost)</span></span>
<span class="line"><span>    if choose_solution.action is not None:</span></span>
<span class="line"><span>        tabu_list.append(choose_solution.action)</span></span>
<span class="line"><span>        solution_record.append(choose_solution)</span></span>
<span class="line"><span>    else:</span></span>
<span class="line"><span>        print(&#39;No neighbor found&#39;)</span></span>
<span class="line"><span>    return choose_solution</span></span>
<span class="line"><span></span></span>
<span class="line"><span>if __name__ == &quot;__main__&quot; :</span></span>
<span class="line"><span>    best_solution =Solution()</span></span>
<span class="line"><span>    for i in tqdm(range(loop_times)):</span></span>
<span class="line"><span>        best_solution = optimize_solution(best_solution)</span></span>
<span class="line"><span>    print(best_solution.data)</span></span>
<span class="line"><span>    print(best_solution.cost)</span></span>
<span class="line"><span>    print(best_solution.giggity)</span></span>
<span class="line"><span>    for i in best_solution.giggity:</span></span>
<span class="line"><span>        for j in i:</span></span>
<span class="line"><span>            if j[0] != &#39;到达&#39;:</span></span>
<span class="line"><span>                index = take_out.index(j[1])</span></span>
<span class="line"><span>                print(f&#39;{j[0]}:任务编号{index}&#39;)</span></span>
<span class="line"><span>            else:</span></span>
<span class="line"><span>                print(f&#39;{j[0]}:{j[1]}&#39;)</span></span></code></pre></div><p>得到结果：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>Tabu Search Progress: 100%|██████████| 30000/30000 [00:44&lt;00:00, 679.04it/s]</span></span>
<span class="line"><span>Best Solution Data: [22, 25, 11, 36, 9, 12, 10, 8, 18, 8, 6, 11, 5, 35, 7, 13, 40, 36, 8, 14, 32, 4, 8, 36, 36, 27, 36, 14, 29, 22, 14, 40, 36, 0]</span></span>
<span class="line"><span>Best Solution Cost: 390.0</span></span>
<span class="line"><span>Operation Log:</span></span>
<span class="line"><span>Total Time Taken: 0:00:44.206928</span></span></code></pre></div><p>可见优化后总路程为294</p><p>对比遗传算法，结果并不能更好，而且效率也不够高。</p><h2 id="完整代码" tabindex="-1">完整代码 <a class="header-anchor" href="#完整代码" aria-label="Permalink to &quot;完整代码&quot;">​</a></h2><p>BFS,DFS,A*,DIJKSTRA,UNICOST算法完整代码：</p><p><a href="https://github.com/57Darling02/SearchMethod/blob/main/SearchMethods_demo1.py" target="_blank" rel="noreferrer">SearchMethod/SearchMethods_demo1.py at main · 57Darling02/SearchMethod (github.com)</a></p><p>TSP启发算法:</p><p><a href="https://github.com/57Darling02/DeliveryKing/blob/main/Q1.py" target="_blank" rel="noreferrer">DeliveryKing/Q1.py at main · 57Darling02/DeliveryKing (github.com)</a></p><p>动态规划：</p><p><a href="https://github.com/57Darling02/DeliveryKing/blob/main/Q2.py" target="_blank" rel="noreferrer">DeliveryKing/Q2.py at main · 57Darling02/DeliveryKing (github.com)</a></p><p>GA算法：</p><p><a href="https://github.com/57Darling02/SearchMethod/blob/main/GA_Demo2.py" target="_blank" rel="noreferrer">SearchMethod/GA_Demo2.py at main · 57Darling02/SearchMethod (github.com)</a></p><p>更多数据结构与算法：（多语言实现）</p><p><a href="https://github.com/TheAlgorithms" target="_blank" rel="noreferrer">The Algorithms (github.com)</a></p>`,146)]))}const g=s(l,[["render",t]]);export{h as __pageData,g as default};
