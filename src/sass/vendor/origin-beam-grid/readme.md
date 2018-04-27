### Beam Grid
Beam grid is a grid written entirly with BEM in mind.

#### Variables

`$gutter` which is the overall gutter size

`$grid-size` which controls how many columns a single row can contain.

`$breakpoints` is a list of all the breakpoints you want it allows you to make up your own points or rely on the defaults.

Note: the container-breaks rely on the breakpoints passed.

```
$breakpoints: (
    xs: 0,
    sm: 544px,
    md: 768px,
    lg: 992px,
    xl: 1200px
);
```

`$container` which is a list of all the various container sizes at different breakpoints. e.g:

```
$container: (
    sm: 576px,
    md: 720px,
    lg: 940px,
    xl: 1140px
) !default;
```
`$fluid-container-max` specifys the maximum size of the container before it becomes fluid set this to 100% if you want the container to span the entire width of the window.


#### Mixins

all arguments will use their parent variables

**Containers**

make-container accepts 3 arguments:

```
@include make-container(
	$container-breaks,
	$gutter,
	$breakpoints
);
```

make-fluid-container accepts 2 arguments

```
@include make-fluid-container(
	$fluid-container-max,
	$gutter
);
```

**Rows**

make-row accepts 3 arguments
make-row also handles the making of columns altough you still have access to make-columns which accepts 3 arguments

```
@include make-row(
	$grid-size,
	$gutter,
	$breakpoints
);
```

```
@include make-columns(
	$grid-size,
	$gutter,
	$breakpoints
);
```


**Media**

TODO...