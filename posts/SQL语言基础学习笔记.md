---
title: SQL语言基础学习笔记
date: 2025-03-07 21:47:18
tags: 学习笔记
---

以下是整理后的Markdown学习笔记，保留了所有示例代码：

# SQL语言基础学习笔记

## 一、基本概念
### 1.1 SQL语言的发展
- 1986年：ANSI发布首个SQL标准
- 1989年：ISO发布带完整性约束的SQL-89
- 1992年：SQL-92（关系型数据库标准）
- 1999年：SQL-99（扩展SQL92）

### 1.2 SQL语言的特点

1. **一体化**：集数据定义、查询、操纵、控制于一体
2. **非过程化**：只需说明"做什么"，无需描述"怎么做"
3. **简洁性**：核心动词仅9个（SELECT, CREATE, DROP, ALTER, INSERT, UPDATE, DELETE, GRANT, REVOKE）
4. **多方式使用**：可交互式使用，也可嵌入程序中使用

### 1.3 SQL功能分类
| 功能类型       | 命令动词               |
|----------------|------------------------|
| 数据查询       | SELECT                 |
| 数据定义       | CREATE, DROP, ALTER    |
| 数据操纵       | INSERT, UPDATE, DELETE |
| 数据控制       | GRANT, REVOKE          |


## 二、数据类型
### 2.1 数值型
| 类型         | 描述                                                                 |
|--------------|----------------------------------------------------------------------|
| **整数类型** | BIT, TINYINT, SMALLINT, INT, BIGINT                                |
| **小数类型** | NUMERIC(p,q), DECIMAL(p,q)（精确型）；FLOAT, REAL（近似型）         |

### 2.2 字符串型
| 类型          | 描述                                                                 |
|---------------|----------------------------------------------------------------------|
| **普通编码**  | CHAR(n)（定长）, VARCHAR(n)（变长）, TEXT（大文本）                 |
| **统一编码**  | NCHAR(n), NVARCHAR(n), NTEXT                                        |
| **二进制类型**| BINARY(n), VARBINARY(n), IMAGE（大二进制数据）                     |

### 2.3 日期时间型
| 类型        | 格式示例                     | 存储空间 |
|-------------|------------------------------|----------|
| DATETIME    | '2023-10-01 12:30:00.000'   | 8字节    |
| SMALLDATETIME | '2023-10-01 12:30:00'       | 4字节    |

### 2.4 货币型
| 类型      | 描述                             |
|-----------|----------------------------------|
| MONEY     | 8字节，精确到千分之十货币单位     |
| SMALLMONEY| 4字节，精确到千分之十货币单位     |


## 三、表操作
### 3.1 创建表示例

```sql
CREATE TABLE Student (
  Sno    CHAR(7) PRIMARY KEY,
  Sname  CHAR(10) NOT NULL,
  Ssex   CHAR(2) CHECK (Ssex IN ('男', '女')),
  Sage   TINYINT CHECK (Sage BETWEEN 15 AND 45),
  Sdept  CHAR(20) DEFAULT '计算机系'
);

CREATE TABLE Course (
  Cno    char(10)  NOT NULL,
  Cname  char(20)  NOT NULL,
  Ccredit  tinyint CHECK (Ccredit > 0),
  Semester tinyint CHECK (Semester > 0),
  Period  int CHECK (Period > 0),
  PRIMARY KEY(Cno) 
) 

CREATE TABLE SC (
  Sno    char(7)  NOT NULL,
  Cno   char(10)  NOT NULL,
  Grade  tinyint,
  CHECK (Grade >= 0 and Grade <= 100),
  PRIMARY KEY ( Sno, Cno ),
  FOREIGN KEY ( Sno )  
      REFERENCES  Student ( Sno ),
  FOREIGN KEY ( Cno )  
      REFERENCES  Course ( Cno ) )
```

### 3.2 约束类型

| 约束类型   | 说明                          | 示例                                  |
|------------|-------------------------------|---------------------------------------|
| NOT NULL   | 非空约束                      | Sname CHAR(10) NOT NULL               |
| DEFAULT    | 默认值约束                    | Sdept CHAR(20) DEFAULT '计算机系'      |
| UNIQUE     | 唯一性约束                    | Sname CHAR(10) UNIQUE                 |
| CHECK      | 范围约束                      | Sage TINYINT CHECK (Sage BETWEEN 15 AND 45) |
| PRIMARY KEY| 主键约束                      | PRIMARY KEY (Sno)                     |
| FOREIGN KEY| 外键约束                      | FOREIGN KEY (Sno) REFERENCES Student(Sno) |

