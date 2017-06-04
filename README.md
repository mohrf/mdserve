# mdserve

Simple command-line markdown server with automatic refresh. **mdserve** will serve your markdown files at localhost and will automatically update them while you edit.


## Usage

Install it

```bash
$ npm install mdserve -g
```

And run this command in terminal

```bash
$ mdserve <path>
```

mdserve will serve markdown files at `localhost`

## Example

The local folder contains one markdown file `example.md`

```bash
$ ls
example.md
```

Start **mdserve** 

```bash
$ mdserve
```

And view markdown at [http://localhost:2212/example.md](http://localhost:2212/example.md) 
![example](https://github.com/mohrf/mdserve/blob/screenshots/mdserve-example.png?raw=true)

## Credits

Fernando Mohr ([@f__mohr](https://twitter.com/f__mohr))


