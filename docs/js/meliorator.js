/*
 HEAD.JS : the only script you need at the top of your js lib... ;-)
 http://headjs.com/
 We rely on this to dynamically get all the deps we need to make Meliorator work
 Could've used WebComponents, but damn, all experiments with that approach didn't seem to work fine.
 Head.Js solves all our troubles...
 */
/*! head.core - v1.0.2 */
(function(n, t) {
    "use strict";
    function r(n) {
        a[a.length] = n
    }
    function k(n) {
        var t = new RegExp(" ?\\b" + n + "\\b");
        c.className = c.className.replace(t, "")
    }
    function p(n, t) {
        for (var i = 0, r = n.length; i < r; i++)
            t.call(n, n[i], i)
    }
    function tt() {
        var t, e, f, o;
        c.className = c.className.replace(/ (w-|eq-|gt-|gte-|lt-|lte-|portrait|no-portrait|landscape|no-landscape)\d+/g, "");
        t = n.innerWidth || c.clientWidth;
        e = n.outerWidth || n.screen.width;
        u.screen.innerWidth = t;
        u.screen.outerWidth = e;
        r("w-" + t);
        p(i.screens, function(n) {
            t > n ? (i.screensCss.gt && r("gt-" + n),
            i.screensCss.gte && r("gte-" + n)) : t < n ? (i.screensCss.lt && r("lt-" + n),
            i.screensCss.lte && r("lte-" + n)) : t === n && (i.screensCss.lte && r("lte-" + n),
            i.screensCss.eq && r("e-q" + n),
            i.screensCss.gte && r("gte-" + n))
        });
        f = n.innerHeight || c.clientHeight;
        o = n.outerHeight || n.screen.height;
        u.screen.innerHeight = f;
        u.screen.outerHeight = o;
        u.feature("portrait", f > t);
        u.feature("landscape", f < t)
    }
    function it() {
        n.clearTimeout(b);
        b = n.setTimeout(tt, 50)
    }
    var y = n.document, rt = n.navigator, ut = n.location, c = y.documentElement, a = [], i = {
        screens: [240, 320, 480, 640, 768, 800, 1024, 1280, 1440, 1680, 1920],
        screensCss: {
            gt: !0,
            gte: !1,
            lt: !0,
            lte: !1,
            eq: !1
        },
        browsers: [{
            ie: {
                min: 6,
                max: 11
            }
        }],
        browserCss: {
            gt: !0,
            gte: !1,
            lt: !0,
            lte: !1,
            eq: !0
        },
        html5: !0,
        page: "-page",
        section: "-section",
        head: "head"
    }, v, u, s, w, o, h, l, d, f, g, nt, e, b;
    if (n.head_conf)
        for (v in n.head_conf)
            n.head_conf[v] !== t && (i[v] = n.head_conf[v]);
    u = n[i.head] = function() {
        u.ready.apply(null , arguments)
    }
    ;
    u.feature = function(n, t, i) {
        return n ? (Object.prototype.toString.call(t) === "[object Function]" && (t = t.call()),
        r((t ? "" : "no-") + n),
        u[n] = !!t,
        i || (k("no-" + n),
        k(n),
        u.feature()),
        u) : (c.className += " " + a.join(" "),
        a = [],
        u)
    }
    ;
    u.feature("js", !0);
    s = rt.userAgent.toLowerCase();
    w = /mobile|android|kindle|silk|midp|phone|(windows .+arm|touch)/.test(s);
    u.feature("mobile", w, !0);
    u.feature("desktop", !w, !0);
    s = /(chrome|firefox)[ \/]([\w.]+)/.exec(s) || /(iphone|ipad|ipod)(?:.*version)?[ \/]([\w.]+)/.exec(s) || /(android)(?:.*version)?[ \/]([\w.]+)/.exec(s) || /(webkit|opera)(?:.*version)?[ \/]([\w.]+)/.exec(s) || /(msie) ([\w.]+)/.exec(s) || /(trident).+rv:(\w.)+/.exec(s) || [];
    o = s[1];
    h = parseFloat(s[2]);
    switch (o) {
    case "msie":
    case "trident":
        o = "ie";
        h = y.documentMode || h;
        break;
    case "firefox":
        o = "ff";
        break;
    case "ipod":
    case "ipad":
    case "iphone":
        o = "ios";
        break;
    case "webkit":
        o = "safari"
    }
    for (u.browser = {
        name: o,
        version: h
    },
    u.browser[o] = !0,
    l = 0,
    d = i.browsers.length; l < d; l++)
        for (f in i.browsers[l])
            if (o === f)
                for (r(f),
                g = i.browsers[l][f].min,
                nt = i.browsers[l][f].max,
                e = g; e <= nt; e++)
                    h > e ? (i.browserCss.gt && r("gt-" + f + e),
                    i.browserCss.gte && r("gte-" + f + e)) : h < e ? (i.browserCss.lt && r("lt-" + f + e),
                    i.browserCss.lte && r("lte-" + f + e)) : h === e && (i.browserCss.lte && r("lte-" + f + e),
                    i.browserCss.eq && r("eq-" + f + e),
                    i.browserCss.gte && r("gte-" + f + e));
            else
                r("no-" + f);
    r(o);
    r(o + parseInt(h, 10));
    i.html5 && o === "ie" && h < 9 && p("abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|progress|section|summary|time|video".split("|"), function(n) {
        y.createElement(n)
    });
    p(ut.pathname.split("/"), function(n, u) {
        if (this.length > 2 && this[u + 1] !== t)
            u && r(this.slice(u, u + 1).join("-").toLowerCase() + i.section);
        else {
            var f = n || "index"
              , e = f.indexOf(".");
            e > 0 && (f = f.substring(0, e));
            c.id = f.toLowerCase() + i.page;
            u || r("root" + i.section)
        }
    });
    u.screen = {
        height: n.screen.height,
        width: n.screen.width
    };
    tt();
    b = 0;
    n.addEventListener ? n.addEventListener("resize", it, !1) : n.attachEvent("onresize", it)
})(window);
/*! head.css3 - v1.0.0 */
(function(n, t) {
    "use strict";
    function a(n) {
        for (var r in n)
            if (i[n[r]] !== t)
                return !0;
        return !1
    }
    function r(n) {
        var t = n.charAt(0).toUpperCase() + n.substr(1)
          , i = (n + " " + c.join(t + " ") + t).split(" ");
        return !!a(i)
    }
    var h = n.document
      , o = h.createElement("i")
      , i = o.style
      , s = " -o- -moz- -ms- -webkit- -khtml- ".split(" ")
      , c = "Webkit Moz O ms Khtml".split(" ")
      , l = n.head_conf && n.head_conf.head || "head"
      , u = n[l]
      , f = {
        gradient: function() {
            var n = "background-image:";
            return i.cssText = (n + s.join("gradient(linear,left top,right bottom,from(#9f9),to(#fff));" + n) + s.join("linear-gradient(left top,#eee,#fff);" + n)).slice(0, -n.length),
            !!i.backgroundImage
        },
        rgba: function() {
            return i.cssText = "background-color:rgba(0,0,0,0.5)",
            !!i.backgroundColor
        },
        opacity: function() {
            return o.style.opacity === ""
        },
        textshadow: function() {
            return i.textShadow === ""
        },
        multiplebgs: function() {
            i.cssText = "background:url(https://),url(https://),red url(https://)";
            var n = (i.background || "").match(/url/g);
            return Object.prototype.toString.call(n) === "[object Array]" && n.length === 3
        },
        boxshadow: function() {
            return r("boxShadow")
        },
        borderimage: function() {
            return r("borderImage")
        },
        borderradius: function() {
            return r("borderRadius")
        },
        cssreflections: function() {
            return r("boxReflect")
        },
        csstransforms: function() {
            return r("transform")
        },
        csstransitions: function() {
            return r("transition")
        },
        touch: function() {
            return "ontouchstart"in n
        },
        retina: function() {
            return n.devicePixelRatio > 1
        },
        fontface: function() {
            var t = u.browser.name
              , n = u.browser.version;
            switch (t) {
            case "ie":
                return n >= 9;
            case "chrome":
                return n >= 13;
            case "ff":
                return n >= 6;
            case "ios":
                return n >= 5;
            case "android":
                return !1;
            case "webkit":
                return n >= 5.1;
            case "opera":
                return n >= 10;
            default:
                return !1
            }
        }
    };
    for (var e in f)
        f[e] && u.feature(e, f[e].call(), !0);
    u.feature()
})(window);
/*! head.load - v1.0.3 */
(function(n, t) {
    "use strict";
    function w() {}
    function u(n, t) {
        if (n) {
            typeof n == "object" && (n = [].slice.call(n));
            for (var i = 0, r = n.length; i < r; i++)
                t.call(n, n[i], i)
        }
    }
    function it(n, i) {
        var r = Object.prototype.toString.call(i).slice(8, -1);
        return i !== t && i !== null && r === n
    }
    function s(n) {
        return it("Function", n)
    }
    function a(n) {
        return it("Array", n)
    }
    function et(n) {
        var i = n.split("/")
          , t = i[i.length - 1]
          , r = t.indexOf("?");
        return r !== -1 ? t.substring(0, r) : t
    }
    function f(n) {
        (n = n || w,
        n._done) || (n(),
        n._done = 1)
    }
    function ot(n, t, r, u) {
        var f = typeof n == "object" ? n : {
            test: n,
            success: !t ? !1 : a(t) ? t : [t],
            failure: !r ? !1 : a(r) ? r : [r],
            callback: u || w
        }
          , e = !!f.test;
        return e && !!f.success ? (f.success.push(f.callback),
        i.load.apply(null , f.success)) : e || !f.failure ? u() : (f.failure.push(f.callback),
        i.load.apply(null , f.failure)),
        i
    }
    function v(n) {
        var t = {}, i, r;
        if (typeof n == "object")
            for (i in n)
                !n[i] || (t = {
                    name: i,
                    url: n[i]
                });
        else
            t = {
                name: et(n),
                url: n
            };
        return (r = c[t.name],
        r && r.url === t.url) ? r : (c[t.name] = t,
        t)
    }
    function y(n) {
        n = n || c;
        for (var t in n)
            if (n.hasOwnProperty(t) && n[t].state !== l)
                return !1;
        return !0
    }
    function st(n) {
        n.state = ft;
        u(n.onpreload, function(n) {
            n.call()
        })
    }
    function ht(n) {
        n.state === t && (n.state = nt,
        n.onpreload = [],
        rt({
            url: n.url,
            type: "cache"
        }, function() {
            st(n)
        }))
    }
    function ct() {
        var n = arguments
          , t = n[n.length - 1]
          , r = [].slice.call(n, 1)
          , f = r[0];
        return (s(t) || (t = null ),
        a(n[0])) ? (n[0].push(t),
        i.load.apply(null , n[0]),
        i) : (f ? (u(r, function(n) {
            s(n) || !n || ht(v(n))
        }),
        b(v(n[0]), s(f) ? f : function() {
            i.load.apply(null , r)
        }
        )) : b(v(n[0])),
        i)
    }
    function lt() {
        var n = arguments
          , t = n[n.length - 1]
          , r = {};
        return (s(t) || (t = null ),
        a(n[0])) ? (n[0].push(t),
        i.load.apply(null , n[0]),
        i) : (u(n, function(n) {
            n !== t && (n = v(n),
            r[n.name] = n)
        }),
        u(n, function(n) {
            n !== t && (n = v(n),
            b(n, function() {
                y(r) && f(t)
            }))
        }),
        i)
    }
    function b(n, t) {
        if (t = t || w,
        n.state === l) {
            t();
            return
        }
        if (n.state === tt) {
            i.ready(n.name, t);
            return
        }
        if (n.state === nt) {
            n.onpreload.push(function() {
                b(n, t)
            });
            return
        }
        n.state = tt;
        rt(n, function() {
            n.state = l;
            t();
            u(h[n.name], function(n) {
                f(n)
            });
            o && y() && u(h.ALL, function(n) {
                f(n)
            })
        })
    }
    function at(n) {
        n = n || "";
        var t = n.split("?")[0].split(".");
        return t[t.length - 1].toLowerCase()
    }
    function rt(t, i) {
        function e(t) {
            t = t || n.event;
            u.onload = u.onreadystatechange = u.onerror = null ;
            i()
        }
        function o(f) {
            f = f || n.event;
            (f.type === "load" || /loaded|complete/.test(u.readyState) && (!r.documentMode || r.documentMode < 9)) && (n.clearTimeout(t.errorTimeout),
            n.clearTimeout(t.cssTimeout),
            u.onload = u.onreadystatechange = u.onerror = null ,
            i())
        }
        function s() {
            if (t.state !== l && t.cssRetries <= 20) {
                for (var i = 0, f = r.styleSheets.length; i < f; i++)
                    if (r.styleSheets[i].href === u.href) {
                        o({
                            type: "load"
                        });
                        return
                    }
                t.cssRetries++;
                t.cssTimeout = n.setTimeout(s, 250)
            }
        }
        var u, h, f;
        i = i || w;
        h = at(t.url);
        h === "css" ? (u = r.createElement("link"),
        u.type = "text/" + (t.type || "css"),
        u.rel = "stylesheet",
        u.href = t.url,
        t.cssRetries = 0,
        t.cssTimeout = n.setTimeout(s, 500)) : (u = r.createElement("script"),
        u.type = "text/" + (t.type || "javascript"),
        u.src = t.url);
        u.onload = u.onreadystatechange = o;
        u.onerror = e;
        u.async = !1;
        u.defer = !1;
        t.errorTimeout = n.setTimeout(function() {
            e({
                type: "timeout"
            })
        }, 7e3);
        f = r.head || r.getElementsByTagName("head")[0];
        f.insertBefore(u, f.lastChild)
    }
    function vt() {
        for (var t, u = r.getElementsByTagName("script"), n = 0, f = u.length; n < f; n++)
            if (t = u[n].getAttribute("data-headjs-load"),
            !!t) {
                i.load(t);
                return
            }
    }
    function yt(n, t) {
        var v, p, e;
        return n === r ? (o ? f(t) : d.push(t),
        i) : (s(n) && (t = n,
        n = "ALL"),
        a(n)) ? (v = {},
        u(n, function(n) {
            v[n] = c[n];
            i.ready(n, function() {
                y(v) && f(t)
            })
        }),
        i) : typeof n != "string" || !s(t) ? i : (p = c[n],
        p && p.state === l || n === "ALL" && y() && o) ? (f(t),
        i) : (e = h[n],
        e ? e.push(t) : e = h[n] = [t],
        i)
    }
    function e() {
        if (!r.body) {
            n.clearTimeout(i.readyTimeout);
            i.readyTimeout = n.setTimeout(e, 50);
            return
        }
        o || (o = !0,
        vt(),
        u(d, function(n) {
            f(n)
        }))
    }
    function k() {
        r.addEventListener ? (r.removeEventListener("DOMContentLoaded", k, !1),
        e()) : r.readyState === "complete" && (r.detachEvent("onreadystatechange", k),
        e())
    }
    var r = n.document, d = [], h = {}, c = {}, ut = "async"in r.createElement("script") || "MozAppearance"in r.documentElement.style || n.opera, o, g = n.head_conf && n.head_conf.head || "head", i = n[g] = n[g] || function() {
        i.ready.apply(null , arguments)
    }
    , nt = 1, ft = 2, tt = 3, l = 4, p;
    if (r.readyState === "complete")
        e();
    else if (r.addEventListener)
        r.addEventListener("DOMContentLoaded", k, !1),
        n.addEventListener("load", e, !1);
    else {
        r.attachEvent("onreadystatechange", k);
        n.attachEvent("onload", e);
        p = !1;
        try {
            p = !n.frameElement && r.documentElement
        } catch (wt) {}
        p && p.doScroll && function pt() {
            if (!o) {
                try {
                    p.doScroll("left")
                } catch (t) {
                    n.clearTimeout(i.readyTimeout);
                    i.readyTimeout = n.setTimeout(pt, 50);
                    return
                }
                e()
            }
        }()
    }
    i.load = i.js = ut ? lt : ct;
    i.test = ot;
    i.ready = yt;
    i.ready(r, function() {
        y() && u(h.ALL, function(n) {
            f(n)
        });
        i.feature && i.feature("domloaded", !0)
    })
})(window);
/*
//# sourceMappingURL=head.min.js.map
*/
/**
MELIORATOR: automatically inject analytics panel and dashboards into web pages.
Requires and includes dependencies of the Open Source Flot js Charting library 
*/
(function($) {
    this.MelioratorClass = 'meliorator';
    this.STORAGE_KEY_DASHBOARDS = "DASHBOARDS"
    this.isBin = function(cdata){
    	// so we can recognize embedded images for example...
        if (typeof cdata === 'string' || cdata instanceof String)
            return cdata.startsWith("data:") && cdata.length > 100;
        else
            return false;
    }
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
                var cell_data = record[headers[h]];
                if((cell_data != undefined) && isBin(cell_data)){
                    rtb.append($('<td/>', {
                        'class': headers[h]
                    }).append($('<iframe/>', {'src': cell_data, 'frameborder': 0, 'style': 'width:100%; height:200px'})));
                }else {
                    rtb.append($('<td/>', {
                        'class': headers[h]
                    }).text(cell_data));
                }
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


var LOBFUtils = {}; // to hold LOBF utils...

    LOBFUtils.makeLOBFDataset = function(datasetXY, labelY, labelX){

            var meanX = LOBFUtils.getAvX(datasetXY);
            var meanY = LOBFUtils.getAvY(datasetXY);
            var gradient = LOBFUtils.computeGradient(datasetXY, meanX, meanY);
            var yIntercept = LOBFUtils.computeYintercept(datasetXY, meanX, meanY);

            var lobfDataset = [];
            for(i in datasetXY){
                lobfDataset.push([datasetXY[i][0], yIntercept + datasetXY[i][0] * gradient]);
            }

            var sdX = LOBFUtils.standardDeviationX(datasetXY, meanX);
            var sdY = LOBFUtils.standardDeviationY(datasetXY, meanY);
            var covXY = LOBFUtils.covarianceXY(datasetXY, meanX, meanY);
            var ppmcXY = LOBFUtils.computePPMC(covXY, sdX, sdY);

            var interpretation = LOBFUtils.interpretPPMC(ppmcXY, labelX, labelY);

            // returns:
            /* [
            array of coordinates on the lobf line, 
            an equation for the lobf as a humane-string, 
            a function that can take y and return x, 
            a function that can take y and return x,
            sample standard deviation of x,
            sample standard deviation of y,
            Pearson correlation coefficient of X and Y,
            an interpretation of the coefficient value...
            ] */
            return [lobfDataset, 
            labelY +" = "+ yIntercept + " + "+ labelX +"*"+ gradient,
            function (x) {return (yIntercept + gradient * x);},
            function (y) {return ((y - yIntercept)/gradient);},
            sdX, sdY, ppmcXY, interpretation
            ]; 

    };


        LOBFUtils.getAvX = function (data){
	var sumX = 0;
	
	for(i=0; i< data.length; i++)
		sumX = sumX + data[i][0];
		
	var numberOfItems = data.length;
	return sumX / numberOfItems;
};

LOBFUtils.getAvY = function (data){
	var sumY = 0;
	
	for(i=0; i< data.length; i++)
		sumY = sumY + data[i][1];
		
	var numberOfItems = data.length;
	return sumY / numberOfItems;
};

// we also need a function that if given some number, n, returns the square of that number

LOBFUtils.square = function square(n){
	return n * n;
};

// then we'll need to find the gradient manifest

LOBFUtils.getGradient = function getGradient(data, avX, avY) {
	var den = 0;
	var num =0;
	for(i=0; i< data.length; i++) {
	 num = num + ((data[i][0] - avX) * (data[i][1] - avY));
	 den = den + LOBFUtils.square((data[i][0] - avX));
	 }
	return num / den;
};

// get gradient, m, of the line of best fit...
LOBFUtils.computeGradient = function(data,meanX,meanY){
    //var meanX = getAvX(data);
    //var meanY =getAvY(data);
var bestFitGradient = LOBFUtils.getGradient(data,meanX, meanY);
return bestFitGradient;
};

// this finds the y-intercept given slope and mean of X and Y
LOBFUtils.getYintercept = function getYintercept(grad, avX, avY){
	return avY - (avX * grad);
};

// get y-intercept, c, of the line of best fit...
LOBFUtils.computeYintercept = function(data,meanX, meanY){
    var bestFitGradient = LOBFUtils.getGradient(data,meanX, meanY);
    var yIntercept = LOBFUtils.getYintercept(bestFitGradient, meanX, meanY);
    return yIntercept;
};


// we'll need a function to compute the standard deviation of X and Y

LOBFUtils.standardDeviationX = function standardDeviationX(data, meanX){
	var _sum = 0;
	for(i=0; i< data.length; i++)
		_sum = _sum + LOBFUtils.square(data[i][0] - meanX);
	return Math.sqrt((1/(data.length - 1)) * _sum);
}
LOBFUtils.standardDeviationY = function(data, meanY){
	var _sum = 0;
	for(i=0; i< data.length; i++)
		_sum = _sum + LOBFUtils.square(data[i][1] - meanY);
	return Math.sqrt((1/(data.length - 1)) * _sum);
}

// we'll also need the covariance of the two variables...
LOBFUtils.covarianceXY = function(data, meanX, meanY){
	var _sum = 0;
	for(i=0; i< data.length; i++)
		_sum = _sum + ((data[i][0] - meanY) * (data[i][1] - meanY));
	// note that the difference btwn sample covariance and population covariance is that the later uses 1/n while the former uses 1/(n-1) in this expression
	return (1/(data.length - 1)) * _sum; 
}

// now we can compute the Pearson product-moment correlation coefficient (PPMCC) aka. Bivariate Correlation
LOBFUtils.computePPMC = function(covXY, sdX, sdY){
	return covXY / (sdX * sdY);
}

LOBFUtils.interpretPPMC = function(r, lX, lY) {
	if(r == 0){
		return lx + " and " + lY + " are not related";
	}else {
		var relStrength = Math.abs(r) >= 0.5 ? "and they are strongly related" : "but they are weakly related";
		if( r >0) {
			return "As " + lX + " increases " + lY + " also increases " + relStrength ;
		}else {
			return "As " + lX + " increases " + lY + " decreases " + relStrength;
		}
	}
}



    /* given a dataset, make a line chart with special line of best fit plot included... */
    this.makeLineOfBestFitChart = function(data, domainField, selectedAggregation, rangeFields, container, domainTransformer) {
        var seriesMap = {}
        var minRangeVal =0, maxRangeVal=0, minDomainVal=0, maxDomainVal=0, rangeField = rangeFields[0];
        for (i in data) {
            domainValue = domainTransformer==null? data[i][domainField] : domainTransformer(data[i][domainField]);
            minDomainVal = isNaN(domainValue) ? minDomainVal : Math.min(minDomainVal, Number(domainValue));
            maxDomainVal = isNaN(domainValue) ? maxDomainVal : Math.max(maxDomainVal, Number(domainValue));
            var rf = 1
            for (k in rangeFields) {
            	if(rf > 1) {
            		break; // we only handle a single range field for line of best fit.
            	}
                rangeField = rangeFields[k];
                if (seriesMap[rangeField] == undefined)
                    seriesMap[rangeField] = [];
                rangeValue = data[i][rangeField];
                minRangeVal = isNaN(rangeValue) ? minRangeVal : Math.min(minRangeVal, Number(rangeValue));
                maxRangeVal = isNaN(rangeValue) ? maxRangeVal : Math.max(maxRangeVal, Number(rangeValue));
                seriesMap[rangeField].push([domainValue, rangeValue]);
                rf += 1;
              
            }
        }
        var chart = $('<div/>', {
            'class': 'chart-canvas'
        });
        // put a title over our chart...
        container.append($('<h1/>').text(makeChartTitle(domainField, rangeFields)));
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
                aggregate: selectedAggregation,
                 axisLabel: domainField    
            },
            yaxis: {
                zoomRange: [0.1, maxRangeVal],
                panRange: [minRangeVal, maxRangeVal],
                axisLabel: rangeField 
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
             // returns:
            // [array of coordinates on the lobf line, an equation for the lobf as a humane-string, a function that can take y and return x, a function that can take y and return x]
            var lobfInfo = LOBFUtils.makeLOBFDataset(seriesData,rangeField, domainField);
            var lobfSerieData = lobfInfo[0]
            var isCategorical = checkIfDataIsCategorical(seriesData, function(v) {
                return String(v[0])
            }, 1);
            var serie = {
                color: randomColor({
                    luminosity: 'bright'
                }),
                data: seriesData,
                label: o,
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            };
            if (isCategorical) {
                options['xaxis']['mode'] = 'categories';
                options['xaxis']['tickLength'] = 0;
            }else {
                // add lobf series for this dataset...                
                var serieLOBF = {
                color: randomColor({
                    luminosity: 'dark'
                }),
                data: lobfSerieData,
                label: "LOBF: " + lobfInfo[1]
                };
                series.push(serieLOBF);
            }
            series.push(serie);
        }
        $.plot(chart, series, options);
        container.removeClass('pie-chart');
        container.removeClass('table');

        // we'll also add a mechanism to allow automated computing of domainValue given rangeValue and vise-versa...
        var rangeFVWidget = $('<input/>', {
            'placeholder': rangeField + " value?",
            'type': "number",
            'class': 'prediction-panel-widget'
        });
        var domainFVWidget = $('<input/>', {
            'placeholder': domainField + " value?",
            'type': "number",
            'class': 'prediction-panel-widget'
        });

        var correlationAnalysisPanel = $('<div/>', {
            'class': 'correlation-analysis-panel'
        }).html(
        "The sample standard deviation of " + domainField + " is <b>" + lobfInfo[4].toFixed(3)
        + "</b>, that of " + rangeField + " is <b>" + lobfInfo[5].toFixed(3) + "</b> and their correlation (PPMCC) is " + lobfInfo[6].toFixed(3)
        + ".<br/>Analyis shows that <b>" + lobfInfo[7] + "</b>");

        var predictionPanel = $('<div/>',{
            'class': 'prediction-panel',
        }).append(correlationAnalysisPanel, rangeFVWidget,domainFVWidget);
        
        // add some labels...
        $(rangeFVWidget).before($("<label/>").text(rangeField));
        $(domainFVWidget).before($("<label/>").text(domainField));
        // we want tht whenever the value in one is updated, we automatically compute the value in the other...
        var domainVXComputer = lobfInfo[2];
        var rangeVYComputer = lobfInfo[3];
        rangeFVWidget.change(function(){
            domainFVWidget.val(domainVXComputer(rangeFVWidget.val()));
        });
        domainFVWidget.change(function(){
            rangeFVWidget.val(rangeVYComputer(domainFVWidget.val()));
        });



        container.append(predictionPanel);

        return container;
    }
    /* given a dataset, make a line chart, append it to the container, and return the chart element */
    this.makeLineChart = function(data, domainField, selectedAggregation, rangeFields, container, domainTransformer) {
        var seriesMap = {}
        var minRangeVal =0, maxRangeVal=0, minDomainVal=0, maxDomainVal=0;
        for (i in data) {
            domainValue = domainTransformer==null? data[i][domainField] : domainTransformer(data[i][domainField]);
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
        container.append($('<h1/>').text(makeChartTitle(domainField, rangeFields)));
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
        var minRangeVal = 0, maxRangeVal= 0, minDomainVal=0, maxDomainVal=0;
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
        container.append($('<h1/>').text(makeChartTitle(domainField, rangeFields)));
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
                label: o,
                bars: {
                    lineWidth: 1,
                    barWidth: 0.2,
                    order: series.length // for ordering bars
                }
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
        var minRangeVal = 0, maxRangeVal=0, minDomainVal=0, maxDomainVal=0;
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
        container.append($('<h1/>').text(makeChartTitle(domainField, rangeFields)));
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
    this.makeChartTitle = function(domainField, rangeFields) {
        return domainField + (rangeFields == null ? "" : " Vs ") + (rangeFields || []).join(" and ");
    }
/* given an array of objects, return an analytics widget based off of them */
    this.makeAnalyticsWidget = function(data, selectedDomain, selectedDomainAggregation, selectedRange, selectedRendering, widgetClass) {
        var panel = $('<div/>');
        if (widgetClass)
            panel.addClass(widgetClass);
        panel.addClass(MelioratorClass);        

        // chart widget...       
        var chartWidget = $('<div/>', {
            'class': 'chart widget'
        });
        panel.append(chartWidget);
        // end chart widget.

        setTimeout(function(){
            renderVisual(data, chartWidget, selectedDomain, selectedRange, selectedDomainAggregation, selectedRendering, null);
        }, 0);        
     
        return panel;
    }

    /* given an array of objects, return an analytics panel based off of them */
    this.makeAnalyticsPanel = function(data, labels, panelClass, exportCallback) {
        var panel = $('<div/>');
        if (panelClass)
            panel.addClass(panelClass);
        panel.addClass(MelioratorClass);
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
        var renderingKinds = ['TABLE', 'POWER-TABLE', 'LINE', 'LINEBF', 'TIME-SERIES', 'SCATTER', 'PIE', 'BAR', 'JSON'];
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
            'class': 'rendering-trigger widget'
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
            renderVisual(data, chartWidget, selectedDomain, selectedRange, selectedAggregation, selectedRendering, labels);
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
    /* given an array of objects, return a dashboard building panel */
    this.makeDashboardPanel = function(data, labels, panelClass, exportCallback, addToDashboardCallback, showDashboardCallback, saveDashboardCallback) {
        // First, we make an analytics panel as usual...
        var panel = makeAnalyticsPanel(data, labels, panelClass, exportCallback);
        // we pick out things we'll need
        var domainSelector = $(panel).find('select.domain-selector');
        var aggregationSelector = $(panel).find('select.aggregation-selector');
        var rangeSelector = $(panel).find('select.range-selector');
        var renderingSelector = $(panel).find('select.rendering-selector');
        // then we adorn it with new features...
        // First, here's where we shall store our dashboard spec
        var dashboardSpec = [];
        // add to dashboard trigger...       
        var addTriggerWidget = $('<div/>', {
            'class': 'add-trigger widget'
        });
        var addToDashboardTriggerButton = $('<button/>', {
            'class': 'add-button trigger'
        }).text(labels.addDashboardPanel);
        addTriggerWidget.append(addToDashboardTriggerButton);
        panel.append(addTriggerWidget);
        addToDashboardTriggerButton.click(function() {
            // get current panel parameters, and add them to the dashboard specification
            var selectedDomain = domainSelector.val();
            var selectedRange = rangeSelector.val();
            var selectedRendering = renderingSelector.val();
            var selectedAggregation = aggregationSelector.val();
            var panelSpec = {
                'domain': selectedDomain,
                'series': selectedRange,
                'aggregation': selectedAggregation,
                'render': selectedRendering
            }
            dashboardSpec.push(panelSpec);
            if (addToDashboardCallback == undefined) {//alert("Current panel has been added to the dashboard. You may proceed to explore and specify another panel for the dashboard...")
            } else {
                addToDashboardCallback(panelSpec);
            }
            console.log(dashboardSpec);
        });
        // end export trigger
        // show dashboard trigger...       
        var showDashboardTriggerWidget = $('<div/>', {
            'class': 'show-dashboard-trigger widget'
        });
        var showDashboardTriggerButton = $('<button/>', {
            'class': 'show-dashboard-button trigger'
        }).text(labels.showDashboard);
        showDashboardTriggerWidget.append(showDashboardTriggerButton);
        panel.append(showDashboardTriggerWidget);
        showDashboardTriggerButton.click(function() {
            // get current dashboard spec, and render the dashboard in the analytics panel           
            if (showDashboardCallback == undefined) {
                var refreshDashboardCallback;
                var deleteDashboardPanelCallback = function(index, spec) {
                    // remove dashboard panel callback
                    dashboardSpec.splice(index, 1);
                    // beware of the recurssive step below...
                    renderDashboard(data, panelClass, {
                        "title": "Dashboard",
                        "spec": dashboardSpec
                    }, labels, deleteDashboardPanelCallback, refreshDashboardCallback, saveDashboardCallback);
                }
                refreshDashboardCallback = function() {
                    renderDashboard(data, panelClass, {
                        "title": "Dashboard",
                        "spec": dashboardSpec
                    }, labels, deleteDashboardPanelCallback, refreshDashboardCallback, saveDashboardCallback);
                }
                renderDashboard(data, panelClass, {
                    "title": "Dashboard",
                    "spec": dashboardSpec
                }, labels, deleteDashboardPanelCallback, refreshDashboardCallback, saveDashboardCallback);
            } else {
                showDashboardCallback(data, {
                    "title": "Dashboard",
                    "spec": dashboardSpec
                });
            }
        });
        // end trigger
        // if user specified handler for saving dashboards, then we don't need any of these features
        if ((saveDashboardCallback == undefined) || (saveDashboardCallback == null )) {
            // saved dashboard selector...
            var wrapperSavedDashboards = $('<span/>', {
                'class': 'saved-dashboard-wrapper'
            });
            panel.append(wrapperSavedDashboards);
            var handleSavedDashboards = function(labels) {
                window.labels = labels || window.labels;
                labels = window.labels;
                // not clean, but...
                wrapperSavedDashboards.empty();
                var savedDashboards = this.getsavedDashboards();
                if (savedDashboards != null ) {
                    var dashboardSelectorWidget = $('<div/>', {
                        'class': 'rendering-selector widget'
                    });
                    var dashboardSelector = $('<select/>', {
                        'class': 'rendering-selector'
                    });
                    for (i in savedDashboards) {
                        var dash = savedDashboards[i];
                        dashboardSelector.append($('<option/>', {
                            'value': i
                        }).text(dash.title));
                    }
                    dashboardSelectorWidget.append(dashboardSelector)
                    wrapperSavedDashboards.append(dashboardSelectorWidget);
                    // end  selector
                    // rendering saved dashboard...       
                    var dashboardTriggerWidget = $('<div/>', {
                        'class': 'show-saved-dashboard-trigger widget'
                    });
                    var dashboardTriggerButton = $('<button/>', {
                        'class': 'show-dashboard-button trigger'
                    }).text(labels.showSavedDashboard);
                    dashboardTriggerWidget.append(dashboardTriggerButton);
                    wrapperSavedDashboards.append(dashboardTriggerWidget);
                    dashboardTriggerButton.click(function() {
                        // get current selected saved dashboard spec, and render the dashboard in the analytics panel           
                        var activeDashboard = savedDashboards[Number(dashboardSelector.val())];
                        if (showDashboardCallback == undefined) {
                            var labels = $.extend(true, {}, window.labels);
                            labels.quitDashboard = '<< BACK';
                            var refreshDashboardCallback;
                            var deleteDashboardPanelCallback = function(index, spec) {
                                // remove dashboard panel callback
                                activeDashboard.spec.splice(index, 1);
                                // beware of the recurssive step below...
                                renderDashboard(data, panelClass, activeDashboard, labels, deleteDashboardPanelCallback, refreshDashboardCallback, saveDashboardCallback);
                            }
                            refreshDashboardCallback = function() {
                                renderDashboard(data, panelClass, activeDashboard, labels, deleteDashboardPanelCallback, refreshDashboardCallback, saveDashboardCallback);
                            }
                            renderDashboard(data, panelClass, activeDashboard, labels, deleteDashboardPanelCallback, refreshDashboardCallback, saveDashboardCallback);
                        } else {
                            showDashboardCallback(data, activeDashboard);
                        }
                    });
                    // end  trigger
                    // add to saved dashboard trigger     
                    var addTriggerWidget = $('<div/>', {
                        'class': 'add-to-dashboard-trigger widget'
                    });
                    var addTriggerButton = $('<button/>', {
                        'class': 'add-to-dashboard-button trigger',
                        'title': 'Add the current panel to the selected saved dashboard'
                    }).text("+");
                    addTriggerWidget.append(addTriggerButton);
                    wrapperSavedDashboards.append(addTriggerWidget);
                    addTriggerButton.click(function() {
                        // get current selected saved dashboard spec, and render the dashboard in the analytics panel
                        var specIndex = Number(dashboardSelector.val());
                        var activeDashboardSpec = savedDashboards[specIndex].spec;
                        // get current panel parameters, and add them to the dashboard specification
                        var selectedDomain = domainSelector.val();
                        var selectedRange = rangeSelector.val();
                        var selectedRendering = renderingSelector.val();
                        var selectedAggregation = aggregationSelector.val();
                        var panelSpec = {
                            'domain': selectedDomain,
                            'series': selectedRange,
                            'aggregation': selectedAggregation,
                            'render': selectedRendering
                        }
                        activeDashboardSpec.push(panelSpec);
                        console.log(activeDashboardSpec);
                        savedDashboards[specIndex].spec = activeDashboardSpec;
                        localStorage.setItem(STORAGE_KEY_DASHBOARDS, JSON.stringify(savedDashboards));
                    })
                    // end trigger
                    // delete trigger     
                    var deleteTriggerWidget = $('<div/>', {
                        'class': 'delete-saved-dashboard-trigger widget'
                    });
                    var deleteTriggerButton = $('<button/>', {
                        'class': 'delete-saved-dashboard-button trigger',
                        'title': 'Delete the selectd saved dashboard'
                    }).text("x");
                    deleteTriggerWidget.append(deleteTriggerButton);
                    wrapperSavedDashboards.append(deleteTriggerWidget);
                    deleteTriggerButton.click(function() {
                        // get current selected saved dashboard spec, and render the dashboard in the analytics panel           
                        savedDashboards.splice(Number(dashboardSelector.val()), 1);
                        localStorage.setItem(STORAGE_KEY_DASHBOARDS, savedDashboards.length > 0 ? JSON.stringify(savedDashboards) : null );
                        handleSavedDashboards();
                        // reload
                    })
                    // end trigger
                }
            }
            handleSavedDashboards(labels);
            // refresh trigger     
            var refreshTriggerWidget = $('<div/>', {
                'class': 'refresh-saved-dashboard-trigger widget'
            });
            var refreshTriggerButton = $('<button/>', {
                'class': 'refresh-saved-dashboard-button trigger',
                'title': 'Click to refresh saved dashboards'
            }).html("&#x7E");
            refreshTriggerWidget.append(refreshTriggerButton);
            panel.append(refreshTriggerWidget);
            refreshTriggerButton.click(function() {
                // reload saved dashboards
                handleSavedDashboards(labels);
            })
            // end trigger
        }
        return panel;
    }
    this.makeDashboard = function(data, dashboardSpec, labels, panelClass) {
        // First, we make an analytics panel as usual...
        //var panel = makeAnalyticsPanel(data, labels, panelClass);
        var panel = $('<div/>');
        if (panelClass)
            panel.addClass(panelClass);
        panel.addClass(MelioratorClass);
        var refreshDashboardCallback;
        refreshDashboardCallback = function() {
            renderDashboard(data, panelClass, dashboardSpec, labels, false, refreshDashboardCallback, false, panel, true);
        }
        setTimeout(function() {
            renderDashboard(data, panelClass, dashboardSpec, labels, false, refreshDashboardCallback, false, panel, true);
        }, 0);
        return panel;
    }
    this.getsavedDashboards = function() {
        var dashboards = localStorage.getItem(this.STORAGE_KEY_DASHBOARDS);
        if (dashboards == null ) {
            return null
        } else {
            dashboards = JSON.parse(dashboards);
            return dashboards;
        }
    }
    this.renderVisual = function(data, chartWidget, selectedDomain, selectedRange, selectedAggregation, selectedRendering,labels) {
        chartWidget.empty();
        var visualizationDataSet = stripDataSet(data, Array.isArray(selectedRange) ? selectedRange.concat(selectedDomain) : [selectedRange, selectedDomain]);
        switch (selectedRendering.toUpperCase()) {
        case 'TABLE':
            {
                chartWidget.append(makeHTMLTable(aggregate(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation))));
                chartWidget.addClass('table');
                break;
            }
        case 'POWER-TABLE':
            {
                var table = makeHTMLTable(aggregate(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation)));
                chartWidget.append(table);
                chartWidget.addClass('table');
                table.DataTable({
                    dom: 'Blfrtip',
                    aLengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
                    lengthChange: true,
                    buttons: ['copyHtml5', {
                        extend: 'csvHtml5',
                        filename: makeChartTitle(selectedDomain, selectedRange)
                    }, {
                        extend: 'pdfHtml5',
                        title: makeChartTitle(selectedDomain, selectedRange),
                        filename: makeChartTitle(selectedDomain, selectedRange),
                        orientation: labels.pdfExportOrientation || 'portrait'
                    }]
                })
                // then extend the table
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
            case 'LINEBF':
            {
                makeLineOfBestFitChart(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation), Array.isArray(selectedRange) ? selectedRange : [selectedRange], chartWidget)
                break;
            }
        case 'TIME-SERIES':
            {
                makeLineChart(visualizationDataSet, selectedDomain, getFlotAggregator(selectedAggregation), Array.isArray(selectedRange) ? selectedRange : [selectedRange], chartWidget, function(d){

                    return moment(d).toDate();
                })
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
    }
    // given a dashboard spec, render 
    this.renderDashboard = function(data, panelClass, dashboard, labels, removePanelCallback, refreshDashboardCallback, saveDashboardCallback, container, noBack) {
        var dashboardSpec = dashboard == undefined ? [] : dashboard.spec;
        var dashboardClass = panelClass + '-dashboard';
        var dashboardPanel = $('<div/>', {
            'class': MelioratorClass + ' ' + dashboardClass
        }).css({
            'display': 'flex',
            'flex-wrap': 'wrap'
        });
        // add dashboard title...
        var dashboardBanner = $('<div/>', {
            'class': 'widget dashboard-title ' + MelioratorClass + ' ' + dashboardClass
        }).text(dashboard.title || "Dashboard");
        if (container == undefined) {
            var analyticsPanel = $('.' + MelioratorClass + '.' + panelClass);
            // remove any prior dashboard compoents relative to this panel
            analyticsPanel.siblings('.' + MelioratorClass + '.' + dashboardClass).remove();
            // hide analytics panel
            analyticsPanel.hide();
            // insert the dashboard after the analytics panel            
            analyticsPanel.after(dashboardPanel);
            analyticsPanel.after(dashboardBanner);
        } else {
            // remove pre-existing dashboard components in this container
            container.find('.' + MelioratorClass + '.' + dashboardClass).remove();
            container.append(dashboardBanner);
            container.append(dashboardPanel);
        }
        var loadDashboardFunc = function() {
            dashboardPanel.find('.dashboard-widget').remove();
            //start adding things to the dashboard
            $.each(dashboardSpec, function(i, spec) {
                console.log(spec);
                // dashboard chart widget...       
                var chartWidget = $('<div/>', {
                    'class': 'dashboard-widget chart widget'
                });
                dashboardPanel.append(chartWidget);
                // end dashboard chart widget
                var selectedDomain = spec.domain;
                var selectedRange = spec.series;
                var selectedRendering = spec.render;
                var selectedAggregation = spec.aggregation;
                // add render the chart onto the dashboard...
                renderVisual(data, chartWidget, selectedDomain, selectedRange, selectedAggregation, selectedRendering,labels);
                if (removePanelCallback != false) {
                    var removePanelBtn = $('<button/>', {
                        'class': 'remove-panel-btn'
                    }).text(labels.removeDashboardPanel);
                    chartWidget.append($('<hr/>').css({
                        'margin': '5px',
                        'visibility': 'hidden'
                    }), removePanelBtn);
                    removePanelBtn.click(function() {
                        if (removePanelCallback == undefined) {
                            chartWidget.remove();
                        } else {
                            removePanelCallback(i, spec);
                        }
                    })
                }
            });
        }
        loadDashboardFunc();
        // show analytics panel trigger... 
        if (noBack != true) {
            var showDashboardTriggerWidget = $('<div/>', {
                'class': 'show-dashboard-selector dashboard-controller widget'
            });
            var showDashboardTriggerButton = $('<button/>', {
                'class': 'show-dashboard-button trigger'
            }).text(dashboardSpec.length > 0 ? labels.quitDashboard : "<< BACK");
            showDashboardTriggerWidget.append(showDashboardTriggerButton);
            dashboardPanel.append(showDashboardTriggerWidget);
            showDashboardTriggerButton.click(function() {
                dashboardBanner.hide();
                dashboardPanel.hide();
                analyticsPanel.show();
            });
        }
        // end trigger
        if (dashboardSpec.length > 0) {
            // refresh dashboard trigger...       
            var refreshDashboardTriggerWidget = $('<div/>', {
                'class': 'refresh-dashboard-selector dashboard-controller widget'
            });
            var refreshDashboardTriggerButton = $('<button/>', {
                'class': 'refresh-dashboard-button trigger'
            }).text(labels.refreshDashboard);
            refreshDashboardTriggerWidget.append(refreshDashboardTriggerButton);
            dashboardPanel.append(refreshDashboardTriggerWidget);
            refreshDashboardTriggerButton.click(function() {
                if (refreshDashboardCallback == undefined) {
                    loadDashboardFunc();
                    // merely re-drawing the panels
                } else {
                    refreshDashboardCallback();
                    // potential for refreshing with new data
                }
            });
            // end trigger
            // save dashboard trigger...   
            if (saveDashboardCallback != false) {
                var saveDashboardTriggerWidget = $('<div/>', {
                    'class': 'save-dashboard-selector dashboard-controller widget'
                });
                var savehDashboardTriggerButton = $('<button/>', {
                    'class': 'save-dashboard-button trigger'
                }).text(labels.saveDashboard);
                saveDashboardTriggerWidget.append(savehDashboardTriggerButton);
                dashboardPanel.append(saveDashboardTriggerWidget);
                savehDashboardTriggerButton.click(function() {
                    if (saveDashboardCallback == undefined) {
                        saveDashboard(dashboardSpec);
                    } else {
                        saveDashboardCallback(dashboardSpec);
                    }
                });
            }
            // end trigger
        }
    }
    this.saveDashboard = function(dashboardSpec) {
        var dashboards = localStorage.getItem(this.STORAGE_KEY_DASHBOARDS);
        if (dashboards == null ) {
            dashboards = [];
        } else {
            dashboards = JSON.parse(dashboards);
            if (dashboards == null )
                dashboards = [];
        }
        var timeStamp = (new Date()).toISOString();
        var autoDashboardName = "Dashboard-" + timeStamp;
        var thisDashboardName = prompt("Please set a name to help remember this Dashboard", autoDashboardName);
        if (thisDashboardName == null )
            thisDashboardName = autoDashboardName;
        dashboards.push({
            title: thisDashboardName,
            spec: dashboardSpec,
            timestamp: timeStamp
        })
        localStorage.setItem(STORAGE_KEY_DASHBOARDS, JSON.stringify(dashboards));
    }
    /* our aggregate implementation */
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
                                sum += (Number(rangeFieldValues[i]) || 0);
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
                                sum += isNaN(rangeFieldValues[i]) ? 0 : Number(rangeFieldValues[i]);
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
            // takes an array of objects, and then renders an analytics widget visualizing the data from the specified perspective
            // in the selected container elements
        case 'analytics-widget':
            {
                var labels = options.labels == undefined ? {} : options.labels;
                var op = {
                    // data : is REQUIRED : tells Meliorator where the data to work with,
                    // is to come from. It is expected to be an array of objects. 
                    data: options.data || undefined,
                    // panelClass: OPTIONAL : will be the class(es) that will be applied to the generated panels(s)
                    widgetClass: options.widgetClass || 'analytics-widget',
                    domainField:  options.domainField, /*REQUIRED*/
                    rangeField:  options.rangeField, /*REQUIRED*/
                    domainAggregation: options.domainAggregation || 'none',
                    renderAs: options.renderAs /*REQUIRED*/    
               
                }
                if (op.data == undefined)
                    break;
                if (!Array.isArray(op.data))
                    break
                if (op.data.length == 0)
                    break
                if (op.renderAs == undefined)
                    break;
                if (op.domainField == undefined)
                    break;
                if (op.rangeField == undefined)
                    break;
                

                this.each(function() {
                    $(this).append(makeAnalyticsWidget(op.data, op.domainField, op.domainAggregation, op.rangeField, op.renderAs, op.widgetClass))
                });
                break;
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
                        exportVisuals: labels.exportVisuals || 'Export as Image',
                        pdfExportOrientation: labels.pdfExportOrientation || 'portrait'
                    },
                    // if defined, clicking the "export" button triggers the configured callback, passing it the analytics blob - this can then be posted to back-end, rendered elsewhere on the page, etc. If not set, export will automatically download the charts as image to client.
                    // the callback should be of the signature: function(blob){}
                    exportCallback: options.exportCallback,
                    // the client might want to render the dashboard themselves and this action is triggered.
                    // for this, a callback can be defined, that is of the signature: function(panel)
                    showDashboardCallback: options.showDashboardCallback,
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
        case 'dashboard-panel':
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
                        exportVisuals: labels.exportVisuals || 'Export as Image',
                        addDashboardPanel: labels.addDashboardPanel || 'Add to Dashboard',
                        showDashboard: labels.showDashboard || 'Show Dashboard >>',
                        quitDashboard: labels.quitDashboard || '<< Add More Panels',
                        refreshDashboard: labels.refreshDashboard || "REFRESH Dashboard",
                        removeDashboardPanel: labels.removeDashboardPanel || "delete",
                        saveDashboard: labels.saveDashboard || "SAVE Dashboard",
                        showSavedDashboard: labels.showSavedDashboard || "Show Saved Dashboard >>",
                        pdfExportOrientation: labels.pdfExportOrientation || 'portrait'
                    },
                    // if defined, clicking the "add to dashboard" button triggers the configured callback, passing it an obj containing the user-selected parameters
                    // specifying the currently displayed panel. 
                    // - this could be saved elsewhere, to allow to render this kind of panel using these parameters later...
                    // the callback should be of the signature: function(data, dashboardSpec)
                    addToDashboardCallback: options.addToDashboardCallback,
                    // this callback allows something - perhaps rendering of the dashboard,
                    // to be done, when user triggers this action. callback signature takes dashboard spec
                    // function(dashboardSpec)
                    showDashboardCallback: options.showDashboardCallback,
                    // if specified, then when user requests to have the designed dashboard saved
                    // this callback is invoked with the current dashboard spec. 
                    // the callback signature should be: function(dashboardSpec)
                    saveDashboardCallback: options.saveDashboardCallback
                }
                if (op.data == undefined)
                    break;
                if (!Array.isArray(op.data))
                    break
                if (op.data.length == 0)
                    break
                this.each(function() {
                    $(this).append(makeDashboardPanel(op.data, op.labels, op.panelClass, op.exportCallback, op.addToDashboardCallback, op.showDashboardCallback, op.saveDashboardCallback))
                });
                break;
            }
        case 'dashboard':
            {
                var labels = options.labels == undefined ? {} : options.labels;
                var op = {
                    // data : is REQUIRED : tells Meliorator where the data to work with,
                    // is to come from. It is expected to be an array of objects. 
                    data: options.data || undefined,
                    // the dashboardSpec : is REQUIRED : this specifies how the dashboard is to be rendered
                    dashboardSpec: options.dashboardSpec || undefined,
                    // panelClass: OPTIONAL : will be the class(es) that will be applied to the generated panels(s)
                    panelClass: options.panelClass || 'analytics',
                    // labels : a mapping of keywords to alternative labels user might prefer to use for the widgets in the panel
                    labels: {
                        domain: labels.domain || 'Domain',
                        range: labels.range || 'Range',
                        domainAggregation: labels.domainAggregation || 'Domain Aggregation',
                        renderAs: labels.renderAs || 'Render As',
                        renderVisuals: labels.renderVisuals || 'Render Visuals',
                        exportVisuals: labels.exportVisuals || 'Export as Image',
                        addDashboardPanel: labels.addDashboardPanel || 'Add to Dashboard',
                        showDashboard: labels.showDashboard || 'Show Dashboard >>',
                        quitDashboard: labels.quitDashboard || '<< Add More Panels',
                        refreshDashboard: labels.refreshDashboard || "REFRESH Dashboard",
                        removeDashboardPanel: labels.removeDashboardPanel || "delete",
                        saveDashboard: labels.saveDashboard || "SAVE Dashboard",
                        showSavedDashboard: labels.showSavedDashboard || "Show Saved Dashboard >>",
                        pdfExportOrientation: labels.pdfExportOrientation || 'portrait'
                    }
                }
                if (op.data == undefined)
                    break;
                if (!Array.isArray(op.data))
                    break
                if (op.data.length == 0)
                    break
                if (op.dashboardSpec == undefined)
                    break;
                this.each(function() {
                    $(this).append(makeDashboard(op.data, op.dashboardSpec, op.labels, op.panelClass))
                });
                break;
            }
        }
        return this;
    }
    $.fn.Meliorator = Meliorator;
})(jQuery)

