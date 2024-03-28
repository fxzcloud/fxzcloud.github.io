import{_ as n,V as s,W as r,X as a,Z as o,Y as i,$ as t,F as d}from"./framework-159025ca.js";const c={},p=a("h1",{id:"哈罗春招-newcoder",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#哈罗春招-newcoder","aria-hidden":"true"},"#"),i(" 哈罗春招-newcoder")],-1),l={href:"https://www.nowcoder.com/discuss/602051634667024384",target:"_blank",rel:"noopener noreferrer"},h=t(`<figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2024/03/28/epWo5n.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="一面" tabindex="-1"><a class="header-anchor" href="#一面" aria-hidden="true">#</a> 一面</h2><h3 id="_3-静态路由和动态路由应该使用什么数据结构存储" tabindex="-1"><a class="header-anchor" href="#_3-静态路由和动态路由应该使用什么数据结构存储" aria-hidden="true">#</a> 3:静态路由和动态路由应该使用什么数据结构存储？</h3><h4 id="静态路由" tabindex="-1"><a class="header-anchor" href="#静态路由" aria-hidden="true">#</a> 静态路由</h4><p>静态路由是在网络设备中手动配置的路由信息，不会随着网络拓扑或流量变化而改变。静态路由，可使用以下数据结构存储：</p><ul><li><p><strong>哈希表（Hash Table）</strong>：可以使用哈希表存储静态路由信息，以快速查找路由目的地和对应的下一跳地址。</p></li><li><p><strong>字典（Dictionary）</strong>：类似于哈希表，字典也可以用于存储路由表，实现路由目的地到下一跳地址的映射。</p></li><li><p><strong>数组（Array）</strong>：对于小规模的路由表，可以使用数组进行存储，通过索引来快速查找目的地和下一跳地址。</p></li></ul><h4 id="动态路由" tabindex="-1"><a class="header-anchor" href="#动态路由" aria-hidden="true">#</a> 动态路由</h4><p>动态路由是由路由协议动态学习和更新的路由信息，能够根据网络拓扑和流量变化自动调整路由。可以使用以下数据结构存储：</p><ul><li><strong>路由表（Routing Table）</strong>：动态路由协议会维护一个路由表，其中包含了动态学习到的路由信息，通常使用树形数据结构（如二叉树、Trie树）或者图（Graph）来表示网络拓扑和路由关系。</li><li><strong>链表（Linked List）</strong>：在动态路由协议中，路由更新消息通常会以链表形式传递，因此链表也可以用于存储和处理动态路由信息。</li><li><strong>优先队列（Priority Queue）</strong>：某些动态路由协议（如距离矢量路由协议）中，路由选择可能会基于某些指标（如距离、成本），优先队列可以帮助快速选择最佳路由。</li></ul><h3 id="_4-线程池参数含义-执行流程-调优过程" tabindex="-1"><a class="header-anchor" href="#_4-线程池参数含义-执行流程-调优过程" aria-hidden="true">#</a> 4.线程池参数含义，执行流程，调优过程？</h3><h4 id="参数" tabindex="-1"><a class="header-anchor" href="#参数" aria-hidden="true">#</a> 参数：</h4><p>7大参数，核心线程数、最大线程数、等待队列、拒绝策略、线程存活时间、时间单位、线程工厂。</p><h4 id="执行流程" tabindex="-1"><a class="header-anchor" href="#执行流程" aria-hidden="true">#</a> 执行流程：</h4><p>是否达到核心线程数，达到则判断等待队列是否满了，等待队列满了判断是否到达最大线程数，到达最大线程数则使用拒绝策略。</p><p>判断空闲线程是否超过核心线程数，超过最大存活时间后销毁。</p><h4 id="调优" tabindex="-1"><a class="header-anchor" href="#调优" aria-hidden="true">#</a> 调优：</h4><h5 id="线程数层面" tabindex="-1"><a class="header-anchor" href="#线程数层面" aria-hidden="true">#</a> 线程数层面：</h5><p>需要根据实际业务情况调整，一般：cpu密集型 n+1 、io密集型 2n+1。</p><h5 id="任务队列层面" tabindex="-1"><a class="header-anchor" href="#任务队列层面" aria-hidden="true">#</a> 任务队列层面：</h5><p>一般选用有界队列。</p><h5 id="线程存活时间层面" tabindex="-1"><a class="header-anchor" href="#线程存活时间层面" aria-hidden="true">#</a> 线程存活时间层面：</h5><p>根据任务执行时间和系统响应需求，设置合适的线程存活时间，避免频繁线程的创建和销毁。</p><h3 id="_5-常用的线程池有什么" tabindex="-1"><a class="header-anchor" href="#_5-常用的线程池有什么" aria-hidden="true">#</a> 5.常用的线程池有什么？</h3><p>ThreadPoolExecutor。</p><p>还可以通过Executors框架创建具有单个线程的线程池、固定数量的线程池、可以动态调整的线程池。但是一般我们不用，因为前两个的队列是无界队列，最后一个的最大线程数是无界的。可能会导致资源耗尽或任务积压的风险。</p><h3 id="_6-线程池开始创建的时候-线程数是等于核心线程数的吗" tabindex="-1"><a class="header-anchor" href="#_6-线程池开始创建的时候-线程数是等于核心线程数的吗" aria-hidden="true">#</a> 6.线程池开始创建的时候，线程数是等于核心线程数的吗？</h3><ul><li>当前线程数&lt;核心线程数时，进来1个任务即生成一个核心线程。</li><li>线程数达到核心线程数，但阻塞队列没有满，线程数不变。</li><li>阻塞队列满了，每进来1个任务便生成1个线程，但不会超过最大线程。</li><li>当前线程数=最大线程数，阻塞队列也满了，那么新来的任务将进入抛弃策略。</li></ul><p>综上，不是的，小于核心线程数的时候，来一个创建一个。</p><h3 id="_7-java原生线程池直接使用会有什么问题" tabindex="-1"><a class="header-anchor" href="#_7-java原生线程池直接使用会有什么问题" aria-hidden="true">#</a> 7.Java原生线程池直接使用会有什么问题？</h3><ul><li>避免重复创建线程池。。。</li><li>手动指定参数，避免oom以及耗尽资源。</li><li>和threadLocal共用会有问题，可以用阿里的ttl。</li></ul><h3 id="_8-arraylist底层实现" tabindex="-1"><a class="header-anchor" href="#_8-arraylist底层实现" aria-hidden="true">#</a> 8.ArrayList底层实现？</h3><p>数据结构：数组</p><p>初始化大小：默认大小10。指定容量，则会初始化为指定容量大小。</p><p>扩容： 是原来容量的1.5倍，底层是将原来容量执行一个右移1位的操作+原来容量就得到一个扩容后的容量，执行扩容时会使用系统System的数组复制方法arraycopy()进行扩容</p><p>比较：ArrayList遍历性能要比LinkedList好，因为ArrayList底层是数组，LinkedList是链表，数组在存储数据时内存是连续的，CPU内部的缓存结构会缓存连续的内存片段，可以大幅度降低内存的开销。</p><p>特征：</p><p>ArrayList 查询快，增删慢，如果增删和尾部靠近，也不慢（线程不安全） LinkedList 查询慢，增删快（线程不安全） Vector（线程安全，使用Synchronized）</p><p>使用场景：</p><p>频繁增删，使用LinkedList 追求线程安全，使用Vector 普通的用来查询，使用ArrayList。（三者难以全包含，只能在互相之间做取舍）</p><h3 id="_9-arraylist如何变成并发安全的-说下你的设计" tabindex="-1"><a class="header-anchor" href="#_9-arraylist如何变成并发安全的-说下你的设计" aria-hidden="true">#</a> 9.ArrayList如何变成并发安全的？说下你的设计</h3><ul><li>使用JDK1.0发布的Vector类，因为底层方法使用了synchronized关键字，效率较低，不推荐使用。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>	 <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vector</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>使用集合类的顶层父类Collections类的synchronizedList()方法，传入参数为普通的Arraylist。</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>     <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list2 <span class="token operator">=</span> <span class="token class-name">Collections</span><span class="token punctuation">.</span><span class="token function">synchronizedList</span><span class="token punctuation">(</span>list<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>JUC下的CopyOnWriteArrayList方法,底层采用写入时复制（推荐使用，性能比Vector高）</li></ul><div class="language-java line-numbers-mode" data-ext="java"><pre class="language-java"><code>   <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">&gt;</span></span> list <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">CopyOnWriteArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="_10-java如何实现线程安全的-哪些数据结构是线程安全的" tabindex="-1"><a class="header-anchor" href="#_10-java如何实现线程安全的-哪些数据结构是线程安全的" aria-hidden="true">#</a> 10.Java如何实现线程安全的？哪些数据结构是线程安全的？</h3><p>synchronized关键字、ReentrantLock等。</p><p>基于操作系统的监视器锁，进入代码块计数、进入方法有标识。</p><p>Aqs, 等待队列+唤醒机制+状态变量+cas。</p><p>ConcurrentHashMap、HashTab、CopyOnWriteArrayList、ThreadLocal等。</p><h3 id="_11-看过juc的源码吗-谈一下你了解的地方" tabindex="-1"><a class="header-anchor" href="#_11-看过juc的源码吗-谈一下你了解的地方" aria-hidden="true">#</a> 11.看过JUC的源码吗？谈一下你了解的地方</h3><p>ReentrantLock等底层都基于aqs实现，aqs中的队列存放要等待的线程，状态变量表示锁的状态，可以实现公平、非公平、等待唤醒机制。</p><h3 id="_12-乐观锁和悲观锁底层如何实现的" tabindex="-1"><a class="header-anchor" href="#_12-乐观锁和悲观锁底层如何实现的" aria-hidden="true">#</a> 12.乐观锁和悲观锁底层如何实现的？</h3><p>悲观锁：每次操作都认为数据被修改了，所以都会加锁。</p><p>乐观锁：认为数据没有修改，不加锁。</p><p>悲观锁可以通过synchronized等加锁的方式实现。</p><p>乐观锁像AtomicInteger是通过cas实现的。</p><h3 id="_13-公平锁和非公平锁的底层如何实现" tabindex="-1"><a class="header-anchor" href="#_13-公平锁和非公平锁的底层如何实现" aria-hidden="true">#</a> 13.公平锁和非公平锁的底层如何实现</h3><p>公平锁会判断aqs队列中是否有等待的线程，有的话进到队列等待，没有的话执行。</p><p>非公平锁直接抢锁。</p><h3 id="_14-java如何判断一个对象需要回收的" tabindex="-1"><a class="header-anchor" href="#_14-java如何判断一个对象需要回收的" aria-hidden="true">#</a> 14.Java如何判断一个对象需要回收的？</h3><p>引用计数法和可达性分析法。</p><p>引用计数法，根据对象的引用来判断，缺点是可能存在循环引用的问题。</p><p>可达性分析法通过GC Root来标识，被标识到的标识是可达的，不会回收。</p><p>GC ROOT: 虚拟机栈引用的对象、本地方法栈引用的对象、常量池引用的对象、被锁持有的对象。</p><h3 id="_15-你做的操作系统内核是如何实现垃圾回收的" tabindex="-1"><a class="header-anchor" href="#_15-你做的操作系统内核是如何实现垃圾回收的" aria-hidden="true">#</a> 15.你做的操作系统内核是如何实现垃圾回收的？</h3><p>0_0</p><h3 id="_16-kafka整体架构-kafka底层有多个partition-如何解决消息消费的顺序性-多节点消费者情况下-如何解决重复消费呢" tabindex="-1"><a class="header-anchor" href="#_16-kafka整体架构-kafka底层有多个partition-如何解决消息消费的顺序性-多节点消费者情况下-如何解决重复消费呢" aria-hidden="true">#</a> 16.Kafka整体架构？Kafka底层有多个Partition，如何解决消息消费的顺序性？多节点消费者情况下，如何解决重复消费呢？</h3><ol><li><strong>Producer</strong>：负责向Kafka集群发布消息。</li><li><strong>Broker</strong>：Kafka集群中的每个节点称为Broker，负责存储数据和处理数据的读写请求。</li><li><strong>ZooKeeper</strong>：Kafka使用ZooKeeper来进行集群管理、协调和元数据存储。</li><li><strong>Consumer</strong>：消费者从Kafka集群订阅消息并进行消费。</li><li><strong>Topic</strong>：: Producer 将消息发送到特定的主题，Consumer 通过订阅特定的 Topic(主题) 来消费消息。</li><li><strong>Partition（分区）</strong> : Partition 属于 Topic 的一部分。一个 Topic 可以有多个 Partition ，并且同一 Topic 下的 Partition 可以分布在不同的 Broker 上，这也就表明一个 Topic 可以横跨多个 Broker 。</li></ol><p>对于底层的Partition，Kafka中每个Topic可以划分为多个Partition，每个Partition中的消息是有序的。Kafka保证了同一Partition内消息的顺序性，但对于不同Partition的消息无法保证全局的顺序性。</p><p>针对多节点消费者情况下的重复消费问题，Kafka提供了以下两种方式来解决：</p><ol><li><strong>Consumer Group</strong>：Kafka允许多个消费者组成一个Consumer Group来消费一个Topic的消息，每个消息只会被Consumer Group中的一个消费者消费。这样可以避免同一组内的消费者重复消费消息。</li><li><strong>Offset Commit</strong>：Kafka通过记录每个消费者在每个Partition中消费到的位置（即Offset），消费者定期提交Offset信息。当消费者重启或发生故障时，可以根据提交的Offset信息来恢复之前的消费进度，避免重复消费消息。</li></ol><p><code>RocketMQ</code> 技术架构中有四大角色 <code>NameServer</code>、<code>Broker</code>、<code>Producer</code>、<code>Consumer</code> 。我来向大家分别解释一下这四个角色是干啥的。</p><ul><li><p><code>Broker</code>：主要负责消息的存储、投递和查询以及服务高可用保证。说白了就是消息队列服务器嘛，生产者生产消息到 <code>Broker</code> ，消费者从 <code>Broker</code> 拉取消息并消费。</p><p>这里，我还得普及一下关于 <code>Broker</code>、<code>Topic</code> 和 队列的关系。上面我讲解了 <code>Topic</code> 和队列的关系——一个 <code>Topic</code> 中存在多个队列，那么这个 <code>Topic</code> 和队列存放在哪呢？</p><p><strong>一个 <code>Topic</code> 分布在多个 <code>Broker</code>上，一个 <code>Broker</code> 可以配置多个 <code>Topic</code> ，它们是多对多的关系</strong>。</p><p>如果某个 <code>Topic</code> 消息量很大，应该给它多配置几个队列(上文中提到了提高并发能力)，并且 <strong>尽量多分布在不同 <code>Broker</code> 上，以减轻某个 <code>Broker</code> 的压力</strong> 。</p><p><code>Topic</code> 消息量都比较均匀的情况下，如果某个 <code>broker</code> 上的队列越多，则该 <code>broker</code> 压力越大。</p><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2024/03/28/oOa7Pi.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><blockquote><p>所以说我们需要配置多个 Broker。</p></blockquote><p><code>NameServer</code>：不知道你们有没有接触过 <code>ZooKeeper</code> 和 <code>Spring Cloud</code> 中的 <code>Eureka</code> ，它其实也是一个 <strong>注册中心</strong> ，主要提供两个功能：<strong>Broker 管理</strong> 和 <strong>路由信息管理</strong> 。说白了就是 <code>Broker</code> 会将自己的信息注册到 <code>NameServer</code> 中，此时 <code>NameServer</code> 就存放了很多 <code>Broker</code> 的信息(Broker 的路由表)，消费者和生产者就从 <code>NameServer</code> 中获取路由表然后照着路由表的信息和对应的 <code>Broker</code> 进行通信(生产者和消费者定期会向 <code>NameServer</code> 去查询相关的 <code>Broker</code> 的信息)。</p><p><code>Producer</code>：消息发布的角色，支持分布式集群方式部署。说白了就是生产者。</p><p><code>Consumer</code>：消息消费的角色，支持分布式集群方式部署。支持以 push 推，pull 拉两种模式对消息进行消费。同时也支持集群方式和广播方式的消费，它提供实时消息订阅机制。说白了就是消费者。</p></li></ul><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2024/03/28/jhpEJf.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>在 RabbitMQ 中，消息并不是直接被投递到 <strong>Queue(消息队列)</strong> 中的，中间还必须经过 <strong>Exchange(交换器)</strong> 这一层，<strong>Exchange(交换器)</strong> 会把我们的消息分配到对应的 <strong>Queue(消息队列)</strong> 中。</p><p><strong>Exchange(交换器)</strong> 用来接收生产者发送的消息并将这些消息路由给服务器中的队列中，如果路由不到，或许会返回给 <strong>Producer(生产者)</strong> ，或许会被直接丢弃掉 。这里可以将 RabbitMQ 中的交换器看作一个简单的实体。</p><p><strong>RabbitMQ 的 Exchange(交换器) 有 4 种类型，不同的类型对应着不同的路由策略</strong>：<strong>direct(默认)</strong>，<strong>fanout</strong>, <strong>topic</strong>, 和 <strong>headers</strong>，不同类型的 Exchange 转发消息的策略有所区别。这个会在介绍 <strong>Exchange Types(交换器类型)</strong> 的时候介绍到。</p><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/2024/03/28/bXh0hG.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_17-kafka如何保证可靠传输的-这里我从生产者、mq、消费者-三个角度考虑" tabindex="-1"><a class="header-anchor" href="#_17-kafka如何保证可靠传输的-这里我从生产者、mq、消费者-三个角度考虑" aria-hidden="true">#</a> 17.Kafka如何保证可靠传输的？(这里我从生产者、MQ、消费者 三个角度考虑)</h3><ol><li><strong>消息持久化</strong>：Kafka将消息持久化到磁盘上，即使在消息被消费之后仍然会保留一段时间（根据配置），确保消息不会丢失。</li><li><strong>副本机制</strong>：Kafka采用副本机制来保证数据的可靠性。每个Partition都可以配置多个副本，其中一个作为Leader副本，其余的是Follower副本。Leader负责处理读写请求，Follower负责复制Leader的数据。当Leader副本失败时，Kafka会从Follower中选举新的Leader继续提供服务。</li><li><strong>ACK机制</strong>：生产者发送消息到Kafka时，可以选择不同的ACK机制，包括<code>acks=0</code>、<code>acks=1</code>和<code>acks=all</code>。<code>acks=all</code>表示需要所有的副本都成功写入消息后才返回ACK给生产者，这样可以确保消息被可靠地复制到所有副本上。</li><li><strong>消息重试机制</strong>：如果消息在发送过程中出现错误，生产者可以选择进行消息重试，直到消息成功发送到Kafka。</li><li><strong>Offset管理</strong>：消费者消费消息时，Kafka会记录每个消费者消费到的位置（Offset），消费者可以定期提交Offset。即使消费者发生故障或重启，也可以根据提交的Offset信息来恢复消费进度，避免消息丢失或重复消费。</li></ol><h3 id="_18-redis源码看过吗-底层数据结构实现是怎么样的" tabindex="-1"><a class="header-anchor" href="#_18-redis源码看过吗-底层数据结构实现是怎么样的" aria-hidden="true">#</a> 18.Redis源码看过吗？底层数据结构实现是怎么样的？</h3><ol><li><strong>字符串（String）</strong>：Redis的字符串是动态字符串（dynamic string），底层基于sds（simple dynamic string）实现。sds是Redis自己实现的一种简单动态字符串，它提供了O(1)时间复杂度的字符串长度计算、尾部追加和尾部删除操作。</li><li><strong>哈希表（Hash）</strong>：Redis的哈希表用于存储键值对数据，底层采用开放地址法实现的哈希表。在哈希冲突时，Redis使用线性探测法来解决碰撞。</li><li><strong>列表（List）</strong>：Redis的列表底层使用双向链表实现。双向链表能够快速地进行插入和删除操作，同时支持在两个方向上的遍历。</li><li><strong>集合（Set）和有序集合（Sorted Set）</strong>：Redis的集合和有序集合底层使用哈希表实现。集合中的元素是唯一的，而有序集合中的元素是有序的，底层使用了跳表（skip list）来实现有序集合，以保证元素的有序性。</li></ol><h3 id="_19-redis分布式锁如何实现-实习中是如何实现的" tabindex="-1"><a class="header-anchor" href="#_19-redis分布式锁如何实现-实习中是如何实现的" aria-hidden="true">#</a> 19.Redis分布式锁如何实现？实习中是如何实现的？</h3><p>利用lua脚本实现命令执行的原子性。</p><p>利用hash结构存锁的重入次数。</p><p>利用hash结构存锁的线程信息。</p><p>利用看门狗(每30s续期)方式key在宕机后无法释放。</p><p>利用set集合存储等待的线程实现公平锁。</p><p>利用hash结构维护读锁还是写锁，嘟嘟不胡吃，读写互斥，写写互斥。</p><h3 id="_20-redis如何实现延时队列" tabindex="-1"><a class="header-anchor" href="#_20-redis如何实现延时队列" aria-hidden="true">#</a> 20.Redis如何实现延时队列？</h3><p>zset。</p><p>将每条消息作为有序集合中的一个成员，其中成员值为消息内容，分数为消息的到期时间戳（例如UNIX时间戳）。有序集合会根据分数自动排序成员，使得成员按照到期时间顺序排列。</p><p>定时任务可以采用Redis的<code>ZREMRANGEBYSCORE</code>命令，每隔一定时间检查有序集合中是否有到期的消息，即分数小于当前时间戳的消息。如果有到期的消息，则将其取出进行处理。</p><h3 id="_21-mysql索引实现原理" tabindex="-1"><a class="header-anchor" href="#_21-mysql索引实现原理" aria-hidden="true">#</a> 21.MySQL索引实现原理？</h3><p>b+树，聚簇索引。数据和索引文件放到一起，只有叶子节点同时存放数据和索引，每次查询都是从根节点到叶子节点，叶子节点有双向链表相连。</p><h3 id="_22-mysql查询一条数据-是如何查询到数据的" tabindex="-1"><a class="header-anchor" href="#_22-mysql查询一条数据-是如何查询到数据的" aria-hidden="true">#</a> 22.MySQL查询一条数据，是如何查询到数据的？</h3><p>连接器、查询缓存（8以后废弃）、分析器、优化器、执行器、存储引擎。</p><p>更新的时候，mysql会把数据从磁盘加载到缓存池中操作，记录更新前的数据到undolog，记录更改后的数据到redolog缓存池，事务提交后进行刷盘。</p><h3 id="_23-mysql索引失效场景" tabindex="-1"><a class="header-anchor" href="#_23-mysql索引失效场景" aria-hidden="true">#</a> 23.MySQL索引失效场景</h3><p>or两边有一个没索引就失效。</p><p>索引列有函数运算。</p><p>null值。</p><p>不符合最左前缀。</p><p>Like%在左边。</p><p>隐式类型转换。</p><p>not运算符。</p><h3 id="_24-mysql突然的-抖动-存在的原因可能有" tabindex="-1"><a class="header-anchor" href="#_24-mysql突然的-抖动-存在的原因可能有" aria-hidden="true">#</a> 24.MySQL突然的&quot;抖动&quot;存在的原因可能有？</h3><p>抽了吧0_0</p><h3 id="_25-mysql能保证数据不丢失吗-为什么" tabindex="-1"><a class="header-anchor" href="#_25-mysql能保证数据不丢失吗-为什么" aria-hidden="true">#</a> 25.MySQL能保证数据不丢失吗？为什么？</h3><p>redolog</p><h3 id="_26-mysql的自增id会用完吗-如果不会-为什么不会-会的话-会出现什么问题" tabindex="-1"><a class="header-anchor" href="#_26-mysql的自增id会用完吗-如果不会-为什么不会-会的话-会出现什么问题" aria-hidden="true">#</a> 26.MySQL的自增ID会用完吗？如果不会，为什么不会？会的话，会出现什么问题？</h3><p>会。</p><p><strong>扩大ID字段的范围</strong>：可以将ID字段的数据类型从INT扩大到BIGINT，这样可以将范围扩大到更大的整数值范围。</p>`,116);function u(g,k){const e=d("ExternalLinkIcon");return s(),r("div",null,[p,a("p",null,[a("a",l,[o(e)])]),h])}const m=n(c,[["render",u],["__file","newcoder-602051634667024384.html.vue"]]);export{m as default};
