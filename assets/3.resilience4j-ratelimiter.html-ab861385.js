import{_ as e,V as t,W as p,X as n,Y as s,Z as o,$ as c,F as i}from"./framework-159025ca.js";const l={},u=n("h1",{id:"resilience4j-ratelimiter",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#resilience4j-ratelimiter","aria-hidden":"true"},"#"),s(" resilience4j-ratelimiter")],-1),r={href:"https://zhuanlan.zhihu.com/p/441659033",target:"_blank",rel:"noopener noreferrer"},k=c(`<p>Resilience4j 总共有两种实现：</p><ul><li>基于原子计数器（Atomic Rate Limiter）</li><li>基于Java信号量（Semaphore-Based Rate Limiter）</li></ul><h2 id="atomic-rate-limiter" tabindex="-1"><a class="header-anchor" href="#atomic-rate-limiter" aria-hidden="true">#</a> Atomic Rate Limiter</h2><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2024/03/05/ZtaS5O.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>上图是AtomicRateLimiter的实现示意图，它通过AtomicReference管理其状态，我认为仍然属于<strong>固定窗口</strong>算法。</p><p>AtomicRateLimiter.State具有以下字段：</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 当前周期</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> activeCycle<span class="token punctuation">;</span>
<span class="token comment">// 当前周期剩余的权限 这tm可能是负的</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">int</span> activePermissions<span class="token punctuation">;</span>
<span class="token comment">// 等待的时间</span>
<span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token keyword">long</span> nanosToWait<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>主要逻辑是：</p><ul><li>将时间分成相等的部分，称为周期。在任何时候，我们都可以通过计算currentTime / cyclePeriod来确定当前周期。</li><li>如果我们知道限制器最后一次使用的当前周期数和周期，那么我们实际上可以计算出应该在限制器中出现多少个权限。</li><li>经过此计算后，如果可用权限还不够，我们可以通过减少当前权限并计算我们等待它出现的时间来执行权限保留。</li><li>经过所有计算后，我们可以产生一个新的限制器状态并将其存储在AtomicReference中，以在所有用户线程中传播这些更改。</li></ul><p>AtomicRateLimiter的acquirePermission方法，通过更新state来获取需要等待的时间。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AtomicRateLimiter</span>：
  
<span class="token comment">// 获取指定数量的许可</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 超时持续时间，表示请求等待执行的最长时间，单位为毫秒，0 表示无限期等待</span>
    <span class="token keyword">long</span> timeoutInNanos <span class="token operator">=</span> state<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function">getTimeoutDuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 更新状态 这是最核心的方法 计算周期内剩余的权限以及需要等待的时间</span>
    <span class="token class-name">State</span> modifiedState <span class="token operator">=</span> <span class="token function">updateStateWithBackOff</span><span class="token punctuation">(</span><span class="token keyword">permits</span><span class="token punctuation">,</span> timeoutInNanos<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 等待指定时间来获取许可</span>
    <span class="token keyword">boolean</span> result <span class="token operator">=</span> <span class="token function">waitForPermissionIfNecessary</span><span class="token punctuation">(</span>timeoutInNanos<span class="token punctuation">,</span> modifiedState<span class="token punctuation">.</span>nanosToWait<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token function">publishRateLimiterAcquisitionEvent</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> <span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> result<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到核心方法是calculateNextState来获取下一个状态，然后通过cas更新状态变量。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">private</span> <span class="token class-name">State</span> <span class="token function">updateStateWithBackOff</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> timeoutInNanos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">AtomicRateLimiter<span class="token punctuation">.</span>State</span> prev<span class="token punctuation">;</span>
    <span class="token class-name">AtomicRateLimiter<span class="token punctuation">.</span>State</span> next<span class="token punctuation">;</span>

    <span class="token comment">// cas更新当前状态</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前状态</span>
        prev <span class="token operator">=</span> state<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 计算下一个状态</span>
        next <span class="token operator">=</span> <span class="token function">calculateNextState</span><span class="token punctuation">(</span><span class="token keyword">permits</span><span class="token punctuation">,</span> timeoutInNanos<span class="token punctuation">,</span> prev<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span>prev<span class="token punctuation">,</span> next<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> next<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>calculateNextState计算当前所处的周期，然后计算当前周期可用的许可数量够不够，不够的话说明需要等待到别的周期来补充许可数。通过nanosToWaitForPermission方法计算要等待的时间，然后将状态封装进State。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 一个无副作用的函数，可以从当前计算下一个｛@link <span class="token reference"><span class="token class-name">State</span></span>｝。它决定
 * 您应该等待给定数量的许可证并为您保留的时间，
 * 如果你能等足够长的时间。
 *
 * <span class="token keyword">@param</span> <span class="token parameter">permits</span>        许可证数量
 * <span class="token keyword">@param</span> <span class="token parameter">timeoutInNanos</span> 调用方可以等待权限的最长时间（以纳秒为单位）
 * <span class="token keyword">@param</span> <span class="token parameter">activeState</span>    ｛@link <span class="token reference"><span class="token class-name">AtomicRateLimiter</span></span>｝ 的当前状态
 * <span class="token keyword">@return</span> next <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">State</span></span><span class="token punctuation">}</span>
 */</span>
<span class="token keyword">private</span> <span class="token class-name">State</span> <span class="token function">calculateNextState</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> timeoutInNanos<span class="token punctuation">,</span>
                                 <span class="token keyword">final</span> <span class="token class-name">State</span> activeState<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 配置的限流周期</span>
    <span class="token keyword">long</span> cyclePeriodInNanos <span class="token operator">=</span> activeState<span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function">getLimitRefreshPeriod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 每个时间周期的限流阈值，表示每个时间周期内允许的最大请求数</span>
    <span class="token keyword">int</span> permissionsPerCycle <span class="token operator">=</span> activeState<span class="token punctuation">.</span>config<span class="token punctuation">.</span><span class="token function">getLimitForPeriod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 当前时间</span>
    <span class="token keyword">long</span> currentNanos <span class="token operator">=</span> <span class="token function">currentNanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 当前所处周期</span>
    <span class="token keyword">long</span> currentCycle <span class="token operator">=</span> currentNanos <span class="token operator">/</span> cyclePeriodInNanos<span class="token punctuation">;</span>

    <span class="token comment">// 激活的周期</span>
    <span class="token keyword">long</span> nextCycle <span class="token operator">=</span> activeState<span class="token punctuation">.</span>activeCycle<span class="token punctuation">;</span>
    <span class="token comment">// 激活的周期所剩余的权限数</span>
    <span class="token keyword">int</span> nextPermissions <span class="token operator">=</span> activeState<span class="token punctuation">.</span>activePermissions<span class="token punctuation">;</span>


    <span class="token comment">// 如果当前所处的周期和上次激活的限流周期不处在一个周期中 重新计算 注意上个状态中权限数可能是负的 欠的债在这里要还</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>nextCycle <span class="token operator">!=</span> currentCycle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 当前与激活周期的差额</span>
        <span class="token keyword">long</span> elapsedCycles <span class="token operator">=</span> currentCycle <span class="token operator">-</span> nextCycle<span class="token punctuation">;</span>

        <span class="token comment">// 区间内累计权限</span>
        <span class="token keyword">long</span> accumulatedPermissions <span class="token operator">=</span> elapsedCycles <span class="token operator">*</span> permissionsPerCycle<span class="token punctuation">;</span>

        <span class="token comment">// 赋值下一个周期</span>
        nextCycle <span class="token operator">=</span> currentCycle<span class="token punctuation">;</span>

        <span class="token comment">// 下一个周期的权限数  注意上个状态中权限数可能是负的 欠的债在这里要还 也就是min(x,y)的作用</span>
        nextPermissions <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span> <span class="token function">min</span><span class="token punctuation">(</span>nextPermissions <span class="token operator">+</span> accumulatedPermissions<span class="token punctuation">,</span>
            permissionsPerCycle<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 计算等待所需权限许可证累积的时间</span>
    <span class="token keyword">long</span> nextNanosToWait <span class="token operator">=</span> <span class="token function">nanosToWaitForPermission</span><span class="token punctuation">(</span>
        <span class="token keyword">permits</span><span class="token punctuation">,</span> cyclePeriodInNanos<span class="token punctuation">,</span> permissionsPerCycle<span class="token punctuation">,</span> nextPermissions<span class="token punctuation">,</span> currentNanos<span class="token punctuation">,</span>
        currentCycle
    <span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">State</span> nextState <span class="token operator">=</span> <span class="token function">reservePermissions</span><span class="token punctuation">(</span>activeState<span class="token punctuation">.</span>config<span class="token punctuation">,</span> <span class="token keyword">permits</span><span class="token punctuation">,</span> timeoutInNanos<span class="token punctuation">,</span> nextCycle<span class="token punctuation">,</span>
        nextPermissions<span class="token punctuation">,</span> nextNanosToWait<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> nextState<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>nanosToWaitForPermission计算获取指定数量的许可要等多久。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 计算等待所需权限许可证累积的时间
 *
 * <span class="token keyword">@param</span> <span class="token parameter">permits</span>              所需权限的许可证
 * <span class="token keyword">@param</span> <span class="token parameter">cyclePeriodInNanos</span>   限流周期
 * <span class="token keyword">@param</span> <span class="token parameter">permissionsPerCycle</span>  每个周期的最大阀值
 * <span class="token keyword">@param</span> <span class="token parameter">availablePermissions</span> 当前可用权限，如果有已保留权限
 * <span class="token keyword">@param</span> <span class="token parameter">currentNanos</span>         当前时间（纳秒）
 * <span class="token keyword">@param</span> <span class="token parameter">currentCycle</span>         当前｛@link <span class="token reference"><span class="token class-name">AtomicRateLimiter</span></span>｝周期    @return nanoseconds to
 *                             wait for the next permission
 */</span>
<span class="token keyword">private</span> <span class="token keyword">long</span> <span class="token function">nanosToWaitForPermission</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> cyclePeriodInNanos<span class="token punctuation">,</span>
                                      <span class="token keyword">final</span> <span class="token keyword">int</span> permissionsPerCycle<span class="token punctuation">,</span>
                                      <span class="token keyword">final</span> <span class="token keyword">int</span> availablePermissions<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> currentNanos<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> currentCycle<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 当前周期可用权限大于需要的权限 返回0 表示不需要等待</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>availablePermissions <span class="token operator">&gt;=</span> <span class="token keyword">permits</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token number">0L</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 走到下面说明本周期内的权限肯定是不够了 需要累计等待几个周期获取足够的权限</span>

    <span class="token comment">// 下一个循环时间（纳米）</span>
    <span class="token keyword">long</span> nextCycleTimeInNanos <span class="token operator">=</span> <span class="token punctuation">(</span>currentCycle <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">*</span> cyclePeriodInNanos<span class="token punctuation">;</span>
    <span class="token comment">// 下一个周期和当前周期时间差</span>
    <span class="token keyword">long</span> nanosToNextCycle <span class="token operator">=</span> nextCycleTimeInNanos <span class="token operator">-</span> currentNanos<span class="token punctuation">;</span>
    <span class="token comment">// 当前周期到下一个周期可用的权限</span>
    <span class="token keyword">int</span> permissionsAtTheStartOfNextCycle <span class="token operator">=</span> availablePermissions <span class="token operator">+</span> permissionsPerCycle<span class="token punctuation">;</span>

    <span class="token comment">// （  permits - availablePermissions  + 1 ） / permissionsPerCycle 即 获取需要的权限需要几个周期</span>
    <span class="token keyword">int</span> fullCyclesToWait <span class="token operator">=</span> <span class="token function">divCeil</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token punctuation">(</span>permissionsAtTheStartOfNextCycle <span class="token operator">-</span> <span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">,</span> permissionsPerCycle<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 等待的时间</span>
    <span class="token keyword">return</span> <span class="token punctuation">(</span>fullCyclesToWait <span class="token operator">*</span> cyclePeriodInNanos<span class="token punctuation">)</span> <span class="token operator">+</span> nanosToNextCycle<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>reservePermissions把计算的结果封装进State。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 确定调用方是否可以在超时前获取权限，然后创建
 * 对应的<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">State</span></span><span class="token punctuation">}</span>。只有当调用方可以成功等待时才保留权限准许
 *
 * <span class="token keyword">@param</span> <span class="token parameter">config</span>
 * <span class="token keyword">@param</span> <span class="token parameter">permits</span>        要获取的许可证
 * <span class="token keyword">@param</span> <span class="token parameter">timeoutInNanos</span> 调用方可以等待权限的最长时间（以纳秒为单位）
 * <span class="token keyword">@param</span> <span class="token parameter">cycle</span>          新｛@link <span class="token reference"><span class="token class-name">State</span></span>｝ 的周期
 * <span class="token keyword">@param</span> <span class="token parameter">permissions</span>    新｛@link <span class="token reference"><span class="token class-name">State</span></span>｝ 的权限
 * <span class="token keyword">@param</span> <span class="token parameter">nanosToWait</span>    等待下一个权限的时间
 * <span class="token keyword">@return</span> new <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">State</span></span><span class="token punctuation">}</span> with possibly reserved permissions and time to wait
 */</span>
<span class="token keyword">private</span> <span class="token class-name">State</span> <span class="token function">reservePermissions</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">RateLimiterConfig</span> config<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">,</span>
                                 <span class="token keyword">final</span> <span class="token keyword">long</span> timeoutInNanos<span class="token punctuation">,</span>
                                 <span class="token keyword">final</span> <span class="token keyword">long</span> cycle<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">int</span> permissions<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token keyword">long</span> nanosToWait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用方可以等待怎么长时间</span>
    <span class="token keyword">boolean</span> canAcquireInTime <span class="token operator">=</span> timeoutInNanos <span class="token operator">&gt;=</span> nanosToWait<span class="token punctuation">;</span>
    <span class="token comment">// 当前周期还剩下的权限</span>
    <span class="token keyword">int</span> permissionsWithReservation <span class="token operator">=</span> permissions<span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>canAcquireInTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 下一个状态还剩下的权限</span>
        permissionsWithReservation <span class="token operator">-=</span> <span class="token keyword">permits</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 创建新的状态</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">State</span><span class="token punctuation">(</span>config<span class="token punctuation">,</span> cycle<span class="token punctuation">,</span> permissionsWithReservation<span class="token punctuation">,</span> nanosToWait<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>等待指定时间获取足够的许可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token doc-comment comment">/**
     * 如果nanosToWait大于0，它会尝试为nanosToWait停放<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Thread</span></span><span class="token punctuation">}</span>，但不会比timeoutInNanos的时间更长。
     *
     * <span class="token keyword">@param</span> <span class="token parameter">timeoutInNanos</span> 调用发可以等待的最长时间
     * <span class="token keyword">@param</span> <span class="token parameter">nanosToWait</span>    调用方需要等待纳秒
     * <span class="token keyword">@return</span> true if caller was able to wait for nanosToWait without <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">Thread</span><span class="token punctuation">#</span><span class="token field">interrupt</span></span><span class="token punctuation">}</span> and
     * not exceed timeout
     */</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">waitForPermissionIfNecessary</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">long</span> timeoutInNanos<span class="token punctuation">,</span>
                                                 <span class="token keyword">final</span> <span class="token keyword">long</span> nanosToWait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 可以立即获取</span>
        <span class="token keyword">boolean</span> canAcquireImmediately <span class="token operator">=</span> nanosToWait <span class="token operator">&lt;=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token comment">// 可以获取</span>
        <span class="token keyword">boolean</span> canAcquireInTime <span class="token operator">=</span> timeoutInNanos <span class="token operator">&gt;=</span> nanosToWait<span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>canAcquireImmediately<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>canAcquireInTime<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token function">waitForPermission</span><span class="token punctuation">(</span>nanosToWait<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">waitForPermission</span><span class="token punctuation">(</span>timeoutInNanos<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> <span class="token function">waitForPermission</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token keyword">long</span> nanosToWait<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 等待线程数加1</span>
        waitingThreads<span class="token punctuation">.</span><span class="token function">incrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 要等待到的时间</span>
        <span class="token keyword">long</span> deadline <span class="token operator">=</span> <span class="token function">currentNanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> nanosToWait<span class="token punctuation">;</span>
        <span class="token keyword">boolean</span> wasInterrupted <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span><span class="token function">currentNanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> deadline <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span>wasInterrupted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">long</span> sleepBlockDuration <span class="token operator">=</span> deadline <span class="token operator">-</span> <span class="token function">currentNanoTime</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token function">parkNanos</span><span class="token punctuation">(</span>sleepBlockDuration<span class="token punctuation">)</span><span class="token punctuation">;</span>
            wasInterrupted <span class="token operator">=</span> <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">interrupted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 等待线程数减1</span>
        waitingThreads<span class="token punctuation">.</span><span class="token function">decrementAndGet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>wasInterrupted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> <span class="token operator">!</span>wasInterrupted<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="semaphorebasedratelimiter" tabindex="-1"><a class="header-anchor" href="#semaphorebasedratelimiter" aria-hidden="true">#</a> SemaphoreBasedRateLimiter</h2><p>SemaphoreBasedRateLimiter的代码就比较简单了，因为他是基于java的semaphore去实现的，获取指定数量的许可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">SemaphoreBasedRateLimiter</span>：
  
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token keyword">permits</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取指定数量的许可</span>
        <span class="token keyword">boolean</span> success <span class="token operator">=</span> semaphore
            <span class="token punctuation">.</span><span class="token function">tryAcquire</span><span class="token punctuation">(</span><span class="token keyword">permits</span><span class="token punctuation">,</span> rateLimiterConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getTimeoutDuration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token function">publishRateLimiterAcquisitionEvent</span><span class="token punctuation">(</span>success<span class="token punctuation">,</span> <span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> success<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">InterruptedException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">Thread</span><span class="token punctuation">.</span><span class="token function">currentThread</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">interrupt</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">publishRateLimiterAcquisitionEvent</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token keyword">permits</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>需要注意的是它肯定需要释放许可，这里是定时任务去释放的，每隔一个周期的时间就会刷新许可。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token keyword">private</span> <span class="token class-name">ScheduledFuture</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> <span class="token function">scheduleLimitRefresh</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> scheduler<span class="token punctuation">.</span><span class="token function">scheduleAtFixedRate</span><span class="token punctuation">(</span>
            <span class="token keyword">this</span><span class="token operator">::</span><span class="token function">refreshLimit</span><span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>rateLimiterConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLimitRefreshPeriod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>rateLimiterConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLimitRefreshPeriod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
            <span class="token class-name">TimeUnit</span><span class="token punctuation">.</span><span class="token constant">NANOSECONDS</span>
        <span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">void</span> <span class="token function">refreshLimit</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">int</span> permissionsToRelease <span class="token operator">=</span>
            <span class="token keyword">this</span><span class="token punctuation">.</span>rateLimiterConfig<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getLimitForPeriod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> semaphore<span class="token punctuation">.</span><span class="token function">availablePermits</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        semaphore<span class="token punctuation">.</span><span class="token function">release</span><span class="token punctuation">(</span>permissionsToRelease<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,26);function d(m,v){const a=i("ExternalLinkIcon");return t(),p("div",null,[u,n("p",null,[n("a",r,[s("五种常见的限流算法"),o(a)])]),k])}const y=e(l,[["render",d],["__file","3.resilience4j-ratelimiter.html.vue"]]);export{y as default};
