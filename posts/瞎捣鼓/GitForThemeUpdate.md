---
title: GitForThemeUpdate
date: 2025-06-04 23:55:13
tags: 学习笔记
---
# GitForThemeUpdate

### 起源

​	vite构建工具有**构建和资源管理**上的优势，再加上vitepress拓展的自由，我终于不用忍受hexo写作加不了图片，需要手动构建，我不会改等等问题，决定弃hexo而去，拥抱vitepress。

​	为了自定义了vitepress成为博客风格主题，写了 首页打字机、文章信息统计、侧边栏、侧边抽屉、顶部状态栏、树形大纲、标签等等杂七杂八的功能和组件，终于看起来像一个“博客”了。

### 写了这么多不能只有我一个人知道

​	于是我找到之前带我用hexo博客的同济✌[anaouse](https://anaouse.github.io/)软磨硬泡让他用上了我的主题。但其实这个主题还不完善，功能不足，而且还有bug没解决。

​	咋整才能让用主题的人能够体验到我最新写的代码呢？

### git好像有说法

​	git作为一个版本控制工具，仅仅拿来“备份”代码，好像有点浪费。而且也没人跟我协作写代码🥲。git能从远程拉去代码，这正好符合主题更新的需求。

​	只要把主题的模板写好在github仓库，用的人可以直接fork完整的模板代码和自动构建工作流。用户只需要简单的**改改模板**中的文字和图片，**上传到仓库**就会**触发工作流自动构建**，TA就能马上拥有一个静态博客网页！

​	**更新主题**和最开始使用主题其实就一点区别，就是将**除了用户自定义的内容以外**的文件和模板仓库同步就行。会用git的用户，直接让他们自己`git fetch upstream main`然后合并以下就行。

​	但我想起我刚刚开始搭个人博客时，啥都不懂，啥也不会。要是能够动动手指就能更新，动动手指就能更新和上传就好了。

​	既然如此，不如写个脚本给使用者（或者是曾经的自己）。



### 利用git更新主题

​	首先做一些准备工作。vitepress拓展性高，但我们既然已经把他包装成主题了，那么咱的目标用户就不应该是需要“进一步拓展主题”的高级玩家，而是“专注内容”的用户。因此，我直接将所有我希望用户能够自定义的内容全部集成到最外层一个文件 `site_config.ts`中，然后让用户通过`public/ `引入自己的资源，`posts/`写自己的文章。由于vite特性，文章中需要的相关资源直接放在`posts/`中，通过相对路径就能使用。比如图片、封面等等。如此，对于专注内容的用户，他只会改变上述三个文件(夹)。

#### 定个小目标

​	那我们的脚本就把除了`site_config.ts` `public/ ` `posts/`外的内容完全同步上游即可。明确了目标后，先找一个大体的方向：开始更新时：

1. 保存当前指定的三个文件状态
2. 获取上游仓库,完全同步上游仓库
3. 恢复指定的三个文件



#### 简单粗暴方案

欸，乍一看不是很简单嘛，我直接把需要的文件暂存，然后把原来的全删了，同步模板仓库，再把对应的文件替换回来就行了。

这确实很简单，很暴力的完成了要求。但这有个问题，我先删除，再恢复，git会把这两个操作同样记录下来。也就是说，你所有的文章都会有恢复时的写入记录。然后所有文章都会显示**上次更新时间为主题更新时间**。因此，我们不仅要替换、保留文件，还要让保留的文件在git中的操作历史不发生改变。

#### 改进方案

但好像也不难，我用git合并一下不行吗？先在合并时全部使用上游仓库的更改，再通过指针恢复指定文件。以`posts/`为例

```sh
git add . && git commit -m "Save local changes before update"
# 合并上游仓库，有冲突完全使用上游仓库的
git pull upstream main --strategy-option theirs 
git checkout HEAD -- posts/
```

理想很美好，现实很残酷。虽然合并确实保存了部分文件的git历史，但是由于合并的特性，分支合并结果我们并不满意。举三个例子：

1. 本来我写的文章好好的在`posts/`中放着，但主题的作者又写了新的文章到模板仓库里，那我的一更新，`posts/`中就会凭空多出模板仓库中的文章。如果本身文章多的话，要找出来并删除多出的文章可遭老罪了😤。

2. 合并可能会导致使用者的某些操作影响最新的主题的工作。比如我在上一个版本的配置中自定义了某些变量，但是新版本的主题中恰好也新增了一个同名的变。合并可能让这两个变量的保留下来，进而导致主题报错。这种情况还很难排查。

	> git合并（merge）特性：可以通俗理解为，让补全文件的操作。比如你在文件中写了字符1，他在平行时空下的同一份文件中写入了字符2。那如果你要合并两个时空，就意味着这份文件既要完成写入字符1，还要完成写入字符2.如果修改的位置还正好相同，那么肯定是后一个的操作覆盖了前一个操作。这就是我们“解决合并冲突”要做的；反之如果写入的位置不一样，那么合并就会保留这两个操作的结果。但代码可能因此出错。

3. 我已将完成了主题更新，但是我手贱修改了某些地方导致报错。我希望通过再次更新得以修复。但是合并之后的操作是不会被再次合并覆盖的。🥹



#### 最终方案

merge不好使，那我直接用指针覆盖不就好了。

- 先上个保险，commit一个，将更新前最后状态的id记录下来。

- 完全同步上游指针。（整个项目和模板完全相同）

- 完全删除需要恢复的目录（避免例一出现）

- 将需要恢复的目录 通过 更新前记录的id 来同步指针

- 将这份由不同指针拼凑的结果放入一个新的分支，再合并入主分支。

这样一来，需要保留的文件的git指针完全和原来的一样，等于完全没动过。而其他文件由于指针用了模板仓库的，会被当成一次“更改指针操作”被记录，因此相应文件**一定会被更新**且**完全同步**。

```bash
git fetch upstream main
git reset --hard origin/main
for path in "${PROTECTED_PATHS[@]}"; do
    # 彻底删除要保留的文件
    if [ -e "$path" ]; then
      echo "  - 清空保护目录: $path"
      rm -rf "$path"
      git rm -rf "$path" 
    fi
    # 尝试从更新前的提交中恢复
    git checkout $PRE_MERGE_COMMIT -- "$path" 2>/dev/null  
done
git checkout -b temp-branch
git checkout main
git merge --no-ff temp-branch -m 
```





