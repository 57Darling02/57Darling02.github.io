import{_ as n,c as a,b as l,g as i}from"./chunks/framework.WHv14AEj.js";const d=JSON.parse('{"title":"Searchmethod (一)","description":"","frontmatter":{"title":"Searchmethod (一)","date":"2024-09-23T21:12:48.000Z","copyright":true,"tags":"Learn 优化算法"},"headers":[],"relativePath":"posts/Searchmethod.md","filePath":"posts/Searchmethod.md"}'),e={name:"posts/Searchmethod.md"};function p(t,s,r,o,c,h){return l(),a("div",null,s[0]||(s[0]=[i(`<h1 id="searchmethod-一" tabindex="-1">Searchmethod（一） <a class="header-anchor" href="#searchmethod-一" aria-label="Permalink to &quot;Searchmethod（一）&quot;">​</a></h1><p>​ Record and summary the search methods.</p><p>​ References are from CSDN</p><h3 id="无信息搜索方法-blind-search-methods" tabindex="-1">无信息搜索方法（Blind Search Methods） <a class="header-anchor" href="#无信息搜索方法-blind-search-methods" aria-label="Permalink to &quot;无信息搜索方法（Blind Search Methods）&quot;">​</a></h3><h4 id="_1-宽度优先搜索-breadth-first-search-bfs" tabindex="-1">1. <strong>宽度优先搜索（Breadth-First Search, BFS）</strong> <a class="header-anchor" href="#_1-宽度优先搜索-breadth-first-search-bfs" aria-label="Permalink to &quot;1. **宽度优先搜索（Breadth-First Search, BFS）**&quot;">​</a></h4><ul><li><p><strong>基本原理</strong>：逐层扩展节点，从起点开始，先探索所有离起点最近的节点，再探索更远的节点。目的是系统地展开并检查图中的所有节点，以找寻结果。换句话说，它并不考虑结果的可能位置，彻底地搜索整张图，直到找到结果为止。Dijkstra<a href="https://baike.baidu.com/item/%E5%8D%95%E6%BA%90%E6%9C%80%E7%9F%AD%E8%B7%AF%E5%BE%84/6975204?fromModule=lemma_inlink" target="_blank" rel="noreferrer">单源最短路径</a>算法和Prim<a href="https://baike.baidu.com/item/%E6%9C%80%E5%B0%8F%E7%94%9F%E6%88%90%E6%A0%91?fromModule=lemma_inlink" target="_blank" rel="noreferrer">最小生成树</a>算法都采用了和宽度优先搜索类似的思想。</p></li><li><p><strong>方法流程</strong>：</p><ol><li>使用队列保存待探索的节点。</li><li>每次从队列中取出一个节点，扩展其所有子节点，将未访问过的子节点加入队列。</li><li>直到找到目标节点或队列为空。</li></ol></li><li><p><strong>应用场景</strong>：适用于寻找最短路径的无权图。</p></li><li><p><strong>优点</strong>：找到最短路径（对于无权图）。</p></li><li><p><strong>缺点</strong>：需要大量内存，复杂度为O(b^d)，其中b为分支因子，d为深度。</p></li><li><p>示例伪代码：</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int BFS(Node start, Node target) {</span></span>
<span class="line"><span>    入队(初始状态);</span></span>
<span class="line"><span>    visited[初始状态] = true;</span></span>
<span class="line"><span>    while(!空队) {</span></span>
<span class="line"><span>        for() { // 状态转换</span></span>
<span class="line"><span>            Node node = 队首元素;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>            对node的处理，生成新node状态;</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>            if (visited[node] == true)</span></span>
<span class="line"><span>                continue;</span></span>
<span class="line"><span>            if (node == target) {</span></span>
<span class="line"><span>                输出答案;</span></span>
<span class="line"><span>                return 0;</span></span>
<span class="line"><span>            }</span></span>
<span class="line"><span>            v[node] = true;</span></span>
<span class="line"><span>            入队(node);</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    出队();</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    </span></span>
<span class="line"><span>}</span></span></code></pre></div></li></ul><h4 id="_2-一致代价搜索-uniform-cost-search-ucs" tabindex="-1">2. <strong>一致代价搜索（Uniform Cost Search, UCS）</strong> <a class="header-anchor" href="#_2-一致代价搜索-uniform-cost-search-ucs" aria-label="Permalink to &quot;2. **一致代价搜索（Uniform Cost Search, UCS）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：扩展代价最小的节点，确保以最低代价到达目标节点。一致代价搜索总是扩展路径消耗最小的节点N。N点的路径消耗等于前一节点N-1的路径消耗加上N-1到N节点的路径消耗。</li><li><strong>方法流程</strong>： <ol><li>使用优先队列保存待扩展的节点，按路径代价排序。</li><li>每次取出代价最小的节点扩展，更新路径代价。</li><li>找到目标节点时终止。</li></ol></li><li><strong>应用场景</strong>：用于加权图寻找最低代价路径。</li><li><strong>优点</strong>：保证找到最低代价路径。</li><li><strong>缺点</strong>：若所有路径代价较相近，可能退化为BFS，耗时长。</li></ul><h4 id="_3-深度优先搜索-depth-first-search-dfs" tabindex="-1">3. <strong>深度优先搜索（Depth-First Search, DFS）</strong> <a class="header-anchor" href="#_3-深度优先搜索-depth-first-search-dfs" aria-label="Permalink to &quot;3. **深度优先搜索（Depth-First Search, DFS）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：沿着一条路径深入探索，直到不能继续为止，再回溯探索其他路径。深度优先搜索是图论中的经典算法，利用深度优先搜索算法可以产生目标图的相应拓扑排序表，利用拓扑排序表可以方便的解决很多相关的图论问题，如最大路径问题等等。一般用栈数据结构来辅助实现DFS算法。根据深度优先搜索的特点，采用递归函数实现比较简单。但也可以不采用递归.</li><li><strong>方法流程</strong>： <ol><li>使用栈保存待探索的节点。</li><li>每次从栈顶取出一个节点，扩展其子节点并依次压入栈中。</li><li>直到找到目标节点或栈为空。</li></ol></li><li><strong>应用场景</strong>：适用于解空间大且解较深的场景。(玩的galgame游戏，攻略了某一个线，退回最近那个节点攻略下一个)</li><li><strong>优点</strong>：内存消耗小，适合大规模问题。</li><li><strong>缺点</strong>：可能陷入死循环或长路径上，无法保证找到最短路径。</li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int dxy[4][2]={//模拟上下左右四个方向</span></span>
<span class="line"><span>	-1,0,//向上（x减一，y不变）</span></span>
<span class="line"><span>	1, 0,//向下</span></span>
<span class="line"><span>	0,-1,//向左</span></span>
<span class="line"><span>	0, 1//向右</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>void dfs(int x0,int y0)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	if(x0,y0满足某种条件)//找到目标点</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		//执行操作如输出路径等</span></span>
<span class="line"><span>		return；</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>	for(int i=0;i&lt;4;i++)//遍历四个方向每一个分支，对每一个分支都进行深度搜索</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		int dx=dxy[i][0];//移动后的横坐标</span></span>
<span class="line"><span>		int dy=dxy[i][1];//移动后的纵坐标</span></span>
<span class="line"><span>		if(坐标越界||遇到障碍物||...)//不满足条件</span></span>
<span class="line"><span>			continue;</span></span>
<span class="line"><span>		//执行操作</span></span>
<span class="line"><span>		dfs(dx,dy)//深度遍历</span></span>
<span class="line"><span>		//遍历结束恢复操作</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_4-深度受限搜索-depth-limited-search-dls" tabindex="-1">4. <strong>深度受限搜索（Depth-Limited Search, DLS）</strong> <a class="header-anchor" href="#_4-深度受限搜索-depth-limited-search-dls" aria-label="Permalink to &quot;4. **深度受限搜索（Depth-Limited Search, DLS）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：与DFS类似，但限定搜索深度，避免陷入无穷循环。</li><li><strong>方法流程</strong>：设置一个最大深度，DFS只能深入到该深度，超出时回溯。</li><li><strong>应用场景</strong>：适用于有循环或需要限制搜索深度的场景。</li><li><strong>优点</strong>：控制递归深度，避免死循环。</li><li><strong>缺点</strong>：可能遗漏更深处的解，若深度设得不够大。</li></ul><h4 id="_5-迭代加深搜索-iterative-deepening-depth-first-search-iddfs" tabindex="-1">5. <strong>迭代加深搜索（Iterative Deepening Depth-First Search, IDDFS）</strong> <a class="header-anchor" href="#_5-迭代加深搜索-iterative-deepening-depth-first-search-iddfs" aria-label="Permalink to &quot;5. **迭代加深搜索（Iterative Deepening Depth-First Search, IDDFS）**&quot;">​</a></h4><p>reference from oi wiki</p><ul><li><p><strong>基本原理</strong>：逐渐增加深度限制，重复执行DLS，直到找到解。</p></li><li><p><strong>方法流程</strong>：</p><ol><li>设定初始深度限制，执行DLS。</li><li>若未找到解，增大深度限制并重复步骤1。</li></ol></li><li><p><strong>应用场景</strong>：适用于大规模问题且解的深度未知。</p></li><li><p><strong>优点</strong>：结合了DFS的低内存需求和BFS的最优解保障。</p></li><li><p><strong>缺点</strong>：重复搜索导致效率降低，但实践中影响不大。</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>IDDFS(u,d)</span></span>
<span class="line"><span>    if d&gt;limit</span></span>
<span class="line"><span>        return</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>        for each edge (u,v)</span></span>
<span class="line"><span>            IDDFS(v,d+1)</span></span>
<span class="line"><span>return</span></span></code></pre></div></li></ul><h4 id="_6-双向搜索-bidirectional-search" tabindex="-1">6. <strong>双向搜索（Bidirectional Search）</strong> <a class="header-anchor" href="#_6-双向搜索-bidirectional-search" aria-label="Permalink to &quot;6. **双向搜索（Bidirectional Search）**&quot;">​</a></h4><p>reference from oi wiki</p><ul><li><p><strong>基本原理</strong>：双向同时搜索的基本思路是从状态图上的起点和终点同时开始进行 <a href="https://oi-wiki.org/search/bfs/" target="_blank" rel="noreferrer">广搜</a> 或 <a href="https://oi-wiki.org/search/dfs/" target="_blank" rel="noreferrer">深搜</a>。</p><p>如果发现搜索的两端相遇了，那么可以认为是获得了可行解。</p></li><li><p><strong>方法流程</strong>：</p><ol><li>从起点和终点分别进行BFS。</li><li>当两边搜索的节点相遇时，路径找到。</li></ol></li><li><p><strong>应用场景</strong>：适用于有明确目标的图搜索问题。</p></li><li><p><strong>优点</strong>：理论上可将搜索复杂度减半。</p></li><li><p><strong>缺点</strong>：需要同时维护两个搜索前沿，且在复杂图中难以实现。</p></li></ul><h3 id="有信息-启发式-搜索方法-informed-search-methods" tabindex="-1">有信息（启发式）搜索方法（Informed Search Methods） <a class="header-anchor" href="#有信息-启发式-搜索方法-informed-search-methods" aria-label="Permalink to &quot;有信息（启发式）搜索方法（Informed Search Methods）&quot;">​</a></h3><h4 id="_7-贪婪最佳优先搜索-greedy-best-first-search" tabindex="-1">7. <strong>贪婪最佳优先搜索（Greedy Best-First Search）</strong> <a class="header-anchor" href="#_7-贪婪最佳优先搜索-greedy-best-first-search" aria-label="Permalink to &quot;7. **贪婪最佳优先搜索（Greedy Best-First Search）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：优先扩展估计距离目标最近的节点，使用启发式函数h(n)。</li><li><strong>方法流程</strong>： <ol><li>使用优先队列保存待扩展节点，按h(n)值排序。</li><li>每次扩展h(n)最小的节点，直到找到目标。</li></ol></li><li><strong>应用场景</strong>：适用于路径代价无关或只关心最快找到解的场景。</li><li><strong>优点</strong>：较快找到目标，内存消耗小。</li><li><strong>缺点</strong>：不保证找到最优解，可能陷入局部最优。</li></ul><h4 id="_8-a-搜索-a-search" tabindex="-1">8. <em><em>A*搜索（A</em> Search）</em>* <a class="header-anchor" href="#_8-a-搜索-a-search" aria-label="Permalink to &quot;8. **A\\*搜索（A* Search）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：结合代价和启发式信息，优先扩展f(n) = g(n) + h(n)最小的节点，其中g(n)是从起点到当前节点的代价，h(n)是启发式估计。</li><li><strong>方法流程</strong>： <ol><li>使用优先队列按f(n)值排序节点。</li><li>每次扩展f(n)最小的节点，更新路径。</li><li>找到目标节点时停止。</li></ol></li><li><strong>应用场景</strong>：适用于路径代价重要、启发式信息可靠的场景。</li><li><strong>优点</strong>：找到最优解，若启发式函数h(n)是可接受的（低于或等于实际代价）。</li><li><strong>缺点</strong>：内存和时间开销大，受启发式函数的影响较大。</li></ul><h4 id="_9-递归最佳优先搜索-recursive-best-first-search-rbfs" tabindex="-1">9. <strong>递归最佳优先搜索（Recursive Best-First Search, RBFS）</strong> <a class="header-anchor" href="#_9-递归最佳优先搜索-recursive-best-first-search-rbfs" aria-label="Permalink to &quot;9. **递归最佳优先搜索（Recursive Best-First Search, RBFS）**&quot;">​</a></h4><ul><li><p><strong>基本原理</strong>：递归执行贪婪搜索，通过回溯控制递归深度。</p></li><li><p><strong>方法流程</strong>：类似A*，但采用递归方式，每次扩展时根据当前f值进行回溯调整。</p><ul><li>记录当前节点的祖先可得到的最佳可替换路径的f值。</li><li>如果当前的f值超过了这个限制，则递归将转回到替换路径。</li><li>向上回溯改变f值到它的孩子的最佳f 值</li><li>重复扩展这个上个节点，因为仍有可能存在较优解。 依旧上图上例子</li></ul></li><li><p><strong>应用场景</strong>：适用于内存有限的场景。</p></li><li><p><strong>优点</strong>：内存需求低于A*，仍能找到最优解。</p></li><li><p><strong>缺点</strong>：搜索路径冗长时效率较低,时间复杂度取决于启发函数h的精度和最佳路劲变换的次数。</p></li></ul><h3 id="局部搜索算法-local-search-algorithms" tabindex="-1">局部搜索算法（Local Search Algorithms） <a class="header-anchor" href="#局部搜索算法-local-search-algorithms" aria-label="Permalink to &quot;局部搜索算法（Local Search Algorithms）&quot;">​</a></h3><h4 id="_10-爬山法-hill-climbing" tabindex="-1">10. <strong>爬山法（Hill Climbing）</strong> <a class="header-anchor" href="#_10-爬山法-hill-climbing" aria-label="Permalink to &quot;10. **爬山法（Hill Climbing）**&quot;">​</a></h4><ul><li><p><strong>基本原理</strong>：从当前状态向代价最小的邻居状态移动，期望找到全局最优解，其本质上是梯度下降法。</p></li><li><p><strong>方法流程</strong>：</p><ol><li>每次从当前的节点开始，与周围的邻接点进行比较：</li><li>若当前节点是最大的，那么返回当前节点，作为最大值</li><li>若当前节点是最小的，就用最高的邻接点替换当前节点，从而实现向山峰的高处攀爬的目的</li></ol><p>如此循环往复，直到达到最高点为止。</p></li><li><p><strong>应用场景</strong>：适用于解空间较大但全局信息不完全的问题。</p></li><li><p><strong>优点</strong>：简单易实现，内存需求低。</p></li><li><p><strong>缺点</strong>：</p><ul><li>局部最大，即某个节点会比周围任何一个邻居都高，但只是局部最优解，并非全局最优解。</li><li>高地问题：搜索一旦到达高地，就无法确定搜索最佳方向，会产生随机走动，使得搜索效率降低</li><li>山脊问题：搜索可能会在山脊的两面来回震荡，前进步伐很小</li></ul></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>int getPos(double x) {//比较答案并获取新坐标点</span></span>
<span class="line"><span>    int pos;//新坐标点</span></span>
<span class="line"><span>    double res = -INF;</span></span>
<span class="line"><span>    for (int i = 1; i &lt;= n; i++) {</span></span>
<span class="line"><span>        double newRes = getRes(x, node[i]);//获取新状态答案</span></span>
<span class="line"><span>        if (newRes &gt; res) { //比较答案</span></span>
<span class="line"><span>            res = newRes; //更新结果</span></span>
<span class="line"><span>            pos = i; //记录新坐标点</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>    return pos;</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>void HC(double &amp;x,double &amp;y) {</span></span>
<span class="line"><span>    double T = 1;</span></span>
<span class="line"><span>    while (T &gt; EPS) {</span></span>
<span class="line"><span>        int pos = getPos(x);//获取下一状态的坐标</span></span>
<span class="line"><span>        sta = sta + (node[pos] - x) * T;//转移x状态</span></span>
<span class="line"><span>        T *= 0.96;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_11-模拟退火法-simulated-annealing" tabindex="-1">11. <strong>模拟退火法（Simulated Annealing）</strong> <a class="header-anchor" href="#_11-模拟退火法-simulated-annealing" aria-label="Permalink to &quot;11. **模拟退火法（Simulated Annealing）**&quot;">​</a></h4><ul><li><p><strong>基本原理</strong>：借鉴物理退火过程，其出发点是基于物理中固体物质的退火过程与一般的组合优化问题之间的相似性。算法允许在搜索过程中偶尔选择较差的状态，避免局部最优。</p><p>模拟退火法是一种通用的优化算法，其物理退火过程由以下三部分组成:</p><p>（1） 加温过程。其目的是增强粒子的热运动，使其偏离平衡位置。当温度足够高时，固体将熔为液体，从而消除系统原先存在的非均匀状态。</p><p>（2） 等温过程。对于与周围环境交换热量而温度不变的封闭系统，系统状态的自发变化总是朝自由能减少的方向进行的，当自由能达到最小时，系统达到平衡状态。</p><p>（3） 冷却过程。使粒子热运动减弱，系统能量下降，得到晶体结构。</p><p>加温过程相当于对算法设定初值，等温过程对应算法的Metropolis抽样过程，冷却过程对应控制参数的下降。这里能量的变化就是目标函数，我们要得到的最优解就是能量最低态。其中Metropolis准则是SA算法收敛于全局最优解的关键所在，Metropolis准则以一定的概率接受恶化解，这样就使算法跳离局部最优的陷阱。</p></li><li><p><strong>方法流程</strong>：</p><ol><li>从初始状态开始，每次根据温度参数选择下一个状态。</li><li>温度逐渐降低，减少选择较差状态的概率。</li><li>直到温度趋于零，结束搜索。</li></ol></li><li><p><strong>应用场景</strong>：适用于解空间复杂且容易陷入局部最优的场景。</p></li><li><p><strong>优点</strong>：能够跳出局部最优，理论上能找到全局最优解。</p></li><li><p><strong>缺点</strong>：需要调节温度参数，收敛速度慢。</p></li></ul><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>//目的：求系统的最小值</span></span>
<span class="line"><span>S(i):       系统在状态y时的评价函数值</span></span>
<span class="line"><span>i：　　　 　　系统当前状态</span></span>
<span class="line"><span>i + 1:　 　　系统的新状态</span></span>
<span class="line"><span>rate:       控制降温的速率</span></span>
<span class="line"><span>T0:         系统的初始温度（高温状态）</span></span>
<span class="line"><span>T_min:      温度的下限</span></span>
<span class="line"><span> </span></span>
<span class="line"><span>while (T0 &gt; T_min)</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    dE = S(i + 1) - S(i);</span></span>
<span class="line"><span>   </span></span>
<span class="line"><span>    if dE &lt; 0</span></span>
<span class="line"><span>    　　//接收从S(i)到S(i+1)的移动</span></span>
<span class="line"><span>    else if (exp(-dE / T) &gt; random(0,1))</span></span>
<span class="line"><span>    　　//接收从S(i)到S(i+1)的移动</span></span>
<span class="line"><span>    else</span></span>
<span class="line"><span>    　　//不接收从S(i)到S(i+1)的移动</span></span>
<span class="line"><span>    T0 = r * T0;        　　　　　　　　//降温退火(0 &lt; r &lt; 1 ; r越大, 降温越慢; r越小, 降温越快)</span></span>
<span class="line"><span>    i++;</span></span>
<span class="line"><span>}</span></span></code></pre></div><h4 id="_12-遗传算法-genetic-algorithm-ga" tabindex="-1">12. <strong>遗传算法（Genetic Algorithm, GA）</strong> <a class="header-anchor" href="#_12-遗传算法-genetic-algorithm-ga" aria-label="Permalink to &quot;12. **遗传算法（Genetic Algorithm, GA）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：模仿自然选择，通过选择、交叉、变异操作进化群体，期望找到最优解。</li><li><strong>方法流程</strong>： <ol><li>初始化种群。</li><li>根据适应度函数选择个体进行繁殖。</li><li>执行交叉和变异操作生成新个体。</li><li>重复进化，直到达到终止条件。</li></ol></li><li><strong>应用场景</strong>：适用于复杂的优化问题，尤其是解空间较大且无明显启发式信息的情况。</li><li><strong>优点</strong>：能处理大规模搜索空间，适应多种问题。</li><li><strong>缺点</strong>：需要大量计算资源，收敛速度受参数影响。</li></ul><h3 id="对抗搜索算法-adversarial-search-algorithms" tabindex="-1">对抗搜索算法（Adversarial Search Algorithms） <a class="header-anchor" href="#对抗搜索算法-adversarial-search-algorithms" aria-label="Permalink to &quot;对抗搜索算法（Adversarial Search Algorithms）&quot;">​</a></h3><h4 id="_13-极小极大算法-minimax-algorithm" tabindex="-1">13. <strong>极小极大算法（Minimax Algorithm）</strong> <a class="header-anchor" href="#_13-极小极大算法-minimax-algorithm" aria-label="Permalink to &quot;13. **极小极大算法（Minimax Algorithm）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：用于对抗性游戏，玩家轮流选择最大化自己得分或最小化对方得分，最终选择最大化最</li></ul><p>小可能损失的策略。</p><ul><li><strong>方法流程</strong>： <ol><li>构建决策树；</li><li>将评估函数应用于叶子结点；</li><li>自底向上计算每个结点的minimax值；</li><li>从根结点选择minimax值最大的分支，作为行动策略。</li></ol></li><li>minimax计算流程如下： <ol><li>如果节点是终止节点：应用估值函数求值；</li><li>如果节点是max节点：找到每个子节点的值，将其中最大的子节点值作为该节点的值；</li><li>如果节点时min节点：找到每个子节点的值，将其中最小的子节点值作为该节点的值。</li></ol></li><li><strong>应用场景</strong>：适用于二人对抗性游戏，如国际象棋、井字棋等。</li><li><strong>优点</strong>：能找到最优解。</li><li><strong>缺点</strong>：搜索复杂度高，树的深度和分支因子大时难以实际应用。</li></ul><h4 id="_14-α-β-搜索算法-alpha-beta-pruning" tabindex="-1">14. <strong>α-β 搜索算法（Alpha-Beta Pruning）</strong> <a class="header-anchor" href="#_14-α-β-搜索算法-alpha-beta-pruning" aria-label="Permalink to &quot;14. **α-β 搜索算法（Alpha-Beta Pruning）**&quot;">​</a></h4><ul><li><strong>基本原理</strong>：Alpha-Beta剪枝算法可加速极小化极大算法的搜索过程。在构建和搜索决策树时，每个节点除存储局面估值之外，还存储可能取值的上下界。下界即为Alpha值，上界即为Beta值。</li><li><strong>方法流程</strong>： <ol><li>在极小极大算法的基础上，引入α和β作为上下限值。</li><li>当子树的评估超出α或β时，停止扩展该子树。</li><li>继续评估其他子树。</li></ol></li><li><strong>应用场景</strong>：同样适用于二人对抗性游戏。</li><li><strong>优点</strong>：大大减少计算量，提升效率。</li><li><strong>缺点</strong>：仍有较高的时间复杂度，适用范围受限。</li></ul><h3 id="局部择优搜索与全局择优搜索的相同处与区别各是什么" tabindex="-1">局部择优搜索与全局择优搜索的相同处与区别各是什么？ <a class="header-anchor" href="#局部择优搜索与全局择优搜索的相同处与区别各是什么" aria-label="Permalink to &quot;局部择优搜索与全局择优搜索的相同处与区别各是什么？&quot;">​</a></h3><p>​ 局部择优搜索和全局择优搜索都是一种求解最优解的方法，但区别在于搜索的范围不同。局部择优搜索只考虑当前状态下的可行解，通过不断地寻找局部最优解来逐步接近全局最优解；而全局择优搜索则是在整个搜索空间中寻找最优解，需要考虑更加广泛的可行解。因此，局部择优搜索更容易陷入局部最优解而无法达到全局最优解，而全局择优搜索更加耗时和计算资源。</p>`,44)]))}const u=n(e,[["render",p]]);export{d as __pageData,u as default};
