---
title: hadoop实验
date: 2025-03-31 21:05:59
tags: 学习笔记
---
# hadoop实验

说白了就是几个机器存一些文件，保证一个机器坏了文件不丢。大概的原理就是：使用多个能够互相通讯的主机，安装hadoop，其中一个为master,其他均为slaver。master统一管理数据请求。

实验思路：建立几个能够互相通讯的虚拟机，实现分布式存储。



#### 1. 物理机中（win11为例）

**网络配置**

让我们的几台虚拟机处于同一内网，允许互相通讯。

搜索：网络连接

![1743433331056](https://resource-un4.pages.dev/article/1743433331056.png)

共享：已有的网络开启共享

右键-状态-属性-共享-vmnet8

![1743433436557](https://resource-un4.pages.dev/article/1743433436557.png)

![1743433608428](https://resource-un4.pages.dev/article/1743433608428.png)

确定vmnet8 ip:右键-状态-详细信息

![1743433669280](https://resource-un4.pages.dev/article/1743433669280.png)

记录下ipv4和默认网关、DNS、子网掩码等，我的如下：

192.168.137.1

192.168.137.2

114.114.114.114

255.255.255.255

wmware中左上角：编辑-虚拟网络编辑器-更改设置（右下角）

![1743433787184](https://resource-un4.pages.dev/article/1743433787184.png)

![1743433955055](https://resource-un4.pages.dev/article/1743433955055.png)

选中VMnet8 设置nat模式，关闭DHCP，设置子网ip

![1743434044704](https://resource-un4.pages.dev/article/1743434044704.png)

192.168.137.0 （最后一位写0）

进入net设置写入网关（前面记录的网关）

在库中右键ubuntu打开设置-网络适配器-自定义-VMNet8

![1743434104733](https://resource-un4.pages.dev/article/1743434104733.png)

#### 2.虚拟机中

进入虚拟机-Termianl

查看网卡虚拟网卡名称

`ip address`

![image-20250331213853612](https://resource-un4.pages.dev/article/image-20250331213853612.png)

我的是ens33，如果你的不是，后面代码中的这个全部替换成你自己的网卡名字。

##### 配置信息

```
sudo vi /etc/netplan/01-network-manager-all.yaml
```

i 进入输入模式，复制下面代码，完全覆盖（shift+insert粘贴）
```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33:
      dhcp4: false
      addresses: [ 192.168.137.101/24 ]
      routes:
        - to: default
          via: 192.168.137.2
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

保存退出

`esc   :wq`

应用

```
sudo netplan --debug apply
```

输入`ip address`查看ip是否成功配置

#### ssh

> [Linux虚拟机配置ssh远程连接详细步骤(保姆级教程)_虚拟机安装ssh-CSDN博客](https://blog.csdn.net/m0_64655190/article/details/130569010)

安装ssh

```
sudo apt install openssh-server
```

配置ssh

```
sudo vi /etc/ssh/sshd_config 
```

去掉下图圈起来得“#”号，将prohibit-password改为yes。如果不该为yes，虚拟机是不允许root用户登录的。

​    改好之后:wq保存

![image-20250331225825642](https://resource-un4.pages.dev/article/image-20250331225825642.png)

设置ssh的root用户登入密码

```
sudo passwd root
```

重启ssh服务

```
sudo service ssh restart
```



#### 修改主机名

```
sudo vim /etc/hostname
```

输入i进入修改模式,修改为`Master`后保存退出`esc   :wq`

**重启生效**

```bash
reboot
```



注：如果你觉得crtlcv更好用，到这你就可以在物理机的cmd上使用ssh连接master主机了.

```bash
ssh root@Master
或者
ssh root@192.168.137.102
```

建议不要使用root用户，后面就知道了

推荐使用自己的用户



#### **提前为后续克隆准备**

命名为 Master、Slave001 Slave002 Slave003

让其ip分别为102，103，104，105

```
sudo vi /etc/hosts
```

粘贴新增以下内容：

```
192.168.137.102  Master
192.168.137.103  Slave001
192.168.137.104  Slave002
192.168.137.105  Slave003
```



#### Java和hadoop下载

**java**

```bash
sudo apt update 
sudo apt install openjdk-17-jdk
sudo apt install openjdk-17-jre
```

**hadoop**

```
wget https://archive.apache.org/dist/hadoop/common/hadoop-3.3.6/hadoop-3.3.6.tar.gz
```

直接下巨慢，建议将hadoop-3.3.6.tar.gz文件拷到虚拟机某个目录，cd到这个目录

```
tar -zxvf hadoop-3.3.6.tar.gz -C /opt/
mv /opt/hadoop-3.3.6 /opt/hadoop
```

自此，hadoop成功安装到了`/opt/hadoop`目录下。

#### java和hadoop环境配置

```
sudo vi /etc/profile
source /etc/profile
```



```
JAVA_HOME="/path/to/java/install"
JAVA_HOME="/usr/lib/jvm/java-17-openjdk-amd64"
HADOOP_HOME="/opt/hadoop"
CLASSPATH=.:$JAVA_HOME/jre/lib/rt.jar:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
HADOOP_INSTALL=$HADOOP_HOME
HADOOP_MAPRED_HOME=$HADOOP_HOME
HADOOP_COMMON_HOME=$HADOOP_HOME
HADOOP_HDFS_HOME=$HADOOP_HOME
YARN_HOME=$HADOOP_HOME
HADOOP_COMMON_LIB_NATIVE_DIR=$HADOOP_HOME/lib/native
PATH=$PATH:$HADOOP_HOME/sbin:$HADOOP_HOME/bin
export PATH HADOOP_HOME CLASSPATH
```

请确保hadoop和java配置好，通过如下两命令测试：

```bash
java -version
hadoop version
```

成功如下：

![image-20250401235722309](https://resource-un4.pages.dev/article/image-20250401235722309.png)



**进一步配置hadoop**

因为无论是Master还是Slaver，他们都要相同的hadoop配置，因此我们提前配置好再克隆，省的后面一个个配置。

```bash
cd $HADOOP_HOME/etc/hadoop/
```

- hadoop-env.sh

```
sudo vi hadoop-env.sh
```

解除注释，修改如下：

```bash
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
```

jdk17还要修改一个选项

![image-20250402021651016](https://resource-un4.pages.dev/article/image-20250402021651016.png)

```bash
export HADOOP_OPTS="--add-opens java.base/java.lang=ALL-UNNAMED"
```



- core-site.xml

```bash
sudo vi core-site.xml
```

编辑内容：注意Master是我们之前配置的hosts

```xml
<configuration>
  <property>
    <name>fs.defaultFS</name>
    <value>hdfs://Master:9000</value>
  </property>
  <property>
    <name>hadoop.tmp.dir</name>
    <value>/opt/hadoop/data/tmp</value>
  </property>
</configuration>
```

- hdfs-site.xml

```
sudo vi hdfs-site.xml
```

覆盖配置

```xml
<configuration>
  <property>
    <name>dfs.replication</name>
    <value>3</value>
  </property>
  <property>
    <name>dfs.namenode.name.dir</name>
    <value>/opt/hadoop/data/namenode</value>
  </property>
  <property>
    <name>dfs.datanode.data.dir</name>
    <value>/opt/hadoop/data/datanode</value>
  </property>
</configuration>
```

- mapred-site.xml

```
sudo vi mapred-site.xml
```

覆盖配置

```xml
<configuration>
  <property>
    <name>mapreduce.framework.name</name>
    <value>yarn</value>
  </property>
</configuration>
```

- yarn-site.xml

```
sudo vi yarn-site.xml
```

覆盖配置

```xml
<configuration>
  <property>
    <name>yarn.nodemanager.aux-services</name>
    <value>mapreduce_shuffle</value>
  </property>
  <property>
    <name>yarn.resourcemanager.hostname</name>
    <value>master</value>
  </property>
  <property>
    <name>yarn.nodemanager.aux-services.mapreduce.shuffle.class</name>
    <value>org.apache.hadoop.mapred.ShuffleHandler</value>
  </property>
    <!-- 客户端提交作业的端口 -->
  <property>
    <name>yarn.resourcemanager.address</name>
    <value>master:8032</value>
  </property>
  <property>
    <name>yarn.resourcemanager.scheduler.address</name>
    <value>master:8030</value>
  </property>
  <property>
    <name>yarn.resourcemanager.resource-tracker.address</name>
    <value>master:8031</value>
  </property>
  <property>
    <name>yarn.resourcemanager.admin.address</name>
    <value>master:8033</value>
  </property>
  <property>
    <name>yarn.resourcemanager.webapp.address</name>
    <value>master:8088</value>
  </property>
</configuration>
```

- workers

```
sudo vi workers
```

删除原有内容,写入配置

```xml
slave001
slave002
slave003
```

- 创建数据目录

```bash
mkdir -p /opt/hadoop/data/{tmp,namenode,datanode}
```



### 克隆Slaver

关闭Master主机，在wmware中链接克隆出Slaver001

**克隆完成别急着打开。先配置mac地址。**

在WMware station左侧库中右键打开克隆的虚拟机Slaver001的设置：网络适配器-高级-mac地址处-生成-保存。

打开克隆的虚拟机，配置信息中修改ipv4

##### 配置信息

```bash
sudo vi /etc/netplan/01-network-manager-all.yaml
```

i 进入输入模式，修改ip为103

```
# Let NetworkManager manage all devices on this system
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33:
      dhcp4: false
      addresses: [ 192.168.137.103/24 ]
      routes:
        - to: default
          via: 192.168.137.2
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

保存退出

`esc   :wq`

应用

```
sudo netplan --debug apply
```

输入`ip address`查看ip是否成功配置.

环境配置完成。

#### 修改主机名

````
sudo vim /etc/hostname
````

输入i进入修改模式,修改`Slaver001`后保存退出`esc   :wq`



同理克隆出Slaver002 ip 104 ;Slaver003 ip 105

 

### SSH免密

Hadoop要求主节点（Master）能通过SSH无密码登录所有从节点（Slavers）。

#### **步骤 1：生成SSH密钥对（所有节点）**

```bash
ssh-keygen -t rsa   # 一直按回车，默认不设密码
```

#### **步骤 2：将公钥分发到所有节点（包括自身）**

- 在Master节点执行：(使用yes使用密码登入以上传密钥)

	```bash
	# 将Master的公钥复制到自身
	ssh-copy-id master
	
	# 将Master的公钥复制到Slave1
	ssh-copy-id slave001
	
	# 将Master的公钥复制到Slave2
	ssh-copy-id slave002
	
	# 将Master的公钥复制到Slave3
	ssh-copy-id slave003
	```

- **验证**：从Master节点执行 `ssh slaver001`，确认无需密码即可登录。

如果报错，可能需要删除旧的密钥

```bash
ssh-keygen -R "slaver001"
```

注意：强烈建议使用自己的用户名而不是root

### 配置分发

再次同步Master的hadoop配置到slaver上

```bash
scp -r /opt/hadoop slave001:/opt/
scp -r /opt/hadoop slave002:/opt/
scp -r /opt/hadoop slave003:/opt/
```



### **启动 Hadoop 集群**

#### (1) 首次格式化 HDFS（仅在 Master 执行一次）

```
hdfs namenode -format
```

#### (2) 启动 HDFS 和 YARN

```
start-dfs.sh    # 启动 HDFS
start-yarn.sh   # 启动 YARN
```

如果报错"尝试以root用户操作"，是因为root用户执行命令时不会再环境变量中带上自己的身份信息。可以在每次执行前执行如下代码：**(不推荐)**

```bash
export HDFS_NAMENODE_USER=root
export HDFS_DATANODE_USER=root
export HDFS_SECONDARYNAMENODE_USER=root
export YARN_RESOURCEMANAGER_USER=root
export YARN_NODEMANAGER_USER=root
```

或者切换到其他用户再执行一次ssh免密操作**（推荐）**

进入三个slaver主机和master主机中执行：用户名替换为自己的用户名

```
sudo chown -R zyjiang:zyjiang /opt/hadoop
sudo mkdir -p /opt/hadoop/{logs,pids}
sudo chmod 755 /opt/hadoop/logs
```

#### (3) 验证进程

- **Master 节点**：执行 `start-yarn.sh`，应看到：

	```
	9570 ResourceManager
	9354 SecondaryNameNode
	9915 Jps
	9119 NameNode
	```

- **Slave 节点**：执行 `jps`，应看到：

	```
	DataNode
	NodeManager
	```

------

### **验证集群状态**

#### (1) 查看 HDFS 节点

```
hdfs dfsadmin -report
```

#### (2) 访问 Web 界面

- **HDFS NameNode**: `http://master:9870`
- **YARN ResourceManager**: `http://master:8088`

#### (3) 运行测试作业

```
hadoop jar $HADOOP_HOME/share/hadoop/mapreduce/hadoop-mapreduce-examples-3.3.6.jar pi 2 4
```

------

### **6. 停止集群**

```
stop-yarn.sh
stop-dfs.sh
```



嫌麻烦可以

```bash
start-all.sh
stop-all.sh
```

