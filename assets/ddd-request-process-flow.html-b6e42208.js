import{_ as o,V as r,W as a,X as e,Y as i,$ as n,Z as d,F as l}from"./framework-828e3e61.js";const c={},u=e("h1",{id:"可别再说不会ddd-五-请求处理流程",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#可别再说不会ddd-五-请求处理流程","aria-hidden":"true"},"#"),i(" 可别再说不会DDD（五）：请求处理流程")],-1),m=e("p",null,[i("注："),e("strong",null,"本文转载自码如云团队博文。")],-1),t={href:"https://docs.mryqr.com",target:"_blank",rel:"noopener noreferrer"},v=e("h1",{id:"",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#","aria-hidden":"true"},"#")],-1),b={href:"https://docs.mryqr.com/ddd-project-structure",target:"_blank",rel:"noopener noreferrer"},p={href:"https://docs.mryqr.com/ddd-in-plain-words",target:"_blank",rel:"noopener noreferrer"},g={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"},S=d('<figure><img src="https://docs.mryqr.com/images/118-it/ddd/5-1.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>不难看出，既然每种架构中都有为领域模型预留的位置，这也意味着DDD可采用任何一种软件架构。事实也的确如此，DDD并不要求采用哪种特定架构，如果你真要说DDD项目应该采用某种架构的话，那么应该“以领域模型为中心的软件架构”。</p><p>如果我们把软件系统当做一个黑盒的话，其外界是各种形态的客户端，比如浏览器，手机APP或者第三方调用方等，盒子内部则是我们精心构建的领域模型。不过，领域模型是不能直接被外界访问的，主要原因有以下两点：</p><ul><li>客户端的演进和领域模型的演进是不同步的，比如网页端所需要展示的信息量比手机端更多，但是他们所使用的领域模型却是相同的，因此在建模时我们通常会将领域模型和客户端解耦开来，以利于各自的建模和演进</li><li>软件除了处理领域模型这种业务复杂度之外，还需要处理技术复杂度，以及业务和技术的衔接复杂度，比如有些请求通过HTTP协议完成，而有些则通过RPC完成，因此除了领域模型，我们还需要适配各种形式的外部客户端</li></ul><p>接下来，让我们来看看DDD项目是如何衔接外部请求和内部领域模型的。既然聚合根是领域模型中的一等公民，那么按照对聚合根的操作类型不同，DDD项目中主要存在以下4种类型的请求：</p><ul><li>聚合根创建流程</li><li>聚合根更新流程</li><li>聚合根删除流程</li><li>查询流程</li></ul>',6),h={href:"https://docs.mryqr.com/ddd-project-structure",target:"_blank",rel:"noopener noreferrer"},_={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},I={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"},f={href:"https://docs.mryqr.com/ddd-application-service-and-domain-service",target:"_blank",rel:"noopener noreferrer"},y=d(`<h2 id="聚合根创建流程" tabindex="-1"><a class="header-anchor" href="#聚合根创建流程" aria-hidden="true">#</a> 聚合根创建流程</h2><p>聚合根的创建通常通过<strong>工厂</strong>类完成，请求流经路线为：控制器(Controller) -&gt; 应用服务(Application Service) -&gt; 工厂(Factory) -&gt; 资源库(Repository)。</p><figure><img src="https://docs.mryqr.com/images/118-it/ddd/5-2.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在码如云中，当用户提交表单后，系统后台将创建一份提交(Submission)，这里的<code>Submission</code>便是一个聚合根对象。在整个“创建Submission”的处理流程中，请求先通过HTTP协议到达Spring MVC中的Controller：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionController

@PostMapping
@ResponseStatus(CREATED)
public ReturnId newSubmission(@RequestBody @Valid NewSubmissionCommand command,
                              @AuthenticationPrincipal User user) {
    String submissionId = submissionCommandService.newSubmission(command, user);
    return returnId(submissionId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Controller的作用只是为了衔接技术和业务，因此其逻辑应该相对简单，在本例中，<code>SubmissionController</code>的<code>newSubmission()</code>方法仅仅将请求代理给应用服务<code>SubmissionCommandService</code>即完成了其自身的使命。这里的<code>NewSubmissionCommand</code>表示命令对象，用于携带请求数据，比如对于“创建Submission”来说，<code>NewSubmissionCommand</code>对象中至少应该包含表单的提交内容等数据。命令对象是外部客户端传入的数据，因此需要将其与领域模型解耦，也即命令对象不能进入到领域模型的内部，其所能到达的最后一站是应用服务。</p><p>处理流程的下一站是应用服务，应用服务是整个领域模型的门面，无论什么类型的客户端，只要业务用例相同，那么所调用的应用服务的方法也应相同，也即应用服务和技术设施也是解耦的。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionCommandService

@Transactional
public String newSubmission(NewSubmissionCommand command, User user) {
    AppedQr appedQr = qrRepository.appedQrById(command.getQrId());
    App app = appedQr.getApp();
    QR qr = appedQr.getQr();

    Page page = app.pageById(command.getPageId());
    SubmissionPermissions permissions = permissionChecker.permissionsFor(user, appedQr);
    permissions.checkPermissions(app.requiredPermission(), page.requiredPermission());

    Set&lt;Answer&gt; answers = command.getAnswers();
    Submission submission = submissionFactory.createNewSubmission(
            answers,
            qr,
            page,
            app,
            permissions.getPermissions(),
            command.getReferenceData(),
            user
    );

    submissionRepository.houseKeepSave(submission, app);
    log.info(&quot;Created submission[{}].&quot;, submission.getId());

    return submission.getId();
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在以上的<code>SubmissionCommandService</code>应用服务中，首先做权限检查，然后调用工厂<code>SubmissionFactory.createNewSubmission()</code>完成<code>Submission</code>的创建，最后调用资源库<code>SubmissionRepository.houseKeepSave()</code>将新建的<code>Submission</code>持久化到数据库中。从中可见，应用服务主要用于协调各方以完成一个业务用例，其本身并不包含业务逻辑，业务逻辑在工厂中完成。</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionFactory

public Submission createNewSubmission(Set&lt;Answer&gt; answers,
                                      QR qr,
                                      Page page,
                                      App app,
                                      Set&lt;Permission&gt; permissions,
                                      String referenceData,
                                      User user) {
    if (page.isOncePerInstanceSubmitType()) {
        submissionRepository.lastInstanceSubmission(qr.getId(), page.getId())
                .ifPresent(submission -&gt; {
                    throw new MryException(SUBMISSION_ALREADY_EXISTS_FOR_INSTANCE,
                            &quot;当前页面不支持重复提交，请尝试更新已有表单。&quot;,
                            mapOf(&quot;qrId&quot;, qr.getId(),
                                    &quot;pageId&quot;, page.getId()));
                });
    }

    //...此处忽略更多业务逻辑

    //只有需要登录的页面才记录user
    User finalUser = page.requireLogin() ? user : ANONYMOUS_USER;
    Map&lt;String, Answer&gt; checkedAnswers = submissionDomainService.checkAnswers(answers,
            qr,
            page,
            app,
            permissions);

    return new Submission(checkedAnswers,
            page.getId(),
            qr, app,
            referenceData,
            finalUser);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>虽然工厂用于创建聚合根，但并不是直接调用聚合根的构造函数那么简单，从<code>SubmissionFactory.createNewSubmission()</code>可以看出，在创建<code>Submission</code>之前，需要根据表单类型检查是否可以创建新的<code>Submission</code>，而这正是业务逻辑的一部分。因此，工厂也属于领域模型的一部分，本质上工厂可以认为是一种特殊形式的领域服务。</p>`,11),q=e("code",null,"submissionRepository.houseKeepSave()",-1),D=e("code",null,"Submission",-1),x={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"},C=e("h2",{id:"聚合根更新流程",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#聚合根更新流程","aria-hidden":"true"},"#"),i(" 聚合根更新流程")],-1),A=e("p",null,"对聚合根的更新流程通常可以通过“经典三部曲”完成：",-1),w=e("ol",null,[e("li",null,"调用资源库获得聚合根"),e("li",null,"调用聚合根上的业务方法，完成对聚合根的更新"),e("li",null,"再次调用资源库保存聚合根")],-1),R=e("p",null,"此时的请求流经路线为：控制器(Controller) -> 应用服务(Application Service) -> 资源库(Repository) -> 聚合根(Aggregate Root)。",-1),P=e("figure",null,[e("img",{src:"https://docs.mryqr.com/images/118-it/ddd/5-3.png",alt:"img",tabindex:"0",loading:"lazy"}),e("figcaption",null,"img")],-1),k={href:"https://www.mryqr.com/",target:"_blank",rel:"noopener noreferrer"},U=e("code",null,"Submission",-1),N=e("code",null,"Submission",-1),Q=d(`<div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionController

@ResponseStatus(CREATED)
@PostMapping(value = &quot;/{submissionId}/approval&quot;)
public ReturnId approveSubmission(@PathVariable(&quot;submissionId&quot;) @SubmissionId @NotBlank String submissionId,
                                  @RequestBody @Valid ApproveSubmissionCommand command,
                                  @AuthenticationPrincipal User user) {
    submissionCommandService.approveSubmission(submissionId, command, user);
    return returnId(submissionId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>与“创建聚合根”相似，<code>SubmissionController</code>直接将请求代理给应用服务<code>SubmissionCommandService.approveSubmission()</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionCommandService

@Transactional
public void approveSubmission(String submissionId,
                              ApproveSubmissionCommand command,
                              User user) {
    Submission submission = submissionRepository.byIdAndCheckTenantShip(submissionId, user);

    App app = appRepository.cachedById(submission.getAppId());
    Page page = app.pageById(submission.getPageId());
    SubmissionPermissions permissions = permissionChecker.permissionsFor(user,
            app,
            submission.getGroupId());
    permissions.checkCanApproveSubmission(submission, page, app);

    submission.approve(command.isPassed(),
            command.getNote(),
            page,
            user);

    submissionRepository.houseKeepSave(submission, app);

    log.info(&quot;Approved submission[{}].&quot;, submissionId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用服务<code>SubmissionCommandService</code>先通过资源库<code>SubmissionRepository</code>的<code>byIdAndCheckTenantShip()</code>方法获取到需要操作的<code>Submission</code>，然后进行权限检查，再调用<code>Submission.approve()</code>方法完成对<code>Submission</code>的更新，最后调用资源库<code>SubmissionRepository</code>的<code>houseKeepSave()</code>方法将更新后的<code>Submission</code>保存到数据库。这里的重点在于：需要保证所有的业务逻辑均放在<code>Submission.approve()</code>中：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//Submission

public void approve(boolean passed,
                    String note,
                    Page page,
                    User user) {

    if (isApproved()) {
        throw new MryException(SUBMISSION_ALREADY_APPROVED,
                &quot;无法完成审批，先前已经完成审批。&quot;,
                &quot;submissionId&quot;, this.getId());
    }

    this.approval = SubmissionApproval.builder()
            .passed(passed)
            .note(note)
            .approvedAt(now())
            .approvedBy(user.getMemberId())
            .build();

    raiseEvent(new SubmissionApprovedEvent(this.getId(),
            this.getQrId(),
            this.getAppId(),
            this.getPageId(),
            this.approval,
            user));

    addOpsLog(passed ?
            &quot;审批&quot; + page.approvalPassText() :
            &quot;审批&quot; + page.approvalNotPassText(), user);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5),E=e("code",null,"Submission.approve()",-1),T=e("code",null,"Submission",-1),B=e("code",null,"SubmissionApprovedEvent",-1),M={href:"https://docs.mryqr.com/ddd-domain-events",target:"_blank",rel:"noopener noreferrer"},F=e("code",null,"Submission.approve()",-1),V=d(`<p>当然，并不是所有的业务用例都适合“经典三部曲”，有时聚合根自身无法完成所有的业务逻辑，此时我们则需要借助领域服务(Domain Service)来完成请求的处理。比如，常见的使用领域服务的场景是需要进行跨聚合查询的时候。此时的请求流经路线则为：控制器(Controller) -&gt; 应用服务(Application Service) -&gt; 资源库(Repository) -&gt; 聚合根(Aggregate Root) -&gt;领域服务(Domain Service)。</p><figure><img src="https://docs.mryqr.com/images/118-it/ddd/5-4.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>在码如云中，管理员可以对既有的<code>Submission</code>进行编辑更新，但是由于更新时可能涉及到检查手机号或者邮箱等控件填值的唯一性，因此在更新时需要跨<code>Submission</code>进行查询，此时光靠<code>Submission</code>自身便无法完成了，为此我们可以创建领域服务<code>SubmissionDomainService</code>用于跨<code>Submission</code>操作：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionCommandService

@Transactional
public void updateSubmission(String submissionId,
                             UpdateSubmissionCommand command,
                             User user) {

    Submission submission = submissionRepository.byIdAndCheckTenantShip(submissionId, user);
    AppedQr appedQr = qrRepository.appedQrById(submission.getQrId());
    App app = appedQr.getApp();
    QR qr = appedQr.getQr();

    Page page = app.pageById(submission.getPageId());
    SubmissionPermissions permissions = submissionPermissionChecker.permissionsFor(user,
            app,
            submission.getGroupId());
    permissions.checkCanUpdateSubmission(submission, page, app);

    submissionDomainService.updateSubmission(submission,
            app,
            page,
            qr,
            command.getAnswers(),
            permissions.getPermissions(),
            user
    );

    submissionRepository.houseKeepSave(submission, app);
    log.info(&quot;Updated submission[{}].&quot;, submissionId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在本例中，应用服务<code>SubmissionCommandService</code>并未直接调用聚合根<code>Submission</code>中的方法，而是将<code>Submission</code>作为参数传入了领域服务<code>SubmissionDomainService</code>的<code>updateSubmission()</code>方法中，在<code>SubmissionDomainService</code>完成了对<code>Submission</code>的更新后，<code>SubmissionCommandService</code>再调用<code>SubmissionRepository.houseKeepSave()</code>方法将<code>Submission</code>保存到数据库中。<code>SubmissionDomainService.updateSubmission()</code>实现如下：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionDomainService
    
public void updateSubmission(Submission submission,
                             App app,
                             Page page,
                             QR qr,
                             Set&lt;Answer&gt; answers,
                             Set&lt;Permission&gt; permissions,
                             User user) {

    Map&lt;String, Answer&gt; checkedAnswers = checkAnswers(answers,
            qr,
            page,
            app,
            submission.getId(),
            permissions);

    Set&lt;String&gt; submittedControlIds = answers.stream()
            .map(Answer::getControlId)
            .collect(toImmutableSet());

    submission.update(submittedControlIds, checkedAnswers, user);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看到，<code>SubmissionDomainService.updateSubmission()</code>首先调用业务方法<code>checkAnswers()</code>对表单内容进行检查（其中便包含上文提到的对手机号或邮箱的重复性检查），再调用<code>Submission.update()</code>以完成对<code>Submission</code>的更新，相当于<code>SubmissionDomainService</code>对<code>Submission</code>做了业务上的加工。</p><p>这里，领域服务<code>SubmissionDomainService</code>的职责范围仅包含对聚合根<code>Submission</code>的更新，并不负责持久化<code>Submission</code>，持久化的职责依然在应用服务<code>SubmissionCommandService</code>上。这种方式的好处在于：（1）与“经典三部曲”保持一致，将所有持久化操作均集中到应用服务中，不至于过于分散；（2）使领域服务的职责尽量单一。</p><h2 id="聚合根删除流程" tabindex="-1"><a class="header-anchor" href="#聚合根删除流程" aria-hidden="true">#</a> 聚合根删除流程</h2><p>聚合根删除流程相对简单，此时的请求流经路线为：控制器(Controller) -&gt; 应用服务(Application Service) -&gt; 资源库(Application Service) -&gt; 聚合根(Aggregate Root) 。</p><figure><img src="https://docs.mryqr.com/images/118-it/ddd/5-5.png" alt="img" tabindex="0" loading="lazy"><figcaption>img</figcaption></figure><p>删除请求首先到达Controller：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionController

@DeleteMapping(value = &quot;/{submissionId}&quot;)
public ReturnId deleteSubmission(@PathVariable(&quot;submissionId&quot;) @SubmissionId @NotBlank String submissionId,
                                 @AuthenticationPrincipal User user) {
    submissionCommandService.deleteSubmission(submissionId, user);
    return returnId(submissionId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Controller将请求进一步代理给应用服务<code>SubmissionCommandService</code>：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//SubmissionCommandService

@Transactional
public void deleteSubmission(String submissionId, User user) {
    Submission submission = submissionRepository.byIdAndCheckTenantShip(submissionId, user);
    Group group = groupRepository.cachedById(submission.getGroupId());
    managePermissionChecker.checkCanManageGroup(user, group);

    submission.onDelete(user);
    submissionRepository.delete(submission);
    log.info(&quot;Deleted submission[{}].&quot;, submissionId);
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>应用服务<code>SubmissionCommandService</code>通过<code>SubmissionRepository</code>加载出需要删除的<code>Submission</code>后，再调用<code>Submission.onDelete()</code>以完成删除前的一些操作，在本例中<code>onDelete()</code>将发出“提交已删除”(<code>SubmissionDeletedEvent</code>)领域事件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>//Submission
    
public void onDelete(User user) {
    raiseEvent(new SubmissionDeletedEvent(this.getId(),
            this.getQrId(),
            this.getAppId(),
            this.getPageId(),
            user));
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最后，应用服务<code>SubmissionCommandService</code>调用<code>SubmissionRepository.delete()</code>完成对聚合根的删除操作。</p><h2 id="查询流程" tabindex="-1"><a class="header-anchor" href="#查询流程" aria-hidden="true">#</a> 查询流程</h2>`,19),O={href:"https://docs.mryqr.com/ddd-cqrs",target:"_blank",rel:"noopener noreferrer"},K=e("h2",{id:"总结",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#总结","aria-hidden":"true"},"#"),i(" 总结")],-1),L={href:"https://docs.mryqr.com/ddd-aggregate-root-and-repository",target:"_blank",rel:"noopener noreferrer"};function z(G,Y){const s=l("ExternalLinkIcon");return r(),a("div",null,[u,m,e("p",null,[i("原文链接："),e("a",t,[i("https://docs.mryqr.com"),n(s)])]),v,e("p",null,[i("在上一篇"),e("a",b,[i("代码工程结构"),n(s)]),i("中，我们从宏观层面讲到了DDD项目的目录结构，但并未触及到实际的代码。在本文中，我们将深入到代码中，逐一讲解DDD中对各种请求类型的典型处理流程。")]),e("p",null,[i("在本系列的"),e("a",p,[i("DDD概念大白话"),n(s)]),i("我们提到，DDD中的所有组件都是围绕着"),e("a",g,[i("聚合根"),n(s)]),i("展开的，其中有些本身即是聚合根的一部分，比如实体和值对象；有些是聚合根的客户，比如应用服务；有些则是对聚合根的辅助或补充，比如领域服务和工厂。反观当下流行的各种软件架构，无论是分层架构、六边形架构还是整洁架构，它们都有一个共同点，即在架构中心都有一个核心存在，这个核心正是领域模型，而DDD的聚合根则存在于领域模型之中。")]),S,e("p",null,[i("咋一看，你可能会说这不就是CRUD么？本质上这的确是CRUD，但是这里的CRUD可不是仅仅操作数据库那么简单，你如果阅览过本系列的上一篇"),e("a",h,[i("代码工程结构"),n(s)]),i("的话，便知道在"),e("a",_,[i("码如云"),n(s)]),i("中领域模型的代码量占比远远高出数据库访问相关的代码量。")]),e("p",null,[i("本文主要讲解DDD对请求的处理流程，并不讲解聚合根本身的设计和实现，而是假设聚合根（以及领域模型中的工厂和领域服务等）已经实现就位了，关于聚合根本身的讲解请参考本系列的"),e("a",I,[i("聚合根与资源库"),n(s)]),i("一文。此外，为了突出重点，本文只着重讲解请求处理流程的主干，而忽略与之关系不大的其他细节，比如我们将忽略应用服务中的事务处理和权限管理等功能，为此读者可参考"),e("a",f,[i("应用服务与领域服务"),n(s)]),i("。")]),y,e("p",null,[i("请求流程的最后，应用服务调用资源库"),q,i("完成对新建"),D,i("的持久化。更多关于资源库的内容，请参考"),e("a",x,[i("聚合根与资源库"),n(s)]),i("一文。")]),C,A,w,R,P,e("p",null,[i("在"),e("a",k,[i("码如云"),n(s)]),i("中，当表单开启了审批功能过后，管理员可对"),U,i("进行审批操作，本质上则是在更新"),N,i("。在“审批Submission”的过程中，请求依然是首先到达Controller：")]),Q,e("p",null,[i("可以看到，"),E,i("先检查"),T,i("是否已经被审批过了，如果尚未审批才继续审批操作，审批过程还会发出“提交已审批”("),B,i(")领域事件（更多关于领域事件的内容，请参考本系列的"),e("a",M,[i("领域事件"),n(s)]),i("一文）。"),F,i("中的代码量虽然不多，但是却体现了核心的业务逻辑：“已经完成审批的提交不能再次审批”。")]),V,e("p",null,[i("在本系列的"),e("a",O,[i("CQRS"),n(s)]),i("一文中，我们将专门讲到在DDD中如何做查询操作。")]),K,e("p",null,[i("在本文中，我们分别对聚合根的新建、更新和删除的典型请求处理流程做了详细介绍。在这些流程中，我们以聚合根为中心，围绕之形成了恰如其分的软件架构。在下一篇"),e("a",L,[i("聚合根与资源库"),n(s)]),i("中，我们将对聚合根本身的设计与实现做详细讲解。")])])}const H=o(c,[["render",z],["__file","ddd-request-process-flow.html.vue"]]);export{H as default};
