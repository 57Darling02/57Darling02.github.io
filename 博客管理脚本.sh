#!/bin/bash
# theme-utils.sh - VitePress主题管理工具

# ===== 用户可配置区域 =====
# 保护文件/目录列表（可根据需要修改）
PROTECTED_PATHS=(
  "posts/"
  "site_config.ts"
  "public/"
  ".github/"
)

# 上游主题仓库URL
UPSTREAM_URL="https://github.com/57Darling02/VitePress_butterfly.git"
# ===== 配置结束 =====

# 显示菜单
show_menu() {
  echo "🚀 VitePress主题管理工具"
  echo "1. 发布更新到GitHub"
  echo "2. 更新主题"
  echo "其他键退出"
  echo "------------------------------------"
}

# 发布功能
deploy() {
  echo "📤 正在发布更新到GitHub..."
  git pull origin main --strategy-option ours
  git add .
  git commit -m "update"
  git pull
  git push origin main
  echo "✅ 已成功发布更新！"
}
copy_file() {
  # 开发使用
  cp posts/主题介绍/README.md README.md
  cp site_config.ts .vitepress/site_config_template.ts
}

# 更新主题功能
update_theme() {
  echo "🔄 开始更新主题..."
  # 检查工作区是否干净
  if ! git diff --quiet || ! git diff --cached --quiet; then
    echo "错误：工作区或暂存区存在未提交的更改。请先提交或保存更改后再更新主题。"
    return 1
  fi

  # 检查是否在Git仓库
  if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    echo "错误：当前目录不是Git仓库！"
    echo "请确保在项目根目录运行此脚本"
    return 1
  fi

  # 添加上游仓库
  if ! git remote | grep -q upstream; then
    echo "添加上游主题仓库..."
    git remote add upstream $UPSTREAM_URL
  fi

  # 显示警告
  echo ""
  echo "⚠️ 警告：即将强制更新所有主题文件（保护内容除外）"
  echo "----------------------------------------------"
  echo "以下内容将被保护:"
  for path in "${PROTECTED_PATHS[@]}"; do
    echo "  - $path"
  done

  # 用户确认
  read -p "是否继续更新？(y/n): " confirm </dev/tty
  if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo "操作已取消"
    return 0
  fi

  echo "确保本地文件和仓库文件同步且使用以本地为主"
  git pull origin main --strategy-option ours
  echo "保存当前配置"
  git add .
  git commit -m "Save local changes before update"
  echo "拉取上游更新（自动合并，冲突时使用上游版本）"
  git fetch upstream main
  git pull upstream/main --strategy-option theirs 
  echo "正在恢复保护的文件和目录..."
  for path in "${PROTECTED_PATHS[@]}"; do
    if [ -e "$path" ] || git ls-tree --error-unmatch HEAD "$path" >/dev/null 2>&1; then
      git checkout HEAD -- "$path"
      echo "  ✓ $path"
    else
      echo "  - $path (不存在，跳过)"
    fi
  done
  echo "提交合并结果"
  if ! git diff --quiet; then
    git commit -m "Merge upstream, keep protected files"
  else
    echo "没有更改需要提交"
  fi

  echo ""
  echo "🎉 主题更新完成！"
  echo "---------------------------------"
  echo "保护内容已恢复:"
  for path in "${PROTECTED_PATHS[@]}"; do
    echo "  - $path"
  done

  
  echo ""
  echo "如有问题可回退: git reset --hard HEAD@{1}"
  echo "测试无误后推送"
}

# 主程序
main() {
  while true; do  # 添加循环
    show_menu
    read -p "请选择操作: " choice </dev/tty
    
    case "$choice" in
      1) 
        deploy
        ;;
      2) 
        update_theme
        ;;
      3)
        copy_file
        deploy
        ;;
      *) 
        echo "操作已取消"
        exit 0  # 退出脚本
        ;;
    esac
    
    echo ""  # 添加空行分隔
    read -p "按回车键返回主菜单..." </dev/tty  # 添加暂停
  done
}
# 执行主程序
main