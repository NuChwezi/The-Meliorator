/* Javascript plotting library for jQuery, version 0.8.3.

Copyright (c) 2007-2014 IOLA and Ole Laursen.
Licensed under the MIT license.

*/
// first an inline dependency, jquery.colorhelpers.js, we inline it here
// for convenience
/* Plugin for jQuery for working with colors.
 *
 * Version 1.1.
 *
 * Inspiration from jQuery color animation plugin by John Resig.
 *
 * Released under the MIT license by Ole Laursen, October 2009.
 *
 * Examples:
 *
 *   $.color.parse("#fff").scale('rgb', 0.25).add('a', -0.5).toString()
 *   var c = $.color.extract($("#mydiv"), 'background-color');
 *   console.log(c.r, c.g, c.b, c.a);
 *   $.color.make(100, 50, 25, 0.4).toString() // returns "rgba(100,50,25,0.4)"
 *
 * Note that .scale() and .add() return the same modified object
 * instead of making a new one.
 *
 * V. 1.1: Fix error handling so e.g. parsing an empty string does
 * produce a color rather than just crashing.
 */
(function($) {
    $.color = {};
    $.color.make = function(r, g, b, a) {
        var o = {};
        o.r = r || 0;
        o.g = g || 0;
        o.b = b || 0;
        o.a = a != null ? a : 1;
        o.add = function(c, d) {
            for (var i = 0; i < c.length; ++i)
                o[c.charAt(i)] += d;
            return o.normalize()
        }
        ;
        o.scale = function(c, f) {
            for (var i = 0; i < c.length; ++i)
                o[c.charAt(i)] *= f;
            return o.normalize()
        }
        ;
        o.toString = function() {
            if (o.a >= 1) {
                return "rgb(" + [o.r, o.g, o.b].join(",") + ")"
            } else {
                return "rgba(" + [o.r, o.g, o.b, o.a].join(",") + ")"
            }
        }
        ;
        o.normalize = function() {
            function clamp(min, value, max) {
                return value < min ? min : value > max ? max : value
            }
            o.r = clamp(0, parseInt(o.r), 255);
            o.g = clamp(0, parseInt(o.g), 255);
            o.b = clamp(0, parseInt(o.b), 255);
            o.a = clamp(0, o.a, 1);
            return o
        }
        ;
        o.clone = function() {
            return $.color.make(o.r, o.b, o.g, o.a)
        }
        ;
        return o.normalize()
    }
    ;
    $.color.extract = function(elem, css) {
        var c;
        do {
            c = elem.css(css).toLowerCase();
            if (c != "" && c != "transparent")
                break;
            elem = elem.parent()
        } while (elem.length && !$.nodeName(elem.get(0), "body"));if (c == "rgba(0, 0, 0, 0)")
            c = "transparent";
        return $.color.parse(c)
    }
    ;
    $.color.parse = function(str) {
        var res, m = $.color.make;
        if (res = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))
            return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10));
        if (res = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return m(parseInt(res[1], 10), parseInt(res[2], 10), parseInt(res[3], 10), parseFloat(res[4]));
        if (res = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))
            return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55);
        if (res = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return m(parseFloat(res[1]) * 2.55, parseFloat(res[2]) * 2.55, parseFloat(res[3]) * 2.55, parseFloat(res[4]));
        if (res = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))
            return m(parseInt(res[1], 16), parseInt(res[2], 16), parseInt(res[3], 16));
        if (res = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))
            return m(parseInt(res[1] + res[1], 16), parseInt(res[2] + res[2], 16), parseInt(res[3] + res[3], 16));
        var name = $.trim(str).toLowerCase();
        if (name == "transparent")
            return m(255, 255, 255, 0);
        else {
            res = lookupColors[name] || [0, 0, 0];
            return m(res[0], res[1], res[2])
        }
    }
    ;
    var lookupColors = {
        aqua: [0, 255, 255],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        black: [0, 0, 0],
        blue: [0, 0, 255],
        brown: [165, 42, 42],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgrey: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkviolet: [148, 0, 211],
        fuchsia: [255, 0, 255],
        gold: [255, 215, 0],
        green: [0, 128, 0],
        indigo: [75, 0, 130],
        khaki: [240, 230, 140],
        lightblue: [173, 216, 230],
        lightcyan: [224, 255, 255],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        navy: [0, 0, 128],
        olive: [128, 128, 0],
        orange: [255, 165, 0],
        pink: [255, 192, 203],
        purple: [128, 0, 128],
        violet: [128, 0, 128],
        red: [255, 0, 0],
        silver: [192, 192, 192],
        white: [255, 255, 255],
        yellow: [255, 255, 0]
    }
})(jQuery);
/* FLOT */
!function(a) {
    function c(b, c) {
        var d = c.children("." + b)[0];
        if (null == d && (d = document.createElement("canvas"),
        d.className = b,
        a(d).css({
            direction: "ltr",
            position: "absolute",
            left: 0,
            top: 0
        }).appendTo(c),
        !d.getContext)) {
            if (!window.G_vmlCanvasManager)
                throw new Error("Canvas is not available. If you're using IE with a fall-back such as Excanvas, then there's either a mistake in your conditional include, or the page has no DOCTYPE and is rendering in Quirks Mode.");
            d = window.G_vmlCanvasManager.initElement(d)
        }
        this.element = d;
        var e = this.context = d.getContext("2d")
          , f = window.devicePixelRatio || 1
          , g = e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1;
        this.pixelRatio = f / g,
        this.resize(c.width(), c.height()),
        this.textContainer = null ,
        this.text = {},
        this._textCache = {}
    }
    function d(b, d, f, g) {
        function v(a, b) {
            b = [u].concat(b);
            for (var c = 0; c < a.length; ++c)
                a[c].apply(this, b)
        }
        function w() {
            for (var b = {
                Canvas: c
            }, d = 0; d < g.length; ++d) {
                var e = g[d];
                e.init(u, b),
                e.options && a.extend(!0, i, e.options)
            }
        }
        function x(c) {
            a.extend(!0, i, c),
            c && c.colors && (i.colors = c.colors),
            null == i.xaxis.color && (i.xaxis.color = a.color.parse(i.grid.color).scale("a", .22).toString()),
            null == i.yaxis.color && (i.yaxis.color = a.color.parse(i.grid.color).scale("a", .22).toString()),
            null == i.xaxis.tickColor && (i.xaxis.tickColor = i.grid.tickColor || i.xaxis.color),
            null == i.yaxis.tickColor && (i.yaxis.tickColor = i.grid.tickColor || i.yaxis.color),
            null == i.grid.borderColor && (i.grid.borderColor = i.grid.color),
            null == i.grid.tickColor && (i.grid.tickColor = a.color.parse(i.grid.color).scale("a", .22).toString());
            var d, e, f, g = b.css("font-size"), h = g ? +g.replace("px", "") : 13, j = {
                style: b.css("font-style"),
                size: Math.round(.8 * h),
                variant: b.css("font-variant"),
                weight: b.css("font-weight"),
                family: b.css("font-family")
            };
            for (f = i.xaxes.length || 1,
            d = 0; d < f; ++d)
                e = i.xaxes[d],
                e && !e.tickColor && (e.tickColor = e.color),
                e = a.extend(!0, {}, i.xaxis, e),
                i.xaxes[d] = e,
                e.font && (e.font = a.extend({}, j, e.font),
                e.font.color || (e.font.color = e.color),
                e.font.lineHeight || (e.font.lineHeight = Math.round(1.15 * e.font.size)));
            for (f = i.yaxes.length || 1,
            d = 0; d < f; ++d)
                e = i.yaxes[d],
                e && !e.tickColor && (e.tickColor = e.color),
                e = a.extend(!0, {}, i.yaxis, e),
                i.yaxes[d] = e,
                e.font && (e.font = a.extend({}, j, e.font),
                e.font.color || (e.font.color = e.color),
                e.font.lineHeight || (e.font.lineHeight = Math.round(1.15 * e.font.size)));
            for (i.xaxis.noTicks && null == i.xaxis.ticks && (i.xaxis.ticks = i.xaxis.noTicks),
            i.yaxis.noTicks && null == i.yaxis.ticks && (i.yaxis.ticks = i.yaxis.noTicks),
            i.x2axis && (i.xaxes[1] = a.extend(!0, {}, i.xaxis, i.x2axis),
            i.xaxes[1].position = "top",
            null == i.x2axis.min && (i.xaxes[1].min = null ),
            null == i.x2axis.max && (i.xaxes[1].max = null )),
            i.y2axis && (i.yaxes[1] = a.extend(!0, {}, i.yaxis, i.y2axis),
            i.yaxes[1].position = "right",
            null == i.y2axis.min && (i.yaxes[1].min = null ),
            null == i.y2axis.max && (i.yaxes[1].max = null )),
            i.grid.coloredAreas && (i.grid.markings = i.grid.coloredAreas),
            i.grid.coloredAreasColor && (i.grid.markingsColor = i.grid.coloredAreasColor),
            i.lines && a.extend(!0, i.series.lines, i.lines),
            i.points && a.extend(!0, i.series.points, i.points),
            i.bars && a.extend(!0, i.series.bars, i.bars),
            null != i.shadowSize && (i.series.shadowSize = i.shadowSize),
            null != i.highlightColor && (i.series.highlightColor = i.highlightColor),
            d = 0; d < i.xaxes.length; ++d)
                E(o, d + 1).options = i.xaxes[d];
            for (d = 0; d < i.yaxes.length; ++d)
                E(p, d + 1).options = i.yaxes[d];
            for (var k in t)
                i.hooks[k] && i.hooks[k].length && (t[k] = t[k].concat(i.hooks[k]));
            v(t.processOptions, [i])
        }
        function y(a) {
            h = z(a),
            F(),
            G()
        }
        function z(b) {
            for (var c = [], d = 0; d < b.length; ++d) {
                var e = a.extend(!0, {}, i.series);
                null != b[d].data ? (e.data = b[d].data,
                delete b[d].data,
                a.extend(!0, e, b[d]),
                b[d].data = e.data) : e.data = b[d],
                c.push(e)
            }
            return c
        }
        function A(a, b) {
            var c = a[b + "axis"];
            return "object" == typeof c && (c = c.n),
            "number" != typeof c && (c = 1),
            c
        }
        function B() {
            return a.grep(o.concat(p), function(a) {
                return a
            })
        }
        function C(a) {
            var c, d, b = {};
            for (c = 0; c < o.length; ++c)
                d = o[c],
                d && d.used && (b["x" + d.n] = d.c2p(a.left));
            for (c = 0; c < p.length; ++c)
                d = p[c],
                d && d.used && (b["y" + d.n] = d.c2p(a.top));
            return void 0 !== b.x1 && (b.x = b.x1),
            void 0 !== b.y1 && (b.y = b.y1),
            b
        }
        function D(a) {
            var c, d, e, b = {};
            for (c = 0; c < o.length; ++c)
                if (d = o[c],
                d && d.used && (e = "x" + d.n,
                null == a[e] && 1 == d.n && (e = "x"),
                null != a[e])) {
                    b.left = d.p2c(a[e]);
                    break
                }
            for (c = 0; c < p.length; ++c)
                if (d = p[c],
                d && d.used && (e = "y" + d.n,
                null == a[e] && 1 == d.n && (e = "y"),
                null != a[e])) {
                    b.top = d.p2c(a[e]);
                    break
                }
            return b
        }
        function E(b, c) {
            return b[c - 1] || (b[c - 1] = {
                n: c,
                direction: b == o ? "x" : "y",
                options: a.extend(!0, {}, b == o ? i.xaxis : i.yaxis)
            }),
            b[c - 1]
        }
        function F() {
            var d, b = h.length, c = -1;
            for (d = 0; d < h.length; ++d) {
                var e = h[d].color;
                null != e && (b--,
                "number" == typeof e && e > c && (c = e))
            }
            b <= c && (b = c + 1);
            var f, g = [], j = i.colors, k = j.length, l = 0;
            for (d = 0; d < b; d++)
                f = a.color.parse(j[d % k] || "#666"),
                d % k == 0 && d && (l = l >= 0 ? l < .5 ? -l - .2 : 0 : -l),
                g[d] = f.scale("rgb", 1 + l);
            var n, m = 0;
            for (d = 0; d < h.length; ++d) {
                if (n = h[d],
                null == n.color ? (n.color = g[m].toString(),
                ++m) : "number" == typeof n.color && (n.color = g[n.color].toString()),
                null == n.lines.show) {
                    var q, r = !0;
                    for (q in n)
                        if (n[q] && n[q].show) {
                            r = !1;
                            break
                        }
                    r && (n.lines.show = !0)
                }
                null == n.lines.zero && (n.lines.zero = !!n.lines.fill),
                n.xaxis = E(o, A(n, "x")),
                n.yaxis = E(p, A(n, "y"))
            }
        }
        function G() {
            function x(a, b, c) {
                b < a.datamin && b != -d && (a.datamin = b),
                c > a.datamax && c != d && (a.datamax = c)
            }
            var e, f, g, i, k, l, m, q, r, s, u, w, b = Number.POSITIVE_INFINITY, c = Number.NEGATIVE_INFINITY, d = Number.MAX_VALUE;
            for (a.each(B(), function(a, d) {
                d.datamin = b,
                d.datamax = c,
                d.used = !1
            }),
            e = 0; e < h.length; ++e)
                k = h[e],
                k.datapoints = {
                    points: []
                },
                v(t.processRawData, [k, k.data, k.datapoints]);
            for (e = 0; e < h.length; ++e) {
                if (k = h[e],
                u = k.data,
                w = k.datapoints.format,
                !w) {
                    if (w = [],
                    w.push({
                        x: !0,
                        number: !0,
                        required: !0
                    }),
                    w.push({
                        y: !0,
                        number: !0,
                        required: !0
                    }),
                    k.bars.show || k.lines.show && k.lines.fill) {
                        var y = !!(k.bars.show && k.bars.zero || k.lines.show && k.lines.zero);
                        w.push({
                            y: !0,
                            number: !0,
                            required: !1,
                            defaultValue: 0,
                            autoscale: y
                        }),
                        k.bars.horizontal && (delete w[w.length - 1].y,
                        w[w.length - 1].x = !0)
                    }
                    k.datapoints.format = w
                }
                if (null == k.datapoints.pointsize) {
                    k.datapoints.pointsize = w.length,
                    m = k.datapoints.pointsize,
                    l = k.datapoints.points;
                    var z = k.lines.show && k.lines.steps;
                    for (k.xaxis.used = k.yaxis.used = !0,
                    f = g = 0; f < u.length; ++f,
                    g += m) {
                        s = u[f];
                        var A = null == s;
                        if (!A)
                            for (i = 0; i < m; ++i)
                                q = s[i],
                                r = w[i],
                                r && (r.number && null != q && (q = +q,
                                isNaN(q) ? q = null : q == 1 / 0 ? q = d : q == -(1 / 0) && (q = -d)),
                                null == q && (r.required && (A = !0),
                                null != r.defaultValue && (q = r.defaultValue))),
                                l[g + i] = q;
                        if (A)
                            for (i = 0; i < m; ++i)
                                q = l[g + i],
                                null != q && (r = w[i],
                                r.autoscale !== !1 && (r.x && x(k.xaxis, q, q),
                                r.y && x(k.yaxis, q, q))),
                                l[g + i] = null ;
                        else if (z && g > 0 && null != l[g - m] && l[g - m] != l[g] && l[g - m + 1] != l[g + 1]) {
                            for (i = 0; i < m; ++i)
                                l[g + m + i] = l[g + i];
                            l[g + 1] = l[g - m + 1],
                            g += m
                        }
                    }
                }
            }
            for (e = 0; e < h.length; ++e)
                k = h[e],
                v(t.processDatapoints, [k, k.datapoints]);
            for (e = 0; e < h.length; ++e) {
                k = h[e],
                l = k.datapoints.points,
                m = k.datapoints.pointsize,
                w = k.datapoints.format;
                var C = b
                  , D = b
                  , E = c
                  , F = c;
                for (f = 0; f < l.length; f += m)
                    if (null != l[f])
                        for (i = 0; i < m; ++i)
                            q = l[f + i],
                            r = w[i],
                            r && r.autoscale !== !1 && q != d && q != -d && (r.x && (q < C && (C = q),
                            q > E && (E = q)),
                            r.y && (q < D && (D = q),
                            q > F && (F = q)));
                if (k.bars.show) {
                    var G;
                    switch (k.bars.align) {
                    case "left":
                        G = 0;
                        break;
                    case "right":
                        G = -k.bars.barWidth;
                        break;
                    default:
                        G = -k.bars.barWidth / 2
                    }
                    k.bars.horizontal ? (D += G,
                    F += G + k.bars.barWidth) : (C += G,
                    E += G + k.bars.barWidth)
                }
                x(k.xaxis, C, E),
                x(k.yaxis, D, F)
            }
            a.each(B(), function(a, d) {
                d.datamin == b && (d.datamin = null ),
                d.datamax == c && (d.datamax = null )
            })
        }
        function H() {
            b.css("padding", 0).children().filter(function() {
                return !a(this).hasClass("flot-overlay") && !a(this).hasClass("flot-base")
            }).remove(),
            "static" == b.css("position") && b.css("position", "relative"),
            j = new c("flot-base",b),
            k = new c("flot-overlay",b),
            m = j.context,
            n = k.context,
            l = a(k.element).unbind();
            var d = b.data("plot");
            d && (d.shutdown(),
            k.clear()),
            b.data("plot", u)
        }
        function I() {
            i.grid.hoverable && (l.mousemove(ha),
            l.bind("mouseleave", ia)),
            i.grid.clickable && l.click(ja),
            v(t.bindEvents, [l])
        }
        function J() {
            fa && clearTimeout(fa),
            l.unbind("mousemove", ha),
            l.unbind("mouseleave", ia),
            l.unbind("click", ja),
            v(t.shutdown, [l])
        }
        function K(a) {
            function b(a) {
                return a
            }
            var c, d, e = a.options.transform || b, f = a.options.inverseTransform;
            "x" == a.direction ? (c = a.scale = r / Math.abs(e(a.max) - e(a.min)),
            d = Math.min(e(a.max), e(a.min))) : (c = a.scale = s / Math.abs(e(a.max) - e(a.min)),
            c = -c,
            d = Math.max(e(a.max), e(a.min))),
            e == b ? a.p2c = function(a) {
                return (a - d) * c
            }
            : a.p2c = function(a) {
                return (e(a) - d) * c
            }
            ,
            f ? a.c2p = function(a) {
                return f(d + a / c)
            }
            : a.c2p = function(a) {
                return d + a / c
            }
        }
        function L(a) {
            for (var b = a.options, c = a.ticks || [], d = b.labelWidth || 0, e = b.labelHeight || 0, f = d || ("x" == a.direction ? Math.floor(j.width / (c.length || 1)) : null ), g = a.direction + "Axis " + a.direction + a.n + "Axis", h = "flot-" + a.direction + "-axis flot-" + a.direction + a.n + "-axis " + g, i = b.font || "flot-tick-label tickLabel", k = 0; k < c.length; ++k) {
                var l = c[k];
                if (l.label) {
                    var m = j.getTextInfo(h, l.label, i, null , f);
                    d = Math.max(d, m.width),
                    e = Math.max(e, m.height)
                }
            }
            a.labelWidth = b.labelWidth || d,
            a.labelHeight = b.labelHeight || e
        }
        function M(b) {
            var c = b.labelWidth
              , d = b.labelHeight
              , e = b.options.position
              , f = "x" === b.direction
              , g = b.options.tickLength
              , h = i.grid.axisMargin
              , k = i.grid.labelMargin
              , l = !0
              , m = !0
              , n = !0
              , r = !1;
            a.each(f ? o : p, function(a, c) {
                c && (c.show || c.reserveSpace) && (c === b ? r = !0 : c.options.position === e && (r ? m = !1 : l = !1),
                r || (n = !1))
            }),
            m && (h = 0),
            null == g && (g = n ? "full" : 5),
            isNaN(+g) || (k += +g),
            f ? (d += k,
            "bottom" == e ? (q.bottom += d + h,
            b.box = {
                top: j.height - q.bottom,
                height: d
            }) : (b.box = {
                top: q.top + h,
                height: d
            },
            q.top += d + h)) : (c += k,
            "left" == e ? (b.box = {
                left: q.left + h,
                width: c
            },
            q.left += c + h) : (q.right += c + h,
            b.box = {
                left: j.width - q.right,
                width: c
            })),
            b.position = e,
            b.tickLength = g,
            b.box.padding = k,
            b.innermost = l
        }
        function N(a) {
            "x" == a.direction ? (a.box.left = q.left - a.labelWidth / 2,
            a.box.width = j.width - q.left - q.right + a.labelWidth) : (a.box.top = q.top - a.labelHeight / 2,
            a.box.height = j.height - q.bottom - q.top + a.labelHeight)
        }
        function O() {
            var d, b = i.grid.minBorderMargin;
            if (null == b)
                for (b = 0,
                d = 0; d < h.length; ++d)
                    b = Math.max(b, 2 * (h[d].points.radius + h[d].points.lineWidth / 2));
            var e = {
                left: b,
                right: b,
                top: b,
                bottom: b
            };
            a.each(B(), function(a, b) {
                b.reserveSpace && b.ticks && b.ticks.length && ("x" === b.direction ? (e.left = Math.max(e.left, b.labelWidth / 2),
                e.right = Math.max(e.right, b.labelWidth / 2)) : (e.bottom = Math.max(e.bottom, b.labelHeight / 2),
                e.top = Math.max(e.top, b.labelHeight / 2)))
            }),
            q.left = Math.ceil(Math.max(e.left, q.left)),
            q.right = Math.ceil(Math.max(e.right, q.right)),
            q.top = Math.ceil(Math.max(e.top, q.top)),
            q.bottom = Math.ceil(Math.max(e.bottom, q.bottom))
        }
        function P() {
            var b, c = B(), d = i.grid.show;
            for (var e in q) {
                var f = i.grid.margin || 0;
                q[e] = "number" == typeof f ? f : f[e] || 0
            }
            v(t.processOffset, [q]);
            for (var e in q)
                "object" == typeof i.grid.borderWidth ? q[e] += d ? i.grid.borderWidth[e] : 0 : q[e] += d ? i.grid.borderWidth : 0;
            if (a.each(c, function(a, b) {
                var c = b.options;
                b.show = null == c.show ? b.used : c.show,
                b.reserveSpace = null == c.reserveSpace ? b.show : c.reserveSpace,
                Q(b)
            }),
            d) {
                var g = a.grep(c, function(a) {
                    return a.show || a.reserveSpace
                });
                for (a.each(g, function(a, b) {
                    R(b),
                    S(b),
                    T(b, b.ticks),
                    L(b)
                }),
                b = g.length - 1; b >= 0; --b)
                    M(g[b]);
                O(),
                a.each(g, function(a, b) {
                    N(b)
                })
            }
            r = j.width - q.left - q.right,
            s = j.height - q.bottom - q.top,
            a.each(c, function(a, b) {
                K(b)
            }),
            d && Y(),
            da()
        }
        function Q(a) {
            var b = a.options
              , c = +(null != b.min ? b.min : a.datamin)
              , d = +(null != b.max ? b.max : a.datamax)
              , e = d - c;
            if (0 == e) {
                var f = 0 == d ? 1 : .01;
                null == b.min && (c -= f),
                null != b.max && null == b.min || (d += f)
            } else {
                var g = b.autoscaleMargin;
                null != g && (null == b.min && (c -= e * g,
                c < 0 && null != a.datamin && a.datamin >= 0 && (c = 0)),
                null == b.max && (d += e * g,
                d > 0 && null != a.datamax && a.datamax <= 0 && (d = 0)))
            }
            a.min = c,
            a.max = d
        }
        function R(b) {
            var d, c = b.options;
            d = "number" == typeof c.ticks && c.ticks > 0 ? c.ticks : .3 * Math.sqrt("x" == b.direction ? j.width : j.height);
            var f = (b.max - b.min) / d
              , g = -Math.floor(Math.log(f) / Math.LN10)
              , h = c.tickDecimals;
            null != h && g > h && (g = h);
            var l, i = Math.pow(10, -g), k = f / i;
            if (k < 1.5 ? l = 1 : k < 3 ? (l = 2,
            k > 2.25 && (null == h || g + 1 <= h) && (l = 2.5,
            ++g)) : l = k < 7.5 ? 5 : 10,
            l *= i,
            null != c.minTickSize && l < c.minTickSize && (l = c.minTickSize),
            b.delta = f,
            b.tickDecimals = Math.max(0, null != h ? h : g),
            b.tickSize = c.tickSize || l,
            "time" == c.mode && !b.tickGenerator)
                throw new Error("Time mode requires the flot.time plugin.");
            if (b.tickGenerator || (b.tickGenerator = function(a) {
                var g, b = [], c = e(a.min, a.tickSize), d = 0, f = Number.NaN;
                do
                    g = f,
                    f = c + d * a.tickSize,
                    b.push(f),
                    ++d;
                while (f < a.max && f != g);return b
            }
            ,
            b.tickFormatter = function(a, b) {
                var c = b.tickDecimals ? Math.pow(10, b.tickDecimals) : 1
                  , d = "" + Math.round(a * c) / c;
                if (null != b.tickDecimals) {
                    var e = d.indexOf(".")
                      , f = e == -1 ? 0 : d.length - e - 1;
                    if (f < b.tickDecimals)
                        return (f ? d : d + ".") + ("" + c).substr(1, b.tickDecimals - f)
                }
                return d
            }
            ),
            a.isFunction(c.tickFormatter) && (b.tickFormatter = function(a, b) {
                return "" + c.tickFormatter(a, b)
            }
            ),
            null != c.alignTicksWithAxis) {
                var m = ("x" == b.direction ? o : p)[c.alignTicksWithAxis - 1];
                if (m && m.used && m != b) {
                    var n = b.tickGenerator(b);
                    if (n.length > 0 && (null == c.min && (b.min = Math.min(b.min, n[0])),
                    null == c.max && n.length > 1 && (b.max = Math.max(b.max, n[n.length - 1]))),
                    b.tickGenerator = function(a) {
                        var c, d, b = [];
                        for (d = 0; d < m.ticks.length; ++d)
                            c = (m.ticks[d].v - m.min) / (m.max - m.min),
                            c = a.min + c * (a.max - a.min),
                            b.push(c);
                        return b
                    }
                    ,
                    !b.mode && null == c.tickDecimals) {
                        var q = Math.max(0, -Math.floor(Math.log(b.delta) / Math.LN10) + 1)
                          , r = b.tickGenerator(b);
                        r.length > 1 && /\..*0$/.test((r[1] - r[0]).toFixed(q)) || (b.tickDecimals = q)
                    }
                }
            }
        }
        function S(b) {
            var c = b.options.ticks
              , d = [];
            null == c || "number" == typeof c && c > 0 ? d = b.tickGenerator(b) : c && (d = a.isFunction(c) ? c(b) : c);
            var e, f;
            for (b.ticks = [],
            e = 0; e < d.length; ++e) {
                var g = null
                  , h = d[e];
                "object" == typeof h ? (f = +h[0],
                h.length > 1 && (g = h[1])) : f = +h,
                null == g && (g = b.tickFormatter(f, b)),
                isNaN(f) || b.ticks.push({
                    v: f,
                    label: g
                })
            }
        }
        function T(a, b) {
            a.options.autoscaleMargin && b.length > 0 && (null == a.options.min && (a.min = Math.min(a.min, b[0].v)),
            null == a.options.max && b.length > 1 && (a.max = Math.max(a.max, b[b.length - 1].v)))
        }
        function U() {
            j.clear(),
            v(t.drawBackground, [m]);
            var a = i.grid;
            a.show && a.backgroundColor && W(),
            a.show && !a.aboveData && X();
            for (var b = 0; b < h.length; ++b)
                v(t.drawSeries, [m, h[b]]),
                Z(h[b]);
            v(t.draw, [m]),
            a.show && a.aboveData && X(),
            j.render(),
            la()
        }
        function V(a, b) {
            for (var c, d, e, f, g = B(), h = 0; h < g.length; ++h)
                if (c = g[h],
                c.direction == b && (f = b + c.n + "axis",
                a[f] || 1 != c.n || (f = b + "axis"),
                a[f])) {
                    d = a[f].from,
                    e = a[f].to;
                    break
                }
            if (a[f] || (c = "x" == b ? o[0] : p[0],
            d = a[b + "1"],
            e = a[b + "2"]),
            null != d && null != e && d > e) {
                var i = d;
                d = e,
                e = i
            }
            return {
                from: d,
                to: e,
                axis: c
            }
        }
        function W() {
            m.save(),
            m.translate(q.left, q.top),
            m.fillStyle = sa(i.grid.backgroundColor, s, 0, "rgba(255, 255, 255, 0)"),
            m.fillRect(0, 0, r, s),
            m.restore()
        }
        function X() {
            var b, c, d, e;
            m.save(),
            m.translate(q.left, q.top);
            var f = i.grid.markings;
            if (f)
                for (a.isFunction(f) && (c = u.getAxes(),
                c.xmin = c.xaxis.min,
                c.xmax = c.xaxis.max,
                c.ymin = c.yaxis.min,
                c.ymax = c.yaxis.max,
                f = f(c)),
                b = 0; b < f.length; ++b) {
                    var g = f[b]
                      , h = V(g, "x")
                      , j = V(g, "y");
                    if (null == h.from && (h.from = h.axis.min),
                    null == h.to && (h.to = h.axis.max),
                    null == j.from && (j.from = j.axis.min),
                    null == j.to && (j.to = j.axis.max),
                    !(h.to < h.axis.min || h.from > h.axis.max || j.to < j.axis.min || j.from > j.axis.max)) {
                        h.from = Math.max(h.from, h.axis.min),
                        h.to = Math.min(h.to, h.axis.max),
                        j.from = Math.max(j.from, j.axis.min),
                        j.to = Math.min(j.to, j.axis.max);
                        var k = h.from === h.to
                          , l = j.from === j.to;
                        if (!k || !l)
                            if (h.from = Math.floor(h.axis.p2c(h.from)),
                            h.to = Math.floor(h.axis.p2c(h.to)),
                            j.from = Math.floor(j.axis.p2c(j.from)),
                            j.to = Math.floor(j.axis.p2c(j.to)),
                            k || l) {
                                var n = g.lineWidth || i.grid.markingsLineWidth
                                  , o = n % 2 ? .5 : 0;
                                m.beginPath(),
                                m.strokeStyle = g.color || i.grid.markingsColor,
                                m.lineWidth = n,
                                k ? (m.moveTo(h.to + o, j.from),
                                m.lineTo(h.to + o, j.to)) : (m.moveTo(h.from, j.to + o),
                                m.lineTo(h.to, j.to + o)),
                                m.stroke()
                            } else
                                m.fillStyle = g.color || i.grid.markingsColor,
                                m.fillRect(h.from, j.to, h.to - h.from, j.from - j.to)
                    }
                }
            c = B(),
            d = i.grid.borderWidth;
            for (var p = 0; p < c.length; ++p) {
                var x, y, z, A, t = c[p], v = t.box, w = t.tickLength;
                if (t.show && 0 != t.ticks.length) {
                    for (m.lineWidth = 1,
                    "x" == t.direction ? (x = 0,
                    y = "full" == w ? "top" == t.position ? 0 : s : v.top - q.top + ("top" == t.position ? v.height : 0)) : (y = 0,
                    x = "full" == w ? "left" == t.position ? 0 : r : v.left - q.left + ("left" == t.position ? v.width : 0)),
                    t.innermost || (m.strokeStyle = t.options.color,
                    m.beginPath(),
                    z = A = 0,
                    "x" == t.direction ? z = r + 1 : A = s + 1,
                    1 == m.lineWidth && ("x" == t.direction ? y = Math.floor(y) + .5 : x = Math.floor(x) + .5),
                    m.moveTo(x, y),
                    m.lineTo(x + z, y + A),
                    m.stroke()),
                    m.strokeStyle = t.options.tickColor,
                    m.beginPath(),
                    b = 0; b < t.ticks.length; ++b) {
                        var C = t.ticks[b].v;
                        z = A = 0,
                        isNaN(C) || C < t.min || C > t.max || "full" == w && ("object" == typeof d && d[t.position] > 0 || d > 0) && (C == t.min || C == t.max) || ("x" == t.direction ? (x = t.p2c(C),
                        A = "full" == w ? -s : w,
                        "top" == t.position && (A = -A)) : (y = t.p2c(C),
                        z = "full" == w ? -r : w,
                        "left" == t.position && (z = -z)),
                        1 == m.lineWidth && ("x" == t.direction ? x = Math.floor(x) + .5 : y = Math.floor(y) + .5),
                        m.moveTo(x, y),
                        m.lineTo(x + z, y + A))
                    }
                    m.stroke()
                }
            }
            d && (e = i.grid.borderColor,
            "object" == typeof d || "object" == typeof e ? ("object" != typeof d && (d = {
                top: d,
                right: d,
                bottom: d,
                left: d
            }),
            "object" != typeof e && (e = {
                top: e,
                right: e,
                bottom: e,
                left: e
            }),
            d.top > 0 && (m.strokeStyle = e.top,
            m.lineWidth = d.top,
            m.beginPath(),
            m.moveTo(0 - d.left, 0 - d.top / 2),
            m.lineTo(r, 0 - d.top / 2),
            m.stroke()),
            d.right > 0 && (m.strokeStyle = e.right,
            m.lineWidth = d.right,
            m.beginPath(),
            m.moveTo(r + d.right / 2, 0 - d.top),
            m.lineTo(r + d.right / 2, s),
            m.stroke()),
            d.bottom > 0 && (m.strokeStyle = e.bottom,
            m.lineWidth = d.bottom,
            m.beginPath(),
            m.moveTo(r + d.right, s + d.bottom / 2),
            m.lineTo(0, s + d.bottom / 2),
            m.stroke()),
            d.left > 0 && (m.strokeStyle = e.left,
            m.lineWidth = d.left,
            m.beginPath(),
            m.moveTo(0 - d.left / 2, s + d.bottom),
            m.lineTo(0 - d.left / 2, 0),
            m.stroke())) : (m.lineWidth = d,
            m.strokeStyle = i.grid.borderColor,
            m.strokeRect(-d / 2, -d / 2, r + d, s + d))),
            m.restore()
        }
        function Y() {
            a.each(B(), function(a, b) {
                var g, h, i, k, l, c = b.box, d = b.direction + "Axis " + b.direction + b.n + "Axis", e = "flot-" + b.direction + "-axis flot-" + b.direction + b.n + "-axis " + d, f = b.options.font || "flot-tick-label tickLabel";
                if (j.removeText(e),
                b.show && 0 != b.ticks.length)
                    for (var m = 0; m < b.ticks.length; ++m)
                        g = b.ticks[m],
                        !g.label || g.v < b.min || g.v > b.max || ("x" == b.direction ? (k = "center",
                        h = q.left + b.p2c(g.v),
                        "bottom" == b.position ? i = c.top + c.padding : (i = c.top + c.height - c.padding,
                        l = "bottom")) : (l = "middle",
                        i = q.top + b.p2c(g.v),
                        "left" == b.position ? (h = c.left + c.width - c.padding,
                        k = "right") : h = c.left + c.padding),
                        j.addText(e, h, i, g.label, f, null , null , k, l))
            })
        }
        function Z(a) {
            a.lines.show && $(a),
            a.bars.show && ba(a),
            a.points.show && _(a)
        }
        function $(a) {
            function b(a, b, c, d, e) {
                var f = a.points
                  , g = a.pointsize
                  , h = null
                  , i = null ;
                m.beginPath();
                for (var j = g; j < f.length; j += g) {
                    var k = f[j - g]
                      , l = f[j - g + 1]
                      , n = f[j]
                      , o = f[j + 1];
                    if (null != k && null != n) {
                        if (l <= o && l < e.min) {
                            if (o < e.min)
                                continue;k = (e.min - l) / (o - l) * (n - k) + k,
                            l = e.min
                        } else if (o <= l && o < e.min) {
                            if (l < e.min)
                                continue;n = (e.min - l) / (o - l) * (n - k) + k,
                            o = e.min
                        }
                        if (l >= o && l > e.max) {
                            if (o > e.max)
                                continue;k = (e.max - l) / (o - l) * (n - k) + k,
                            l = e.max
                        } else if (o >= l && o > e.max) {
                            if (l > e.max)
                                continue;n = (e.max - l) / (o - l) * (n - k) + k,
                            o = e.max
                        }
                        if (k <= n && k < d.min) {
                            if (n < d.min)
                                continue;l = (d.min - k) / (n - k) * (o - l) + l,
                            k = d.min
                        } else if (n <= k && n < d.min) {
                            if (k < d.min)
                                continue;o = (d.min - k) / (n - k) * (o - l) + l,
                            n = d.min
                        }
                        if (k >= n && k > d.max) {
                            if (n > d.max)
                                continue;l = (d.max - k) / (n - k) * (o - l) + l,
                            k = d.max
                        } else if (n >= k && n > d.max) {
                            if (k > d.max)
                                continue;o = (d.max - k) / (n - k) * (o - l) + l,
                            n = d.max
                        }
                        k == h && l == i || m.moveTo(d.p2c(k) + b, e.p2c(l) + c),
                        h = n,
                        i = o,
                        m.lineTo(d.p2c(n) + b, e.p2c(o) + c)
                    }
                }
                m.stroke()
            }
            function c(a, b, c) {
                for (var d = a.points, e = a.pointsize, f = Math.min(Math.max(0, c.min), c.max), g = 0, i = !1, j = 1, k = 0, l = 0; ; ) {
                    if (e > 0 && g > d.length + e)
                        break;
                    g += e;
                    var n = d[g - e]
                      , o = d[g - e + j]
                      , p = d[g]
                      , q = d[g + j];
                    if (i) {
                        if (e > 0 && null != n && null == p) {
                            l = g,
                            e = -e,
                            j = 2;
                            continue
                        }
                        if (e < 0 && g == k + e) {
                            m.fill(),
                            i = !1,
                            e = -e,
                            j = 1,
                            g = k = l + e;
                            continue
                        }
                    }
                    if (null != n && null != p) {
                        if (n <= p && n < b.min) {
                            if (p < b.min)
                                continue;o = (b.min - n) / (p - n) * (q - o) + o,
                            n = b.min
                        } else if (p <= n && p < b.min) {
                            if (n < b.min)
                                continue;q = (b.min - n) / (p - n) * (q - o) + o,
                            p = b.min
                        }
                        if (n >= p && n > b.max) {
                            if (p > b.max)
                                continue;o = (b.max - n) / (p - n) * (q - o) + o,
                            n = b.max
                        } else if (p >= n && p > b.max) {
                            if (n > b.max)
                                continue;q = (b.max - n) / (p - n) * (q - o) + o,
                            p = b.max
                        }
                        if (i || (m.beginPath(),
                        m.moveTo(b.p2c(n), c.p2c(f)),
                        i = !0),
                        o >= c.max && q >= c.max)
                            m.lineTo(b.p2c(n), c.p2c(c.max)),
                            m.lineTo(b.p2c(p), c.p2c(c.max));
                        else if (o <= c.min && q <= c.min)
                            m.lineTo(b.p2c(n), c.p2c(c.min)),
                            m.lineTo(b.p2c(p), c.p2c(c.min));
                        else {
                            var r = n
                              , s = p;
                            o <= q && o < c.min && q >= c.min ? (n = (c.min - o) / (q - o) * (p - n) + n,
                            o = c.min) : q <= o && q < c.min && o >= c.min && (p = (c.min - o) / (q - o) * (p - n) + n,
                            q = c.min),
                            o >= q && o > c.max && q <= c.max ? (n = (c.max - o) / (q - o) * (p - n) + n,
                            o = c.max) : q >= o && q > c.max && o <= c.max && (p = (c.max - o) / (q - o) * (p - n) + n,
                            q = c.max),
                            n != r && m.lineTo(b.p2c(r), c.p2c(o)),
                            m.lineTo(b.p2c(n), c.p2c(o)),
                            m.lineTo(b.p2c(p), c.p2c(q)),
                            p != s && (m.lineTo(b.p2c(p), c.p2c(q)),
                            m.lineTo(b.p2c(s), c.p2c(q)))
                        }
                    }
                }
            }
            m.save(),
            m.translate(q.left, q.top),
            m.lineJoin = "round";
            var d = a.lines.lineWidth
              , e = a.shadowSize;
            if (d > 0 && e > 0) {
                m.lineWidth = e,
                m.strokeStyle = "rgba(0,0,0,0.1)";
                var f = Math.PI / 18;
                b(a.datapoints, Math.sin(f) * (d / 2 + e / 2), Math.cos(f) * (d / 2 + e / 2), a.xaxis, a.yaxis),
                m.lineWidth = e / 2,
                b(a.datapoints, Math.sin(f) * (d / 2 + e / 4), Math.cos(f) * (d / 2 + e / 4), a.xaxis, a.yaxis)
            }
            m.lineWidth = d,
            m.strokeStyle = a.color;
            var g = ca(a.lines, a.color, 0, s);
            g && (m.fillStyle = g,
            c(a.datapoints, a.xaxis, a.yaxis)),
            d > 0 && b(a.datapoints, 0, 0, a.xaxis, a.yaxis),
            m.restore()
        }
        function _(a) {
            function b(a, b, c, d, e, f, g, h) {
                for (var i = a.points, j = a.pointsize, k = 0; k < i.length; k += j) {
                    var l = i[k]
                      , n = i[k + 1];
                    null == l || l < f.min || l > f.max || n < g.min || n > g.max || (m.beginPath(),
                    l = f.p2c(l),
                    n = g.p2c(n) + d,
                    "circle" == h ? m.arc(l, n, b, 0, e ? Math.PI : 2 * Math.PI, !1) : h(m, l, n, b, e),
                    m.closePath(),
                    c && (m.fillStyle = c,
                    m.fill()),
                    m.stroke())
                }
            }
            m.save(),
            m.translate(q.left, q.top);
            var c = a.points.lineWidth
              , d = a.shadowSize
              , e = a.points.radius
              , f = a.points.symbol;
            if (0 == c && (c = 1e-4),
            c > 0 && d > 0) {
                var g = d / 2;
                m.lineWidth = g,
                m.strokeStyle = "rgba(0,0,0,0.1)",
                b(a.datapoints, e, null , g + g / 2, !0, a.xaxis, a.yaxis, f),
                m.strokeStyle = "rgba(0,0,0,0.2)",
                b(a.datapoints, e, null , g / 2, !0, a.xaxis, a.yaxis, f)
            }
            m.lineWidth = c,
            m.strokeStyle = a.color,
            b(a.datapoints, e, ca(a.points, a.color), 0, !1, a.xaxis, a.yaxis, f),
            m.restore()
        }
        function aa(a, b, c, d, e, f, g, h, i, j, k) {
            var l, m, n, o, p, q, r, s, t;
            j ? (s = q = r = !0,
            p = !1,
            l = c,
            m = a,
            o = b + d,
            n = b + e,
            m < l && (t = m,
            m = l,
            l = t,
            p = !0,
            q = !1)) : (p = q = r = !0,
            s = !1,
            l = a + d,
            m = a + e,
            n = c,
            o = b,
            o < n && (t = o,
            o = n,
            n = t,
            s = !0,
            r = !1)),
            m < g.min || l > g.max || o < h.min || n > h.max || (l < g.min && (l = g.min,
            p = !1),
            m > g.max && (m = g.max,
            q = !1),
            n < h.min && (n = h.min,
            s = !1),
            o > h.max && (o = h.max,
            r = !1),
            l = g.p2c(l),
            n = h.p2c(n),
            m = g.p2c(m),
            o = h.p2c(o),
            f && (i.fillStyle = f(n, o),
            i.fillRect(l, o, m - l, n - o)),
            k > 0 && (p || q || r || s) && (i.beginPath(),
            i.moveTo(l, n),
            p ? i.lineTo(l, o) : i.moveTo(l, o),
            r ? i.lineTo(m, o) : i.moveTo(m, o),
            q ? i.lineTo(m, n) : i.moveTo(m, n),
            s ? i.lineTo(l, n) : i.moveTo(l, n),
            i.stroke()))
        }
        function ba(a) {
            function b(b, c, d, e, f, g) {
                for (var h = b.points, i = b.pointsize, j = 0; j < h.length; j += i)
                    null != h[j] && aa(h[j], h[j + 1], h[j + 2], c, d, e, f, g, m, a.bars.horizontal, a.bars.lineWidth)
            }
            m.save(),
            m.translate(q.left, q.top),
            m.lineWidth = a.bars.lineWidth,
            m.strokeStyle = a.color;
            var c;
            switch (a.bars.align) {
            case "left":
                c = 0;
                break;
            case "right":
                c = -a.bars.barWidth;
                break;
            default:
                c = -a.bars.barWidth / 2
            }
            var d = a.bars.fill ? function(b, c) {
                return ca(a.bars, a.color, b, c)
            }
            : null ;
            b(a.datapoints, c, c + a.bars.barWidth, d, a.xaxis, a.yaxis),
            m.restore()
        }
        function ca(b, c, d, e) {
            var f = b.fill;
            if (!f)
                return null ;
            if (b.fillColor)
                return sa(b.fillColor, d, e, c);
            var g = a.color.parse(c);
            return g.a = "number" == typeof f ? f : .4,
            g.normalize(),
            g.toString()
        }
        function da() {
            if (null != i.legend.container ? a(i.legend.container).html("") : b.find(".legend").remove(),
            i.legend.show) {
                for (var g, j, c = [], d = [], e = !1, f = i.legend.labelFormatter, k = 0; k < h.length; ++k)
                    g = h[k],
                    g.label && (j = f ? f(g.label, g) : g.label,
                    j && d.push({
                        label: j,
                        color: g.color
                    }));
                if (i.legend.sorted)
                    if (a.isFunction(i.legend.sorted))
                        d.sort(i.legend.sorted);
                    else if ("reverse" == i.legend.sorted)
                        d.reverse();
                    else {
                        var l = "descending" != i.legend.sorted;
                        d.sort(function(a, b) {
                            return a.label == b.label ? 0 : a.label < b.label != l ? 1 : -1
                        })
                    }
                for (var k = 0; k < d.length; ++k) {
                    var m = d[k];
                    k % i.legend.noColumns == 0 && (e && c.push("</tr>"),
                    c.push("<tr>"),
                    e = !0),
                    c.push('<td class="legendColorBox"><div style="border:1px solid ' + i.legend.labelBoxBorderColor + ';padding:1px"><div style="width:4px;height:0;border:5px solid ' + m.color + ';overflow:hidden"></div></div></td><td class="legendLabel">' + m.label + "</td>")
                }
                if (e && c.push("</tr>"),
                0 != c.length) {
                    var n = '<table style="font-size:smaller;color:' + i.grid.color + '">' + c.join("") + "</table>";
                    if (null != i.legend.container)
                        a(i.legend.container).html(n);
                    else {
                        var o = ""
                          , p = i.legend.position
                          , r = i.legend.margin;
                        null == r[0] && (r = [r, r]),
                        "n" == p.charAt(0) ? o += "top:" + (r[1] + q.top) + "px;" : "s" == p.charAt(0) && (o += "bottom:" + (r[1] + q.bottom) + "px;"),
                        "e" == p.charAt(1) ? o += "right:" + (r[0] + q.right) + "px;" : "w" == p.charAt(1) && (o += "left:" + (r[0] + q.left) + "px;");
                        var s = a('<div class="legend">' + n.replace('style="', 'style="position:absolute;' + o + ";") + "</div>").appendTo(b);
                        if (0 != i.legend.backgroundOpacity) {
                            var t = i.legend.backgroundColor;
                            null == t && (t = i.grid.backgroundColor,
                            t = t && "string" == typeof t ? a.color.parse(t) : a.color.extract(s, "background-color"),
                            t.a = 1,
                            t = t.toString());
                            var u = s.children();
                            a('<div style="position:absolute;width:' + u.width() + "px;height:" + u.height() + "px;" + o + "background-color:" + t + ';"> </div>').prependTo(s).css("opacity", i.legend.backgroundOpacity)
                        }
                    }
                }
            }
        }
        function ga(a, b, c) {
            var j, k, l, d = i.grid.mouseActiveRadius, e = d * d + 1, f = null ;
            for (j = h.length - 1; j >= 0; --j)
                if (c(h[j])) {
                    var m = h[j]
                      , n = m.xaxis
                      , o = m.yaxis
                      , p = m.datapoints.points
                      , q = n.c2p(a)
                      , r = o.c2p(b)
                      , s = d / n.scale
                      , t = d / o.scale;
                    if (l = m.datapoints.pointsize,
                    n.options.inverseTransform && (s = Number.MAX_VALUE),
                    o.options.inverseTransform && (t = Number.MAX_VALUE),
                    m.lines.show || m.points.show)
                        for (k = 0; k < p.length; k += l) {
                            var u = p[k]
                              , v = p[k + 1];
                            if (null != u && !(u - q > s || u - q < -s || v - r > t || v - r < -t)) {
                                var w = Math.abs(n.p2c(u) - a)
                                  , x = Math.abs(o.p2c(v) - b)
                                  , y = w * w + x * x;
                                y < e && (e = y,
                                f = [j, k / l])
                            }
                        }
                    if (m.bars.show && !f) {
                        var z, A;
                        switch (m.bars.align) {
                        case "left":
                            z = 0;
                            break;
                        case "right":
                            z = -m.bars.barWidth;
                            break;
                        default:
                            z = -m.bars.barWidth / 2
                        }
                        for (A = z + m.bars.barWidth,
                        k = 0; k < p.length; k += l) {
                            var u = p[k]
                              , v = p[k + 1]
                              , B = p[k + 2];
                            null != u && (h[j].bars.horizontal ? q <= Math.max(B, u) && q >= Math.min(B, u) && r >= v + z && r <= v + A : q >= u + z && q <= u + A && r >= Math.min(B, v) && r <= Math.max(B, v)) && (f = [j, k / l])
                        }
                    }
                }
            return f ? (j = f[0],
            k = f[1],
            l = h[j].datapoints.pointsize,
            {
                datapoint: h[j].datapoints.points.slice(k * l, (k + 1) * l),
                dataIndex: k,
                series: h[j],
                seriesIndex: j
            }) : null
        }
        function ha(a) {
            i.grid.hoverable && ka("plothover", a, function(a) {
                return 0 != a.hoverable
            })
        }
        function ia(a) {
            i.grid.hoverable && ka("plothover", a, function(a) {
                return !1
            })
        }
        function ja(a) {
            ka("plotclick", a, function(a) {
                return 0 != a.clickable
            })
        }
        function ka(a, c, d) {
            var e = l.offset()
              , f = c.pageX - e.left - q.left
              , g = c.pageY - e.top - q.top
              , h = C({
                left: f,
                top: g
            });
            h.pageX = c.pageX,
            h.pageY = c.pageY;
            var j = ga(f, g, d);
            if (j && (j.pageX = parseInt(j.series.xaxis.p2c(j.datapoint[0]) + e.left + q.left, 10),
            j.pageY = parseInt(j.series.yaxis.p2c(j.datapoint[1]) + e.top + q.top, 10)),
            i.grid.autoHighlight) {
                for (var k = 0; k < ea.length; ++k) {
                    var m = ea[k];
                    m.auto != a || j && m.series == j.series && m.point[0] == j.datapoint[0] && m.point[1] == j.datapoint[1] || oa(m.series, m.point)
                }
                j && na(j.series, j.datapoint, a)
            }
            b.trigger(a, [h, j])
        }
        function la() {
            var a = i.interaction.redrawOverlayInterval;
            return a == -1 ? void ma() : void (fa || (fa = setTimeout(ma, a)))
        }
        function ma() {
            fa = null ,
            n.save(),
            k.clear(),
            n.translate(q.left, q.top);
            var a, b;
            for (a = 0; a < ea.length; ++a)
                b = ea[a],
                b.series.bars.show ? ra(b.series, b.point) : qa(b.series, b.point);
            n.restore(),
            v(t.drawOverlay, [n])
        }
        function na(a, b, c) {
            if ("number" == typeof a && (a = h[a]),
            "number" == typeof b) {
                var d = a.datapoints.pointsize;
                b = a.datapoints.points.slice(d * b, d * (b + 1))
            }
            var e = pa(a, b);
            e == -1 ? (ea.push({
                series: a,
                point: b,
                auto: c
            }),
            la()) : c || (ea[e].auto = !1)
        }
        function oa(a, b) {
            if (null == a && null == b)
                return ea = [],
                void la();
            if ("number" == typeof a && (a = h[a]),
            "number" == typeof b) {
                var c = a.datapoints.pointsize;
                b = a.datapoints.points.slice(c * b, c * (b + 1))
            }
            var d = pa(a, b);
            d != -1 && (ea.splice(d, 1),
            la())
        }
        function pa(a, b) {
            for (var c = 0; c < ea.length; ++c) {
                var d = ea[c];
                if (d.series == a && d.point[0] == b[0] && d.point[1] == b[1])
                    return c
            }
            return -1
        }
        function qa(b, c) {
            var d = c[0]
              , e = c[1]
              , f = b.xaxis
              , g = b.yaxis
              , h = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString();
            if (!(d < f.min || d > f.max || e < g.min || e > g.max)) {
                var i = b.points.radius + b.points.lineWidth / 2;
                n.lineWidth = i,
                n.strokeStyle = h;
                var j = 1.5 * i;
                d = f.p2c(d),
                e = g.p2c(e),
                n.beginPath(),
                "circle" == b.points.symbol ? n.arc(d, e, j, 0, 2 * Math.PI, !1) : b.points.symbol(n, d, e, j, !1),
                n.closePath(),
                n.stroke()
            }
        }
        function ra(b, c) {
            var f, d = "string" == typeof b.highlightColor ? b.highlightColor : a.color.parse(b.color).scale("a", .5).toString(), e = d;
            switch (b.bars.align) {
            case "left":
                f = 0;
                break;
            case "right":
                f = -b.bars.barWidth;
                break;
            default:
                f = -b.bars.barWidth / 2
            }
            n.lineWidth = b.bars.lineWidth,
            n.strokeStyle = d,
            aa(c[0], c[1], c[2] || 0, f, f + b.bars.barWidth, function() {
                return e
            }, b.xaxis, b.yaxis, n, b.bars.horizontal, b.bars.lineWidth)
        }
        function sa(b, c, d, e) {
            if ("string" == typeof b)
                return b;
            for (var f = m.createLinearGradient(0, d, 0, c), g = 0, h = b.colors.length; g < h; ++g) {
                var i = b.colors[g];
                if ("string" != typeof i) {
                    var j = a.color.parse(e);
                    null != i.brightness && (j = j.scale("rgb", i.brightness)),
                    null != i.opacity && (j.a *= i.opacity),
                    i = j.toString()
                }
                f.addColorStop(g / (h - 1), i)
            }
            return f
        }
        var h = []
          , i = {
            colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
            legend: {
                show: !0,
                noColumns: 1,
                labelFormatter: null ,
                labelBoxBorderColor: "#ccc",
                container: null ,
                position: "ne",
                margin: 5,
                backgroundColor: null ,
                backgroundOpacity: .85,
                sorted: null
            },
            xaxis: {
                show: null ,
                position: "bottom",
                mode: null ,
                font: null ,
                color: null ,
                tickColor: null ,
                transform: null ,
                inverseTransform: null ,
                min: null ,
                max: null ,
                autoscaleMargin: null ,
                ticks: null ,
                tickFormatter: null ,
                labelWidth: null ,
                labelHeight: null ,
                reserveSpace: null ,
                tickLength: null ,
                alignTicksWithAxis: null ,
                tickDecimals: null ,
                tickSize: null ,
                minTickSize: null
            },
            yaxis: {
                autoscaleMargin: .02,
                position: "left"
            },
            xaxes: [],
            yaxes: [],
            series: {
                points: {
                    show: !1,
                    radius: 3,
                    lineWidth: 2,
                    fill: !0,
                    fillColor: "#ffffff",
                    symbol: "circle"
                },
                lines: {
                    lineWidth: 2,
                    fill: !1,
                    fillColor: null ,
                    steps: !1
                },
                bars: {
                    show: !1,
                    lineWidth: 2,
                    barWidth: 1,
                    fill: !0,
                    fillColor: null ,
                    align: "left",
                    horizontal: !1,
                    zero: !0
                },
                shadowSize: 3,
                highlightColor: null
            },
            grid: {
                show: !0,
                aboveData: !1,
                color: "#545454",
                backgroundColor: null ,
                borderColor: null ,
                tickColor: null ,
                margin: 0,
                labelMargin: 5,
                axisMargin: 8,
                borderWidth: 2,
                minBorderMargin: null ,
                markings: null ,
                markingsColor: "#f4f4f4",
                markingsLineWidth: 2,
                clickable: !1,
                hoverable: !1,
                autoHighlight: !0,
                mouseActiveRadius: 10
            },
            interaction: {
                redrawOverlayInterval: 1e3 / 60
            },
            hooks: {}
        }
          , j = null
          , k = null
          , l = null
          , m = null
          , n = null
          , o = []
          , p = []
          , q = {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
          , r = 0
          , s = 0
          , t = {
            processOptions: [],
            processRawData: [],
            processDatapoints: [],
            processOffset: [],
            drawBackground: [],
            drawSeries: [],
            draw: [],
            bindEvents: [],
            drawOverlay: [],
            shutdown: []
        }
          , u = this;
        u.setData = y,
        u.setupGrid = P,
        u.draw = U,
        u.getPlaceholder = function() {
            return b
        }
        ,
        u.getCanvas = function() {
            return j.element
        }
        ,
        u.getPlotOffset = function() {
            return q
        }
        ,
        u.width = function() {
            return r
        }
        ,
        u.height = function() {
            return s
        }
        ,
        u.offset = function() {
            var a = l.offset();
            return a.left += q.left,
            a.top += q.top,
            a
        }
        ,
        u.getData = function() {
            return h
        }
        ,
        u.getAxes = function() {
            var b = {};
            return a.each(o.concat(p), function(a, c) {
                c && (b[c.direction + (1 != c.n ? c.n : "") + "axis"] = c)
            }),
            b
        }
        ,
        u.getXAxes = function() {
            return o
        }
        ,
        u.getYAxes = function() {
            return p
        }
        ,
        u.c2p = C,
        u.p2c = D,
        u.getOptions = function() {
            return i
        }
        ,
        u.highlight = na,
        u.unhighlight = oa,
        u.triggerRedrawOverlay = la,
        u.pointOffset = function(a) {
            return {
                left: parseInt(o[A(a, "x") - 1].p2c(+a.x) + q.left, 10),
                top: parseInt(p[A(a, "y") - 1].p2c(+a.y) + q.top, 10)
            }
        }
        ,
        u.shutdown = J,
        u.destroy = function() {
            J(),
            b.removeData("plot").empty(),
            h = [],
            i = null ,
            j = null ,
            k = null ,
            l = null ,
            m = null ,
            n = null ,
            o = [],
            p = [],
            t = null ,
            ea = [],
            u = null
        }
        ,
        u.resize = function() {
            var a = b.width()
              , c = b.height();
            j.resize(a, c),
            k.resize(a, c)
        }
        ,
        u.hooks = t,
        w(u),
        x(f),
        H(),
        y(d),
        P(),
        U(),
        I();
        var ea = []
          , fa = null
    }
    function e(a, b) {
        return b * Math.floor(a / b)
    }
    var b = Object.prototype.hasOwnProperty;
    a.fn.detach || (a.fn.detach = function() {
        return this.each(function() {
            this.parentNode && this.parentNode.removeChild(this)
        })
    }
    ),
    c.prototype.resize = function(a, b) {
        if (a <= 0 || b <= 0)
            throw new Error("Invalid dimensions for plot, width = " + a + ", height = " + b);
        var c = this.element
          , d = this.context
          , e = this.pixelRatio;
        this.width != a && (c.width = a * e,
        c.style.width = a + "px",
        this.width = a),
        this.height != b && (c.height = b * e,
        c.style.height = b + "px",
        this.height = b),
        d.restore(),
        d.save(),
        d.scale(e, e)
    }
    ,
    c.prototype.clear = function() {
        this.context.clearRect(0, 0, this.width, this.height)
    }
    ,
    c.prototype.render = function() {
        var a = this._textCache;
        for (var c in a)
            if (b.call(a, c)) {
                var d = this.getTextLayer(c)
                  , e = a[c];
                d.hide();
                for (var f in e)
                    if (b.call(e, f)) {
                        var g = e[f];
                        for (var h in g)
                            if (b.call(g, h)) {
                                for (var k, i = g[h].positions, j = 0; k = i[j]; j++)
                                    k.active ? k.rendered || (d.append(k.element),
                                    k.rendered = !0) : (i.splice(j--, 1),
                                    k.rendered && k.element.detach());
                                0 == i.length && delete g[h]
                            }
                    }
                d.show()
            }
    }
    ,
    c.prototype.getTextLayer = function(b) {
        var c = this.text[b];
        return null == c && (null == this.textContainer && (this.textContainer = a("<div class='flot-text'></div>").css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            "font-size": "smaller",
            color: "#545454"
        }).insertAfter(this.element)),
        c = this.text[b] = a("<div></div>").addClass(b).css({
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        }).appendTo(this.textContainer)),
        c
    }
    ,
    c.prototype.getTextInfo = function(b, c, d, e, f) {
        var g, h, i, j;
        if (c = "" + c,
        g = "object" == typeof d ? d.style + " " + d.variant + " " + d.weight + " " + d.size + "px/" + d.lineHeight + "px " + d.family : d,
        h = this._textCache[b],
        null == h && (h = this._textCache[b] = {}),
        i = h[g],
        null == i && (i = h[g] = {}),
        j = i[c],
        null == j) {
            var k = a("<div></div>").html(c).css({
                position: "absolute",
                "max-width": f,
                top: -9999
            }).appendTo(this.getTextLayer(b));
            "object" == typeof d ? k.css({
                font: g,
                color: d.color
            }) : "string" == typeof d && k.addClass(d),
            j = i[c] = {
                width: k.outerWidth(!0),
                height: k.outerHeight(!0),
                element: k,
                positions: []
            },
            k.detach()
        }
        return j
    }
    ,
    c.prototype.addText = function(a, b, c, d, e, f, g, h, i) {
        var j = this.getTextInfo(a, d, e, f, g)
          , k = j.positions;
        "center" == h ? b -= j.width / 2 : "right" == h && (b -= j.width),
        "middle" == i ? c -= j.height / 2 : "bottom" == i && (c -= j.height);
        for (var m, l = 0; m = k[l]; l++)
            if (m.x == b && m.y == c)
                return void (m.active = !0);
        m = {
            active: !0,
            rendered: !1,
            element: k.length ? j.element.clone() : j.element,
            x: b,
            y: c
        },
        k.push(m),
        m.element.css({
            top: Math.round(c),
            left: Math.round(b),
            "text-align": h
        })
    }
    ,
    c.prototype.removeText = function(a, c, d, e, f, g) {
        if (null == e) {
            var h = this._textCache[a];
            if (null != h)
                for (var i in h)
                    if (b.call(h, i)) {
                        var j = h[i];
                        for (var k in j)
                            if (b.call(j, k))
                                for (var n, l = j[k].positions, m = 0; n = l[m]; m++)
                                    n.active = !1
                    }
        } else
            for (var n, l = this.getTextInfo(a, e, f, g).positions, m = 0; n = l[m]; m++)
                n.x == c && n.y == d && (n.active = !1)
    }
    ,
    a.plot = function(b, c, e) {
        var f = new d(a(b),c,e,a.plot.plugins);
        return f
    }
    ,
    a.plot.version = "0.8.3",
    a.plot.plugins = [],
    a.fn.plot = function(b, c) {
        return this.each(function() {
            a.plot(this, b, c)
        })
    }
}(jQuery);
/* Flot.Categories */
!function(a) {
    function c(a, b, c, d) {
        var e = "categories" == b.xaxis.options.mode
          , f = "categories" == b.yaxis.options.mode;
        if (e || f) {
            var g = d.format;
            if (!g) {
                var h = b;
                if (g = [],
                g.push({
                    x: !0,
                    number: !0,
                    required: !0
                }),
                g.push({
                    y: !0,
                    number: !0,
                    required: !0
                }),
                h.bars.show || h.lines.show && h.lines.fill) {
                    var i = !!(h.bars.show && h.bars.zero || h.lines.show && h.lines.zero);
                    g.push({
                        y: !0,
                        number: !0,
                        required: !1,
                        defaultValue: 0,
                        autoscale: i
                    }),
                    h.bars.horizontal && (delete g[g.length - 1].y,
                    g[g.length - 1].x = !0)
                }
                d.format = g
            }
            for (var j = 0; j < g.length; ++j)
                g[j].x && e && (g[j].number = !1),
                g[j].y && f && (g[j].number = !1)
        }
    }
    function d(a) {
        var b = -1;
        for (var c in a)
            a[c] > b && (b = a[c]);
        return b + 1
    }
    function e(a) {
        var b = [];
        for (var c in a.categories) {
            var d = a.categories[c];
            d >= a.min && d <= a.max && b.push([d, c])
        }
        return b.sort(function(a, b) {
            return a[0] - b[0]
        }),
        b
    }
    function f(b, c, d) {
        if ("categories" == b[c].options.mode) {
            if (!b[c].categories) {
                var f = {}
                  , h = b[c].options.categories || {};
                if (a.isArray(h))
                    for (var i = 0; i < h.length; ++i)
                        f[h[i]] = i;
                else
                    for (var j in h)
                        f[j] = h[j];
                b[c].categories = f
            }
            b[c].options.ticks || (b[c].options.ticks = e),
            g(d, c, b[c].categories)
        }
    }
    function g(a, b, c) {
        for (var e = a.points, f = a.pointsize, g = a.format, h = b.charAt(0), i = d(c), j = 0; j < e.length; j += f)
            if (null != e[j])
                for (var k = 0; k < f; ++k) {
                    var l = e[j + k];
                    null != l && g[k][h] && (l in c || (c[l] = i,
                    ++i),
                    e[j + k] = c[l])
                }
    }
    function h(a, b, c) {
        f(b, "xaxis", c),
        f(b, "yaxis", c)
    }
    function i(a) {
        a.hooks.processRawData.push(c),
        a.hooks.processDatapoints.push(h)
    }
    var b = {
        xaxis: {
            categories: null
        },
        yaxis: {
            categories: null
        }
    };
    a.plot.plugins.push({
        init: i,
        options: b,
        name: "categories",
        version: "1.0"
    })
}(jQuery);
/*
jquery.event.drag.js ~ v1.5 ~ Copyright (c) 2008, Three Dub Media (http://threedubmedia.com)
Licensed under the MIT License ~ http://threedubmedia.googlecode.com/files/MIT-LICENSE.txt
*/
(function(a) {
    function e(h) {
        var k, j = this, l = h.data || {};
        if (l.elem)
            j = h.dragTarget = l.elem,
            h.dragProxy = d.proxy || j,
            h.cursorOffsetX = l.pageX - l.left,
            h.cursorOffsetY = l.pageY - l.top,
            h.offsetX = h.pageX - h.cursorOffsetX,
            h.offsetY = h.pageY - h.cursorOffsetY;
        else if (d.dragging || l.which > 0 && h.which != l.which || a(h.target).is(l.not))
            return;
        switch (h.type) {
        case "mousedown":
            return a.extend(l, a(j).offset(), {
                elem: j,
                target: h.target,
                pageX: h.pageX,
                pageY: h.pageY
            }),
            b.add(document, "mousemove mouseup", e, l),
            i(j, !1),
            d.dragging = null ,
            !1;
        case !d.dragging && "mousemove":
            if (g(h.pageX - l.pageX) + g(h.pageY - l.pageY) < l.distance)
                break;
            h.target = l.target,
            k = f(h, "dragstart", j),
            k !== !1 && (d.dragging = j,
            d.proxy = h.dragProxy = a(k || j)[0]);
        case "mousemove":
            if (d.dragging) {
                if (k = f(h, "drag", j),
                c.drop && (c.drop.allowed = k !== !1,
                c.drop.handler(h)),
                k !== !1)
                    break;
                h.type = "mouseup"
            }
        case "mouseup":
            b.remove(document, "mousemove mouseup", e),
            d.dragging && (c.drop && c.drop.handler(h),
            f(h, "dragend", j)),
            i(j, !0),
            d.dragging = d.proxy = l.elem = !1
        }
        return !0
    }
    function f(b, c, d) {
        b.type = c;
        var e = a.event.dispatch.call(d, b);
        return e === !1 ? !1 : e || b.result
    }
    function g(a) {
        return Math.pow(a, 2)
    }
    function h() {
        return d.dragging === !1
    }
    function i(a, b) {
        a && (a.unselectable = b ? "off" : "on",
        a.onselectstart = function() {
            return b
        }
        ,
        a.style && (a.style.MozUserSelect = b ? "" : "none"))
    }
    a.fn.drag = function(a, b, c) {
        return b && this.bind("dragstart", a),
        c && this.bind("dragend", c),
        a ? this.bind("drag", b ? b : a) : this.trigger("drag")
    }
    ;
    var b = a.event
      , c = b.special
      , d = c.drag = {
        not: ":input",
        distance: 0,
        which: 1,
        dragging: !1,
        setup: function(c) {
            c = a.extend({
                distance: d.distance,
                which: d.which,
                not: d.not
            }, c || {}),
            c.distance = g(c.distance),
            b.add(this, "mousedown", e, c),
            this.attachEvent && this.attachEvent("ondragstart", h)
        },
        teardown: function() {
            b.remove(this, "mousedown", e),
            this === d.dragging && (d.dragging = d.proxy = !1),
            i(this, !0),
            this.detachEvent && this.detachEvent("ondragstart", h)
        }
    };
    c.dragstart = c.dragend = {
        setup: function() {},
        teardown: function() {}
    }
})(jQuery);
/* jquery.mousewheel.min.js
 * Copyright (c) 2011 Brandon Aaron (http://brandonaaron.net)
 * Licensed under the MIT License (LICENSE.txt).
 * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
 * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
 * Thanks to: Seamus Leahy for adding deltaX and deltaY
 *
 * Version: 3.0.6
 *
 * Requires: 1.2.2+
 */
