import{_ as n,V as s,W as a,$ as t}from"./framework-159025ca.js";const e={},p=t(`<h1 id="resilience4j-circuit-breaker" tabindex="-1"><a class="header-anchor" href="#resilience4j-circuit-breaker" aria-hidden="true">#</a> resilience4j-circuit-breaker</h1><blockquote><p>CircuitBreaker 通过有限状态机实现，具有三种正常状态：CLOSED、OPEN 和 HALF_OPEN 以及两种特殊状态 DISABLED 和 FORCED_OPEN。</p><p>CircuitBreaker 使用滑动窗口来存储和聚合调用的结果。您可以在基于计数的滑动窗口和基于时间的滑动窗口之间进行选择。</p><p>基于计数的滑动窗口聚合最后 N 次调用的结果。</p><p>基于时间的滑动窗口聚合了最后 N 秒的调用结果。</p></blockquote><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2024/03/05/wj26Yt.jpg" alt="state" tabindex="0" loading="lazy"><figcaption>state</figcaption></figure><p>那么resilience4j是如何实现断路器效果的呢？我们从基础的断路器api使用来入手，看resilience4j circuit breaker是如何使用进行状态机进行断路效果的。这是最简单的一行调用代码。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">String</span> result <span class="token operator">=</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">executeSupplier</span><span class="token punctuation">(</span>backendService<span class="token operator">::</span><span class="token function">doSomething</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>为什么将我们要执行的方法引用传给circuitBreaker的executeSupplier，就能达到断路保护的效果呢？点进方法看一下，其实circuitBreaker通过装饰器模式，对我们的方法进行了增强，达到断路保护的效果：</p><h2 id="装饰增强" tabindex="-1"><a class="header-anchor" href="#装饰增强" aria-hidden="true">#</a> 装饰增强</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CircuitBreaker</span><span class="token operator">:</span>

<span class="token doc-comment comment">/**
 * 装饰并执行装饰供应商。
 */</span>
<span class="token keyword">default</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">executeSupplier</span><span class="token punctuation">(</span><span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token function">decorateSupplier</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> supplier<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 通过circuitBreaker 进行supplier的装饰增强 达到断路保护的效果</span>
<span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token function">decorateSupplier</span><span class="token punctuation">(</span><span class="token class-name">CircuitBreaker</span> circuitBreaker<span class="token punctuation">,</span> <span class="token class-name">Supplier</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> supplier<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 获取权限</span>
            circuitBreaker<span class="token punctuation">.</span><span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          
            <span class="token keyword">final</span> <span class="token keyword">long</span> start <span class="token operator">=</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">getCurrentTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
              	<span class="token comment">// 方法执行逻辑</span>
                <span class="token class-name">T</span> result <span class="token operator">=</span> supplier<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
              
              	<span class="token comment">// 统计方法耗时</span>
                <span class="token keyword">long</span> duration <span class="token operator">=</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">getCurrentTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">;</span>
              
                <span class="token comment">// 调用成功 让断路器感知</span>
                circuitBreaker<span class="token punctuation">.</span><span class="token function">onResult</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">getTimestampUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
              
              	<span class="token comment">// 返回结果</span>
                <span class="token keyword">return</span> result<span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 处理异常的情况</span>
                <span class="token keyword">long</span> duration <span class="token operator">=</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">getCurrentTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> start<span class="token punctuation">;</span>
              
                <span class="token comment">// 调用失败 让断路器感知</span>
                circuitBreaker<span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">getTimestampUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> exception<span class="token punctuation">)</span><span class="token punctuation">;</span>
              
              	<span class="token comment">// 异常还得往外抛</span>
                <span class="token keyword">throw</span> exception<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面增强后的代码分为怎么几步：获取执行权限、执行方法逻辑、断路器感知执行结果。</p><h2 id="获取执行权限" tabindex="-1"><a class="header-anchor" href="#获取执行权限" aria-hidden="true">#</a> 获取执行权限</h2><p>这一步的职责很清晰，就是判断能不能执行。可以看到acquirePermission方法调用了stateReference，stateReference其实就是我们的状态引用。如果不允许调用的话acquirePermission方法会抛出异常。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CircuitBreakerStateMachine</span>：
  
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">// 获取权限</span>
        stateReference<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      	<span class="token comment">// 发布没有调用权限事件</span>
        <span class="token function">publishCallNotPermittedEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      	<span class="token comment">// 异常向外抛</span>
        <span class="token keyword">throw</span> e<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>前面我们说了，状态机有几种有限的状态，我们这里主要看关闭、半开、开放状态。</p><p>关闭状态下，允许调用，不会抛出任何异常，因为这时断路器并没有打开。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ClosedState</span>：
<span class="token doc-comment comment">/**
 * 不会抛出异常，因为断路器已关闭。
 */</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 不处理</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>半开状态下，需要根据配置的允许调用次数进行判断，如果次数大于0，那么允许调用，否则拒绝调用。可以看到，其实就是利用juc包中的类去线程安全的更新变量permittedNumberOfCalls值。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 获取执行权限</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 半开状态下 需要根据允许的调用次数来判断是否可以调用</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">tryAcquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token class-name">CallNotPermittedException</span>
            <span class="token punctuation">.</span><span class="token function">createCallNotPermittedException</span><span class="token punctuation">(</span><span class="token class-name">CircuitBreakerStateMachine</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 尝试获取执行权限 根据剩余的允许调用次数判断 大于0则返回true 否则返回false</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果允许的调用次数大于0 返回true</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>permittedNumberOfCalls<span class="token punctuation">.</span><span class="token function">getAndUpdate</span><span class="token punctuation">(</span>current <span class="token operator">-&gt;</span> current <span class="token operator">==</span> <span class="token number">0</span> <span class="token operator">?</span> current <span class="token operator">:</span> <span class="token operator">--</span>current<span class="token punctuation">)</span>
        <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 记录不可调用事件</span>
    circuitBreakerMetrics<span class="token punctuation">.</span><span class="token function">onCallNotPermitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>那么还有一种状态，就是打开状态，他应该是直接抛出异常，不允许调用了吧？其实不是，因为resilience4中打开状态经过一段时间是可以自动转为半开状态的，所以是需要判断的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 获取执行权限</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">acquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token comment">// 尝试获取执行权限</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">tryAcquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token class-name">CallNotPermittedException</span>
            <span class="token punctuation">.</span><span class="token function">createCallNotPermittedException</span><span class="token punctuation">(</span><span class="token class-name">CircuitBreakerStateMachine</span><span class="token punctuation">.</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 尝试获取执行权限</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">tryAcquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 检查等待时间是否已过 可以由打开状态过渡到半开状态</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>clock<span class="token punctuation">.</span><span class="token function">instant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isAfter</span><span class="token punctuation">(</span>retryAfterWaitDuration<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 过渡到半开状态</span>
        <span class="token function">toHalfOpenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
        <span class="token comment">// 检查状态转换后是否允许调用在HALF_OPEN状态下运行</span>
        <span class="token keyword">boolean</span> callPermitted <span class="token operator">=</span> stateReference<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">tryAcquirePermission</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>callPermitted<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          
            <span class="token comment">// 如果不允许调用 发布不允许调用事件</span>
            <span class="token function">publishCallNotPermittedEvent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          
            <span class="token comment">// 记录不允许调用指标</span>
            circuitBreakerMetrics<span class="token punctuation">.</span><span class="token function">onCallNotPermitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      
        <span class="token keyword">return</span> callPermitted<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 如果等待时间未过 则不允许调用 返回false</span>
    circuitBreakerMetrics<span class="token punctuation">.</span><span class="token function">onCallNotPermitted</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// open 状态转为 half open状态</span>
<span class="token keyword">private</span> <span class="token keyword">synchronized</span> <span class="token keyword">void</span> <span class="token function">toHalfOpenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token comment">// 更新open标识</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>isOpen<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      	<span class="token comment">// 更新状态</span>
        <span class="token function">transitionToHalfOpenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token comment">// 更新状态为HALF_OPEN</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">transitionToHalfOpenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token function">stateTransition</span><span class="token punctuation">(</span><span class="token constant">HALF_OPEN</span><span class="token punctuation">,</span> currentState <span class="token operator">-&gt;</span> <span class="token keyword">new</span> <span class="token class-name">HalfOpenState</span><span class="token punctuation">(</span>currentState<span class="token punctuation">.</span><span class="token function">attempts</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 更新状态引用</span>
<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">stateTransition</span><span class="token punctuation">(</span><span class="token class-name">State</span> newState<span class="token punctuation">,</span>
   <span class="token class-name">UnaryOperator</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">CircuitBreakerState</span><span class="token punctuation">&gt;</span></span> newStateGenerator<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token class-name">CircuitBreakerState</span> previousState <span class="token operator">=</span> stateReference<span class="token punctuation">.</span><span class="token function">getAndUpdate</span><span class="token punctuation">(</span>currentState <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
       <span class="token class-name">StateTransition</span><span class="token punctuation">.</span><span class="token function">transitionBetween</span><span class="token punctuation">(</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> currentState<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> newState<span class="token punctuation">)</span><span class="token punctuation">;</span>
       currentState<span class="token punctuation">.</span><span class="token function">preTransitionHook</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> newStateGenerator<span class="token punctuation">.</span><span class="token function">apply</span><span class="token punctuation">(</span>currentState<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">publishStateTransitionEvent</span><span class="token punctuation">(</span>
            <span class="token class-name">StateTransition</span><span class="token punctuation">.</span><span class="token function">transitionBetween</span><span class="token punctuation">(</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> previousState<span class="token punctuation">.</span><span class="token function">getState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> newState<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，在open状态下，其实会判断一下是否将状态转换为半开状态，然后在进行判断。并不是直接返回false。</p><p>综上，方法在执行前先获取执行权限，对于关闭状态直接允许调用，对于半开状态判断调用次数是否大于0，对于打开状态判断是否可以转为半开状态。</p><h2 id="断路器感知执行结果" tabindex="-1"><a class="header-anchor" href="#断路器感知执行结果" aria-hidden="true">#</a> 断路器感知执行结果</h2><p>方法执行完成，需要让断路器感知执行的结果。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 调用成功 让断路器感知</span>
circuitBreaker<span class="token punctuation">.</span><span class="token function">onResult</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> circuitBreaker<span class="token punctuation">.</span><span class="token function">getTimestampUnit</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>  
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="onresult" tabindex="-1"><a class="header-anchor" href="#onresult" aria-hidden="true">#</a> onResult</h3><p>可以看到，核心的代码在stateReference的onError和onSuccess方法，里面会记录调用的情况，根据调用的情况进行状态的转换。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CircuitBreakerStateMachine</span>：
  
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onResult</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果记录结果</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> circuitBreakerConfig<span class="token punctuation">.</span><span class="token function">getRecordResultPredicate</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">test</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token constant">LOG</span><span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;CircuitBreaker &#39;{}&#39; recorded a result type &#39;{}&#39; as failure:&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">,</span> result<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ResultRecordedAsFailureException</span> failure <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ResultRecordedAsFailureException</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> result<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">publishCircuitErrorEvent</span><span class="token punctuation">(</span>name<span class="token punctuation">,</span> duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> failure<span class="token punctuation">)</span><span class="token punctuation">;</span>
        
      	<span class="token comment">// 记录调用指标 并检查是否需要过渡状态</span>
        stateReference<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> failure<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token function">onSuccess</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token function">handlePossibleTransition</span><span class="token punctuation">(</span><span class="token class-name">Either</span><span class="token punctuation">.</span><span class="token function">left</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onSuccess</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token constant">LOG</span><span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;CircuitBreaker &#39;{}&#39; succeeded:&quot;</span><span class="token punctuation">,</span> name<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 发布成功事件</span>
    <span class="token function">publishSuccessEvent</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
    <span class="token comment">// 记录调用指标 并检查是否需要过渡状态</span>
    stateReference<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">onSuccess</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="onerror" tabindex="-1"><a class="header-anchor" href="#onerror" aria-hidden="true">#</a> onError</h3><p>onError的作用就是感知方法调用后，是否应该切换状态。</p><p>关闭状态下，会根据调用失败率判断，是否转为open状态。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">ClosedState</span>：
  
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 首先记录失败调用 然后检查是超过阀值 否需要过渡到打开状态</span>
    <span class="token function">checkIfThresholdsExceeded</span><span class="token punctuation">(</span>circuitBreakerMetrics<span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">checkIfThresholdsExceeded</span><span class="token punctuation">(</span><span class="token class-name">Result</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果失败率或慢调用率超过阈值 并且当前状态是关闭状态</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">hasExceededThresholds</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> isClosed<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token comment">// 发布阈值超过事件</span>
      <span class="token function">publishCircuitThresholdsExceededEvent</span><span class="token punctuation">(</span>result<span class="token punctuation">,</span> circuitBreakerMetrics<span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      <span class="token comment">// 过渡到打开状态</span>
      <span class="token function">transitionToOpenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>半开状态下，会根据失败率判断，是否转为open状态或者关闭状态。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
   <span class="token comment">// 首先记录失败调用 然后检查是超过阀值 否需要过渡到打开状态或者关闭状态</span>
   <span class="token function">checkIfThresholdsExceeded</span><span class="token punctuation">(</span>circuitBreakerMetrics<span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">checkIfThresholdsExceeded</span><span class="token punctuation">(</span><span class="token class-name">Result</span> result<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果失败率或慢调用率超过阈值 并且当前状态是半开状态 转为打开状态</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token function">hasExceededThresholds</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> isHalfOpen<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">transitionToOpenState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 如果失败率低于阀值 转为关闭状态</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>result <span class="token operator">==</span> <span class="token constant">BELOW_THRESHOLDS</span> <span class="token operator">&amp;&amp;</span> isHalfOpen<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">transitionToClosedState</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打开状态下直接记录指标，不需要进行状态的切换。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Throwable</span> throwable<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    circuitBreakerMetrics<span class="token punctuation">.</span><span class="token function">onError</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，无论哪个状态都是根据circuitBreakerMetrics.onError方法记录了方法调用后的信息进行判断的。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CircuitBreakerMetrics</span><span class="token operator">:</span>

<span class="token comment">// 记录error信息</span>
<span class="token keyword">public</span> <span class="token class-name">Result</span> <span class="token function">onError</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token comment">// 记录指标快照</span>
    <span class="token class-name">Snapshot</span> snapshot<span class="token punctuation">;</span>
  
    <span class="token keyword">if</span> <span class="token punctuation">(</span>durationUnit<span class="token punctuation">.</span><span class="token function">toNanos</span><span class="token punctuation">(</span>duration<span class="token punctuation">)</span> <span class="token operator">&gt;</span> slowCallDurationThresholdInNanos<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 记录慢速调用</span>
        snapshot <span class="token operator">=</span> metrics<span class="token punctuation">.</span><span class="token function">record</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Outcome</span><span class="token punctuation">.</span><span class="token constant">SLOW_ERROR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// 记录失败调用</span>
        snapshot <span class="token operator">=</span> metrics<span class="token punctuation">.</span><span class="token function">record</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Outcome</span><span class="token punctuation">.</span><span class="token constant">ERROR</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 检查故障率是否高于阈值或慢速调用百分比是否高于阈值</span>
    <span class="token keyword">return</span> <span class="token function">checkIfThresholdsExceeded</span><span class="token punctuation">(</span>snapshot<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token doc-comment comment">/**
  * 检查故障率是否高于阈值或慢速调用百分比是否高于阈值
  */</span>
<span class="token keyword">private</span> <span class="token class-name">Result</span> <span class="token function">checkIfThresholdsExceeded</span><span class="token punctuation">(</span><span class="token class-name">Snapshot</span> snapshot<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  			<span class="token comment">// 获取失败率</span>
        <span class="token keyword">float</span> failureRateInPercentage <span class="token operator">=</span> <span class="token function">getFailureRate</span><span class="token punctuation">(</span>snapshot<span class="token punctuation">)</span><span class="token punctuation">;</span>
  			<span class="token comment">// 获取慢调用速率</span>
        <span class="token keyword">float</span> slowCallsInPercentage <span class="token operator">=</span> <span class="token function">getSlowCallRate</span><span class="token punctuation">(</span>snapshot<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 低于最低调用次数阈值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>failureRateInPercentage <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span> <span class="token operator">||</span> slowCallsInPercentage <span class="token operator">==</span> <span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token constant">BELOW_MINIMUM_CALLS_THRESHOLD</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 故障率和慢速调用率都超过阈值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>failureRateInPercentage <span class="token operator">&gt;=</span> failureRateThreshold
            <span class="token operator">&amp;&amp;</span> slowCallsInPercentage <span class="token operator">&gt;=</span> slowCallRateThreshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token constant">ABOVE_THRESHOLDS</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 故障率超过阈值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>failureRateInPercentage <span class="token operator">&gt;=</span> failureRateThreshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token constant">FAILURE_RATE_ABOVE_THRESHOLDS</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 慢速调用率超过阈值</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>slowCallsInPercentage <span class="token operator">&gt;=</span> slowCallRateThreshold<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token constant">SLOW_CALL_RATE_ABOVE_THRESHOLDS</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 故障率低于阈值</span>
        <span class="token keyword">return</span> <span class="token class-name">Result</span><span class="token punctuation">.</span><span class="token constant">BELOW_THRESHOLDS</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>其中Metrics记录了调用失败的指标，CircuitBreakerMetrics便是根据Metrics返回的指标判断结果的状态。</p><p>Metrics有两个实现类，分别是基于固定计数的滑动窗口的算法，和基于时间的滑动窗口算法实现。</p><p>一个是基于请求纬度，一个是基于时间维度。</p><p>FixedSizeSlidingWindowMetrics是基于固定计数的滑动窗口算法，实现也很简单，使用滚动数组，每次在总聚合中清除旧的bucket数据，记录最新的调用指标。即每次统计最近n次调用。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">FixedSizeSlidingWindowMetrics</span><span class="token operator">:</span>

<span class="token comment">// 记录调用失败的指标</span>
<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token class-name">Snapshot</span> <span class="token function">record</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Outcome</span> outcome<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 记录到总聚合中</span>
    totalAggregation<span class="token punctuation">.</span><span class="token function">record</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> outcome<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
    <span class="token comment">// 移动窗口并记录到最新的bucket中</span>
    <span class="token function">moveWindowByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">record</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> outcome<span class="token punctuation">)</span><span class="token punctuation">;</span>
  
    <span class="token comment">// 返回快照</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SnapshotImpl</span><span class="token punctuation">(</span>totalAggregation<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">// 移动窗口并移除旧的指标</span>
<span class="token keyword">private</span> <span class="token class-name">Measurement</span> <span class="token function">moveWindowByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 移动headIndex到下一个bucket</span>
        <span class="token function">moveHeadIndexByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 移除最新的bucket</span>
        <span class="token class-name">Measurement</span> latestMeasurement <span class="token operator">=</span> <span class="token function">getLatestMeasurement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 从总聚合中移除最新的bucket</span>
        totalAggregation<span class="token punctuation">.</span><span class="token function">removeBucket</span><span class="token punctuation">(</span>latestMeasurement<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 重置最新的bucket</span>
        latestMeasurement<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">return</span> latestMeasurement<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">private</span> <span class="token class-name">Measurement</span> <span class="token function">getLatestMeasurement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> measurements<span class="token punctuation">[</span>headIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

  
<span class="token keyword">void</span> <span class="token function">moveHeadIndexByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
   	<span class="token keyword">this</span><span class="token punctuation">.</span>headIndex <span class="token operator">=</span> <span class="token punctuation">(</span>headIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> windowSize<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>SlidingTimeWindowMetrics是基于时间窗口的，和上面的区别在于移动指针清除旧数据的逻辑。即统计时间区间内的调用。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">SlidingTimeWindowMetrics</span><span class="token operator">:</span>

<span class="token keyword">public</span> <span class="token keyword">synchronized</span> <span class="token class-name">Snapshot</span> <span class="token function">record</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Outcome</span> outcome<span class="token punctuation">)</span> <span class="token punctuation">{</span>
  	<span class="token comment">// 记录总聚合</span>
    totalAggregation<span class="token punctuation">.</span><span class="token function">record</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> outcome<span class="token punctuation">)</span><span class="token punctuation">;</span>
  	<span class="token comment">// 移动窗口并记录到最新的bucket中</span>
    <span class="token function">moveWindowToCurrentEpochSecond</span><span class="token punctuation">(</span><span class="token function">getLatestPartialAggregation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">.</span><span class="token function">record</span><span class="token punctuation">(</span>duration<span class="token punctuation">,</span> durationUnit<span class="token punctuation">,</span> outcome<span class="token punctuation">)</span><span class="token punctuation">;</span>
  	 <span class="token comment">// 返回快照</span>
    <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">SnapshotImpl</span><span class="token punctuation">(</span>totalAggregation<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">private</span> <span class="token class-name">PartialAggregation</span> <span class="token function">moveWindowToCurrentEpochSecond</span><span class="token punctuation">(</span>
        <span class="token class-name">PartialAggregation</span> latestPartialAggregation<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 取当前时钟的时间，并将其转换为从 1970 年 1 月 1 日 00:00:00 UTC 开始计算的秒数</span>
        <span class="token keyword">long</span> currentEpochSecond <span class="token operator">=</span> clock<span class="token punctuation">.</span><span class="token function">instant</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 差异秒数</span>
        <span class="token keyword">long</span> differenceInSeconds <span class="token operator">=</span> currentEpochSecond <span class="token operator">-</span> latestPartialAggregation<span class="token punctuation">.</span><span class="token function">getEpochSecond</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>differenceInSeconds <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">return</span> latestPartialAggregation<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// 需要移动的秒数</span>
        <span class="token keyword">long</span> secondsToMoveTheWindow <span class="token operator">=</span> <span class="token class-name">Math</span><span class="token punctuation">.</span><span class="token function">min</span><span class="token punctuation">(</span>differenceInSeconds<span class="token punctuation">,</span> timeWindowSizeInSeconds<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">PartialAggregation</span> currentPartialAggregation<span class="token punctuation">;</span>
        <span class="token keyword">do</span> <span class="token punctuation">{</span>
            <span class="token comment">// 移动头指针</span>
            secondsToMoveTheWindow<span class="token operator">--</span><span class="token punctuation">;</span>
            <span class="token function">moveHeadIndexByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 获取最新的 PartialAggregation</span>
            currentPartialAggregation <span class="token operator">=</span> <span class="token function">getLatestPartialAggregation</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 从总聚合中移除当前 PartialAggregation</span>
            totalAggregation<span class="token punctuation">.</span><span class="token function">removeBucket</span><span class="token punctuation">(</span>currentPartialAggregation<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 重置当前的 PartialAggregation 并设置当前对应的秒数</span>
            currentPartialAggregation<span class="token punctuation">.</span><span class="token function">reset</span><span class="token punctuation">(</span>currentEpochSecond <span class="token operator">-</span> secondsToMoveTheWindow<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">while</span> <span class="token punctuation">(</span>secondsToMoveTheWindow <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> currentPartialAggregation<span class="token punctuation">;</span>
<span class="token punctuation">}</span>


<span class="token keyword">private</span> <span class="token class-name">PartialAggregation</span> <span class="token function">getLatestPartialAggregation</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> partialAggregations<span class="token punctuation">[</span>headIndex<span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">void</span> <span class="token function">moveHeadIndexByOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
     <span class="token keyword">this</span><span class="token punctuation">.</span>headIndex <span class="token operator">=</span> <span class="token punctuation">(</span>headIndex <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token operator">%</span> timeWindowSizeInSeconds<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>从moveWindowToCurrentEpochSecond和moveWindowByOne可以看到两种实现的区别。</p><p>AbstractAggregation的record方法记录了调用的失败信息。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AbstractAggregation</span><span class="token operator">:</span>
<span class="token keyword">void</span> <span class="token function">record</span><span class="token punctuation">(</span><span class="token keyword">long</span> duration<span class="token punctuation">,</span> <span class="token class-name">TimeUnit</span> durationUnit<span class="token punctuation">,</span> <span class="token class-name">Metrics<span class="token punctuation">.</span>Outcome</span> outcome<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 调用次数递增</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>numberOfCalls<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token comment">// 总调用时长</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>totalDurationInMillis <span class="token operator">+=</span> durationUnit<span class="token punctuation">.</span><span class="token function">toMillis</span><span class="token punctuation">(</span>duration<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">switch</span> <span class="token punctuation">(</span>outcome<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">case</span> <span class="token constant">SLOW_SUCCESS</span><span class="token operator">:</span>
            <span class="token comment">// 慢调用次数加一</span>
            numberOfSlowCalls<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token keyword">case</span> <span class="token constant">SLOW_ERROR</span><span class="token operator">:</span>
            <span class="token comment">// 慢调用次数加一</span>
            numberOfSlowCalls<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">// 调用失败次数加一</span>
            numberOfFailedCalls<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token comment">// 慢调用失败次数加一</span>
            numberOfSlowFailedCalls<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token keyword">case</span> <span class="token constant">ERROR</span><span class="token operator">:</span>
            <span class="token comment">// 调用失败次数加一</span>
            numberOfFailedCalls<span class="token operator">++</span><span class="token punctuation">;</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>

        <span class="token keyword">default</span><span class="token operator">:</span>
            <span class="token keyword">break</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="onsuccess" tabindex="-1"><a class="header-anchor" href="#onsuccess" aria-hidden="true">#</a> onSuccess</h3><p>onSuccess同理。记录窗口内调用的情况，根据失败率判断是否需要切换状态。</p>`,52),c=[p];function o(i,l){return s(),a("div",null,c)}const r=n(e,[["render",o],["__file","1.resilience4j-circuit-breaker.html.vue"]]);export{r as default};
