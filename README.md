## Huydq.dev

This is my personal Blog [https://huydq.dev](https://huydq.dev).

It's build by Hugo + PaperMod theme.

### Hugo

Documentation: [https://gohugo.io/documentation](https://gohugo.io/documentation/)

### PaperMod

Variables | Front Matter: [https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-variables](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-variables/)

### Special syntax & Short codes

Block code with highlight lines (can highlight multiple sections):

````
```react {hl_lines=["6-8"]}
export const api = createApi({
  ...
  endpoints: (builder) => ({
    login: builder.mutation(...),

    getUsers: builder.query({
      query: () => `users`,
    }),
  }),
  ...
}
```
````

Link to outside page:

```
{{< link link="" text="" >}}
```

Image with caption:

```
{{< figure src="/images/anh.jpg" alt="" title="" >}}
```
