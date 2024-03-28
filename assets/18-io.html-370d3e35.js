import{_ as i,V as o,W as l,X as e,Y as r,Z as a,$ as n,F as s}from"./framework-159025ca.js";const c={},d=n(`<h1 id="网络编程" tabindex="-1"><a class="header-anchor" href="#网络编程" aria-hidden="true">#</a> 网络编程</h1><h3 id="_1-为什需要websocket" tabindex="-1"><a class="header-anchor" href="#_1-为什需要websocket" aria-hidden="true">#</a> 1. 为什需要websocket</h3><p>因为 HTTP 协议有一个缺陷：通信只能由客户端发起。</p><p>举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。</p><p>这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。我们只能使用轮询：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。</p><p>轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。</p><h3 id="_2-什么是websocket" tabindex="-1"><a class="header-anchor" href="#_2-什么是websocket" aria-hidden="true">#</a> 2.什么是websocket</h3><p>WebSocket 协议在2008年诞生，2011年成为国际标准。所有浏览器都已经支持了。</p><p>它的最大特点就是，服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，属于服务器推送技术的一种。</p><figure><img src="https://cdn.staticaly.com/gh/fxzbiz/img@url/2022/12/14/o0CAiT.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>其他特点包括：</p><p>（1）建立在 TCP 协议之上，服务器端的实现比较容易。</p><p>（2）与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。</p><p>（3）数据格式比较轻量，性能开销小，通信高效。</p><p>（4）可以发送文本，也可以发送二进制数据。</p><p>（5）没有同源限制，客户端可以与任意服务器通信。</p><p>（6）协议标识符是<code>ws</code>（如果加密，则为<code>wss</code>），服务器网址就是 URL。</p><blockquote><div class="language-markup line-numbers-mode" data-ext="markup"><pre class="language-markup"><code>ws://example.com:80/some/path
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></blockquote><figure><img src="https://cdn.staticaly.com/gh/fxzbiz/img@url/2022/12/14/MAaRyZ.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_3-websocket如何从http协议转化为websocket协议" tabindex="-1"><a class="header-anchor" href="#_3-websocket如何从http协议转化为websocket协议" aria-hidden="true">#</a> 3.WebSocket如何从HTTP协议转化为WebSocket协议？</h3><p>WebSocket依赖于HTTP连接，那么它如何从连接的HTTP协议转化为WebSocket协议？</p><p>每个WebSocket连接都始于一个HTTP请求。 具体来说，WebSocket协议在第一次握手连接时，通过HTTP协议在传送WebSocket支持的版本号，协议的字版本号，原始地址，主机地址等等一些列字段给服务器端：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key:dGhlIHNhbXBsZSBub25jZQ==
Origin: http://example.com
Sec-WebSocket-Version: 13
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意，关键的地方是，这里面有个Upgrade首部，用来把当前的HTTP请求升级到WebSocket协议，这是HTTP协议本身的内容，是为了扩展支持其他的通讯协议。 如果服务器支持新的协议，则必须返回101：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept:s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>至此，HTTP请求物尽其用，如果成功出发onopen事件，否则触发onerror事件，<strong>后面的传输则不再依赖HTTP协议</strong>，仅仅是借助 HTTP 协议完成握手。</p><h3 id="_4-websocket为什么依赖于http连接" tabindex="-1"><a class="header-anchor" href="#_4-websocket为什么依赖于http连接" aria-hidden="true">#</a> 4.WebSocket为什么依赖于HTTP连接</h3><p>第一，WebSocket设计上就是天生为HTTP增强通信（全双工通信等），所以在HTTP协议连接的基础上是很自然的一件事，并因此而能获得HTTP的诸多便利。</p><p>第二，这诸多便利中有一条很重要，基于HTTP连接将获得最大的一个兼容支持，比如即使服务器不支持WebSocket也能建立HTTP通信，只不过返回的是onerror而已，这显然比服务器无响应要好的多。</p><h3 id="_5-如何保证消息一定送达给用户" tabindex="-1"><a class="header-anchor" href="#_5-如何保证消息一定送达给用户" aria-hidden="true">#</a> 5.如何保证消息一定送达给用户</h3><p>我们在一起考虑下边界场景，客户端网络环境较差，特别是在移动端场景下，出现网络<strong>闪断</strong>，可能会出现连接实际已经断开，而服务端以为客户端处于在线的情况。此时，服务端会将消息发给客户端，那么消息实际就发送到“空气”中，产生丢失的情况。要解决这种情况下的问题，需要引入客户端的 ACK 消息机制。目前，主流的有两种做法。</p><p>第一种，基于每一条消息编号 ACK 。整体流程如下：</p><ul><li>无论客户端是否在线，服务端都先把接收到的消息持久化到数据库中。如果客户端此时在线，服务端将<strong>完整消息</strong>推送给客户端。</li><li>客户端在接收到消息之后，发送 ACK 消息编号给服务端，告知已经收到该消息。服务端在收到 ACK 消息编号的时候，标记该消息已经发送成功。</li><li>服务端定时轮询，在线的客户端，是否有超过 N 秒未 ACK 的消息。如果有，则重新发送消息给对应的客户端。</li></ul><p>这种方案，因为客户端逐条 ACK 消息编号，所以会导致客户端和服务端交互次数过多。当然，客户端可以异步批量 ACK 多条消息，从而减少次数。</p><p>不过因为服务端仍然需要定时轮询，也会导致服务端压力较大。所以，这种方案基本已经不采用了。</p><p>第二种，基于滑动窗口 ACK 。整体流程如下：</p><ul><li>无论客户端是否在线，服务端都先把接收到的消息持久化到数据库中。如果客户端此时在线，服务端将<strong>消息编号</strong>推送给客户端。</li><li>客户端在接收到<strong>消息编号</strong>之后，和本地的消息编号进行比对。如果比本地的小，说明该消息已经收到，忽略不处理；如果比本地的大，使用<strong>本地的</strong>消息编号，向服务端拉取<strong>大于</strong>本地的消息编号的消息列表，即增量消息列表。拉取完成后，更新消息列表中最大的消息编号为<strong>新的本地的</strong>消息编号。</li><li>服务端在收到客户端拉取增量的消息列表时，将请求的编号记录到数据库中，用于知道客户端此时本地的最新消息编号。</li><li>考虑到服务端将<strong>消息编号</strong>推送给客户端，也会存在丢失的情况，所以客户端会每 N 秒定时向服务端拉取<strong>大于</strong>本地的消息编号的消息列表。</li></ul><p>这种方式，在业务被称为<strong>推拉结合</strong>的方案，在分布式消息队列、配置中心、注册中心实现实时的数据同步，经常被采用。</p><p>并且，采用这种方案的情况下，客户端和服务端不一定需要使用<strong>长连接</strong>，也可以使用<strong>长轮询</strong>所替代。客户端发送带有消息版本号的 HTTP 请求到服务端。</p><ul><li>如果服务端<strong>已有</strong>比客户端新的消息编号，则直接返回增量的消息列表。</li><li>如果服务端<strong>没有</strong>比客户端新的消息编号，则 HOLD 住请求，直到有新的消息列表可以返回，或者 HTTP 请求超时。</li><li>客户端在收到 HTTP 请求超时时，立即又重新发起带有消息版本号的 HTTP 请求到服务端。如此反复循环，通过消息编号作为<strong>增量标识</strong>，达到实时获取消息的目的。</li></ul><h3 id="_6-bio-是什么" tabindex="-1"><a class="header-anchor" href="#_6-bio-是什么" aria-hidden="true">#</a> 6.BIO 是什么？</h3><p>🦅 <strong>概念</strong></p><ul><li>BIO ，全称 Block-IO ，是一种<strong>阻塞</strong> + <strong>同步</strong>的通信模式。</li><li>是一个比较传统的通信方式，模式简单，使用方便。但并发处理能力低，通信耗时，依赖网速。</li></ul><p>🦅 <strong>原理</strong></p><ul><li>服务器通过一个 Acceptor 线程，负责监听客户端请求和为每个客户端创建一个新的线程进行链路处理。典型的<strong>一请求一应答模式</strong>。</li><li>若客户端数量增多，频繁地创建和销毁线程会给服务器打开很大的压力。后改良为用线程池的方式代替新增线程，被称为伪异步 IO 。</li></ul><p>🦅 <strong>小结</strong></p><p>BIO 模型中，通过 Socket 和 ServerSocket 实现套接字通道的通信。阻塞，同步，建立连接耗时。</p><h3 id="_7-nio-是什么" tabindex="-1"><a class="header-anchor" href="#_7-nio-是什么" aria-hidden="true">#</a> 7.NIO 是什么？</h3><p>🦅 <strong>概念</strong></p><ul><li>NIO ，全称 New IO ，也叫 Non-Block IO ，是一种<strong>非阻塞</strong> + 同步的通信模式。</li></ul><p>🦅 <strong>原理</strong></p><ul><li>NIO 相对于 BIO 来说一大进步。客户端和服务器之间通过 Channel 通信。NIO 可以在 Channel 进行读写操作。这些 Channel 都会被注册在 Selector 多路复用器上。Selector 通过一个线程不停的轮询这些 Channel 。找出已经准备就绪的 Channel 执行 IO 操作。</li><li>NIO 通过一个线程轮询，实现千万个客户端的请求，这就是非阻塞 NIO 的特点。 <ul><li>缓冲区 Buffer ：它是 NIO 与 BIO 的一个重要区别。 <ul><li>BIO 是将数据直接写入或读取到流 Stream 对象中。</li><li>NIO 的数据操作都是在 Buffer 中进行的。Buffer 实际上是一个数组。Buffer 最常见的类型是ByteBuffer，另外还有 CharBuffer，ShortBuffer，IntBuffer，LongBuffer，FloatBuffer，DoubleBuffer。</li></ul></li><li>通道 Channel ：和流 Stream 不同，通道是双向的。NIO可以通过 Channel 进行数据的读、写和同时读写操作。 <ul><li>通道分为两大类：一类是网络读写（SelectableChannel），一类是用于文件操作（FileChannel）。我们使用的是前者 SocketChannel 和 ServerSocketChannel ，都是SelectableChannel 的子类。</li></ul></li><li>多路复用器 Selector ：NIO 编程的基础。多路复用器提供选择已经就绪的任务的能力：就是 Selector 会不断地轮询注册在其上的通道（Channel），如果某个通道处于就绪状态，会被 Selector 轮询出来，然后通过 SelectionKey 可以取得就绪的Channel集合，从而进行后续的 IO 操作。 <ul><li>服务器端只要提供一个线程负责 Selector 的轮询，就可以接入成千上万个客户端，这就是 JDK NIO 库的巨大进步。</li></ul></li></ul></li></ul><p>🦅 <strong>小结</strong></p><p>NIO 模型中通过 SocketChannel 和 ServerSocketChannel 实现套接字通道的通信。非阻塞，同步，避免为每个 TCP 连接创建一个线程。</p><h3 id="_8-bio、nio-有什么区别" tabindex="-1"><a class="header-anchor" href="#_8-bio、nio-有什么区别" aria-hidden="true">#</a> 8.BIO、NIO 有什么区别？</h3>`,55),u=e("li",null,"BIO：一个连接一个线程，客户端有连接请求时服务器端就需要启动一个线程进行处理。所以，线程开销大。可改良为用线程池的方式代替新创建线程，被称为伪异步 IO 。",-1),p={href:"http://svip.iocoder.cn/Netty/EventLoop-1-Reactor-Model/",target:"_blank",rel:"noopener noreferrer"},g=e("li",null,"BIO 是面向流( Stream )的，而 NIO 是面向缓冲区( Buffer )的。",-1),h=e("li",null,"BIO 的各种操作是阻塞的，而 NIO 的各种操作是非阻塞的。",-1),f=e("li",null,"BIO 的 Socket 是单向的，而 NIO 的 Channel 是双向的",-1),b=n('<figure><img src="https://cdn.staticaly.com/gh/fxzbiz/img@url/2022/12/14/oduKXO.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cdn.staticaly.com/gh/fxzbiz/img@url/2022/12/14/0ovTZe.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_9-aio-是什么" tabindex="-1"><a class="header-anchor" href="#_9-aio-是什么" aria-hidden="true">#</a> 9.AIO 是什么？</h3><p>🦅 <strong>概念</strong></p><ul><li>AIO ，全称 Asynchronous IO ，也叫 NIO<strong>2</strong> ，是一种<strong>非阻塞</strong> + <strong>异步</strong>的通信模式。在 NIO 的基础上，引入了新的异步通道的概念，并提供了异步文件通道和异步套接字通道的实现。</li><li>原理：</li><li>AIO 并没有采用 NIO 的多路复用器，而是使用异步通道的概念。其 read，write 方法的返回类型，都是 Future 对象。而 Future 模型是异步的，其核心思想是：<strong>去主函数等待时间</strong>。</li></ul><h3 id="_10-direct-buffer-和-non-direct-buffer-的区别" tabindex="-1"><a class="header-anchor" href="#_10-direct-buffer-和-non-direct-buffer-的区别" aria-hidden="true">#</a> 10.Direct Buffer 和 Non-Direct Buffer 的区别</h3><p><strong>Direct Buffer:</strong></p><ul><li>所分配的内存不在 JVM 堆上, 不受 GC 的管理.(但是 Direct Buffer 的 Java 对象是由 GC 管理的, 因此当发生 GC, 对象被回收时, Direct Buffer 也会被释放)</li><li>因为 Direct Buffer 不在 JVM 堆上分配, 因此 Direct Buffer 对应用程序的内存占用的影响就不那么明显(实际上还是占用了这么多内存, 但是 JVM 不好统计到非 JVM 管理的内存.)</li><li>申请和释放 Direct Buffer 的开销比较大. 因此正确的使用 Direct Buffer 的方式是在初始化时申请一个 Buffer, 然后不断复用此 buffer, 在程序结束后才释放此 buffer.</li><li>使用 Direct Buffer 时, 当进行一些底层的系统 IO 操作时, 效率会比较高, 因为此时 JVM 不需要拷贝 buffer 中的内存到中间临时缓冲区中.</li></ul><p><strong>Non-Direct Buffer:</strong></p><ul><li>直接在 JVM 堆上进行内存的分配, 本质上是 byte[] 数组的封装.</li><li>因为 Non-Direct Buffer 在 JVM 堆中, 因此当进行操作系统底层 IO 操作中时, 会将此 buffer 的内存复制到中间临时缓冲区中. 因此 Non-Direct Buffer 的效率就较低.</li></ul>',10);function T(m,I){const t=s("ExternalLinkIcon");return o(),l("div",null,[d,e("ul",null,[e("li",null,[r("线程模型不同 "),e("ul",null,[u,e("li",null,[r("NIO：一个请求一个线程，但客户端发送的连接请求都会注册到多路复用器上，多路复用器轮询到连接有新的 I/O 请求时，才启动一个线程进行处理。可改良为一个线程处理多个请求，基于 "),e("a",p,[r("多 Reactor 模型"),a(t)]),r("。")])])]),g,h,f]),b])}const k=i(c,[["render",T],["__file","18-io.html.vue"]]);export{k as default};