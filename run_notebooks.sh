#!/usr/bin/env bash
# 批量执行所有 notebook，输出保存到文件（方便 git commit 后发布到 GitHub Pages）
# 用法：
#   ./run_notebooks.sh            # 执行全部
#   ./run_notebooks.sh 04_rag     # 只执行某个 module
#   ./run_notebooks.sh 04_rag/01  # 只执行某个文件

set -e

VENV=".venv/bin"
TIMEOUT=300   # 每个 notebook 最长执行时间（秒）
FILTER="${1:-}"  # 可选过滤参数

# 收集要执行的 notebooks
NOTEBOOKS=$(find chapters -name "*.ipynb" \
  ! -path "*/.ipynb_checkpoints/*" \
  | sort)

if [ -n "$FILTER" ]; then
  NOTEBOOKS=$(echo "$NOTEBOOKS" | grep "$FILTER")
fi

TOTAL=$(echo "$NOTEBOOKS" | wc -l | tr -d ' ')
COUNT=0
FAILED=()

echo "========================================="
echo "  执行 $TOTAL 个 notebook"
echo "========================================="

for nb in $NOTEBOOKS; do
  COUNT=$((COUNT + 1))
  echo ""
  echo "[$COUNT/$TOTAL] $nb"
  echo "-----------------------------------------"

  if $VENV/jupyter nbconvert \
      --to notebook \
      --execute \
      --inplace \
      --ExecutePreprocessor.timeout=$TIMEOUT \
      --ExecutePreprocessor.kernel_name=python3 \
      "$nb" 2>&1; then
    echo "✓ 完成"
  else
    echo "✗ 失败: $nb"
    FAILED+=("$nb")
  fi
done

echo ""
echo "========================================="
echo "  完成 $COUNT 个，失败 ${#FAILED[@]} 个"
echo "========================================="

if [ ${#FAILED[@]} -gt 0 ]; then
  echo "失败列表："
  for f in "${FAILED[@]}"; do
    echo "  - $f"
  done
  exit 1
fi