### 3.3 修改表

```sql
-- 添加列
-- 为SC表添加“修课类别”列，此列的定义为：XKLB  char(4)
ALTER TABLE SC ADD XKLB CHAR(4);

-- 修改列类型
-- 将新添加的XKLB的类型改为char(6)。
ALTER TABLE SC ALTER COLUMN XKLB CHAR(6);

-- 删除列
-- 删除Course表的Period列。
ALTER TABLE Course DROP COLUMN Period;
```

### 3.4 删除表
```sql
DROP TABLE IF EXISTS Test;
```

## 四、数据查询

### 4.1 基本语法

```sql
SELECT 列名列表 --需要哪些列
FROM 表名 --来自于哪些表
[WHERE 条件] --根据什么条件
[GROUP BY 分组列 [HAVING 组条件]]
[ORDER BY 排序列 [ASC/DESC]];
```

#### 4.1.1字符匹配

* 使用LIKE运算符

* 一般形式为：

  列名 [NOT ] LIKE <匹配串>

* 匹配串中可包含如下四种通配符：

	* _：匹配任意一个字符；

	* %：匹配0个或多个字符；

	* [ ]：匹配[ ]中的任意一个字符；

	* [ ^ ]：不匹配[ ]中的任意一个字符 

```sql
-- 例18．查询姓'张'的学生的详细信息。
	SELECT * FROM Student 
    WHERE Sname LIKE '张%'
-- 例19．查询学生表中姓'张'、'李'和'刘'的学生的情况。
	SELECT * FROM Student 
    WHERE Sname LIKE ' [张李刘]%'
-- 例20．查询名字中第2个字为'小'或'大'的学生的姓名和学号
    SELECT Sname, Sno FROM Student 
    WHERE Sname LIKE '_[小大]%'
```

#### 4.1.2 消除取值相同的记录

- 用DISTINCT关键字可以去掉结果中的重复行。

- DISTINCT关键字放在SELECT词的后边、目标列名序列的前边。

```sql
 SELECT DISTINCT Sno FROM SC
```

#### 4.1.3 更多查询

```sql
-- 用BETWEEN…AND和NOT BETWEEN…AND
SELECT Sname, Sdept, Sage  FROM Student 
	WHERE Sage BETWEEN 20 AND 23
-- in查询
SELECT Sname, Ssex  FROM Student 
	   WHERE Sdept IN ('信息系', '数学系', '计算机系')
SELECT Sname, Ssex  FROM Student 
	 WHERE Sdept NOT IN ('信息系', '数学系', '计算机系')
```



### 4.2 查询类型

#### 4.2.1 简单查询

```sql
-- 查询全部列
SELECT  *  FROM Student 

-- 查询计算机系20岁以下学生
SELECT Sname, Sage
FROM Student
WHERE Sdept = '计算机系' AND Sage < 20;

```



#### 4.2.2 聚合查询

```sql
-- 统计总人数
SELECT COUNT(*) AS 学生总数 FROM Student;

-- 计算平均分
SELECT AVG(Grade) AS 平均分 FROM SC WHERE Cno = 'C01';
```

#### 4.2.3 分组查询
```sql
-- 按课程统计选课人数
SELECT Cno, COUNT(Sno) AS 选课人数
FROM SC
GROUP BY Cno
HAVING COUNT(Sno) > 3;
```

#### 4.2.4 连接查询

```sql
-- 自链接
SELECT S2.Sname, S2.Sdept
  FROM Student S1 JOIN Student S2
  ON S1.Sdept = S2.Sdept
  WHERE S1.Sname = '刘晨'
  AND S2.Sname != '刘晨'

-- 内连接查询
SELECT Sname, Cname, Grade
FROM Student s
JOIN SC ON s.Sno = SC.Sno
JOIN Course c ON SC.Cno = c.Cno
WHERE Sdept = '信息系';

-- 外连接
SELECT Student.Sno, Sname, Cno, Grade
    FROM Student LEFT OUTER JOIN SC
    ON Student.Sno = SC.Sno 

-- 左外连接查询
SELECT Student.Sno, Sname, Cno
FROM Student
LEFT JOIN SC ON Student.Sno = SC.Sno;
```

