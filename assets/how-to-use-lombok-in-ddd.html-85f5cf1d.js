import{_ as i,V as s,W as t,X as n,Y as e,$ as d,Z as r,F as l}from"./framework-828e3e61.js";const a={},c=n("h1",{id:"ddd项目中使用lombok的正确姿势",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#ddd项目中使用lombok的正确姿势","aria-hidden":"true"},"#"),e(" DDD项目中使用Lombok的正确姿势")],-1),m=n("p",null,[e("注："),n("strong",null,"本文转载自码如云团队博文。")],-1),u={href:"https://docs.mryqr.com",target:"_blank",rel:"noopener noreferrer"},v={href:"https://projectlombok.org/",target:"_blank",rel:"noopener noreferrer"},b=r(`<p>比如，对于**颜色(Color)**对象来说，当我们加上Lombok的<code>@Data</code>注解后，Lombok将自动为<code>Color</code>类生成getter、setter、toString()、eqauls()、hashCode()和构造函数等众多方法，进而让程序员将关注点放在更有价值的业务逻辑相关的代码中，岂不乐哉？</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>@Data
public class Color {
    int red;
    int green;
    int blue;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>不过，也有人反对使用Lombok，其中一个很重要的原因是Lombok自动生成的setter方法只是简单的赋值操作，并没有对数据的合法性进行检查，进而可能使对象处于一种非法的状态，比如对于上例的<code>Color</code>对象来说，调用方可以在调用<code>setRed()</code>方法时，传入一个大于255的值，而我们都知道颜色的RGB值最大只能是255，因此当传入256时<code>Color</code>对象则不合法了。对于对业务合法性要求极高的DDD来说，使用Lombok的风险尤其突出。</p>`,3),h={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},p={href:"https://docs.mryqr.com/ddd-introduction/",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository/",target:"_blank",rel:"noopener noreferrer"},_={href:"https://docs.mryqr.com/ddd-entity-and-value-object/",target:"_blank",rel:"noopener noreferrer"},k={href:"https://docs.mryqr.com/ddd-entity-and-value-object/",target:"_blank",rel:"noopener noreferrer"},D=r(`<h2 id="禁止使用-setter和-data" tabindex="-1"><a class="header-anchor" href="#禁止使用-setter和-data" aria-hidden="true">#</a> 禁止使用<code>@Setter</code>和<code>@Data</code></h2><p>DDD社区对setter方法可谓是深恶痛绝，其中主要有以下2个原因：</p><ol><li>setter方法只是机械式的赋值操作，无法体现代码的业务意图，而业务意图却正是DDD所强调的；</li><li>setter方法只是简单的赋值操作，并没有对业务的合法性进行检查，如果使用不当可能导致Bug，如上例中的<code>Color</code>；</li></ol><p>Lombok中的<code>@Data</code>由于包含了<code>@Setter</code>的功能，因此也不建议使用。在不使用<code>@Setter</code>和<code>@Data</code>时，实体对象可以通过业务方法予以代替，比如要更新**成员(Member)**的姓名时，可以使用一个单独编写的<code>updateName()</code>方法完成，在该方法中对姓名进行合法性验证后，再对<code>name</code>字段赋值。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//Member

public void updateName(String newName) {
    if (newName.length() &gt; 100) {
        throw new RuntimeException(&quot;姓名不能超过100个字符。&quot;);
    }

    this.name = newName;
    raiseEvent(new MemberNameChangedEvent(this.getId(), newName));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，在更新<code>Member</code>的姓名（<code>name</code>）时，首先对姓名的长度进行合法性检查，如果合法才进行赋值，赋值后还需要通过<code>raiseEvent()</code>向外部发出领域事件，而这些操作是一个简单的setter所无法完成的。</p><p>对于值对象来说，则更不应该使用setter了，因为根据DDD原则，值对象一旦被创建便不能修改了，使用setter明显违背了这一原则。</p><h2 id="值对象使用lombok" tabindex="-1"><a class="header-anchor" href="#值对象使用lombok" aria-hidden="true">#</a> 值对象使用Lombok</h2>`,8),x={href:"https://docs.mryqr.com/ddd-entity-and-value-object/",target:"_blank",rel:"noopener noreferrer"},C=n("code",null,"Color",-1),f=n("code",null,"Color",-1),L=n("code",null,"changeRedTo()",-1),A=r(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//Color

@Value
@Builder
@AllArgsConstructor(access = PRIVATE)
public class Color {
    int red;
    int green;
    int blue;

    public Color changeRedTo(int red) {
        if (red &gt; 255) {
            throw new RuntimeException(&quot;Invalid Red value.&quot;);
        }
        return Color.builder()
                .red(red)
                .green(this.green)
                .blue(this.blue)
                .build();
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在使用Lombok时，通过<code>@Value</code>表示一个值对象，<code>@Value</code>并不包含生成setter方法。另外，通过<code>@Builder</code>自动生成Builder方法。</p><p>需要注意的是，我们通过<code>access = PRIVATE</code>将全参构造函数设置为了私有的，外部无法访问，因为我们只希望外部通过一种方式创建值对象——Builder。这样做其实还可以解决Lombok无法解决的一个问题：在本例中，假设<code>Color</code>对象使用的是<code>@AllArgsConstructor(access = PUBLIC)</code>生成的全参构造函数，那么调用方可以通过以下方式创建一个<code>Color</code>对象：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>Color aColor = new Color(12, 23, 34);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>此时，如果我们将<code>Color</code>中的<code>red</code>和<code>green</code>字段调换一下顺序，由于<code>red</code>和<code>green</code>均是int类型，那么通过<code>@AllArgsConstructor</code>所生成的全参构造函数的签名其实是无变化的，这也意味着上面通过构造函数创建<code>Color</code>的代码是不会产生编译错误的，但是其所表示的业务含义已经随着字段顺序的变化而变化了，如果程序员自己不知道需要做相应的修改，那么Bug也就因此而生。</p><p>因此，在使用Lombok时，我们更推荐使用Builder进行对象的创建，而不是全参构造函数。具体落地时，由于<code>@Value</code>会自动引入<code>@AllArgsConstructor</code>，因此需要通过<code>@AllArgsConstructor(access = PRIVATE)</code>将其显式地隐藏起来。</p><h2 id="聚合根使用lombok" tabindex="-1"><a class="header-anchor" href="#聚合根使用lombok" aria-hidden="true">#</a> 聚合根使用Lombok</h2>`,7),R={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository/",target:"_blank",rel:"noopener noreferrer"},w=r(`<p>聚合根是有生命周期的对象，通常会被持久化到数据库中，也就是说通常有2种情况涉及到聚合根的创建：</p><ol><li>业务上从无到有新建一个聚合根对象；</li><li>从数据库中加载一个既有的聚合根对象。</li></ol><p>对于从业务上新建来说，新建过程是一个显著的业务过程，并且一般不需要全参数构造函数，而是基于场景所需数据完成创建。因此，此时对聚合根的新建过程通常采用我们自己编写的构造函数完成创建。</p><p>对于从数据库加载聚合根对象来说，由于Spring Data框架会自动调用无参构造函数，因此可以通过Lombok的<code>@NoArgsConstructor(access = PRIVATE)</code>自动生成。</p><p>另外，由于外部通常会获取聚合根中的各种数据，因此可以使用比较安全的<code>@Getter</code>向外暴露各个字段。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//Member

@Getter
@NoArgsConstructor(access = PRIVATE)
public class Member extends AggregateRoot {
    private String name;//姓名
    private List&lt;Roles&gt; roles; //角色

    public Member(String name) {
        if (name.length() &gt; 100) {
            throw new RuntimeException(&quot;Name must be less than 100 characters in length.&quot;);
        }
        this.name = name;
    }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，对聚合根而言，我们只使用了Lombok的<code>@Getter</code>和<code>NoArgsConstructor</code>注解，并且<code>NoArgsConstructor</code>所生成的无参构造函数被声明为了私有的，因此其作用只是便于框架调用而不是编码时直接调用。</p><p>事实上，在聚合根中使用Lombok所得到的好处并不多，反而有可能带来一定风险。一是无参的构造函数通过自己手动编写也非常简单；二是在使用<code>@Getter</code>时可能将诸如<code>List</code>之类的容器字段一并暴露出去，使得外部可以直接操作这些容器字段，违背了聚合根的基本原则——外部只能通过聚合根完成对其内部状态的改变，而不能直接操作聚合根内部的字段。因此，对于<code>Member</code>的<code>roles</code>字段来说，比使用<code>@Getter</code>更安全的方式是返回一个不变的List容器：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    public List&lt;Role&gt; getRoles(){
        return List.copyOf(this.roles); //通过copyOf()返回一个不变的List容器
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,9),E=n("code",null,"roles",-1),N={href:"https://guava.dev/releases/23.0/api/docs/com/google/common/collect/ImmutableList.html",target:"_blank",rel:"noopener noreferrer"},y=n("code",null,"@Getter",-1),q=n("code",null,"roles",-1),V={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},B=n("code",null,"@Getter",-1),I=r(`<h2 id="命令对象和查询对象" tabindex="-1"><a class="header-anchor" href="#命令对象和查询对象" aria-hidden="true">#</a> 命令对象和查询对象</h2><p>在DDD中，命令对象(<code>Command</code>)用于封装外部向系统发起的一次请求，其中包含了请求所需数据；而查询对象(<code>Query</code>)则用于向外部返回查询的结果数据。在技术层面，这两种对象都属于值对象类型，因此可以使用与值对象相同的Lombok注解。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//命令对象：CreateMemberCommand

@Value
@Builder
@AllArgsConstructor(access = PRIVATE)
public class CreateMemberCommand implements Command {
    @NotBlank
    @Size(max = MAX_GENERIC_NAME_LENGTH)
    private final String name;
    
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结" aria-hidden="true">#</a> 总结</h2><p>在本文中，我们对DDD中的各种对象使用Lombok进行了针对性的管控，从而减少了产生Bug的风险。当然，这些管控手段不见得适合于所有的项目，但是与这些实践手法本身相比，我们更希望传达的一个思想是：使用Lombok可以，但是要慎重。你得知道一个简单的Lombok注解可能给程序带来的风险，进而通过自己的手段进行规避，并形成一定的原则和套路，以让团队的所有成员通过一致的方式使用Lombok。</p>`,5);function M(G,S){const o=l("ExternalLinkIcon");return s(),t("div",null,[c,m,n("p",null,[e("原文链接："),n("a",u,[e("https://docs.mryqr.com"),d(o)])]),n("p",null,[e("写过Java的程序员都知道，Java的语法是比较繁琐的， 各种getter、setter、equals()和hashCode()满天飞，有时甚至将真正的业务逻辑代码完全淹没，让读代码的人很难直观地了解到代码所完成的功能。于是我们有了"),n("a",v,[e("Lombok"),d(o)]),e("，只需在Java类或方法上加上一些简单的注解，Lombok便会在编译时介入，并根据所添加的注解自动生成相应的字节码（比如getter和setter代码等）。")]),b,n("p",null,[e("于是，我们来到了一个两难的境界，一方面使用Lombok的确可以减少大量的重复性编码，另一方面Lombok又可能给程序带来非法数据的风险。要解决这个问题的，我们需要对Lombok的使用进行管控，以便可以更加安全地使用之。在日常DDD编码的过程中，我们（"),n("a",h,[e("码如云"),d(o)]),e("）积累了多种Lombok使用模式，在本文中分享给大家。如果对DDD本身感兴趣，读者可以参考我们的另一个"),n("a",p,[e("DDD文章系列"),d(o)]),e("。")]),n("p",null,[e("DDD中包含多种概念，其中可能用到Lombok的概念有"),n("a",g,[e("聚合根"),d(o)]),e("（Aggregate Root）、"),n("a",_,[e("实体"),d(o)]),e("（Entity）和"),n("a",k,[e("值对象"),d(o)]),e("（Value Object）等，本文将针对这些对象分别给出相应的Lombok使用建议。")]),D,n("p",null,[e("在DDD中，"),n("a",x,[e("值对象"),d(o)]),e("表示那些起描述作用的对象，值对象之间通过所包含的数据内容进行相等性判断。比如，上例的"),C,e("则是一个值对象，当两个"),f,e("对象所携带的RGB值均相同时，则可认为这两个对象相等，也即可互换。值对象存在一个非常重要的约束：不变性，也即在值对象被创建出来之后，便不能再改变其状态了，如需改变，则需要创建出另一个值对象（比如下例中的"),L,e("方法）。")]),A,n("p",null,[n("a",R,[e("聚合根"),d(o)]),e("可以说是DDD中最重要的概念了，它表示领域模型中那些最重要的实体性对象（比如电商系统中的订单Order，CRM系统中的客户Customer等），其他DDD概念都围绕着聚合根展开。")]),w,n("p",null,[e("不过，这个问题也可以通过将"),E,e("字段本身建模为不变对象来解决，比如使用Guava的"),n("a",N,[e("ImmutableList"),d(o)]),e("，这样外部即便通过"),y,e("拿到了"),q,e("字段，在向其中添加数据元素时，程序也将报错。")]),n("p",null,[e("在"),n("a",V,[e("码如云"),d(o)]),e("，我们做了妥协，也即依然在聚合根中使用了"),B,e("方法，因为我们的程序员能够自觉的遵守聚合根的各种编码原则。")]),I])}const P=i(a,[["render",M],["__file","how-to-use-lombok-in-ddd.html.vue"]]);export{P as default};
