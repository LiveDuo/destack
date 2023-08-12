
### Bundle Sizes

**Measures:**

- 673kb (without themes)
- 408kb (without grapes & themes)
- 64kb (without grapes, themes & craft)

**Sizes:**

- Themes: 673kb - 408kb = 265kb
- Craft: 408kb - 64kb = 344kb
- Grapes: 909kb- 673kb = 236kb


### Dependencies

```
node-html-parser -> 73.2
@craftjs/core -> 47.1
@craftjs/layers -> 18.2
@radix-ui/react-select -> 12.9
@radix-ui/react-tooltip -> 12.7
@radix-ui/react-dialog -> 9.4
```

**Total:** 73.2 + 47.1 + 18.2 + 12.9 + 12.7 + 9.4 = 173.5 

**Expected:** 408kb - 64kb = 344kb (rest should be source code)


### Dependencies Sizes

https://bundlephobia.com/scan-results?packages=@craftjs/core@0.2.0-beta.8,@craftjs/layers@0.2.0-beta.8,@heroicons/react@2.0.12,@radix-ui/react-dialog@1.0.0,@radix-ui/react-select@1.1.1,@radix-ui/react-tooltip@1.0.0,classnames@2.2.6,concurrently@6.4.0,cors@2.8.5,formidable@1.2.2,grapesjs@0.16.45,is-svg-path@1.0.2,node-html-parser@6.1.1,postcss@8.4.18,re-resizable@6.1.0,react-color@2.17.3,ts-node@10.4.0,yargs@17.3.0&sortMode=size


