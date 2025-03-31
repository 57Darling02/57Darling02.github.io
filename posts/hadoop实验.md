---
title: hadoop实验
date: 2025-03-31 21:05:59
tags: 学习笔记
---
# hadoop实验

### 网络配置

#### 物理机中（win11为例）

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

#### 虚拟机中

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

[Linux虚拟机配置ssh远程连接详细步骤(保姆级教程)_虚拟机安装ssh-CSDN博客](https://blog.csdn.net/m0_64655190/article/details/130569010)



```
sudo apt install openssh-server
```

```
sudo service ssh restart
```

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

设置高于8位。

重启ssh服务

```
sudo service ssh restart
```



#### Java和hadoop下载

应该不难，自行搜索即可

#### 修改主机名

```
sudo vim /etc/hostname
```

输入i进入修改模式,修改`Master`后保存退出`esc   :wq`

### 克隆

链接克隆即可，克隆完成别急着打开。先配置mac地址。在WMware station左侧库中右键打开克隆的虚拟机的设置：网络适配器-高级-mac地址处生成-保存。

打开克隆的虚拟机，配置信息中修改ipv4

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
      addresses: [ 192.168.137.102/24 ]
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

