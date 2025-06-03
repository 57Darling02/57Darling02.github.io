#!/bin/bash
# update_theme.sh - 极简主题更新工具

# 设置上游仓库URL
UPSTREAM_URL="https://github.com/57Darling02/VitePress_butterfly.git"

# 保护文件/目录列表
PROTECTED_PATHS=(
  "posts/"
  "site_config.ts"
  "public/"
  ".github/"
  "docs/.vitepress/config.ts"
  "docs/.vitepress/theme/"
  "package.json"
  "package-lock.json"
  "pnpm-lock.yaml"
  "yarn.lock"
)

echo "🚀 VitePress_butterfly 主题极简更新工具"
echo "------------------------------------"

# 检查是否在Git仓库中
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "错误：当前目录不是Git仓库！"
  echo "请确保在项目根目录运行此脚本"
  exit 1
fi

# 添加上游仓库
if ! git remote | grep -q upstream; then
  echo "添加上游主题仓库..."
  git remote add upstream $UPSTREAM_URL
fi

# 确保本地文件和仓库文件同步且使用以本地为主
git pull origin main --strategy-option ours
# 更新主题前保存状态
git add .
git commit -m "Save local changes before update"

# 拉取上游更新（自动合并，冲突时使用上游版本）
git fetch upstream
git pull upstream/main --strategy-option theirs  

# 将所有保护的文件/目录恢复到更新主题前的状态
echo "正在恢复保护的文件和目录..."
for path in "${PROTECTED_PATHS[@]}"; do
  if [ -e "$path" ] || git ls-tree --error-unmatch HEAD "$path" >/dev/null 2>&1; then
    git checkout HEAD -- "$path"
    echo "  ✓ $path"
  else
    echo "  - $path (不存在，跳过)"
  fi
done

# 提交合并结果
if ! git diff --quiet; then
  git commit -m "Merge upstream, keep protected files"
else
  echo "没有更改需要提交"
fi

# 推送到云端仓库
git push origin main

# 完成提示
echo ""
echo "🎉 主题更新完成！"
echo "---------------------------------"
echo "保护内容已恢复:"
for path in "${PROTECTED_PATHS[@]}"; do
  echo "  - $path"
done
echo ""
echo "下一步建议:"
echo "1. 运行本地预览: npm run dev"
echo "2. 检查站点功能"
echo "3. 如有问题可回退: git reset --hard HEAD@{1}"