#### 4.2.5 子查询
```sql
-- 高于课程平均分的学生
SELECT Sno, Grade
FROM SC
WHERE Grade > (SELECT AVG(Grade) FROM SC WHERE Cno = 'C01');

-- 存在性测试
SELECT Sname
FROM Student
WHERE EXISTS (
  SELECT * FROM SC
  WHERE Sno = Student.Sno AND Cno = 'C01'
);
-- 例45. 查询与刘晨在同一个系的学生。
SELECT Sno, Sname, Sdept
  FROM Student
    WHERE Sdept IN
       ( SELECT Sdept FROM Student
          WHERE Sname = '刘晨' )
     AND Sname != '刘晨' 
-- 例46. 查询成绩为大于90分的学生的学号、姓名。
SELECT Sno, Sname FROM Student
    WHERE Sno IN
        ( SELECT Sno FROM SC
            WHERE Grade > 90 ) 
-- 例47. 查询选修了“数据库基础”课程的学生的学号、姓名。
SELECT Sno, Sname FROM Student
 WHERE Sno IN
    ( SELECT Sno FROM SC
        WHERE Cno IN
        (SELECT Cno FROM Course
          WHERE Cname = '数据库基础') ) 

	
```

- 带比较运算符的子查询指父查询与子查询之间用比较运算符连接，

- 当用户能确切知道内层查询返回的是单值时，可用>、<、=、>=、<=、<>运算符。

```sql
-- 例48. 查询修了‘c02’课程且成绩高于此课程的平均成绩的学生的学号和成绩。
SELECT Sno , Grade FROM SC
	 WHERE Cno = 'c02‘
   and Grade > (
     SELECT AVG(Grade) from SC 
        WHERE Cno = 'c02') 

```

存在性测试

- 一般使用EXISTS谓词。

- 带EXISTS谓词的子查询不返回查询的数据，只产生逻辑真值（有数据）和假值（没有数据）。 

```sql
-- 例49.查询选修了‘c01’号课程的学生姓名。
SELECT Sname FROM Student 
	WHERE EXISTS
		(SELECT * FROM SC
		   WHERE Sno = Student.Sno                AND Cno = 'c01') 

```



## 五、数据更改

### 5.1 插入数据

```sql
-- 插入单行
INSERT INTO Student VALUES ('9521105', '陈冬', '男', 18, '信息系');

-- 指定列插入
INSERT INTO SC(Sno, Cno) VALUES ('9521105', 'C01');
```

#### 5.1.1 随机插入

```sql
INSERT INTO Student 
VALUES (
    CONCAT('222512', LPAD(FLOOR(RAND() * 100), 2, '0')),  -- 学号
    CONCAT(
        ELT(1 + FLOOR(RAND() * 4), '陈', '王', '李', '张'),  -- 姓氏
        ELT(1 + FLOOR(RAND() * 10), '强', '丽', '伟', '涛', '敏', '杰', '芳', '勇', '宁', '斌')  -- 名字
    ),  
    '男',  -- 性别固定
    FLOOR(18 + RAND() * 6),  -- 年龄
    '智能运输系'  -- 固定系名
);
```



### 5.2 更新数据

```sql
-- 全体学生年龄加1
UPDATE Student SET Sage = Sage + 1;

-- 计算机系成绩加5分
UPDATE SC
SET Grade = Grade + 5
WHERE Sno IN (SELECT Sno FROM Student WHERE Sdept = '计算机系');
```

### 5.3 删除数据

```sql
-- 删除不及格记录
DELETE FROM SC WHERE Grade < 60;

-- 批量删除
DELETE FROM SC
WHERE Grade < 60 AND Sno IN (SELECT Sno FROM Student WHERE Sdept = '计算机系');
```


## 六、索引
### 6.1 索引类型

| 类型       | 描述                                                                 |
|------------|----------------------------------------------------------------------|
| 聚簇索引   | 数据按索引顺序物理存储，一个表只能有一个聚簇索引                     |
| 非聚簇索引 | 数据与索引分开存储，类似书籍目录，可创建多个                         |
| 唯一索引   | 确保索引列无重复值                                                   |

### 6.2 索引操作

```sql
-- 创建普通索引
CREATE INDEX idx_Sname ON Student(Sname);

-- 创建唯一聚簇索引
CREATE UNIQUE CLUSTERED INDEX idx_Sid ON Student(Sid);

-- 删除索引
DROP INDEX idx_Sname;
```


## 七、总结
- **数据类型**：根据业务需求选择合适的数据类型（如字符串用VARCHAR，日期用DATETIME）
- **约束使用**：通过NOT NULL/UNIQUE/CHECK等约束保证数据完整性
- **查询优化**：合理使用JOIN和子查询，避免全表扫描
- **索引策略**：为经常查询的列创建索引，但避免过度索引影响写入性能
- **事务控制**：重要操作使用事务保证数据一致性