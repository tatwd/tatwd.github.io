---
title: 数据库拾遗之 MSSQL 篇
tags:
  - mssql
  - sql
---

以下使用 SQL Server 2017 作为实验环境。

## SELECT 执行顺序

一般情况的执行顺序：

```
 1. FROM
 2. ON
 3. JOIN
 4. WHERE
 5. GROUP BY
 6. WITH CUBE 或 WITH ROLLUP
 7. HAVING
 8. SELECT
 9. DISTINCT
10. ORDER BY
11. TOP
```

参看：[SELECT 语句的逻辑处理顺序](https://docs.microsoft.com/zh-cn/sql/t-sql/queries/select-transact-sql?view=sql-server-2017#logical-processing-order-of-the-select-statement)


## 合计行生成

例如，我们需要统计出每个国家/地区的总销售额，然后给出了所有国家/地区的总和。


利用 [`UNION ALL`](https://docs.microsoft.com/zh-cn/sql/t-sql/language-elements/set-operators-union-transact-sql?view=sql-server-2017) 语句：

```sql
SELECT Country, SUM(Sales) AS TotalSales
FROM Sales
UNION ALL
SELECT '合计', SUM(Sales) AS TotalSales
FROM Sales
```

利用 [`GROUP BY ROLLUP`](https://docs.microsoft.com/zh-cn/sql/t-sql/queries/select-group-by-transact-sql?view=sql-server-2017#group-by-rollup) 语句：

```sql
SELECT Country, SUM(Sales) AS TotalSales
FROM Sales
GROUP BY ROLLUP ( Country );
```

注意：当多列分组时，此种分组将生成：每个分组列小计+总计。

利用 [`GROUPING SET`](https://docs.microsoft.com/zh-cn/sql/t-sql/queries/select-group-by-transact-sql?view=sql-server-2017#group-by-grouping-sets--) 语句：

```sql
SELECT Country, SUM(Sales) AS TotalSales
FROM Sales
GROUP BY GROUPING SETS ( Country, () );
```

以上 3 种写法适用于 SQL Server 所有支持的版本。


## 常量折叠和表达式计算

基于常量的表达式是可以折叠的。如：

```sql
SELECT *
FROM Sales.SalesOrderHeader AS s 
INNER JOIN Sales.SalesOrderDetail AS d 
ON s.SalesOrderID = d.SalesOrderID
WHERE TotalDue > 117.00 + 1000.00;
```

**被 SQL Server 认为可折叠的内置函数包括 CAST 和 CONVERT**。 通常，如果内部函数只与输入有关而与其他上下文信息（例如 SET 选项、语言设置、数据库选项和加密密钥）无关，则该内部函数是可折叠的。 不确定性函数是不可折叠的。 确定性内置函数是可折叠的，但也有例外情况。

### 不可折叠表达式
所有其他表达式类型都是不可折叠的。 特别是下列类型的表达式是不可折叠的：

- 非常量表达式，例如，结果取决于列值的表达式。
- 结果取决于局部变量或参数的表达式，例如 @x。
- 不确定性函数。
- 用户定义 Transact-SQL 函数<sup>1</sup>。
- 结果取决于语言设置的表达式。
- 结果取决于 SET 选项的表达式。
- 结果取决于服务器配置选项的表达式。

<sup>1</sup> 在 SQL Server 2012 (11.x) 之前，确定性标量值 CLR 用户定义函数和 CLR 用户定义类型的方法不可折叠。

**编译时表达式中参数如果是已知的，则查询优化器能够准确估计结果集的大小，有助于其选择较好的查询计划。**

参看：[优化 SELECT 语句](https://docs.microsoft.com/zh-cn/sql/relational-databases/query-processing-architecture-guide?view=sql-server-2017#optimizing-select-statements)

## 工作表

如果 ORDER BY 子句引用了不为任何索引涵盖的列，则关系引擎可能需要生成一个工作表以按所请求的顺序对结果集进行排序。

工作表在 tempdb 中生成，并在不再需要时自动删除。

> 未完待续