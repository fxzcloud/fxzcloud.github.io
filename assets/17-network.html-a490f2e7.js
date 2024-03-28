import{_ as i,V as t,W as o,$ as r}from"./framework-159025ca.js";const n={},p=r(`<h1 id="计算机网络" tabindex="-1"><a class="header-anchor" href="#计算机网络" aria-hidden="true">#</a> 计算机网络</h1><h3 id="_1-应用层有哪些常见的协议" tabindex="-1"><a class="header-anchor" href="#_1-应用层有哪些常见的协议" aria-hidden="true">#</a> 1.应用层有哪些常见的协议？</h3><ul><li><p><strong>HTTP:超文本传输协议</strong></p><pre><code>  超文本传输协议主要是为 Web 浏览器与 Web 服务器之间的通信而设计的。当我们使用浏览器浏览网页的时候，我们网页就是通过 HTTP 请求进行加载的，整个过程如下图所示。
</code></pre></li></ul><figure><img src="https://minio.pigx.top/oss/2022/07/b5YwuN.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><pre><code>	HTTP 协是基于 TCP协议，发送 HTTP 请求之前首先要建立 TCP 连接也就是要经历 3 次握手。目前使用的 HTTP 协议大部分都是 1.1。在 1.1 的协议里面，默认是开启了 Keep-Alive 的，这样的话建立的连接就可以在多次请求中被复用了。
</code></pre><p>另外， HTTP 协议是”无状态”的协议，它无法记录客户端用户的状态，一般我们都是通过 Session 来记录客户端用户的状态。</p><ul><li><p><strong>SMTP:简单邮件传输(发送)协议</strong></p><pre><code>  **简单邮件传输(发送)协议（SMTP，Simple Mail Transfer Protocol）** 基于 TCP 协议，用来发送电子邮件。
  
  注意⚠️：**接受邮件的协议不是 SMTP 而是 POP3 协议。**
  
  SMTP 协议这块涉及的内容比较多，下面这两个问题比较重要：
  
  1.电子邮件的发送过程
  
  2.如何判断邮箱是真正存在的？
</code></pre></li></ul><p><strong>电子邮件的发送过程：</strong></p><p>比如我的邮箱是“dabai@cszhinan.com”，我要向“xiaoma@qq.com”发送邮件，整个过程可以简单分为下面几步：</p><ol><li>通过 <strong>SMTP</strong> 协议，我将我写好的邮件交给163邮箱服务器（邮局）。</li><li>163邮箱服务器发现我发送的邮箱是qq邮箱，然后它使用 SMTP协议将我的邮件转发到 qq邮箱服务器。</li><li>qq邮箱服务器接收邮件之后就通知邮箱为“xiaoma@qq.com”的用户来收邮件，然后用户就通过 <strong>POP3/IMAP</strong> 协议将邮件取出。</li></ol><p><strong>如何判断邮箱是真正存在的？</strong></p><p>很多场景(比如邮件营销)下面我们需要判断我们要发送的邮箱地址是否真的存在，这个时候我们可以利用 SMTP 协议来检测：</p><ol><li>查找邮箱域名对应的 SMTP 服务器地址</li><li>尝试与服务器建立连接</li><li>连接成功后尝试向需要验证的邮箱发送邮件</li><li>根据返回结果判定邮箱地址的真实性</li></ol><ul><li><p><strong>POP3/IMAP:邮件接收的协议</strong></p><pre><code>  这两个协议没必要多做阐述，只需要了解 **POP3 和 IMAP 两者都是负责邮件接收的协议**即可。另外，需要注意不要将这两者和 SMTP 协议搞混淆了。**SMTP 协议只负责邮件的发送，真正负责接收的协议是POP3/IMAP。**

  IMAP 协议相比于POP3更新一点，为用户提供的可选功能也更多一点,几乎所有现代电子邮件客户端和服务器都支持IMAP。大部分网络邮件服务提供商都支持POP3和IMAP。
</code></pre></li><li><p><strong>FTP:文件传输协议</strong></p><pre><code>  **FTP 协议** 主要提供文件传输服务，基于 TCP 实现可靠的传输。使用 FTP 传输文件的好处是可以屏蔽操作系统和文件存储方式。
  
  FTP 是基于客户—服务器（C/S）模型而设计的，在客户端与 FTP 服务器之间建立两个连接。如果我们要基于 FTP 协议开发一个文件传输的软件的话，首先需要搞清楚 FTP 的原理。关于 FTP 的原理，很多书籍上已经描述的非常详细了：
</code></pre></li></ul><blockquote><p>FTP 的独特的优势同时也是与其它客户服务器程序最大的不同点就在于它在两台通信的主机之间使用了两条 TCP 连接（其它客户服务器应用程序一般只有一条 TCP 连接）：</p><ol><li>控制连接：用于传送控制信息（命令和响应）</li><li>数据连接：用于数据传送；</li></ol><p>这种将命令和数据分开传送的思想大大提高了 FTP 的效率</p></blockquote><figure><img src="https://minio.pigx.top/oss/2022/07/5ScnnA.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><p><strong>Telnet:远程登陆协议</strong></p><pre><code>  **Telnet 协议** 通过一个终端登陆到其他服务器，建立在可靠的传输协议 TCP 之上。Telnet 协议的最大缺点之一是所有数据（包括用户名和密码）均以明文形式发送，这有潜在的安全风险。这就是为什么如今很少使用Telnet并被一种称为SSH的非常安全的协议所取代的主要原因。
</code></pre></li><li><p><strong>SSH:安全的网络传输协议</strong></p><pre><code>  **SSH（ Secure Shell）** 是目前较可靠，专为远程登录会话和其他网络服务提供安全性的协议。利用 SSH 协议可以有效防止远程管理过程中的信息泄露问题。SSH 建立在可靠的传输协议 TCP 之上。
  
  **Telnet 和 SSH 之间的主要区别在于 SSH 协议会对传输的数据进行加密保证数据安全性。**
</code></pre></li></ul><h3 id="_2-tcp-三次握手和四次挥手" tabindex="-1"><a class="header-anchor" href="#_2-tcp-三次握手和四次挥手" aria-hidden="true">#</a> 2.TCP 三次握手和四次挥手？</h3><p>为了准确无误地把数据送达目标处，TCP 协议采用了三次握手策略。</p><figure><img src="https://minio.pigx.top/oss/2022/07/9DXihZ.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://minio.pigx.top/oss/2022/07/WUYXd8.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>客户端–发送带有 SYN 标志的数据包–一次握手–服务端</li><li>服务端–发送带有 SYN/ACK 标志的数据包–二次握手–客户端</li><li>客户端–发送带有带有 ACK 标志的数据包–三次握手–服务端</li></ul><figure><img src="https://minio.pigx.top/oss/2022/07/JcFFym.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>为什么要三次握手？</strong></p><p><strong>三次握手的目的是建立可靠的通信信道，说到通讯，简单来说就是数据的发送与接收，而三次握手最主要的目的就是双方确认自己与对方的发送与接收是正常的。</strong></p><p>第一次握手：Client 什么都不能确认；Server 确认了对方发送正常，自己接收正常</p><p>第二次握手：Client 确认了：自己发送、接收正常，对方发送、接收正常；Server 确认了：对方发送正常，自己接收正常</p><p>第三次握手：Client 确认了：自己发送、接收正常，对方发送、接收正常；Server 确认了：自己发送、接收正常，对方发送、接收正常</p><p>所以三次握手就能确认双方收发功能都正常，缺一不可。</p><p><strong>第 2 次握手传回了 ACK，为什么还要传回 SYN？</strong></p><p>接收端传回发送端所发送的 ACK 是为了告诉客户端，我接收到的信息确实就是你所发送的信号了，这表明从客户端到服务端的通信是正常的。而回传 SYN 则是为了建立并确认从服务端到客户端的通信。”</p><blockquote><p>SYN 同步序列编号(Synchronize Sequence Numbers) 是 TCP/IP 建立连接时使用的握手信号。在客户机和服务器之间建立正常的 TCP 网络连接时，客户机首先发出一个 SYN 消息，服务器使用 SYN-ACK 应答表示接收到了这个消息，最后客户机再以 ACK(Acknowledgement）消息响应。这样在客户机和服务器之间才能建立起可靠的 TCP 连接，数据才可以在客户机和服务器之间传递。</p></blockquote><p><strong>为什么要四次挥手？</strong></p><figure><img src="https://minio.pigx.top/oss/2022/07/8s1yZZ.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>断开一个 TCP 连接则需要“四次挥手”：</p><ul><li>客户端-发送一个 FIN，用来关闭客户端到服务器的数据传送</li><li>服务器-收到这个 FIN，它发回一 个 ACK，确认序号为收到的序号加 1 。和 SYN 一样，一个 FIN 将占用一个序号</li><li>服务器-关闭与客户端的连接，发送一个 FIN 给客户端</li><li>客户端-发回 ACK 报文确认，并将确认序号设置为收到序号加 1</li></ul><p>任何一方都可以在数据传送结束后发出连接释放的通知，待对方确认后进入半关闭状态。当另一方也没有数据再发送的时候，则发出连接释放通知，对方确认后就完全关闭了 TCP 连接。</p><h3 id="_3-tcp-udp-协议的区别" tabindex="-1"><a class="header-anchor" href="#_3-tcp-udp-协议的区别" aria-hidden="true">#</a> 3.TCP, UDP 协议的区别？</h3><figure><img src="https://minio.pigx.top/oss/2022/07/qYWkHK.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>UDP 在传送数据之前不需要先建立连接，远地主机在收到 UDP 报文后，不需要给出任何确认。虽然 UDP 不提供可靠交付，但在某些情况下 UDP 却是一种最有效的工作方式（一般用于即时通信），比如： QQ 语音、 QQ 视频 、直播等等</p><p>TCP 提供面向连接的服务。在传送数据之前必须先建立连接，数据传送结束后要释放连接。 TCP 不提供广播或多播服务。由于 TCP 要提供可靠的，面向连接的传输服务（TCP 的可靠体现在 TCP 在传递数据之前，会有三次握手来建立连接，而且在数据传递时，有确认、窗口、重传、拥塞控制机制，在数据传完后，还会断开连接用来节约系统资源），这难以避免增加了许多开销，如确认，流量控制，计时器以及连接管理等。这不仅使协议数据单元的首部增大很多，还要占用许多处理机资源。TCP 一般用于文件传输、发送和接收邮件、远程登录等场景。</p><h3 id="_4-tcp-如何保证可靠性" tabindex="-1"><a class="header-anchor" href="#_4-tcp-如何保证可靠性" aria-hidden="true">#</a> 4.TCP 如何保证可靠性？</h3><p><strong>序列号和确认号机制：</strong></p><p>TCP 发送端发送数据包的时候会选择一个 seq 序列号，接收端收到数据包后会检测数据包的完整性，如果检测通过会响应一个 ack 确认号表示收到了数据包。</p><p><strong>超时重发机制：</strong></p><p>TCP 发送端发送了数据包后会启动一个定时器，如果一定时间没有收到接受端的确认后，将会重新发送该数据包。</p><p><strong>对乱序数据包重新排序：</strong></p><p>从 IP 网络层传输到 TCP 层的数据包可能会乱序，TCP 层会对数据包重新排序再发给应用层。</p><p><strong>丢弃重复数据：</strong></p><p>从 IP 网络层传输到 TCP 层的数据包可能会重复，TCP 层会丢弃重复的数据包。</p><p><strong>流量控制：</strong></p><p>TCP 发送端和接收端都有一个固定大小的缓冲空间，为了防止发送端发送数据的速度太快导致接收 端缓冲区溢出，发送端只能发送接收端可以接纳的数据，为了达到这种控制效果，TCP 用了流量控 制协议（可变大小的滑动窗口协议）来实现。</p><h3 id="_5-osi-七层模型" tabindex="-1"><a class="header-anchor" href="#_5-osi-七层模型" aria-hidden="true">#</a> 5.OSI 七层模型？</h3><figure><img src="https://minio.pigx.top/oss/2022/07/UyJthk.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>每一层都专注做一件事情，并且每一层都需要使用下一层提供的功能比如传输层需要使用网络层提供的路由和寻址功能，这样传输层才知道把数据传输到哪里去。</p><p><strong>OSI 的七层体系结构概念清楚，理论也很完整，但是它比较复杂而且不实用，而且有些功能在多个层中重复出现。</strong></p><figure><img src="https://minio.pigx.top/oss/2022/07/XzQlLL.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>既然 OSI 七层模型这么厉害，为什么干不过 TCP/IP 四 层模型呢？</strong></p><ol><li>OSI 的专家缺乏实际经验，他们在完成 OSI 标准时缺乏商业驱动力</li><li>OSI 的协议实现起来过分复杂，而且运行效率很低</li><li>OSI 制定标准的周期太长，因而使得按 OSI 标准生产的设备无法及时进入市场</li><li>OSI 的层次划分不太合理，有些功能在多个层次中重复出现。</li></ol><p>OSI 七层模型虽然失败了，但是却提供了很多不错的理论基础。为了更好地去了解网络分层，OSI 七层模型还是非常有必要学习的。</p><figure><img src="https://minio.pigx.top/oss/2022/07/cNSRI6.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_6-tcp-ip-四层模型" tabindex="-1"><a class="header-anchor" href="#_6-tcp-ip-四层模型" aria-hidden="true">#</a> 6.TCP/IP 四层模型？</h3><p><strong>TCP/IP 四层模型</strong> 是目前被广泛采用的一种模型,我们可以将 TCP / IP 模型看作是 OSI 七层模型的精简版本，由以下 4 层组成：</p><ol><li>应用层</li><li>传输层</li><li>网络层</li><li>网络接口层</li></ol><p>需要注意的是，我们并不能将 TCP/IP 四层模型 和 OSI 七层模型完全精确地匹配起来，不过可以简单将两者对应起来，如下图所示</p><figure><img src="https://minio.pigx.top/oss/2022/07/vJ8edm.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>应用层（Application layer）</strong></p><p><strong>应用层位于传输层之上，主要提供两个终端设备上的应用程序之间信息交换的服务，它定义了信息交换的格式，消息会交给下一层传输层来传输。</strong> 我们把应用层交互的数据单元称为报文。</p><figure><img src="https://minio.pigx.top/oss/2022/07/j343uq.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>应用层协议定义了网络通信规则，对于不同的网络应用需要不同的应用层协议。在互联网中应用层协议很多，如支持 Web 应用的 HTTP 协议，支持电子邮件的 SMTP 协议等等。</p><figure><img src="https://minio.pigx.top/oss/2022/07/D1uWqv.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>传输层（Transport layer）</strong></p><p><strong>传输层的主要任务就是负责向两台终端设备进程之间的通信提供通用的数据传输服务。</strong> 应用进程利用该服务传送应用层报文。“通用的”是指并不针对某一个特定的网络应用，而是多种应用可以使用同一个运输层服务。</p><p><strong>传输层主要使用以下两种协议：</strong></p><ol><li><strong>传输控制协议 TCP</strong>（Transmisson Control Protocol）--提供<strong>面向连接</strong>的，<strong>可靠的</strong>数据传输服务。</li><li><strong>用户数据协议 UDP</strong>（User Datagram Protocol）--提供<strong>无连接</strong>的，尽最大努力的数据传输服务（<strong>不保证数据传输的可靠性</strong>）。</li></ol><figure><img src="https://minio.pigx.top/oss/2022/07/tZewcP.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>网络层（Network layer）</strong></p><p><strong>网络层负责为分组交换网上的不同主机提供通信服务。</strong> 在发送数据时，网络层把运输层产生的报文段或用户数据报封装成分组和包进行传送。在 TCP/IP 体系结构中，由于网络层使用 IP 协议，因此分组也叫 IP 数据报，简称数据报。</p><p>⚠️注意 ：<strong>不要把运输层的“用户数据报 UDP”和网络层的“IP 数据报”弄混</strong>。</p><p><strong>网络层的还有一个任务就是选择合适的路由，使源主机运输层所传下来的分组，能通过网络层中的路由器找到目的主机。</strong></p><p>这里强调指出，网络层中的“网络”二字已经不是我们通常谈到的具体网络，而是指计算机网络体系结构模型中第三层的名称。</p><p>互联网是由大量的异构（heterogeneous）网络通过路由器（router）相互连接起来的。互联网使用的网络层协议是无连接的网际协议（Intert Prococol）和许多路由选择协议，因此互联网的网络层也叫做<strong>网际层</strong>或<strong>IP 层</strong>。</p><figure><img src="https://minio.pigx.top/oss/2022/07/fQxpUt.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>网络接口层（Network interface layer）</strong></p><p>我们可以把网络接口层看作是数据链路层和物理层的合体。</p><ol><li>数据链路层(data link layer)通常简称为链路层（ 两台主机之间的数据传输，总是在一段一段的链路上传送的）。<strong>数据链路层的作用是将网络层交下来的 IP 数据报组装成帧，在两个相邻节点间的链路上传送帧。每一帧包括数据和必要的控制信息（如同步信息，地址信息，差错控制等）。</strong></li><li><strong>物理层的作用是实现相邻计算机节点之间比特流的透明传送，尽可能屏蔽掉具体传输介质和物理设备的差异</strong></li></ol><figure><img src="https://minio.pigx.top/oss/2022/07/hWjmPF.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h3 id="_7-为什么网络要分层" tabindex="-1"><a class="header-anchor" href="#_7-为什么网络要分层" aria-hidden="true">#</a> 7.为什么网络要分层？</h3><p>说到分层，我们先从我们平时使用框架开发一个后台程序来说，我们往往会按照每一层做不同的事情的原则将系统分为三层（复杂的系统分层会更多）:</p><ol><li>Repository（数据库操作）</li><li>Service（业务操作）</li><li>Controller（前后端数据交互）</li></ol><p><strong>复杂的系统需要分层，因为每一层都需要专注于一类事情。网络分层的原因也是一样，每一层只专注于做一类事情。</strong></p><ol><li><strong>各层之间相互独立</strong>：各层之间相互独立，各层之间不需要关心其他层是如何实现的，只需要知道自己如何调用下层提供好的功能就可以了（可以简单理解为接口调用）<strong>。这个和我们对开发时系统进行分层是一个道理。</strong></li><li><strong>提高了整体灵活性</strong> ：每一层都可以使用最适合的技术来实现，你只需要保证你提供的功能以及暴露的接口的规则没有改变就行了。<strong>这个和我们平时开发系统的时候要求的高内聚、低耦合的原则也是可以对应上的。</strong></li><li><strong>大问题化小</strong> ： 分层可以将复杂的网络间题分解为许多比较小的、界线比较清晰简单的小问题来处理和解决。这样使得复杂的计算机网络系统变得易于设计，实现和标准化。 <strong>这个和我们平时开发的时候，一般会将系统功能分解，然后将复杂的问题分解为容易理解的更小的问题是相对应的，这些较小的问题具有更好的边界（目标和接口）定义。</strong></li></ol><h3 id="_8-http-协议介绍" tabindex="-1"><a class="header-anchor" href="#_8-http-协议介绍" aria-hidden="true">#</a> 8.HTTP 协议介绍?</h3><p>HTTP 协议，全称超文本传输协议。顾名思义，HTTP 协议就是用来规范超文本的传输，超文本，也就是网络上的包括文本在内的各式各样的消息，具体来说，主要是来规范浏览器和服务器端的行为的。</p><p>HTTP 是一个无状态（stateless）协议，也就是说服务器不维护任何有关客户端过去所发请求的消息。</p><h3 id="_9-http-协议通信过程" tabindex="-1"><a class="header-anchor" href="#_9-http-协议通信过程" aria-hidden="true">#</a> 9.HTTP 协议通信过程？</h3><p>HTTP 是应用层协议，它以 TCP（传输层）作为底层协议，默认端口为 80. 通信过程主要如下：</p><ol><li>服务器在 80 端口等待客户的请求。</li><li>浏览器发起到服务器的 TCP 连接（创建套接字 Socket）。</li><li>服务器接收来自浏览器的 TCP 连接。</li><li>浏览器（HTTP 客户端）与 Web 服务器（HTTP 服务器）交换 HTTP 消息。</li><li>关闭 TCP 连接。</li></ol><h3 id="_10-http-协议优点" tabindex="-1"><a class="header-anchor" href="#_10-http-协议优点" aria-hidden="true">#</a> 10.HTTP 协议优点？</h3><p>扩展性强、速度快、跨平台支持性好。</p><h3 id="_11-https-协议介绍" tabindex="-1"><a class="header-anchor" href="#_11-https-协议介绍" aria-hidden="true">#</a> 11.HTTPS 协议介绍？</h3><p>HTTPS 协议，是 HTTP 的加强安全版本。HTTPS 是基于 HTTP 的，也是用 TCP 作为底层协议，并额外使用 SSL/TLS 协议用作加密和安全认证。默认端口号是 443。</p><p>HTTPS 协议中，SSL 通道通常使用基于密钥的加密算法，密钥长度通常是 40 比特或 128 比特。</p><h3 id="_12-https-协议优点" tabindex="-1"><a class="header-anchor" href="#_12-https-协议优点" aria-hidden="true">#</a> 12.HTTPS 协议优点?</h3><p>保密性好、信任度高。</p><h3 id="_13-ssl-tls-的工作原理" tabindex="-1"><a class="header-anchor" href="#_13-ssl-tls-的工作原理" aria-hidden="true">#</a> 13.SSL/TLS 的工作原理?</h3><p><strong>非对称加密</strong></p><p>SSL/TLS 的核心要素是<strong>非对称加密</strong>。非对称加密采用两个密钥——一个公钥，一个私钥。在通信时，私钥仅由解密者保存，公钥由任何一个想与解密者通信的发送者（加密者）所知。可以设想一个场景，</p><figure><img src="https://minio.pigx.top/oss/2022/07/LWXL0I.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>非对称加密的公钥和私钥需要采用一种复杂的数学机制生成（密码学认为，为了较高的安全性，尽量不要自己创造加密方案）。</p><p><strong>对称加密</strong></p><p>使用 SSL/TLS 进行通信的双方需要使用非对称加密方案来通信，但是非对称加密设计了较为复杂的数学算法，在实际通信过程中，计算的代价较高，效率太低，因此，SSL/TLS 实际对消息的加密使用的是对称加密。</p><blockquote><p>对称加密：通信双方共享唯一密钥 k，加解密算法已知，加密方利用密钥 k 加密，解密方利用密钥 k 解密，保密性依赖于密钥 k 的保密性。</p></blockquote><figure><img src="https://minio.pigx.top/oss/2022/07/2cOX0h.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>对称加密的密钥生成代价比公私钥对的生成代价低得多，那么有的人会问了，为什么 SSL/TLS 还需要使用非对称加密呢？因为对称加密的保密性完全依赖于密钥的保密性。在双方通信之前，需要商量一个用于对称加密的密钥。我们知道网络通信的信道是不安全的，传输报文对任何人是可见的，密钥的交换肯定不能直接在网络信道中传输。因此，<strong>使用非对称加密，对对称加密的密钥进行加密</strong>，保护该密钥不在网络信道中被窃听。这样，通信双方只需要一次非对称加密，交换对称加密的密钥，在之后的信息通信中，使用绝对安全的密钥，对信息进行对称加密，即可保证传输消息的保密性。</p><h3 id="_14-http与https区别" tabindex="-1"><a class="header-anchor" href="#_14-http与https区别" aria-hidden="true">#</a> 14.HTTP与HTTPS区别？</h3><ul><li><strong>端口号</strong> ：HTTP 默认是 80，HTTPS 默认是 443。</li><li><strong>URL 前缀</strong> ：HTTP 的 URL 前缀是 <code>http://</code>，HTTPS 的 URL 前缀是 <code>https://</code>。</li><li><strong>安全性和资源消耗</strong> ： HTTP 协议运行在 TCP 之上，所有传输的内容都是<strong>明文</strong>，客户端和服务器端都无法验证对方的身份。HTTPS 是运行在 SSL/TLS 之上的 HTTP 协议，SSL/TLS 运行在 TCP 之上。所有传输的内容都经过加密，**加密采用对称加密，但对称加密的密钥用服务器方的证书进行了非对称加密。**所以说，HTTP 安全性没有 HTTPS 高，但是 HTTPS 比 HTTP <strong>耗费更多服务器资源</strong>。</li></ul><h3 id="_15-forward-和-redirect-的区别" tabindex="-1"><a class="header-anchor" href="#_15-forward-和-redirect-的区别" aria-hidden="true">#</a> 15.Forward 和 Redirect 的区别？</h3><p>浏览器 URL 地址：Forward 是服务器内部的重定向，服务器内部请求某个 servlet，然后获取 响应的内容，浏览器的 URL 地址是不会变化的；Redirect 是客户端请求服务器，然后服务器给 客户端返回了一个 <strong>302</strong> 状态码和新的 <strong>location</strong>，客户端重新发起 HTTP 请求，服务器给客户端 响应 location 对应的 URL 地址，浏览器的 URL 地址发生了变化。</p><p>数据的共享：Forward 是服务器内部的重定向，request 在整个重定向过程中是不变的， request 中的信息在 servlet 间是共享的。Redirect 发起了两次 HTTP 请求分别使用不同的 request。</p><p>请求的次数：Forward 只有一次请求；Redirect 有两次请求。</p><h3 id="_16-说一下http的长连接与短连接的区别" tabindex="-1"><a class="header-anchor" href="#_16-说一下http的长连接与短连接的区别" aria-hidden="true">#</a> 16.说一下HTTP的长连接与短连接的区别？</h3><p>HTTP协议的长连接和短连接，实质上是TCP协议的长连接和短连接。</p><p><strong>短连接</strong></p><pre><code>	在HTTP/1.0中默认使用短链接,也就是说，浏览器和服务器每进行一次HTTP操作，就建立一次连接，但任务结束就中断连接。如果客户端访问的某个HTML或其他类型的Web资源，如 JavaScript 文件、图像文件、 CSS 文件等。当浏览器每遇到这样一个Web资源，就会建立一个HTTP会话。
</code></pre><p><strong>长连接</strong></p><pre><code>	从HTTP/1.1起，默认使用长连接，用以保持连接特性。在使用长连接的情况下，当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的 TCP连接不会关闭。如果客户端再次访问这个服务 器上的网页，会继续使用这一条已经建立的连接。Keep-Alive不会永久保持连接，它有一个保持时 间，可以在不同的服务器软件（如Apache）中设定这个时间。
</code></pre>`,127),e=[p];function a(s,g){return t(),o("div",null,e)}const T=i(n,[["render",a],["__file","17-network.html.vue"]]);export{T as default};