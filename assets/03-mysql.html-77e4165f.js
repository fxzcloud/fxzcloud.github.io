const l=JSON.parse('{"key":"v-6273f848","path":"/article/offer/03-mysql.html","title":"mysql","lang":"zh-CN","frontmatter":{"category":["interview"]},"headers":[{"level":3,"title":"一条 SQL 语句在 MySQL 内部是如何执行的?","slug":"一条-sql-语句在-mysql-内部是如何执行的","link":"#一条-sql-语句在-mysql-内部是如何执行的","children":[]},{"level":3,"title":"MySQL 支持哪些存储引擎？默认使用哪个？","slug":"mysql-支持哪些存储引擎-默认使用哪个","link":"#mysql-支持哪些存储引擎-默认使用哪个","children":[]},{"level":3,"title":"MySQL 存储引擎架构了解吗？","slug":"mysql-存储引擎架构了解吗","link":"#mysql-存储引擎架构了解吗","children":[]},{"level":3,"title":"MyISAM 和 InnoDB 的区别是什么？","slug":"myisam-和-innodb-的区别是什么","link":"#myisam-和-innodb-的区别是什么","children":[]},{"level":3,"title":"MySQL 查询缓存?","slug":"mysql-查询缓存","link":"#mysql-查询缓存","children":[]},{"level":3,"title":"何谓数据库事务？","slug":"何谓数据库事务","link":"#何谓数据库事务","children":[]},{"level":3,"title":"并发事务带来了哪些问题?","slug":"并发事务带来了哪些问题","link":"#并发事务带来了哪些问题","children":[]},{"level":3,"title":"不可重复读和幻读有什么区别呢？","slug":"不可重复读和幻读有什么区别呢","link":"#不可重复读和幻读有什么区别呢","children":[]},{"level":3,"title":"SQL 标准定义了哪些事务隔离级别?","slug":"sql-标准定义了哪些事务隔离级别","link":"#sql-标准定义了哪些事务隔离级别","children":[]},{"level":3,"title":"解决幻读的方法？","slug":"解决幻读的方法","link":"#解决幻读的方法","children":[]},{"level":3,"title":"MySQL 的隔离级别是基于锁实现的吗?","slug":"mysql-的隔离级别是基于锁实现的吗","link":"#mysql-的隔离级别是基于锁实现的吗","children":[]},{"level":3,"title":"MySQL 的默认隔离级别是什么?","slug":"mysql-的默认隔离级别是什么","link":"#mysql-的默认隔离级别是什么","children":[]},{"level":3,"title":"表级锁和行级锁了解吗？有什么区别？","slug":"表级锁和行级锁了解吗-有什么区别","link":"#表级锁和行级锁了解吗-有什么区别","children":[]},{"level":3,"title":"共享锁和排他锁呢？","slug":"共享锁和排他锁呢","link":"#共享锁和排他锁呢","children":[]},{"level":3,"title":"InnoDB 有哪几类行锁？","slug":"innodb-有哪几类行锁","link":"#innodb-有哪几类行锁","children":[]},{"level":3,"title":"当前读和快照读","slug":"当前读和快照读","link":"#当前读和快照读","children":[]},{"level":3,"title":"何为索引？有什么作用？","slug":"何为索引-有什么作用","link":"#何为索引-有什么作用","children":[]},{"level":3,"title":"索引的优缺点?","slug":"索引的优缺点","link":"#索引的优缺点","children":[]},{"level":3,"title":"为什么MySQL 没有使用Hash作为索引的数据结构呢？","slug":"为什么mysql-没有使用hash作为索引的数据结构呢","link":"#为什么mysql-没有使用hash作为索引的数据结构呢","children":[]},{"level":3,"title":"B 树& B+树?","slug":"b-树-b-树","link":"#b-树-b-树","children":[]},{"level":3,"title":"B 树& B+树两者有何异同呢？","slug":"b-树-b-树两者有何异同呢","link":"#b-树-b-树两者有何异同呢","children":[]},{"level":3,"title":"索引类型?","slug":"索引类型","link":"#索引类型","children":[]},{"level":3,"title":"聚集索引与非聚集索引以及优缺点?","slug":"聚集索引与非聚集索引以及优缺点","link":"#聚集索引与非聚集索引以及优缺点","children":[]},{"level":3,"title":"非聚集索引一定回表查询吗(覆盖索引)?","slug":"非聚集索引一定回表查询吗-覆盖索引","link":"#非聚集索引一定回表查询吗-覆盖索引","children":[]},{"level":3,"title":"覆盖索引？","slug":"覆盖索引","link":"#覆盖索引","children":[]},{"level":3,"title":"联合索引？","slug":"联合索引","link":"#联合索引","children":[]},{"level":3,"title":"最左前缀匹配原则","slug":"最左前缀匹配原则","link":"#最左前缀匹配原则","children":[]},{"level":3,"title":"创建索引的注意事项？","slug":"创建索引的注意事项","link":"#创建索引的注意事项","children":[]},{"level":3,"title":"使用索引的一些建议？","slug":"使用索引的一些建议","link":"#使用索引的一些建议","children":[]},{"level":3,"title":"redo log是什么？Mysql为什么不丢数据","slug":"redo-log是什么-mysql为什么不丢数据","link":"#redo-log是什么-mysql为什么不丢数据","children":[]},{"level":3,"title":"redo log刷盘时机？Mysql为什么不丢数据","slug":"redo-log刷盘时机-mysql为什么不丢数据","link":"#redo-log刷盘时机-mysql为什么不丢数据","children":[]},{"level":3,"title":"为什么不直接刷盘修改后的数据，而是刷盘redo log?Mysql为什么不丢数据","slug":"为什么不直接刷盘修改后的数据-而是刷盘redo-log-mysql为什么不丢数据","link":"#为什么不直接刷盘修改后的数据-而是刷盘redo-log-mysql为什么不丢数据","children":[]},{"level":3,"title":"什么是binlog？Mysql为什么不丢数据","slug":"什么是binlog-mysql为什么不丢数据","link":"#什么是binlog-mysql为什么不丢数据","children":[]},{"level":3,"title":"binlog记录格式？Mysql为什么不丢数据","slug":"binlog记录格式-mysql为什么不丢数据","link":"#binlog记录格式-mysql为什么不丢数据","children":[]},{"level":3,"title":"binlog的写入机制？Mysql为什么不丢数据","slug":"binlog的写入机制-mysql为什么不丢数据","link":"#binlog的写入机制-mysql为什么不丢数据","children":[]},{"level":3,"title":"undo log？Mysql为什么不丢数据","slug":"undo-log-mysql为什么不丢数据","link":"#undo-log-mysql为什么不丢数据","children":[]},{"level":3,"title":"sql注入问题？","slug":"sql注入问题","link":"#sql注入问题","children":[]},{"level":3,"title":"数据库的三范式是什么？","slug":"数据库的三范式是什么","link":"#数据库的三范式是什么","children":[]},{"level":3,"title":"NULL和空串判断?","slug":"null和空串判断","link":"#null和空串判断","children":[]},{"level":3,"title":"like走索引吗?","slug":"like走索引吗","link":"#like走索引吗","children":[]},{"level":3,"title":"主键与索引有什么区别？","slug":"主键与索引有什么区别","link":"#主键与索引有什么区别","children":[]},{"level":3,"title":"索引不生效的情况？","slug":"索引不生效的情况","link":"#索引不生效的情况","children":[]},{"level":3,"title":"MVVC？","slug":"mvvc","link":"#mvvc","children":[]},{"level":3,"title":"varchar(10)和int(10)代表什么含义？","slug":"varchar-10-和int-10-代表什么含义","link":"#varchar-10-和int-10-代表什么含义","children":[]},{"level":3,"title":"count(*)在不同引擎的实现方式?","slug":"count-在不同引擎的实现方式","link":"#count-在不同引擎的实现方式","children":[]},{"level":3,"title":"锁的类型有哪些呢？","slug":"锁的类型有哪些呢","link":"#锁的类型有哪些呢","children":[]},{"level":3,"title":"那 ACID 靠什么保证的呢？","slug":"那-acid-靠什么保证的呢","link":"#那-acid-靠什么保证的呢","children":[]},{"level":3,"title":"说说 mysql 主从同步怎么做的吧？","slug":"说说-mysql-主从同步怎么做的吧","link":"#说说-mysql-主从同步怎么做的吧","children":[]},{"level":3,"title":"解释MySQL外连接、内连接与自连接的区别？","slug":"解释mysql外连接、内连接与自连接的区别","link":"#解释mysql外连接、内连接与自连接的区别","children":[]},{"level":3,"title":"SQL语言包括哪几部分？每部分都有哪些操作关键字？","slug":"sql语言包括哪几部分-每部分都有哪些操作关键字","link":"#sql语言包括哪几部分-每部分都有哪些操作关键字","children":[]},{"level":3,"title":"SQL优化手段有哪些？","slug":"sql优化手段有哪些","link":"#sql优化手段有哪些","children":[]},{"level":3,"title":"简单说一说drop、delete与truncate的区别？","slug":"简单说一说drop、delete与truncate的区别","link":"#简单说一说drop、delete与truncate的区别","children":[]},{"level":3,"title":"大表如何优化？","slug":"大表如何优化","link":"#大表如何优化","children":[]},{"level":3,"title":"可以使用多少列创建索引？","slug":"可以使用多少列创建索引","link":"#可以使用多少列创建索引","children":[]},{"level":3,"title":"mysql锁的类型有哪些？","slug":"mysql锁的类型有哪些","link":"#mysql锁的类型有哪些","children":[]},{"level":3,"title":"怎么处理MySQL的慢查询？","slug":"怎么处理mysql的慢查询","link":"#怎么处理mysql的慢查询","children":[]},{"level":3,"title":"mysql为什么需要主从同步？","slug":"mysql为什么需要主从同步","link":"#mysql为什么需要主从同步","children":[]},{"level":3,"title":"Innodb是如何实现事务的","slug":"innodb是如何实现事务的","link":"#innodb是如何实现事务的","children":[]},{"level":3,"title":"b 树和 b+树的理解","slug":"b-树和-b-树的理解","link":"#b-树和-b-树的理解","children":[]},{"level":3,"title":"for update的作用和用法？","slug":"for-update的作用和用法","link":"#for-update的作用和用法","children":[]},{"level":3,"title":"如何保证 REPEATABLE READ 级别绝对不产⽣幻读？","slug":"如何保证-repeatable-read-级别绝对不产生幻读","link":"#如何保证-repeatable-read-级别绝对不产生幻读","children":[]},{"level":3,"title":"mysql的update的加锁情况","slug":"mysql的update的加锁情况","link":"#mysql的update的加锁情况","children":[]},{"level":3,"title":"MySQL的数据存在磁盘上到底长什么样","slug":"mysql的数据存在磁盘上到底长什么样","link":"#mysql的数据存在磁盘上到底长什么样","children":[]},{"level":3,"title":"为什么用了索引，SQL查询还是慢？","slug":"为什么用了索引-sql查询还是慢","link":"#为什么用了索引-sql查询还是慢","children":[]},{"level":3,"title":"什么是三星索引？","slug":"什么是三星索引","link":"#什么是三星索引","children":[]},{"level":3,"title":"count(1)和count(*) 哪个效率高？","slug":"count-1-和count-哪个效率高","link":"#count-1-和count-哪个效率高","children":[]},{"level":3,"title":"《阿里巴巴JAVA开发手册》里面写超过三张表禁止join 这是为什么？这样的话那sql要怎么写？","slug":"《阿里巴巴java开发手册》里面写超过三张表禁止join-这是为什么-这样的话那sql要怎么写","link":"#《阿里巴巴java开发手册》里面写超过三张表禁止join-这是为什么-这样的话那sql要怎么写","children":[]},{"level":3,"title":"什么是mysql的索引下推","slug":"什么是mysql的索引下推","link":"#什么是mysql的索引下推","children":[]},{"level":3,"title":"mysql为什么不丢数据(mysql七种日志)","slug":"mysql为什么不丢数据-mysql七种日志","link":"#mysql为什么不丢数据-mysql七种日志","children":[]},{"level":3,"title":"mysql中的锁","slug":"mysql中的锁","link":"#mysql中的锁","children":[]},{"level":3,"title":"mysql日期类型选择","slug":"mysql日期类型选择","link":"#mysql日期类型选择","children":[]}],"git":{"createdTime":1710657223000,"updatedTime":1710829283000,"contributors":[{"name":"付绪壮","email":"2235602974@qq.com","commits":5}]},"readingTime":{"minutes":162.61,"words":24392},"filePathRelative":"article/offer/03-mysql.md","localizedDate":"2024年3月17日","copyright":{}}');export{l as data};
