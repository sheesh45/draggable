import { defineComponent as b, ref as T, openBlock as s, createElementBlock as d, Fragment as _, renderList as k, renderSlot as B } from "vue";
const C = ["onDragstart", "onDrop", "onTouchstart", "onTouchend"], y = /* @__PURE__ */ b({
  __name: "Draggable",
  props: {
    items: {},
    handle: {},
    disabled: { type: Boolean }
  },
  emits: ["update:items", "orderChanged"],
  setup(u, { emit: g }) {
    const t = u, c = g, a = T(null), i = (e, r) => {
      if (e === r) return;
      const n = [...t.items], [l] = n.splice(e, 1);
      n.splice(r, 0, l), c("update:items", n), c(
        "orderChanged",
        n.map((o, D) => ({
          id: o.id,
          order: D + 1
        }))
      );
    }, p = (e, r) => {
      if (!t.disabled) {
        if (t.handle && !e.target.closest(t.handle)) {
          e.preventDefault();
          return;
        }
        a.value = r;
      }
    }, f = (e) => {
      t.disabled || e.preventDefault();
    }, h = (e) => {
      a.value === null || t.disabled || (i(a.value, e), a.value = null);
    }, v = (e, r) => {
      t.disabled || t.handle && !e.target.closest(t.handle) || (a.value = r);
    }, m = (e, r) => {
      a.value === null || t.disabled || (i(a.value, r), a.value = null);
    };
    return (e, r) => (s(), d("div", null, [
      (s(!0), d(_, null, k(u.items, (n, l) => (s(), d("div", {
        key: n.id,
        draggable: "true",
        onDragstart: (o) => p(o, l),
        onDragover: f,
        onDrop: (o) => h(l),
        onTouchstart: (o) => v(o, l),
        onTouchend: (o) => m(o, l)
      }, [
        B(e.$slots, "default", {
          item: n,
          index: l
        })
      ], 40, C))), 128))
    ]));
  }
});
export {
  y as Draggable,
  y as default
};
