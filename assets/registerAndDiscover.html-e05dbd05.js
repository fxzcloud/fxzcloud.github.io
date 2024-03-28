import{_ as n,V as s,W as a,$ as t}from"./framework-159025ca.js";const e={},p=t(`<blockquote><p>本文只讨论spring cloud commons中关于服务注册、服务发现的规范定义以及spring cloud alibaba中nacos相应实现。关于nacos client以及 nacos service 中服务注册、发现的实现细节在nacos相关文章中分析。</p></blockquote><h1 id="spring-cloud-服务注册和发现" tabindex="-1"><a class="header-anchor" href="#spring-cloud-服务注册和发现" aria-hidden="true">#</a> spring cloud 服务注册和发现</h1><h2 id="sc-服务注册概述" tabindex="-1"><a class="header-anchor" href="#sc-服务注册概述" aria-hidden="true">#</a> SC 服务注册概述</h2><p>以下都是spring cloud commons定义的服务注册的规范接口。</p><ul><li><p><code>ServiceInstance</code> 表示的是服务发现中的一个实例</p><p>这个接口定义了类似于<code>getHost</code>,<code>getIp</code>获取注册实例host，ip等方法。</p></li><li><p><code>Registration</code>一个标记接口，<code>ServiceRegistry&lt;R&gt;</code>这里面的R泛型就是<code>Registration</code></p><p>是springcloud定义的规范接口。</p></li><li><p><code>ServiceRegistry</code> 服务注册，定义如何向注册中心进行注册，和取消注册</p><p>这个接口定义了<code>register服务注册</code>,<code>deregister服务取消注册</code>等方法，入参是<code>Registration</code>。它是springcloud定义的规范接口。</p></li><li><p>AutoServiceRegistration 标识应用自动进行服务注册的接口，是springcloud定义的规范接口。</p></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 表示系统中服务的实例。
 *
 * <span class="token keyword">@author</span> Spencer Gibb
 * <span class="token keyword">@author</span> Tim Ysewyn
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ServiceInstance</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The unique instance ID as registered.
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">String</span> <span class="token function">getInstanceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The service ID as registered.
     */</span>
    <span class="token class-name">String</span> <span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The hostname of the registered service instance.
     */</span>
    <span class="token class-name">String</span> <span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The port of the registered service instance.
     */</span>
    <span class="token keyword">int</span> <span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> Whether the port of the registered service instance uses HTTPS.
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">isSecure</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The service URI address.
     */</span>
    <span class="token class-name">URI</span> <span class="token function">getUri</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The key / value pair metadata associated with the service instance.
     */</span>
    <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The scheme of the service instance.
     */</span>
    <span class="token keyword">default</span> <span class="token class-name">String</span> <span class="token function">getScheme</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span> 使用的标记接口。
 *
 * <span class="token keyword">@author</span> Spencer Gibb
 * <span class="token keyword">@since</span> 1.2.0
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">Registration</span> <span class="token keyword">extends</span> <span class="token class-name">ServiceInstance</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 向 Service Registry 注册和注销实例的接口。
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>R<span class="token punctuation">&gt;</span></span> registration meta data
 * <span class="token keyword">@author</span> Spencer Gibb
 * <span class="token keyword">@since</span> 1.2.0
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span> <span class="token keyword">extends</span> <span class="token class-name">Registration</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * Registers the registration. A registration typically has information about an
     * instance, such as its hostname and port.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">registration</span> registration meta data
     */</span>
    <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">R</span> registration<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Deregisters the registration.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">registration</span> registration meta data
     */</span>
    <span class="token keyword">void</span> <span class="token function">deregister</span><span class="token punctuation">(</span><span class="token class-name">R</span> registration<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Closes the ServiceRegistry. This is a lifecycle method.
     */</span>
    <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Sets the status of the registration. The status values are determined by the
     * individual implementations.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">registration</span> The registration to update.
     * <span class="token keyword">@param</span> <span class="token parameter">status</span>       The status to set.
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>client<span class="token punctuation">.</span>serviceregistry<span class="token punctuation">.</span>endpoint<span class="token punctuation">.</span></span><span class="token class-name">ServiceRegistryEndpoint</span></span>
     */</span>
    <span class="token keyword">void</span> <span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">R</span> registration<span class="token punctuation">,</span> <span class="token class-name">String</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Gets the status of a particular registration.
     *
     * <span class="token keyword">@param</span> <span class="token parameter">registration</span> The registration to query.
     * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>T<span class="token punctuation">&gt;</span></span>          The type of the status.
     * <span class="token keyword">@return</span> The status of the registration.
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>cloud<span class="token punctuation">.</span>client<span class="token punctuation">.</span>serviceregistry<span class="token punctuation">.</span>endpoint<span class="token punctuation">.</span></span><span class="token class-name">ServiceRegistryEndpoint</span></span>
     */</span>
    <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">&gt;</span></span> <span class="token class-name">T</span> <span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token class-name">R</span> registration<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">AutoServiceRegistration</span> <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">AutoServiceRegistration</span></span><span class="token punctuation">}</span> 抽象模版方法。监听事件，回调注册方法。
 * <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>
 * TODO: Document the lifecycle.
 *
 * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">&lt;</span>R<span class="token punctuation">&gt;</span></span> Registration type passed to the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span>.
 * <span class="token keyword">@author</span> Spencer Gibb
 */</span>
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractAutoServiceRegistration</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span> <span class="token keyword">extends</span> <span class="token class-name">Registration</span><span class="token punctuation">&gt;</span></span>
       <span class="token keyword">implements</span> <span class="token class-name">AutoServiceRegistration</span><span class="token punctuation">,</span> <span class="token class-name">ApplicationContextAware</span><span class="token punctuation">,</span> <span class="token class-name">ApplicationListener</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">WebServerInitializedEvent</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Log</span> logger <span class="token operator">=</span> <span class="token class-name">LogFactory</span><span class="token punctuation">.</span><span class="token function">getLog</span><span class="token punctuation">(</span><span class="token class-name">AbstractAutoServiceRegistration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> serviceRegistry<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">boolean</span> autoStartup <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">AtomicBoolean</span> running <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicBoolean</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">int</span> order <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">ApplicationContext</span> context<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">Environment</span> environment<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">AtomicInteger</span> port <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">AtomicInteger</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">AutoServiceRegistrationProperties</span> properties<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">AbstractAutoServiceRegistration</span><span class="token punctuation">(</span><span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> serviceRegistry<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry <span class="token operator">=</span> serviceRegistry<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">AbstractAutoServiceRegistration</span><span class="token punctuation">(</span><span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> serviceRegistry<span class="token punctuation">,</span>
                                    <span class="token class-name">AutoServiceRegistrationProperties</span> properties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry <span class="token operator">=</span> serviceRegistry<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>properties <span class="token operator">=</span> properties<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">ApplicationContext</span> <span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 自动服务注册的入口 监听<span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">WebServerInitializedEvent</span></span><span class="token punctuation">}</span>
     *
     * <span class="token keyword">@param</span> <span class="token parameter">event</span> the event to respond to
     */</span>
    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;deprecation&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onApplicationEvent</span><span class="token punctuation">(</span><span class="token class-name">WebServerInitializedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">bind</span><span class="token punctuation">(</span>event<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">bind</span><span class="token punctuation">(</span><span class="token class-name">WebServerInitializedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">ApplicationContext</span> context <span class="token operator">=</span> event<span class="token punctuation">.</span><span class="token function">getApplicationContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>context <span class="token keyword">instanceof</span> <span class="token class-name">ConfigurableWebServerApplicationContext</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token string">&quot;management&quot;</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">ConfigurableWebServerApplicationContext</span><span class="token punctuation">)</span> context<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getServerNamespace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token keyword">return</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>port<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> event<span class="token punctuation">.</span><span class="token function">getWebServer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setApplicationContext</span><span class="token punctuation">(</span><span class="token class-name">ApplicationContext</span> applicationContext<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeansException</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>context <span class="token operator">=</span> applicationContext<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>environment <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span><span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">Environment</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>environment<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">AtomicInteger</span> <span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>port<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isAutoStartup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>autoStartup<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isDebugEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             logger<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Discovery Lifecycle disabled. Not starting&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token comment">// only initialize if nonSecurePort is greater than 0 and it isn&#39;t already running</span>
       <span class="token comment">// because of containerPortInitializer below</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InstancePreRegisteredEvent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token comment">// 注册服务</span>
          <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldRegisterManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token function">registerManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

          <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span><span class="token function">publishEvent</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">InstanceRegisteredEvent</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">,</span> <span class="token function">getConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> Whether the management service should be registered with the
     * <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span>.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">shouldRegisterManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>properties <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token keyword">this</span><span class="token punctuation">.</span>properties<span class="token punctuation">.</span><span class="token function">isRegisterManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token function">getManagementPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> <span class="token class-name">ManagementServerPortUtils</span><span class="token punctuation">.</span><span class="token function">isDifferent</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The object used to configure the registration.
     */</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token class-name">Object</span> <span class="token function">getConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> True, if this is enabled.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The serviceId of the Management Service.
     */</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getManagementServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// TODO: configurable management suffix</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">.</span><span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;:management&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The service name of the Management Service.
     */</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getManagementServiceName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// TODO: configurable management suffix</span>
       <span class="token keyword">return</span> <span class="token function">getAppName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;:management&quot;</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The management server port.
     */</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">Integer</span> <span class="token function">getManagementPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token class-name">ManagementServerPortUtils</span><span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> The app name (currently the spring.application.name property).
     */</span>
    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getAppName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>environment<span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.application.name&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;application&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@PreDestroy</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">destroy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">isRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">AtomicBoolean</span> <span class="token function">getRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>running<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>order<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">getPhase</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">R</span><span class="token punctuation">&gt;</span></span> <span class="token function">getServiceRegistry</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token class-name">R</span> <span class="token function">getRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">protected</span> <span class="token keyword">abstract</span> <span class="token class-name">R</span> <span class="token function">getManagementRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Register the local service with the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span>.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token function">getRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Register the local management service with the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span>.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">registerManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">R</span> registration <span class="token operator">=</span> <span class="token function">getManagementRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>registration <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry<span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span>registration<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * De-register the local service with the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span>.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">deregister</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry<span class="token punctuation">.</span><span class="token function">deregister</span><span class="token punctuation">(</span><span class="token function">getRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * De-register the local management service with the <span class="token punctuation">{</span><span class="token keyword">@link</span> <span class="token reference"><span class="token class-name">ServiceRegistry</span></span><span class="token punctuation">}</span>.
     */</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">deregisterManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">R</span> registration <span class="token operator">=</span> <span class="token function">getManagementRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>registration <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry<span class="token punctuation">.</span><span class="token function">deregister</span><span class="token punctuation">(</span>registration<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getRunning</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">compareAndSet</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">deregister</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">shouldRegisterManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token function">deregisterManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>serviceRegistry<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sca-服务注册概述" tabindex="-1"><a class="header-anchor" href="#sca-服务注册概述" aria-hidden="true">#</a> SCA 服务注册概述</h2><p>以下都是spring cloud alibaba实现的服务注册的规范接口。</p><ul><li><p><code>NacosServiceInstance</code> 表示的是服务发现中的一个实例</p><p>这个接口定义了类似于<code>getHost</code>,<code>getIp</code>获取注册实例host，ip等方法。</p></li><li><p><code>NacosRegistration</code>一个标记接口，标识服务注册实例。</p></li><li><p><code>NacosServiceRegistry</code> 服务注册，定义如何向注册中心进行注册，和取消注册。</p></li><li><p><code>NacosAutoServiceRegistration</code> 标识应用自动进行服务注册的接口。</p></li></ul><h3 id="自动配置类" tabindex="-1"><a class="header-anchor" href="#自动配置类" aria-hidden="true">#</a> 自动配置类</h3><p>NacosServiceRegistryAutoConfiguration向容器中注入了nacos关于服务注册的实现、nacos注册服务实例和nacos服务自动注册对象。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token annotation punctuation">@Configuration</span><span class="token punctuation">(</span>proxyBeanMethods <span class="token operator">=</span> <span class="token boolean">false</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@EnableConfigurationProperties</span>
<span class="token annotation punctuation">@ConditionalOnNacosDiscoveryEnabled</span>
<span class="token annotation punctuation">@ConditionalOnProperty</span><span class="token punctuation">(</span>value <span class="token operator">=</span> <span class="token string">&quot;spring.cloud.service-registry.auto-registration.enabled&quot;</span><span class="token punctuation">,</span>
       matchIfMissing <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@AutoConfigureAfter</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token class-name">AutoServiceRegistrationConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
       <span class="token class-name">AutoServiceRegistrationAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span>
       <span class="token class-name">NacosDiscoveryAutoConfiguration</span><span class="token punctuation">.</span><span class="token keyword">class</span> <span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosServiceRegistryAutoConfiguration</span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">NacosServiceRegistry</span> <span class="token function">nacosServiceRegistry</span><span class="token punctuation">(</span>
          <span class="token class-name">NacosServiceManager</span> nacosServiceManager<span class="token punctuation">,</span>
          <span class="token class-name">NacosDiscoveryProperties</span> nacosDiscoveryProperties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NacosServiceRegistry</span><span class="token punctuation">(</span>nacosServiceManager<span class="token punctuation">,</span> nacosDiscoveryProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnBean</span><span class="token punctuation">(</span><span class="token class-name">AutoServiceRegistrationProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">NacosRegistration</span> <span class="token function">nacosRegistration</span><span class="token punctuation">(</span>
          <span class="token class-name">ObjectProvider</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">List</span><span class="token punctuation">&lt;</span><span class="token class-name">NacosRegistrationCustomizer</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> registrationCustomizers<span class="token punctuation">,</span>
          <span class="token class-name">NacosDiscoveryProperties</span> nacosDiscoveryProperties<span class="token punctuation">,</span>
          <span class="token class-name">ApplicationContext</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NacosRegistration</span><span class="token punctuation">(</span>registrationCustomizers<span class="token punctuation">.</span><span class="token function">getIfAvailable</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
             nacosDiscoveryProperties<span class="token punctuation">,</span> context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  	<span class="token comment">// 这也是为什么会自动注册服务的原因</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token annotation punctuation">@ConditionalOnBean</span><span class="token punctuation">(</span><span class="token class-name">AutoServiceRegistrationProperties</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
    <span class="token keyword">public</span> <span class="token class-name">NacosAutoServiceRegistration</span> <span class="token function">nacosAutoServiceRegistration</span><span class="token punctuation">(</span>
          <span class="token class-name">NacosServiceRegistry</span> registry<span class="token punctuation">,</span>
          <span class="token class-name">AutoServiceRegistrationProperties</span> autoServiceRegistrationProperties<span class="token punctuation">,</span>
          <span class="token class-name">NacosRegistration</span> registration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">NacosAutoServiceRegistration</span><span class="token punctuation">(</span>registry<span class="token punctuation">,</span>
             autoServiceRegistrationProperties<span class="token punctuation">,</span> registration<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="服务注册" tabindex="-1"><a class="header-anchor" href="#服务注册" aria-hidden="true">#</a> 服务注册</h3><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>
<span class="token doc-comment comment">/**
 * 自动注册nacos服务
 * <span class="token keyword">@author</span> xiaojing
 * <span class="token keyword">@author</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mailto:mercyblitz@gmail.com<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Mercy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosAutoServiceRegistration</span>
       <span class="token keyword">extends</span> <span class="token class-name">AbstractAutoServiceRegistration</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Registration</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span>
          <span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">NacosAutoServiceRegistration</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">NacosRegistration</span> registration<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NacosAutoServiceRegistration</span><span class="token punctuation">(</span><span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Registration</span><span class="token punctuation">&gt;</span></span> serviceRegistry<span class="token punctuation">,</span>
          <span class="token class-name">AutoServiceRegistrationProperties</span> autoServiceRegistrationProperties<span class="token punctuation">,</span>
          <span class="token class-name">NacosRegistration</span> registration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">super</span><span class="token punctuation">(</span>serviceRegistry<span class="token punctuation">,</span> autoServiceRegistrationProperties<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>registration <span class="token operator">=</span> registration<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Deprecated</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setPort</span><span class="token punctuation">(</span><span class="token keyword">int</span> port<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>port<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">NacosRegistration</span> <span class="token function">getRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token class-name">Assert</span><span class="token punctuation">.</span><span class="token function">isTrue</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token string">&quot;service.port has not been set&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">NacosRegistration</span> <span class="token function">getManagementRegistration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token comment">// 检查是否开启服务自动注册</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getNacosDiscoveryProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isRegisterEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">debug</span><span class="token punctuation">(</span><span class="token string">&quot;Registration disabled.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&lt;</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token comment">// 注册服务</span>
       <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">register</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">registerManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getNacosDiscoveryProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isRegisterEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">registerManagement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">getConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getNacosDiscoveryProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>registration<span class="token punctuation">.</span><span class="token function">getNacosDiscoveryProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">isRegisterEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token annotation punctuation">@SuppressWarnings</span><span class="token punctuation">(</span><span class="token string">&quot;deprecation&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">protected</span> <span class="token class-name">String</span> <span class="token function">getAppName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">String</span> appName <span class="token operator">=</span> registration<span class="token punctuation">.</span><span class="token function">getNacosDiscoveryProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>appName<span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">getAppName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> appName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@EventListener</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">onNacosDiscoveryInfoChangedEvent</span><span class="token punctuation">(</span><span class="token class-name">NacosDiscoveryInfoChangedEvent</span> event<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">void</span> <span class="token function">restart</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">stop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span><span class="token function">start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>NacosServiceRegistry核心是使用了nacos client的NamingService进行服务注册。</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> xiaojing
 * <span class="token keyword">@author</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mailto:mercyblitz@gmail.com<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>Mercy<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
 * <span class="token keyword">@author</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mailto:78552423@qq.com<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>eshun<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
 * <span class="token keyword">@author</span> JAY
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosServiceRegistry</span> <span class="token keyword">implements</span> <span class="token class-name">ServiceRegistry</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Registration</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">STATUS_UP</span> <span class="token operator">=</span> <span class="token string">&quot;UP&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">STATUS_DOWN</span> <span class="token operator">=</span> <span class="token string">&quot;DOWN&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">NacosServiceRegistry</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">NacosDiscoveryProperties</span> nacosDiscoveryProperties<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">NacosServiceManager</span> nacosServiceManager<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NacosServiceRegistry</span><span class="token punctuation">(</span><span class="token class-name">NacosServiceManager</span> nacosServiceManager<span class="token punctuation">,</span>
          <span class="token class-name">NacosDiscoveryProperties</span> nacosDiscoveryProperties<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>nacosDiscoveryProperties <span class="token operator">=</span> nacosDiscoveryProperties<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>nacosServiceManager <span class="token operator">=</span> nacosServiceManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">register</span><span class="token punctuation">(</span><span class="token class-name">Registration</span> registration<span class="token punctuation">)</span> <span class="token punctuation">{</span>

       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>registration<span class="token punctuation">.</span><span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&quot;No service to register for nacos client...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token class-name">NamingService</span> namingService <span class="token operator">=</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> serviceId <span class="token operator">=</span> registration<span class="token punctuation">.</span><span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> group <span class="token operator">=</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">Instance</span> instance <span class="token operator">=</span> <span class="token function">getNacosInstanceFromRegistration</span><span class="token punctuation">(</span>registration<span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          namingService<span class="token punctuation">.</span><span class="token function">registerInstance</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">,</span> group<span class="token punctuation">,</span> instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
          log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;nacos registry, {} {} {}:{} register finished&quot;</span><span class="token punctuation">,</span> group<span class="token punctuation">,</span> serviceId<span class="token punctuation">,</span>
                instance<span class="token punctuation">.</span><span class="token function">getIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">isFailFast</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;nacos registry, {} register failed...{},&quot;</span><span class="token punctuation">,</span> serviceId<span class="token punctuation">,</span>
                   registration<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token function">rethrowRuntimeException</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">else</span> <span class="token punctuation">{</span>
             log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&quot;Failfast is false. {} register failed...{},&quot;</span><span class="token punctuation">,</span> serviceId<span class="token punctuation">,</span>
                   registration<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">deregister</span><span class="token punctuation">(</span><span class="token class-name">Registration</span> registration<span class="token punctuation">)</span> <span class="token punctuation">{</span>

       log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;De-registering from Nacos Server now...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span>registration<span class="token punctuation">.</span><span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&quot;No dom to de-register for nacos client...&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token class-name">NamingService</span> namingService <span class="token operator">=</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> serviceId <span class="token operator">=</span> registration<span class="token punctuation">.</span><span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> group <span class="token operator">=</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          namingService<span class="token punctuation">.</span><span class="token function">deregisterInstance</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">,</span> group<span class="token punctuation">,</span> registration<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
                registration<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getClusterName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;ERR_NACOS_DEREGISTER, de-register failed...{},&quot;</span><span class="token punctuation">,</span>
                registration<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       log<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;De-registration finished.&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          nacosServiceManager<span class="token punctuation">.</span><span class="token function">nacosServiceShutDown</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">NacosException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;Nacos namingService shutDown failed&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setStatus</span><span class="token punctuation">(</span><span class="token class-name">Registration</span> registration<span class="token punctuation">,</span> <span class="token class-name">String</span> status<span class="token punctuation">)</span> <span class="token punctuation">{</span>

       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token constant">STATUS_UP</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span>
             <span class="token operator">&amp;&amp;</span> <span class="token operator">!</span><span class="token constant">STATUS_DOWN</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">warn</span><span class="token punctuation">(</span><span class="token string">&quot;can&#39;t support status {},please choose UP or DOWN&quot;</span><span class="token punctuation">,</span> status<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token class-name">String</span> serviceId <span class="token operator">=</span> registration<span class="token punctuation">.</span><span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">Instance</span> instance <span class="token operator">=</span> <span class="token function">getNacosInstanceFromRegistration</span><span class="token punctuation">(</span>registration<span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token constant">STATUS_DOWN</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>status<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          instance<span class="token punctuation">.</span><span class="token function">setEnabled</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">else</span> <span class="token punctuation">{</span>
          instance<span class="token punctuation">.</span><span class="token function">setEnabled</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token class-name">Properties</span> nacosProperties <span class="token operator">=</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getNacosProperties</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          nacosServiceManager<span class="token punctuation">.</span><span class="token function">getNamingMaintainService</span><span class="token punctuation">(</span>nacosProperties<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">updateInstance</span><span class="token punctuation">(</span>
                serviceId<span class="token punctuation">,</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span><span class="token string">&quot;update nacos instance status fail&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Object</span> <span class="token function">getStatus</span><span class="token punctuation">(</span><span class="token class-name">Registration</span> registration<span class="token punctuation">)</span> <span class="token punctuation">{</span>

       <span class="token class-name">String</span> serviceName <span class="token operator">=</span> registration<span class="token punctuation">.</span><span class="token function">getServiceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">String</span> group <span class="token operator">=</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Instance</span><span class="token punctuation">&gt;</span></span> instances <span class="token operator">=</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getAllInstances</span><span class="token punctuation">(</span>serviceName<span class="token punctuation">,</span>
                group<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Instance</span> instance <span class="token operator">:</span> instances<span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">equalsIgnoreCase</span><span class="token punctuation">(</span>nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                   <span class="token operator">&amp;&amp;</span> instance<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span> instance<span class="token punctuation">.</span><span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token constant">STATUS_UP</span> <span class="token operator">:</span> <span class="token constant">STATUS_DOWN</span><span class="token punctuation">;</span>
             <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;get all instance of {} error,&quot;</span><span class="token punctuation">,</span> serviceName<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">Instance</span> <span class="token function">getNacosInstanceFromRegistration</span><span class="token punctuation">(</span><span class="token class-name">Registration</span> registration<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">Instance</span> instance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Instance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setIp</span><span class="token punctuation">(</span>registration<span class="token punctuation">.</span><span class="token function">getHost</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span>registration<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setWeight</span><span class="token punctuation">(</span>nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getWeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setClusterName</span><span class="token punctuation">(</span>nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">getClusterName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setEnabled</span><span class="token punctuation">(</span>nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">isInstanceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setMetadata</span><span class="token punctuation">(</span>registration<span class="token punctuation">.</span><span class="token function">getMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       instance<span class="token punctuation">.</span><span class="token function">setEphemeral</span><span class="token punctuation">(</span>nacosDiscoveryProperties<span class="token punctuation">.</span><span class="token function">isEphemeral</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> instance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">NamingService</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> nacosServiceManager<span class="token punctuation">.</span><span class="token function">getNamingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>通过ServiceRegistry实现执行最终的服务注册。AbstractAutoServiceRegistration会在监听事件最终回调服务注册方法实现服务注册。</p><h1 id="spring-cloud-servicediscovery" tabindex="-1"><a class="header-anchor" href="#spring-cloud-servicediscovery" aria-hidden="true">#</a> Spring cloud servicediscovery</h1><h2 id="sc服务发现概述" tabindex="-1"><a class="header-anchor" href="#sc服务发现概述" aria-hidden="true">#</a> SC服务发现概述</h2><ul><li><code>DiscoveryClient</code>是一个用于服务发现的接口，它允许应用程序查询服务注册中心以获取可用的服务实例信息。DiscoveryClient是Spring Cloud对服务发现功能的抽象，它可以与各种不同的服务注册中心集成，并提供统一的API来进行服务发现操作。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 表示通常可用于发现服务的读取操作，例如 Netflix Eureka or consul.io.
 *
 * <span class="token keyword">@author</span> Spencer Gibb
 * <span class="token keyword">@author</span> Olga Maciaszek-Sharma
 * <span class="token keyword">@author</span> Chris Bono
 */</span>
<span class="token keyword">public</span> <span class="token keyword">interface</span> <span class="token class-name">DiscoveryClient</span> <span class="token keyword">extends</span> <span class="token class-name">Ordered</span> <span class="token punctuation">{</span>

    <span class="token keyword">int</span> <span class="token constant">DEFAULT_ORDER</span> <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>

    <span class="token class-name">String</span> <span class="token function">description</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 获取与特定 serviceId 关联的所有 ServiceInstances。
     * <span class="token keyword">@param</span> <span class="token parameter">serviceId</span> The serviceId to query.
     * <span class="token keyword">@return</span> A List of ServiceInstance.
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span> <span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token class-name">String</span> serviceId<span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * <span class="token keyword">@return</span> 所有已知的服务 ID。
     */</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">default</span> <span class="token keyword">void</span> <span class="token function">probe</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">default</span> <span class="token keyword">int</span> <span class="token function">getOrder</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token constant">DEFAULT_ORDER</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>EnableDiscoveryClient</code>作用就是import了EnableDiscoveryClientImportSelector。其中EnableDiscoveryClientImportSelector的作用： <ul><li>读取并注册 META-INF/spring.factories 中 key 是 <code>EnableDiscoveryClient.class.getName()</code> 的类信息。</li><li>配置服务自动注册的信息。</li></ul></li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token annotation punctuation">@Target</span><span class="token punctuation">(</span><span class="token class-name">ElementType</span><span class="token punctuation">.</span><span class="token constant">TYPE</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Retention</span><span class="token punctuation">(</span><span class="token class-name">RetentionPolicy</span><span class="token punctuation">.</span><span class="token constant">RUNTIME</span><span class="token punctuation">)</span>
<span class="token annotation punctuation">@Documented</span>
<span class="token annotation punctuation">@Inherited</span>
<span class="token annotation punctuation">@Import</span><span class="token punctuation">(</span><span class="token class-name">EnableDiscoveryClientImportSelector</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token annotation punctuation">@interface</span> <span class="token class-name">EnableDiscoveryClient</span> <span class="token punctuation">{</span>

    <span class="token doc-comment comment">/**
     * 如果为 true，ServiceRegistry 将自动注册本地服务器。
     * <span class="token keyword">@return</span> - <span class="token punctuation">{</span><span class="token keyword">@code</span> <span class="token code-section"><span class="token code language-java"><span class="token boolean">true</span></span></span><span class="token punctuation">}</span> 如果您想自动注册。
     */</span>
    <span class="token keyword">boolean</span> <span class="token function">autoRegister</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">default</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 作用一：读取并注册 META-INF/spring.factories 中 key 是 \`EnableDiscoveryClient.class.getName()\` 的类信息
 * 作用二：配置服务自动注册的信息
 * <span class="token keyword">@author</span> Spencer Gibb
 */</span>
<span class="token annotation punctuation">@Order</span><span class="token punctuation">(</span><span class="token class-name">Ordered</span><span class="token punctuation">.</span><span class="token constant">LOWEST_PRECEDENCE</span> <span class="token operator">-</span> <span class="token number">100</span><span class="token punctuation">)</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">EnableDiscoveryClientImportSelector</span> <span class="token keyword">extends</span> <span class="token class-name">SpringFactoryImportSelector</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">EnableDiscoveryClient</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token function">selectImports</span><span class="token punctuation">(</span><span class="token class-name">AnnotationMetadata</span> metadata<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token doc-comment comment">/**
        * 读取 META-INF/spring.factories 中 key 是 \`EnableDiscoveryClient.class.getName()\`
        * 的类信息
        */</span>
       <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> imports <span class="token operator">=</span> <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">selectImports</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">AnnotationAttributes</span> attributes <span class="token operator">=</span> <span class="token class-name">AnnotationAttributes</span>
             <span class="token punctuation">.</span><span class="token function">fromMap</span><span class="token punctuation">(</span>metadata<span class="token punctuation">.</span><span class="token function">getAnnotationAttributes</span><span class="token punctuation">(</span><span class="token function">getAnnotationClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token comment">// 注解的值是 true</span>
       <span class="token keyword">boolean</span> autoRegister <span class="token operator">=</span> attributes<span class="token punctuation">.</span><span class="token function">getBoolean</span><span class="token punctuation">(</span><span class="token string">&quot;autoRegister&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">if</span> <span class="token punctuation">(</span>autoRegister<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> importsList <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token class-name">Arrays</span><span class="token punctuation">.</span><span class="token function">asList</span><span class="token punctuation">(</span>imports<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token doc-comment comment">/**
           * 添加 AutoServiceRegistrationConfiguration 这个类，
           * 这个类的目的很简单，就是注册 AutoServiceRegistrationProperties 到BeanFactory中
           *        @EnableConfigurationProperties(AutoServiceRegistrationProperties.class)
           * */</span>
          importsList<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token string">&quot;org.springframework.cloud.client.serviceregistry.AutoServiceRegistrationConfiguration&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          imports <span class="token operator">=</span> importsList<span class="token punctuation">.</span><span class="token function">toArray</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token class-name">Environment</span> env <span class="token operator">=</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">ConfigurableEnvironment</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">.</span><span class="token function">isInstance</span><span class="token punctuation">(</span>env<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token class-name">ConfigurableEnvironment</span> configEnv <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">ConfigurableEnvironment</span><span class="token punctuation">)</span> env<span class="token punctuation">;</span>
             <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             map<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cloud.service-registry.auto-registration.enabled&quot;</span><span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token class-name">MapPropertySource</span> propertySource <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MapPropertySource</span><span class="token punctuation">(</span><span class="token string">&quot;springCloudDiscoveryClient&quot;</span><span class="token punctuation">,</span> map<span class="token punctuation">)</span><span class="token punctuation">;</span>
             configEnv<span class="token punctuation">.</span><span class="token function">getPropertySources</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">addLast</span><span class="token punctuation">(</span>propertySource<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>

       <span class="token punctuation">}</span>

       <span class="token keyword">return</span> imports<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token function">getEnvironment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getProperty</span><span class="token punctuation">(</span><span class="token string">&quot;spring.cloud.discovery.enabled&quot;</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token constant">TRUE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">protected</span> <span class="token keyword">boolean</span> <span class="token function">hasDefaultFactory</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="sca服务发现概述" tabindex="-1"><a class="header-anchor" href="#sca服务发现概述" aria-hidden="true">#</a> SCA服务发现概述</h2><p>spring cloud alibaba实现了spring cloud规范，本质上还是使用nacos client 中的<code>NamingService</code>进行服务发现，这里只分析nacos的规范实现，nacos的细节在nacos相关文章中分析。</p><ul><li><code>NacosDiscoveryClient</code>实现了DiscoveryClient，本质上是用自己实现的serviceDiscovery进行服务发现，然后使用ServiceCache进行服务的缓存，这样可以在服务发现出现异常得时候使用缓存进行容错。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> xiaojing
 * <span class="token keyword">@author</span> renhaojun
 * <span class="token keyword">@author</span> echooymxq
 * <span class="token keyword">@author</span> freeman
 */</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosDiscoveryClient</span> <span class="token keyword">implements</span> <span class="token class-name">DiscoveryClient</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">Logger</span> log <span class="token operator">=</span> <span class="token class-name">LoggerFactory</span><span class="token punctuation">.</span><span class="token function">getLogger</span><span class="token punctuation">(</span><span class="token class-name">NacosDiscoveryClient</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * Nacos Discovery Client Description.
     */</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> <span class="token constant">DESCRIPTION</span> <span class="token operator">=</span> <span class="token string">&quot;Spring Cloud Nacos Discovery Client&quot;</span><span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">NacosServiceDiscovery</span> serviceDiscovery<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Value</span><span class="token punctuation">(</span><span class="token string">&quot;\${spring.cloud.nacos.discovery.failure-tolerance-enabled:false}&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">boolean</span> failureToleranceEnabled<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NacosDiscoveryClient</span><span class="token punctuation">(</span><span class="token class-name">NacosServiceDiscovery</span> nacosServiceDiscovery<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>serviceDiscovery <span class="token operator">=</span> nacosServiceDiscovery<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">String</span> <span class="token function">description</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> <span class="token constant">DESCRIPTION</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span> <span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token class-name">String</span> serviceId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>serviceDiscovery<span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">)</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>instances <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
                   <span class="token class-name">ServiceCache</span><span class="token punctuation">.</span><span class="token function">setInstances</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">,</span> instances<span class="token punctuation">)</span><span class="token punctuation">;</span>
                   <span class="token keyword">return</span> instances<span class="token punctuation">;</span>
                <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>failureToleranceEnabled<span class="token punctuation">)</span> <span class="token punctuation">{</span>
             <span class="token keyword">return</span> <span class="token class-name">ServiceCache</span><span class="token punctuation">.</span><span class="token function">getInstances</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
          <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">RuntimeException</span><span class="token punctuation">(</span>
                <span class="token string">&quot;Can not get hosts from nacos server. serviceId: &quot;</span> <span class="token operator">+</span> serviceId<span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">try</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token class-name">Optional</span><span class="token punctuation">.</span><span class="token function">of</span><span class="token punctuation">(</span>serviceDiscovery<span class="token punctuation">.</span><span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>services <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
             <span class="token class-name">ServiceCache</span><span class="token punctuation">.</span><span class="token function">setServiceIds</span><span class="token punctuation">(</span>services<span class="token punctuation">)</span><span class="token punctuation">;</span>
             <span class="token keyword">return</span> services<span class="token punctuation">;</span>
          <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Exception</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          log<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;get service name from nacos server failed.&quot;</span><span class="token punctuation">,</span> e<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">return</span> failureToleranceEnabled <span class="token operator">?</span> <span class="token class-name">ServiceCache</span><span class="token punctuation">.</span><span class="token function">getServiceIds</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token operator">:</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li><code>NacosServiceDiscovery</code>本质上用的NamingService进行服务发现，然后对服务实例进行属性映射处理。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token keyword">@author</span> <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>mailto:echooy.mxq@gmail.com<span class="token punctuation">&quot;</span></span><span class="token punctuation">&gt;</span></span>echooymxq<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">&gt;</span></span>
 * <span class="token keyword">@author</span> changjin wei(魏昌进)
 **/</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">NacosServiceDiscovery</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">NacosDiscoveryProperties</span> discoveryProperties<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">NacosServiceManager</span> nacosServiceManager<span class="token punctuation">;</span>

    <span class="token keyword">public</span> <span class="token class-name">NacosServiceDiscovery</span><span class="token punctuation">(</span><span class="token class-name">NacosDiscoveryProperties</span> discoveryProperties<span class="token punctuation">,</span>
          <span class="token class-name">NacosServiceManager</span> nacosServiceManager<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>discoveryProperties <span class="token operator">=</span> discoveryProperties<span class="token punctuation">;</span>
       <span class="token keyword">this</span><span class="token punctuation">.</span>nacosServiceManager <span class="token operator">=</span> nacosServiceManager<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Return all instances for the given service.
     * <span class="token keyword">@param</span> <span class="token parameter">serviceId</span> id of service
     * <span class="token keyword">@return</span> list of instances
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NacosException</span></span> nacosException
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span> <span class="token function">getInstances</span><span class="token punctuation">(</span><span class="token class-name">String</span> serviceId<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NacosException</span> <span class="token punctuation">{</span>
       <span class="token class-name">String</span> group <span class="token operator">=</span> discoveryProperties<span class="token punctuation">.</span><span class="token function">getGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Instance</span><span class="token punctuation">&gt;</span></span> instances <span class="token operator">=</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">selectInstances</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">,</span> group<span class="token punctuation">,</span>
             <span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> <span class="token function">hostToServiceInstanceList</span><span class="token punctuation">(</span>instances<span class="token punctuation">,</span> serviceId<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * Return the names of all services.
     * <span class="token keyword">@return</span> list of service names
     * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">NacosException</span></span> nacosException
     */</span>
    <span class="token keyword">public</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">getServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">NacosException</span> <span class="token punctuation">{</span>
       <span class="token class-name">String</span> group <span class="token operator">=</span> discoveryProperties<span class="token punctuation">.</span><span class="token function">getGroup</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token class-name">ListView</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> services <span class="token operator">=</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getServicesOfServer</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span>
             <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token constant">MAX_VALUE</span><span class="token punctuation">,</span> group<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">return</span> services<span class="token punctuation">.</span><span class="token function">getData</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span> <span class="token function">hostToServiceInstanceList</span><span class="token punctuation">(</span>
          <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Instance</span><span class="token punctuation">&gt;</span></span> instances<span class="token punctuation">,</span> <span class="token class-name">String</span> serviceId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">ServiceInstance</span><span class="token punctuation">&gt;</span></span> result <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>instances<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Instance</span> instance <span class="token operator">:</span> instances<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token class-name">ServiceInstance</span> serviceInstance <span class="token operator">=</span> <span class="token function">hostToServiceInstance</span><span class="token punctuation">(</span>instance<span class="token punctuation">,</span> serviceId<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token keyword">if</span> <span class="token punctuation">(</span>serviceInstance <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
             result<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>serviceInstance<span class="token punctuation">)</span><span class="token punctuation">;</span>
          <span class="token punctuation">}</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">return</span> result<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">ServiceInstance</span> <span class="token function">hostToServiceInstance</span><span class="token punctuation">(</span><span class="token class-name">Instance</span> instance<span class="token punctuation">,</span>
          <span class="token class-name">String</span> serviceId<span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>instance <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">||</span> <span class="token operator">!</span>instance<span class="token punctuation">.</span><span class="token function">isEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">||</span> <span class="token operator">!</span>instance<span class="token punctuation">.</span><span class="token function">isHealthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">return</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token class-name">NacosServiceInstance</span> nacosServiceInstance <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">NacosServiceInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       nacosServiceInstance<span class="token punctuation">.</span><span class="token function">setHost</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getIp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       nacosServiceInstance<span class="token punctuation">.</span><span class="token function">setPort</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getPort</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       nacosServiceInstance<span class="token punctuation">.</span><span class="token function">setServiceId</span><span class="token punctuation">(</span>serviceId<span class="token punctuation">)</span><span class="token punctuation">;</span>
       nacosServiceInstance<span class="token punctuation">.</span><span class="token function">setInstanceId</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getInstanceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> metadata <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       metadata<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;nacos.instanceId&quot;</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getInstanceId</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       metadata<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;nacos.weight&quot;</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getWeight</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       metadata<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;nacos.healthy&quot;</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">isHealthy</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       metadata<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;nacos.cluster&quot;</span><span class="token punctuation">,</span> instance<span class="token punctuation">.</span><span class="token function">getClusterName</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token keyword">if</span> <span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          metadata<span class="token punctuation">.</span><span class="token function">putAll</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">getMetadata</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       metadata<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;nacos.ephemeral&quot;</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">.</span><span class="token function">valueOf</span><span class="token punctuation">(</span>instance<span class="token punctuation">.</span><span class="token function">isEphemeral</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
       nacosServiceInstance<span class="token punctuation">.</span><span class="token function">setMetadata</span><span class="token punctuation">(</span>metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>

       <span class="token keyword">if</span> <span class="token punctuation">(</span>metadata<span class="token punctuation">.</span><span class="token function">containsKey</span><span class="token punctuation">(</span><span class="token string">&quot;secure&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token keyword">boolean</span> secure <span class="token operator">=</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span><span class="token function">parseBoolean</span><span class="token punctuation">(</span>metadata<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;secure&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          nacosServiceInstance<span class="token punctuation">.</span><span class="token function">setSecure</span><span class="token punctuation">(</span>secure<span class="token punctuation">)</span><span class="token punctuation">;</span>
       <span class="token punctuation">}</span>
       <span class="token keyword">return</span> nacosServiceInstance<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token class-name">NamingService</span> <span class="token function">namingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       <span class="token keyword">return</span> nacosServiceManager<span class="token punctuation">.</span><span class="token function">getNamingService</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="总结-1" tabindex="-1"><a class="header-anchor" href="#总结-1" aria-hidden="true">#</a> 总结</h3><p>spring cloud alibaba使用nacos实现了sc的服务发现规范，本质上还是用NamingService进行服务发现。</p>`,37),c=[p];function o(i,l){return s(),a("div",null,c)}const k=n(e,[["render",o],["__file","registerAndDiscover.html.vue"]]);export{k as default};
