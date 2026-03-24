---
html_theme.sidebar_secondary.remove: true
---

```{raw} html
<div class="llm-landing">

  <section class="llm-hero">
    <div class="llm-hero-text">
      <p class="llm-badge">📖 动手学大语言模型</p>
      <h1 class="llm-hero-title">跟鬼哥一起学 LLM</h1>
      <p class="llm-hero-tagline">认真起来的鬼哥，强得可怕！</p>
      <p class="llm-hero-desc">
        从核心概念到生产落地，每章一个可运行的 Jupyter Notebook。<br>
        理论与代码并行，切换模型只需改 <code>.env</code>，无需动代码。
      </p>
      <div class="llm-actions">
        <a class="llm-btn-primary" href="chapters/01_foundations/01_tokens.html">开始阅读 →</a>
        <a class="llm-btn-secondary" href="preface.html">作者序言</a>
        <a class="llm-btn-ghost" href="https://github.com/luoli523/learn-llm">GitHub</a>
      </div>
    </div>
    <div class="llm-hero-img">
      <img src="_static/guige-llm.jpg" alt="跟鬼哥一起学LLM 书籍速览">
    </div>
  </section>

  <section class="llm-features">
    <div class="llm-feature-card">
      <span class="llm-feat-icon">🔗</span>
      <h3>Full-Chain Coverage</h3>
      <p>从 Token 到多 Agent 系统，7 个模块全链路覆盖 LLM 工程，不留盲区。</p>
    </div>
    <div class="llm-feature-card">
      <span class="llm-feat-icon">🛠️</span>
      <h3>Practical Orientation</h3>
      <p>每章一个可运行的 Notebook，动手实践驱动。看一百遍，不如自己跑一次。</p>
    </div>
    <div class="llm-feature-card">
      <span class="llm-feat-icon">🤖</span>
      <h3>Geek Spirit</h3>
      <p>统一客户端 + Provider 热切换 + 生产可观测性，以工程师视角打磨每个细节。</p>
    </div>
  </section>

  <section class="llm-toc-section">
    <h2 class="llm-toc-title">📚 书籍目录</h2>
    <div class="llm-toc-grid">
      <a class="llm-toc-card" href="chapters/01_foundations/01_tokens.html">
        <div class="llm-toc-num">01</div>
        <h4>基础概念 Foundations</h4>
        <ul>
          <li>Tokens &amp; Tokenization</li>
          <li>Embeddings</li>
          <li>Context Window</li>
          <li>Sampling 参数</li>
        </ul>
      </a>
      <a class="llm-toc-card" href="chapters/02_prompting/01_zero_few_shot.html">
        <div class="llm-toc-num">02</div>
        <h4>Prompting 技术</h4>
        <ul>
          <li>Zero-shot &amp; Few-shot</li>
          <li>Chain-of-Thought</li>
          <li>Structured Output</li>
        </ul>
      </a>
      <a class="llm-toc-card" href="chapters/03_api/01_streaming.html">
        <div class="llm-toc-num">03</div>
        <h4>API 进阶 Patterns</h4>
        <ul>
          <li>Streaming</li>
          <li>Function Calling</li>
          <li>Vision（多模态）</li>
        </ul>
      </a>
      <a class="llm-toc-card" href="chapters/04_rag/01_chunking.html">
        <div class="llm-toc-num">04</div>
        <h4>RAG 检索增强生成</h4>
        <ul>
          <li>文档切块策略</li>
          <li>Embedding &amp; 语义搜索</li>
          <li>ChromaDB 实战</li>
        </ul>
      </a>
      <a class="llm-toc-card" href="chapters/05_agents/01_react.html">
        <div class="llm-toc-num">05</div>
        <h4>Agents 智能体</h4>
        <ul>
          <li>ReAct 推理 + 行动</li>
          <li>Agent 记忆系统</li>
          <li>多 Agent 系统</li>
        </ul>
      </a>
      <a class="llm-toc-card" href="chapters/06_finetuning/01_when_to_finetune.html">
        <div class="llm-toc-num">06</div>
        <h4>微调 Fine-tuning</h4>
        <ul>
          <li>何时需要微调？</li>
          <li>LoRA 低秩适配</li>
        </ul>
      </a>
      <a class="llm-toc-card" href="chapters/07_production/01_evaluation.html">
        <div class="llm-toc-num">07</div>
        <h4>生产实践 Production</h4>
        <ul>
          <li>LLM 评估</li>
          <li>成本优化</li>
          <li>可观测性与监控</li>
        </ul>
      </a>
    </div>
  </section>

</div>
```
