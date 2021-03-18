---
title: 从 IL 指令再开始
tags:
  - dotnet
---

CLR 实际运行的代码是 IL 代码 。以下是一个简单的 HelloWorld 程序：

```il
.assembly extern mscorlib{}
.assembly HelloWorld {}
.class HelloWorld extends [mscorlib]System.Object 
{
    .method public static void Main()
    {
        .entrypoint
        .maxstack 1
        ldstr "Hello, world!"
        call void [mscorlib]System.Console::WriteLine(string)
        ret
    }
}
```

通过使用类似 `ilasm` 的工具可以将其编译成可执行的程序。

当然，我们并不直接使用 IL 进行程序编写，而是使用架构在这套标准之上的其他语言，由编译器来完成到 IL 的编译，再在运行时即时编译（JIT）成机器码。

IL 是基于指令的，它通过一系列的指令来完成上层语言需要做的操作。

## 内存分配

CLR 有三块内存区域，分别是：线程的堆栈、GC 堆、LOH。涉及分配内存的指令有：

- `newobj`
- `ldstr`
- `newarr`
- `box`




## 装箱和拆箱

指令：`box`、`unbox`、`unbox.any`。

`unbox` 返回堆栈的是一个指向拆箱后值类型数据的地址。`unbox.any` 则返回的是实际的值类型数据。拆箱的过程会发生 null 检查和类型检查，并且只能对已装箱的数据作拆箱。

<!-- ## 方法调度 -->
 