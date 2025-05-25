---
title: columngeneration 列生成算法
date: 2024-05-10 23:07:59
cover: https://resource-un4.pages.dev/yspic/Marx&Engels.webp
tags: Learn 优化算法
copyright: true
---

# columgeneration 列生成算法gams代码解析

例题：

```gams
set pp/1*1000/;
set p(pp);
set pi(pp);
*子集定义
set i /1,2,3/;
pi('3')=yes;
p('1')=yes;
p('2')=yes;
p('3')=yes;
*没写的部分就是没开，即不可使用

table a(i,pp)
         1       2       3
1        1
2                1
3                        1
;

parameter n(i)/
1        44
2        3
3        48
/;
parameter w(i)/
1        81
2        70
3        68
/;
parameter CW/218/;
*******************establish master problem
positive variable x(pp);
variable z_master;
equations
master_obj_func
master_demand_const(i);
master_obj_func..
         z_master=e=sum(p,x(p));
master_demand_const(i)..
         sum(p,a(i,p)*x(p))=g=n(i);
model master_pro/all/;
*solve master_pro using LP minimizing z_master;
*display x.l,z_master.l;
*display master_demand_const.m;
*********************establish sub problem
integer variable y(i);
variable z_sub;
equations
sub_obj_func
width_const;
sub_obj_func..
         z_sub=e=1-sum(i,master_demand_const.m(i)*y(i));
*可改为max sum(i,master_demand_const.m(i)*y(i))，即背包问题；
width_const..
         sum(i,y(i)*w(i))=l=CW;
model sub_pro/sub_obj_func,width_const/;
*之前还有equations，所以此处不能用all。
*solve sub_pro using MIP minimizing z_sub;
*display y.l,z_sub.l;
*******************************cg
set iter/1*20/;
parameter sub_value/-1/;
parameter results(iter,*);
*构造了一个table，行数为iter，列的名称为想要记录数据的名称，值为数据值
loop(iter$(sub_value<0),
         solve master_pro using LP minimizing z_master;
         solve sub_pro using MIP minimizing z_sub;
         results(iter,'z_master')=z_master.l;
         results(iter,'pai_1')=master_demand_const.m('1');
*引用master_demand_const.m中的第几个数据，('1')要加单引号
         results(iter,'pai_2')=master_demand_const.m('2');
         results(iter,'pai_3')=master_demand_const.m('3');
         results(iter,'z_sub')=z_sub.l;
         results(iter,'y1')=y.l('1');
         results(iter,'y2')=y.l('2');
         results(iter,'y3')=y.l('3');

         sub_value=z_sub.l;
         pi(pp)=pi(pp-1);
*第一次循环后，pi由3变为4。pp-1相当于pp整体往左移动了一个单位，此时3的位置变成了4。
         a(i,pi)=y.l(i);
         p(pi)=yes;
);
display results;


```

