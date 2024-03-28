import{_ as s,V as a,W as n,$ as e}from"./framework-159025ca.js";const t={},i=e(`<h1 id="redis生产问题" tabindex="-1"><a class="header-anchor" href="#redis生产问题" aria-hidden="true">#</a> redis生产问题</h1><h2 id="redis-bigkey排查及处理" tabindex="-1"><a class="header-anchor" href="#redis-bigkey排查及处理" aria-hidden="true">#</a> redis bigKey排查及处理</h2><p><strong>什么是 bigkey？</strong></p><p>简单来说，如果一个 key 对应的 value 所占用的内存比较大，那这个 key 就可以看作是 bigkey。</p><p>具体多大才算大呢？有一个不是特别精确的参考标准：string 类型的 value 超过 10 kb，复合类型的 value 包含的元素超过 5000 个。</p><p><strong>bigkey 有什么危害？</strong></p><p>bigkey 是指键值占用内存空间非常大的 key。例如一个字符串 a 存储了 200M 的数据。</p><p>bigkey 的主要影响有：</p><p>网络阻塞；获取 bigkey 时，传输的数据量比较大，会增加带宽的压力。</p><p>超时阻塞；因为 bigkey 占用的空间比较大，所以操作起来效率会比较低，导致出现阻塞的可能性增加。</p><p>导致内存空间不平衡；一个 bigkey 存储数据量比较大，同一个 key 在同一个节点或服务器中存储，会造成一定影响。</p><p><strong>怎么处理</strong></p><p>info命令查看redis占用内存以及key数量，判断是否存在大Key。</p><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/202403151746498.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/202403151747732.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>查找大key:</p><blockquote><p>--bigkeys：表示统计bigkey使用情况</p><p>-i 0.1 ：表示每扫描100次会停0.1秒，防止占用过高的CPU，影响Redis节点的正常运行。非必选</p><p>-a {password}：显式的输入密码</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>redis-cli <span class="token parameter variable">-a</span> art-redis-password  <span class="token parameter variable">-i</span> <span class="token number">0.1</span>  <span class="token parameter variable">--bigkeys</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/202403151745801.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>查看指定key使用内存：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>memory usage <span class="token punctuation">{</span>key<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>用 debug object {key} 也可以查到key占用的内存。</p><figure><img src="https://cdn.jsdelivr.net/gh/fxzbiz/img@url/202403151750726.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>删除key:</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>unlike <span class="token punctuation">{</span>key<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>bigkey最好不要直接del，key较大时，直接del可能会长时间阻塞线程，甚至导致崩溃。</p><p>使用unlink删除，会可返回，不会阻塞，后台有线程异步去删除key释放内存空间。</p><p>对于list、hash这样的可以使用代码删除，结合scan命令分批次渐进的删除。</p></blockquote><p>redis-cli支持的参数：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>./redis-cli <span class="token parameter variable">--help</span>

bash: ./redis-cli: No such <span class="token function">file</span> or directory
root@art-redis:/data<span class="token comment"># redis-cli --help</span>
redis-cli <span class="token number">6.0</span>.8

Usage: redis-cli <span class="token punctuation">[</span>OPTIONS<span class="token punctuation">]</span> <span class="token punctuation">[</span>cmd <span class="token punctuation">[</span>arg <span class="token punctuation">[</span>arg <span class="token punctuation">..</span>.<span class="token punctuation">]</span><span class="token punctuation">]</span><span class="token punctuation">]</span>
  <span class="token parameter variable">-h</span> <span class="token operator">&lt;</span>hostname<span class="token operator">&gt;</span>      Server <span class="token function">hostname</span> <span class="token punctuation">(</span>default: <span class="token number">127.0</span>.0.1<span class="token punctuation">)</span>.
  <span class="token parameter variable">-p</span> <span class="token operator">&lt;</span>port<span class="token operator">&gt;</span>          Server port <span class="token punctuation">(</span>default: <span class="token number">6379</span><span class="token punctuation">)</span>.
  <span class="token parameter variable">-s</span> <span class="token operator">&lt;</span>socket<span class="token operator">&gt;</span>        Server socket <span class="token punctuation">(</span>overrides <span class="token function">hostname</span> and port<span class="token punctuation">)</span>.
  <span class="token parameter variable">-a</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>      Password to use when connecting to the server.
                     You can also use the REDISCLI_AUTH environment
                     variable to pass this password <span class="token function">more</span> safely
                     <span class="token punctuation">(</span>if both are used, this argument takes predecence<span class="token punctuation">)</span>.
  <span class="token parameter variable">--user</span> <span class="token operator">&lt;</span>username<span class="token operator">&gt;</span>  Used to send ACL style <span class="token string">&#39;AUTH username pass&#39;</span><span class="token builtin class-name">.</span> Needs -a.
  <span class="token parameter variable">--pass</span> <span class="token operator">&lt;</span>password<span class="token operator">&gt;</span>  Alias of <span class="token parameter variable">-a</span> <span class="token keyword">for</span> consistency with the new <span class="token parameter variable">--user</span> option.
  <span class="token parameter variable">--askpass</span>          Force user to input password with mask from STDIN.
                     If this argument is used, <span class="token string">&#39;-a&#39;</span> and REDISCLI_AUTH
                     environment variable will be ignored.
  <span class="token parameter variable">-u</span> <span class="token operator">&lt;</span>uri<span class="token operator">&gt;</span>           Server URI.
  <span class="token parameter variable">-r</span> <span class="token operator">&lt;</span>repeat<span class="token operator">&gt;</span>        Execute specified <span class="token builtin class-name">command</span> N times.
  <span class="token parameter variable">-i</span> <span class="token operator">&lt;</span>interval<span class="token operator">&gt;</span>      When <span class="token parameter variable">-r</span> is used, waits <span class="token operator">&lt;</span>interval<span class="token operator">&gt;</span> seconds per command.
                     It is possible to specify sub-second <span class="token builtin class-name">times</span> like <span class="token parameter variable">-i</span> <span class="token number">0.1</span>.
  <span class="token parameter variable">-n</span> <span class="token operator">&lt;</span>db<span class="token operator">&gt;</span>            Database number.
  <span class="token parameter variable">-3</span>                 Start session <span class="token keyword">in</span> RESP3 protocol mode.
  <span class="token parameter variable">-x</span>                 Read last argument from STDIN.
  <span class="token parameter variable">-d</span> <span class="token operator">&lt;</span>delimiter<span class="token operator">&gt;</span>     Multi-bulk delimiter <span class="token keyword">in</span> <span class="token keyword">for</span> raw formatting <span class="token punctuation">(</span>default: <span class="token punctuation">\\</span>n<span class="token punctuation">)</span>.
  <span class="token parameter variable">-c</span>                 Enable cluster mode <span class="token punctuation">(</span>follow <span class="token parameter variable">-ASK</span> and <span class="token parameter variable">-MOVED</span> redirections<span class="token punctuation">)</span>.
  <span class="token parameter variable">--tls</span>              Establish a secure TLS connection.
  <span class="token parameter variable">--sni</span> <span class="token operator">&lt;</span>host<span class="token operator">&gt;</span>       Server name indication <span class="token keyword">for</span> TLS.
  <span class="token parameter variable">--cacert</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>    CA Certificate <span class="token function">file</span> to verify with.
  <span class="token parameter variable">--cacertdir</span> <span class="token operator">&lt;</span>dir<span class="token operator">&gt;</span>  Directory where trusted CA certificates are stored.
                     If neither cacert nor cacertdir are specified, the default
                     system-wide trusted root certs configuration will apply.
  <span class="token parameter variable">--cert</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>      Client certificate to authenticate with.
  <span class="token parameter variable">--key</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>       Private key <span class="token function">file</span> to authenticate with.
  <span class="token parameter variable">--raw</span>              Use raw formatting <span class="token keyword">for</span> replies <span class="token punctuation">(</span>default when STDOUT is
                     not a <span class="token function">tty</span><span class="token punctuation">)</span>.
  --no-raw           Force formatted output even when STDOUT is not a tty.
  <span class="token parameter variable">--csv</span>              Output <span class="token keyword">in</span> CSV format.
  <span class="token parameter variable">--stat</span>             Print rolling stats about server: mem, clients, <span class="token punctuation">..</span>.
  <span class="token parameter variable">--latency</span>          Enter a special mode continuously sampling latency.
                     If you use this mode <span class="token keyword">in</span> an interactive session it runs
                     forever displaying real-time stats. Otherwise <span class="token keyword">if</span> <span class="token parameter variable">--raw</span> or
                     <span class="token parameter variable">--csv</span> is specified, or <span class="token keyword">if</span> you redirect the output to a non
                     TTY, it samples the latency <span class="token keyword">for</span> <span class="token number">1</span> second <span class="token punctuation">(</span>you can use
                     <span class="token parameter variable">-i</span> to change the interval<span class="token punctuation">)</span>, <span class="token keyword">then</span> produces a single output
                     and exits.
  --latency-history  Like <span class="token parameter variable">--latency</span> but tracking latency changes over time.
                     Default <span class="token function">time</span> interval is <span class="token number">15</span> sec. Change it using -i.
  --latency-dist     Shows latency as a spectrum, requires xterm <span class="token number">256</span> colors.
                     Default <span class="token function">time</span> interval is <span class="token number">1</span> sec. Change it using -i.
  --lru-test <span class="token operator">&lt;</span>keys<span class="token operator">&gt;</span>  Simulate a cache workload with an <span class="token number">80</span>-20 distribution.
  <span class="token parameter variable">--replica</span>          Simulate a replica showing commands received from the master.
  <span class="token parameter variable">--rdb</span> <span class="token operator">&lt;</span>filename<span class="token operator">&gt;</span>   Transfer an RDB dump from remote server to <span class="token builtin class-name">local</span> file.
  <span class="token parameter variable">--pipe</span>             Transfer raw Redis protocol from stdin to server.
  --pipe-timeout <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> In <span class="token parameter variable">--pipe</span> mode, abort with error <span class="token keyword">if</span> after sending all data.
                     no reply is received within <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> seconds.
                     Default timeout: <span class="token number">30</span>. Use <span class="token number">0</span> to <span class="token function">wait</span> forever.
  <span class="token parameter variable">--bigkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> keys with many elements <span class="token punctuation">(</span>complexity<span class="token punctuation">)</span>.
  <span class="token parameter variable">--memkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> keys consuming a lot of memory.
  --memkeys-samples <span class="token operator">&lt;</span>n<span class="token operator">&gt;</span> Sample Redis keys looking <span class="token keyword">for</span> keys consuming a lot of memory.
                     And define number of key elements to sample
  <span class="token parameter variable">--hotkeys</span>          Sample Redis keys looking <span class="token keyword">for</span> hot keys.
                     only works when maxmemory-policy is *lfu.
  <span class="token parameter variable">--scan</span>             List all keys using the SCAN command.
  <span class="token parameter variable">--pattern</span> <span class="token operator">&lt;</span>pat<span class="token operator">&gt;</span>    Keys pattern when using the --scan, <span class="token parameter variable">--bigkeys</span> or <span class="token parameter variable">--hotkeys</span>
                     options <span class="token punctuation">(</span>default: *<span class="token punctuation">)</span>.
  --intrinsic-latency <span class="token operator">&lt;</span>sec<span class="token operator">&gt;</span> Run a <span class="token builtin class-name">test</span> to measure intrinsic system latency.
                     The <span class="token builtin class-name">test</span> will run <span class="token keyword">for</span> the specified amount of seconds.
  <span class="token parameter variable">--eval</span> <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>      Send an EVAL <span class="token builtin class-name">command</span> using the Lua script at <span class="token operator">&lt;</span>file<span class="token operator">&gt;</span>.
  <span class="token parameter variable">--ldb</span>              Used with <span class="token parameter variable">--eval</span> <span class="token builtin class-name">enable</span> the Redis Lua debugger.
  --ldb-sync-mode    Like <span class="token parameter variable">--ldb</span> but uses the synchronous Lua debugger, <span class="token keyword">in</span>
                     this mode the server is blocked and script changes are
                     not rolled back from the server memory.
  <span class="token parameter variable">--cluster</span> <span class="token operator">&lt;</span>command<span class="token operator">&gt;</span> <span class="token punctuation">[</span>args<span class="token punctuation">..</span>.<span class="token punctuation">]</span> <span class="token punctuation">[</span>opts<span class="token punctuation">..</span>.<span class="token punctuation">]</span>
                     Cluster Manager <span class="token builtin class-name">command</span> and arguments <span class="token punctuation">(</span>see below<span class="token punctuation">)</span>.
  <span class="token parameter variable">--verbose</span>          Verbose mode.
  --no-auth-warning  Don<span class="token string">&#39;t show warning message when using password on command
                     line interface.
  --help             Output this help and exit.
  --version          Output version and exit.

Cluster Manager Commands:
  Use --cluster help to list all available cluster manager commands.

Examples:
  cat /etc/passwd | redis-cli -x set mypasswd
  redis-cli get mypasswd
  redis-cli -r 100 lpush mylist x
  redis-cli -r 100 -i 1 info | grep used_memory_human:
  redis-cli --eval myscript.lua key1 key2 , arg1 arg2 arg3
  redis-cli --scan --pattern &#39;</span>*:12345*&#39;

  <span class="token punctuation">(</span>Note: when using <span class="token parameter variable">--eval</span> the comma separates KEYS<span class="token punctuation">[</span><span class="token punctuation">]</span> from ARGV<span class="token punctuation">[</span><span class="token punctuation">]</span> items<span class="token punctuation">)</span>

When no <span class="token builtin class-name">command</span> is given, redis-cli starts <span class="token keyword">in</span> interactive mode.
Type <span class="token string">&quot;help&quot;</span> <span class="token keyword">in</span> interactive mode <span class="token keyword">for</span> information on available commands
and settings.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,28),p=[i];function l(r,o){return a(),n("div",null,p)}const d=s(t,[["render",l],["__file","redis-prod.html.vue"]]);export{d as default};
