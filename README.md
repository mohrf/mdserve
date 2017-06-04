# mdserve

Simple command-line markdown server with automatic refresh. **mdserve** will serve your markdown files on localhost and will automatically update them while you edit.


## Usage

Install it

```bash
$ npm install mdserve -g
```

And run this command in terminal

```bash
$ mdserve <path>
```

mdserve will serve markdown files on `localhost`

## Example

The local folder contais one markdown file `example.md`

```bash
$ ls
example.md
```

Start mdserve 

```bash
$ mdserve
```

And view markdown at [http://localhost:2212/example.md](http://localhost:2212/example.md) 
![example](https://github.com/mohrf/mdserve/blob/screenshots/mdserve-example.png?raw=true)