(function(d) {
    function e(a) {
        var b = a || window.event
          , c = [].slice.call(arguments, 1)
          , f = 0
          , e = 0
          , g = 0
          , a = d.event.fix(b);
        a.type = "mousewheel";
        b.wheelDelta && (f = b.wheelDelta / 120);
        b.detail && (f = -b.detail / 3);
        g = f;
        void 0 !== b.axis && b.axis === b.HORIZONTAL_AXIS && (g = 0,
        e = -1 * f);
        void 0 !== b.wheelDeltaY && (g = b.wheelDeltaY / 120);
        void 0 !== b.wheelDeltaX && (e = -1 * b.wheelDeltaX / 120);
        c.unshift(a, f, e, g);
        return (d.event.dispatch || d.event.handle).apply(this, c)
    }
    var c = ["DOMMouseScroll", "mousewheel"];
    if (d.event.fixHooks)
        for (var h = c.length; h; )
            d.event.fixHooks[c[--h]] = d.event.mouseHooks;
    d.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var a = c.length; a; )
                    this.addEventListener(c[--a], e, !1);
            else
                this.onmousewheel = e
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var a = c.length; a; )
                    this.removeEventListener(c[--a], e, !1);
            else
                this.onmousewheel = null
        }
    };
    d.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
})(jQuery);
/* Flot.Navigate */
!function(a) {
    function c(b) {
        function c(a, c) {
            var d = b.offset();
            d.left = a.pageX - d.left,
            d.top = a.pageY - d.top,
            c ? b.zoomOut({
                center: d
            }) : b.zoom({
                center: d
            })
        }
        function d(a, b) {
            return a.preventDefault(),
            c(a, b < 0),
            !1
        }
        function i(a) {
            if (1 != a.which)
                return !1;
            var c = b.getPlaceholder().css("cursor");
            c && (e = c),
            b.getPlaceholder().css("cursor", b.getOptions().pan.cursor),
            f = a.pageX,
            g = a.pageY
        }
        function j(a) {
            var c = b.getOptions().pan.frameRate;
            !h && c && (h = setTimeout(function() {
                b.pan({
                    left: f - a.pageX,
                    top: g - a.pageY
                }),
                f = a.pageX,
                g = a.pageY,
                h = null
            }, 1 / c * 1e3))
        }
        function k(a) {
            h && (clearTimeout(h),
            h = null ),
            b.getPlaceholder().css("cursor", e),
            b.pan({
                left: f - a.pageX,
                top: g - a.pageY
            })
        }
        function l(a, b) {
            var e = a.getOptions();
            e.zoom.interactive && (b[e.zoom.trigger](c),
            b.mousewheel(d)),
            e.pan.interactive && (b.bind("dragstart", {
                distance: 10
            }, i),
            b.bind("drag", j),
            b.bind("dragend", k))
        }
        function m(a, b) {
            b.unbind(a.getOptions().zoom.trigger, c),
            b.unbind("mousewheel", d),
            b.unbind("dragstart", i),
            b.unbind("drag", j),
            b.unbind("dragend", k),
            h && clearTimeout(h)
        }
        var e = "default"
          , f = 0
          , g = 0
          , h = null ;
        b.zoomOut = function(a) {
            a || (a = {}),
            a.amount || (a.amount = b.getOptions().zoom.amount),
            a.amount = 1 / a.amount,
            b.zoom(a)
        }
        ,
        b.zoom = function(c) {
            c || (c = {});
            var d = c.center
              , e = c.amount || b.getOptions().zoom.amount
              , f = b.width()
              , g = b.height();
            d || (d = {
                left: f / 2,
                top: g / 2
            });
            var h = d.left / f
              , i = d.top / g
              , j = {
                x: {
                    min: d.left - h * f / e,
                    max: d.left + (1 - h) * f / e
                },
                y: {
                    min: d.top - i * g / e,
                    max: d.top + (1 - i) * g / e
                }
            };
            a.each(b.getAxes(), function(a, b) {
                var c = b.options
                  , d = j[b.direction].min
                  , f = j[b.direction].max
                  , g = c.zoomRange
                  , h = c.panRange;
                if (g !== !1) {
                    if (d = b.c2p(d),
                    f = b.c2p(f),
                    d > f) {
                        var i = d;
                        d = f,
                        f = i
                    }
                    h && (null != h[0] && d < h[0] && (d = h[0]),
                    null != h[1] && f > h[1] && (f = h[1]));
                    var k = f - d;
                    g && (null != g[0] && k < g[0] && e > 1 || null != g[1] && k > g[1] && e < 1) || (c.min = d,
                    c.max = f)
                }
            }),
            b.setupGrid(),
            b.draw(),
            c.preventEvent || b.getPlaceholder().trigger("plotzoom", [b, c])
        }
        ,
        b.pan = function(c) {
            var d = {
                x: +c.left,
                y: +c.top
            };
            isNaN(d.x) && (d.x = 0),
            isNaN(d.y) && (d.y = 0),
            a.each(b.getAxes(), function(a, b) {
                var e, f, c = b.options, g = d[b.direction];
                e = b.c2p(b.p2c(b.min) + g),
                f = b.c2p(b.p2c(b.max) + g);
                var h = c.panRange;
                h !== !1 && (h && (null != h[0] && h[0] > e && (g = h[0] - e,
                e += g,
                f += g),
                null != h[1] && h[1] < f && (g = h[1] - f,
                e += g,
                f += g)),
                c.min = e,
                c.max = f)
            }),
            b.setupGrid(),
            b.draw(),
            c.preventEvent || b.getPlaceholder().trigger("plotpan", [b, c])
        }
        ,
        b.hooks.bindEvents.push(l),
        b.hooks.shutdown.push(m)
    }
    var b = {
        xaxis: {
            zoomRange: null ,
            panRange: null
        },
        zoom: {
            interactive: !1,
            trigger: "dblclick",
            amount: 1.5
        },
        pan: {
            interactive: !1,
            cursor: "move",
            frameRate: 20
        }
    };
    a.plot.plugins.push({
        init: c,
        options: b,
        name: "navigate",
        version: "1.3"
    })
}(jQuery);
/* Flot.Pie */
!function(a) {
    function d(d) {
        function n(b, c, d) {
            k || (k = !0,
            e = b.getCanvas(),
            f = a(e).parent(),
            g = b.getOptions(),
            b.setData(o(b.getData())))
        }
        function o(b) {
            for (var c = 0, d = 0, e = 0, f = g.series.pie.combine.color, h = [], i = 0; i < b.length; ++i) {
                var j = b[i].data;
                a.isArray(j) && 1 == j.length && (j = j[0]),
                a.isArray(j) ? !isNaN(parseFloat(j[1])) && isFinite(j[1]) ? j[1] = +j[1] : j[1] = 0 : j = !isNaN(parseFloat(j)) && isFinite(j) ? [1, +j] : [1, 0],
                b[i].data = [j]
            }
            for (var i = 0; i < b.length; ++i)
                c += b[i].data[0][1];
            for (var i = 0; i < b.length; ++i) {
                var j = b[i].data[0][1];
                j / c <= g.series.pie.combine.threshold && (d += j,
                e++,
                f || (f = b[i].color))
            }
            for (var i = 0; i < b.length; ++i) {
                var j = b[i].data[0][1];
                (e < 2 || j / c > g.series.pie.combine.threshold) && h.push(a.extend(b[i], {
                    data: [[1, j]],
                    color: b[i].color,
                    label: b[i].label,
                    angle: j * Math.PI * 2 / c,
                    percent: j / (c / 100)
                }))
            }
            return e > 1 && h.push({
                data: [[1, d]],
                color: f,
                label: g.series.pie.combine.label,
                angle: d * Math.PI * 2 / c,
                percent: d / (c / 100)
            }),
            h
        }
        function p(d, e) {
            function s() {
                l.clearRect(0, 0, m, n),
                f.children().filter(".pieLabel, .pieLabelBackground").remove()
            }
            function t() {
                var a = g.series.pie.shadow.left
                  , b = g.series.pie.shadow.top
                  , c = 10
                  , d = g.series.pie.shadow.alpha
                  , e = g.series.pie.radius > 1 ? g.series.pie.radius : h * g.series.pie.radius;
                if (!(e >= m / 2 - a || e * g.series.pie.tilt >= n / 2 - b || e <= c)) {
                    l.save(),
                    l.translate(a, b),
                    l.globalAlpha = d,
                    l.fillStyle = "#000",
                    l.translate(i, j),
                    l.scale(1, g.series.pie.tilt);
                    for (var f = 1; f <= c; f++)
                        l.beginPath(),
                        l.arc(0, 0, e, 0, 2 * Math.PI, !1),
                        l.fill(),
                        e -= f;
                    l.restore()
                }
            }
            function u() {
                function k(a, b, e) {
                    a <= 0 || isNaN(a) || (e ? l.fillStyle = b : (l.strokeStyle = b,
                    l.lineJoin = "round"),
                    l.beginPath(),
                    Math.abs(a - 2 * Math.PI) > 1e-9 && l.moveTo(0, 0),
                    l.arc(0, 0, c, d, d + a / 2, !1),
                    l.arc(0, 0, c, d + a / 2, d + a, !1),
                    l.closePath(),
                    d += a,
                    e ? l.fill() : l.stroke())
                }
                function o() {
                    function k(b, c, e) {
                        if (0 == b.data[0][1])
                            return !0;
                        var k, h = g.legend.labelFormatter, l = g.series.pie.label.formatter;
                        k = h ? h(b.label, b) : b.label,
                        l && (k = l(k, b));
                        var o = (c + b.angle + c) / 2
                          , p = i + Math.round(Math.cos(o) * d)
                          , q = j + Math.round(Math.sin(o) * d) * g.series.pie.tilt
                          , r = "<span class='pieLabel' id='pieLabel" + e + "' style='position:absolute;top:" + q + "px;left:" + p + "px;'>" + k + "</span>";
                        f.append(r);
                        var s = f.children("#pieLabel" + e)
                          , t = q - s.height() / 2
                          , u = p - s.width() / 2;
                        if (s.css("top", t),
                        s.css("left", u),
                        0 - t > 0 || 0 - u > 0 || n - (t + s.height()) < 0 || m - (u + s.width()) < 0)
                            return !1;
                        if (0 != g.series.pie.label.background.opacity) {
                            var v = g.series.pie.label.background.color;
                            null == v && (v = b.color);
                            var w = "top:" + t + "px;left:" + u + "px;";
                            a("<div class='pieLabelBackground' style='position:absolute;width:" + s.width() + "px;height:" + s.height() + "px;" + w + "background-color:" + v + ";'></div>").css("opacity", g.series.pie.label.background.opacity).insertBefore(s)
                        }
                        return !0
                    }
                    for (var c = b, d = g.series.pie.label.radius > 1 ? g.series.pie.label.radius : h * g.series.pie.label.radius, e = 0; e < p.length; ++e) {
                        if (p[e].percent >= 100 * g.series.pie.label.threshold && !k(p[e], c, e))
                            return !1;
                        c += p[e].angle
                    }
                    return !0
                }
                var b = Math.PI * g.series.pie.startAngle
                  , c = g.series.pie.radius > 1 ? g.series.pie.radius : h * g.series.pie.radius;
                l.save(),
                l.translate(i, j),
                l.scale(1, g.series.pie.tilt),
                l.save();
                for (var d = b, e = 0; e < p.length; ++e)
                    p[e].startAngle = d,
                    k(p[e].angle, p[e].color, !0);
                if (l.restore(),
                g.series.pie.stroke.width > 0) {
                    l.save(),
                    l.lineWidth = g.series.pie.stroke.width,
                    d = b;
                    for (var e = 0; e < p.length; ++e)
                        k(p[e].angle, g.series.pie.stroke.color, !1);
                    l.restore()
                }
                return q(l),
                l.restore(),
                !g.series.pie.label.show || o()
            }
            if (f) {
                var m = d.getPlaceholder().width()
                  , n = d.getPlaceholder().height()
                  , o = f.children().filter(".legend").children().width() || 0;
                l = e,
                k = !1,
                h = Math.min(m, n / g.series.pie.tilt) / 2,
                j = n / 2 + g.series.pie.offset.top,
                i = m / 2,
                "auto" == g.series.pie.offset.left ? (g.legend.position.match("w") ? i += o / 2 : i -= o / 2,
                i < h ? i = h : i > m - h && (i = m - h)) : i += g.series.pie.offset.left;
                var p = d.getData()
                  , r = 0;
                do
                    r > 0 && (h *= c),
                    r += 1,
                    s(),
                    g.series.pie.tilt <= .8 && t();
                while (!u() && r < b);r >= b && (s(),
                f.prepend("<div class='error'>Could not draw pie with labels contained inside canvas</div>")),
                d.setSeries && d.insertLegend && (d.setSeries(p),
                d.insertLegend())
            }
        }
        function q(a) {
            if (g.series.pie.innerRadius > 0) {
                a.save();
                var b = g.series.pie.innerRadius > 1 ? g.series.pie.innerRadius : h * g.series.pie.innerRadius;
                a.globalCompositeOperation = "destination-out",
                a.beginPath(),
                a.fillStyle = g.series.pie.stroke.color,
                a.arc(0, 0, b, 0, 2 * Math.PI, !1),
                a.fill(),
                a.closePath(),
                a.restore(),
                a.save(),
                a.beginPath(),
                a.strokeStyle = g.series.pie.stroke.color,
                a.arc(0, 0, b, 0, 2 * Math.PI, !1),
                a.stroke(),
                a.closePath(),
                a.restore()
            }
        }
        function r(a, b) {
            for (var c = !1, d = -1, e = a.length, f = e - 1; ++d < e; f = d)
                (a[d][1] <= b[1] && b[1] < a[f][1] || a[f][1] <= b[1] && b[1] < a[d][1]) && b[0] < (a[f][0] - a[d][0]) * (b[1] - a[d][1]) / (a[f][1] - a[d][1]) + a[d][0] && (c = !c);
            return c
        }
        function s(a, b) {
            for (var g, k, c = d.getData(), e = d.getOptions(), f = e.series.pie.radius > 1 ? e.series.pie.radius : h * e.series.pie.radius, m = 0; m < c.length; ++m) {
                var n = c[m];
                if (n.pie.show) {
                    if (l.save(),
                    l.beginPath(),
                    l.moveTo(0, 0),
                    l.arc(0, 0, f, n.startAngle, n.startAngle + n.angle / 2, !1),
                    l.arc(0, 0, f, n.startAngle + n.angle / 2, n.startAngle + n.angle, !1),
                    l.closePath(),
                    g = a - i,
                    k = b - j,
                    l.isPointInPath) {
                        if (l.isPointInPath(a - i, b - j))
                            return l.restore(),
                            {
                                datapoint: [n.percent, n.data],
                                dataIndex: 0,
                                series: n,
                                seriesIndex: m
                            }
                    } else {
                        var o = f * Math.cos(n.startAngle)
                          , p = f * Math.sin(n.startAngle)
                          , q = f * Math.cos(n.startAngle + n.angle / 4)
                          , s = f * Math.sin(n.startAngle + n.angle / 4)
                          , t = f * Math.cos(n.startAngle + n.angle / 2)
                          , u = f * Math.sin(n.startAngle + n.angle / 2)
                          , v = f * Math.cos(n.startAngle + n.angle / 1.5)
                          , w = f * Math.sin(n.startAngle + n.angle / 1.5)
                          , x = f * Math.cos(n.startAngle + n.angle)
                          , y = f * Math.sin(n.startAngle + n.angle)
                          , z = [[0, 0], [o, p], [q, s], [t, u], [v, w], [x, y]]
                          , A = [g, k];
                        if (r(z, A))
                            return l.restore(),
                            {
                                datapoint: [n.percent, n.data],
                                dataIndex: 0,
                                series: n,
                                seriesIndex: m
                            }
                    }
                    l.restore()
                }
            }
            return null
        }
        function t(a) {
            v("plothover", a)
        }
        function u(a) {
            v("plotclick", a)
        }
        function v(a, b) {
            var c = d.offset()
              , e = parseInt(b.pageX - c.left)
              , h = parseInt(b.pageY - c.top)
              , i = s(e, h);
            if (g.grid.autoHighlight)
                for (var j = 0; j < m.length; ++j) {
                    var k = m[j];
                    k.auto != a || i && k.series == i.series || x(k.series)
                }
            i && w(i.series, a);
            var l = {
                pageX: b.pageX,
                pageY: b.pageY
            };
            f.trigger(a, [l, i])
        }
        function w(a, b) {
            var c = y(a);
            c == -1 ? (m.push({
                series: a,
                auto: b
            }),
            d.triggerRedrawOverlay()) : b || (m[c].auto = !1)
        }
        function x(a) {
            null == a && (m = [],
            d.triggerRedrawOverlay());
            var b = y(a);
            b != -1 && (m.splice(b, 1),
            d.triggerRedrawOverlay())
        }
        function y(a) {
            for (var b = 0; b < m.length; ++b) {
                var c = m[b];
                if (c.series == a)
                    return b
            }
            return -1
        }
        function z(a, b) {
            function f(a) {
                a.angle <= 0 || isNaN(a.angle) || (b.fillStyle = "rgba(255, 255, 255, " + c.series.pie.highlight.opacity + ")",
                b.beginPath(),
                Math.abs(a.angle - 2 * Math.PI) > 1e-9 && b.moveTo(0, 0),
                b.arc(0, 0, d, a.startAngle, a.startAngle + a.angle / 2, !1),
                b.arc(0, 0, d, a.startAngle + a.angle / 2, a.startAngle + a.angle, !1),
                b.closePath(),
                b.fill())
            }
            var c = a.getOptions()
              , d = c.series.pie.radius > 1 ? c.series.pie.radius : h * c.series.pie.radius;
            b.save(),
            b.translate(i, j),
            b.scale(1, c.series.pie.tilt);
            for (var e = 0; e < m.length; ++e)
                f(m[e].series);
            q(b),
            b.restore()
        }
        var e = null
          , f = null
          , g = null
          , h = null
          , i = null
          , j = null
          , k = !1
          , l = null
          , m = [];
        d.hooks.processOptions.push(function(a, b) {
            b.series.pie.show && (b.grid.show = !1,
            "auto" == b.series.pie.label.show && (b.legend.show ? b.series.pie.label.show = !1 : b.series.pie.label.show = !0),
            "auto" == b.series.pie.radius && (b.series.pie.label.show ? b.series.pie.radius = .75 : b.series.pie.radius = 1),
            b.series.pie.tilt > 1 ? b.series.pie.tilt = 1 : b.series.pie.tilt < 0 && (b.series.pie.tilt = 0))
        }),
        d.hooks.bindEvents.push(function(a, b) {
            var c = a.getOptions();
            c.series.pie.show && (c.grid.hoverable && b.unbind("mousemove").mousemove(t),
            c.grid.clickable && b.unbind("click").click(u))
        }),
        d.hooks.processDatapoints.push(function(a, b, c, d) {
            var e = a.getOptions();
            e.series.pie.show && n(a, b, c, d)
        }),
        d.hooks.drawOverlay.push(function(a, b) {
            var c = a.getOptions();
            c.series.pie.show && z(a, b)
        }),
        d.hooks.draw.push(function(a, b) {
            var c = a.getOptions();
            c.series.pie.show && p(a, b)
        })
    }
    var b = 10
      , c = .95
      , e = {
        series: {
            pie: {
                show: !1,
                radius: "auto",
                innerRadius: 0,
                startAngle: 1.5,
                tilt: 1,
                shadow: {
                    left: 5,
                    top: 15,
                    alpha: .02
                },
                offset: {
                    top: 0,
                    left: "auto"
                },
                stroke: {
                    color: "#fff",
                    width: 1
                },
                label: {
                    show: "auto",
                    formatter: function(a, b) {
                        return "<div style='font-size:x-small;text-align:center;padding:2px;color:" + b.color + ";'>" + a + "<br/>" + Math.round(b.percent) + "%</div>"
                    },
                    radius: 1,
                    background: {
                        color: null ,
                        opacity: 0
                    },
                    threshold: 0
                },
                combine: {
                    threshold: -1,
                    color: null ,
                    label: "Other"
                },
                highlight: {
                    opacity: .5
                }
            }
        }
    };
    a.plot.plugins.push({
        init: d,
        options: e,
        name: "pie",
        version: "1.1"
    })
}(jQuery);
/* Inline dependency:
 * jQuery resize event - v1.1 - 3/14/2010
 * http://benalman.com/projects/jquery-resize-plugin/
 *
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($, e, t) {
    "$:nomunge";
    var i = [], n = $.resize = $.extend($.resize, {}), a, r = false, s = "setTimeout", u = "resize", m = u + "-special-event", o = "pendingDelay", l = "activeDelay", f = "throttleWindow";
    n[o] = 200;
    n[l] = 20;
    n[f] = true;
    $.event.special[u] = {
        setup: function() {
            if (!n[f] && this[s]) {
                return false
            }
            var e = $(this);
            i.push(this);
            e.data(m, {
                w: e.width(),
                h: e.height()
            });
            if (i.length === 1) {
                a = t;
                h()
            }
        },
        teardown: function() {
            if (!n[f] && this[s]) {
                return false
            }
            var e = $(this);
            for (var t = i.length - 1; t >= 0; t--) {
                if (i[t] == this) {
                    i.splice(t, 1);
                    break
                }
            }
            e.removeData(m);
            if (!i.length) {
                if (r) {
                    cancelAnimationFrame(a)
                } else {
                    clearTimeout(a)
                }
                a = null
            }
        },
        add: function(e) {
            if (!n[f] && this[s]) {
                return false
            }
            var i;
            function a(e, n, a) {
                var r = $(this)
                  , s = r.data(m) || {};
                s.w = n !== t ? n : r.width();
                s.h = a !== t ? a : r.height();
                i.apply(this, arguments)
            }
            if ($.isFunction(e)) {
                i = e;
                return a
            } else {
                i = e.handler;
                e.handler = a
            }
        }
    };
    function h(t) {
        if (r === true) {
            r = t || 1
        }
        for (var s = i.length - 1; s >= 0; s--) {
            var l = $(i[s]);
            if (l[0] == e || l.is(":visible")) {
                var f = l.width()
                  , c = l.height()
                  , d = l.data(m);
                if (d && (f !== d.w || c !== d.h)) {
                    l.trigger(u, [d.w = f, d.h = c]);
                    r = t || true
                }
            } else {
                d = l.data(m);
                d.w = 0;
                d.h = 0
            }
        }
        if (a !== null ) {
            if (r && (t == null || t - r < 1e3)) {
                a = e.requestAnimationFrame(h)
            } else {
                a = setTimeout(h, n[o]);
                r = false
            }
        }
    }
    if (!e.requestAnimationFrame) {
        e.requestAnimationFrame = function() {
            return e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t, i) {
                return e.setTimeout(function() {
                    t((new Date).getTime())
                }, n[l])
            }
        }()
    }
    if (!e.cancelAnimationFrame) {
        e.cancelAnimationFrame = function() {
            return e.webkitCancelRequestAnimationFrame || e.mozCancelRequestAnimationFrame || e.oCancelRequestAnimationFrame || e.msCancelRequestAnimationFrame || clearTimeout
        }()
    }
})(jQuery, this);
/* Flot.Resize */
!function(a) {
    function c(a) {
        function b() {
            var b = a.getPlaceholder();
            0 != b.width() && 0 != b.height() && (a.resize(),
            a.setupGrid(),
            a.draw())
        }
        function c(a, c) {
            a.getPlaceholder().resize(b)
        }
        function d(a, c) {
            a.getPlaceholder().unbind("resize", b)
        }
        a.hooks.bindEvents.push(c),
        a.hooks.shutdown.push(d)
    }
    var b = {};
    a.plot.plugins.push({
        init: c,
        options: b,
        name: "resize",
        version: "1.0"
    })
}(jQuery);
/* Flot.Aggregate */
(function(d) {
    function p(k, e) {
        var a = {};
        d.each(k, function(d, b) {
            b[e]in a ? a[b[e]].push(b) : a[b[e]] = [b]
        });
        return a
    }
    function q(k, e, a, l) {
        var b = null != e.xaxis.options.aggregate;
        l = null != e.yaxis.options.aggregate;
        if (b || l) {
            k = null ;
            var m = 0
              , h = 1;
            b ? k = e.xaxis.options.aggregate : l && (k = e.yaxis.options.aggregate,
            m = 1,
            h = 0);
            a = p(a, m);
            var f = [];
            switch (k) {
            case "count":
                d.each(a, function(n, a) {
                    b ? f.push([n, a.length]) : f.push([a.length, n])
                });
                break;
            case "min":
                d.each(a, function(a, g) {
                    var c = g[0][h];
                    d.each(g, function(a, b) {
                        c = Math.min(c, b[h])
                    });
                    b ? f.push([a, c]) : f.push([c, a])
                });
                break;
            case "max":
                d.each(a, function(a, g) {
                    var c = g[0][h];
                    d.each(g, function(a, b) {
                        c = Math.max(c, b[h])
                    });
                    b ? f.push([a, c]) : f.push([c, a])
                });
                break;
            case "avg":
                d.each(a, function(a, g) {
                    var c = 0;
                    d.each(g, function(a, b) {
                        c += b[h]
                    });
                    var e = c / g.length;
                    b ? f.push([a, e]) : f.push([e, a])
                });
                break;
            case "sum":
                d.each(a, function(a, e) {
                    var c = 0;
                    d.each(e, function(a, b) {
                        c += b[h]
                    });
                    b ? f.push([a, c]) : f.push([c, a])
                });
                break;
            default:
                return
            }
            a = e.data = f
        }
    }
    d.plot.plugins.push({
        init: function(d) {
            d.hooks.processRawData.push(q)
        },
        options: {
            xaxis: {
                aggregate: null
            },
            yaxis: {
                aggregate: null
            }
        },
        name: "aggregate",
        version: "1.0"
    })
})(jQuery);
/* Flot.Tooltip */
/*
 * jquery.flot.tooltip
 * 
 * description: easy-to-use tooltips for Flot charts
 * version: 0.9.0
 * authors: Krzysztof Urbas @krzysu [myviews.pl],Evan Steinkerchner @Roundaround
 * website: https://github.com/krzysu/flot.tooltip
 * 
 * build on 2016-07-26
 * released under MIT License, 2012
*/
!function(a) {
    var b = {
        tooltip: {
            show: !1,
            cssClass: "flotTip",
            content: "%s | X: %x | Y: %y",
            xDateFormat: null ,
            yDateFormat: null ,
            monthNames: null ,
            dayNames: null ,
            shifts: {
                x: 10,
                y: 20
            },
            defaultTheme: !0,
            snap: !0,
            lines: !1,
            clickTips: !1,
            onHover: function(a, b) {},
            $compat: !1
        }
    };
    b.tooltipOpts = b.tooltip;
    var c = function(a) {
        this.tipPosition = {
            x: 0,
            y: 0
        },
        this.init(a)
    }
    ;
    c.prototype.init = function(b) {
        function c(a) {
            var c = {};
            c.x = a.pageX,
            c.y = a.pageY,
            b.setTooltipPosition(c)
        }
        function d(c, d, g) {
            f.clickmode ? (a(b.getPlaceholder()).bind("plothover", e),
            b.hideTooltip(),
            f.clickmode = !1) : (e(c, d, g),
            f.getDomElement().is(":visible") && (a(b.getPlaceholder()).unbind("plothover", e),
            f.clickmode = !0))
        }
        function e(c, d, e) {
            var g = function(a, b, c, d) {
                return Math.sqrt((c - a) * (c - a) + (d - b) * (d - b))
            }
              , h = function(a, b, c, d, e, f, h) {
                if (!h || (h = function(a, b, c, d, e, f) {
                    if ("undefined" != typeof c)
                        return {
                            x: c,
                            y: b
                        };
                    if ("undefined" != typeof d)
                        return {
                            x: a,
                            y: d
                        };
                    var g, h = -1 / ((f - d) / (e - c));
                    return {
                        x: g = (e * (a * h - b + d) + c * (a * -h + b - f)) / (h * (e - c) + d - f),
                        y: h * g - h * a + b
                    }
                }(a, b, c, d, e, f),
                h.x >= Math.min(c, e) && h.x <= Math.max(c, e) && h.y >= Math.min(d, f) && h.y <= Math.max(d, f))) {
                    var i = d - f
                      , j = e - c
                      , k = c * f - d * e;
                    return Math.abs(i * a + j * b + k) / Math.sqrt(i * i + j * j)
                }
                var l = g(a, b, c, d)
                  , m = g(a, b, e, f);
                return l > m ? m : l
            }
            ;
            if (e)
                b.showTooltip(e, f.tooltipOptions.snap ? e : d);
            else if (f.plotOptions.series.lines.show && f.tooltipOptions.lines === !0) {
                var i = f.plotOptions.grid.mouseActiveRadius
                  , j = {
                    distance: i + 1
                }
                  , k = d;
                a.each(b.getData(), function(a, c) {
                    for (var e = 0, i = -1, l = 1; l < c.data.length; l++)
                        c.data[l - 1][0] <= d.x && c.data[l][0] >= d.x && (e = l - 1,
                        i = l);
                    if (-1 === i)
                        return void b.hideTooltip();
                    var m = {
                        x: c.data[e][0],
                        y: c.data[e][1]
                    }
                      , n = {
                        x: c.data[i][0],
                        y: c.data[i][1]
                    }
                      , o = h(c.xaxis.p2c(d.x), c.yaxis.p2c(d.y), c.xaxis.p2c(m.x), c.yaxis.p2c(m.y), c.xaxis.p2c(n.x), c.yaxis.p2c(n.y), !1);
                    if (o < j.distance) {
                        var p = g(m.x, m.y, d.x, d.y) < g(d.x, d.y, n.x, n.y) ? e : i
                          , q = (c.datapoints.pointsize,
                        [d.x, m.y + (n.y - m.y) * ((d.x - m.x) / (n.x - m.x))])
                          , r = {
                            datapoint: q,
                            dataIndex: p,
                            series: c,
                            seriesIndex: a
                        };
                        j = {
                            distance: o,
                            item: r
                        },
                        f.tooltipOptions.snap && (k = {
                            pageX: c.xaxis.p2c(q[0]),
                            pageY: c.yaxis.p2c(q[1])
                        })
                    }
                }),
                j.distance < i + 1 ? b.showTooltip(j.item, k) : b.hideTooltip()
            } else
                b.hideTooltip()
        }
        var f = this
          , g = a.plot.plugins.length;
        if (this.plotPlugins = [],
        g)
            for (var h = 0; g > h; h++)
                this.plotPlugins.push(a.plot.plugins[h].name);
        b.hooks.bindEvents.push(function(b, g) {
            if (f.plotOptions = b.getOptions(),
            "boolean" == typeof f.plotOptions.tooltip && (f.plotOptions.tooltipOpts.show = f.plotOptions.tooltip,
            f.plotOptions.tooltip = f.plotOptions.tooltipOpts,
            delete f.plotOptions.tooltipOpts),
            f.plotOptions.tooltip.show !== !1 && "undefined" != typeof f.plotOptions.tooltip.show) {
                f.tooltipOptions = f.plotOptions.tooltip,
                f.tooltipOptions.$compat ? (f.wfunc = "width",
                f.hfunc = "height") : (f.wfunc = "innerWidth",
                f.hfunc = "innerHeight");
                f.getDomElement();
                a(b.getPlaceholder()).bind("plothover", e),
                f.tooltipOptions.clickTips && a(b.getPlaceholder()).bind("plotclick", d),
                f.clickmode = !1,
                a(g).bind("mousemove", c)
            }
        }),
        b.hooks.shutdown.push(function(b, f) {
            a(b.getPlaceholder()).unbind("plothover", e),
            a(b.getPlaceholder()).unbind("plotclick", d),
            b.removeTooltip(),
            a(f).unbind("mousemove", c)
        }),
        b.setTooltipPosition = function(b) {
            var c = f.getDomElement()
              , d = c.outerWidth() + f.tooltipOptions.shifts.x
              , e = c.outerHeight() + f.tooltipOptions.shifts.y;
            b.x - a(window).scrollLeft() > a(window)[f.wfunc]() - d && (b.x -= d,
            b.x = Math.max(b.x, 0)),
            b.y - a(window).scrollTop() > a(window)[f.hfunc]() - e && (b.y -= e),
            isNaN(b.x) ? f.tipPosition.x = f.tipPosition.xPrev : (f.tipPosition.x = b.x,
            f.tipPosition.xPrev = b.x),
            isNaN(b.y) ? f.tipPosition.y = f.tipPosition.yPrev : (f.tipPosition.y = b.y,
            f.tipPosition.yPrev = b.y)
        }
        ,
        b.showTooltip = function(a, c, d) {
            var e = f.getDomElement()
              , g = f.stringFormat(f.tooltipOptions.content, a);
            "" !== g && (e.html(g),
            b.setTooltipPosition({
                x: f.tipPosition.x,
                y: f.tipPosition.y
            }),
            e.css({
                left: f.tipPosition.x + f.tooltipOptions.shifts.x,
                top: f.tipPosition.y + f.tooltipOptions.shifts.y
            }).show(),
            "function" == typeof f.tooltipOptions.onHover && f.tooltipOptions.onHover(a, e))
        }
        ,
        b.hideTooltip = function() {
            f.getDomElement().hide().html("")
        }
        ,
        b.removeTooltip = function() {
            f.getDomElement().remove()
        }
    }
    ,
    c.prototype.getDomElement = function() {
        var b = a("<div>");
        return this.tooltipOptions && this.tooltipOptions.cssClass && (b = a("." + this.tooltipOptions.cssClass),
        0 === b.length && (b = a("<div />").addClass(this.tooltipOptions.cssClass),
        b.appendTo("body").hide().css({
            position: "absolute"
        }),
        this.tooltipOptions.defaultTheme && b.css({
            background: "#fff",
            "z-index": "1040",
            padding: "0.4em 0.6em",
            "border-radius": "0.5em",
            "font-size": "0.8em",
            border: "1px solid #111",
            display: "none",
            "white-space": "nowrap"
        }))),
        b
    }
    ,
    c.prototype.stringFormat = function(a, b) {
        var c, d, e, f, g, h = /%p\.{0,1}(\d{0,})/, i = /%s/, j = /%c/, k = /%lx/, l = /%ly/, m = /%x\.{0,1}(\d{0,})/, n = /%y\.{0,1}(\d{0,})/, o = "%x", p = "%y", q = "%ct", r = "%n";
        if ("undefined" != typeof b.series.threshold ? (c = b.datapoint[0],
        d = b.datapoint[1],
        e = b.datapoint[2]) : "undefined" != typeof b.series.curvedLines ? (c = b.datapoint[0],
        d = b.datapoint[1]) : "undefined" != typeof b.series.lines && b.series.lines.steps ? (c = b.series.datapoints.points[2 * b.dataIndex],
        d = b.series.datapoints.points[2 * b.dataIndex + 1],
        e = "") : (c = b.series.data[b.dataIndex][0],
        d = b.series.data[b.dataIndex][1],
        e = b.series.data[b.dataIndex][2]),
        null === b.series.label && b.series.originSeries && (b.series.label = b.series.originSeries.label),
        "function" == typeof a && (a = a(b.series.label, c, d, b)),
        "boolean" == typeof a && !a)
            return "";
        if (e && (a = a.replace(q, e)),
        "undefined" != typeof b.series.percent ? f = b.series.percent : "undefined" != typeof b.series.percents && (f = b.series.percents[b.dataIndex]),
        "number" == typeof f && (a = this.adjustValPrecision(h, a, f)),
        b.series.hasOwnProperty("pie") && "undefined" != typeof b.series.data[0][1] && (g = b.series.data[0][1]),
        "number" == typeof g && (a = a.replace(r, g)),
        a = "undefined" != typeof b.series.label ? a.replace(i, b.series.label) : a.replace(i, ""),
        a = "undefined" != typeof b.series.color ? a.replace(j, b.series.color) : a.replace(j, ""),
        a = this.hasAxisLabel("xaxis", b) ? a.replace(k, b.series.xaxis.options.axisLabel) : a.replace(k, ""),
        a = this.hasAxisLabel("yaxis", b) ? a.replace(l, b.series.yaxis.options.axisLabel) : a.replace(l, ""),
        this.isTimeMode("xaxis", b) && this.isXDateFormat(b) && (a = a.replace(m, this.timestampToDate(c, this.tooltipOptions.xDateFormat, b.series.xaxis.options))),
        this.isTimeMode("yaxis", b) && this.isYDateFormat(b) && (a = a.replace(n, this.timestampToDate(d, this.tooltipOptions.yDateFormat, b.series.yaxis.options))),
        "number" == typeof c && (a = this.adjustValPrecision(m, a, c)),
        "number" == typeof d && (a = this.adjustValPrecision(n, a, d)),
        "undefined" != typeof b.series.xaxis.ticks) {
            var s;
            s = this.hasRotatedXAxisTicks(b) ? "rotatedTicks" : "ticks";
            var t = b.dataIndex + b.seriesIndex;
            for (var u in b.series.xaxis[s])
                if (b.series.xaxis[s].hasOwnProperty(t) && !this.isTimeMode("xaxis", b)) {
                    var v = this.isCategoriesMode("xaxis", b) ? b.series.xaxis[s][t].label : b.series.xaxis[s][t].v;
                    v === c && (a = a.replace(m, b.series.xaxis[s][t].label.replace(/\$/g, "$$$$")))
                }
        }
        if ("undefined" != typeof b.series.yaxis.ticks)
            for (var w in b.series.yaxis.ticks)
                if (b.series.yaxis.ticks.hasOwnProperty(w)) {
                    var x = this.isCategoriesMode("yaxis", b) ? b.series.yaxis.ticks[w].label : b.series.yaxis.ticks[w].v;
                    x === d && (a = a.replace(n, b.series.yaxis.ticks[w].label.replace(/\$/g, "$$$$")))
                }
        return "undefined" != typeof b.series.xaxis.tickFormatter && (a = a.replace(o, b.series.xaxis.tickFormatter(c, b.series.xaxis).replace(/\$/g, "$$"))),
        "undefined" != typeof b.series.yaxis.tickFormatter && (a = a.replace(p, b.series.yaxis.tickFormatter(d, b.series.yaxis).replace(/\$/g, "$$"))),
        a
    }
    ,
    c.prototype.isTimeMode = function(a, b) {
        return "undefined" != typeof b.series[a].options.mode && "time" === b.series[a].options.mode
    }
    ,
    c.prototype.isXDateFormat = function(a) {
        return "undefined" != typeof this.tooltipOptions.xDateFormat && null !== this.tooltipOptions.xDateFormat
    }
    ,
    c.prototype.isYDateFormat = function(a) {
        return "undefined" != typeof this.tooltipOptions.yDateFormat && null !== this.tooltipOptions.yDateFormat
    }
    ,
    c.prototype.isCategoriesMode = function(a, b) {
        return "undefined" != typeof b.series[a].options.mode && "categories" === b.series[a].options.mode
    }
    ,
    c.prototype.timestampToDate = function(b, c, d) {
        var e = a.plot.dateGenerator(b, d);
        return a.plot.formatDate(e, c, this.tooltipOptions.monthNames, this.tooltipOptions.dayNames)
    }
    ,
    c.prototype.adjustValPrecision = function(a, b, c) {
        var d, e = b.match(a);
        return null !== e && "" !== RegExp.$1 && (d = RegExp.$1,
        c = c.toFixed(d),
        b = b.replace(a, c)),
        b
    }
    ,
    c.prototype.hasAxisLabel = function(b, c) {
        return -1 !== a.inArray("axisLabels", this.plotPlugins) && "undefined" != typeof c.series[b].options.axisLabel && c.series[b].options.axisLabel.length > 0
    }
    ,
    c.prototype.hasRotatedXAxisTicks = function(b) {
        return -1 !== a.inArray("tickRotor", this.plotPlugins) && "undefined" != typeof b.series.xaxis.rotatedTicks
    }
    ;
    var d = function(a) {
        new c(a)
    }
    ;
    a.plot.plugins.push({
        init: d,
        options: b,
        name: "tooltip",
        version: "0.8.5"
    })
}(jQuery);
/* Underscore.js */
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function() {
    function n(n) {
        function t(t, r, e, u, i, o) {
            for (; i >= 0 && o > i; i += n) {
                var a = u ? u[i] : i;
                e = r(e, t[a], a, t)
            }
            return e
        }
        return function(r, e, u, i) {
            e = b(e, i, 4);
            var o = !k(r) && m.keys(r)
              , a = (o || r).length
              , c = n > 0 ? 0 : a - 1;
            return arguments.length < 3 && (u = r[o ? o[c] : c],
            c += n),
            t(r, e, u, o, c, a)
        }
    }
    function t(n) {
        return function(t, r, e) {
            r = x(r, e);
            for (var u = O(t), i = n > 0 ? 0 : u - 1; i >= 0 && u > i; i += n)
                if (r(t[i], i, t))
                    return i;
            return -1
        }
    }
    function r(n, t, r) {
        return function(e, u, i) {
            var o = 0
              , a = O(e);
            if ("number" == typeof i)
                n > 0 ? o = i >= 0 ? i : Math.max(i + a, o) : a = i >= 0 ? Math.min(i + 1, a) : i + a + 1;
            else if (r && i && a)
                return i = r(e, u),
                e[i] === u ? i : -1;
            if (u !== u)
                return i = t(l.call(e, o, a), m.isNaN),
                i >= 0 ? i + o : -1;
            for (i = n > 0 ? o : a - 1; i >= 0 && a > i; i += n)
                if (e[i] === u)
                    return i;
            return -1
        }
    }
    function e(n, t) {
        var r = I.length
          , e = n.constructor
          , u = m.isFunction(e) && e.prototype || a
          , i = "constructor";
        for (m.has(n, i) && !m.contains(t, i) && t.push(i); r--; )
            i = I[r],
            i in n && n[i] !== u[i] && !m.contains(t, i) && t.push(i)
    }
    var u = this
      , i = u._
      , o = Array.prototype
      , a = Object.prototype
      , c = Function.prototype
      , f = o.push
      , l = o.slice
      , s = a.toString
      , p = a.hasOwnProperty
      , h = Array.isArray
      , v = Object.keys
      , g = c.bind
      , y = Object.create
      , d = function() {}
      , m = function(n) {
        return n instanceof m ? n : this instanceof m ? void (this._wrapped = n) : new m(n)
    }
    ;
    "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = m),
    exports._ = m) : u._ = m,
    m.VERSION = "1.8.3";
    var b = function(n, t, r) {
        if (t === void 0)
            return n;
        switch (null == r ? 3 : r) {
        case 1:
            return function(r) {
                return n.call(t, r)
            }
            ;
        case 2:
            return function(r, e) {
                return n.call(t, r, e)
            }
            ;
        case 3:
            return function(r, e, u) {
                return n.call(t, r, e, u)
            }
            ;
        case 4:
            return function(r, e, u, i) {
                return n.call(t, r, e, u, i)
            }
        }
        return function() {
            return n.apply(t, arguments)
        }
    }
      , x = function(n, t, r) {
        return null == n ? m.identity : m.isFunction(n) ? b(n, t, r) : m.isObject(n) ? m.matcher(n) : m.property(n)
    }
    ;
    m.iteratee = function(n, t) {
        return x(n, t, 1 / 0)
    }
    ;
    var _ = function(n, t) {
        return function(r) {
            var e = arguments.length;
            if (2 > e || null == r)
                return r;
            for (var u = 1; e > u; u++)
                for (var i = arguments[u], o = n(i), a = o.length, c = 0; a > c; c++) {
                    var f = o[c];
                    t && r[f] !== void 0 || (r[f] = i[f])
                }
            return r
        }
    }
      , j = function(n) {
        if (!m.isObject(n))
            return {};
        if (y)
            return y(n);
        d.prototype = n;
        var t = new d;
        return d.prototype = null ,
        t
    }
      , w = function(n) {
        return function(t) {
            return null == t ? void 0 : t[n]
        }
    }
      , A = Math.pow(2, 53) - 1
      , O = w("length")
      , k = function(n) {
        var t = O(n);
        return "number" == typeof t && t >= 0 && A >= t
    }
    ;
    m.each = m.forEach = function(n, t, r) {
        t = b(t, r);
        var e, u;
        if (k(n))
            for (e = 0,
            u = n.length; u > e; e++)
                t(n[e], e, n);
        else {
            var i = m.keys(n);
            for (e = 0,
            u = i.length; u > e; e++)
                t(n[i[e]], i[e], n)
        }
        return n
    }
    ,
    m.map = m.collect = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = Array(u), o = 0; u > o; o++) {
            var a = e ? e[o] : o;
            i[o] = t(n[a], a, n)
        }
        return i
    }
    ,
    m.reduce = m.foldl = m.inject = n(1),
    m.reduceRight = m.foldr = n(-1),
    m.find = m.detect = function(n, t, r) {
        var e;
        return e = k(n) ? m.findIndex(n, t, r) : m.findKey(n, t, r),
        e !== void 0 && e !== -1 ? n[e] : void 0
    }
    ,
    m.filter = m.select = function(n, t, r) {
        var e = [];
        return t = x(t, r),
        m.each(n, function(n, r, u) {
            t(n, r, u) && e.push(n)
        }),
        e
    }
    ,
    m.reject = function(n, t, r) {
        return m.filter(n, m.negate(x(t)), r)
    }
    ,
    m.every = m.all = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (!t(n[o], o, n))
                return !1
        }
        return !0
    }
    ,
    m.some = m.any = function(n, t, r) {
        t = x(t, r);
        for (var e = !k(n) && m.keys(n), u = (e || n).length, i = 0; u > i; i++) {
            var o = e ? e[i] : i;
            if (t(n[o], o, n))
                return !0
        }
        return !1
    }
    ,
    m.contains = m.includes = m.include = function(n, t, r, e) {
        return k(n) || (n = m.values(n)),
        ("number" != typeof r || e) && (r = 0),
        m.indexOf(n, t, r) >= 0
    }
    ,
    m.invoke = function(n, t) {
        var r = l.call(arguments, 2)
          , e = m.isFunction(t);
        return m.map(n, function(n) {
            var u = e ? t : n[t];
            return null == u ? u : u.apply(n, r)
        })
    }
    ,
    m.pluck = function(n, t) {
        return m.map(n, m.property(t))
    }
    ,
    m.where = function(n, t) {
        return m.filter(n, m.matcher(t))
    }
    ,
    m.findWhere = function(n, t) {
        return m.find(n, m.matcher(t))
    }
    ,
    m.max = function(n, t, r) {
        var e, u, i = -1 / 0, o = -1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)
                e = n[a],
                e > i && (i = e)
        } else
            t = x(t, r),
            m.each(n, function(n, r, e) {
                u = t(n, r, e),
                (u > o || u === -1 / 0 && i === -1 / 0) && (i = n,
                o = u)
            });
        return i
    }
    ,
    m.min = function(n, t, r) {
        var e, u, i = 1 / 0, o = 1 / 0;
        if (null == t && null != n) {
            n = k(n) ? n : m.values(n);
            for (var a = 0, c = n.length; c > a; a++)
                e = n[a],
                i > e && (i = e)
        } else
            t = x(t, r),
            m.each(n, function(n, r, e) {
                u = t(n, r, e),
                (o > u || 1 / 0 === u && 1 / 0 === i) && (i = n,
                o = u)
            });
        return i
    }
    ,
    m.shuffle = function(n) {
        for (var t, r = k(n) ? n : m.values(n), e = r.length, u = Array(e), i = 0; e > i; i++)
            t = m.random(0, i),
            t !== i && (u[i] = u[t]),
            u[t] = r[i];
        return u
    }
    ,
    m.sample = function(n, t, r) {
        return null == t || r ? (k(n) || (n = m.values(n)),
        n[m.random(n.length - 1)]) : m.shuffle(n).slice(0, Math.max(0, t))
    }
    ,
    m.sortBy = function(n, t, r) {
        return t = x(t, r),
        m.pluck(m.map(n, function(n, r, e) {
            return {
                value: n,
                index: r,
                criteria: t(n, r, e)
            }
        }).sort(function(n, t) {
            var r = n.criteria
              , e = t.criteria;
            if (r !== e) {
                if (r > e || r === void 0)
                    return 1;
                if (e > r || e === void 0)
                    return -1
            }
            return n.index - t.index
        }), "value")
    }
    ;
    var F = function(n) {
        return function(t, r, e) {
            var u = {};
            return r = x(r, e),
            m.each(t, function(e, i) {
                var o = r(e, i, t);
                n(u, e, o)
            }),
            u
        }
    }
    ;
    m.groupBy = F(function(n, t, r) {
        m.has(n, r) ? n[r].push(t) : n[r] = [t]
    }),
    m.indexBy = F(function(n, t, r) {
        n[r] = t
    }),
    m.countBy = F(function(n, t, r) {
        m.has(n, r) ? n[r]++ : n[r] = 1
    }),
    m.toArray = function(n) {
        return n ? m.isArray(n) ? l.call(n) : k(n) ? m.map(n, m.identity) : m.values(n) : []
    }
    ,
    m.size = function(n) {
        return null == n ? 0 : k(n) ? n.length : m.keys(n).length
    }
    ,
    m.partition = function(n, t, r) {
        t = x(t, r);
        var e = []
          , u = [];
        return m.each(n, function(n, r, i) {
            (t(n, r, i) ? e : u).push(n)
        }),
        [e, u]
    }
    ,
    m.first = m.head = m.take = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[0] : m.initial(n, n.length - t)
    }
    ,
    m.initial = function(n, t, r) {
        return l.call(n, 0, Math.max(0, n.length - (null == t || r ? 1 : t)))
    }
    ,
    m.last = function(n, t, r) {
        return null == n ? void 0 : null == t || r ? n[n.length - 1] : m.rest(n, Math.max(0, n.length - t))
    }
    ,
    m.rest = m.tail = m.drop = function(n, t, r) {
        return l.call(n, null == t || r ? 1 : t)
    }
    ,
    m.compact = function(n) {
        return m.filter(n, m.identity)
    }
    ;
    var S = function(n, t, r, e) {
        for (var u = [], i = 0, o = e || 0, a = O(n); a > o; o++) {
            var c = n[o];
            if (k(c) && (m.isArray(c) || m.isArguments(c))) {
                t || (c = S(c, t, r));
                var f = 0
                  , l = c.length;
                for (u.length += l; l > f; )
                    u[i++] = c[f++]
            } else
                r || (u[i++] = c)
        }
        return u
    }
    ;
    m.flatten = function(n, t) {
        return S(n, t, !1)
    }
    ,
    m.without = function(n) {
        return m.difference(n, l.call(arguments, 1))
    }
    ,
    m.uniq = m.unique = function(n, t, r, e) {
        m.isBoolean(t) || (e = r,
        r = t,
        t = !1),
        null != r && (r = x(r, e));
        for (var u = [], i = [], o = 0, a = O(n); a > o; o++) {
            var c = n[o]
              , f = r ? r(c, o, n) : c;
            t ? (o && i === f || u.push(c),
            i = f) : r ? m.contains(i, f) || (i.push(f),
            u.push(c)) : m.contains(u, c) || u.push(c)
        }
        return u
    }
    ,
    m.union = function() {
        return m.uniq(S(arguments, !0, !0))
    }
    ,
    m.intersection = function(n) {
        for (var t = [], r = arguments.length, e = 0, u = O(n); u > e; e++) {
            var i = n[e];
            if (!m.contains(t, i)) {
                for (var o = 1; r > o && m.contains(arguments[o], i); o++)
                    ;
                o === r && t.push(i)
            }
        }
        return t
    }
    ,
    m.difference = function(n) {
        var t = S(arguments, !0, !0, 1);
        return m.filter(n, function(n) {
            return !m.contains(t, n)
        })
    }
    ,
    m.zip = function() {
        return m.unzip(arguments)
    }
    ,
    m.unzip = function(n) {
        for (var t = n && m.max(n, O).length || 0, r = Array(t), e = 0; t > e; e++)
            r[e] = m.pluck(n, e);
        return r
    }
    ,
    m.object = function(n, t) {
        for (var r = {}, e = 0, u = O(n); u > e; e++)
            t ? r[n[e]] = t[e] : r[n[e][0]] = n[e][1];
        return r
    }
    ,
    m.findIndex = t(1),
    m.findLastIndex = t(-1),
    m.sortedIndex = function(n, t, r, e) {
        r = x(r, e, 1);
        for (var u = r(t), i = 0, o = O(n); o > i; ) {
            var a = Math.floor((i + o) / 2);
            r(n[a]) < u ? i = a + 1 : o = a
        }
        return i
    }
    ,
    m.indexOf = r(1, m.findIndex, m.sortedIndex),
    m.lastIndexOf = r(-1, m.findLastIndex),
    m.range = function(n, t, r) {
        null == t && (t = n || 0,
        n = 0),
        r = r || 1;
        for (var e = Math.max(Math.ceil((t - n) / r), 0), u = Array(e), i = 0; e > i; i++,
        n += r)
            u[i] = n;
        return u
    }
    ;
    var E = function(n, t, r, e, u) {
        if (!(e instanceof t))
            return n.apply(r, u);
        var i = j(n.prototype)
          , o = n.apply(i, u);
        return m.isObject(o) ? o : i
    }
    ;
    m.bind = function(n, t) {
        if (g && n.bind === g)
            return g.apply(n, l.call(arguments, 1));
        if (!m.isFunction(n))
            throw new TypeError("Bind must be called on a function");
        var r = l.call(arguments, 2)
          , e = function() {
            return E(n, e, t, this, r.concat(l.call(arguments)))
        }
        ;
        return e
    }
    ,
    m.partial = function(n) {
        var t = l.call(arguments, 1)
          , r = function() {
            for (var e = 0, u = t.length, i = Array(u), o = 0; u > o; o++)
                i[o] = t[o] === m ? arguments[e++] : t[o];
            for (; e < arguments.length; )
                i.push(arguments[e++]);
            return E(n, r, this, this, i)
        }
        ;
        return r
    }
    ,
    m.bindAll = function(n) {
        var t, r, e = arguments.length;
        if (1 >= e)
            throw new Error("bindAll must be passed function names");
        for (t = 1; e > t; t++)
            r = arguments[t],
            n[r] = m.bind(n[r], n);
        return n
    }
    ,
    m.memoize = function(n, t) {
        var r = function(e) {
            var u = r.cache
              , i = "" + (t ? t.apply(this, arguments) : e);
            return m.has(u, i) || (u[i] = n.apply(this, arguments)),
            u[i]
        }
        ;
        return r.cache = {},
        r
    }
    ,
    m.delay = function(n, t) {
        var r = l.call(arguments, 2);
        return setTimeout(function() {
            return n.apply(null , r)
        }, t)
    }
    ,
    m.defer = m.partial(m.delay, m, 1),
    m.throttle = function(n, t, r) {
        var e, u, i, o = null , a = 0;
        r || (r = {});
        var c = function() {
            a = r.leading === !1 ? 0 : m.now(),
            o = null ,
            i = n.apply(e, u),
            o || (e = u = null )
        }
        ;
        return function() {
            var f = m.now();
            a || r.leading !== !1 || (a = f);
            var l = t - (f - a);
            return e = this,
            u = arguments,
            0 >= l || l > t ? (o && (clearTimeout(o),
            o = null ),
            a = f,
            i = n.apply(e, u),
            o || (e = u = null )) : o || r.trailing === !1 || (o = setTimeout(c, l)),
            i
        }
    }
    ,
    m.debounce = function(n, t, r) {
        var e, u, i, o, a, c = function() {
            var f = m.now() - o;
            t > f && f >= 0 ? e = setTimeout(c, t - f) : (e = null ,
            r || (a = n.apply(i, u),
            e || (i = u = null )))
        }
        ;
        return function() {
            i = this,
            u = arguments,
            o = m.now();
            var f = r && !e;
            return e || (e = setTimeout(c, t)),
            f && (a = n.apply(i, u),
            i = u = null ),
            a
        }
    }
    ,
    m.wrap = function(n, t) {
        return m.partial(t, n)
    }
    ,
    m.negate = function(n) {
        return function() {
            return !n.apply(this, arguments)
        }
    }
    ,
    m.compose = function() {
        var n = arguments
          , t = n.length - 1;
        return function() {
            for (var r = t, e = n[t].apply(this, arguments); r--; )
                e = n[r].call(this, e);
            return e
        }
    }
    ,
    m.after = function(n, t) {
        return function() {
            return --n < 1 ? t.apply(this, arguments) : void 0
        }
    }
    ,
    m.before = function(n, t) {
        var r;
        return function() {
            return --n > 0 && (r = t.apply(this, arguments)),
            1 >= n && (t = null ),
            r
        }
    }
    ,
    m.once = m.partial(m.before, 2);
    var M = !{
        toString: null
    }.propertyIsEnumerable("toString")
      , I = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
    m.keys = function(n) {
        if (!m.isObject(n))
            return [];
        if (v)
            return v(n);
        var t = [];
        for (var r in n)
            m.has(n, r) && t.push(r);
        return M && e(n, t),
        t
    }
    ,
    m.allKeys = function(n) {
        if (!m.isObject(n))
            return [];
        var t = [];
        for (var r in n)
            t.push(r);
        return M && e(n, t),
        t
    }
    ,
    m.values = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
            e[u] = n[t[u]];
        return e
    }
    ,
    m.mapObject = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = u.length, o = {}, a = 0; i > a; a++)
            e = u[a],
            o[e] = t(n[e], e, n);
        return o
    }
    ,
    m.pairs = function(n) {
        for (var t = m.keys(n), r = t.length, e = Array(r), u = 0; r > u; u++)
            e[u] = [t[u], n[t[u]]];
        return e
    }
    ,
    m.invert = function(n) {
        for (var t = {}, r = m.keys(n), e = 0, u = r.length; u > e; e++)
            t[n[r[e]]] = r[e];
        return t
    }
    ,
    m.functions = m.methods = function(n) {
        var t = [];
        for (var r in n)
            m.isFunction(n[r]) && t.push(r);
        return t.sort()
    }
    ,
    m.extend = _(m.allKeys),
    m.extendOwn = m.assign = _(m.keys),
    m.findKey = function(n, t, r) {
        t = x(t, r);
        for (var e, u = m.keys(n), i = 0, o = u.length; o > i; i++)
            if (e = u[i],
            t(n[e], e, n))
                return e
    }
    ,
    m.pick = function(n, t, r) {
        var e, u, i = {}, o = n;
        if (null == o)
            return i;
        m.isFunction(t) ? (u = m.allKeys(o),
        e = b(t, r)) : (u = S(arguments, !1, !1, 1),
        e = function(n, t, r) {
            return t in r
        }
        ,
        o = Object(o));
        for (var a = 0, c = u.length; c > a; a++) {
            var f = u[a]
              , l = o[f];
            e(l, f, o) && (i[f] = l)
        }
        return i
    }
    ,
    m.omit = function(n, t, r) {
        if (m.isFunction(t))
            t = m.negate(t);
        else {
            var e = m.map(S(arguments, !1, !1, 1), String);
            t = function(n, t) {
                return !m.contains(e, t)
            }
        }
        return m.pick(n, t, r)
    }
    ,
    m.defaults = _(m.allKeys, !0),
    m.create = function(n, t) {
        var r = j(n);
        return t && m.extendOwn(r, t),
        r
    }
    ,
    m.clone = function(n) {
        return m.isObject(n) ? m.isArray(n) ? n.slice() : m.extend({}, n) : n
    }
    ,
    m.tap = function(n, t) {
        return t(n),
        n
    }
    ,
    m.isMatch = function(n, t) {
        var r = m.keys(t)
          , e = r.length;
        if (null == n)
            return !e;
        for (var u = Object(n), i = 0; e > i; i++) {
            var o = r[i];
            if (t[o] !== u[o] || !(o in u))
                return !1
        }
        return !0
    }
    ;
    var N = function(n, t, r, e) {
        if (n === t)
            return 0 !== n || 1 / n === 1 / t;
        if (null == n || null == t)
            return n === t;
        n instanceof m && (n = n._wrapped),
        t instanceof m && (t = t._wrapped);
        var u = s.call(n);
        if (u !== s.call(t))
            return !1;
        switch (u) {
        case "[object RegExp]":
        case "[object String]":
            return "" + n == "" + t;
        case "[object Number]":
            return +n !== +n ? +t !== +t : 0 === +n ? 1 / +n === 1 / t : +n === +t;
        case "[object Date]":
        case "[object Boolean]":
            return +n === +t
        }
        var i = "[object Array]" === u;
        if (!i) {
            if ("object" != typeof n || "object" != typeof t)
                return !1;
            var o = n.constructor
              , a = t.constructor;
            if (o !== a && !(m.isFunction(o) && o instanceof o && m.isFunction(a) && a instanceof a) && "constructor"in n && "constructor"in t)
                return !1
        }
        r = r || [],
        e = e || [];
        for (var c = r.length; c--; )
            if (r[c] === n)
                return e[c] === t;
        if (r.push(n),
        e.push(t),
        i) {
            if (c = n.length,
            c !== t.length)
                return !1;
            for (; c--; )
                if (!N(n[c], t[c], r, e))
                    return !1
        } else {
            var f, l = m.keys(n);
            if (c = l.length,
            m.keys(t).length !== c)
                return !1;
            for (; c--; )
                if (f = l[c],
                !m.has(t, f) || !N(n[f], t[f], r, e))
                    return !1
        }
        return r.pop(),
        e.pop(),
        !0
    }
    ;
    m.isEqual = function(n, t) {
        return N(n, t)
    }
    ,
    m.isEmpty = function(n) {
        return null == n ? !0 : k(n) && (m.isArray(n) || m.isString(n) || m.isArguments(n)) ? 0 === n.length : 0 === m.keys(n).length
    }
    ,
    m.isElement = function(n) {
        return !(!n || 1 !== n.nodeType)
    }
    ,
    m.isArray = h || function(n) {
        return "[object Array]" === s.call(n)
    }
    ,
    m.isObject = function(n) {
        var t = typeof n;
        return "function" === t || "object" === t && !!n
    }
    ,
    m.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"], function(n) {
        m["is" + n] = function(t) {
            return s.call(t) === "[object " + n + "]"
        }
    }),
    m.isArguments(arguments) || (m.isArguments = function(n) {
        return m.has(n, "callee")
    }
    ),
    "function" != typeof /./ && "object" != typeof Int8Array && (m.isFunction = function(n) {
        return "function" == typeof n || !1
    }
    ),
    m.isFinite = function(n) {
        return isFinite(n) && !isNaN(parseFloat(n))
    }
    ,
    m.isNaN = function(n) {
        return m.isNumber(n) && n !== +n
    }
    ,
    m.isBoolean = function(n) {
        return n === !0 || n === !1 || "[object Boolean]" === s.call(n)
    }
    ,
    m.isNull = function(n) {
        return null === n
    }
    ,
    m.isUndefined = function(n) {
        return n === void 0
    }
    ,
    m.has = function(n, t) {
        return null != n && p.call(n, t)
    }
    ,
    m.noConflict = function() {
        return u._ = i,
        this
    }
    ,
    m.identity = function(n) {
        return n
    }
    ,
    m.constant = function(n) {
        return function() {
            return n
        }
    }
    ,
    m.noop = function() {}
    ,
    m.property = w,
    m.propertyOf = function(n) {
        return null == n ? function() {}
        : function(t) {
            return n[t]
        }
    }
    ,
    m.matcher = m.matches = function(n) {
        return n = m.extendOwn({}, n),
        function(t) {
            return m.isMatch(t, n)
        }
    }
    ,
    m.times = function(n, t, r) {
        var e = Array(Math.max(0, n));
        t = b(t, r, 1);
        for (var u = 0; n > u; u++)
            e[u] = t(u);
        return e
    }
    ,
    m.random = function(n, t) {
        return null == t && (t = n,
        n = 0),
        n + Math.floor(Math.random() * (t - n + 1))
    }
    ,
    m.now = Date.now || function() {
        return (new Date).getTime()
    }
    ;
    var B = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    }
      , T = m.invert(B)
      , R = function(n) {
        var t = function(t) {
            return n[t]
        }
          , r = "(?:" + m.keys(n).join("|") + ")"
          , e = RegExp(r)
          , u = RegExp(r, "g");
        return function(n) {
            return n = null == n ? "" : "" + n,
            e.test(n) ? n.replace(u, t) : n
        }
    }
    ;
    m.escape = R(B),
    m.unescape = R(T),
    m.result = function(n, t, r) {
        var e = null == n ? void 0 : n[t];
        return e === void 0 && (e = r),
        m.isFunction(e) ? e.call(n) : e
    }
    ;
    var q = 0;
    m.uniqueId = function(n) {
        var t = ++q + "";
        return n ? n + t : t
    }
    ,
    m.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var K = /(.)^/
      , z = {
        "'": "'",
        "\\": "\\",
        "\r": "r",
        "\n": "n",
        "\u2028": "u2028",
        "\u2029": "u2029"
    }
      , D = /\\|'|\r|\n|\u2028|\u2029/g
      , L = function(n) {
        return "\\" + z[n]
    }
    ;
    m.template = function(n, t, r) {
        !t && r && (t = r),
        t = m.defaults({}, t, m.templateSettings);
        var e = RegExp([(t.escape || K).source, (t.interpolate || K).source, (t.evaluate || K).source].join("|") + "|$", "g")
          , u = 0
          , i = "__p+='";
        n.replace(e, function(t, r, e, o, a) {
            return i += n.slice(u, a).replace(D, L),
            u = a + t.length,
            r ? i += "'+\n((__t=(" + r + "))==null?'':_.escape(__t))+\n'" : e ? i += "'+\n((__t=(" + e + "))==null?'':__t)+\n'" : o && (i += "';\n" + o + "\n__p+='"),
            t
        }),
        i += "';\n",
        t.variable || (i = "with(obj||{}){\n" + i + "}\n"),
        i = "var __t,__p='',__j=Array.prototype.join," + "print=function(){__p+=__j.call(arguments,'');};\n" + i + "return __p;\n";
        try {
            var o = new Function(t.variable || "obj","_",i)
        } catch (a) {
            throw a.source = i,
            a
        }
        var c = function(n) {
            return o.call(this, n, m)
        }
          , f = t.variable || "obj";
        return c.source = "function(" + f + "){\n" + i + "}",
        c
    }
    ,
    m.chain = function(n) {
        var t = m(n);
        return t._chain = !0,
        t
    }
    ;
    var P = function(n, t) {
        return n._chain ? m(t).chain() : t
    }
    ;
    m.mixin = function(n) {
        m.each(m.functions(n), function(t) {
            var r = m[t] = n[t];
            m.prototype[t] = function() {
                var n = [this._wrapped];
                return f.apply(n, arguments),
                P(this, r.apply(m, n))
            }
        })
    }
    ,
    m.mixin(m),
    m.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            var r = this._wrapped;
            return t.apply(r, arguments),
            "shift" !== n && "splice" !== n || 0 !== r.length || delete r[0],
            P(this, r)
        }
    }),
    m.each(["concat", "join", "slice"], function(n) {
        var t = o[n];
        m.prototype[n] = function() {
            return P(this, t.apply(this._wrapped, arguments))
        }
    }),
    m.prototype.value = function() {
        return this._wrapped
    }
    ,
    m.prototype.valueOf = m.prototype.toJSON = m.prototype.value,
    m.prototype.toString = function() {
        return "" + this._wrapped
    }
    ,
    "function" == typeof define && define.amd && define("underscore", [], function() {
        return m
    })
}
).call(this);
//# sourceMappingURL=underscore-min.map
/* Html2Canvas.js */
(function(t, D, y) {
    function M(e, b, c) {
        var f = e.runtimeStyle && e.runtimeStyle[b], h, n = e.style;
        !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test(c) && /^-?\d/.test(c) && (h = n.left,
        f && (e.runtimeStyle.left = e.currentStyle.left),
        n.left = "fontSize" === b ? "1em" : c || 0,
        c = n.pixelLeft + "px",
        n.left = h,
        f && (e.runtimeStyle.left = f));
        return /^(thin|medium|thick)$/i.test(c) ? c : Math.round(parseFloat(c)) + "px"
    }
    function S(e) {
        return parseInt(e, 10)
    }
    function N(e, b, c, f, h, n) {
        b = g.Util.getCSS(b, e, h);
        var a;
        1 === b.length && (h = b[0],
        b = [],
        b[0] = h,
        b[1] = h);
        -1 !== b[0].toString().indexOf("%") ? (a = parseFloat(b[0]) / 100,
        h = c.width * a,
        "backgroundSize" !== e && (h -= (n || f).width * a)) : h = "backgroundSize" === e ? "auto" === b[0] ? f.width : /contain|cover/.test(b[0]) ? g.Util.resizeBounds(f.width, f.height, c.width, c.height, b[0]).width : parseInt(b[0], 10) : parseInt(b[0], 10);
        "auto" === b[1] ? c = h / f.width * f.height : -1 !== b[1].toString().indexOf("%") ? (a = parseFloat(b[1]) / 100,
        c = c.height * a,
        "backgroundSize" !== e && (c -= (n || f).height * a)) : c = parseInt(b[1], 10);
        return [h, c]
    }
    function ca(e, b) {
        var c = [];
        return {
            storage: c,
            width: e,
            height: b,
            clip: function() {
                c.push({
                    type: "function",
                    name: "clip",
                    arguments: arguments
                })
            },
            translate: function() {
                c.push({
                    type: "function",
                    name: "translate",
                    arguments: arguments
                })
            },
            fill: function() {
                c.push({
                    type: "function",
                    name: "fill",
                    arguments: arguments
                })
            },
            save: function() {
                c.push({
                    type: "function",
                    name: "save",
                    arguments: arguments
                })
            },
            restore: function() {
                c.push({
                    type: "function",
                    name: "restore",
                    arguments: arguments
                })
            },
            fillRect: function() {
                c.push({
                    type: "function",
                    name: "fillRect",
                    arguments: arguments
                })
            },
            createPattern: function() {
                c.push({
                    type: "function",
                    name: "createPattern",
                    arguments: arguments
                })
            },
            drawShape: function() {
                var e = [];
                c.push({
                    type: "function",
                    name: "drawShape",
                    arguments: e
                });
                return {
                    moveTo: function() {
                        e.push({
                            name: "moveTo",
                            arguments: arguments
                        })
                    },
                    lineTo: function() {
                        e.push({
                            name: "lineTo",
                            arguments: arguments
                        })
                    },
                    arcTo: function() {
                        e.push({
                            name: "arcTo",
                            arguments: arguments
                        })
                    },
                    bezierCurveTo: function() {
                        e.push({
                            name: "bezierCurveTo",
                            arguments: arguments
                        })
                    },
                    quadraticCurveTo: function() {
                        e.push({
                            name: "quadraticCurveTo",
                            arguments: arguments
                        })
                    }
                }
            },
            drawImage: function() {
                c.push({
                    type: "function",
                    name: "drawImage",
                    arguments: arguments
                })
            },
            fillText: function() {
                c.push({
                    type: "function",
                    name: "fillText",
                    arguments: arguments
                })
            },
            setVariable: function(e, b) {
                c.push({
                    type: "variable",
                    name: e,
                    arguments: b
                });
                return b
            }
        }
    }
    var g = {}, O;
    g.Util = {};
    g.Util.log = function(e) {
        g.logging && t.console && t.console.log && t.console.log(e)
    }
    ;
    g.Util.trimText = function(e) {
        return function(b) {
            return e ? e.apply(b) : ((b || "") + "").replace(/^\s+|\s+$/g, "")
        }
    }(String.prototype.trim);
    g.Util.asFloat = function(e) {
        return parseFloat(e)
    }
    ;
    (function() {
        var e = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g
          , b = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
        g.Util.parseTextShadows = function(c) {
            if (!c || "none" === c)
                return [];
            c = c.match(e);
            for (var f = [], h = 0; c && h < c.length; h++) {
                var n = c[h].match(b);
                f.push({
                    color: n[0],
                    offsetX: n[1] ? n[1].replace("px", "") : 0,
                    offsetY: n[2] ? n[2].replace("px", "") : 0,
                    blur: n[3] ? n[3].replace("px", "") : 0
                })
            }
            return f
        }
    })();
    g.Util.parseBackgroundImage = function(e) {
        var b, c, f, h, n, a = [], v, d = 0, m = 0, g, p, k = function() {
            b && ('"' === c.substr(0, 1) && (c = c.substr(1, c.length - 2)),
            c && p.push(c),
            "-" === b.substr(0, 1) && 0 < (h = b.indexOf("-", 1) + 1) && (f = b.substr(0, h),
            b = b.substr(h)),
            a.push({
                prefix: f,
                method: b.toLowerCase(),
                value: n,
                args: p
            }));
            p = [];
            b = f = c = n = ""
        }
        ;
        k();
        for (var t = 0, y = e.length; t < y; t++)
            if (v = e[t],
            !(0 === d && -1 < " \r\n\t".indexOf(v))) {
                switch (v) {
                case '"':
                    g ? g === v && (g = null ) : g = v;
                    break;
                case "(":
                    if (!g)
                        if (0 === d) {
                            d = 1;
                            n += v;
                            continue
                        } else
                            m++;
                    break;
                case ")":
                    if (!g && 1 === d)
                        if (0 === m) {
                            d = 0;
                            n += v;
                            k();
                            continue
                        } else
                            m--;
                    break;
                case ",":
                    if (!g)
                        if (0 === d) {
                            k();
                            continue
                        } else if (1 === d && 0 === m && !b.match(/^url$/i)) {
                            p.push(c);
                            c = "";
                            n += v;
                            continue
                        }
                }
                n += v;
                0 === d ? b += v : c += v
            }
        k();
        return a
    }
    ;
    g.Util.Bounds = function(e) {
        var b, c = {};
        e.getBoundingClientRect && (b = e.getBoundingClientRect(),
        c.top = b.top,
        c.bottom = b.bottom || b.top + b.height,
        c.left = b.left,
        c.width = e.offsetWidth,
        c.height = e.offsetHeight);
        return c
    }
    ;
    g.Util.OffsetBounds = function(e) {
        var b = e.offsetParent ? g.Util.OffsetBounds(e.offsetParent) : {
            top: 0,
            left: 0
        };
        return {
            top: e.offsetTop + b.top,
            bottom: e.offsetTop + e.offsetHeight + b.top,
            left: e.offsetLeft + b.left,
            width: e.offsetWidth,
            height: e.offsetHeight
        }
    }
    ;
    g.Util.getCSS = function(e, b, c) {
        void 0 !== e && (O = D.defaultView.getComputedStyle(e, null ));
        var f = O[b];
        if (/^background(Size|Position)$/.test(b)) {
            a: {
                f = (f || "").split(",");
                f = f[c || 0] || f[0] || "auto";
                f = g.Util.trimText(f).split(" ");
                if ("backgroundSize" !== b || f[0] && !f[0].match(/cover|contain|auto/)) {
                    f[0] = -1 === f[0].indexOf("%") ? M(e, b + "X", f[0]) : f[0];
                    if (f[1] === y)
                        if ("backgroundSize" === b) {
                            f[1] = "auto";
                            e = f;
                            break a
                        } else
                            f[1] = f[0];
                    f[1] = -1 === f[1].indexOf("%") ? M(e, b + "Y", f[1]) : f[1]
                }
                e = f
            }
            return e
        }
        return /border(Top|Bottom)(Left|Right)Radius/.test(b) ? (e = f.split(" "),
        1 >= e.length && (e[1] = e[0]),
        e.map(S)) : f
    }
    ;
    g.Util.resizeBounds = function(e, b, c, f, h) {
        e /= b;
        h && "auto" !== h ? c / f < e ^ "contain" === h ? (c = f,
        h = f * e) : (h = c,
        c /= e) : (h = c,
        c = f);
        return {
            width: h,
            height: c
        }
    }
    ;
    g.Util.BackgroundPosition = function(e, b, c, f, h) {
        e = N("backgroundPosition", e, b, c, f, h);
        return {
            left: e[0],
            top: e[1]
        }
    }
    ;
    g.Util.BackgroundSize = function(e, b, c, f) {
        e = N("backgroundSize", e, b, c, f);
        return {
            width: e[0],
            height: e[1]
        }
    }
    ;
    g.Util.Extend = function(e, b) {
        for (var c in e)
            e.hasOwnProperty(c) && (b[c] = e[c]);
        return b
    }
    ;
    g.Util.Children = function(e) {
        var b;
        try {
            var c;
            if (e.nodeName && "IFRAME" === e.nodeName.toUpperCase())
                c = e.contentDocument || e.contentWindow.document;
            else {
                var f = e.childNodes;
                e = [];
                if (null !== f) {
                    var h = e.length
                      , n = 0;
                    if ("number" === typeof f.length)
                        for (var a = f.length; n < a; n++)
                            e[h++] = f[n];
                    else
                        for (; f[n] !== y; )
                            e[h++] = f[n++];
                    e.length = h
                }
                c = e
            }
            b = c
        } catch (v) {
            g.Util.log("html2canvas.Util.Children failed with exception: " + v.message),
            b = []
        }
        return b
    }
    ;
    g.Util.isTransparent = function(e) {
        return "transparent" === e || "rgba(0, 0, 0, 0)" === e
    }
    ;
    g.Util.Font = function() {
        var e = {};
        return function(b, c, f) {
            if (e[b + "-" + c] !== y)
                return e[b + "-" + c];
            var h = f.createElement("div"), n = f.createElement("img"), a = f.createElement("span"), v;
            h.style.visibility = "hidden";
            h.style.fontFamily = b;
            h.style.fontSize = c;
            h.style.margin = 0;
            h.style.padding = 0;
            f.body.appendChild(h);
            n.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
            n.width = 1;
            n.height = 1;
            n.style.margin = 0;
            n.style.padding = 0;
            n.style.verticalAlign = "baseline";
            a.style.fontFamily = b;
            a.style.fontSize = c;
            a.style.margin = 0;
            a.style.padding = 0;
            a.appendChild(f.createTextNode("Hidden Text"));
            h.appendChild(a);
            h.appendChild(n);
            v = n.offsetTop - a.offsetTop + 1;
            h.removeChild(a);
            h.appendChild(f.createTextNode("Hidden Text"));
            h.style.lineHeight = "normal";
            n.style.verticalAlign = "super";
            n = {
                baseline: v,
                lineWidth: 1,
                middle: n.offsetTop - h.offsetTop + 1
            };
            e[b + "-" + c] = n;
            f.body.removeChild(h);
            return n
        }
    }();
    (function() {
        function e(e) {
            return function(c) {
                try {
                    e.addColorStop(c.stop, c.color)
                } catch (a) {
                    b.log(["failed to add color stop: ", a, "; tried to add: ", c])
                }
            }
        }
        var b = g.Util
          , c = {};
        g.Generate = c;
        var f = [/^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/, /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/, /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/, /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/, /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/];
        c.parseGradient = function(e, c) {
            var a, b, d = f.length, m, g, p, k;
            for (b = 0; b < d && !(m = e.match(f[b])); b += 1)
                ;
            if (m)
                switch (m[1]) {
                case "-webkit-linear-gradient":
                case "-o-linear-gradient":
                    a = {
                        type: "linear",
                        x0: null ,
                        y0: null ,
                        x1: null ,
                        y1: null ,
                        colorStops: []
                    };
                    if (d = m[2].match(/\w+/g))
                        for (g = d.length,
                        b = 0; b < g; b += 1)
                            switch (d[b]) {
                            case "top":
                                a.y0 = 0;
                                a.y1 = c.height;
                                break;
                            case "right":
                                a.x0 = c.width;
                                a.x1 = 0;
                                break;
                            case "bottom":
                                a.y0 = c.height;
                                a.y1 = 0;
                                break;
                            case "left":
                                a.x0 = 0,
                                a.x1 = c.width
                            }
                    null === a.x0 && null === a.x1 && (a.x0 = a.x1 = c.width / 2);
                    null === a.y0 && null === a.y1 && (a.y0 = a.y1 = c.height / 2);
                    if (d = m[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))
                        for (g = d.length,
                        p = 1 / Math.max(g - 1, 1),
                        b = 0; b < g; b += 1)
                            k = d[b].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/),
                            k[2] ? (m = parseFloat(k[2]),
                            m = "%" === k[3] ? m / 100 : m / c.width) : m = b * p,
                            a.colorStops.push({
                                color: k[1],
                                stop: m
                            });
                    break;
                case "-webkit-gradient":
                    a = {
                        type: "radial" === m[2] ? "circle" : m[2],
                        x0: 0,
                        y0: 0,
                        x1: 0,
                        y1: 0,
                        colorStops: []
                    };
                    if (d = m[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/))
                        a.x0 = d[1] * c.width / 100,
                        a.y0 = d[2] * c.height / 100,
                        a.x1 = d[3] * c.width / 100,
                        a.y1 = d[4] * c.height / 100;
                    if (d = m[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g))
                        for (g = d.length,
                        b = 0; b < g; b += 1)
                            k = d[b].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/),
                            m = parseFloat(k[2]),
                            "from" === k[1] && (m = 0),
                            "to" === k[1] && (m = 1),
                            a.colorStops.push({
                                color: k[3],
                                stop: m
                            });
                    break;
                case "-moz-linear-gradient":
                    a = {
                        type: "linear",
                        x0: 0,
                        y0: 0,
                        x1: 0,
                        y1: 0,
                        colorStops: []
                    };
                    if (d = m[2].match(/(\d{1,3})%?\s(\d{1,3})%?/))
                        a.x0 = d[1] * c.width / 100,
                        a.y0 = d[2] * c.height / 100,
                        a.x1 = c.width - a.x0,
                        a.y1 = c.height - a.y0;
                    if (d = m[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g))
                        for (g = d.length,
                        p = 1 / Math.max(g - 1, 1),
                        b = 0; b < g; b += 1)
                            k = d[b].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/),
                            k[2] ? (m = parseFloat(k[2]),
                            k[3] && (m /= 100)) : m = b * p,
                            a.colorStops.push({
                                color: k[1],
                                stop: m
                            });
                    break;
                case "-webkit-radial-gradient":
                case "-moz-radial-gradient":
                case "-o-radial-gradient":
                    a = {
                        type: "circle",
                        x0: 0,
                        y0: 0,
                        x1: c.width,
                        y1: c.height,
                        cx: 0,
                        cy: 0,
                        rx: 0,
                        ry: 0,
                        colorStops: []
                    };
                    if (d = m[2].match(/(\d{1,3})%?\s(\d{1,3})%?/))
                        a.cx = d[1] * c.width / 100,
                        a.cy = d[2] * c.height / 100;
                    d = m[3].match(/\w+/);
                    k = m[4].match(/[a-z\-]*/);
                    if (d && k)
                        switch (k[0]) {
                        case "farthest-corner":
                        case "cover":
                        case "":
                            b = Math.sqrt(Math.pow(a.cx, 2) + Math.pow(a.cy, 2));
                            d = Math.sqrt(Math.pow(a.cx, 2) + Math.pow(a.y1 - a.cy, 2));
                            g = Math.sqrt(Math.pow(a.x1 - a.cx, 2) + Math.pow(a.y1 - a.cy, 2));
                            k = Math.sqrt(Math.pow(a.x1 - a.cx, 2) + Math.pow(a.cy, 2));
                            a.rx = a.ry = Math.max(b, d, g, k);
                            break;
                        case "closest-corner":
                            b = Math.sqrt(Math.pow(a.cx, 2) + Math.pow(a.cy, 2));
                            d = Math.sqrt(Math.pow(a.cx, 2) + Math.pow(a.y1 - a.cy, 2));
                            g = Math.sqrt(Math.pow(a.x1 - a.cx, 2) + Math.pow(a.y1 - a.cy, 2));
                            k = Math.sqrt(Math.pow(a.x1 - a.cx, 2) + Math.pow(a.cy, 2));
                            a.rx = a.ry = Math.min(b, d, g, k);
                            break;
                        case "farthest-side":
                            "circle" === d[0] ? a.rx = a.ry = Math.max(a.cx, a.cy, a.x1 - a.cx, a.y1 - a.cy) : (a.type = d[0],
                            a.rx = Math.max(a.cx, a.x1 - a.cx),
                            a.ry = Math.max(a.cy, a.y1 - a.cy));
                            break;
                        case "closest-side":
                        case "contain":
                            "circle" === d[0] ? a.rx = a.ry = Math.min(a.cx, a.cy, a.x1 - a.cx, a.y1 - a.cy) : (a.type = d[0],
                            a.rx = Math.min(a.cx, a.x1 - a.cx),
                            a.ry = Math.min(a.cy, a.y1 - a.cy))
                        }
                    if (d = m[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g))
                        for (g = d.length,
                        p = 1 / Math.max(g - 1, 1),
                        b = 0; b < g; b += 1)
                            k = d[b].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/),
                            k[2] ? (m = parseFloat(k[2]),
                            m = "%" === k[3] ? m / 100 : m / c.width) : m = b * p,
                            a.colorStops.push({
                                color: k[1],
                                stop: m
                            })
                }
            return a
        }
        ;
        c.Gradient = function(b, c) {
            if (0 !== c.width && 0 !== c.height) {
                var a = D.createElement("canvas"), f = a.getContext("2d"), d, m;
                a.width = c.width;
                a.height = c.height;
                if (d = g.Generate.parseGradient(b, c))
                    switch (d.type) {
                    case "linear":
                        m = f.createLinearGradient(d.x0, d.y0, d.x1, d.y1);
                        d.colorStops.forEach(e(m));
                        f.fillStyle = m;
                        f.fillRect(0, 0, c.width, c.height);
                        break;
                    case "circle":
                        m = f.createRadialGradient(d.cx, d.cy, 0, d.cx, d.cy, d.rx);
                        d.colorStops.forEach(e(m));
                        f.fillStyle = m;
                        f.fillRect(0, 0, c.width, c.height);
                        break;
                    case "ellipse":
                        var u = D.createElement("canvas")
                          , p = u.getContext("2d");
                        m = Math.max(d.rx, d.ry);
                        var k = 2 * m;
                        u.width = u.height = k;
                        m = p.createRadialGradient(d.rx, d.ry, 0, d.rx, d.ry, m);
                        d.colorStops.forEach(e(m));
                        p.fillStyle = m;
                        p.fillRect(0, 0, k, k);
                        f.fillStyle = d.colorStops[d.colorStops.length - 1].color;
                        f.fillRect(0, 0, a.width, a.height);
                        f.drawImage(u, d.cx - d.rx, d.cy - d.ry, 2 * d.rx, 2 * d.ry)
                    }
                return a
            }
        }
        ;
        c.ListAlpha = function(c) {
            var b = "", a;
            do
                a = c % 26,
                b = String.fromCharCode(a + 64) + b,
                c /= 26;
            while (26 < 26 * c);return b
        }
        ;
        c.ListRoman = function(c) {
            var b = "M CM D CD C XC L XL X IX V IV I".split(" "), a = [1E3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1], e = "", d, f = b.length;
            if (0 >= c || 4E3 <= c)
                return c;
            for (d = 0; d < f; d += 1)
                for (; c >= a[d]; )
                    c -= a[d],
                    e += b[d];
            return e
        }
    })();
    g.Parse = function(e, b) {
        function c(l, q) {
            var c = parseInt(r(l, q), 10);
            return isNaN(c) ? 0 : c
        }
        function f(l, q, c, a, b, e) {
            "transparent" !== e && (l.setVariable("fillStyle", e),
            l.fillRect(q, c, a, b))
        }
        function h(l, q, c) {
            if (0 < l.length)
                return q + c.toUpperCase()
        }
        function n(l, q) {
            switch (q) {
            case "lowercase":
                return l.toLowerCase();
            case "capitalize":
                return l.replace(/(^|\s|:|-|\(|\))([a-z])/g, h);
            case "uppercase":
                return l.toUpperCase();
            default:
                return l
            }
        }
        function a(l, q, c, a) {
            var b = r(q, "fontWeight")
              , e = r(q, "fontFamily")
              , d = r(q, "fontSize")
              , f = w.parseTextShadows(r(q, "textShadow"));
            switch (parseInt(b, 10)) {
            case 401:
                b = "bold";
                break;
            case 400:
                b = "normal"
            }
            l.setVariable("fillStyle", a);
            l.setVariable("font", [r(q, "fontStyle"), r(q, "fontVariant"), b, d, e].join(" "));
            l.setVariable("textAlign", "left");
            f.length && (l.setVariable("shadowColor", f[0].color),
            l.setVariable("shadowOffsetX", f[0].offsetX),
            l.setVariable("shadowOffsetY", f[0].offsetY),
            l.setVariable("shadowBlur", f[0].blur));
            if ("none" !== c)
                return w.Font(e, d, z)
        }
        function v(l, q, c) {
            var e = c.ctx, d = r(l, "color"), U = r(l, "textDecoration"), h = r(l, "textAlign"), g, m, k = q, F = 0;
            0 < w.trimText(q.nodeValue).length && (q.nodeValue = n(q.nodeValue, r(l, "textTransform")),
            h = h.replace(["-webkit-auto"], ["auto"]),
            m = !b.letterRendering && /^(left|right|justify|auto)$/.test(h) && /^(normal|none|0px)$/.test(r(l, "letterSpacing")) ? q.nodeValue.split(/(\b| )/) : q.nodeValue.split(""),
            g = a(e, l, U, d),
            b.chinese && m.forEach(function(l, q) {
                /.*[\u4E00-\u9FA5].*$/.test(l) && (l = l.split(""),
                l.unshift(q, 1),
                m.splice.apply(m, l))
            }),
            m.forEach(function(l, q) {
                var a, b = q < m.length - 1;
                a = c.transform.matrix;
                var h;
                if (da.rangeBounds && !a) {
                    if ("none" !== U || 0 !== w.trimText(l).length)
                        a = k,
                        b = F,
                        h = z.createRange(),
                        h.setStart(a, b),
                        h.setEnd(a, b + l.length),
                        h = h.getBoundingClientRect();
                    F += l.length
                } else if (k && "string" === typeof k.nodeValue) {
                    var b = b ? k.splitText(l.length) : null
                      , n = k;
                    h = n.parentNode;
                    var K = z.createElement("wrapper")
                      , B = n.cloneNode(!0);
                    K.appendChild(n.cloneNode(!0));
                    h.replaceChild(K, n);
                    a = a ? w.OffsetBounds(K) : w.Bounds(K);
                    h.replaceChild(B, K);
                    h = a;
                    k = b
                }
                if (a = h)
                    switch (b = a.left,
                    h = a.bottom,
                    null !== l && 0 < w.trimText(l).length && e.fillText(l, b, h),
                    U) {
                    case "underline":
                        f(e, a.left, Math.round(a.top + g.baseline + g.lineWidth), a.width, 1, d);
                        break;
                    case "overline":
                        f(e, a.left, Math.round(a.top), a.width, 1, d);
                        break;
                    case "line-through":
                        f(e, a.left, Math.ceil(a.top + g.middle + g.lineWidth), a.width, 1, d)
                    }
            }))
        }
        function d(l, q, c) {
            var b;
            q = q.ctx;
            var e = r(l, "listStyleType");
            if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(e)) {
                var d;
                d = -1;
                var f = 1
                  , h = l.parentNode.childNodes;
                if (l.parentNode) {
                    for (; h[++d] !== l; )
                        1 === h[d].nodeType && f++;
                    d = f
                } else
                    d = -1;
                switch (e) {
                case "decimal":
                    b = d;
                    break;
                case "decimal-leading-zero":
                    b = 1 === d.toString().length ? "0" + d.toString() : d.toString();
                    break;
                case "upper-roman":
                    b = g.Generate.ListRoman(d);
                    break;
                case "lower-roman":
                    b = g.Generate.ListRoman(d).toLowerCase();
                    break;
                case "lower-alpha":
                    b = g.Generate.ListAlpha(d).toLowerCase();
                    break;
                case "upper-alpha":
                    b = g.Generate.ListAlpha(d)
                }
                b += ". ";
                d = z.createElement("boundelement");
                d.style.display = "inline";
                f = l.style.listStyleType;
                l.style.listStyleType = "none";
                d.appendChild(z.createTextNode(b));
                l.insertBefore(d, l.firstChild);
                e = w.Bounds(d);
                l.removeChild(d);
                l.style.listStyleType = f;
                a(q, l, "none", r(l, "color"));
                "inside" === r(l, "listStylePosition") && (q.setVariable("textAlign", "left"),
                l = c.left,
                c = e.bottom,
                null !== b && 0 < w.trimText(b).length && q.fillText(b, l, c))
            }
        }
        function m(l) {
            return (l = e[l]) && !0 === l.succeeded ? l.img : !1
        }
        function u(l, q) {
            var a = Math.max(l.left, q.left)
              , b = Math.max(l.top, q.top);
            return {
                left: a,
                top: b,
                width: Math.min(l.left + l.width, q.left + q.width) - a,
                height: Math.min(l.top + l.height, q.top + q.height) - b
            }
        }
        function p(l, q, a, b, d) {
            var e = c(q, "paddingLeft")
              , f = c(q, "paddingTop")
              , h = c(q, "paddingRight");
            q = c(q, "paddingBottom");
            F(l, a, 0, 0, a.width, a.height, b.left + e + d[3].width, b.top + f + d[0].width, b.width - (d[1].width + d[3].width + e + h), b.height - (d[0].width + d[2].width + f + q))
        }
        function k(l) {
            return ["Top", "Right", "Bottom", "Left"].map(function(q) {
                return {
                    width: c(l, "border" + q + "Width"),
                    color: r(l, "border" + q + "Color")
                }
            })
        }
        function T(l) {
            return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(q) {
                return r(l, "border" + q + "Radius")
            })
        }
        function A(l, q, a, b) {
            var c = function(l, a, b) {
                return {
                    x: l.x + (a.x - l.x) * b,
                    y: l.y + (a.y - l.y) * b
                }
            }
            ;
            return {
                start: l,
                startControl: q,
                endControl: a,
                end: b,
                subdivide: function(d) {
                    var e = c(l, q, d)
                      , f = c(q, a, d)
                      , h = c(a, b, d)
                      , g = c(e, f, d)
                      , f = c(f, h, d);
                    d = c(g, f, d);
                    return [A(l, e, g, d), A(d, f, h, b)]
                },
                curveTo: function(l) {
                    l.push(["bezierCurve", q.x, q.y, a.x, a.y, b.x, b.y])
                },
                curveToReversed: function(b) {
                    b.push(["bezierCurve", a.x, a.y, q.x, q.y, l.x, l.y])
                }
            }
        }
        function G(l, a, b, c, d, e, f) {
            0 < a[0] || 0 < a[1] ? (l.push(["line", c[0].start.x, c[0].start.y]),
            c[0].curveTo(l),
            c[1].curveTo(l)) : l.push(["line", e, f]);
            (0 < b[0] || 0 < b[1]) && l.push(["line", d[0].start.x, d[0].start.y])
        }
        function J(l, a, b, c, d, e, f) {
            var h = [];
            0 < a[0] || 0 < a[1] ? (h.push(["line", c[1].start.x, c[1].start.y]),
            c[1].curveTo(h)) : h.push(["line", l.c1[0], l.c1[1]]);
            0 < b[0] || 0 < b[1] ? (h.push(["line", e[0].start.x, e[0].start.y]),
            e[0].curveTo(h),
            h.push(["line", f[0].end.x, f[0].end.y]),
            f[0].curveToReversed(h)) : (h.push(["line", l.c2[0], l.c2[1]]),
            h.push(["line", l.c3[0], l.c3[1]]));
            0 < a[0] || 0 < a[1] ? (h.push(["line", d[1].end.x, d[1].end.y]),
            d[1].curveToReversed(h)) : h.push(["line", l.c4[0], l.c4[1]]);
            return h
        }
        function E(l, a, b) {
            var c, d, e, f, h, g, m, k, n = a.left, F = a.top, B = a.width, v = a.height, p, C, u, t, x = T(l);
            k = a.left;
            p = a.top;
            g = a.width;
            m = a.height;
            d = x[0][0];
            e = x[0][1];
            f = x[1][0];
            h = x[1][1];
            var w = x[2][0]
              , y = x[2][1];
            C = x[3][0];
            u = x[3][1];
            var z = g - f
              , E = m - y
              , Q = g - w
              , A = m - u;
            c = H(k, p, d, e).topLeft.subdivide(.5);
            d = H(k + b[3].width, p + b[0].width, Math.max(0, d - b[3].width), Math.max(0, e - b[0].width)).topLeft.subdivide(.5);
            e = H(k + z, p, f, h).topRight.subdivide(.5);
            f = H(k + Math.min(z, g + b[3].width), p + b[0].width, z > g + b[3].width ? 0 : f - b[3].width, h - b[0].width).topRight.subdivide(.5);
            h = H(k + Q, p + E, w, y).bottomRight.subdivide(.5);
            g = H(k + Math.min(Q, g + b[3].width), p + Math.min(E, m + b[0].width), Math.max(0, w - b[1].width), Math.max(0, y - b[2].width)).bottomRight.subdivide(.5);
            m = H(k, p + A, C, u).bottomLeft.subdivide(.5);
            k = H(k + b[3].width, p + A, Math.max(0, C - b[3].width), Math.max(0, u - b[2].width)).bottomLeft.subdivide(.5);
            p = [];
            switch (r(l, "backgroundClip")) {
            case "content-box":
            case "padding-box":
                G(p, x[0], x[1], d, f, a.left + b[3].width, a.top + b[0].width);
                G(p, x[1], x[2], f, g, a.left + a.width - b[1].width, a.top + b[0].width);
                G(p, x[2], x[3], g, k, a.left + a.width - b[1].width, a.top + a.height - b[2].width);
                G(p, x[3], x[0], k, d, a.left + b[3].width, a.top + a.height - b[2].width);
                break;
            default:
                G(p, x[0], x[1], c, e, a.left, a.top),
                G(p, x[1], x[2], e, h, a.left + a.width, a.top),
                G(p, x[2], x[3], h, m, a.left + a.width, a.top + a.height),
                G(p, x[3], x[0], m, c, a.left, a.top + a.height)
            }
            A = {
                clip: p,
                borders: []
            };
            for (l = 0; 4 > l; l++)
                if (0 < b[l].width) {
                    a = n;
                    p = F;
                    C = B;
                    u = v - b[2].width;
                    switch (l) {
                    case 0:
                        u = b[0].width;
                        t = J({
                            c1: [a, p],
                            c2: [a + C, p],
                            c3: [a + C - b[1].width, p + u],
                            c4: [a + b[3].width, p + u]
                        }, x[0], x[1], c, d, e, f);
                        break;
                    case 1:
                        a = n + B - b[1].width;
                        C = b[1].width;
                        t = J({
                            c1: [a + C, p],
                            c2: [a + C, p + u + b[2].width],
                            c3: [a, p + u],
                            c4: [a, p + b[0].width]
                        }, x[1], x[2], e, f, h, g);
                        break;
                    case 2:
                        p = p + v - b[2].width;
                        u = b[2].width;
                        t = J({
                            c1: [a + C, p + u],
                            c2: [a, p + u],
                            c3: [a + b[3].width, p],
                            c4: [a + C - b[3].width, p]
                        }, x[2], x[3], h, g, m, k);
                        break;
                    case 3:
                        C = b[3].width,
                        t = J({
                            c1: [a, p + u + b[2].width],
                            c2: [a, p],
                            c3: [a + C, p + b[0].width],
                            c4: [a + C, p + u]
                        }, x[3], x[0], m, k, c, d)
                    }
                    A.borders.push({
                        args: t,
                        color: b[l].color
                    })
                }
            return A
        }
        function L(a, b) {
            var c = a.drawShape();
            b.forEach(function(a, b) {
                c[0 === b ? "moveTo" : a[0] + "To"].apply(null , a.slice(1))
            });
            return c
        }
        function I(a, b, c) {
            var d = z.createElement("valuewrap");
            "lineHeight textAlign fontFamily color fontSize paddingLeft paddingTop width height border borderLeftWidth borderTopWidth".split(" ").forEach(function(b) {
                try {
                    d.style[b] = r(a, b)
                } catch (c) {
                    w.log("html2canvas: Parse: Exception caught in renderFormValue: " + c.message)
                }
            });
            d.style.borderColor = "black";
            d.style.borderStyle = "solid";
            d.style.display = "block";
            d.style.position = "absolute";
            if (/^(submit|reset|button|text|password)$/.test(a.type) || "SELECT" === a.nodeName)
                d.style.lineHeight = r(a, "height");
            d.style.top = b.top + "px";
            d.style.left = b.left + "px";
            b = "SELECT" === a.nodeName ? (a.options[a.selectedIndex] || 0).text : a.value;
            b || (b = a.placeholder);
            b = z.createTextNode(b);
            d.appendChild(b);
            P.appendChild(d);
            v(a, b, c);
            P.removeChild(d)
        }
        function F(a) {
            a.drawImage.apply(a, Array.prototype.slice.call(arguments, 1))
        }
        function B(a, b) {
            var d = t.getComputedStyle(a, b);
            if (d && d.content && "none" !== d.content && "-moz-alt-content" !== d.content && "none" !== d.display) {
                var c = d.content + ""
                  , e = c.substr(0, 1);
                e === c.substr(c.length - 1) && e.match(/'|"/) && (c = c.substr(1, c.length - 2));
                var e = "url" === c.substr(0, 3)
                  , f = D.createElement(e ? "img" : "span");
                f.className = "___html2canvas___pseudoelement-before ___html2canvas___pseudoelement-after";
                Object.keys(d).filter(C).forEach(function(a) {
                    try {
                        f.style[a] = d[a]
                    } catch (b) {
                        w.log(["Tried to assign readonly property ", a, "Error:", b])
                    }
                });
                e ? f.src = w.parseBackgroundImage(c)[0].args[0] : f.innerHTML = c;
                return f
            }
        }
        function C(a) {
            return isNaN(t.parseInt(a, 10))
        }
        function Q(a, b) {
            var d = B(a, ":before")
              , c = B(a, ":after");
            if (d || c)
                d && (a.className += " ___html2canvas___pseudoelement-before",
                a.parentNode.insertBefore(d, a),
                V(d, b, !0),
                a.parentNode.removeChild(d),
                a.className = a.className.replace("___html2canvas___pseudoelement-before", "").trim()),
                c && (a.className += " ___html2canvas___pseudoelement-after",
                a.appendChild(c),
                V(c, b, !0),
                a.removeChild(c),
                a.className = a.className.replace("___html2canvas___pseudoelement-after", "").trim())
        }
        function Y(a, b, d, c) {
            var e = Math.round(c.left + d.left);
            d = Math.round(c.top + d.top);
            a.createPattern(b);
            a.translate(e, d);
            a.fill();
            a.translate(-e, -d)
        }
        function W(a, b, d, c, e, f, h, g) {
            var m = [];
            m.push(["line", Math.round(e), Math.round(f)]);
            m.push(["line", Math.round(e + h), Math.round(f)]);
            m.push(["line", Math.round(e + h), Math.round(g + f)]);
            m.push(["line", Math.round(e), Math.round(g + f)]);
            L(a, m);
            a.save();
            a.clip();
            Y(a, b, d, c);
            a.restore()
        }
        function ea(a, b, d) {
            for (var c = r(a, "backgroundImage"), e = w.parseBackgroundImage(c), f, h = e.length; h--; )
                if (c = e[h],
                c.args && 0 !== c.args.length)
                    if (f = m("url" === c.method ? c.args[0] : c.value)) {
                        var g = a
                          , c = b
                          , k = d
                          , n = f;
                        f = h;
                        var p = w.BackgroundSize(g, c, n, f)
                          , B = w.BackgroundPosition(g, c, n, f, p)
                          , g = r(g, "backgroundRepeat").split(",").map(w.trimText);
                        if (n.width !== p.width || n.height !== p.height) {
                            var C, v = z.createElement("canvas");
                            v.width = p.width;
                            v.height = p.height;
                            C = v.getContext("2d");
                            F(C, n, 0, 0, n.width, n.height, 0, 0, p.width, p.height);
                            n = v
                        }
                        g = g[f] || g[0];
                        switch (g) {
                        case "repeat-x":
                            W(k, n, B, c, c.left, c.top + B.top, 99999, n.height);
                            break;
                        case "repeat-y":
                            W(k, n, B, c, c.left + B.left, c.top, n.width, 99999);
                            break;
                        case "no-repeat":
                            W(k, n, B, c, c.left + B.left, c.top + B.top, n.width, n.height);
                            break;
                        default:
                            Y(k, n, B, {
                                top: c.top,
                                left: c.left,
                                width: n.width,
                                height: n.height
                            })
                        }
                    } else
                        w.log("html2canvas: Error loading background:", c)
        }
        function M(a) {
            return a.replace("px", "")
        }
        function N(a, b) {
            var c = r(a, "transform") || r(a, "-webkit-transform") || r(a, "-moz-transform") || r(a, "-ms-transform") || r(a, "-o-transform"), d = r(a, "transform-origin") || r(a, "-webkit-transform-origin") || r(a, "-moz-transform-origin") || r(a, "-ms-transform-origin") || r(a, "-o-transform-origin") || "0px 0px", d = d.split(" ").map(M).map(w.asFloat), e;
            if (c && "none" !== c && (c = c.match(fa)))
                switch (c[1]) {
                case "matrix":
                    e = c[2].split(",").map(w.trimText).map(w.asFloat)
                }
            return {
                origin: d,
                matrix: e
            }
        }
        function O(a, c, d, e) {
            var f = ca(c ? d.width : Math.max(Math.max(z.body.scrollWidth, z.documentElement.scrollWidth), Math.max(z.body.offsetWidth, z.documentElement.offsetWidth), Math.max(z.body.clientWidth, z.documentElement.clientWidth)), c ? d.height : Math.max(Math.max(z.body.scrollHeight, z.documentElement.scrollHeight), Math.max(z.body.offsetHeight, z.documentElement.offsetHeight), Math.max(z.body.clientHeight, z.documentElement.clientHeight))), h;
            h = f.setVariable("globalAlpha", r(a, "opacity") * (c ? c.opacity : 1));
            e = {
                ctx: f,
                opacity: h,
                cssPosition: r(a, "position"),
                borders: k(a),
                transform: e,
                clip: c && c.clip ? w.Extend({}, c.clip) : null
            };
            var g = (h = "static" !== e.cssPosition) ? r(a, "zIndex") : "auto"
              , m = r(a, "opacity")
              , n = "none" !== r(a, "cssFloat");
            e.zIndex = f = {
                zindex: g,
                children: []
            };
            f.isPositioned = h;
            f.isFloated = n;
            f.opacity = m;
            f.ownStacking = "auto" !== g || 1 > m;
            c && c.zIndex.children.push(e);
            !0 === b.useOverflow && !0 === /(hidden|scroll|auto)/.test(r(a, "overflow")) && !1 === /(BODY)/i.test(a.nodeName) && (e.clip = e.clip ? u(e.clip, d) : d);
            return e
        }
        function S(a, b, c) {
            a = {
                left: b.left + a[3].width,
                top: b.top + a[0].width,
                width: b.width - (a[1].width + a[3].width),
                height: b.height - (a[0].width + a[2].width)
            };
            c && (a = u(a, c));
            return a
        }
        function ga(a, b) {
            var c = b.matrix ? w.OffsetBounds(a) : w.Bounds(a);
            b.origin[0] += c.left;
            b.origin[1] += c.top;
            return c
        }
        function Z(a, b, c, e) {
            var h = N(a, b), g = ga(a, h), n;
            b = O(a, b, g, h);
            var h = b.borders
              , k = b.ctx
              , F = S(h, g, b.clip)
              , B = E(a, g, h)
              , v = aa.test(a.nodeName) ? "#efefef" : r(a, "backgroundColor");
            L(k, B.clip);
            k.save();
            k.clip();
            0 < F.height && 0 < F.width && !e ? (f(k, g.left, g.top, g.width, g.height, v),
            ea(a, F, k)) : e && (b.backgroundColor = v);
            k.restore();
            B.borders.forEach(function(a) {
                var b = a.args;
                a = a.color;
                "transparent" !== a && (k.setVariable("fillStyle", a),
                L(k, b),
                k.fill())
            });
            c || Q(a, b);
            switch (a.nodeName) {
            case "IMG":
                (n = m(a.getAttribute("src"))) ? p(k, a, n, g, h) : w.log("html2canvas: Error loading <img>:" + a.getAttribute("src"));
                break;
            case "INPUT":
                /^(text|url|email|submit|button|reset)$/.test(a.type) && 0 < (a.value || a.placeholder || "").length && I(a, g, b);
                break;
            case "TEXTAREA":
                0 < (a.value || a.placeholder || "").length && I(a, g, b);
                break;
            case "SELECT":
                0 < (a.options || a.placeholder || "").length && I(a, g, b);
                break;
            case "LI":
                d(a, b, F);
                break;
            case "CANVAS":
                p(k, a, a, g, h)
            }
            return b
        }
        function V(a, b, c) {
            "none" === r(a, "display") || "hidden" === r(a, "visibility") || a.hasAttribute("data-html2canvas-ignore") || (b = Z(a, b, c, !1) || b,
            aa.test(a.nodeName) || ba(a, b, c))
        }
        function ba(a, b, c) {
            w.Children(a).forEach(function(d) {
                d.nodeType === d.ELEMENT_NODE ? V(d, b, c) : d.nodeType === d.TEXT_NODE && v(a, d, b)
            })
        }
        t.scroll(0, 0);
        var R = b.elements === y ? D.body : b.elements[0]
          , z = R.ownerDocument
          , w = g.Util
          , da = w.Support(b, z)
          , aa = new RegExp("(" + b.ignoreElements + ")")
          , P = z.body
          , r = w.getCSS
          , X = z.createElement("style");
        X.innerHTML = '.___html2canvas___pseudoelement-before:before { content: "" !important; display: none !important; }.___html2canvas___pseudoelement-after:after { content: "" !important; display: none !important; }';
        P.appendChild(X);
        e = e || {};
        var H = function(a) {
            return function(b, c, d, e) {
                var f = d * a
                  , h = e * a;
                d = b + d;
                e = c + e;
                return {
                    topLeft: A({
                        x: b,
                        y: e
                    }, {
                        x: b,
                        y: e - h
                    }, {
                        x: d - f,
                        y: c
                    }, {
                        x: d,
                        y: c
                    }),
                    topRight: A({
                        x: b,
                        y: c
                    }, {
                        x: b + f,
                        y: c
                    }, {
                        x: d,
                        y: e - h
                    }, {
                        x: d,
                        y: e
                    }),
                    bottomRight: A({
                        x: d,
                        y: c
                    }, {
                        x: d,
                        y: c + h
                    }, {
                        x: b + f,
                        y: e
                    }, {
                        x: b,
                        y: e
                    }),
                    bottomLeft: A({
                        x: d,
                        y: e
                    }, {
                        x: d - f,
                        y: e
                    }, {
                        x: b,
                        y: c + h
                    }, {
                        x: b,
                        y: c
                    })
                }
            }
        }((Math.sqrt(2) - 1) / 3 * 4)
          , fa = /(matrix)\((.+)\)/;
        return function() {
            var a = r(D.documentElement, "backgroundColor")
              , b = w.isTransparent(a) && R === D.body
              , c = Z(R, null , !1, b);
            ba(R, c);
            b && (a = c.backgroundColor);
            P.removeChild(X);
            return {
                backgroundColor: a,
                stack: c
            }
        }()
    }
    ;
    g.Preload = function(e) {
        function b() {
            u.log("html2canvas: start: images: " + d.numLoaded + " / " + d.numTotal + " (failed: " + d.numFailed + ")");
            !d.firstRun && d.numLoaded >= d.numTotal && (u.log("Finished loading images: # " + d.numTotal + " (failed: " + d.numFailed + ")"),
            "function" === typeof e.complete && e.complete(d))
        }
        function c(a, c, f) {
            var h, g = e.proxy, k;
            E.href = a;
            a = E.href;
            h = "html2canvas_" + T++;
            f.callbackname = h;
            g = -1 < g.indexOf("?") ? g + "&" : g + "?";
            g += "url=" + encodeURIComponent(a) + "&callback=" + h;
            k = A.createElement("script");
            t[h] = function(a) {
                "error:" === a.substring(0, 6) ? (f.succeeded = !1,
                d.numLoaded++,
                d.numFailed++,
                b()) : (v(c, f),
                c.src = a);
                t[h] = y;
                try {
                    delete t[h]
                } catch (e) {}
                k.parentNode.removeChild(k);
                k = null ;
                delete f.script;
                delete f.callbackname
            }
            ;
            k.setAttribute("type", "text/javascript");
            k.setAttribute("src", g);
            f.script = k;
            t.document.body.appendChild(k)
        }
        function f(a, b) {
            var c = t.getComputedStyle(a, b)
              , d = c.content;
            "url" === d.substr(0, 3) && p.loadImage(g.Util.parseBackgroundImage(d)[0].args[0]);
            n(c.backgroundImage, a)
        }
        function h(a) {
            return a && a.method && a.args && 0 < a.args.length
        }
        function n(a, c) {
            var e;
            g.Util.parseBackgroundImage(a).filter(h).forEach(function(a) {
                if ("url" === a.method)
                    p.loadImage(a.args[0]);
                else if (a.method.match(/\-?gradient$/)) {
                    e === y && (e = g.Util.Bounds(c));
                    a = a.value;
                    var f = g.Generate.Gradient(a, e);
                    f !== y && (d[a] = {
                        img: f,
                        succeeded: !0
                    },
                    d.numTotal++,
                    d.numLoaded++,
                    b())
                }
            })
        }
        function a(b) {
            var c = !1;
            try {
                u.Children(b).forEach(a)
            } catch (d) {}
            try {
                c = b.nodeType
            } catch (d) {
                c = !1,
                u.log("html2canvas: failed to access some element's nodeType - Exception: " + d.message)
            }
            if (1 === c || c === y) {
                f(b, ":before");
                f(b, ":after");
                try {
                    n(u.getCSS(b, "backgroundImage"), b)
                } catch (d) {
                    u.log("html2canvas: failed to get background-image - Exception: " + d.message)
                }
                n(b)
            }
        }
        function v(a, f) {
            a.onload = function() {
                f.timer !== y && t.clearTimeout(f.timer);
                d.numLoaded++;
                f.succeeded = !0;
                a.onerror = a.onload = null ;
                b()
            }
            ;
            a.onerror = function() {
                if ("anonymous" === a.crossOrigin && (t.clearTimeout(f.timer),
                e.proxy)) {
                    var h = a.src;
                    a = new Image;
                    f.img = a;
                    a.src = h;
                    c(a.src, a, f);
                    return
                }
                d.numLoaded++;
                d.numFailed++;
                f.succeeded = !1;
                a.onerror = a.onload = null ;
                b()
            }
        }
        var d = {
            numLoaded: 0,
            numFailed: 0,
            numTotal: 0,
            cleanupDone: !1
        }, m, u = g.Util, p, k, T = 0;
        k = e.elements[0] || D.body;
        var A = k.ownerDocument, G = k.getElementsByTagName("img"), J = G.length, E = A.createElement("a"), L = (new Image).crossOrigin !== y, I;
        E.href = t.location.href;
        m = E.protocol + E.host;
        p = {
            loadImage: function(a) {
                var b, f;
                a && d[a] === y && (b = new Image,
                a.match(/data:image\/.*;base64,/i) ? (b.src = a.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, ""),
                f = d[a] = {
                    img: b
                },
                d.numTotal++,
                v(b, f)) : (E.href = a,
                E.href = E.href,
                E.protocol + E.host === m || !0 === e.allowTaint ? (f = d[a] = {
                    img: b
                },
                d.numTotal++,
                v(b, f),
                b.src = a) : L && !e.allowTaint && e.useCORS ? (b.crossOrigin = "anonymous",
                f = d[a] = {
                    img: b
                },
                d.numTotal++,
                v(b, f),
                b.src = a) : e.proxy && (f = d[a] = {
                    img: b
                },
                d.numTotal++,
                c(a, b, f))))
            },
            cleanupDOM: function(a) {
                var c, f;
                if (!d.cleanupDone) {
                    a && "string" === typeof a ? u.log("html2canvas: Cleanup because: " + a) : u.log("html2canvas: Cleanup after timeout: " + e.timeout + " ms.");
                    for (f in d)
                        if (d.hasOwnProperty(f) && (c = d[f],
                        "object" === typeof c && c.callbackname && c.succeeded === y)) {
                            t[c.callbackname] = y;
                            try {
                                delete t[c.callbackname]
                            } catch (h) {}
                            c.script && c.script.parentNode && (c.script.setAttribute("src", "about:blank"),
                            c.script.parentNode.removeChild(c.script));
                            d.numLoaded++;
                            d.numFailed++;
                            u.log("html2canvas: Cleaned up failed img: '" + f + "' Steps: " + d.numLoaded + " / " + d.numTotal)
                        }
                    t.stop !== y ? t.stop() : D.execCommand !== y && D.execCommand("Stop", !1);
                    D.close !== y && D.close();
                    d.cleanupDone = !0;
                    a && "string" === typeof a || b()
                }
            },
            renderingDone: function() {
                I && t.clearTimeout(I)
            }
        };
        0 < e.timeout && (I = t.setTimeout(p.cleanupDOM, e.timeout));
        u.log("html2canvas: Preload starts: finding background-images");
        d.firstRun = !0;
        a(k);
        u.log("html2canvas: Preload: Finding images");
        for (k = 0; k < J; k += 1)
            p.loadImage(G[k].getAttribute("src"));
        d.firstRun = !1;
        u.log("html2canvas: Preload: Done.");
        d.numTotal === d.numLoaded && b();
        return p
    }
    ;
    g.Renderer = function(e, b) {
        return function(c) {
            if ("string" === typeof b.renderer && g.Renderer[c] !== y)
                c = g.Renderer[c](b);
            else if ("function" === typeof c)
                c = c(b);
            else
                throw Error("Unknown renderer");
            if ("function" !== typeof c)
                throw Error("Invalid renderer defined");
            return c
        }(b.renderer)(e, b, D, function(b) {
            function e(b) {
                Object.keys(b).sort().forEach(function(a) {
                    var c = []
                      , d = []
                      , g = []
                      , u = [];
                    b[a].forEach(function(a) {
                        a.node.zIndex.isPositioned || 1 > a.node.zIndex.opacity ? g.push(a) : a.node.zIndex.isFloated ? d.push(a) : c.push(a)
                    });
                    (function k(a) {
                        a.forEach(function(a) {
                            u.push(a);
                            a.children && k(a.children)
                        })
                    })(c.concat(d, g));
                    u.forEach(function(a) {
                        a.context ? e(a.context) : h.push(a.node)
                    })
                })
            }
            var h = [];
            b = function(b) {
                function a(b, c, e) {
                    var f = "auto" === c.zIndex.zindex ? 0 : Number(c.zIndex.zindex)
                      , h = b
                      , g = c.zIndex.isPositioned
                      , n = c.zIndex.isFloated
                      , v = {
                        node: c
                    }
                      , t = e;
                    if (c.zIndex.ownStacking)
                        h = v.context = {
                            "!": [{
                                node: c,
                                children: []
                            }]
                        },
                        t = y;
                    else if (g || n)
                        t = v.children = [];
                    0 === f && e ? e.push(v) : (b[f] || (b[f] = []),
                    b[f].push(v));
                    c.zIndex.children.forEach(function(b) {
                        a(h, b, t)
                    })
                }
                var c = {};
                a(c, b);
                return c
            }(b);
            e(b);
            return h
        }(e.stack), g)
    }
    ;
    g.Util.Support = function(e, b) {
        function c() {
            var c = new Image
              , e = b.createElement("canvas")
              , n = e.getContext === y ? !1 : e.getContext("2d");
            if (!1 === n)
                return !1;
            e.width = e.height = 10;
            c.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><foreignObject width='10' height='10'><div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>sup</div></foreignObject></svg>";
            try {
                n.drawImage(c, 0, 0),
                e.toDataURL()
            } catch (a) {
                return !1
            }
            g.Util.log("html2canvas: Parse: SVG powered rendering available");
            return !0
        }
        return {
            rangeBounds: function() {
                var c, e, g = !1;
                b.createRange && (c = b.createRange(),
                c.getBoundingClientRect && (e = b.createElement("boundtest"),
                e.style.height = "123px",
                e.style.display = "block",
                b.body.appendChild(e),
                c.selectNode(e),
                c = c.getBoundingClientRect(),
                c = c.height,
                123 === c && (g = !0),
                b.body.removeChild(e)));
                return g
            }(),
            svgRendering: e.svgRendering && c()
        }
    }
    ;
    t.html2canvas = function(e, b) {
        e = e.length ? e : [e];
        var c, f, h = {
            logging: !1,
            elements: e,
            background: "#fff",
            proxy: null ,
            timeout: 0,
            useCORS: !1,
            allowTaint: !1,
            svgRendering: !1,
            ignoreElements: "IFRAME|OBJECT|PARAM",
            useOverflow: !0,
            letterRendering: !1,
            chinese: !1,
            width: null ,
            height: null ,
            taintTest: !0,
            renderer: "Canvas"
        }, h = g.Util.Extend(b, h);
        g.logging = h.logging;
        h.complete = function(b) {
            if ("function" !== typeof h.onpreloaded || !1 !== h.onpreloaded(b))
                if (c = g.Parse(b, h),
                "function" !== typeof h.onparsed || !1 !== h.onparsed(c))
                    if (f = g.Renderer(c, h),
                    "function" === typeof h.onrendered)
                        h.onrendered(f)
        }
        ;
        t.setTimeout(function() {
            g.Preload(h)
        }, 0);
        return {
            render: function(b, a) {
                return g.Renderer(b, g.Util.Extend(a, h))
            },
            parse: function(b, a) {
                return g.Parse(b, g.Util.Extend(a, h))
            },
            preload: function(b) {
                return g.Preload(g.Util.Extend(b, h))
            },
            log: g.Util.log
        }
    }
    ;
    t.html2canvas.log = g.Util.log;
    t.html2canvas.Renderer = {
        Canvas: y
    };
    g.Renderer.Canvas = function(e) {
        function b(a, b) {
            a.beginPath();
            b.forEach(function(b) {
                a[b.name].apply(a, b.arguments)
            });
            a.closePath()
        }
        e = e || {};
        var c = []
          , f = D.createElement("canvas")
          , h = f.getContext("2d")
          , n = g.Util
          , a = e.canvas || D.createElement("canvas");
        return function(g, d, m, u, p) {
            var k = a.getContext("2d"), t, A = g.stack;
            a.width = a.style.width = d.width || A.ctx.width;
            a.height = a.style.height = d.height || A.ctx.height;
            t = k.fillStyle;
            k.fillStyle = n.isTransparent(A.backgroundColor) && d.background !== y ? d.background : g.backgroundColor;
            k.fillRect(0, 0, a.width, a.height);
            k.fillStyle = t;
            u.forEach(function(a) {
                k.textBaseline = "bottom";
                k.save();
                a.transform.matrix && (k.translate(a.transform.origin[0], a.transform.origin[1]),
                k.transform.apply(k, a.transform.matrix),
                k.translate(-a.transform.origin[0], -a.transform.origin[1]));
                a.clip && (k.beginPath(),
                k.rect(a.clip.left, a.clip.top, a.clip.width, a.clip.height),
                k.clip());
                a.ctx.storage && a.ctx.storage.forEach(function(a) {
                    var d = k;
                    switch (a.type) {
                    case "variable":
                        d[a.name] = a.arguments;
                        break;
                    case "function":
                        switch (a.name) {
                        case "createPattern":
                            if (0 < a.arguments[0].width && 0 < a.arguments[0].height)
                                try {
                                    d.fillStyle = d.createPattern(a.arguments[0], "repeat")
                                } catch (g) {
                                    n.log("html2canvas: Renderer: Error creating pattern", g.message)
                                }
                            break;
                        case "drawShape":
                            b(d, a.arguments);
                            break;
                        case "drawImage":
                            if (0 < a.arguments[8] && 0 < a.arguments[7]) {
                                var m;
                                if (!(m = !e.taintTest) && (m = e.taintTest))
                                    a: {
                                        if (-1 === c.indexOf(a.arguments[0].src)) {
                                            h.drawImage(a.arguments[0], 0, 0);
                                            try {
                                                h.getImageData(0, 0, 1, 1)
                                            } catch (g) {
                                                f = D.createElement("canvas");
                                                h = f.getContext("2d");
                                                m = !1;
                                                break a
                                            }
                                            c.push(a.arguments[0].src)
                                        }
                                        m = !0
                                    }
                                m && d.drawImage.apply(d, a.arguments)
                            }
                            break;
                        default:
                            d[a.name].apply(d, a.arguments)
                        }
                    }
                });
                k.restore()
            });
            n.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");
            return 1 === d.elements.length && "object" === typeof d.elements[0] && "BODY" !== d.elements[0].nodeName ? (g = p.Util.Bounds(d.elements[0]),
            m = m.createElement("canvas"),
            m.width = Math.ceil(g.width),
            m.height = Math.ceil(g.height),
            k = m.getContext("2d"),
            k.drawImage(a, g.left, g.top, g.width, g.height, 0, 0, g.width, g.height),
            a = null ,
            m) : a
        }
    }
})(window, document);
/* Canvas2Blob.js */
!function(a) {
    "use strict";
    var b = a.HTMLCanvasElement && a.HTMLCanvasElement.prototype
      , c = a.Blob && function() {
        try {
            return Boolean(new Blob)
        } catch (a) {
            return !1
        }
    }()
      , d = c && a.Uint8Array && function() {
        try {
            return 100 === new Blob([new Uint8Array(100)]).size
        } catch (a) {
            return !1
        }
    }()
      , e = a.BlobBuilder || a.WebKitBlobBuilder || a.MozBlobBuilder || a.MSBlobBuilder
      , f = (c || e) && a.atob && a.ArrayBuffer && a.Uint8Array && function(a) {
        var b, f, g, h, i, j;
        for (b = a.split(",")[0].indexOf("base64") >= 0 ? atob(a.split(",")[1]) : decodeURIComponent(a.split(",")[1]),
        f = new ArrayBuffer(b.length),
        g = new Uint8Array(f),
        h = 0; h < b.length; h += 1)
            g[h] = b.charCodeAt(h);
        return i = a.split(",")[0].split(":")[1].split(";")[0],
        c ? new Blob([d ? g : f],{
            type: i
        }) : (j = new e,
        j.append(f),
        j.getBlob(i))
    }
    ;
    a.HTMLCanvasElement && !b.toBlob && (b.mozGetAsFile ? b.toBlob = function(a, c, d) {
        d && b.toDataURL && f ? a(f(this.toDataURL(c, d))) : a(this.mozGetAsFile("blob", c))
    }
    : b.toDataURL && f && (b.toBlob = function(a, b, c) {
        a(f(this.toDataURL(b, c)))
    }
    )),
    "function" == typeof define && define.amd ? define(function() {
        return f
    }) : a.dataURLtoBlob = f
}(this);
/* Filesaver.js */
var saveAs = saveAs || "undefined" !== typeof navigator && navigator.msSaveOrOpenBlob && navigator.msSaveOrOpenBlob.bind(navigator) || function(a) {
    if ("undefined" === typeof navigator || !/MSIE [1-9]\./.test(navigator.userAgent)) {
        var h = a.document
          , n = h.createElementNS("http://www.w3.org/1999/xhtml", "a")
          , y = "download"in n
          , z = function(c) {
            var k = h.createEvent("MouseEvents");
            k.initMouseEvent("click", !0, !1, a, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null );
            c.dispatchEvent(k)
        }
          , q = a.webkitRequestFileSystem
          , v = a.requestFileSystem || q || a.mozRequestFileSystem
          , A = function(c) {
            (a.setImmediate || a.setTimeout)(function() {
                throw c;
            }, 0)
        }
          , w = 0
          , r = function(c) {
            var k = function() {
                "string" === typeof c ? (a.URL || a.webkitURL || a).revokeObjectURL(c) : c.remove()
            }
            ;
            a.chrome ? k() : setTimeout(k, 500)
        }
          , u = function(c, a, d) {
            a = [].concat(a);
            for (var b = a.length; b--; ) {
                var l = c["on" + a[b]];
                if ("function" === typeof l)
                    try {
                        l.call(c, d || c)
                    } catch (e) {
                        A(e)
                    }
            }
        }
          , m = function(c, b) {
            var d = this, t = c.type, l = !1, e, p, h = function() {
                u(d, ["writestart", "progress", "write", "writeend"])
            }
            , f = function() {
                if (l || !e)
                    e = (a.URL || a.webkitURL || a).createObjectURL(c);
                p ? p.location.href = e : void 0 == a.open(e, "_blank") && "undefined" !== typeof safari && (a.location.href = e);
                d.readyState = d.DONE;
                h();
                r(e)
            }
            , g = function(a) {
                return function() {
                    if (d.readyState !== d.DONE)
                        return a.apply(this, arguments)
                }
            }
            , m = {
                create: !0,
                exclusive: !1
            }, x;
            d.readyState = d.INIT;
            b || (b = "download");
            if (y)
                e = (a.URL || a.webkitURL || a).createObjectURL(c),
                n.href = e,
                n.download = b,
                z(n),
                d.readyState = d.DONE,
                h(),
                r(e);
            else {
                a.chrome && t && "application/octet-stream" !== t && (x = c.slice || c.webkitSlice,
                c = x.call(c, 0, c.size, "application/octet-stream"),
                l = !0);
                q && "download" !== b && (b += ".download");
                if ("application/octet-stream" === t || q)
                    p = a;
                v ? (w += c.size,
                v(a.TEMPORARY, w, g(function(a) {
                    a.root.getDirectory("saved", m, g(function(a) {
                        var e = function() {
                            a.getFile(b, m, g(function(a) {
                                a.createWriter(g(function(b) {
                                    b.onwriteend = function(b) {
                                        p.location.href = a.toURL();
                                        d.readyState = d.DONE;
                                        u(d, "writeend", b);
                                        r(a)
                                    }
                                    ;
                                    b.onerror = function() {
                                        var a = b.error;
                                        a.code !== a.ABORT_ERR && f()
                                    }
                                    ;
                                    ["writestart", "progress", "write", "abort"].forEach(function(a) {
                                        b["on" + a] = d["on" + a]
                                    });
                                    b.write(c);
                                    d.abort = function() {
                                        b.abort();
                                        d.readyState = d.DONE
                                    }
                                    ;
                                    d.readyState = d.WRITING
                                }), f)
                            }), f)
                        }
                        ;
                        a.getFile(b, {
                            create: !1
                        }, g(function(a) {
                            a.remove();
                            e()
                        }), g(function(a) {
                            a.code === a.NOT_FOUND_ERR ? e() : f()
                        }))
                    }), f)
                }), f)) : f()
            }
        }
          , b = m.prototype;
        b.abort = function() {
            this.readyState = this.DONE;
            u(this, "abort")
        }
        ;
        b.readyState = b.INIT = 0;
        b.WRITING = 1;
        b.DONE = 2;
        b.error = b.onwritestart = b.onprogress = b.onwrite = b.onabort = b.onerror = b.onwriteend = null ;
        return function(a, b) {
            return new m(a,b)
        }
    }
}("undefined" !== typeof self && self || "undefined" !== typeof window && window || this.content);
"undefined" !== typeof module && module.exports ? module.exports.saveAs = saveAs : "undefined" !== typeof define && null !== define && null != define.amd && define([], function() {
    return saveAs
});
/*
Prism.js (for our json outputs)
*/
/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript */
var _self = "undefined" != typeof window ? window : "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? self : {}
  , Prism = function() {
    var e = /\blang(?:uage)?-(\w+)\b/i
      , t = 0
      , n = _self.Prism = {
        util: {
            encode: function(e) {
                return e instanceof a ? new a(e.type,n.util.encode(e.content),e.alias) : "Array" === n.util.type(e) ? e.map(n.util.encode) : e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ")
            },
            type: function(e) {
                return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]
            },
            objId: function(e) {
                return e.__id || Object.defineProperty(e, "__id", {
                    value: ++t
                }),
                e.__id
            },
            clone: function(e) {
                var t = n.util.type(e);
                switch (t) {
                case "Object":
                    var a = {};
                    for (var r in e)
                        e.hasOwnProperty(r) && (a[r] = n.util.clone(e[r]));
                    return a;
                case "Array":
                    return e.map && e.map(function(e) {
                        return n.util.clone(e)
                    })
                }
                return e
            }
        },
        languages: {
            extend: function(e, t) {
                var a = n.util.clone(n.languages[e]);
                for (var r in t)
                    a[r] = t[r];
                return a
            },
            insertBefore: function(e, t, a, r) {
                r = r || n.languages;
                var i = r[e];
                if (2 == arguments.length) {
                    a = arguments[1];
                    for (var l in a)
                        a.hasOwnProperty(l) && (i[l] = a[l]);
                    return i
                }
                var o = {};
                for (var s in i)
                    if (i.hasOwnProperty(s)) {
                        if (s == t)
                            for (var l in a)
                                a.hasOwnProperty(l) && (o[l] = a[l]);
                        o[s] = i[s]
                    }
                return n.languages.DFS(n.languages, function(t, n) {
                    n === r[e] && t != e && (this[t] = o)
                }),
                r[e] = o
            },
            DFS: function(e, t, a, r) {
                r = r || {};
                for (var i in e)
                    e.hasOwnProperty(i) && (t.call(e, i, e[i], a || i),
                    "Object" !== n.util.type(e[i]) || r[n.util.objId(e[i])] ? "Array" !== n.util.type(e[i]) || r[n.util.objId(e[i])] || (r[n.util.objId(e[i])] = !0,
                    n.languages.DFS(e[i], t, i, r)) : (r[n.util.objId(e[i])] = !0,
                    n.languages.DFS(e[i], t, null , r)))
            }
        },
        plugins: {},
        highlightAll: function(e, t) {
            var a = {
                callback: t,
                selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
            };
            n.hooks.run("before-highlightall", a);
            for (var r, i = a.elements || document.querySelectorAll(a.selector), l = 0; r = i[l++]; )
                n.highlightElement(r, e === !0, a.callback)
        },
        highlightElement: function(t, a, r) {
            for (var i, l, o = t; o && !e.test(o.className); )
                o = o.parentNode;
            o && (i = (o.className.match(e) || [, ""])[1].toLowerCase(),
            l = n.languages[i]),
            t.className = t.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i,
            o = t.parentNode,
            /pre/i.test(o.nodeName) && (o.className = o.className.replace(e, "").replace(/\s+/g, " ") + " language-" + i);
            var s = t.textContent
              , u = {
                element: t,
                language: i,
                grammar: l,
                code: s
            };
            if (n.hooks.run("before-sanity-check", u),
            !u.code || !u.grammar)
                return n.hooks.run("complete", u),
                void 0;
            if (n.hooks.run("before-highlight", u),
            a && _self.Worker) {
                var c = new Worker(n.filename);
                c.onmessage = function(e) {
                    u.highlightedCode = e.data,
                    n.hooks.run("before-insert", u),
                    u.element.innerHTML = u.highlightedCode,
                    r && r.call(u.element),
                    n.hooks.run("after-highlight", u),
                    n.hooks.run("complete", u)
                }
                ,
                c.postMessage(JSON.stringify({
                    language: u.language,
                    code: u.code,
                    immediateClose: !0
                }))
            } else
                u.highlightedCode = n.highlight(u.code, u.grammar, u.language),
                n.hooks.run("before-insert", u),
                u.element.innerHTML = u.highlightedCode,
                r && r.call(t),
                n.hooks.run("after-highlight", u),
                n.hooks.run("complete", u)
        },
        highlight: function(e, t, r) {
            var i = n.tokenize(e, t);
            return a.stringify(n.util.encode(i), r)
        },
        tokenize: function(e, t) {
            var a = n.Token
              , r = [e]
              , i = t.rest;
            if (i) {
                for (var l in i)
                    t[l] = i[l];
                delete t.rest
            }
            e: for (var l in t)
                if (t.hasOwnProperty(l) && t[l]) {
                    var o = t[l];
                    o = "Array" === n.util.type(o) ? o : [o];
                    for (var s = 0; s < o.length; ++s) {
                        var u = o[s]
                          , c = u.inside
                          , g = !!u.lookbehind
                          , h = !!u.greedy
                          , f = 0
                          , d = u.alias;
                        if (h && !u.pattern.global) {
                            var p = u.pattern.toString().match(/[imuy]*$/)[0];
                            u.pattern = RegExp(u.pattern.source, p + "g")
                        }
                        u = u.pattern || u;
                        for (var m = 0, y = 0; m < r.length; y += (r[m].matchedStr || r[m]).length,
                        ++m) {
                            var v = r[m];
                            if (r.length > e.length)
                                break e;
                            if (!(v instanceof a)) {
                                u.lastIndex = 0;
                                var b = u.exec(v)
                                  , k = 1;
                                if (!b && h && m != r.length - 1) {
                                    if (u.lastIndex = y,
                                    b = u.exec(e),
                                    !b)
                                        break;
                                    for (var w = b.index + (g ? b[1].length : 0), _ = b.index + b[0].length, A = m, S = y, P = r.length; P > A && _ > S; ++A)
                                        S += (r[A].matchedStr || r[A]).length,
                                        w >= S && (++m,
                                        y = S);
                                    if (r[m]instanceof a || r[A - 1].greedy)
                                        continue;k = A - m,
                                    v = e.slice(y, S),
                                    b.index -= y
                                }
                                if (b) {
                                    g && (f = b[1].length);
                                    var w = b.index + f
                                      , b = b[0].slice(f)
                                      , _ = w + b.length
                                      , x = v.slice(0, w)
                                      , O = v.slice(_)
                                      , j = [m, k];
                                    x && j.push(x);
                                    var N = new a(l,c ? n.tokenize(b, c) : b,d,b,h);
                                    j.push(N),
                                    O && j.push(O),
                                    Array.prototype.splice.apply(r, j)
                                }
                            }
                        }
                    }
                }
            return r
        },
        hooks: {
            all: {},
            add: function(e, t) {
                var a = n.hooks.all;
                a[e] = a[e] || [],
                a[e].push(t)
            },
            run: function(e, t) {
                var a = n.hooks.all[e];
                if (a && a.length)
                    for (var r, i = 0; r = a[i++]; )
                        r(t)
            }
        }
    }
      , a = n.Token = function(e, t, n, a, r) {
        this.type = e,
        this.content = t,
        this.alias = n,
        this.matchedStr = a || null ,
        this.greedy = !!r
    }
    ;
    if (a.stringify = function(e, t, r) {
        if ("string" == typeof e)
            return e;
        if ("Array" === n.util.type(e))
            return e.map(function(n) {
                return a.stringify(n, t, e)
            }).join("");
        var i = {
            type: e.type,
            content: a.stringify(e.content, t, r),
            tag: "span",
            classes: ["token", e.type],
            attributes: {},
            language: t,
            parent: r
        };
        if ("comment" == i.type && (i.attributes.spellcheck = "true"),
        e.alias) {
            var l = "Array" === n.util.type(e.alias) ? e.alias : [e.alias];
            Array.prototype.push.apply(i.classes, l)
        }
        n.hooks.run("wrap", i);
        var o = "";
        for (var s in i.attributes)
            o += (o ? " " : "") + s + '="' + (i.attributes[s] || "") + '"';
        return "<" + i.tag + ' class="' + i.classes.join(" ") + '"' + (o ? " " + o : "") + ">" + i.content + "</" + i.tag + ">"
    }
    ,
    !_self.document)
        return _self.addEventListener ? (_self.addEventListener("message", function(e) {
            var t = JSON.parse(e.data)
              , a = t.language
              , r = t.code
              , i = t.immediateClose;
            _self.postMessage(n.highlight(r, n.languages[a], a)),
            i && _self.close()
        }, !1),
        _self.Prism) : _self.Prism;
    var r = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();
    return r && (n.filename = r.src,
    document.addEventListener && !r.hasAttribute("data-manual") && ("loading" !== document.readyState ? window.requestAnimationFrame ? window.requestAnimationFrame(n.highlightAll) : window.setTimeout(n.highlightAll, 16) : document.addEventListener("DOMContentLoaded", n.highlightAll))),
    _self.Prism
}();
"undefined" != typeof module && module.exports && (module.exports = Prism),
"undefined" != typeof global && (global.Prism = Prism);
Prism.languages.markup = {
    comment: /<!--[\w\W]*?-->/,
    prolog: /<\?[\w\W]+?\?>/,
    doctype: /<!DOCTYPE[\w\W]+?>/i,
    cdata: /<!\[CDATA\[[\w\W]*?]]>/i,
    tag: {
        pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,
        inside: {
            tag: {
                pattern: /^<\/?[^\s>\/]+/i,
                inside: {
                    punctuation: /^<\/?/,
                    namespace: /^[^\s>\/:]+:/
                }
            },
            "attr-value": {
                pattern: /=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,
                inside: {
                    punctuation: /[=>"']/
                }
            },
            punctuation: /\/?>/,
            "attr-name": {
                pattern: /[^\s>\/]+/,
                inside: {
                    namespace: /^[^\s>\/:]+:/
                }
            }
        }
    },
    entity: /&#?[\da-z]{1,8};/i
},
Prism.hooks.add("wrap", function(a) {
    "entity" === a.type && (a.attributes.title = a.content.replace(/&amp;/, "&"))
}),
Prism.languages.xml = Prism.languages.markup,
Prism.languages.html = Prism.languages.markup,
Prism.languages.mathml = Prism.languages.markup,
Prism.languages.svg = Prism.languages.markup;
Prism.languages.css = {
    comment: /\/\*[\w\W]*?\*\//,
    atrule: {
        pattern: /@[\w-]+?.*?(;|(?=\s*\{))/i,
        inside: {
            rule: /@[\w-]+/
        }
    },
    url: /url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
    selector: /[^\{\}\s][^\{\};]*?(?=\s*\{)/,
    string: {
        pattern: /("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    property: /(\b|\B)[\w-]+(?=\s*:)/i,
    important: /\B!important\b/i,
    "function": /[-a-z0-9]+(?=\()/i,
    punctuation: /[(){};:]/
},
Prism.languages.css.atrule.inside.rest = Prism.util.clone(Prism.languages.css),
Prism.languages.markup && (Prism.languages.insertBefore("markup", "tag", {
    style: {
        pattern: /(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,
        lookbehind: !0,
        inside: Prism.languages.css,
        alias: "language-css"
    }
}),
Prism.languages.insertBefore("inside", "attr-value", {
    "style-attr": {
        pattern: /\s*style=("|').*?\1/i,
        inside: {
            "attr-name": {
                pattern: /^\s*style/i,
                inside: Prism.languages.markup.tag.inside
            },
            punctuation: /^\s*=\s*['"]|['"]\s*$/,
            "attr-value": {
                pattern: /.+/i,
                inside: Prism.languages.css
            }
        },
        alias: "language-css"
    }
}, Prism.languages.markup.tag));
Prism.languages.clike = {
    comment: [{
        pattern: /(^|[^\\])\/\*[\w\W]*?\*\//,
        lookbehind: !0
    }, {
        pattern: /(^|[^\\:])\/\/.*/,
        lookbehind: !0
    }],
    string: {
        pattern: /(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: !0
    },
    "class-name": {
        pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,
        lookbehind: !0,
        inside: {
            punctuation: /(\.|\\)/
        }
    },
    keyword: /\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    "boolean": /\b(true|false)\b/,
    "function": /[a-z0-9_]+(?=\()/i,
    number: /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
};
Prism.languages.javascript = Prism.languages.extend("clike", {
    keyword: /\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
    number: /\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,
    "function": /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/
}),
Prism.languages.insertBefore("javascript", "keyword", {
    regex: {
        pattern: /(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
        lookbehind: !0,
        greedy: !0
    }
}),
Prism.languages.insertBefore("javascript", "string", {
    "template-string": {
        pattern: /`(?:\\\\|\\?[^\\])*?`/,
        greedy: !0,
        inside: {
            interpolation: {
                pattern: /\$\{[^}]+\}/,
                inside: {
                    "interpolation-punctuation": {
                        pattern: /^\$\{|\}$/,
                        alias: "punctuation"
                    },
                    rest: Prism.languages.javascript
                }
            },
            string: /[\s\S]+/
        }
    }
}),
Prism.languages.markup && Prism.languages.insertBefore("markup", "tag", {
    script: {
        pattern: /(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,
        lookbehind: !0,
        inside: Prism.languages.javascript,
        alias: "language-javascript"
    }
}),
Prism.languages.js = Prism.languages.javascript;
/**
The Amazing RandomColor.js
*/
(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory)}else if(typeof exports==="object"){var randomColor=factory();if(typeof module==="object"&&module&&module.exports){exports=module.exports=randomColor}exports.randomColor=randomColor}else{root.randomColor=factory()}})(this,function(){var seed=null;var colorDictionary={};loadColorBounds();var randomColor=function(options){options=options||{};if(options.seed&&options.seed===parseInt(options.seed,10)){seed=options.seed}else if(typeof options.seed==="string"){seed=stringToInteger(options.seed)}else if(options.seed!==undefined&&options.seed!==null){throw new TypeError("The seed value must be an integer")}else{seed=null}var H,S,B;if(options.count!==null&&options.count!==undefined){var totalColors=options.count,colors=[];options.count=null;while(totalColors>colors.length){if(seed&&options.seed)options.seed+=1;colors.push(randomColor(options))}options.count=totalColors;return colors}H=pickHue(options);S=pickSaturation(H,options);B=pickBrightness(H,S,options);return setFormat([H,S,B],options)};function pickHue(options){var hueRange=getHueRange(options.hue),hue=randomWithin(hueRange);if(hue<0){hue=360+hue}return hue}function pickSaturation(hue,options){if(options.luminosity==="random"){return randomWithin([0,100])}if(options.hue==="monochrome"){return 0}var saturationRange=getSaturationRange(hue);var sMin=saturationRange[0],sMax=saturationRange[1];switch(options.luminosity){case"bright":sMin=55;break;case"dark":sMin=sMax-10;break;case"light":sMax=55;break}return randomWithin([sMin,sMax])}function pickBrightness(H,S,options){var bMin=getMinimumBrightness(H,S),bMax=100;switch(options.luminosity){case"dark":bMax=bMin+20;break;case"light":bMin=(bMax+bMin)/2;break;case"random":bMin=0;bMax=100;break}return randomWithin([bMin,bMax])}function setFormat(hsv,options){switch(options.format){case"hsvArray":return hsv;case"hslArray":return HSVtoHSL(hsv);case"hsl":var hsl=HSVtoHSL(hsv);return"hsl("+hsl[0]+", "+hsl[1]+"%, "+hsl[2]+"%)";case"hsla":var hslColor=HSVtoHSL(hsv);return"hsla("+hslColor[0]+", "+hslColor[1]+"%, "+hslColor[2]+"%, "+Math.random()+")";case"rgbArray":return HSVtoRGB(hsv);case"rgb":var rgb=HSVtoRGB(hsv);return"rgb("+rgb.join(", ")+")";case"rgba":var rgbColor=HSVtoRGB(hsv);return"rgba("+rgbColor.join(", ")+", "+Math.random()+")";default:return HSVtoHex(hsv)}}function getMinimumBrightness(H,S){var lowerBounds=getColorInfo(H).lowerBounds;for(var i=0;i<lowerBounds.length-1;i++){var s1=lowerBounds[i][0],v1=lowerBounds[i][1];var s2=lowerBounds[i+1][0],v2=lowerBounds[i+1][1];if(S>=s1&&S<=s2){var m=(v2-v1)/(s2-s1),b=v1-m*s1;return m*S+b}}return 0}function getHueRange(colorInput){if(typeof parseInt(colorInput)==="number"){var number=parseInt(colorInput);if(number<360&&number>0){return[number,number]}}if(typeof colorInput==="string"){if(colorDictionary[colorInput]){var color=colorDictionary[colorInput];if(color.hueRange){return color.hueRange}}}return[0,360]}function getSaturationRange(hue){return getColorInfo(hue).saturationRange}function getColorInfo(hue){if(hue>=334&&hue<=360){hue-=360}for(var colorName in colorDictionary){var color=colorDictionary[colorName];if(color.hueRange&&hue>=color.hueRange[0]&&hue<=color.hueRange[1]){return colorDictionary[colorName]}}return"Color not found"}function randomWithin(range){if(seed===null){return Math.floor(range[0]+Math.random()*(range[1]+1-range[0]))}else{var max=range[1]||1;var min=range[0]||0;seed=(seed*9301+49297)%233280;var rnd=seed/233280;return Math.floor(min+rnd*(max-min))}}function HSVtoHex(hsv){var rgb=HSVtoRGB(hsv);function componentToHex(c){var hex=c.toString(16);return hex.length==1?"0"+hex:hex}var hex="#"+componentToHex(rgb[0])+componentToHex(rgb[1])+componentToHex(rgb[2]);return hex}function defineColor(name,hueRange,lowerBounds){var sMin=lowerBounds[0][0],sMax=lowerBounds[lowerBounds.length-1][0],bMin=lowerBounds[lowerBounds.length-1][1],bMax=lowerBounds[0][1];colorDictionary[name]={hueRange:hueRange,lowerBounds:lowerBounds,saturationRange:[sMin,sMax],brightnessRange:[bMin,bMax]}}function loadColorBounds(){defineColor("monochrome",null,[[0,0],[100,0]]);defineColor("red",[-26,18],[[20,100],[30,92],[40,89],[50,85],[60,78],[70,70],[80,60],[90,55],[100,50]]);defineColor("orange",[19,46],[[20,100],[30,93],[40,88],[50,86],[60,85],[70,70],[100,70]]);defineColor("yellow",[47,62],[[25,100],[40,94],[50,89],[60,86],[70,84],[80,82],[90,80],[100,75]]);defineColor("green",[63,178],[[30,100],[40,90],[50,85],[60,81],[70,74],[80,64],[90,50],[100,40]]);defineColor("blue",[179,257],[[20,100],[30,86],[40,80],[50,74],[60,60],[70,52],[80,44],[90,39],[100,35]]);defineColor("purple",[258,282],[[20,100],[30,87],[40,79],[50,70],[60,65],[70,59],[80,52],[90,45],[100,42]]);defineColor("pink",[283,334],[[20,100],[30,90],[40,86],[60,84],[80,80],[90,75],[100,73]])}function HSVtoRGB(hsv){var h=hsv[0];if(h===0){h=1}if(h===360){h=359}h=h/360;var s=hsv[1]/100,v=hsv[2]/100;var h_i=Math.floor(h*6),f=h*6-h_i,p=v*(1-s),q=v*(1-f*s),t=v*(1-(1-f)*s),r=256,g=256,b=256;switch(h_i){case 0:r=v;g=t;b=p;break;case 1:r=q;g=v;b=p;break;case 2:r=p;g=v;b=t;break;case 3:r=p;g=q;b=v;break;case 4:r=t;g=p;b=v;break;case 5:r=v;g=p;b=q;break}var result=[Math.floor(r*255),Math.floor(g*255),Math.floor(b*255)];return result}function HSVtoHSL(hsv){var h=hsv[0],s=hsv[1]/100,v=hsv[2]/100,k=(2-s)*v;return[h,Math.round(s*v/(k<1?k:2-k)*1e4)/100,k/2*100]}function stringToInteger(string){var total=0;for(var i=0;i!==string.length;i++){if(total>=Number.MAX_SAFE_INTEGER)break;total+=string.charCodeAt(i)}return total}return randomColor});

/**
MELIORATOR: automatically inject analytics panel into web pages.
Requires and includes dependencies of the Open Source Flot js Charting library 
*/
(function($) {
    /* given an array of objects, return an html table based off of them */
    this.makeHTMLTable = function(data, tableClass) {
        var sample = data[0];
        var headers = []
        for (k in sample) {
            headers.push(k);
        }
        var table = $('<table/>')
          , th = $('<thead/>')
          , tb = $('<tbody/>')
          , rth = $('<tr/>');
        if (tableClass)
            table.addClass(tableClass);
        for (h in headers) {
            rth.append($('<th/>', {
                'class': headers[h]
            }).text(headers[h]));
        }
        th.append(rth)
        for (i in data) {
            var record = data[i];
            var rtb = $('<tr/>');
            for (h in headers) {
                rtb.append($('<td/>', {
                    'class': headers[h]
                }).text(record[headers[h]]));
            }
            tb.append(rtb)
        }
        table.append(th).append(tb)
        return table;
    }
    /* given an html table, return it as an array of objects */
    this.htmlTableToObjectArray = function(table) {
        var headers = $(table).find('thead tr:last').find('th,td').map(function(i, td) {
            return $(td).text().trim();
        });
        var dataSet = $(table).find('tbody tr').map(function(r, tr) {
            var o = {};
            $(tr).find('th,td').map(function(i, td) {
                var val = $(td).text().trim();
                o[headers[i]] = isNaN(val) ? val : Number(val);
            });
            return o;
        });
        return dataSet;
    }
    this.checkIfDataIsCategorical = function(dataArray, valueFunc, depth) {
        var isCategorical = false;
        for (i = 0; i < depth; i++)
            if (valueFunc(dataArray[i]).match(/^[\d.]+$/) == null )
                isCategorical = isCategorical || true;
        return isCategorical;
    }
    /* given a dataset, make a line chart, append it to the container, and return the chart element */
    this.makeLineChart = function(data, domainField, selectedAggregation, rangeFields, container) {
        var seriesMap = {}
        var minRangeVal, maxRangeVal, minDomainVal, maxDomainVal;
        for (i in data) {
            domainValue = data[i][domainField];
            minDomainVal = isNaN(domainValue) ? minDomainVal : Math.min(minDomainVal, Number(domainValue));
            maxDomainVal = isNaN(domainValue) ? maxDomainVal : Math.max(maxDomainVal, Number(domainValue));
            for (k in rangeFields) {
                rangeField = rangeFields[k];
                if (seriesMap[rangeField] == undefined)
                    seriesMap[rangeField] = [];
                rangeValue = data[i][rangeField];
                minRangeVal = isNaN(rangeValue) ? minRangeVal : Math.min(minRangeVal, Number(rangeValue));
                maxRangeVal = isNaN(rangeValue) ? maxRangeVal : Math.max(maxRangeVal, Number(rangeValue));
                seriesMap[rangeField].push([domainValue, rangeValue]);
            }
        }
        var chart = $('<div/>', {
            'class': 'chart-canvas'
        });
        // put a title over our chart...
        container.append($('<h1/>').text(domainField + " Vs " + rangeFields.join(" and ")));
        container.append(chart);
        var series = [];
        var options = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                zoomRange: [0.1, maxDomainVal],
                panRange: [minDomainVal, maxDomainVal],
                aggregate: selectedAggregation
            },
            yaxis: {
                zoomRange: [0.1, maxRangeVal],
                panRange: [minRangeVal, maxRangeVal]
            },
            zoom: {
                interactive: true
            },
            pan: {
                interactive: true
            },
            grid: {
                hoverable: true
            },
            tooltip: {
                show: true,
                content: function(label, xval, yval, flotItem) {
                    return label + " | " + xval + " : " + yval;
                    // manually constructing this prevents the bug in tooltip plugin that breaks when there are multiple series. 
                }
            }
        }
        for (var o in seriesMap) {
            var seriesData = seriesMap[o];
            var isCategorical = checkIfDataIsCategorical(seriesData, function(v) {
                return String(v[0])
            }, 1);
            var serie = {
                color: randomColor({
                    luminosity: 'bright'
                }),
                data: seriesData,
                label: o
            };
            if (isCategorical) {
                options['xaxis']['mode'] = 'categories';
                options['xaxis']['tickLength'] = 0;
            }
            series.push(serie);
        }
        $.plot(chart, series, options);
        container.removeClass('pie-chart');
        container.removeClass('table');
        return container;
    }
    /* given a dataset, make a bar chart, append it to the container, and return the chart element */
    this.makeBarChart = function(data, domainField, selectedAggregation, rangeFields, container) {
        var seriesMap = {}
        var minRangeVal, maxRangeVal, minDomainVal, maxDomainVal;
        for (i in data) {
            domainValue = data[i][domainField];
            minDomainVal = isNaN(domainValue) ? minDomainVal : Math.min(minDomainVal, Number(domainValue));
            maxDomainVal = isNaN(domainValue) ? maxDomainVal : Math.max(maxDomainVal, Number(domainValue));
            for (k in rangeFields) {
                rangeField = rangeFields[k];
                if (seriesMap[rangeField] == undefined)
                    seriesMap[rangeField] = [];
                rangeValue = data[i][rangeField];
                minRangeVal = isNaN(rangeValue) ? minRangeVal : Math.min(minRangeVal, Number(rangeValue));
                maxRangeVal = isNaN(rangeValue) ? maxRangeVal : Math.max(maxRangeVal, Number(rangeValue));
                seriesMap[rangeField].push([domainValue, rangeValue]);
            }
        }
        var chart = $('<div/>', {
            'class': 'chart-canvas'
        });
        // put a title over our chart...
        container.append($('<h1/>').text(domainField + " Vs " + rangeFields.join(" and ")));
        container.append(chart);
        var series = [];
        var options = {
            series: {
                bars: {
                    show: true
                }
            },
            xaxis: {
                zoomRange: [0.1, maxDomainVal],
                panRange: [minDomainVal, maxDomainVal],
                aggregate: selectedAggregation
            },
            yaxis: {
                zoomRange: [0.1, maxRangeVal],
                panRange: [minRangeVal, maxRangeVal]
            },
            zoom: {
                interactive: true
            },
            pan: {
                interactive: true
            },
            grid: {
                hoverable: true
            },
            tooltip: {
                show: true,
                content: function(label, xval, yval, flotItem) {
                    return label + " | " + xval + " : " + yval;
                    // manually constructing this prevents the bug in tooltip plugin that breaks when there are multiple series. 
                }
            }
        }
        for (var o in seriesMap) {
            var seriesData = seriesMap[o];
            var isCategorical = checkIfDataIsCategorical(seriesData, function(v) {
                return String(v[0])
            }, 1);
            var serie = {
                color: randomColor({
                    luminosity: 'bright'
                }),
                data: seriesData,
                label: o
            };
            if (isCategorical) {
                options['xaxis']['mode'] = 'categories';
                options['xaxis']['tickLength'] = 0;
            }
            series.push(serie);
        }
        $.plot(chart, series, options);
        container.removeClass('pie-chart');
        container.removeClass('table');
        return container;
    }
    /* given a dataset, make a scatter chart, append it to the container, and return the chart element */
    this.makeScatterChart = function(data, domainField, selectedAggregation, rangeFields, container) {
        var seriesMap = {}
        var minRangeVal, maxRangeVal, minDomainVal, maxDomainVal;
        for (i in data) {
            domainValue = data[i][domainField];
            minDomainVal = isNaN(domainValue) ? minDomainVal : Math.min(minDomainVal, Number(domainValue));
            maxDomainVal = isNaN(domainValue) ? maxDomainVal : Math.max(maxDomainVal, Number(domainValue));
            for (k in rangeFields) {
                rangeField = rangeFields[k];
                if (seriesMap[rangeField] == undefined)
                    seriesMap[rangeField] = [];
                rangeValue = data[i][rangeField];
                minRangeVal = isNaN(rangeValue) ? minRangeVal : Math.min(minRangeVal, Number(rangeValue));
                maxRangeVal = isNaN(rangeValue) ? maxRangeVal : Math.max(maxRangeVal, Number(rangeValue));
                seriesMap[rangeField].push([domainValue, rangeValue]);
            }
        }
        var chart = $('<div/>', {
            'class': 'chart-canvas'
        });
        // put a title over our chart...
        container.append($('<h1/>').text(domainField + " Vs " + rangeFields.join(" and ")));
        container.append(chart);
        var series = [];
        var options = {
            series: {
                points: {
                    show: true
                }
            },
            xaxis: {
                zoomRange: [0.1, maxDomainVal],
                panRange: [minDomainVal, maxDomainVal],
                aggregate: selectedAggregation
            },
            yaxis: {
                zoomRange: [0.1, maxRangeVal],
                panRange: [minRangeVal, maxRangeVal]
            },
            zoom: {
                interactive: true
            },
            pan: {
                interactive: true
            },
            grid: {
                hoverable: true
            },
            tooltip: {
                show: true,
                content: function(label, xval, yval, flotItem) {
                    return label + " | " + xval + " : " + yval;
                    // manually constructing this prevents the bug in tooltip plugin that breaks when there are multiple series. 
                }
            }
        }
        for (var o in seriesMap) {
            var seriesData = seriesMap[o];
            var isCategorical = checkIfDataIsCategorical(seriesData, function(v) {
                return String(v[0])
            }, 1);
            var serie = {
                color: randomColor({
                    luminosity: 'bright'
                }),
                data: seriesData,
                label: o
            };
            if (isCategorical) {
                options['xaxis']['mode'] = 'categories';
                options['xaxis']['tickLength'] = 0;
            }
            series.push(serie);
        }
        $.plot(chart, series, options);
        container.removeClass('pie-chart');
        container.removeClass('table');
        return container;
    }
    /* given a dataset, make a pie chart, append it to the container, and return the chart element */
    this.makePieChart = function(data, domainField, rangeFields, container) {
        var seriesMap = {}
        for (i in data) {
            domainValue = data[i][domainField];
            for (k in rangeFields) {
                rangeField = rangeFields[k];
                if (rangeField == domainField)
                    continue;if (seriesMap[rangeField] == undefined)
                    seriesMap[rangeField] = [];
                rangeValue = data[i][rangeField];
                seriesMap[rangeField].push({
                    color: randomColor({
                        luminosity: 'bright'
                    }),
                    label: domainValue,
                    data: rangeValue
                });
            }
        }
        var options = {
            series: {
                pie: {
                    show: true,
                    label: {
                        show: true,
                        radius: 3 / 4,
                        formatter: function(label, series) {
                            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" + label + "<br/>" + Math.round(series.percent) + "%</div>";
                        },
                        background: {
                            opacity: 0.5
                        }
                    }
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: {
                show: true,
                content: function(label, xval, yval, flotItem) {
                    return label + " : " + Math.round(flotItem.datapoint[0]) + "%";
                    // manually constructing this prevents the bug in tooltip plugin that breaks when there are multiple series. 
                }
            }
        }
        for (var rangeField in seriesMap) {
            var seriesData = seriesMap[rangeField];
            var chart = $('<div/>', {
                'class': 'chart-canvas'
            });
            // put a title over our chart...
            container.append($('<h1/>').text(domainField + " Vs " + rangeField));
            container.append(chart);
            $.plot(chart, seriesData, options);
        }
        container.addClass('pie-chart');
        container.removeClass('table');
        return container;
    }
    /* given an array of objects, return an analytics panel based off of them */
    this.makeAnalyticsPanel = function(data, labels, panelClass, exportCallback) {
        var panel = $('<div/>');
        if (panelClass)
            panel.addClass(panelClass);
        var sample = data[0];
        var fields = []
        for (i in sample) {
            fields.push(i);
        }
        // domain selector...
        var domainSelectorWidget = $('<div/>', {
            'class': 'domain-selector widget'
        });
        var label = $('<label/>').text(labels.domain);
        var domainSelector = $('<select/>', {
            'class': 'domain-selector'
        });
        for (i in fields) {
            domainSelector.append($('<option/>').text(fields[i]));
        }
        label.append(domainSelector)
        domainSelectorWidget.append(label);
        panel.append(domainSelectorWidget);
        // end domain selector
        // aggregation selector...
        var aggregationKinds = ['NONE', 'AVERAGE', 'SUM', 'COUNT', 'MINIMUM', 'MAXIMUM'];
        var aggregationSelectorWidget = $('<div/>', {
            'class': 'aggregation-selector widget'
        });
        var label = $('<label/>').text(labels.domainAggregation);
        var aggregationSelector = $('<select/>', {
            'class': 'aggregation-selector'
        });
        for (i in aggregationKinds) {
            aggregationSelector.append($('<option/>').text(aggregationKinds[i]));
        }
        label.append(aggregationSelector)
        aggregationSelectorWidget.append(label);
        panel.append(aggregationSelectorWidget);
        // end aggregation selector
        // range selector...
        var rangeSelectorWidget = $('<div/>', {
            'class': 'range-selector widget'
        });
        var label = $('<label/>').text(labels.range);
        var rangeSelector = $('<select/>', {
            'class': 'range-selector',
            'multiple': 'multiple'
        });
        for (i in fields) {
            rangeSelector.append($('<option/>').text(fields[i]));
        }
        label.append(rangeSelector)
        rangeSelectorWidget.append(label);
        panel.append(rangeSelectorWidget);
        // end range selector
        // rendering selector...
        var renderingKinds = ['TABLE', 'LINE', 'SCATTER', 'PIE', 'BAR', 'JSON'];
        var renderingSelectorWidget = $('<div/>', {
            'class': 'rendering-selector widget'
        });
        var label = $('<label/>').text(labels.renderAs);
        var renderingSelector = $('<select/>', {
            'class': 'rendering-selector'
        });
        for (i in renderingKinds) {
            renderingSelector.append($('<option/>').text(renderingKinds[i]));
        }
        label.append(renderingSelector)
        renderingSelectorWidget.append(label);
        panel.append(renderingSelectorWidget);
        // end range selector
        // rendering trigger...       
        var renderingTriggerWidget = $('<div/>', {
            'class': 'rendering-selector widget'
        });
        var renderingTriggerButton = $('<button/>', {
            'class': 'widget-button trigger'
        }).text(labels.renderVisuals);
        renderingTriggerWidget.append(renderingTriggerButton);
        panel.append(renderingTriggerWidget);
        // end rendering trigger
        // chart widget...       
        var chartWidget = $('<div/>', {
            'class': 'chart widget'
        });
        panel.append(chartWidget);
        // end chart widget
        // handle trigger event...
        renderingTriggerButton.click(function() {
            chartWidget.empty();
            var selectedDomain = domainSelector.val();
            var selectedRange = rangeSelector.val();
            var selectedRendering = renderingSelector.val();
            var selectedAggregation = aggregationSelector.val();
            var visualizationDataSet = stripDataSet(data, Array.isArray(selectedRange) ? selectedRange.concat(selectedDomain) : [selectedRange, selectedDomain]);
            switch (selectedRendering) {
            case 'TABLE':
                {
                    chartWidget.append(makeHTMLTable(aggregate(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation))));
                    chartWidget.addClass('table');
                    break;
                }
            case 'JSON':
                {
                    var json = JSON.stringify(aggregate(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation)), null , '\t');
                    var present = $('<pre/>', {
                        'class': ' language-javascript'
                    }).append($('<code/>', {
                        'class': 'language-javascript'
                    }).text(json));
                    chartWidget.append(present);
                    // prism will do the needful...
                    chartWidget.addClass('json');
                    setTimeout(function() {
                        Prism.highlightAll();
                    }, 3000);
                    break;
                }
            case 'LINE':
                {
                    makeLineChart(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation), Array.isArray(selectedRange) ? selectedRange : [selectedRange], chartWidget)
                    break;
                }
            case 'BAR':
                {
                    makeBarChart(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation), Array.isArray(selectedRange) ? selectedRange : [selectedRange], chartWidget)
                    break;
                }
            case 'SCATTER':
                {
                    makeScatterChart(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation), Array.isArray(selectedRange) ? selectedRange : [selectedRange], chartWidget)
                    break;
                }
            case 'PIE':
                {
                    makePieChart(aggregate(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation)), selectedDomain, Array.isArray(selectedRange) ? selectedRange : [selectedRange], chartWidget)
                    break;
                }
            }
        });
        // export trigger...       
        var exportTriggerWidget = $('<div/>', {
            'class': 'export-selector widget'
        });
        var exportTriggerButton = $('<button/>', {
            'class': 'export-button trigger'
        }).text(labels.exportVisuals);
        exportTriggerWidget.append(exportTriggerButton);
        panel.append(exportTriggerWidget);
        exportTriggerButton.click(function() {
            // get that drawn canvas, and export it...
            // as image user can save to disk
            html2canvas(chartWidget, {
                onrendered: function(canvas) {
                    canvas.toBlob(function(blob) {
                        if (exportCallback == undefined)
                            saveAs(blob, "chart-" + (new Date()).toISOString() + ".png");
                        else {
                            exportCallback(blob);
                        }
                    });
                }
            });
        });
        // end export trigger
        return panel;
    }
    this.aggregate = function(data, domainField, aggregationKind) {
        switch (aggregationKind) {
        case 'avg':
            {
                aggregateDataset = {}
                for (i in data) {
                    var record = data[i];
                    var domainValue = record[domainField];
                    if (aggregateDataset[domainValue] == undefined)
                        aggregateDataset[domainValue] = {}
                    for (field in record) {
                        var domainRangeFieldValues = aggregateDataset[domainValue];
                        if (field == domainField) {
                            domainRangeFieldValues[domainField] = domainValue;
                            continue;
                        }
                        if (domainRangeFieldValues[field] == undefined)
                            domainRangeFieldValues[field] = [];
                        domainRangeFieldValues[field].push(record[field]);
                    }
                }
                for (domainVal in aggregateDataset) {
                    var domainRangeFieldValues = aggregateDataset[domainVal];
                    for (rangeField in domainRangeFieldValues) {
                        if (rangeField == domainField)
                            continue;var rangeFieldValues = domainRangeFieldValues[rangeField];
                        try {
                            var sum = 0;
                            for (i in rangeFieldValues)
                                sum += rangeFieldValues[i];
                            var avg = sum / rangeFieldValues.length;
                            domainRangeFieldValues[rangeField] = avg;
                        } catch (e) {
                            domainRangeFieldValues[rangeField] = NaN;
                        }
                    }
                }
                aggregateDataset = _.values(aggregateDataset);
                return aggregateDataset;
            }
        case 'count':
            {
                aggregateDataset = {}
                for (i in data) {
                    var record = data[i];
                    var domainValue = record[domainField];
                    if (aggregateDataset[domainValue] == undefined)
                        aggregateDataset[domainValue] = {}
                    for (field in record) {
                        var domainRangeFieldValues = aggregateDataset[domainValue];
                        if (field == domainField) {
                            domainRangeFieldValues[domainField] = domainValue;
                            continue;
                        }
                        if (domainRangeFieldValues[field] == undefined)
                            domainRangeFieldValues[field] = [];
                        domainRangeFieldValues[field].push(record[field]);
                    }
                }
                for (domainVal in aggregateDataset) {
                    var domainRangeFieldValues = aggregateDataset[domainVal];
                    for (rangeField in domainRangeFieldValues) {
                        if (rangeField == domainField)
                            continue;domainRangeFieldValues[rangeField] = domainRangeFieldValues[rangeField].length;
                    }
                }
                aggregateDataset = _.values(aggregateDataset);
                return aggregateDataset;
            }
        case 'min':
            {
                aggregateDataset = {}
                for (i in data) {
                    var record = data[i];
                    var domainValue = record[domainField];
                    if (aggregateDataset[domainValue] == undefined)
                        aggregateDataset[domainValue] = {}
                    for (field in record) {
                        var domainRangeFieldValues = aggregateDataset[domainValue];
                        if (field == domainField) {
                            domainRangeFieldValues[domainField] = domainValue;
                            continue;
                        }
                        if (domainRangeFieldValues[field] == undefined)
                            domainRangeFieldValues[field] = [];
                        domainRangeFieldValues[field].push(record[field]);
                    }
                }
                for (domainVal in aggregateDataset) {
                    var domainRangeFieldValues = aggregateDataset[domainVal];
                    for (rangeField in domainRangeFieldValues) {
                        if (rangeField == domainField)
                            continue;domainRangeFieldValues[rangeField] = _.min(domainRangeFieldValues[rangeField]);
                    }
                }
                aggregateDataset = _.values(aggregateDataset);
                return aggregateDataset;
            }
        case 'max':
            {
                aggregateDataset = {}
                for (i in data) {
                    var record = data[i];
                    var domainValue = record[domainField];
                    if (aggregateDataset[domainValue] == undefined)
                        aggregateDataset[domainValue] = {}
                    for (field in record) {
                        var domainRangeFieldValues = aggregateDataset[domainValue];
                        if (field == domainField) {
                            domainRangeFieldValues[domainField] = domainValue;
                            continue;
                        }
                        if (domainRangeFieldValues[field] == undefined)
                            domainRangeFieldValues[field] = [];
                        domainRangeFieldValues[field].push(record[field]);
                    }
                }
                for (domainVal in aggregateDataset) {
                    var domainRangeFieldValues = aggregateDataset[domainVal];
                    for (rangeField in domainRangeFieldValues) {
                        if (rangeField == domainField)
                            continue;domainRangeFieldValues[rangeField] = _.max(domainRangeFieldValues[rangeField]);
                    }
                }
                aggregateDataset = _.values(aggregateDataset);
                return aggregateDataset;
            }
        case 'sum':
            {
                aggregateDataset = {}
                for (i in data) {
                    var record = data[i];
                    var domainValue = record[domainField];
                    if (aggregateDataset[domainValue] == undefined)
                        aggregateDataset[domainValue] = {}
                    for (field in record) {
                        var domainRangeFieldValues = aggregateDataset[domainValue];
                        if (field == domainField) {
                            domainRangeFieldValues[domainField] = domainValue;
                            continue;
                        }
                        if (domainRangeFieldValues[field] == undefined)
                            domainRangeFieldValues[field] = [];
                        domainRangeFieldValues[field].push(record[field]);
                    }
                }
                for (domainVal in aggregateDataset) {
                    var domainRangeFieldValues = aggregateDataset[domainVal];
                    for (rangeField in domainRangeFieldValues) {
                        if (rangeField == domainField)
                            continue;var rangeFieldValues = domainRangeFieldValues[rangeField];
                        try {
                            var sum = 0;
                            for (i in rangeFieldValues)
                                sum += isNaN(rangeFieldValues[i]) ? NaN : rangeFieldValues[i];
                            domainRangeFieldValues[rangeField] = sum;
                        } catch (e) {
                            domainRangeFieldValues[rangeField] = NaN;
                        }
                    }
                }
                aggregateDataset = _.values(aggregateDataset);
                return aggregateDataset;
            }
        default:
            return data;
        }
    }
    this.getFlotAggregator = function(aggregationName) {
        switch (aggregationName) {
        case 'AVERAGE':
            return 'avg';
        case 'COUNT':
            return 'count';
        case 'MINIMUM':
            return 'min';
        case 'MAXIMUM':
            return 'max';
        case 'SUM':
            return 'sum';
        default:
            return '';
        }
    }
    // given an array of objects, return another array of objects, where the orginal objects have been stripped of all fields
    // except those specified in the 'fields' parameter
    this.stripDataSet = function(data, fields) {
        var collection = [];
        for (i in data) {
            var o = {};
            for (f in data[i]) {
                if (fields.indexOf(f) >= 0)
                    o[f] = data[i][f];
            }
            collection.push(o);
        }
        return collection;
    }
    /* The Meliorator plugin... */
    Meliorator = function(action, options) {
        switch (action) {
            // action: table : take the given data, and render it into an html table, inside the selected elements 
        case 'table':
            {
                var op = {
                    // data : is REQUIRED : tells Meliorator where the data to work with,
                    // is to come from. It is expected to be an array of objects. 
                    data: options.data || undefined,
                    // tableClass: OPTIONAL : will be the class(es) that will be applied to the generated table(s)
                    tableClass: options.tableClass || 'table'
                }
                if (op.data == undefined)
                    break;
                if (!Array.isArray(op.data))
                    break
                if (op.data.length == 0)
                    break
                this.each(function() {
                    $(this).append(makeHTMLTable(op.data, op.tableClass))
                });
                break;
            }
            // action: parse-table: scan the tables in the given elements, and return them as arrays of objects
            // sort of does the reverse of action 'table'
        case 'parse-table':
            {
                var collection = []
                this.each(function() {
                    collection.push(htmlTableToObjectArray($(this)[0]));
                });
                return collection;
            }
            // takes an array of objects, and then renders an analytics panel for their visualization/exploration
            // in the selected container elements
        case 'analytics-panel':
            {
                var labels = options.labels == undefined ? {} : options.labels;
                var op = {
                    // data : is REQUIRED : tells Meliorator where the data to work with,
                    // is to come from. It is expected to be an array of objects. 
                    data: options.data || undefined,
                    // panelClass: OPTIONAL : will be the class(es) that will be applied to the generated panels(s)
                    panelClass: options.panelClass || 'analytics',
                    // labels : a mapping of keywords to alternative labels user might prefer to use for the widgets in the panel
                    labels: {
                        domain: labels.domain || 'Domain',
                        range: labels.range || 'Range',
                        domainAggregation: labels.domainAggregation || 'Domain Aggregation',
                        renderAs: labels.renderAs || 'Render As',
                        renderVisuals: labels.renderVisuals || 'Render Visuals',
                        exportVisuals: labels.exportVisuals || 'Export as Image'
                    },
                    // if defined, clicking the "export" button triggers the configured callback, passing it the analytics blob - this can then be posted to back-end, rendered elsewhere on the page, etc. If not set, export will automatically download the charts as image to client.
                    // the callback should be of the signature: function(blob){}
                    exportCallback: options.exportCallback
                }
                if (op.data == undefined)
                    break;
                if (!Array.isArray(op.data))
                    break
                if (op.data.length == 0)
                    break
                this.each(function() {
                    $(this).append(makeAnalyticsPanel(op.data, op.labels, op.panelClass, op.exportCallback))
                });
                break;
            }
        }
        return this;
    }
    $.fn.Meliorator = Meliorator;
})(jQuery)
