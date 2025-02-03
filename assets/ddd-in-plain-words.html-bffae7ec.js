import{_ as d,V as l,W as t,X as e,Y as n,$ as r,Z as s,F as o}from"./framework-828e3e61.js";const a={},c=e("h1",{id:"可别再说不会ddd-二-ddd概念大白话",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#可别再说不会ddd-二-ddd概念大白话","aria-hidden":"true"},"#"),n(" 可别再说不会DDD（二）：DDD概念大白话")],-1),m=e("p",null,[n("注："),e("strong",null,"本文转载自码如云团队博文。")],-1),v={href:"https://docs.mryqr.com",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"本文是本系列的第二篇文章，主要解释DDD中的各种概念，一方面让读者对DDD有个全景式的认识，另一方面也方便读者更好地理解本系列的后续文章。",-1),b=e("p",null,"DDD中的概念，说多不多，说少不少，一个新手在面对各种DDD名词的轮番轰炸时可能会被搞得晕头转向不知所措，而对于深谙其道的人来说，DDD也就那么点儿东西。除此之外，不同人对于DDD概念的理解也存在千差万别。本文尝试通过朴素的大白话解释DDD中的各种概念，不装，也不作。",-1),p=e("p",null,[n("DDD分为"),e("strong",null,"战略设计"),n("和"),e("strong",null,"战术设计"),n("，战略设计是一种宏观的顶层设计，而战术设计则更偏向于代码落地实践。")],-1),g=e("figure",null,[e("img",{src:"https://docs.mryqr.com/images/118-it/ddd/1-strategic.png",alt:"img",tabindex:"0",loading:"lazy"}),e("figcaption",null,"img")],-1),_=e("strong",null,"DDD的战略设计只在解决一个问题，即软件的模块化划分的问题",-1),h={href:"https://docs.mryqr.com/ddd-strategic-design",target:"_blank",rel:"noopener noreferrer"},D=e("p",null,"当我们把软件的模块划分好（也即完成了战略设计）之后，下一步自然是编码实现了，于是乎我们也就顺理成章地进入了DDD的战术设计范畴。DDD的战术设计包括聚合根、实体和资源库等众多概念，其中最重要的当属聚合根了，那接下来我们就从聚合根讲起。",-1),M={href:"https://docs.mryqr.com/ddd-introduction",target:"_blank",rel:"noopener noreferrer"},f=e("strong",null,"领域模型",-1),y=e("strong",null,"聚合根",-1),x=e("p",null,"聚合根中的“聚合”即“高内聚，低耦合”中的“内聚”之意，而“根”则是“根部”的意思。事实上，并不存在一个教科书式的对聚合根的理论定义，你可以将聚合根理解为一个系统中最重要的那些名词。为了给你一个直观的理解，我们先来看看以下聚合根的例子：",-1),q=e("ul",null,[e("li",null,"在一个电商系统中，一个订单（Order）对象表示一个聚合根"),e("li",null,"在一个CRM系统中，一个客户（Customer）对象表示一个聚合根"),e("li",null,"在一个银行系统中，一次交易（Transaction）对象表示一个聚合根")],-1),E={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"},S={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://docs.mryqr.com/ddd-introduction",target:"_blank",rel:"noopener noreferrer"},A=e("strong",null,"领域服务",-1),R=s(`<p>在下例中，领域服务<code>MemberDomainService</code>中的<code>changeMyMobile()</code>方法实现了两处聚合根(Member)无法自身实现的功能：一是调用<code>mryPasswordEncoder</code>检查密码是否正确，二是调用<code>memberRepository</code>检查手机号是否重复。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    //领域服务：MemberDomainService

    public void changeMyMobile(Member member, String newMobile, String password) {
        if (!mryPasswordEncoder.matches(password, member.getPassword())) {
            throw new MryException(PASSWORD_NOT_MATCH,
                    &quot;修改手机号失败，密码不正确。&quot;, &quot;memberId&quot;, member.getId());
        }

        if (Objects.equals(member.getMobile(), newMobile)) {
            return;
        }

        if (memberRepository.existsByMobile(newMobile)) {
            throw new MryException(MEMBER_WITH_MOBILE_ALREADY_EXISTS,
                    &quot;修改手机号失败，手机号对应成员已存在。&quot;,
                    mapOf(&quot;mobile&quot;, newMobile,
                            &quot;memberId&quot;, member.getId()));
        }

        member.changeMobile(newMobile, member.toUser());
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),w={href:"https://docs.mryqr.com/ddd-application-service-and-domain-service",target:"_blank",rel:"noopener noreferrer"},C=s(`<p>从更广义上讲，聚合根属于实体的范畴。在DDD中，存在<strong>实体</strong>(Entity)和<strong>值对象</strong>(Value Object)是一对相互对立的概念，实体用于表示那些具有生命周期的“存在”，而值对象用于表示那些仅仅起描述性作用的东西。实体通过唯一标识进行标定，而值对象则通过其包含的所有属性进行标定。在编码实现时，最直观的区别则是实体对象有ID，而值对象没有ID；此外，实体对象一般包含比较复杂的业务逻辑，而值对象通常则是一些简单的小对象，业务逻辑相对简单。举个常见的例子，无论一对双胞胎长得多么的相像，但由于两个人的身份证号不同（即ID不同），那么两人便属于不同的实体；而对于货币来说，一张崭新的百元大钞和一张破旧的占满了细菌的百元大钞是可以等价交换的，因为他们所包含的属性值（均是100元）是一样，因此他们均属于值对象。</p><p>在码如云中，管理员可以对表单提交(Submission)进行审批(Approval)，审批结果存放在<code>SubmissionApproval</code>对象中，该对象则是一个值对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Value
@Builder
@AllArgsConstructor(access = PRIVATE)
public class SubmissionApproval {
    private final boolean passed;//审批是否通过
    private final String note;//审批意见
    private final Instant approvedAt;//审批时间
    private final String approvedBy;//审批人ID
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),k={href:"https://docs.mryqr.com/ddd-entity-and-value-object",target:"_blank",rel:"noopener noreferrer"},T=s(`<p>有些对象（特别是聚合根）的创建过程本身也是业务逻辑的一部分，在DDD中，为了显式化业务逻辑，也为了遵从关注点分离的原则，我们将这些对象的构建过程封装到<strong>工厂</strong>(Factory)中，落地时可以是独立的工厂类，也可以是一个对象中的工厂方法。在码如云中，所有的聚合根对象均配备有专门的工厂类，比如用于创建成员的<code>MemberFactory</code>如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Component
@RequiredArgsConstructor
public class MemberFactory {
    private final MemberRepository memberRepository;
    private final DepartmentRepository departmentRepository;

    public Member create(String name,
                         List&lt;String&gt; departmentIds,
                         String mobile,
                         String email,
                         String password,
                         User user) {

        //此处只为展示工厂类，省略了具体实现细节
        return create(name, departmentIds, mobile, email, password, null, user); 
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),B={href:"https://docs.mryqr.com/ddd-entity-and-value-object",target:"_blank",rel:"noopener noreferrer"},V=s(`<p>在DDD的领域模型中，一个业务操作通常会导致一个结果，这个结果被称为<strong>领域事件</strong>，即领域模型中已经发生的事情，比如“成员手机号已更新”便是一个领域事件。领域事件通常用于组件之间的因果关系处理，比如当“成员手机号已更新”事件产生后，我们可能会在另一个业务组件中做相应的同步操作，这里的组件粒度可以是聚合根，可以是其他业务模块，还可以是一个独立的第三方系统。</p><p>在码如云中，创建成员将产生“成员已创建”事件<code>MemberCreatedEvent</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Getter
@TypeAlias(&quot;MEMBER_CREATED_EVENT&quot;)
@NoArgsConstructor(access = PRIVATE)
public class MemberCreatedEvent extends DomainEvent {
    private String memberId;

    public MemberCreatedEvent(String memberId, User user) {
        super(MEMBER_CREATED, user);
        this.memberId = memberId;
    }

}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),O={href:"https://docs.mryqr.com/ddd-domain-events",target:"_blank",rel:"noopener noreferrer"},N=e("p",null,"以上的聚合根、实体、值对象、工厂、领域服务和领域事件都是针对领域模型而言的，虽然在DDD中领域模型是当之无愧的大哥大，但是在实际的软件系统中，单单有领域模型是无法正常运作的，还需要有围绕着领域模型的其他周边设施，为此DDD给出了资源库和应用服务等概念。",-1),P=e("strong",null,"资源库",-1),j={href:"https://www.oracle.com/java/technologies/data-access-object.html",target:"_blank",rel:"noopener noreferrer"},L=s(`<p>在码如云中，成员对象对应的资源库<code>MemberRepository</code>接口定义如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>public interface MemberRepository {

    Member byId(String id);

    boolean exists(String arId);

    void save(Member member);

    void delete(Member member);

    //...此处省略其他方法
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,2),F={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"},U=s(`<p>领域模型是用来完成业务功能的，也即需要响应用户发起的各种请求，但是在软件系统中在这些请求到达领域模型之前，事实上还有很多事情需要处理，比如需要从数据库中加载数据(聚合根)、处理事务、权限管控等，在DDD中，这些操作由<strong>应用服务</strong>(Application Service)完成。应用服务可以看做是领域模型的门面，它将接收到请求派发给合适的领域模型去处理，在整个过程中，应用服务充当的是协调者和编排者的角色，就像酒店的前台一样。</p><p>在码如云中，每一个聚合根都有对应的应用服务，比如对于成员来说，应用服务<code>MemberCommandService</code>如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//由于应用服务的&quot;Application&quot;与码如云中的应用聚合根&quot;App&quot;重名，在码如云中，使用“CommandService”来表示应用服务，以示区分

@Slf4j
@Component
@RequiredArgsConstructor
public class MemberCommandService {
    
    //......

    @Transactional
    public void changeMyMobile(ChangeMyMobileCommand command, User user) {
        mryRateLimiter.applyFor(user.getTenantId(), &quot;Member:ChangeMyMobile&quot;, 5);

        String mobile = command.getMobile();
        verificationCodeChecker.check(mobile, command.getVerification(), CHANGE_MOBILE);

        Member member = memberRepository.byId(user.getMemberId());
        memberDomainService.changeMyMobile(member, mobile, command.getPassword());
        memberRepository.save(member);
        log.info(&quot;Mobile changed by member[{}].&quot;, member.getId());
    }

    //......
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3),W={href:"https://docs.mryqr.com/ddd-application-service-and-domain-service",target:"_blank",rel:"noopener noreferrer"},H=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),n(" 总结")],-1),G=e("p",null,"以上，我们概览式地了解了DDD战略设计和战术设计中的各种主要概念，在本系列的后续文章中，我们将针对这些概念进行逐一讲解。",-1);function X(Y,z){const i=o("ExternalLinkIcon");return l(),t("div",null,[c,m,e("p",null,[n("原文链接："),e("a",v,[n("https://docs.mryqr.com"),r(i)])]),u,b,p,g,e("p",null,[n("战略设计中有通用语言、领域、子域和限界上下文等概念，这些概念不好理解得清楚，也不好讲得清楚。但是，从本质上讲，"),_,n("。为此，我们将在下一篇"),e("a",h,[n("战略设计"),r(i)]),n("中进行详细阐述。")]),D,e("p",null,[n("在上一篇"),e("a",M,[n("DDD入门"),r(i)]),n("中我们提到，DDD的一个重要使命是实现软件中“业务复杂度”和“技术复杂度”的分离。为此，我们使用"),f,n("来描述业务，使之与数据库、消息队列等技术实现解耦开来。在DDD的领域模型中，最核心的则是"),y,n("(Aggregate Root)，我们甚至可以认为整个DDD都是围绕聚合根的设计与实现展开的。")]),x,q,e("p",null,[n("怎么样，是不是至少对聚合根有了一个感性认识？这些名词是其所在的软件系统之所以存在的原因，设想淘宝中没有了订单的概念还能称之为电商系统吗？当然，一个概念是否能成为聚合根是根据其所处的业务场景而定的，我们将在后续文章"),e("a",E,[n("聚合根和资源库"),r(i)]),n("中做详细解释。")]),e("p",null,[n("聚合根是业务逻辑的主要载体，在理想情况下应该是业务的唯一载体。但是，万事皆有但是，有时将业务逻辑放到聚合根中是不合适的，甚至是不可行的。比如，在"),e("a",S,[n("码如云"),r(i)]),n("中，在更新成员手机号时，需要先行检查该手机号是否已经被占用，此时成员聚合根自身并不具备检查其他成员手机号的功能，因此要将这部分逻辑放到成员本身上则显得不合适了，我们在上一篇"),e("a",I,[n("DDD入门"),r(i)]),n("中也提到了这个例子。不过不要慌，针对这种情形，DDD给出了专门的概念 —— "),A,n("(Domain Service)。领域服务是聚合根自身无法完成业务逻辑时的代替品，是不得已而为之的一个概念，通常用于处理一些跨聚合操作或者需要访问技术基础设施的场景。")]),R,e("p",null,[n("需要提醒的是，请不要被领域服务名字中的“服务”迷惑了，领域服务依然是领域模型的一部分，因为它也实现了业务逻辑，更多关于领域服务的内容，请查看本系列的"),e("a",w,[n("应用服务和领域服务"),r(i)]),n("一文。")]),C,e("p",null,[n("需要注意的是，虽然聚合根属于实体，但是实体却不只是包含聚合根。事实上，聚合根隶属于实体，同时其内部又可以包含其他实体。举个例子，汽车作为聚合根是一个实体，同时汽车内部的发动机也是一个实体，但发动机却不是聚合根。在本系列的"),e("a",k,[n("实体和值对象"),r(i)]),n("中，我们将详细介绍实体和值对象的区别。")]),T,e("p",null,[n("更多关于工厂的讲解，请参考本系列的"),e("a",B,[n("实体与值对象"),r(i)]),n("一文。")]),V,e("p",null,[n("更过关于领域事件的讲解，请参考本系列的"),e("a",O,[n("领域事件"),r(i)]),n("一文。")]),N,e("p",null,[n("简单地讲，"),P,n("(Repository)是用于保存/获取聚合根的。在此之前你可能了解过"),e("a",j,[n("DAO"),r(i)]),n("对象也是用于存储对象的，但是与DAO不同的是，资源库操作的基本单位是聚合根，也即只有聚合根对象才配得上拥有资源库，其他实体对象则没有。")]),L,e("p",null,[n("一般来说，资源库分为接口类和实现类，接口类属于领域模型，实现类属于基础设施。这样的好处是，领域模型只依赖于接口，而不依赖于基础设施，有利于维持领域模型的技术中立性。更过关于资源库的讲解，请查看本系列的"),e("a",F,[n("聚合根和资源库"),r(i)]),n("一文。")]),U,e("p",null,[n("在本系列的"),e("a",W,[n("应用服务与领域服务"),r(i)]),n("一文中，我们将对应用服务做详细讲解。")]),H,G])}const $=d(a,[["render",X],["__file","ddd-in-plain-words.html.vue"]]);export{$ as default};
