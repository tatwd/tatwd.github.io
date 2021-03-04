---
title: Lua 在 Redis 中的应用
tags:
  - Redis
  - Lua
---

Redis 从 2.6.0 开始便支持执行 Lua 脚本，使用的命令有 [`EVAL`](https://redis.io/commands/eval)。

这个脚本的执行是一个事务性的操作，并且是 Redis 中一种更快速和高效的（simpler and faster）事务执行方式。

基本语法：
```sh
EVAL 脚本代码 键个数 键1 [键2 ...] 参数1 [参数2 ...]
```

在 Lua 脚本中，使用全局数组变量 `KEYS` 访问键，`ARGV` 访问参数，这两个变量都是**从数组下标 1 开始**进行访问。

而在 Lua 脚本中可以使用以下两个函数来执行 Redis 的命令：

- `redis.call()`
- `redis.pcall()`

前者在执行发生错误是会抛给执行者，而后者不会。

> update ...

参考资料

- [1] _[Redis Lua scripting](https://redis.io/commands/eval)_
- [2] _[Redis transactions](https://redis.io/topics/transactions)_
