### Build only what you need, when you need it.

<pre><span class="nv">$ </span><span class="mi">ender</span> build <span class="s1">domready qwery underscore</span></pre>

### Lightweight, expressive, familiar.

```js
$('#content a.button')
  .bind('click.button', function (e) {
    $(this).data('clicked', true).unbind()
    e.preventDefault()
  })
  .css({
      opacity: 1
    , color: 'red'
  })
  .fadeOut(250)

$.map(['a', 'b', 'c'], function (letter) {
  return letter.toUpperCase()
})

$.ajax('/data', function (resp) {
  $('#content').html(resp)
})
```