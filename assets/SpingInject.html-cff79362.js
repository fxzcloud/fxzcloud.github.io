import{_ as e,V as t,W as p,$ as a,X as n,Y as s}from"./framework-159025ca.js";const o={},c=a(`<h1 id="spring依赖注入" tabindex="-1"><a class="header-anchor" href="#spring依赖注入" aria-hidden="true">#</a> spring依赖注入</h1><h2 id="autowired、-resource、-value" tabindex="-1"><a class="header-anchor" href="#autowired、-resource、-value" aria-hidden="true">#</a> @Autowired、@Resource、@Value</h2><p>@Resource、@Autowired、@Value 标注字段、方法，则表示需要依赖注入(就是反射给字段设置值、反射执行方法)</p><p>在依赖注入的前提上：</p><ul><li>使用@Lazy则表示注入的是代理对象，执行代理对象时才会真正进行依赖的解析</li><li>使用@Qualifier(&quot;beanName&quot;)，匹配了多个注入的值时，遍历每个候选者，找到限定beanName一致的候选者</li><li>使用@Primary，匹配了多个注入的值时，有@Primary的候选者作为最终的注入值</li><li>使用@Priority，匹配了多个注入的值时，然后没有@Primary的候选者，才会根据@Priority的排序值，找到至最小的作为最终的注入值</li></ul><p>注：匹配了多个注入的值时，没有@Qualifier、@Primary、@Primary限定，那就根据字段的名字、或者方法的参数名作为限定名匹配候选者</p><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token comment">// 准备一个带泛型的Bean</span>
<span class="token annotation punctuation">@Getter</span>
<span class="token annotation punctuation">@Setter</span>
<span class="token annotation punctuation">@NoArgsConstructor</span>  
<span class="token annotation punctuation">@AllArgsConstructor</span>
<span class="token annotation punctuation">@ToString</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">T</span><span class="token punctuation">,</span> <span class="token class-name">W</span><span class="token punctuation">&gt;</span></span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token class-name">T</span> t<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">W</span> w<span class="token punctuation">;</span>

<span class="token punctuation">}</span>

	<span class="token comment">// config配置文件中注入两个泛型Bean</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Parent</span> <span class="token function">parentOne</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">Parent</span> <span class="token function">parentTwo</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Parent</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> <span class="token function">stringGeneric</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;str1&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;str2&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token annotation punctuation">@Bean</span>
    <span class="token keyword">public</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> <span class="token function">objectGeneric</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token string">&quot;obj1&quot;</span><span class="token punctuation">,</span> <span class="token number">2</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

	<span class="token comment">// 使用@Autowired注入，测试一下：</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span></span> objectGenericBean<span class="token punctuation">;</span> <span class="token comment">//GenericBean(t=obj1, w=2)</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">GenericBean</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> stringGenericBean<span class="token punctuation">;</span> <span class="token comment">//GenericBean(t=st   r1, w=str2)</span>
    <span class="token comment">// 注意，容器里虽然有两个Parent，这里即使不使用@Qualifier也不会报错。</span>
    <span class="token comment">// 但是需要注意字段名parentOne，必须是容器里存在的，否则就报错了。</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Parent</span> parentOne<span class="token punctuation">;</span> <span class="token comment">//com.fsx.bean.Parent@23c98163</span>

    <span class="token comment">//Spring4.0后的新特性,这样会注入所有类型为(包括子类)GenericBean的Bean(但是顺序是不确定的,可通过Order接口控制顺序)</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">GenericBean</span><span class="token punctuation">&gt;</span></span> genericBeans<span class="token punctuation">;</span> <span class="token comment">//[GenericBean(t=st   r1, w=str2), GenericBean(t=obj1, w=2)]</span>
    <span class="token comment">// 这里的key必须是String类型，把GenericBean类型的都拿出来了，beanName-&gt;Bean</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">GenericBean</span><span class="token punctuation">&gt;</span></span> genericBeanMap<span class="token punctuation">;</span> <span class="token comment">//{stringGenericBean=GenericBean(t=st   r1, w=str2), objectGenericBean=GenericBean(t=obj1, w=2)}</span>
    <span class="token comment">// 这里面，用上泛型也是好使的，就只会拿指定泛型的了</span>
    <span class="token annotation punctuation">@Autowired</span>
    <span class="token keyword">private</span> <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">GenericBean</span><span class="token punctuation">&lt;</span><span class="token class-name">Object</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">&gt;</span><span class="token punctuation">&gt;</span></span> genericBeanObjMap<span class="token punctuation">;</span> <span class="token comment">//{objectGenericBean=GenericBean(t=obj1, w=2)}</span>

    <span class="token comment">// 普通类型，容器里面没有的Bean类型，注入是会报错的</span>
    <span class="token comment">//@Autowired</span>
    <span class="token comment">//private Integer normerValue;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="循环依赖" tabindex="-1"><a class="header-anchor" href="#循环依赖" aria-hidden="true">#</a> 循环依赖</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 只有单例bean支持循环依赖，原型和Scope是不支持循环依赖的
 * 看
 * <span class="token punctuation">{</span> AbstractBeanFactory的doGetBean(String, Clazz, Object[], boolean)<span class="token punctuation">}</span>
 * */</span>

<span class="token doc-comment comment">/**
 * 循环依赖bean校验逻辑
 * 看 <span class="token punctuation">{</span> AbstractAutowireCapableBeanFactory的doCreateBean(String, RootBeanDefinition, Object[])<span class="token punctuation">}</span>
 *
 * 这里是为了处理二级缓存中的bean 和 执行了初始化操作的 bean 不一致的校验，不一致说明可能存在
 * 依赖注入的bean 和 实际存入单例池中的bean 不一致的问题。对于不一致，下面的处理是报错
 *
 *
 * 比如 A 注入了 B，B 注入了 A
 * 先是 getBean(A),然后其 populateBean 环节要注入B, 所以会 getBean(B)，然后其 populateBean 环节要注入A,所以要 getBean(A)
 * 此时发现A正在创建，所以会读取三级缓存的value，然后执行提前AOP得到一个 proxyBeanA ，并将 proxyBeanA 存入二级缓存，然后将 proxyBeanA 注入到 B中，
 * 然后B就创建完了，然后B就会被注入到A中，所以A的 populateBean 结束了，然后会执行 initializeBean。假设在 initializeBean 生成了 proxyBeanA2 。
 * 这就出现了 注入到B中的A，和实际最终生成的A不一致的问题，对于这中情况，只能直接报错了，下面的逻辑就是为了应付这种情况的，
 *
 * 注：当然 提前AOP 也不一定会创建代理对象，我这里只是举例了 提前AOP和初始化都创建了代理对象的场景，方便说明
 * */</span>


<span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">doCreateBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span>
                                  <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeanCreationException</span> <span class="token punctuation">{</span>

        <span class="token comment">// 实例化bean</span>
        bean <span class="token operator">=</span> <span class="token function">createBeanInstance</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span>earlySingletonExposure<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 循环依赖-添加到三级缓存中
             * 把我们的早期对象包装成一个 singletonFactory 对象，该对象提供了一个 getObject方法，该方法内部调用 getEarlyBeanReference(beanName, mbd, bean)
             * 实现提前AOP
             * */</span>
            <span class="token function">addSingletonFactory</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> bean<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// Initialize the bean instance.</span>
        <span class="token class-name">Object</span> exposedObject <span class="token operator">=</span> bean<span class="token punctuation">;</span>
        <span class="token comment">// 填充bean，就是依赖注入或者给属性设置值</span>
        <span class="token function">populateBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> instanceWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// getBean()</span>
        <span class="token comment">// 进行对象初始化操作（在这里可能生成代理对象）</span>
        exposedObject <span class="token operator">=</span> <span class="token function">initializeBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> exposedObject<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token doc-comment comment">/**
         * 这里是为了处理二级缓存中的bean 和 执行了初始化操作的 bean 不一致的校验，不一致说明可能存在
         * 依赖注入的bean 和 实际存入单例池中的bean 不一致的问题。对于不一致，下面的处理是报错
         *
         *
         * 比如 A 注入了 B，B 注入了 A
         * 先是 getBean(A),然后其 populateBean 环节要注入B, 所以会 getBean(B)，然后其 populateBean 环节要注入A,所以要 getBean(A)
         * 此时发现A正在创建，所以会读取三级缓存的value，然后执行提前AOP得到一个 proxyBeanA ，并将 proxyBeanA 存入二级缓存，然后将 proxyBeanA 注入到 B中，
         * 然后B就创建完了，然后B就会被注入到A中，所以A的 populateBean 结束了，然后会执行 initializeBean。假设在 initializeBean 生成了 proxyBeanA2 。
         * 这就出现了 注入到B中的A，和实际最终生成的A不一致的问题，对于这中情况，只能直接报错了，下面的逻辑就是为了应付这种情况的，
         *
         * 注：当然 提前AOP 也不一定会创建代理对象，我这里只是举例了 提前AOP和初始化都创建了代理对象的场景，方便说明
         *
         * */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>earlySingletonExposure<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 去缓存中获取到我们的对象,由于传递的 allowEarlyReference 是false要求只能在一级二级缓存中去获取。
             * 说白了，就尝试从二级缓存中获取bean。
             *
             * 注：在这里就能体会到三级缓存的好处了。因为这里是只会从一级缓存和二级缓存中获取内容(其实只可能从二级缓存中拿到，一级缓存是拿不到的，因为此时还未将单例bean存入一级缓存)
             *     如果二级缓存拿到的值不为null，就校验一下 exposedObject(执行了初始化后置处理器返回的值) 和 bean(简单实例化出来的) 是否一致，
             *     若不一致，就需要判断一下，这个bean是否注入给了其他bean对象，若注入给了其他bean对象，那么就只能报错了，因为已经注入给了其他bean的值 和 exposedObject 不一致。
             *
             *     假设我们采用二级缓存来解决循环依赖的问题。思路如下：
             *          一级缓存用来缓存最终完全的bean，二级缓存一开始存入的是 ObjectFactory ，当出现了循环依赖时，读取二级缓存的值,然后回调方法 ObjectFactory的getObject 得到 提前AOP的bean。
             *          将 提前AOP的bean 存入进二级缓存，也就是进行值覆盖。
             *
             *          一级缓存：&lt; beanName,最终的bean &gt;
             *          二级缓存：&lt; beanName, ObjectFactory 或者 提前AOP得到的bean &gt;
             *
             *          这就会出现一个问题，很难确定二级缓存存储得值 是 ObjectFactory 还是 提前AOP得到的bean，
             *          你可能会这么想 \`earlySingletonReference instanceof ObjectFactory\` 来检验，但这是不靠谱的，因为有可能bean的类型就是 ObjectFactory 的
             *          所以呢，只能使用东西标记二级缓存的值  是 ObjectFactory 还是 提前AOP得到的bean，
             *          比如 这么设计： ThreadLocal&lt; beanName, boolean &gt; earlyLocal ： false 表示二级缓存的值是 ObjectFactory，true 表示二级缓存的值是 提前AOP得到的bean
             *
             *          那么下面的 判断逻辑应当改成 \` if ( earlySingletonReference != null &amp;&amp; earlyLocal.get().get(beanName) )
             *
             *          所以呢肯定是需要使用东西来标记一下，是否执行了 ObjectFactory 得到 提前AOP得到的bean，Spring是采用的三级缓存来标记，
             *          这就是为啥使用三级缓存
             *
             * */</span>
            <span class="token class-name">Object</span> earlySingletonReference <span class="token operator">=</span> <span class="token function">getSingleton</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token doc-comment comment">/**
             * 能够获取到，说明是在二级缓存拿到的。也就是这个 beanName 产生了循环依赖的问题，
             * */</span>
            <span class="token doc-comment comment">/**
             *  相等，说明初始化操作并没有对bean进行代理，那就没事。二级缓存的值作为最后要存入单例池中的值
             *  不相等，说明对bean进行了代理。这就会导致循环依赖了bean的那些东西，注入的bean是不对的，我们需要判断一下
             *      那些东西是否已经创建完了，创建完，那就没得搞了，只能报错了。
             */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>exposedObject <span class="token operator">==</span> bean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                exposedObject <span class="token operator">=</span> earlySingletonReference<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token doc-comment comment">/**
             * hasDependentBean(beanName) 说明，这个bean已经注入到其他的bean对象中
             * */</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>allowRawInjectionDespiteWrapping <span class="token operator">&amp;&amp;</span> <span class="token function">hasDependentBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token doc-comment comment">/**
                 * 获取依赖了 beanName 的bean。其实就是获取哪些bean注入了 beanName这个bean
                 *
                 * 在依赖注入时会记录，比如@Resource的注入逻辑 <span class="token punctuation">{</span> org.springframework.context.annotation.CommonAnnotationBeanPostProcessor的autowireResource(BeanFactory, org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.LookupElement, String)<span class="token punctuation">}</span>
                 * */</span>
                <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dependentBeans <span class="token operator">=</span> <span class="token function">getDependentBeans</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> actualDependentBeans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>dependentBeans<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> dependentBean <span class="token operator">:</span> dependentBeans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token doc-comment comment">/**
                     * 尝试挽救一下，如果 dependentBean 还没有创建完成，那就没问题了
                     *
                     * 创建完成的标记，是在这个地方设置的，也就是在 doGetBean 的一开始就设置了
                     * <span class="token punctuation">{</span> AbstractBeanFactory的doGetBean(String, Clazz, Object[], boolean)<span class="token punctuation">}</span>
                     * <span class="token punctuation">{</span> AbstractBeanFactory的markBeanAsCreated(String)<span class="token punctuation">}</span>
                     * */</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">removeSingletonIfCreatedForTypeCheckOnly</span><span class="token punctuation">(</span>dependentBean<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token doc-comment comment">/**
                         * 已经创建完了，就记录一下。
                         * */</span>
                        actualDependentBeans<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>dependentBean<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 报错</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>actualDependentBeans<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCurrentlyInCreationException</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">return</span> exposedObject<span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="autowiredannotationbeanpostprocessor" tabindex="-1"><a class="header-anchor" href="#autowiredannotationbeanpostprocessor" aria-hidden="true">#</a> AutowiredAnnotationBeanPostProcessor</h2><blockquote><p>处理有 <code>@Autowired | @Value</code> 的字段、方法，进行依赖注入</p><p><code>@Autowired</code> 推断构造器</p><p><code>@Lookup</code> 标注的方法，记录到BeanDefinition中，在后面实例化bean的时候会创建代理对象</p></blockquote><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2023/12/09/YYXvnc.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>`,12),i=n("ul",null,[n("li",null,[n("p",null,"BeanPostProcessor执行过程：实例化前后置 -> 推断构造器后置(hit) --> 实例化bean -> 合并BeanDefinition后置(hit) -> 实例化后后置 -> 属性注入后置(hit )->初始化前后置 -> 初始化后后置 -> 销毁前后置")]),n("li",null,[n("p",null,"推断构造器阶段 AutowiredAnnotationBeanPostProcessor的determineCandidateConstructors方法"),n("ul",null,[n("li",null,[n("p",null,[s("作用一：解析类中(会递归解析父类)标注了@Lookup的方法，装饰成"),n("code",null,"new LookupOverride(method, lookup.value())"),s("对象设置成BeanDefinition的属性。在实例化bean的时候，会获取该属性判断是否需要生成Cglib代理对象。")])]),n("li",null,[n("p",null,"推断构造器。"),n("div",{class:"language-java line-numbers-mode","data-ext":"java"},[n("pre",{class:"language-java"},[n("code",null,[s(" candidateConstructors "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token keyword"},"new"),s(),n("span",{class:"token class-name"},"Constructor"),n("span",{class:"token generics"},[n("span",{class:"token punctuation"},"<"),n("span",{class:"token operator"},"?"),n("span",{class:"token punctuation"},">")]),n("span",{class:"token punctuation"},"["),n("span",{class:"token number"},"0"),n("span",{class:"token punctuation"},"]"),n("span",{class:"token punctuation"},";"),s(`

 存在`),n("span",{class:"token annotation punctuation"},"@Autowired"),s(`标注的构造器
 `),n("span",{class:"token annotation punctuation"},"@Autowired"),n("span",{class:"token punctuation"},"("),s("required"),n("span",{class:"token operator"},"="),n("span",{class:"token boolean"},"true"),n("span",{class:"token punctuation"},")"),s(" 只能标注一个。candidateConstructors "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),s("这一个"),n("span",{class:"token punctuation"},"]"),s(`
 `),n("span",{class:"token annotation punctuation"},"@Autowired"),n("span",{class:"token punctuation"},"("),s("required"),n("span",{class:"token operator"},"="),n("span",{class:"token boolean"},"false"),n("span",{class:"token punctuation"},")"),s(" 可以标注多个。candidateConstructors "),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),s("多个"),n("span",{class:"token operator"},"+"),s("无参构造器"),n("span",{class:"token punctuation"},"("),s("如果存在"),n("span",{class:"token punctuation"},")"),n("span",{class:"token punctuation"},"]"),s(`
   
 不存在
 只有一个构造器且是有参的。candidateConstructors `),n("span",{class:"token operator"},"="),s(),n("span",{class:"token punctuation"},"["),s("这一个"),n("span",{class:"token punctuation"},"]"),s(`
  
 `),n("span",{class:"token keyword"},"return"),s(" candidateConstructors"),n("span",{class:"token punctuation"},"."),s("length"),n("span",{class:"token operator"},">"),n("span",{class:"token number"},"0"),s(),n("span",{class:"token operator"},"?"),s(" candidateConstructors "),n("span",{class:"token operator"},":"),s(),n("span",{class:"token keyword"},"null"),s(`
 返回`),n("span",{class:"token keyword"},"null"),s(`，就是没有候选的构造器集合，后面的实例化自然会调用无参构造器实例化
`)])]),n("div",{class:"line-numbers","aria-hidden":"true"},[n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"}),n("div",{class:"line-number"})])])])])]),n("li",{AutowiredAnnotationBeanPostProcessor的postProcessMergedBeanDefinition方法:""},[n("p",null,"合并BeanDefinition阶段"),n("ul",null,[n("li",{AutowiredAnnotationBeanPostProcessor的findAutowiringMetadata方法:""},[n("p",null,"拿到bean的InjectionMetadata对象"),n("blockquote",null,[n("ul",null,[n("li",null,"beanName 或者 beanClazz.getName 作为key，从缓存中{ AutowiredAnnotationBeanPostProcessor的injectionMetadataCache方法}取出InjectionMetadata"),n("li",{AutowiredAnnotationBeanPostProcessor的buildAutowiringMetadata方法:""},"InjectionMetadata 是空 或者需要刷新，就解析beanCass构建 InjectionMetadata 对象"),n("li",null,"do...while 递归解析clazz及其所有父类，拿到其中标注了 @Autowired、@Value 的方法和字段构造成InjectedElement，然后记录在局部变量elements中"),n("li",null,[n("code",null,"new AutowiredFieldElement(field, required)")]),n("li",null,[n("code",null,"new AutowiredMethodElement(method, required, pd)")]),n("li",null,[s("创建对象 "),n("code",null,"InjectionMetadata.forElements(elements, clazz);")]),n("li",null,"InjectionMetadata 对象的属性{ InjectionMetadata的injectedElements}就是记录了标注了 @Autowired、@Value 注解的Method和Field"),n("li",{AutowiredAnnotationBeanPostProcessor的injectionMetadataCache方法:""},"存入缓存"),n("li",null,"返回 InjectionMetadata")])])]),n("li",{InjectionMetadata的checkConfigMembers方法:""},[n("p",null,"检查 InjectionMetadata 对象"),n("blockquote",null,[n("ul",null,[n("li",{RootBeanDefinition的registerExternallyManagedConfigMember方法:""},"将 { InjectionMetadata的injectedElements} 记录到BeanDefinition中"),n("li",null,"将 { InjectionMetadata的injectedElements} 设置到 { InjectionMetadata的checkedElements} 表示已经检查过了")])])])])]),n("li",{AutowiredAnnotationBeanPostProcessor的postProcessProperties:""},[n("p",null,"属性注入"),n("ul",null,[n("li",{AutowiredAnnotationBeanPostProcessor的findAutowiringMetadata方法:""},"拿到bean解析而成的InjectionMetadata"),n("li",{InjectionMetadata的inject:""},"执行")])])],-1),l=n("h2",{id:"commonannotationbeanpostprocessor",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#commonannotationbeanpostprocessor","aria-hidden":"true"},"#"),s(" CommonAnnotationBeanPostProcessor")],-1),u=n("blockquote",null,[n("p",null,"处理@PostConstruct、@PreDestroy 标注的方法回调。处理@Resource 字段、方法的依赖注入")],-1),r=n("figure",null,[n("img",{src:"https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2023/12/09/CDc3Qc.png",alt:"",tabindex:"0",loading:"lazy"}),n("figcaption")],-1),d=n("ul",null,[n("li",null,[n("p",null,"BeanPostProcessor执行过程：实例化前后置 -> 推断构造器后置 -> 实例化bean -> 合并BeanDefinition后置(hit) -> 实例化后后置 -> 属性注入后置(hit) -> 初始化前后置(hit) -> 初始化后后置 -> 销毁前后置(hit)")]),n("li",{CommonAnnotationBeanPostProcessor的postProcessMergedBeanDefinition:""},[n("p",null,"合并BeanDefinition阶段"),n("ul",null,[n("li",{InitDestroyAnnotationBeanPostProcessor的postProcessMergedBeanDefinition:""},[n("p",null,"回调父类方法")]),n("li",{InitDestroyAnnotationBeanPostProcessor的buildLifecycleMetadata:""},[n("p",null,"解析class生成 LifecycleMetadata")]),n("li",null,[n("p",null,"do...while 循环，递归父类，找到有 @PostConstruct、@PreDestroy 的方法 记录成 LifecycleElement，其中@PostConstruct记录在initMethods,@PreDestroy记录在destroyMethods")]),n("li",null,[n("p",null,[s("创建对象"),n("code",null,"new LifecycleMetadata(clazz, initMethods, destroyMethods)")])]),n("li",null,[n("p",null,[s("记录有 @Resource 字段、方法的类，解析成 "),n("code",null,"new InjectionMetadata(clazz, elements))"),s("，其中elements的类型"),n("code",null,"ResourceElement")])]),n("li",{CommonAnnotationBeanPostProcessor的buildResourceMetadata:""},[n("p",null,"解析class生成 InjectionMetadata")]),n("li",null,[n("p",null,"do...while 递归父类,找到有 @Resource 的字段、方法 装饰成 ResourceElement，记录在局部变量 elements")]),n("li",null,[n("p",null,[s("创建对象"),n("code",null,"InjectionMetadata.forElements(elements, clazz)")])]),n("li",null,[n("p",null,"注：这里主要是缓存起来，一个类对应一个 LifecycleMetadata、InjectionMetadata 对象，对象的属性是记录 回调的字段、方法")])])]),n("li",{CommonAnnotationBeanPostProcessor的postProcessProperties:""},[n("p",null,"属性注入阶段"),n("ul",null,[n("li",{CommonAnnotationBeanPostProcessor的findResourceMetadata:""},"拿到bean解析而成的InjectionMetadata"),n("li",{InjectionMetadata的inject:""},"执行")])]),n("li",{InitDestroyAnnotationBeanPostProcessor的postProcessBeforeInitialization:""},[n("p",null,"初始化前阶段(父类)"),n("ul",null,[n("li",{InitDestroyAnnotationBeanPostProcessor的findLifecycleMetadata:""},"从缓存中拿到类对应的 LifecycleMetadata，拿不到就解析类生成 LifecycleMetadata。"),n("li",null,[s("回调init方法"),n("code",null,"metadata.invokeInitMethods;")]),n("li",null,"其实就是遍历 { InitDestroyAnnotationBeanPostProcessor.LifecycleMetadata的initMethods} 属性，反射执行method。一个initMethod就是@PostConstruct标注的方法")])]),n("li",{InitDestroyAnnotationBeanPostProcessor的postProcessBeforeDestruction:""},[n("p",null,"销毁前阶段"),n("ul",null,[n("li",{InitDestroyAnnotationBeanPostProcessor的findLifecycleMetadata:""},"从缓存中拿到类对应的 LifecycleMetadata，拿不到就解析类生成 LifecycleMetadata。"),n("li",null,[s("回调Destroy方法"),n("code",null,"metadata.invokeDestroyMethods;")]),n("li",null,"其实就是遍历 { InitDestroyAnnotationBeanPostProcessor.LifecycleMetadata的destroyMethods} 属性，反射执行method。一个destroyMethod就是@PreDestroy标注的方法")])])],-1),k=a(`<h2 id="postprocessmergedbeandefinition" tabindex="-1"><a class="header-anchor" href="#postprocessmergedbeandefinition" aria-hidden="true">#</a> postProcessMergedBeanDefinition</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AbstractAutowireCapableBeanFactory</span><span class="token operator">:</span>
<span class="token keyword">protected</span> <span class="token class-name">Object</span> <span class="token function">doCreateBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span>
                              <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">Object</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">BeanCreationException</span> <span class="token punctuation">{</span>

    <span class="token comment">// BeanWrapper是对Bean的包装，其接口中所定义的功能很简单包括设置获取被包装的对象，获取被包装bean的属性描述器</span>
    <span class="token class-name">BeanWrapper</span> instanceWrapper <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 从没有完成的 FactoryBean中移除</span>
        instanceWrapper <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>factoryBeanInstanceCache<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>instanceWrapper <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         *  推断构造器
         * 创建bean实例化使用合适的实例化策略来创建新的实例：工厂方法、构造函数自动注入、简单初始化。
         * 该方法很复杂也很重要
         */</span>
        instanceWrapper <span class="token operator">=</span> <span class="token function">createBeanInstance</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> args<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
  
    <span class="token comment">// 从 beanWrapper中获取我们的早期对象</span>
    <span class="token class-name">Object</span> bean <span class="token operator">=</span> instanceWrapper<span class="token punctuation">.</span><span class="token function">getWrappedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanType <span class="token operator">=</span> instanceWrapper<span class="token punctuation">.</span><span class="token function">getWrappedClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>beanType <span class="token operator">!=</span> <span class="token class-name">NullBean</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        mbd<span class="token punctuation">.</span>resolvedTargetType <span class="token operator">=</span> beanType<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Allow post-processors to modify the merged bean definition.</span>
    <span class="token keyword">synchronized</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span>postProcessingLock<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mbd<span class="token punctuation">.</span>postProcessed<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">try</span> <span class="token punctuation">{</span>
                <span class="token doc-comment comment">/**
                 *  后置处理器的【第四次】MergedBeanDefinitionPostProcessor的postProcessMergedBeanDefinition
                 * 进行后置处理 @Autowired @Value的注解的预解析
                 */</span>
                <span class="token function">applyMergedBeanDefinitionPostProcessors</span><span class="token punctuation">(</span>mbd<span class="token punctuation">,</span> beanType<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">getResourceDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">,</span>
                        <span class="token string">&quot;Post-processing of merged bean definition failed&quot;</span><span class="token punctuation">,</span> ex
                <span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            mbd<span class="token punctuation">.</span>postProcessed <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     *  该对象进行判断是否能够暴露早期对象的条件
     * 单实例 this.allowCircularReferences 默认为true
     * isSingletonCurrentlyInCreation(表示当前的bean对象正在创建singletonsCurrentlyInCreation包含当前正在创建的bean)
     *  举例：
     *    class A <span class="token punctuation">{</span> B b;<span class="token punctuation">}</span>
     *    class B <span class="token punctuation">{</span> A a;<span class="token punctuation">}</span>
     *    先实例化A --&gt; singletonsCurrentlyInCreation = <span class="token punctuation">{</span>A<span class="token punctuation">}</span>
     *    依赖注入B --&gt; singletonsCurrentlyInCreation = <span class="token punctuation">{</span>A，B<span class="token punctuation">}</span>
     *    依赖注入A --&gt; singletonsCurrentlyInCreation = <span class="token punctuation">{</span>A，B<span class="token punctuation">}</span> ==&gt; 发现 isSingletonCurrentlyInCreation(a) 满足条件，所以应该暴露A到三级缓存
     *
     *  singletonsCurrentlyInCreation 是在单例bean 创建之前就设置的
     *  <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">DefaultSingletonBeanRegistry</span></span>的beforeSingletonCreation(java.lang.String)
     * */</span>
    <span class="token comment">// Eagerly cache singletons to be able to resolve circular references</span>
    <span class="token comment">// even when triggered by lifecycle interfaces like BeanFactoryAware.</span>
    <span class="token keyword">boolean</span> earlySingletonExposure <span class="token operator">=</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">isSingleton</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token keyword">this</span><span class="token punctuation">.</span>allowCircularReferences <span class="token operator">&amp;&amp;</span> <span class="token function">isSingletonCurrentlyInCreation</span><span class="token punctuation">(</span>
            beanName<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 上述条件满足，允许中期暴露对象</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>earlySingletonExposure<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isTraceEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            logger<span class="token punctuation">.</span><span class="token function">trace</span><span class="token punctuation">(</span>
                    <span class="token string">&quot;Eagerly caching bean &#39;&quot;</span> <span class="token operator">+</span> beanName <span class="token operator">+</span> <span class="token string">&quot;&#39; to allow for resolving potential circular references&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token doc-comment comment">/**
         *  循环依赖-添加到三级缓存中
         * 把我们的早期对象包装成一个 singletonFactory 对象，该对象提供了一个 getObject方法，该方法内部调用 getEarlyBeanReference(beanName, mbd, bean)
         * 实现提前AOP
         * */</span>
        <span class="token function">addSingletonFactory</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> <span class="token function">getEarlyBeanReference</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> bean<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Initialize the bean instance.</span>
    <span class="token class-name">Object</span> exposedObject <span class="token operator">=</span> bean<span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token comment">//  填充bean，就是依赖注入或者给属性设置值</span>
        <span class="token function">populateBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> instanceWrapper<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// getBean()</span>
        <span class="token comment">//  进行对象初始化操作（在这里可能生成代理对象）</span>
        exposedObject <span class="token operator">=</span> <span class="token function">initializeBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> exposedObject<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>ex <span class="token keyword">instanceof</span> <span class="token class-name">BeanCreationException</span> <span class="token operator">&amp;&amp;</span> beanName<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token class-name">BeanCreationException</span><span class="token punctuation">)</span> ex<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getBeanName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token punctuation">(</span><span class="token class-name">BeanCreationException</span><span class="token punctuation">)</span> ex<span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>
                    mbd<span class="token punctuation">.</span><span class="token function">getResourceDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> <span class="token string">&quot;Initialization of bean failed&quot;</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/**
     * 这里是为了处理二级缓存中的bean 和 执行了初始化操作的 bean 不一致的校验，不一致说明可能存在
     * 依赖注入的bean 和 实际存入单例池中的bean 不一致的问题。对于不一致，下面的处理是报错
     *
     *
     * 比如 A 注入了 B，B 注入了 A
     * 先是 getBean(A),然后其 populateBean 环节要注入B, 所以会 getBean(B)，然后其 populateBean 环节要注入A,所以要 getBean(A)
     * 此时发现A正在创建，所以会读取三级缓存的value，然后执行提前AOP得到一个 proxyBeanA ，并将 proxyBeanA 存入二级缓存，然后将 proxyBeanA 注入到 B中，
     * 然后B就创建完了，然后B就会被注入到A中，所以A的 populateBean 结束了，然后会执行 initializeBean。假设在 initializeBean 生成了 proxyBeanA2 。
     * 这就出现了 注入到B中的A，和实际最终生成的A不一致的问题，对于这中情况，只能直接报错了，下面的逻辑就是为了应付这种情况的，
     *
     * 注：当然 提前AOP 也不一定会创建代理对象，我这里只是举例了 提前AOP和初始化都创建了代理对象的场景，方便说明
     *
     * */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>earlySingletonExposure<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 去缓存中获取到我们的对象,由于传递的 allowEarlyReference 是false要求只能在一级二级缓存中去获取。
         * 说白了，就尝试从二级缓存中获取bean。
         *
         * 注：在这里就能体会到三级缓存的好处了。因为这里是只会从一级缓存和二级缓存中获取内容(其实只可能从二级缓存中拿到，一级缓存是拿不到的，因为此时还未将单例bean存入一级缓存)
         *     如果二级缓存拿到的值不为null，就校验一下 exposedObject(执行了初始化后置处理器返回的值) 和 bean(简单实例化出来的) 是否一致，
         *     若不一致，就需要判断一下，这个bean是否注入给了其他bean对象，若注入给了其他bean对象，那么就只能报错了，因为已经注入给了其他bean的值 和 exposedObject 不一致。
         *
         *     假设我们采用二级缓存来解决循环依赖的问题。思路如下：
         *          一级缓存用来缓存最终完全的bean，二级缓存一开始存入的是 ObjectFactory ，当出现了循环依赖时，读取二级缓存的值,然后回调方法 ObjectFactory的getObject 得到 提前AOP的bean。
         *          将 提前AOP的bean 存入进二级缓存，也就是进行值覆盖。
         *
         *          一级缓存：&lt; beanName,最终的bean &gt;
         *          二级缓存：&lt; beanName, ObjectFactory 或者 提前AOP得到的bean &gt;
         *
         *          这就会出现一个问题，很难确定二级缓存存储得值 是 ObjectFactory 还是 提前AOP得到的bean，
         *          你可能会这么想 \`earlySingletonReference instanceof ObjectFactory\` 来检验，但这是不靠谱的，因为有可能bean的类型就是 ObjectFactory 的
         *          所以呢，只能使用东西标记二级缓存的值  是 ObjectFactory 还是 提前AOP得到的bean，
         *          比如 这么设计： ThreadLocal&lt; beanName, boolean &gt; earlyLocal ： false 表示二级缓存的值是 ObjectFactory，true 表示二级缓存的值是 提前AOP得到的bean
         *
         *          那么下面的 判断逻辑应当改成 \` if ( earlySingletonReference != null &amp;&amp; earlyLocal.get().get(beanName) )
         *
         *          所以呢肯定是需要使用东西来标记一下，是否执行了 ObjectFactory 得到 提前AOP得到的bean，Spring是采用的三级缓存来标记，
         *          这就是为啥使用三级缓存
         *
         * */</span>
        <span class="token class-name">Object</span> earlySingletonReference <span class="token operator">=</span> <span class="token function">getSingleton</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token doc-comment comment">/**
         * 能够获取到，说明是在二级缓存拿到的。也就是这个 beanName 产生了循环依赖的问题，
         * */</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>earlySingletonReference <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             *  相等，说明初始化操作并没有对bean进行代理，那就没事。二级缓存的值作为最后要存入单例池中的值
             *  不相等，说明对bean进行了代理。这就会导致循环依赖了bean的那些东西，注入的bean是不对的，我们需要判断一下
             *      那些东西是否已经创建完了，创建完，那就没得搞了，只能报错了。
             */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>exposedObject <span class="token operator">==</span> bean<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                exposedObject <span class="token operator">=</span> earlySingletonReference<span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token doc-comment comment">/**
             * hasDependentBean(beanName) 说明，这个bean已经注入到其他的bean对象中
             * */</span>
            <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>allowRawInjectionDespiteWrapping <span class="token operator">&amp;&amp;</span> <span class="token function">hasDependentBean</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token doc-comment comment">/**
                 * 获取依赖了 beanName 的bean。其实就是获取哪些bean注入了 beanName这个bean
                 *
                 * 在依赖注入时会记录，比如@Resource的注入逻辑 <span class="token punctuation">{</span> org.springframework.context.annotation.CommonAnnotationBeanPostProcessor的autowireResource(BeanFactory, org.springframework.context.annotation.CommonAnnotationBeanPostProcessor.LookupElement, String)<span class="token punctuation">}</span>
                 * */</span>
                <span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> dependentBeans <span class="token operator">=</span> <span class="token function">getDependentBeans</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">Set</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> actualDependentBeans <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">LinkedHashSet</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span>dependentBeans<span class="token punctuation">.</span>length<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">String</span> dependentBean <span class="token operator">:</span> dependentBeans<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token doc-comment comment">/**
                     * 尝试挽救一下，如果 dependentBean 还没有创建完成，那就没问题了
                     *
                     * 创建完成的标记，是在这个地方设置的，也就是在 doGetBean 的一开始就设置了
                     * <span class="token punctuation">{</span> AbstractBeanFactory的doGetBean(String, Clazz, Object[], boolean)<span class="token punctuation">}</span>
                     * <span class="token punctuation">{</span> AbstractBeanFactory的markBeanAsCreated(String)<span class="token punctuation">}</span>
                     * */</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token function">removeSingletonIfCreatedForTypeCheckOnly</span><span class="token punctuation">(</span>dependentBean<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token doc-comment comment">/**
                         * 已经创建完了，就记录一下。
                         * */</span>
                        actualDependentBeans<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span>dependentBean<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 报错</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>actualDependentBeans<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCurrentlyInCreationException</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span>
                            <span class="token string">&quot;Bean with name &#39;&quot;</span> <span class="token operator">+</span> beanName <span class="token operator">+</span> <span class="token string">&quot;&#39; has been injected into other beans [&quot;</span> <span class="token operator">+</span> <span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">collectionToCommaDelimitedString</span><span class="token punctuation">(</span>
                                    actualDependentBeans<span class="token punctuation">)</span> <span class="token operator">+</span> <span class="token string">&quot;] in its raw version as part of a circular reference, but has eventually been &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;wrapped. This means that said other beans do not use the final version of the &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;bean. This is often the result of over-eager type matching - consider using &quot;</span> <span class="token operator">+</span> <span class="token string">&quot;&#39;getBeanNamesForType&#39; with the &#39;allowEagerInit&#39; flag turned off, for example.&quot;</span>
                    <span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// Register bean as disposable.</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 注册一次性bean 的销毁接口
         * */</span>
        <span class="token function">registerDisposableBeanIfNecessary</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> bean<span class="token punctuation">,</span> mbd<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">BeanDefinitionValidationException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>
                mbd<span class="token punctuation">.</span><span class="token function">getResourceDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> <span class="token string">&quot;Invalid destruction signature&quot;</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> exposedObject<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AutowiredAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessMergedBeanDefinition</span><span class="token punctuation">(</span><span class="token class-name">RootBeanDefinition</span> beanDefinition<span class="token punctuation">,</span> <span class="token class-name">Clazz</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanType<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token class-name">InjectionMetadata</span> metadata <span class="token operator">=</span> <span class="token function">findAutowiringMetadata</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> beanType<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    metadata<span class="token punctuation">.</span><span class="token function">checkConfigMembers</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AutowiredAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token keyword">private</span> <span class="token class-name">InjectionMetadata</span> <span class="token function">findAutowiringMetadata</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">Clazz</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Fall back to class name as cache key, for backwards compatibility with custom callers.</span>
    <span class="token class-name">String</span> cacheKey <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">hasLength</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span> <span class="token operator">?</span> beanName <span class="token operator">:</span> clazz<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Quick check on the concurrent map first, with minimal locking.</span>
    <span class="token class-name">InjectionMetadata</span> metadata <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * metadata 是空 或者 metadata的属性<span class="token punctuation">{</span> InjectionMetadata的targetClass<span class="token punctuation">}</span> != clazz
     * 就需要刷新
     * */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token function">needsRefresh</span><span class="token punctuation">(</span>metadata<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            metadata <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token function">needsRefresh</span><span class="token punctuation">(</span>metadata<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>metadata <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token comment">// 从 pvs 里面清空 metadata 的数据</span>
                    metadata<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token doc-comment comment">/**
                 * 构建 InjectionMetadata 对象。
                 * 主要是解析clazz及其所有父类，拿到其中标注了 @Autowired、@Value 的 方法和字段
                 *  字段会包装成\`new AutowiredFieldElement(field, required);\`
                 *  方法会包装成\`new AutowiredMethodElement(method, required, pd);\`
                 * */</span>
                metadata <span class="token operator">=</span> <span class="token function">buildAutowiringMetadata</span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 存入缓存</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> metadata<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AutowiredAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token doc-comment comment">/**
 * 解析clazz及其所有父类，拿到其中标注了 @Autowired、@Value 的 方法和字段构造成InjectionMetadata对象
 * <span class="token keyword">@param</span> <span class="token parameter">clazz</span>
 * <span class="token keyword">@return</span>
 */</span>
<span class="token keyword">private</span> <span class="token class-name">InjectionMetadata</span> <span class="token function">buildAutowiringMetadata</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">AutowiredAnnotationBeanPostProcessor</span>的buildAutowiringMetadata<span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 不是后候选的类，就返回空对象
     *
     * 只要clazz不是java包下的类，不是Ordered类 就是 候选类
     * */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">AnnotationUtils</span><span class="token punctuation">.</span><span class="token function">isCandidateClass</span><span class="token punctuation">(</span>clazz<span class="token punctuation">,</span> <span class="token keyword">this</span><span class="token punctuation">.</span>autowiredAnnotationTypes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token constant">EMPTY</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InjectionMetadata<span class="token punctuation">.</span>InjectedElement</span><span class="token punctuation">&gt;</span></span> elements <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> targetClass <span class="token operator">=</span> clazz<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 先处理clazz，再循环 clazz 所有的父类
     *
     * 处理class里面所有的Field、Method
     * */</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InjectionMetadata<span class="token punctuation">.</span>InjectedElement</span><span class="token punctuation">&gt;</span></span> currElements <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 遍历当前类声明的字段</span>
        <span class="token class-name">ReflectionUtils</span><span class="token punctuation">.</span><span class="token function">doWithLocalFields</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">,</span> field <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token comment">// 找到 @Autowired、@Value、@javax.inject.Inject 其中一个，就返回，否则返回null</span>
            <span class="token class-name">MergedAnnotation</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> ann <span class="token operator">=</span> <span class="token function">findAutowiredAnnotation</span><span class="token punctuation">(</span>field<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ann <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isInfoEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Autowired annotation is not supported on static fields: &quot;</span> <span class="token operator">+</span> field<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token doc-comment comment">/**
                 * 返回注解的 \`required\` 属性的值。如果没有就返回true（比如@Value）
                 * */</span>
                <span class="token keyword">boolean</span> required <span class="token operator">=</span> <span class="token function">determineRequiredStatus</span><span class="token punctuation">(</span>ann<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 构造成 \`AutowiredFieldElement\` 对象</span>
                currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AutowiredFieldElement</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> required<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 遍历当前类声明的方法</span>
        <span class="token class-name">ReflectionUtils</span><span class="token punctuation">.</span><span class="token function">doWithLocalMethods</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">,</span> method <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">Method</span> bridgedMethod <span class="token operator">=</span> <span class="token class-name">BridgeMethodResolver</span><span class="token punctuation">.</span><span class="token function">findBridgedMethod</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token comment">// 不是桥接方法，桥接方法指的是jvm生成的方法。反正我们自己定义的方法不是</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">BridgeMethodResolver</span><span class="token punctuation">.</span><span class="token function">isVisibilityBridgeMethodPair</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> bridgedMethod<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 找到 @Autowired、@Value、@javax.inject.Inject 其中一个，就返回，否则返回null</span>
            <span class="token class-name">MergedAnnotation</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> ann <span class="token operator">=</span> <span class="token function">findAutowiredAnnotation</span><span class="token punctuation">(</span>bridgedMethod<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>ann <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> method<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">ClassUtils</span><span class="token punctuation">.</span><span class="token function">getMostSpecificMethod</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token comment">// 是静态的，不记录</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isInfoEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Autowired annotation is not supported on static methods: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 方法没有参数，不记录</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getParameterCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>logger<span class="token punctuation">.</span><span class="token function">isInfoEnabled</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        logger<span class="token punctuation">.</span><span class="token function">info</span><span class="token punctuation">(</span><span class="token string">&quot;Autowired annotation should only be used on methods with parameters: &quot;</span> <span class="token operator">+</span>
                                method<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
                <span class="token comment">// 不是静态方法、方法参数列表个数大于0的才记录</span>
                <span class="token comment">// 返回注解的 \`required\` 属性的值。如果没有就返回true（比如@Value）</span>
                <span class="token keyword">boolean</span> required <span class="token operator">=</span> <span class="token function">determineRequiredStatus</span><span class="token punctuation">(</span>ann<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token class-name">PropertyDescriptor</span> pd <span class="token operator">=</span> <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">findPropertyForMethod</span><span class="token punctuation">(</span>bridgedMethod<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 装饰成 AutowiredMethodElement 对象</span>
                currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">AutowiredMethodElement</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> required<span class="token punctuation">,</span> pd<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 存起来</span>
        elements<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> currElements<span class="token punctuation">)</span><span class="token punctuation">;</span>
        targetClass <span class="token operator">=</span> targetClass<span class="token punctuation">.</span><span class="token function">getSuperclass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>targetClass <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> targetClass <span class="token operator">!=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token function">forElements</span><span class="token punctuation">(</span>elements<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CommonAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">postProcessMergedBeanDefinition</span><span class="token punctuation">(</span><span class="token class-name">RootBeanDefinition</span> beanDefinition<span class="token punctuation">,</span> <span class="token class-name">Clazz</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> beanType<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 找到有 @PostConstruct、@PreDestroy 的方法 记录成 LifecycleElement，然后属于 LifecycleMetadata
     * */</span>
    <span class="token keyword">super</span><span class="token punctuation">.</span><span class="token function">postProcessMergedBeanDefinition</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">,</span> beanType<span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token doc-comment comment">/**
     * 找到有 @Resource 的方法、字段的类 记录成 ResourceElement,然后属于 InjectionMetadata
     * */</span>
    <span class="token class-name">InjectionMetadata</span> metadata <span class="token operator">=</span> <span class="token function">findResourceMetadata</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> beanType<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    metadata<span class="token punctuation">.</span><span class="token function">checkConfigMembers</span><span class="token punctuation">(</span>beanDefinition<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CommonAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token keyword">private</span> <span class="token class-name">InjectionMetadata</span> <span class="token function">findResourceMetadata</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token keyword">final</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// Fall back to class name as cache key, for backwards compatibility with custom callers.</span>
    <span class="token class-name">String</span> cacheKey <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">hasLength</span><span class="token punctuation">(</span>beanName<span class="token punctuation">)</span> <span class="token operator">?</span> beanName <span class="token operator">:</span> clazz<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// Quick check on the concurrent map first, with minimal locking.</span>
    <span class="token class-name">InjectionMetadata</span> metadata <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token function">needsRefresh</span><span class="token punctuation">(</span>metadata<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">synchronized</span> <span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            metadata <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token function">needsRefresh</span><span class="token punctuation">(</span>metadata<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>metadata <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    metadata<span class="token punctuation">.</span><span class="token function">clear</span><span class="token punctuation">(</span>pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token doc-comment comment">/**
                 * 递归父类，将字段和方法上有 @Resource注解记录成 ResourceElement对象，所以是一个集合，
                 * 这个集合属于 InjectionMetadata 对象
                 * */</span>
                metadata <span class="token operator">=</span> <span class="token function">buildResourceMetadata</span><span class="token punctuation">(</span>clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token comment">// 缓存起来</span>
                <span class="token keyword">this</span><span class="token punctuation">.</span>injectionMetadataCache<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span>cacheKey<span class="token punctuation">,</span> metadata<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> metadata<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CommonAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token keyword">private</span> <span class="token class-name">InjectionMetadata</span> <span class="token function">buildResourceMetadata</span><span class="token punctuation">(</span><span class="token keyword">final</span> <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> clazz<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 就是有@Resource注解
     * */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">AnnotationUtils</span><span class="token punctuation">.</span><span class="token function">isCandidateClass</span><span class="token punctuation">(</span>clazz<span class="token punctuation">,</span> resourceAnnotationTypes<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token constant">EMPTY</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InjectionMetadata<span class="token punctuation">.</span>InjectedElement</span><span class="token punctuation">&gt;</span></span> elements <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span> targetClass <span class="token operator">=</span> clazz<span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * do...while 递归父类,找到有 @Resource 的字段、方法 装饰成 ResourceElement,记录在 elements
     * 这个集合属于 InjectionMetadata 的，也就是说 InjectionMetadata 对应的就是一个类
     * */</span>
    <span class="token keyword">do</span> <span class="token punctuation">{</span>
        <span class="token keyword">final</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InjectionMetadata<span class="token punctuation">.</span>InjectedElement</span><span class="token punctuation">&gt;</span></span> currElements <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">ReflectionUtils</span><span class="token punctuation">.</span><span class="token function">doWithLocalFields</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">,</span> field <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>webServiceRefClass <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> field<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span>webServiceRefClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@WebServiceRef annotation is not supported on static fields&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WebServiceRefElement</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> field<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ejbClass <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> field<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span>ejbClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@EJB annotation is not supported on static fields&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">EjbRefElement</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> field<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">Resource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@Resource annotation is not supported on static fields&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>ignoredResourceTypes<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>field<span class="token punctuation">.</span><span class="token function">getType</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ResourceElement</span><span class="token punctuation">(</span>field<span class="token punctuation">,</span> field<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">ReflectionUtils</span><span class="token punctuation">.</span><span class="token function">doWithLocalMethods</span><span class="token punctuation">(</span>targetClass<span class="token punctuation">,</span> method <span class="token operator">-&gt;</span> <span class="token punctuation">{</span>
            <span class="token class-name">Method</span> bridgedMethod <span class="token operator">=</span> <span class="token class-name">BridgeMethodResolver</span><span class="token punctuation">.</span><span class="token function">findBridgedMethod</span><span class="token punctuation">(</span>method<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token class-name">BridgeMethodResolver</span><span class="token punctuation">.</span><span class="token function">isVisibilityBridgeMethodPair</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> bridgedMethod<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">ClassUtils</span><span class="token punctuation">.</span><span class="token function">getMostSpecificMethod</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>webServiceRefClass <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> bridgedMethod<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span>webServiceRefClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@WebServiceRef annotation is not supported on static methods&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token doc-comment comment">/**
                     * @Resouce 标注的方法，只允许有一个参数
                     * */</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getParameterCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@WebServiceRef annotation requires a single-arg method: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token class-name">PropertyDescriptor</span> pd <span class="token operator">=</span> <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">findPropertyForMethod</span><span class="token punctuation">(</span>bridgedMethod<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">WebServiceRefElement</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> bridgedMethod<span class="token punctuation">,</span> pd<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>ejbClass <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> bridgedMethod<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span>ejbClass<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@EJB annotation is not supported on static methods&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getParameterCount</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@EJB annotation requires a single-arg method: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token class-name">PropertyDescriptor</span> pd <span class="token operator">=</span> <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">findPropertyForMethod</span><span class="token punctuation">(</span>bridgedMethod<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">EjbRefElement</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> bridgedMethod<span class="token punctuation">,</span> pd<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>bridgedMethod<span class="token punctuation">.</span><span class="token function">isAnnotationPresent</span><span class="token punctuation">(</span><span class="token class-name">Resource</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">Modifier</span><span class="token punctuation">.</span><span class="token function">isStatic</span><span class="token punctuation">(</span>method<span class="token punctuation">.</span><span class="token function">getModifiers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@Resource annotation is not supported on static methods&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token class-name">Class</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token operator">?</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">[</span><span class="token punctuation">]</span> paramTypes <span class="token operator">=</span> method<span class="token punctuation">.</span><span class="token function">getParameterTypes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span>paramTypes<span class="token punctuation">.</span>length <span class="token operator">!=</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">IllegalStateException</span><span class="token punctuation">(</span><span class="token string">&quot;@Resource annotation requires a single-arg method: &quot;</span> <span class="token operator">+</span> method<span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span><span class="token keyword">this</span><span class="token punctuation">.</span>ignoredResourceTypes<span class="token punctuation">.</span><span class="token function">contains</span><span class="token punctuation">(</span>paramTypes<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                        <span class="token class-name">PropertyDescriptor</span> pd <span class="token operator">=</span> <span class="token class-name">BeanUtils</span><span class="token punctuation">.</span><span class="token function">findPropertyForMethod</span><span class="token punctuation">(</span>bridgedMethod<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
                        currElements<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">ResourceElement</span><span class="token punctuation">(</span>method<span class="token punctuation">,</span> bridgedMethod<span class="token punctuation">,</span> pd<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        elements<span class="token punctuation">.</span><span class="token function">addAll</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">,</span> currElements<span class="token punctuation">)</span><span class="token punctuation">;</span>
        targetClass <span class="token operator">=</span> targetClass<span class="token punctuation">.</span><span class="token function">getSuperclass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">while</span> <span class="token punctuation">(</span>targetClass <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">&amp;&amp;</span> targetClass <span class="token operator">!=</span> <span class="token class-name">Object</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token keyword">return</span> <span class="token class-name">InjectionMetadata</span><span class="token punctuation">.</span><span class="token function">forElements</span><span class="token punctuation">(</span>elements<span class="token punctuation">,</span> clazz<span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="postprocessproperties" tabindex="-1"><a class="header-anchor" href="#postprocessproperties" aria-hidden="true">#</a> postProcessProperties</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token keyword">protected</span> <span class="token keyword">void</span> <span class="token function">populateBean</span><span class="token punctuation">(</span><span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token class-name">RootBeanDefinition</span> mbd<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">BeanWrapper</span> bw<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 若bw为nul1的话，则说明对象没有实例化</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>bw <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">hasPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token comment">// 进入if 说明对象有属性，bw为空，不能为他设置属性，那就在下面就执行抛出异常</span>
            <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>
                    mbd<span class="token punctuation">.</span><span class="token function">getResourceDescription</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> <span class="token string">&quot;Cannot apply property values to null instance&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token comment">// Skip property population phase for null instance.</span>
            <span class="token keyword">return</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 在属性被填充前，给 InstantiationAwareBeanPostProcessor 类型的后置处理器一个修改
     * bean状态的机会。官方的解释是：让用户可以自定义属性注入。比如用户实现一
     * 个 InstantiationAwareBeanPostProcessor 类型的后置处理器，并通过
     * postProcessAfterInstantiation 方法向bean的成员变量注入自定义的信息
     * 当时我们发现系统中的的 InstantiationAwareBeanPostProcessor.postProcessAfterInstantiation 没有进行任何处理
     * 若我们自己实现了这个接口可以自定义处理.... spring留给我们自已扩展接口的
     * 特殊需求，直接使用配置中的信息注入即可
     * */</span>
    <span class="token comment">// Give any InstantiationAwareBeanPostProcessors the opportunity to modify the</span>
    <span class="token comment">// state of the bean before properties are set. This can be used, for example,</span>
    <span class="token comment">// to support styles of field injection.</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>mbd<span class="token punctuation">.</span><span class="token function">isSynthetic</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> <span class="token function">hasInstantiationAwareBeanPostProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">InstantiationAwareBeanPostProcessor</span> bp <span class="token operator">:</span> <span class="token function">getBeanPostProcessorCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>instantiationAware<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             *  后置处理器的【第五次】InstantiationAwareBeanPostProcessor的postProcessAfterInstantiation
             * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">cn<span class="token punctuation">.</span>haitaoss<span class="token punctuation">.</span>javaconfig<span class="token punctuation">.</span>beanpostprocessor<span class="token punctuation">.</span></span><span class="token class-name">MyInstantiationAwareBeanPostProcessor</span></span>的postProcessAfterInstantiation(Object, String)
             *
             * 若存在后置处理器给我们属性赋值了，那么返回fale可以来修改我们的开关变量，就不会走下面的逻辑了
             * */</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>bp<span class="token punctuation">.</span><span class="token function">postProcessAfterInstantiation</span><span class="token punctuation">(</span>bw<span class="token punctuation">.</span><span class="token function">getWrappedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token doc-comment comment">/**
                 * 返回值为是否继续填充bean
                 * postProcessAfterInstantiation:如果应该在bean上面设置属性则返回true,否则返回 false
                 * 一般情况下，应该是返回true。
                 * 返回 false的话，将会阻止在此Bean实例上调用任何后续的 InstantiationAwareBeanPostProcessor
                 */</span>
                <span class="token keyword">return</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token comment">// 获取bean定义的属性</span>
    <span class="token class-name">PropertyValues</span> pvs <span class="token operator">=</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">hasPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">?</span> mbd<span class="token punctuation">.</span><span class="token function">getPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">:</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token doc-comment comment">/**
     * 判断我们的bean的属性注入模型
     * AUTOWIRE_BY_NAME 根据名称注入
     * AUTOWIRE_BY_TYPE 根据类型注入
     *
     * 可以这样子指定：@Bean(autowire = Autowire.BY_NAME)
     * */</span>
    <span class="token keyword">int</span> resolvedAutowireMode <span class="token operator">=</span> mbd<span class="token punctuation">.</span><span class="token function">getResolvedAutowireMode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>resolvedAutowireMode <span class="token operator">==</span> <span class="token constant">AUTOWIRE_BY_NAME</span> <span class="token operator">||</span> resolvedAutowireMode <span class="token operator">==</span> <span class="token constant">AUTOWIRE_BY_TYPE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// 把 PropertyValues 封装成为 MutablePropertyValues</span>
        <span class="token class-name">MutablePropertyValues</span> newPvs <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">MutablePropertyValues</span><span class="token punctuation">(</span>pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">// 根据bean的属性名称注入</span>
        <span class="token comment">// Add property values based on autowire by name if applicable.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>resolvedAutowireMode <span class="token operator">==</span> <span class="token constant">AUTOWIRE_BY_NAME</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 这里主要是会判断 有没有 <span class="token punctuation">{</span> BeanWrapper的getPropertyDescriptor(String)<span class="token punctuation">}</span> 是要给 <span class="token punctuation">{</span> AbstractAutowireCapableBeanFactory的ignoredDependencyInterfaces<span class="token punctuation">}</span>
             * 的接口方法设置值的，排除掉这些 PropertyDescriptor。
             * */</span>
            <span class="token function">autowireByName</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> bw<span class="token punctuation">,</span> newPvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 根据bean的类型进行注入</span>
        <span class="token comment">// Add property values based on autowire by type if applicable.</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>resolvedAutowireMode <span class="token operator">==</span> <span class="token constant">AUTOWIRE_BY_TYPE</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * 这里主要是会判断 有没有 <span class="token punctuation">{</span> BeanWrapper的getPropertyDescriptor(String)<span class="token punctuation">}</span> 是要给 <span class="token punctuation">{</span> AbstractAutowireCapableBeanFactory的ignoredDependencyInterfaces<span class="token punctuation">}</span>
             * 的接口方法设置值的，排除掉这些 PropertyDescriptor。
             * */</span>
            <span class="token function">autowireByType</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> bw<span class="token punctuation">,</span> newPvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token comment">// 把处理过的属性覆盖原来的</span>
        pvs <span class="token operator">=</span> newPvs<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 这里又是一种后置处理，用于在 Spring 填充属性到bean对象前，对属性的值进行相应的处理
     * 比如可以修改某些属性的值。这时注入到bean中的值就不是配置文件中的内容了，
     * 而是经过后置处理器修改后的内容
     * */</span>
    <span class="token keyword">boolean</span> hasInstAwareBpps <span class="token operator">=</span> <span class="token function">hasInstantiationAwareBeanPostProcessors</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// 判断是否需要检查依赖</span>
    <span class="token keyword">boolean</span> needsDepCheck <span class="token operator">=</span> <span class="token punctuation">(</span>mbd<span class="token punctuation">.</span><span class="token function">getDependencyCheck</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token class-name">AbstractBeanDefinition</span><span class="token punctuation">.</span><span class="token constant">DEPENDENCY_CHECK_NONE</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// 退出当前正在创建的 beanWrapper依赖的对象</span>
    <span class="token class-name">PropertyDescriptor</span><span class="token punctuation">[</span><span class="token punctuation">]</span> filteredPds <span class="token operator">=</span> <span class="token keyword">null</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>hasInstAwareBpps<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>pvs <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            pvs <span class="token operator">=</span> mbd<span class="token punctuation">.</span><span class="token function">getPropertyValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">InstantiationAwareBeanPostProcessor</span> bp <span class="token operator">:</span> <span class="token function">getBeanPostProcessorCache</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>instantiationAware<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             *  后置处理器的【第六次】InstantiationAwareBeanPostProcessor的postProcessProperties
             * 进行字段和方法的依赖注入<span class="token punctuation">{</span> cn.haitaoss.javaconfig.beanpostprocessor.MyInstantiationAwareBeanPostProcessor的postProcessProperties(PropertyValues, Object, String)<span class="token punctuation">}</span>
             */</span>
            <span class="token class-name">PropertyValues</span> pvsToUse <span class="token operator">=</span> bp<span class="token punctuation">.</span><span class="token function">postProcessProperties</span><span class="token punctuation">(</span>pvs<span class="token punctuation">,</span> bw<span class="token punctuation">.</span><span class="token function">getWrappedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span> <span class="token punctuation">(</span>pvsToUse <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>filteredPds <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    filteredPds <span class="token operator">=</span> <span class="token function">filterPropertyDescriptorsForDependencyCheck</span><span class="token punctuation">(</span>bw<span class="token punctuation">,</span> mbd<span class="token punctuation">.</span>allowCaching<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
                <span class="token doc-comment comment">/**
                 *  后置处理器的【第七次】cn.haitaoss.javaconfig.beanpostprocessor.MyInstantiationAwareBeanPostProcessor的postProcessPropertyValues(org.springframework.beans.PropertyValues, java.beans.PropertyDescriptor[], java.lang.Object, java.lang.String)
                 * 过时方法了，不建议使用
                 * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">cn<span class="token punctuation">.</span>haitaoss<span class="token punctuation">.</span>javaconfig<span class="token punctuation">.</span>beanpostprocessor<span class="token punctuation">.</span></span><span class="token class-name">MyInstantiationAwareBeanPostProcessor</span></span>的postProcessPropertyValues(PropertyValues, Object, String)
                 */</span>
                pvsToUse <span class="token operator">=</span> bp<span class="token punctuation">.</span><span class="token function">postProcessPropertyValues</span><span class="token punctuation">(</span>pvs<span class="token punctuation">,</span> filteredPds<span class="token punctuation">,</span> bw<span class="token punctuation">.</span><span class="token function">getWrappedInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> beanName<span class="token punctuation">)</span><span class="token punctuation">;</span>
                <span class="token keyword">if</span> <span class="token punctuation">(</span>pvsToUse <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token keyword">return</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            pvs <span class="token operator">=</span> pvsToUse<span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token comment">// 需要检查依赖</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>needsDepCheck<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>filteredPds <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            filteredPds <span class="token operator">=</span> <span class="token function">filterPropertyDescriptorsForDependencyCheck</span><span class="token punctuation">(</span>bw<span class="token punctuation">,</span> mbd<span class="token punctuation">.</span>allowCaching<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token function">checkDependencies</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> filteredPds<span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token doc-comment comment">/**
     * 其实，上面只是完成了所有注入属性的获取，将获取的属性封装在 PropertyValues的实例对象pvs中，
     * 并没有应用到已经实例化的bean中。而
     * <span class="token keyword">@see</span> <span class="token reference"><span class="token namespace">org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>beans<span class="token punctuation">.</span>factory<span class="token punctuation">.</span>support<span class="token punctuation">.</span></span><span class="token class-name">AbstractAutowireCapableBeanFactory</span></span>的applyPropertyValues(java.lang.String, org.springframework.beans.factory.config.BeanDefinition, org.springframework.beans.BeanWrapper, org.springframework.beans.PropertyValues)
     * 则是完成这一步骤的
     * */</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>pvs <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">applyPropertyValues</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> mbd<span class="token punctuation">,</span> bw<span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">AutowiredAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">PropertyValues</span> <span class="token function">postProcessProperties</span><span class="token punctuation">(</span><span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 拿到要注入member信息，有缓存机制。
     * 在 <span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor的postProcessMergedBeanDefinition<span class="token punctuation">}</span> 就解析过了。
     * */</span>
    <span class="token class-name">InjectionMetadata</span> metadata <span class="token operator">=</span> <span class="token function">findAutowiringMetadata</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> bean<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 会根据 InjectionMetadata 需要注入的信息，
         * 往 PropertyValues 中设置
         * */</span>
        metadata<span class="token punctuation">.</span><span class="token function">inject</span><span class="token punctuation">(</span>bean<span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">BeanCreationException</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> ex<span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token string">&quot;Injection of autowired dependencies failed&quot;</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> pvs<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token class-name">CommonAnnotationBeanPostProcessor</span><span class="token operator">:</span>
<span class="token annotation punctuation">@Override</span>
<span class="token keyword">public</span> <span class="token class-name">PropertyValues</span> <span class="token function">postProcessProperties</span><span class="token punctuation">(</span><span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">,</span> <span class="token class-name">Object</span> bean<span class="token punctuation">,</span> <span class="token class-name">String</span> beanName<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token doc-comment comment">/**
     * 找到类里面有 @Resource 的字段、方法 包装成 ResourceElement 对象，然后属于 InjectionMetadata。
     * */</span>
    <span class="token class-name">InjectionMetadata</span> metadata <span class="token operator">=</span> <span class="token function">findResourceMetadata</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> bean<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">try</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 就是遍历 <span class="token punctuation">{</span> InjectionMetadata的injectedElements<span class="token punctuation">}</span> 进行注入
         * */</span>
        metadata<span class="token punctuation">.</span><span class="token function">inject</span><span class="token punctuation">(</span>bean<span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">Throwable</span> ex<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">throw</span> <span class="token keyword">new</span> <span class="token class-name">BeanCreationException</span><span class="token punctuation">(</span>beanName<span class="token punctuation">,</span> <span class="token string">&quot;Injection of resource dependencies failed&quot;</span><span class="token punctuation">,</span> ex<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> pvs<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="injectionmetadata-inject" tabindex="-1"><a class="header-anchor" href="#injectionmetadata-inject" aria-hidden="true">#</a> InjectionMetadata.inject</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 就是遍历其 injectedElements 属性，执行 <span class="token punctuation">{</span> InjectedElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
 * <span class="token keyword">@param</span> <span class="token parameter">target</span>
 * <span class="token keyword">@param</span> <span class="token parameter">beanName</span>
 * <span class="token keyword">@param</span> <span class="token parameter">pvs</span>
 * <span class="token keyword">@throws</span> <span class="token reference"><span class="token class-name">Throwable</span></span>
 */</span>
<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">inject</span><span class="token punctuation">(</span><span class="token class-name">Object</span> target<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">String</span> beanName<span class="token punctuation">,</span> <span class="token annotation punctuation">@Nullable</span> <span class="token class-name">PropertyValues</span> pvs<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">Throwable</span> <span class="token punctuation">{</span>
    <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InjectedElement</span><span class="token punctuation">&gt;</span></span> checkedElements <span class="token operator">=</span> <span class="token keyword">this</span><span class="token punctuation">.</span>checkedElements<span class="token punctuation">;</span>
    <span class="token class-name">Collection</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">InjectedElement</span><span class="token punctuation">&gt;</span></span> elementsToIterate <span class="token operator">=</span>
            <span class="token punctuation">(</span>checkedElements <span class="token operator">!=</span> <span class="token keyword">null</span> <span class="token operator">?</span> checkedElements <span class="token operator">:</span> <span class="token keyword">this</span><span class="token punctuation">.</span>injectedElements<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>elementsToIterate<span class="token punctuation">.</span><span class="token function">isEmpty</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token doc-comment comment">/**
         * 遍历 elementsToIterate。
         *
         * 比如 AutowiredAnnotationBeanPostProcessor 生成的 InjectionMetadata，其中的
         * injectedElements 属性的值，其实就是 标注了@Autowired、@Value注解的字段和方法
         * */</span>
        <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">InjectedElement</span> element <span class="token operator">:</span> elementsToIterate<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token doc-comment comment">/**
             * target 是 bean对象
             * Field 的注入  <span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor.AutowiredFieldElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
             * Method 的注入 <span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor.AutowiredMethodElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
             *
             * 如果是 ResourceElement 执行的是 <span class="token punctuation">{</span> InjectedElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
             * */</span>
            element<span class="token punctuation">.</span><span class="token function">inject</span><span class="token punctuation">(</span>target<span class="token punctuation">,</span> beanName<span class="token punctuation">,</span> pvs<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="injectedelement的inject" tabindex="-1"><a class="header-anchor" href="#injectedelement的inject" aria-hidden="true">#</a> InjectedElement的inject</h2><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2023/12/09/fy9aG3.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 依赖注入：@Resource标注的字段、方法是执行父类方法 <span class="token punctuation">{</span> InjectionMetadata.InjectedElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
 *
 * 是字段，直接反射设置值
 *      \`field.set(target, getResourceToInject(target, requestingBeanName));\`
 *
 * 是方法，先判断是否应该跳过，不跳过就反射执行方法
 *      - 检查是否跳过 <span class="token punctuation">{</span> InjectionMetadata.InjectedElement的checkPropertySkipping(PropertyValues)<span class="token punctuation">}</span>
 *          就是判断 PropertyValues 中有没有这个方法的信息，存在就跳过
 *      - 反射执行方法 \`method.invoke(target, getResourceToInject(target, requestingBeanName));\`
 *
 * 获取注入的值，会在这里判断是否创建代理对象 <span class="token punctuation">{</span> CommonAnnotationBeanPostProcessor.ResourceElement的getResourceToInject(Object, String)<span class="token punctuation">}</span>
 *      - element没有@Lazy注解，直接获取注入值 <span class="token punctuation">{</span> CommonAnnotationBeanPostProcessor的getResource(CommonAnnotationBeanPostProcessor.LookupElement, String)<span class="token punctuation">}</span>
 *      - element有@Lazy注解，构建代理对象作为注入值 <span class="token punctuation">{</span> CommonAnnotationBeanPostProcessor的buildLazyResourceProxy(CommonAnnotationBeanPostProcessor.LookupElement, String)<span class="token punctuation">}</span>
 *          1. 定义内部类TargetSource
 *              TargetSource ts = new TargetSource() <span class="token punctuation">{</span>
 *                  @Override
 *                  public Object getTarget() <span class="token punctuation">{</span>
 *                      // 执行代理对象的方法时，会调\`getTarget\`得到被代理对象，所以是在执行代理对象的方法时才会执行依赖的解析
 *                      // 这就是@Lazy的原理哦，延时创建
 *                      return getResource(element, requestingBeanName);
 *                  <span class="token punctuation">}</span>
 *              <span class="token punctuation">}</span>;
 *
 *          2. return 创建的代理对象
 *              ProxyFactory pf = new ProxyFactory();
 *              pf.setTargetSource(ts);
 *              return pf.getProxy(classLoader);
 * getResource
 *  <span class="token punctuation">{</span> CommonAnnotationBeanPostProcessor的getResource(CommonAnnotationBeanPostProcessor.LookupElement, String)<span class="token punctuation">}</span>
 *  <span class="token punctuation">{</span> CommonAnnotationBeanPostProcessor的autowireResource(BeanFactory, CommonAnnotationBeanPostProcessor.LookupElement, String)<span class="token punctuation">}</span>
 *      - BeanFactory中没有依赖的名字\`!factory.containsBean(name)\`
 *          构造 <span class="token punctuation">{</span> CommonAnnotationBeanPostProcessor.LookupElement的getDependencyDescriptor()<span class="token punctuation">}</span> 
 *              字段使用这个\`new LookupDependencyDescriptor((Field) this.member, this.lookupType);\`
 *              方法使用这个\`new LookupDependencyDescriptor((Method) this.member, this.lookupType);\`
 *          通过 DependencyDescriptor 从BeanFactory得到依赖值 <span class="token punctuation">{</span> DefaultListableBeanFactory的resolveDependency(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
 *      - BeanFactory中有依赖的名字
 *          通过name从BeanFactory得到依赖值 <span class="token punctuation">{</span> AbstractBeanFactory的getBean(String, Clazz)<span class="token punctuation">}</span>
 *      - 记录依赖关系 <span class="token punctuation">{</span> ConfigurableBeanFactory的registerDependentBean(String, String)<span class="token punctuation">}</span> 
 * 			Tips:所以说@Resource 是byName再byType
 * */</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="autowiredfieldelement的inject" tabindex="-1"><a class="header-anchor" href="#autowiredfieldelement的inject" aria-hidden="true">#</a> AutowiredFieldElement的inject</h2><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2023/12/09/IC4Fsh.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 依赖注入：@Autowired、@Value 标注的字段会执行这个 <span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor.AutowiredFieldElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
 *  - 解析字段值 \`value = resolveFieldValue(field, bean, beanName);\`
 *  - 反射给字段设置值 \`field.set(bean, value);\`
 *
 * 解析字段值 <span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor.AutowiredFieldElement的resolveFieldValue(Field, Object, String)<span class="token punctuation">}</span>
 *      - 构造\`new DependencyDescriptor(field, this.required);\`
 *      - 通过 DependencyDescriptor 从BeanFactory得到依赖值 <span class="token punctuation">{</span> DefaultListableBeanFactory的resolveDependency(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
 *      - 记录依赖关系 <span class="token punctuation">{</span> ConfigurableBeanFactory的registerDependentBean(String, String)<span class="token punctuation">}</span>
 *      - 缓存起来 \`this.cachedFieldValue = cachedFieldValue;\`
 * */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="autowiredmethodelement的inject" tabindex="-1"><a class="header-anchor" href="#autowiredmethodelement的inject" aria-hidden="true">#</a> AutowiredMethodElement的inject</h2><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2023/12/09/E3ZCmD.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 依赖注入：@Autowired、@Value 标注的方法会执行这个<span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor.AutowiredMethodElement的inject(Object, String, PropertyValues)<span class="token punctuation">}</span>
 *      - 解析方法参数列表的值 \`arguments = resolveMethodArguments(method, bean, beanName);\`
 *      - 反射执行方法 \`method.invoke(bean, arguments);\`
 *
 * 解析参数列表的值 <span class="token punctuation">{</span> AutowiredAnnotationBeanPostProcessor.AutowiredMethodElement的resolveMethodArguments(Method, Object, String)<span class="token punctuation">}</span>
 *      - 遍历方法参数列表，挨个解析 \`for (int i = 0; i &lt; arguments.length; i++) <span class="token punctuation">{</span><span class="token punctuation">}</span>\`
 *      - 构造，也就是一个参数是一个DependencyDescriptor
 *          MethodParameter methodParam = new MethodParameter(method, i);
 *          DependencyDescriptor currDesc = new DependencyDescriptor(methodParam, this.required);
 *      - 通过 DependencyDescriptor 从BeanFactory得到依赖值 <span class="token punctuation">{</span> DefaultListableBeanFactory的resolveDependency(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
 *      - 记录依赖关系 <span class="token punctuation">{</span> ConfigurableBeanFactory的registerDependentBean(String, String)<span class="token punctuation">}</span>
 *      - 缓存起来 \`this.cachedMethodArguments = cachedMethodArguments;\`
 * */</span>
 <span class="token operator">*</span> 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="defaultlistablebeanfactory的resolvedependency" tabindex="-1"><a class="header-anchor" href="#defaultlistablebeanfactory的resolvedependency" aria-hidden="true">#</a> DefaultListableBeanFactory的resolveDependency</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 解析依赖 <span class="token punctuation">{</span> DefaultListableBeanFactory的resolveDependency(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
 *  1. 有@Lazy就创建代理对象快速返回 \`Object result = getAutowireCandidateResolver().getLazyResolutionProxyIfNecessary(descriptor, requestingBeanName);\`
 *      - 使用BeanFactory的AutowireCandidateResolver 解析 <span class="token punctuation">{</span> ContextAnnotationAutowireCandidateResolver的getLazyResolutionProxyIfNecessary(DependencyDescriptor, String)<span class="token punctuation">}</span>
 *          - 是否有@Lazy注解 <span class="token punctuation">{</span> ContextAnnotationAutowireCandidateResolver的isLazy(DependencyDescriptor)<span class="token punctuation">}</span>
 *              字段 DependencyDescriptor：字段是否有@Lazy注解
*              方法的参数 DependencyDescriptor：参数是否有@Lazy注解，没有在接着看其Method是否有@Lazy注解
 *          - 有就创建代理对象 <span class="token punctuation">{</span> ContextAnnotationAutowireCandidateResolver的buildLazyResolutionProxy(DependencyDescriptor, String)<span class="token punctuation">}</span>
 *                  TargetSource ts = new TargetSource() <span class="token punctuation">{</span>
 *                       public Object getTarget() <span class="token punctuation">{</span>
 *                           // 执行代理对象的方法时，会调\`getTarget\`得到被代理对象，所以是在执行代理对象的方法时才会执行依赖的解析
 *                           // 这就是@Lazy的原理哦，延时解析依赖
 *                           return dlbf.doResolveDependency(descriptor, beanName, autowiredBeanNames, null);
 *                       <span class="token punctuation">}</span>
 *                   <span class="token punctuation">}</span>;
 *                   ProxyFactory pf = new ProxyFactory();
 *                   pf.setTargetSource(ts);
 *                   return pf.getProxy();
 *
 *      - 解析的值不是null，就return
 *
 *  2. 开始解析依赖 <span class="token punctuation">{</span> DefaultListableBeanFactory的doResolveDependency(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
 * */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="defaultlistablebeanfactory的doresolvedependency" tabindex="-1"><a class="header-anchor" href="#defaultlistablebeanfactory的doresolvedependency" aria-hidden="true">#</a> DefaultListableBeanFactory的doResolveDependency</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
* 开始解析依赖 <span class="token punctuation">{</span> DefaultListableBeanFactory的doResolveDependency(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
*
*  标记一下，正在进行依赖解析 \`InjectionPoint previousInjectionPoint = ConstructorResolver.setCurrentInjectionPoint(descriptor);\`
*
*  处理有@Value的情况，没有@Value就会往下判断了
*      - 拿到@Value注解的值。查找顺序: 字段、方法参数没有@Value() -&gt; 如果是方法参数依赖，就看看方法上有没有@Value
*          \`Object value = getAutowireCandidateResolver().getSuggestedValue(descriptor);\`
*          <span class="token punctuation">{</span> QualifierAnnotationAutowireCandidateResolver的getSuggestedValue(DependencyDescriptor)<span class="token punctuation">}</span>
*
*      - value是String类型
*          - 解析占位符 <span class="token punctuation">{</span> AbstractBeanFactory的resolveEmbeddedValue(String)<span class="token punctuation">}</span>
*              \`String strVal = resolveEmbeddedValue((String) value);\`
*          - 进行SpEL的解析,这里就会从容器中获取bean
*              \`value = evaluateBeanDefinitionString(strVal, bd);\`
*              <span class="token punctuation">{</span> AbstractBeanFactory的evaluateBeanDefinitionString(String, BeanDefinition)<span class="token punctuation">}</span>
*
*      - 拿到 TypeConverter \`TypeConverter converter = (typeConverter != null ? typeConverter : getTypeConverter());\`
*              SimpleTypeConverter typeConverter = new SimpleTypeConverter();
*              typeConverter.setConversionService(getConversionService()); // 从容器中获取一个name 是 conversionService 的bean
*              registerCustomEditors(typeConverter); // 使用BeanFactory的ResourceEditorRegistrar对typeConverter进行加工，默认是有这个\`ResourceEditorRegistrar\`
*              return typeConverter;
*      - 使用 TypeConverter，直接return 完成依赖的解析 \`return converter.convertIfNecessary(value, type, descriptor.getTypeDescriptor());\`
*
*  依赖类型是多个的情况 \`Object multipleBeans = resolveMultipleBeans(descriptor, beanName, autowiredBeanNames, typeConverter);\` <span class="token punctuation">{</span> DefaultListableBeanFactory的resolveMultipleBeans(DependencyDescriptor, String, Set, TypeConverter)<span class="token punctuation">}</span>
*      - 就是依赖的类型是 数组、Collection、Map的时候才会处理
*      - 查找AutowireCandidates <span class="token punctuation">{</span> DefaultListableBeanFactory的findAutowireCandidates(String, Clazz, DependencyDescriptor)<span class="token punctuation">}</span>
*      - 使用converter转换 \`Object result = converter.convertIfNecessary(matchingBeans.values(), type);\`
*      - 使用依赖排序器，对结果进行排序 <span class="token punctuation">{</span> DefaultListableBeanFactory的adaptDependencyComparator(Map)<span class="token punctuation">}</span>
*      - multipleBeans!=null 直接\`return multipleBeans;\`
*
*  查找AutowireCandidates \`Map<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String,</span> <span class="token attr-name">Object</span><span class="token punctuation">&gt;</span></span> matchingBeans = findAutowireCandidates(beanName, type, descriptor);\` <span class="token punctuation">{</span> DefaultListableBeanFactory的findAutowireCandidates(String, Clazz, DependencyDescriptor)<span class="token punctuation">}</span>
*      - 没有匹配的bean,这个依赖还是必须的，那就直接抛出异常 \`matchingBeans.isEmpty() &amp;&amp; isRequired(descriptor) \`
*
*  存在多个候选bean，需要确定唯一一个。因为到这一步的依赖肯定是单个对象的，所以要从多个候选者中确定唯一的一个 \`matchingBeans.size() &gt; 1\`
*      - <span class="token punctuation">{</span> DefaultListableBeanFactory的determineAutowireCandidate(Map, DependencyDescriptor)<span class="token punctuation">}</span>
*
*  拿到唯一的bean \`instanceCandidate = matchingBeans.get(autowiredBeanName);\`
*
*  是否需要实例化,
*      if (instanceCandidate instanceof Class)
*          instanceCandidate = descriptor.resolveCandidate(autowiredBeanName, type, this); // 这个就是 \`getBean()\`
*
*  返回依赖的值 \`return instanceCandidate;\`
*
*  移除标记 \`ConstructorResolver.setCurrentInjectionPoint(previousInjectionPoint);\`
*
*  Tips：先判断是不是@Value的自动注入，解析结果不为null直接return；再看看依赖类型是不是多个(数组、集合、Map) 解析到值就return；最后就是依赖类型是单个对象的情况咯，
*  单个对象的依赖就需要从多个候选者中确定唯一一个，确定不了就报错咯
* */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="defaultlistablebeanfactory的findautowirecandidates" tabindex="-1"><a class="header-anchor" href="#defaultlistablebeanfactory的findautowirecandidates" aria-hidden="true">#</a> DefaultListableBeanFactory的findAutowireCandidates</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * <span class="token punctuation">{</span> DefaultListableBeanFactory的findAutowireCandidates(String, Clazz, DependencyDescriptor)<span class="token punctuation">}</span>
 *
 *  - 局部变量，记录候选bean,key是beanName，value是bean对象或者是beanClass \`Map<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>String,</span> <span class="token attr-name">Object</span><span class="token punctuation">&gt;</span></span> result = CollectionUtils.newLinkedHashMap();\`
 *
 *  - 通过类型从BeanFactory找到匹配的candidateNames <span class="token punctuation">{</span> BeanFactoryUtils的beanNamesForTypeIncludingAncestors(ListableBeanFactory, Clazz, boolean, boolean)<span class="token punctuation">}</span>
 *      <span class="token punctuation">{</span> DefaultListableBeanFactory的getBeanNamesForType(Clazz, boolean, boolean)<span class="token punctuation">}</span>
 *      <span class="token punctuation">{</span> DefaultListableBeanFactory的doGetBeanNamesForType(ResolvableType, boolean, boolean)<span class="token punctuation">}</span>
 *          - 先从 BeanDefinitionMap 中找，根据依赖的类型进行匹配
 *          - 再从 manualSingletonNames 中找，根据依赖的类型进行匹配。这种是 <span class="token punctuation">{</span> DefaultListableBeanFactory的registerSingleton(String, Object)<span class="token punctuation">}</span> 这样子注册的，直接就放到单例池不会在BeanDefinitionMap中有记录
 *
 *  - 再从 resolvableDependencies 找到类型匹配的候选者。因为依赖是已经实例化好了，所以直接记录到result中。
 *      \`result.put(beanName, autowiringValue);\`
 *      Tips：resolvableDependencies 也叫bean伪装，因为这些依赖值是直接new出来的，不是通过\`getBean()\` 创建出来的。相当于扩展了BeanFactory可以注入的依赖类型。
 *
 *  - 遍历 candidateNames，是自动注入候选者就 \`getBean()\` 创建出bean对象，然后存到result中
 *      是自动注入候选者 <span class="token punctuation">{</span> QualifierAnnotationAutowireCandidateResolver的isAutowireCandidate(BeanDefinitionHolder, DependencyDescriptor)<span class="token punctuation">}</span>
 *          1. 先检查 这个就是检查BeanDefinition的属性值 <span class="token punctuation">{</span> AbstractBeanDefinition的isAutowireCandidate()<span class="token punctuation">}</span>
 *          2. 匹配了，再检查字段依赖@Qualifier校验,和方法依赖其参数@Qualifier校验
 *          3. 匹配了，是方法依赖且方法返回值不是Void，再才进行方法@Qualifier的匹配
 *          Tips：就是看看 @Qualifier(&quot;name&quot;) 与 candidateName 一致，就是true
 *
 *      是，就记录到result中 <span class="token punctuation">{</span> DefaultListableBeanFactory的addCandidateEntry(Map, String, DependencyDescriptor, Clazz)<span class="token punctuation">}</span>
 *          分为三种情况：
 *          1. 依赖类型是 数组、集合、Map等 \`descriptor instanceof MultiElementDescriptor\`
 *              依赖类型是多个，所以需要把类型的bean都通过BeanFactory创建出来
 *              - 通过BeanFactory得到bean实例 <span class="token punctuation">{</span> DependencyDescriptor的resolveCandidate(String, Clazz, BeanFactory)<span class="token punctuation">}</span>
 *              - 记录 \`result.put(candidateName, beanInstance);\`
 *
 *          2. candidateName 已经在单例池创建好了，所以可以直接拿
 *              - 通过BeanFactory得到bean实例 <span class="token punctuation">{</span> DependencyDescriptor的resolveCandidate(String, Clazz, BeanFactory)<span class="token punctuation">}</span>
 *              - 记录 \`result.put(candidateName, beanInstance);\`
 *
 *          3. 依赖类型不是多个，且单例池没有，那么只记录其Clazz,目的是防止不依赖的bean也被创建了
 *              - 从BeanFactory中 通过beanName拿到其类型， <span class="token punctuation">{</span> AbstractBeanFactory的getType(String)<span class="token punctuation">}</span>
 *              - 记录 \`result.put(candidateName, getType(candidateName));\`
 *              Tips：确定好唯一一个beanName的时候才会在实例化的。
 *
 *          Tips: \`DependencyDescriptor的resolveCandidate\` 其实就是 \`beanFactory.getBean(beanName)\`
 *
 *  - 返回 result
 * */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="defaultlistablebeanfactory的determineautowirecandidate" tabindex="-1"><a class="header-anchor" href="#defaultlistablebeanfactory的determineautowirecandidate" aria-hidden="true">#</a> DefaultListableBeanFactory的determineAutowireCandidate</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 确定自动注入候选者 <span class="token punctuation">{</span> DefaultListableBeanFactory的determineAutowireCandidate(Map, DependencyDescriptor)<span class="token punctuation">}</span>
 *
 * 先通过@Primary查找 <span class="token punctuation">{</span> DefaultListableBeanFactory的determinePrimaryCandidate(Map, Clazz)<span class="token punctuation">}</span>
 *   如果 candidateName 有@Primary就返回。这里是会有判断的存在多个候选者有@Primary就抛出异常，所以说一个依赖类型只能有一个@Primary注解标注
 *  \`return candidateName;\`
 *
 * 没有找到@Primary，在通过beanClass的@Priority(1) <span class="token punctuation">{</span> DefaultListableBeanFactory的determineHighestPriorityCandidate(Map, Clazz)<span class="token punctuation">}</span>
 *   返回排序值小的结果。这个是为了处理依赖类型是父类，然后容器中有多个子类实现的时候，可以通过@Priority(1) 来决定那个子类优先级搞。
 *  \`return candidateName;\`
 *      Tips：如果容器存在同一类型的bean有多个，就会报错，因为@Primary()的值都一样，无法确定，只能报错咯
 *
 * 兜底方法，bean实例是resolvableDependencies里面的 或者 beanName是(字段名 或者 方法参数名)，也能确定出唯一的候选者
 *  \`return candidateName;\`
 *
 * 都没得，就\`\`return null\`\`
 * 
 * Tips: 如果依赖类型不是多个的会通过 @Primary -&gt; @Priority -&gt; bean实例是resolvableDependencies里面的 -&gt; beanName是(字段名 或者 方法参数名) 确定出唯一的候选者
 * */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="abstractbeanfactory的evaluatebeandefinitionstring" tabindex="-1"><a class="header-anchor" href="#abstractbeanfactory的evaluatebeandefinitionstring" aria-hidden="true">#</a> AbstractBeanFactory的evaluateBeanDefinitionString</h2><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code><span class="token doc-comment comment">/**
 * 比如 @Value(&quot;的<span class="token punctuation">{</span>beanA<span class="token punctuation">}</span>&quot;)
 *
 * <span class="token punctuation">{</span> AbstractBeanFactory的evaluateBeanDefinitionString(String, BeanDefinition)<span class="token punctuation">}</span>
 *
 * 使用 \`StandardBeanExpressionResolver\` 进行计算 <span class="token punctuation">{</span> StandardBeanExpressionResolver的evaluate(String, BeanExpressionContext)<span class="token punctuation">}</span>
 *      \`return this.beanExpressionResolver.evaluate(value, new BeanExpressionContext(this, scope));\`
 *
 *      // value 就是 &quot;的<span class="token punctuation">{</span>beanA<span class="token punctuation">}</span>&quot; ,而beanExpressionParserContext 就是替换掉 的<span class="token punctuation">{</span><span class="token punctuation">}</span>。也就是变成了 beanA ，也就是要访问 beanA这个属性
 *      Expression expr = new SpelExpressionParser().parseExpression(value, this.beanExpressionParserContext);
 *      StandardEvaluationContext sec = new StandardEvaluationContext(evalContext);
 *      // 设置属性访问器，就是用来解析 beanA 属性时，会调用这个访问器来获取值
 *      sec.addPropertyAccessor(new BeanExpressionContextAccessor());
 *      // 返回SpEL解析的结果
 *      expr.getValue(sec);
 *
 * 通过属性访问器，读取 beanA 属性值 <span class="token punctuation">{</span> BeanExpressionContextAccessor的read(EvaluationContext, Object, String)<span class="token punctuation">}</span>
 *      \`(BeanExpressionContext) target).getObject(name)\` <span class="token punctuation">{</span> BeanExpressionContext的getObject(String)<span class="token punctuation">}</span>
 *      而 BeanExpressionContext 包装了BeanFactory和Scope。所以\`getObject\`
 *
 *      if (this.beanFactory.containsBean(key)) <span class="token punctuation">{</span>
 * 			return this.beanFactory.getBean(key);
 *      <span class="token punctuation">}</span>
 * 		else if (this.scope != null) <span class="token punctuation">{</span>
 * 			return this.scope.resolveContextualObject(key);
 *      <span class="token punctuation">}</span>
 * 		else <span class="token punctuation">{</span>
 * 			return null;
 *      <span class="token punctuation">}</span>
 * */</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="typeconvertersupport的convertifnecessary" tabindex="-1"><a class="header-anchor" href="#typeconvertersupport的convertifnecessary" aria-hidden="true">#</a> TypeConverterSupport的convertIfNecessary</h2><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2023/12/09/nmTF2N.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>对依赖进行转换是执行\`<span class="token class-name">TypeConverterSupport</span>的convertIfNecessary\`。

\`<span class="token class-name">TypeConverterSupport</span>\` 其实是聚合了 \`<span class="token class-name">PropertyEditor</span>\` 和 \`<span class="token class-name">ConversionService</span>\`<span class="token punctuation">,</span>这两个才是真正干活的东西。

\`<span class="token class-name">ConversionService</span>\`真正干活是使用\`<span class="token class-name">GenericConverter</span>\`<span class="token punctuation">,</span>\`<span class="token class-name">ConversionService</span>\`只是聚合了多个\`<span class="token class-name">GenericConverter</span>\`而已。

\`<span class="token class-name">PropertyEditorRegistrar</span>\` 是用来加工 \`<span class="token class-name">PropertyEditorRegistry</span>\`的，就是用来给其设置\`<span class="token class-name">PropertyEditor</span>\`的。

扩展\`<span class="token class-name">PropertyEditorRegistrar</span>\` 是通过 \`<span class="token class-name">CustomEditorConfigurer</span>\`

\`<span class="token class-name">PropertyEditorSupport</span>\` 是<span class="token constant">JDK</span>提供的，\`<span class="token class-name">ConversionService</span>\`是<span class="token class-name">Spring</span>提供的。


<span class="token doc-comment comment">/**
 * 依赖注入时，会拿到TypeConverter <span class="token punctuation">{</span> AbstractBeanFactory的getTypeConverter()<span class="token punctuation">}</span> ，进行转换
 *      SimpleTypeConverter typeConverter = new SimpleTypeConverter();
 *      // 从容器中获取一个name是 conversionService 的bean
 *      typeConverter.setConversionService(getConversionService());
 *      // 使用BeanFactory的ResourceEditorRegistrar对typeConverter进行加工
 *      // 主要是设置这个属性 <span class="token punctuation">{</span> PropertyEditorRegistrySupport的overriddenDefaultEditors<span class="token punctuation">}</span>
 *      registerCustomEditors(typeConverter);
 *
 * 执行转换 <span class="token punctuation">{</span> TypeConverterSupport的convertIfNecessary(Object, Clazz, MethodParameter)<span class="token punctuation">}</span>
 *
 * 拿到自定义的PropertyEditor \`PropertyEditor editor = this.propertyEditorRegistry.findCustomEditor(requiredType, propertyName);\`
 *      先使用 propertyName + requiredType 从这个属性找 <span class="token punctuation">{</span> PropertyEditorRegistrySupport的customEditorsForPath<span class="token punctuation">}</span>
 *      找不到在使用 requiredType 从这个属性找 <span class="token punctuation">{</span> PropertyEditorRegistrySupport的customEditors<span class="token punctuation">}</span>
 *      Tips: 可以通过往容器中注入 CustomEditorConfigurer 来扩展这两个属性值
 *
 * 没有自定义的 PropertyEditor 但是有 ConversionService
 *      通过值类型 和 要赋值的对象 类型，判断是否可以转换。 <span class="token punctuation">{</span> ConversionService的canConvert(TypeDescriptor, TypeDescriptor)<span class="token punctuation">}</span>
 *          其实就是遍历 ConversionService 的属性 <span class="token punctuation">{</span> GenericConversionService.Converters<span class="token punctuation">}</span> 找到合适的 GenericConverter
 *              <span class="token punctuation">{</span> GenericConversionService.Converters的find(TypeDescriptor, TypeDescriptor)<span class="token punctuation">}</span>
 *                  <span class="token punctuation">{</span> GenericConversionService.Converters的getRegisteredConverter(TypeDescriptor, TypeDescriptor, GenericConverter.ConvertiblePair)<span class="token punctuation">}</span>
 *
 *      可以，就使用converter转换 <span class="token punctuation">{</span> ConversionService的convert(Object, TypeDescriptor, TypeDescriptor)<span class="token punctuation">}</span>
 *
 *      return 装换的结果
 *
 * 执行转换 <span class="token punctuation">{</span> TypeConverterDelegate的doConvertValue(Object, Object, Clazz, PropertyEditor)<span class="token punctuation">}</span>
 *      没有自定义的PropertyEditor 那就找默认的，先从这里面找 <span class="token punctuation">{</span> PropertyEditorRegistrySupport的overriddenDefaultEditors<span class="token punctuation">}</span>
 *      找不到在重这里面找 <span class="token punctuation">{</span> PropertyEditorRegistrySupport的defaultEditors<span class="token punctuation">}</span>
 *
 * return 装换的结果
 *
 * Tips: 具体的转换功能是有 PropertyEditor 和 ConversionService 实现的，而 ConversionService 的具体转换功能是由 GenericConverter 实现的。
 * */</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36),v=[c,i,l,u,r,d,k];function m(b,y){return t(),p("div",null,v)}const f=e(o,[["render",m],["__file","SpingInject.html.vue"]]);export{f as default};