// the page using meliorator should override this global var to point to a reasonable
// place where meliorator would find its dynamically loaded resources - e.g meliorator.css
// if you have hosted the whole of meliorator's dependencies: js,css,vendor relative to this
// script and the containing page, you don't have have to set this, otherwise set it...
if(window.MelioratorBaseURI == undefined){
    //meaning, meliorator content will be loaded relative to the top-level domain
    window.MelioratorBaseURI = ''; 
}

head.load([// our own css
window.MelioratorBaseURI + "css/meliorator.css", /* Jquery.event.drag */
window.MelioratorBaseURI + "vendor/js/jquery.event.drag.min.js", /* JQuery.color.helper */
window.MelioratorBaseURI + "vendor/js/jquery.colorhelpers.min.js", /* Jquery.mousewheel */
window.MelioratorBaseURI + "vendor/js/jquery.mousewheel.min.js", /* Jquery.resize */
window.MelioratorBaseURI + "vendor/js/jquery.resize.min.js", //We definitely need Flot.
"https://cdnjs.cloudflare.com/ajax/libs/flot/0.8.3/jquery.flot.min.js", /* Flot.Categories */
window.MelioratorBaseURI + "vendor/js/flot.categories.min.js", /* Flot.navigate */
window.MelioratorBaseURI + "vendor/js/flot.navigate.min.js", /* Flot.pie */
window.MelioratorBaseURI + "vendor/js/flot.pie.min.js", /* Flot.resize */
window.MelioratorBaseURI + "vendor/js/flot.resize.min.js", /* Flot.aggregate */
window.MelioratorBaseURI + "vendor/js/flot.aggregate.min.js", /* Flot.tooltip */
window.MelioratorBaseURI + "vendor/js/flot.tooltip.min.js", /* Flot Orderbars */
window.MelioratorBaseURI + "vendor/js/jquery.flot.axislabels.js", /* Flot Axis Labels */
window.MelioratorBaseURI + "vendor/js/flot.orderbars.min.js", // we need underscore
"https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js", // HTML2Canvas
"https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js", /* Canvas2Blob */
window.MelioratorBaseURI + "vendor/js/canvas2blob.min.js", /* File Saver */
"https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.3/FileSaver.min.js", /* Prism */
window.MelioratorBaseURI + "vendor/css/prism.css", // prism.css
window.MelioratorBaseURI + "vendor/js/prism.js", /* RandomColor */
window.MelioratorBaseURI + "vendor/js/moment.min.js", /* Moment */
"https://cdnjs.cloudflare.com/ajax/libs/randomcolor/0.4.4/randomColor.min.js", // stuff to power the POWER-TABLE rendering (data tables and all...)
"https://cdn.datatables.net/1.10.12/js/jquery.dataTables.min.js", 
"https://cdn.datatables.net/buttons/1.2.2/js/dataTables.buttons.min.js", 
"https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/pdfmake.min.js", 
"https://cdn.datatables.net/buttons/1.2.2/js/buttons.html5.min.js", 
"https://cdn.rawgit.com/bpampuch/pdfmake/0.1.18/build/vfs_fonts.js", 
"https://cdn.datatables.net/1.10.12/css/jquery.dataTables.min.css", 
"https://cdn.datatables.net/buttons/1.2.2/css/buttons.dataTables.min.css"], function() {
    $(document).trigger('Meliorator-Ready');
    console.log("Meliorator is all ready now...");
});
