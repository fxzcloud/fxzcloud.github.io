import{_ as l,V as s,W as o,X as i,Y as e,$ as d,Z as r,F as t}from"./framework-828e3e61.js";const m={},a=i("h1",{id:"可别再说不会ddd-一-ddd入门",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#可别再说不会ddd-一-ddd入门","aria-hidden":"true"},"#"),e(" 可别再说不会DDD（一）：DDD入门")],-1),c=i("p",null,[e("注："),i("strong",null,"本文转载自码如云团队博文。")],-1),b={href:"https://docs.mryqr.com",target:"_blank",rel:"noopener noreferrer"},u=i("p",null,"本文是本系列的第一篇文章，主要讲解DDD入门知识，如果你已经对DDD有所了解，可跳过本文。",-1),v=i("p",null,"在阅读本文之前，你可能会认为DDD是整天做PPT的架构师们才应该去关注的东西；或者会认为DDD是比较顶层的东西，跟我写代码的程序员关系不大；你可能还会认为DDD是一种被咨询师们吹得天花乱坠但是却无法落地的概念炒作而已。在日常实践中，我们接触过不懂装懂的言必称DDD者，也见识过声称DDD与编码毫无关系的虚无主义者。在本系列文章中，我们将向你证明，DDD正是软件工程师的工具，可以用于编写更好的代码，设计更好的架构，进而做出更好的软件。当然，我们也会针对DDD中被夸大其词的那部分进行澄清，甚至批评。",-1),h=i("strong",null,"DDD是面向对象进阶",-1),p={href:"https://baike.baidu.com/item/TOGAF",target:"_blank",rel:"noopener noreferrer"},_={href:"https://baike.baidu.com/item/DODAF",target:"_blank",rel:"noopener noreferrer"},M=i("h2",{id:"实现业务逻辑的三种方式",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#实现业务逻辑的三种方式","aria-hidden":"true"},"#"),e(" 实现业务逻辑的三种方式")],-1),D={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},g=i("strong",null,"成员",-1),f=i("h3",{id:"第一种-事务脚本",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#第一种-事务脚本","aria-hidden":"true"},"#"),e(" 第一种： 事务脚本")],-1),x=i("code",null,"member",-1),y=i("code",null,"mobile_number",-1),I=i("code",null,"mobile_identified",-1),S={href:"https://martinfowler.com/eaaCatalog/transactionScript.html",target:"_blank",rel:"noopener noreferrer"},q=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Transactional//事务边界
    public void updateMyMobile(String mobileNumber, String memberId) {
        
        //采用事务脚本的方式，直接通过SQL语句实现业务逻辑
        String sql = &quot;update member set mobile_number = ? , mobile_identified = 1 where id = ?;&quot;;
        jdbcTemplate.update(sql, mobileNumber,memberId);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种直接通过技术手段实现业务功能的方式没有任何软件建模可言，它将原本可以分开的业务性代码和技术性代码揉杂在一起，既不利于业务的重用，也不利于系统的长期演进，因此通常被认为只适合一些小型软件项目。</p><h3 id="第二种-贫血对象" tabindex="-1"><a class="header-anchor" href="#第二种-贫血对象" aria-hidden="true">#</a> 第二种：贫血对象</h3><p>看到第一种实现方式你可能会想：这都什么年代了，还在像写C语言那样编写代码，不使用点儿面向对象技术连一个刚入职的毕业生估计都不好意思。那好吧，让我们创建一个Member对象。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Transactional
    public void updateMyMobile(String mobileNumber) {
        String memberId = CurrentUserContext.getCurrentMemberId();
        Member member = memberRepository.findMemberById(memberId);

        //先后调用Member对象中的2个setter方法实现业务逻辑
        member.setMobileNumber(mobileNumber);
        member.setMobileIdentified(true);

        memberRepository.updateMember(member);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),w=i("code",null,"memberRepository",-1),N=i("code",null,"Member",-1),k=i("code",null,"setMobileNumber()",-1),C=i("code",null,"setMobileIdentified()",-1),R=i("code",null,"Member",-1),T={href:"https://martinfowler.com/bliki/AnemicDomainModel.html",target:"_blank",rel:"noopener noreferrer"},E=r(`<p>问题还不止于此，本例中先后调用的两个setter方法事实上违背了软件开发的一个根本性原则 —— 内聚性。简单来讲，“设置手机号”和“标记手机号已识别”这两个步骤在业务上是紧密联系在一起的，应该由Member中的单个方法完成，而不应该由2个独立的方法完成。为了解释这里体现的内聚性，让我们再来看个需求：除了成员自己可以修改手机号外，管理员也可以为任何成员设置手机号，为此我们再实现一个<code>updateMemberMobile()</code>方法。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Transactional
    public void updateMemberMobile(String mobileNumber,String memberId) {
        Member member = memberRepository.findMemberById(memberId);

        //与updateMyMobile()相同，需要先后调用Member对象中的2个setter方法实现业务逻辑
        member.setMobileNumber(mobileNumber);
        member.setMobileIdentified(true);

        memberRepository.updateMember(member);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<code>updateMemberMobile()</code>方法也需要显式地先后调用Member的<code>setMobileNumber()</code>和<code>setMobileIdentified()</code>方法，也就是说编码者需要记住必须同时调用2个方法，否则程序就会出Bug。这种方式存在以下问题：</p><ol><li>业务逻辑的泄漏：对于维持“设置手机号”和“标记手机号已识别”同时发生的职责来说，本应该由Member对象自身完成的，结果泄漏到了Member对象的外部；</li><li>增加调用者的负担：对于作为Member客户方的<code>updateMyMobile()</code>和<code>updateMemberMobile()</code>方法来讲，他们本应该将Member当做一个黑盒，但在本例中却需要了解Member的内部细节(先后调用<code>setMobileNumber()</code>和<code>setMobileIdentified()</code>方法)，这无疑是调用者的负担。</li><li>难于维护：如果以后业务需求有变，那么需要同时修改<code>updateMyMobile()</code>和<code>updateMemberMobile()</code>2个方法，这可能不是能够轻易做到的，特别是在人员流动频繁的软件项目中。</li></ol><p>与事务脚本相似，贫血对象除了可用于一些小的软件项目外，通常被认为是一种反模式，应该避免使用。</p><h3 id="第三种-领域对象" tabindex="-1"><a class="header-anchor" href="#第三种-领域对象" aria-hidden="true">#</a> 第三种：领域对象</h3><p><strong>领域对象</strong>是一个与贫血对象相对立的概念，它表示直接体现业务逻辑的一类对象，这类对象不仅包含业务数据，还包含业务行为。领域对象希望达到的理想状态是：所有业务逻辑均由领域对象完成，外界将领域对象当做一个黑盒向其发送指令（调用方法）即可。在本例中，设置手机号的同时需要标记“手机号已识别”均属业务逻辑，应该全部放到领域对象中完成。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Transactional
    public void updateMyMobile(String mobileNumber) {
        String memberId = CurrentUserContext.getCurrentMemberId();
        Member member = memberRepository.findMemberById(memberId);

        //只需调用Member种的updateMobile()方法即可
        member.updateMobile(mobileNumber);

        memberRepository.updateMember(member);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里，<code>updateMyMobile()</code>方法只需调用Member中的<code>updateMobile()</code>方法即可，然后由Member自行处理具体的业务逻辑：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    //由Member对象自身处理同时更新mobileNumber和mobileIdentified字段
    public void updateMobile(String mobileNumber) {
        this.mobileNumber = mobileNumber;
        this.mobileIdentified = true;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,10),B=i("code",null,"mobileNumber",-1),O=i("code",null,"mobileIdentified",-1),A={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"},L=i("code",null,"mobileNumber",-1),P=i("code",null,"mobileIdentified",-1),V=i("strong",null,"不便条件",-1),F=i("p",null,"看到这里，你可能会问：领域对象的实现方式不就是将贫血对象中的业务逻辑实现挪了个位置吗？的确，但是这一挪，便挪出了编程的讲究与思考，挪出了模型的设计与原则，挪出了软件的发展与进步。就像云计算早年被认为不过是将本地的计算资源搬移到网络上一样，我们将很多看似并不具有颠覆性的微小创新合在一起，便可将理想编织成一个个能够为行业为社会带来实际进步的美好现实。",-1),U=i("p",null,"你可能还会说，领域对象这种实现方式我平时就是这么做的呀！？没错，我们平时编程的很多做法其实已经包含了DDD中的某些思想或实践，因为DDD并不是什么全新的东西要把你所写的代码全部推翻重来，而是很多具有逻辑归因性的东西其实大家都能总结出来，只是那些大牛总结得比我们更早，更系统，更全面而已。",-1),j={href:"http://codekata.com/",target:"_blank",rel:"noopener noreferrer"},G=i("h2",{id:"真实产品代码",tabindex:"-1"},[i("a",{class:"header-anchor",href:"#真实产品代码","aria-hidden":"true"},"#"),e(" 真实产品代码")],-1),H={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},W={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},Q=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    @Transactional
    public void changeMyMobile(ChangeMyMobileCommand command, User user) {
        //API限流器，与DDD无关，读者可忽略
        mryRateLimiter.applyFor(user.getTenantId(), &quot;Member:ChangeMyMobile&quot;, 5);

        //将所有请求相关的数据封装到Command对象中
        String mobile = command.getMobile();

        //修改手机号时，需要验证发往新手机号的验证码
        verificationCodeChecker.check(mobile, command.getVerification(), CHANGE_MOBILE);

        Member member = memberRepository.byId(user.getMemberId());

        //这里调用了MemberDomainService中的方法，而不是直接调用Member，因为需要检查手机号是否重复，而Member自身无法完成该检查
        memberDomainService.changeMyMobile(member, mobile, command.getPassword());

        memberRepository.save(member);
        log.info(&quot;Mobile changed by member[{}].&quot;, member.getId());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>为了让读者能对代码有更加详尽的了解，我们在源代码中加上了注释，建议读者通过阅读这些注释来理解代码的意图。（真实的码如云代码库中是很少有注释的，因为我们坚持“代码即是设计”的原则，让代码本身直接体现业务意图）</p>`,2),X=i("code",null,"MryRateLimiter",-1),Y=i("code",null,"VerificationCodeChecker",-1),K=i("code",null,"MemberDomainService",-1),Z=i("code",null,"Member",-1),$=i("code",null,"MemberDomainService",-1),z=i("code",null,"MemberDomainService",-1),J={href:"https://docs.mryqr.com/ddd-application-service-and-domain-service",target:"_blank",rel:"noopener noreferrer"},ee=i("code",null,"Member",-1),ie=i("code",null,"Member",-1),ne=i("code",null,"MemberDomainService",-1),de=r(`<p>对于诸如限流器<code>MryRateLimiter</code>这些与DDD无关的代码，我们将在后续文章的代码中予以删除，以使代码集中在对DDD的阐述上。</p><p><code>MemberDomainService.changeMyMobile()</code>方法实现如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public void changeMyMobile(Member member, String newMobile, String password) {
        //修改手机号时，需要验证密码
        if (!mryPasswordEncoder.matches(password, member.getPassword())) {
            throw new MryException(PASSWORD_NOT_MATCH, &quot;修改手机号失败，密码不正确。&quot;, &quot;memberId&quot;, member.getId());
        }

        if (Objects.equals(member.getMobile(), newMobile)) {
            return;
        }

        //检查手机号是否已被占用
        if (memberRepository.existsByMobile(newMobile)) {
            throw new MryException(MEMBER_WITH_MOBILE_ALREADY_EXISTS, &quot;修改手机号失败，手机号对应成员已存在。&quot;,
                    mapOf(&quot;mobile&quot;, newMobile, &quot;memberId&quot;, member.getId()));
        }

        //调用Member对象中的方法，完成对手机号的修改
        member.changeMobile(newMobile, member.toUser());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code>MemberDomainService</code>调用了<code>MemberRepository.existsByMobile()</code>用于检查手机号是否已经被占用，如果是，则抛出异常。</p><p>最后，<code>MemberDomainService</code>调用<code>Member.changeMobile()</code>方法完成对手机号的修改：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public void changeMobile(String mobile, User user) {
        if (Objects.equals(this.mobile, mobile)) {
            return;
        }

        //同时设置mobile字段和mobileIdentified的值，高度内聚
        this.mobile = mobile;
        this.mobileIdentified = true;
        
        this.addOpsLog(&quot;修改手机号为[&quot; + mobile + &quot;]&quot;, user);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如前文所述，<code>mobile</code>和<code>mobileIdentified</code>是高度内聚的，因此放在<code>Member</code>的同一个方法<code>changeMobile()</code>中完成更新。以后，无论通过什么业务渠道修改成员的手机号，都只需要调用相同的<code>Member.changeMobile()</code>方法即可。</p>`,7);function re(le,se){const n=t("ExternalLinkIcon");return s(),o("div",null,[a,c,i("p",null,[e("原文链接："),i("a",b,[e("https://docs.mryqr.com"),d(n)])]),u,v,i("p",null,[e("DDD是什么呢？是架构思想？是方法论？还是软件之道？从某种层度上说这些都对，但是对于程序员或者架构师来讲，最接地气的回答应该是："),h,e("。请原谅我们可能会让你失望般地没有将DDD与"),i("a",p,[e("TOGAF"),d(n)]),e("、"),i("a",_,[e("DODAF"),d(n)]),e("等企业架构概念放在同一个水平上相提并论，DDD跟这些概念确实不在同一个维度上，因此我们就不生搬硬套牵强附会矫揉造作故弄玄虚了。对于写了几年代码希望在职业生涯中更上一层楼的程序员来说，学习DDD是再适合不过的了。为了能让DDD新手们更快地上手，我们还是以代码为入口展开讲解，首先让我们来看看DDD项目代码和非DDD项目代码有何不同。")]),M,i("p",null,[e("在案例项目"),i("a",D,[e("码如云"),d(n)]),e("中有这样一个业务需求：所有可登录的用户被称为"),g,e("(Member)，成员可以自行修改自己的手机号码，修改后该成员将被标记为“手机号已识别”的状态。为了实现这个需求，我们分别通过三种方式予以实现，读者可以对照看看这些实现方式是不是和自己曾经的编码方式有相似之处。")]),f,i("p",null,[e("对于上述需求，从纯技术上讲，我们希望达到的最终目的不过是在数据库中的"),x,e("表中更新2个字段而已，一个是手机号("),y,e(")字段，另一个是手机号已识别("),I,e(")字段。为了实现这个需求，最简单直接的方式难道不是直接写个SQL语句直接更新数据库表么？的确如此，这个简单的方式其实有个专门的名词 —— "),i("a",S,[e("事务脚本(Transactional Script)"),d(n)]),e("，也即通过类似编写脚本的方式完成一个业务用例，一个业务用例对应一次事务。")]),q,i("p",null,[e("在上例中，首先我们将数据库访问相关的逻辑全部封装在"),w,e("中，从而解决了“技术性代码和业务性代码揉杂”的问题。其次，创建了"),N,e("对象，其中包含两个setter方法，"),k,e("用于设置手机号码，"),C,e("用于标记标记手机号已识别，这应该面向对象了吧？！但是，问题恰恰出在了这两个setter方法上：此时的"),R,e("对象只是一个数据容器而已，而非真正的对象。这种只有数据没有行为的对象被称为"),i("a",T,[e("贫血对象"),d(n)]),e("。")]),E,i("p",null,[e("在本例中，除了将数据和行为同时放到Member对象之外，我们还会考虑如何设计和安排这些行为才最得当，比如将高内聚的"),B,e("和"),O,e('放到同一个方法中，此时的Member便是一个行为饱满的领域对象，并开始变得有些“领域驱动”的意味了，所谓的"DDD是面向对象进阶"这个说法也正体现于此。事实上，在DDD中Member对象也被称为'),i("a",A,[e("聚合根"),d(n)]),e("，而“更新"),L,e("的同时需要一并更新"),P,e("”则被称为聚合根的"),V,e("，我们将在后续文章中对此做详细讲解。")]),F,U,i("p",null,[e("对于以上三种实现方式，我们在前面提到事务脚本和贫血对象只适合一些小型的软件项目，那么问题来了，到底多小才算小呢？这个问题没有标准答案，就像你问微服务多小算小一样，It depends！然而，但凡是企业中立过项的软件项目，都不会是实现一个"),i("a",j,[e("Code Kata"),d(n)]),e("这么简单，都不能被定义为“小型项目”。因此，对于几乎所有企业级软件系统来说，使用领域对象进而DDD都不会是个错误的选择。")]),G,i("p",null,[e("由于本文是入门性质的文章，故到目前为止所使用的代码均不是"),i("a",H,[e("码如云"),d(n)]),e("的产品代码。接下来，让我们来看看真实的产品代码，对于“成员修改自己的手机号”的业务功能，"),i("a",W,[e("码如云"),d(n)]),e("代码库中的实现如下：")]),Q,i("p",null,[e("在本例中，首先使用限流器"),X,e("对请求进行限流处理，然后使用"),Y,e("对手机号验证码进行检查，最后才调用"),K,e("完成实际的业务逻辑。你可能有些纳闷儿，为什么不像前文中那样直接调用"),Z,e("对象中的方法，而是调用"),$,e("呢？事实上，这里的"),z,e("在DDD中被称为"),i("a",J,[e("领域服务"),d(n)]),e("，用于处理领域对象自身无法处理的业务逻辑。在本例中，成员在修改手机号时，系统需要检查该手机号是否已经被其他成员所占用，这部分逻辑是无法通过单个"),ee,e("自身完成的，只能通过一个可以跨多个"),ie,e("的"),ne,e("完成。")]),de])}const te=l(m,[["render",re],["__file","ddd-introduction.html.vue"]]);export{te as default};
