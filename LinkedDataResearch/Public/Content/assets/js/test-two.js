/*
Resource bundle created by Combinator (http://combinator.codeplex.com/)

Resources in this bundle:
- http://beta.nice.org.uk/Modules/Orchard.jQuery/scripts/jquery-1.10.2.min.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/tabdrop/bootstrap-tabdrop.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/nice/NICE.TabDrop.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/history/history.min.js
- http://beta.nice.org.uk/Modules/NICE.WebCore/scripts/CookieCheck.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/niceorg/NICE.EventTracking.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/owl.carousel/owl.carousel.min.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/nice/NICE.carousel.js
- http://beta.nice.org.uk/Themes/NICE.Bootstrap/scripts/niceorg/NICE.carousel.in.content.js
*/


! function (a) {
    var c = (function () {
        var f = [];
        var d = false;
        var h;
        var g = function (i) {
            clearTimeout(h);
            h = setTimeout(e, 100)
        };
        var e = function () {
            for (var k = 0, j = f.length; k < j; k++) {
                f[k].apply()
            }
        };
        return {
            register: function (i) {
                f.push(i);
                if (d === false) {
                    a(window).bind("resize", g);
                    d = true
                }
            },
            unregister: function (k) {
                for (var l = 0, j = f.length; l < j; l++) {
                    if (f[l] == k) {
                        delete f[l];
                        break
                    }
                }
            }
        }
    }());
    var b = function (d, e) {
        this.element = a(d);
        this.dropdown = a('<li class="dropdown hide pull-right tabdrop"><a class="dropdown-toggle" data-toggle="dropdown" href="#">' + e.text + ' <b class="caret"></b></a><ul class="dropdown-menu"></ul></li>').prependTo(this.element);
        if (this.element.parent().is(".tabs-below")) {
            this.dropdown.addClass("dropup")
        }
        c.register(a.proxy(this.layout, this));
        this.layout()
    };
    b.prototype = {
        constructor: b,
        layout: function () {
            var g = function (m, n) {
                var l = [];
                n.each(function () {
                    if (this.offsetTop > m) {
                        l.push(this)
                    }
                });
                return l
            };
            this.dropdown.removeClass("hide");
            var f = 0;
            var e = false;
            var d = false;
            var j = this.element.append(this.dropdown.find("li")).find(">li").not(".tabdrop").each(function () {
                if (!e) {
                    f = this.offsetTop;
                    e = true
                }
            });
            j.removeClass("reduced-width");
            var k = g(f, j);
            for (var i = j.length - 1; i >= 0 && k.length > 0; i--) {
                var h = j[i];
                if (!a(h).hasClass("reduced-width")) {
                    a(h).addClass("reduced-width")
                }
                k = g(f, j)
            }
            if (k.length > 0) {
                k = a(k);
                this.dropdown.find("ul").empty().append(k);
                k.removeClass("reduced-width");
                if (this.dropdown.find(".active").length == 1) {
                    this.dropdown.addClass("active")
                } else {
                    this.dropdown.find(".active").removeClass("active")
                }
            } else {
                this.dropdown.addClass("hide")
            }
        }
    };
    a.fn.tabdrop = function (d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("tabdrop"),
                g = typeof d === "object" && d;
            if (!f) {
                e.data("tabdrop", (f = new b(this, a.extend({}, a.fn.tabdrop.defaults, g))))
            }
            if (typeof d == "string") {
                f[d]()
            }
        })
    };
    a.fn.tabdrop.defaults = {
        text: '<i class="icon-align-justify"></i>'
    };
    a.fn.tabdrop.Constructor = b
}(window.jQuery);


$(document).ready(function () {
    setTimeout(function () {
        $('[data-provide="tab-drop"]').each(function () {
            $(this).tabdrop({
                text: ""
            })
        })
    }, 1000)
});


(function (e) {
    var h = !0,
        j = null,
        n = !1;

    function K() {}

    function i(a, b, c) {
        if (a && !b) {
            var b = i(),
                c = b.e,
                e = b.h,
                a = /^(?:[\w0-9]+\:)?\/\//.test(a) ? 0 === a.indexOf("/") ? e + a : a : e + "//" + b.g + (0 === a.indexOf("/") ? a : 0 === a.indexOf("?") ? c + a : 0 === a.indexOf("#") ? c + b.f + a : c.replace(/[^\/]+$/g, "") + a)
        } else {
            if (a = b ? a : d.href, !q || c) {
                a = a.replace(/^[^#]*/, "") || "#", a = d.protocol + "//" + d.host + m.basepath + a.replace(RegExp("^#[/]?(?:" + m.type + ")?"), "")
            }
        }
        P.href = a;
        var a = /(?:([\w0-9]+:))?(?:\/\/(?:[^@]*@)?([^\/:\?#]+)(?::([0-9]+))?)?([^\?#]*)(?:(\?[^#]+)|\?)?(?:(#.*))?/.exec(P.href),
            b = a[2] + (a[3] ? ":" + a[3] : ""),
            c = a[4] || "/",
            e = a[5] || "",
            g = "#" === a[6] ? "" : a[6] || "",
            o = c + e + g,
            u = c.replace(RegExp("^" + m.basepath, "i"), m.type) + e;
        return {
            a: a[1] + "//" + b + o,
            h: a[1],
            g: b,
            i: a[2],
            k: a[3] || "",
            e: c,
            f: e,
            b: g,
            c: o,
            j: u,
            d: u + g
        }
    }

    function Z(a) {
        var b = "";
        if (E) {
            b += E.getItem(F)
        } else {
            var c = l.cookie.split(F + "=");
            1 < c.length && (b += c.pop().split(";").shift() || "null")
        }
        try {
            r = a.parse(b) || {}
        } catch (e) {
            r = {}
        }
        v(w + "unload", function () {
            if (E) {
                E.setItem(F, a.stringify(r))
            } else {
                var b = {};
                if (b[d.href] = f.state) {
                    l.cookie = F + "=" + a.stringify(b)
                }
            }
        }, n)
    }

    function x(a, b, c, k) {
        var c = c || {
                set: K
            },
            g = !c.set,
            d = !c.get,
            u = {
                configurable: h,
                set: function () {
                    g = 1
                },
                get: function () {
                    d = 1
                }
            };
        try {
            C(a, b, u), a[b] = a[b], C(a, b, c)
        } catch (fa) {}
        if (!g || !d) {
            if (a.__defineGetter__ && (a.__defineGetter__(b, u.get), a.__defineSetter__(b, u.set), a[b] = a[b], c.get && a.__defineGetter__(b, c.get), c.set && a.__defineSetter__(b, c.set)), (!g || !d) && a === e) {
                try {
                    var $ = a[b];
                    a[b] = j
                } catch (ga) {}
                if ("execScript" in e) {
                    e.execScript("Public " + b, "VBScript")
                } else {
                    try {
                        C(a, b, {
                            value: K
                        })
                    } catch (i) {}
                }
                a[b] = $
            } else {
                if (!g || !d) {
                    try {
                        try {
                            var y = G.create(a);
                            C(G.getPrototypeOf(y) === a ? y : a, b, c);
                            for (var f in a) {
                                "function" === typeof a[f] && (y[f] = a[f].bind(a))
                            }
                            try {
                                k.call(y, y, a)
                            } catch (l) {}
                            a = y
                        } catch (m) {
                            C(a.constructor.prototype, b, c)
                        }
                    } catch (p) {
                        return n
                    }
                }
            }
        }
        return a
    }

    function aa(a, b, c) {
        c = c || {};
        a = a === L ? d : a;
        c.set = c.set || function (c) {
            a[b] = c
        };
        c.get = c.get || function () {
            return a[b]
        };
        return c
    }

    function H(a, b) {
        var c = ("" + ("string" === typeof a ? a : a.type)).replace(/^on/, ""),
            d = z[c];
        if (d) {
            b = "string" === typeof a ? b : a;
            if (b.target == j) {
                for (var g = ["target", "currentTarget", "srcElement", "type"]; a = g.pop();) {
                    b = x(b, a, {
                        get: "type" === a ? function () {
                            return c
                        } : function () {
                            return e
                        }
                    })
                }
            }(("popstate" === c ? e.onpopstate : e.onhashchange) || K).call(e, b);
            for (var g = 0, f = d.length; g < f; g++) {
                d[g].call(e, b)
            }
            return h
        }
        return ba(a, b)
    }

    function Q() {
        var a = l.createEvent ? l.createEvent("Event") : l.createEventObject();
        a.initEvent ? a.initEvent("popstate", n, n) : a.type = "popstate";
        a.state = f.state;
        H(a)
    }

    function s(a, b, c, e) {
        q || (b = i(b), b.c !== i().c && (A = e, c ? d.replace("#" + b.d) : d.hash = b.d));
        !I && a && (r[d.href] = a);
        D = n
    }

    function M(a) {
        if (A) {
            R !== d.href && Q();
            var a = a || e.event,
                b = i(A, h),
                c = i();
            a.oldURL || (a.oldURL = b.a, a.newURL = c.a);
            b.b !== c.b && H(a)
        }
        A = d.href
    }

    function S(a) {
        setTimeout(function () {
            v("popstate", function (a) {
                R = d.href;
                I || (a = x(a, "state", {
                    get: function () {
                        return f.state
                    }
                }));
                H(a)
            }, n)
        }, 0);
        !q && a !== h && f.location && (T(f.location.hash), D && (D = n, Q()))
    }

    function ca(a) {
        var a = a || e.event,
            b = a.target || a.srcElement,
            c = "defaultPrevented" in a ? a.defaultPrevented : a.returnValue === n;
        b && "A" === b.nodeName && !c && (c = i(), b = i(b.getAttribute("href", 2)), c.a.split("#").shift() === b.a.split("#").shift() && (c.b !== b.b && (f.location.hash = b.b), T(b.b), a.preventDefault ? a.preventDefault() : a.returnValue = n))
    }

    function T(a) {
        var b = l.getElementById(a = (a || "").replace(/^#/, ""));
        b && b.id === a && "A" === b.nodeName && (a = b.getBoundingClientRect(), e.scrollTo(J.scrollLeft || 0, a.top + (J.scrollTop || 0) - (J.clientTop || 0)))
    }

    function da() {
        function a(a) {
            var b = [],
                d = "VBHistoryClass" + (new Date).getTime() + c++,
                g = ["Class " + d],
                f;
            for (f in a) {
                if (a.hasOwnProperty(f)) {
                    var k = a[f];
                    k && (k.get || k.set) ? (k.get && g.push("Public " + ("_" === f ? "Default " : "") + "Property Get [" + f + "]", "Call VBCVal([(accessors)].[" + f + "].get.call(me),[" + f + "])", "End Property"), k.set && g.push("Public Property Let [" + f + "](val)", k = "Call [(accessors)].[" + f + "].set.call(me,val)\nEnd Property", "Public Property Set [" + f + "](val)", k)) : (b.push(f), g.push("Public [" + f + "]"))
                }
            }
            g.push("Private [(accessors)]", "Private Sub Class_Initialize()", "Set [(accessors)]=" + d + "FactoryJS()", "End Sub", "End Class", "Function " + d + "Factory()", "Set " + d + "Factory=New " + d, "End Function");
            e.execScript(g.join("\n"), "VBScript");
            e[d + "FactoryJS"] = function () {
                return a
            };
            d = e[d + "Factory"]();
            for (g = 0; g < b.length; g++) {
                d[b[g]] = a[b[g]]
            }
            return d
        }

        function b(a) {
            var b = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
                c = {
                    "\u0008": "\\b",
                    "\t": "\\t",
                    "\n": "\\n",
                    "\u000c": "\\f",
                    "\r": "\\r",
                    '"': '\\"',
                    "\\": "\\\\"
                };
            return b.test(a) ? '"' + a.replace(b, function (a) {
                return a in c ? c[a] : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
            }) + '"' : '"' + a + '"'
        }
        var c = e.eval && eval("/*@cc_on 1;@*/");
        if (c && !(7 < +(/msie (\d+)/i.exec(navigator.userAgent) || [, 8])[1])) {
            var k = x,
                g = i().a,
                o = l.createElement("iframe");
            o.src = "javascript:true;";
            o = J.firstChild.appendChild(o).contentWindow;
            e.execScript("Public history\nFunction VBCVal(o,r) If IsObject(o) Then Set r=o Else r=o End If End Function", "VBScript");
            t = {
                _: {
                    get: L.toString
                }
            };
            f = {
                back: p.back,
                forward: p.forward,
                go: p.go,
                emulate: j,
                _: {
                    get: function () {
                        return "[object History]"
                    }
                }
            };
            B = {
                parse: function (a) {
                    try {
                        return (new Function("", "return " + a))()
                    } catch (b) {
                        return j
                    }
                },
                stringify: function (a) {
                    var c = (typeof a).charCodeAt(2);
                    if (114 === c) {
                        a = b(a)
                    } else {
                        if (109 === c) {
                            a = isFinite(a) ? "" + a : "null"
                        } else {
                            if (111 === c || 108 === c) {
                                a = "" + a
                            } else {
                                if (106 === c) {
                                    if (a) {
                                        var e = (c = "[object Array]" === G.prototype.toString.call(a)) ? "[" : "{";
                                        if (c) {
                                            for (var d = 0; d < a.length; d++) {
                                                e += (0 == d ? "" : ",") + B.stringify(a[d])
                                            }
                                        } else {
                                            for (d in a) {
                                                a.hasOwnProperty(d) && (e += (1 == e.length ? "" : ",") + b(d) + ":" + B.stringify(a[d]))
                                            }
                                        }
                                        a = e + (c ? "]" : "}")
                                    } else {
                                        a = "null"
                                    }
                                } else {
                                    a = "void 0"
                                }
                            }
                        }
                    }
                    return a
                }
            };
            s = function (a, b, c, e, f) {
                var k = o.document,
                    b = i(b);
                D = n;
                if (b.c === i().c && !f) {
                    a && (r[d.href] = a)
                } else {
                    A = e;
                    if (c) {
                        o.lfirst ? (history.back(), s(a, b.a, 0, e, 1)) : d.replace("#" + b.d)
                    } else {
                        if (b.a != g || f) {
                            o.lfirst || (o.lfirst = 1, s(a, g, 0, e, 1)), k.open(), k.write('<script>lfirst=1;parent.location.hash="' + b.d.replace(/"/g, '\\"') + '";</script>'), k.close()
                        }
                    }!f && a && (r[d.href] = a)
                }
            };
            x = function (b, c, d, g) {
                k.apply(this, arguments) || (b === t ? t[c] = d : b === f ? (f[c] = d, "state" === c && (t = a(t), e.history = f = a(f))) : b[c] = d.get && d.get());
                return b
            };
            setInterval(function () {
                var a = i().a;
                if (a != g) {
                    var b = l.createEventObject();
                    b.oldURL = g;
                    b.newURL = g = a;
                    b.type = "hashchange";
                    M(b)
                }
            }, 100);
            e.JSON = B
        }
    }
    var l = e.document,
        J = l.documentElement,
        E = e.sessionStorage,
        G = e.Object,
        B = e.JSON,
        d = e.location,
        p = e.history,
        f = p,
        N = p.pushState,
        U = p.replaceState,
        q = !!N,
        I = "state" in p,
        C = G.defineProperty,
        t = x({}, "t") ? {} : l.createElement("a"),
        w = "",
        O = e.addEventListener ? "addEventListener" : (w = "on") && "attachEvent",
        V = e.removeEventListener ? "removeEventListener" : "detachEvent",
        W = e.dispatchEvent ? "dispatchEvent" : "fireEvent",
        v = e[O],
        X = e[V],
        ba = e[W],
        m = {
            basepath: "/",
            redirect: 0,
            type: "/"
        },
        F = "__historyAPI__",
        P = l.createElement("a"),
        A = d.href,
        R = "",
        D = n,
        r = {},
        z = {},
        ea = {
            onhashchange: j,
            onpopstate: j
        },
        Y = {
            redirect: function (a, b) {
                m.basepath = b = b == j ? m.basepath : b;
                m.type = a = a == j ? m.type : a;
                if (e.top == e.self) {
                    var c = i(j, n, h).c,
                        f = d.search,
                        g = d.pathname;
                    q ? (c != b && RegExp("^" + b + "$", "i").test(g) && d.replace(c), RegExp("^" + b + "$", "i").test(g + "/") ? d.replace(b) : RegExp("^" + b, "i").test(g) || d.replace(g.replace(/^\//, b) + f)) : g != b && d.replace(b + "#" + g.replace(RegExp("^" + b, "i"), a) + f + d.hash)
                }
            },
            pushState: function (a, b, c) {
                N && N.apply(p, arguments);
                s(a, c)
            },
            replaceState: function (a, b, c) {
                delete r[d.href];
                U && U.apply(p, arguments);
                s(a, c, h)
            },
            location: {
                set: function (a) {
                    e.location = a
                },
                get: function () {
                    return q ? d : t
                }
            },
            state: {
                get: function () {
                    return r[d.href] || j
                }
            }
        },
        L = {
            assign: function (a) {
                0 === ("" + a).indexOf("#") ? s(j, a) : d.assign(a)
            },
            reload: function () {
                d.reload()
            },
            replace: function (a) {
                0 === ("" + a).indexOf("#") ? s(j, a, h) : d.replace(a)
            },
            toString: function () {
                return this.href
            },
            href: {
                get: function () {
                    return i().a
                }
            },
            protocol: j,
            host: j,
            hostname: j,
            port: j,
            pathname: {
                get: function () {
                    return i().e
                }
            },
            search: {
                get: function () {
                    return i().f
                }
            },
            hash: {
                set: function (a) {
                    s(j, ("" + a).replace(/^(#|)/, "#"), n, A)
                },
                get: function () {
                    return i().b
                }
            }
        };
    (function () {
        var a = l.getElementsByTagName("script"),
            a = (a[a.length - 1] || {}).src || "";
        (-1 !== a.indexOf("?") ? a.split("?").pop() : "").replace(/(\w+)(?:=([^&]*))?/g, function (a, b, c) {
            m[b] = (c || ("basepath" === b ? "/" : "")).replace(/^(0|false)$/, "")
        });
        da();
        v(w + "hashchange", M, n);
        var b = [L, t, ea, e, Y, f];
        I && delete Y.state;
        for (var c = 0; c < b.length; c += 2) {
            for (var d in b[c]) {
                if (b[c].hasOwnProperty(d)) {
                    if ("function" === typeof b[c][d]) {
                        b[c + 1][d] = b[c][d]
                    } else {
                        a = aa(b[c], d, b[c][d]);
                        if (!x(b[c + 1], d, a, function (a, d) {
                            if (d === f) {
                                e.history = f = b[c + 1] = a
                            }
                        })) {
                            return X(w + "hashchange", M, n), n
                        }
                        b[c + 1] === e && (z[d] = z[d.substr(2)] = [])
                    }
                }
            }
        }
        m.redirect && f.redirect();
        !I && B && Z(B);
        if (!q) {
            l[O](w + "click", ca, n)
        }
        "complete" === l.readyState ? S(h) : (!q && i().c !== m.basepath && (D = h), v(w + "load", S, n));
        return h
    })() && (f.emulate = !q, e[O] = function (a, b, c) {
        a in z ? z[a].push(b) : 3 < arguments.length ? v(a, b, c, arguments[3]) : v(a, b, c)
    }, e[V] = function (a, b, c) {
        var d = z[a];
        if (d) {
            for (a = d.length; --a;) {
                if (d[a] === b) {
                    d.splice(a, 1);
                    break
                }
            }
        } else {
            X(a, b, c)
        }
    }, e[W] = H)
})(window);

$(document).ready(function () {
    $.ajax({
        url: "/NICE.WebCore/WebCore/GetCookieWarning",
        success: function (a) {
            $("#cookieWarning").remove();
            $(".navbar").first().append(a)
        }
    })
});

function trackLink(d, b, a, c) {
    ga("send", {
        hitType: "event",
        eventCategory: b,
        eventAction: a,
        eventLabel: c,
        hitCallback: function () {
            if (d != null) {
                document.location.href = d
            }
        }
    });
    return false
}
function trackEvent(b, a, c) {
    ga("send", {
        hitType: "event",
        eventCategory: b,
        eventAction: a,
        eventLabel: c
    })
}
$('div.zone-footer .nav-pills a[href="/Get-Involved"]').on("click", function () {
    return trackLink(this.href, "get involved tab link", "clicked", document.location.href)
});

eval(function (h, b, d, g, f, i) {
    f = function (a) {
        return (a < b ? "" : f(parseInt(a / b))) + ((a = a % b) > 35 ? String.fromCharCode(a + 29) : a.toString(36))
    };
    if (!"".replace(/^/, String)) {
        while (d--) {
            i[f(d)] = g[d] || f(d)
        }
        g = [
            function (a) {
                return i[a]
            }
        ];
        f = function () {
            return "\\w+"
        };
        d = 1
    }
    while (d--) {
        if (g[d]) {
            h = h.replace(new RegExp("\\b" + f(d) + "\\b", "g"), g[d])
        }
    }
    return h
}('7(O 2X.2r!=="b"){2X.2r=b(e){b t(){}t.3U=e;q 41 t}}(b(e,t,n,r){9 i={3y:b(t,n){9 r=c;r.6=e.3W({},e.2l.1S.6,t);9 i=n;9 s=e(n);r.$p=s;r.3L()},3L:b(){9 t=c;7(O t.6.2H==="b"){t.6.2H.14(c,[t.$p])}7(O t.6.2h==="3T"){9 n=t.6.2h;b r(e){7(O t.6.2v==="b"){t.6.2v.14(c,[e])}m{9 n="";1A(9 r 3R e["h"]){n+=e["h"][r]["1J"]}t.$p.27(n)}t.2B()}e.4x(n,r)}m{t.2B()}},2B:b(){9 e=c;e.1I();e.$p.C({1O:0});e.3O();e.3N();e.1p();e.4v=0;e.k=0;e.2n=e.$p.4j();e.E=e.2n.2G;e.3K();e.R=e.$p.Q(".h-1J");e.L=e.$p.Q(".h-1f");e.1P=e.6.v;e.11="D";e.28;e.3H();e.3F()},3H:b(){9 e=c;e.2Q();e.2Z();e.3E();e.2f();e.3D();e.3C();e.2b();7(e.6.J===j){e.6.J=4d}e.12();e.$p.Q(".h-1f").C("3A","3z");7(!e.$p.2x(":2y")){e.2A()}m{X(b(){e.$p.2E({1O:1},1m)},10)}e.4i=d;e.1Y();7(O e.6.2N==="b"){e.6.2N.14(c,[e.$p])}},1Y:b(){9 e=c;7(e.6.1H===j){e.1H()}7(e.6.1t===j){e.1t()}7(e.6.29===j){e.29()}7(O e.6.2R==="b"){e.6.2R.14(c,[e.$p])}},2S:b(){9 e=c;e.2A();e.2Q();e.2Z();e.3x();e.2f();e.1Y()},3w:b(e){9 t=c;X(b(){t.2S()},0)},2A:b(){9 e=c;1b(e.28);7(!e.$p.2x(":2y")){e.$p.C({1O:0});1b(e.1i)}m{q d}e.28=3v(b(){7(e.$p.2x(":2y")){e.3w();e.$p.2E({1O:1},1m);1b(e.28)}},4e)},3K:b(){9 e=c;e.2n.4h(\'<H M="h-1f">\').3t(\'<H M="h-1J"></H>\');e.$p.Q(".h-1f").3t(\'<H M="h-1f-32">\');e.1G=e.$p.Q(".h-1f-32");e.$p.C("3A","3z")},1I:b(){9 e=c;9 t=e.$p.1F(e.6.1I);9 n=e.$p.1F(e.6.26);7(!t){e.$p.K(e.6.1I)}7(!n){e.$p.K(e.6.26)}},2Q:b(){9 n=c;7(n.6.2o===d){q d}7(n.6.3r===j){n.6.v=n.1P=1;n.6.1w=d;n.6.1x=d;n.6.1D=d;n.6.1C=d;q d}9 r=e(t).16();7(r>(n.6.1w[0]||n.1P)){n.6.v=n.1P}7(r<=n.6.1w[0]&&n.6.1w!==d){n.6.v=n.6.1w[1]}7(r<=n.6.1x[0]&&n.6.1x!==d){n.6.v=n.6.1x[1]}7(r<=n.6.1D[0]&&n.6.1D!==d){n.6.v=n.6.1D[1]}7(r<=n.6.1C[0]&&n.6.1C!==d){n.6.v=n.6.1C[1]}7(n.6.v>n.E){n.6.v=n.E}},3D:b(){9 n=c,r;7(n.6.2o!==j){q d}9 i=e(t).16();e(t).45(b(){7(e(t).16()!==i){7(n.6.J!==d){1b(n.1i)}4a(r);r=X(b(){i=e(t).16();n.2S()},n.6.3q)}})},3x:b(){9 e=c;7(e.1p===j){7(e.Z[e.k]>e.1Q){e.1B(e.Z[e.k])}m{e.1B(0);e.k=0}}m{7(e.Z[e.k]>e.1Q){e.1v(e.Z[e.k])}m{e.1v(0);e.k=0}}7(e.6.J!==d){e.2I()}},3p:b(){9 t=c;9 n=0;9 r=t.E-t.6.v;t.R.1U(b(i){e(c).C({16:t.N}).z("h-1J",2O(i));7(i%t.6.v===0||i===r){7(!(i>r)){n+=1}}e(c).z("h-25",n)})},3o:b(){9 e=c;9 t=0;9 t=e.R.2G*e.N;e.L.C({16:t*2,15:0});e.3p()},2Z:b(){9 e=c;e.3n();e.3o();e.3l();e.2T()},3n:b(){9 e=c;e.N=2U.4I(e.$p.16()/e.6.v)},2T:b(){9 e=c;e.B=e.E-e.6.v;9 t=e.E*e.N-e.6.v*e.N;t=t*-1;e.1Q=t;q t},3k:b(){q 0},3l:b(){9 e=c;e.Z=[0];9 t=0;1A(9 n=0;n<e.E;n++){t+=e.N;e.Z.3Y(-t)}},3E:b(){9 t=c;7(t.6.1y===j||t.6.1k===j){t.F=e(\'<H M="h-47"/>\').48("49",!t.1g).4c(t.$p)}7(t.6.1k===j){t.3j()}7(t.6.1y===j){t.3h()}},3h:b(){9 t=c;9 n=e(\'<H M="h-4g"/>\');t.F.1n(n);t.1o=e("<H/>",{"M":"h-G",27:t.6.2c[0]||""});t.1q=e("<H/>",{"M":"h-D",27:t.6.2c[1]||""});n.1n(t.1o).1n(t.1q);n.A("21.F 24.F",\'H[M^="h"]\',b(n){n.1r();7(e(c).1F("h-D")){t.D()}m{t.G()}})},3j:b(){9 t=c;t.1d=e(\'<H M="h-1k"/>\');t.F.1n(t.1d);t.1d.A("21.F 24.F",".h-1e",b(n){n.1r();7(2O(e(c).z("h-1e"))!==t.k){t.1u(2O(e(c).z("h-1e")),j)}})},3g:b(){9 t=c;7(t.6.1k===d){q d}t.1d.27("");9 n=0;9 r=t.E-t.E%t.6.v;1A(9 i=0;i<t.E;i++){7(i%t.6.v===0){n+=1;7(r===i){9 s=t.E-t.6.v}9 o=e("<H/>",{"M":"h-1e"});9 u=e("<3c></3c>",{4b:t.6.2u===j?n:"","M":t.6.2u===j?"h-4X":""});o.1n(u);o.z("h-1e",r===i?s:i);o.z("h-25",n);t.1d.1n(o)}}t.2w()},2w:b(){9 t=c;t.1d.Q(".h-1e").1U(b(n,r){7(e(c).z("h-25")===e(t.R[t.k]).z("h-25")){t.1d.Q(".h-1e").13("1M");e(c).K("1M")}})},2z:b(){9 e=c;7(e.6.1y===d){q d}7(e.6.1N===d){7(e.k===0&&e.B===0){e.1o.K("V");e.1q.K("V")}m 7(e.k===0&&e.B!==0){e.1o.K("V");e.1q.13("V")}m 7(e.k===e.B){e.1o.13("V");e.1q.K("V")}m 7(e.k!==0&&e.k!==e.B){e.1o.13("V");e.1q.13("V")}}},2f:b(){9 e=c;e.3g();e.2z();7(e.F){7(e.6.v===e.E){e.F.3b()}m{e.F.4D()}}},4E:b(){9 e=c;7(e.F){e.F.4H()}},D:b(e){9 t=c;t.k+=t.6.1E===j?t.6.v:1;7(t.k>t.B+(t.6.1E==j?t.6.v-1:0)){7(t.6.1N===j){t.k=0;e="17"}m{t.k=t.B;q d}}t.1u(t.k,e)},G:b(e){9 t=c;7(t.6.1E===j&&t.k>0&&t.k<t.6.v){t.k=0}m{t.k-=t.6.1E===j?t.6.v:1}7(t.k<0){7(t.6.1N===j){t.k=t.B;e="17"}m{t.k=0;q d}}t.1u(t.k,e)},1u:b(e,t){9 n=c;7(O n.6.2F==="b"){n.6.2F.14(c,[n.$p])}7(e>=n.B){e=n.B}m 7(e<=0){e=0}n.k=e;9 r=n.Z[e];7(n.1p===j){n.1z=d;7(t===j){n.1R("1s");X(b(){n.1z=j},n.6.1s)}m 7(t==="17"){n.1R(n.6.1T);X(b(){n.1z=j},n.6.1T)}m{n.1R("1a");X(b(){n.1z=j},n.6.1a)}n.1B(r)}m{7(t===j){n.1v(r,n.6.1s)}m 7(t==="17"){n.1v(r,n.6.1T)}m{n.1v(r,n.6.1a)}}7(n.6.1k===j){n.2w()}7(n.6.1y===j){n.2z()}7(n.6.J!==d){n.2I()}n.1Y();7(O n.6.2K==="b"){n.6.2K.14(c,[n.$p])}},T:b(){9 e=c;e.2M="T";1b(e.1i)},2I:b(){9 e=c;7(e.2M!=="T"){e.12()}},12:b(){9 e=c;e.2M="12";7(e.6.J===d){q d}1b(e.1i);e.1i=3v(b(){7(e.k<e.B&&e.11==="D"){e.D(j)}m 7(e.k===e.B){7(e.6.17===j){e.1u(0,"17")}m{e.11="G";e.G(j)}}m 7(e.11==="G"&&e.k>0){e.G(j)}m 7(e.11==="G"&&e.k===0){e.11="D";e.D(j)}},e.6.J)},1R:b(e){9 t=c;7(e==="1a"){t.L.C(t.1W(t.6.1a))}m 7(e==="1s"){t.L.C(t.1W(t.6.1s))}m 7(O e!=="3T"){t.L.C(t.1W(e))}},1W:b(e){9 t=c;q{"-1X-W":"1Z "+e+"1h 22","-23-W":"1Z "+e+"1h 22","-o-W":"1Z "+e+"1h 22",W:"1Z "+e+"1h 22"}},39:b(){q{"-1X-W":"","-23-W":"","-o-W":"",W:""}},38:b(e){q{"-1X-P":"18("+e+"1j, w, w)","-23-P":"18("+e+"1j, w, w)","-o-P":"18("+e+"1j, w, w)","-1h-P":"18("+e+"1j, w, w)",P:"18("+e+"1j, w,w)"}},1B:b(e){9 t=c;t.L.C(t.38(e))},35:b(e){9 t=c;t.L.C({15:e})},1v:b(e,t){9 n=c;n.2a=d;n.L.T(j,j).2E({15:e},{3V:t||n.6.1a,34:b(){n.2a=j}})},1p:b(){9 e=c;9 t="18(w, w, w)";9 r=n.3X("H");r.3s.33="  -23-P:"+t+"; -1h-P:"+t+"; -o-P:"+t+"; -1X-P:"+t+"; P:"+t;9 i=/18\\(w, w, w\\)/g;9 s=r.3s.33.40(i);9 o=s!==U&&s.2G===1;e.1p=o;q o},3O:b(){9 e=c;e.1g="42"3R t||43.44},3C:b(){9 e=c;7(e.6.1L!==d||e.6.1K!==d){e.36();e.37()}},3N:b(){9 e=c;9 t=["s","e","x"];e.S={};7(e.6.1L===j&&e.6.1K===j){t=["3a.h 2C.h","2t.h 3d.h","21.h 3e.h 24.h"]}m 7(e.6.1L===d&&e.6.1K===j){t=["3a.h","2t.h","21.h 3e.h"]}m 7(e.6.1L===j&&e.6.1K===d){t=["2C.h","3d.h","24.h"]}e.S["3f"]=t[0];e.S["2q"]=t[1];e.S["2d"]=t[2]},37:b(){9 e=c;e.$p.A("4w.h","3i",b(e){e.1r()});e.$p.4y("2C.4z",b(){q d})},36:b(){b o(e){7(e.31){q{x:e.31[0].2V,y:e.31[0].3m}}m{7(e.2V!==r){q{x:e.2V,y:e.3m}}m{q{x:e.4L,y:e.4N}}}}b u(t){7(t==="A"){e(n).A(i.S["2q"],f);e(n).A(i.S["2d"],l)}m 7(t==="Y"){e(n).Y(i.S["2q"]);e(n).Y(i.S["2d"])}}b a(n){9 n=n.2J||n||t.2D;7(i.2a===d){q d}7(i.1z===d){q d}7(i.6.J!==d){1b(i.1i)}7(i.1g!==j&&!i.L.1F("2p")){i.L.K("2p")}i.I=0;i.19=0;e(c).C(i.39());9 r=e(c).3u();s.2e=r.15;s.2Y=o(n).x-r.15;s.2W=o(n).y-r.46;u("A");s.1V=d;s.2s=n.1c||n.3B}b f(r){9 r=r.2J||r||t.2D;i.I=o(r).x-s.2Y;i.2i=o(r).y-s.2W;i.19=i.I-s.2e;7(O i.6.2g==="b"&&s.30!==j&&i.I!==0){s.30=j;i.6.2g.14(c)}7(i.19>8||i.19<-8&&i.1g===j){r.1r?r.1r():r.4f=d;s.1V=j}7((i.2i>10||i.2i<-10)&&s.1V===d){e(n).Y("2t.h")}9 u=b(){q i.19/5};9 a=b(){q i.1Q+i.19/5};i.I=2U.2T(2U.3k(i.I,u()),a());7(i.1p===j){i.1B(i.I)}m{i.35(i.I)}}b l(n){9 n=n.2J||n||t.2D;n.1c=n.1c||n.3B;s.30=d;7(i.1g!==j){i.L.13("2p")}7(i.I!==0){9 r=i.3G();i.1u(r);7(s.2s===n.1c&&i.1g!==j){e(n.1c).A("2P.3I",b(t){t.4k();t.4l();t.1r();e(n.1c).Y("2P.3I")});9 o=e.4m(n.1c,"4n")["2P"];9 a=o.4o();o.4p(0,0,a)}}u("Y")}9 i=c;9 s={2Y:0,2W:0,4q:0,2e:0,3u:U,4r:U,4s:U,1V:U,4t:U,2s:U};i.2a=j;i.$p.A(i.S["3f"],".h-1f",a)},4u:b(){9 t=c;t.$p.Y(".h");e(n).Y(".h")},3G:b(){9 e=c,t;9 t=e.3J();7(t>e.B){e.k=e.B;t=e.B}m 7(e.I>=0){t=0;e.k=0}q t},3J:b(){9 t=c;9 n=t.Z;9 r=t.I;9 i=U;e.1U(n,b(e,s){7(r-t.N/20>n[e+1]&&r-t.N/20<s&&t.2m()==="15"){i=s;t.k=e}m 7(r+t.N/20<s&&r+t.N/20>n[e+1]&&t.2m()==="3M"){i=n[e+1];t.k=e+1}});q t.k},2m:b(){9 e=c,t;7(e.19<0){t="3M";e.11="D"}m{t="15";e.11="G"}q t},3F:b(){9 e=c;e.$p.A("h.D",b(){e.D()});e.$p.A("h.G",b(){e.G()});e.$p.A("h.12",b(t,n){e.6.J=n;e.12();e.2j="12"});e.$p.A("h.T",b(){e.T();e.2j="T"})},2b:b(){9 e=c;7(e.6.2b===j&&e.1g!==j&&e.6.J!==d){e.$p.A("4A",b(){e.T()});e.$p.A("4B",b(){7(e.2j!=="T"){e.12()}})}},1H:b(){9 t=c;7(t.6.1H===d){q d}1A(9 n=0;n<t.E;n++){9 i=e(t.R[n]),s=i.z("h-1J"),o=i.Q(".4C"),u;7(i.z("h-1l")===r){o.3b();i.K("3P").z("h-1l","4F")}m 7(i.z("h-1l")==="1l"){4G}7(t.6.3Q===j){u=s>=t.k}m{u=j}7(u&&s<t.k+t.6.v){i.z("h-1l","1l");9 a=o.z("2L");7(a){o[0].2L=a;o.4J("z-2L")}o.4K(1m);i.13("3P")}}},1t:b(){b s(){i+=1;7(n.3S(0).34){o()}m 7(i<=4M){X(s,1m)}m{t.1G.C("2k","")}}b o(){9 n=e(t.R[t.k]).2k();t.1G.C("2k",n+"1j");7(!t.1G.1F("1t")){X(b(){t.1G.K("1t")},0)}}9 t=c;9 n=e(t.R[t.k]).Q("3i");7(n.3S(0)!==r){9 i=0;s()}m{o()}},29:b(){9 t=c;e(t.R).13("1M");1A(9 n=t.k;n<t.k+t.6.v;n++){e(t.R[n]).K("1M")}}};e.2l.1S=b(t){q c.1U(b(){9 n=2X.2r(i);n.3y(t,c);e.z(c,"1S",n)})};e.2l.1S.6={v:5,1w:[4O,4],1x:[4P,3],1D:[4Q,2],1C:[4R,1],3r:d,1a:1m,1s:4S,J:d,2b:d,17:j,1T:4T,1y:d,2c:["G","D"],1N:j,1E:d,1k:j,2u:d,2o:j,3q:1m,1I:"h-4U",26:"h-26",1H:d,3Q:j,1t:d,2h:d,2v:d,1L:j,1K:j,2H:d,2N:d,2F:d,2K:d,2R:d,2g:d,29:d}})(4V,4W,3Z)', 62, 308, "||||||options|if||var||function|this|false||||owl||true|currentSlide||else|||elem|return|||||items|0px|||data|on|maximumSlide|css|next|itemsAmount|owlControls|prev|div|newPosX|autoPlay|addClass|owlWrapper|class|itemWidth|typeof|transform|find|owlItems|ev_types|stop|null|disabled|transition|setTimeout|off|positionsInArray||playDirection|play|removeClass|apply|left|width|goToFirst|translate3d|newRelativeX|slideSpeed|clearInterval|target|paginationWrapper|page|wrapper|isTouch|ms|autoPlaySpeed|px|pagination|loaded|200|append|buttonPrev|support3d|buttonNext|preventDefault|paginationSpeed|autoHeight|goTo|css2slide|itemsDesktop|itemsDesktopSmall|navigation|isCss3Finish|for|transition3d|itemsMobile|itemsTablet|scrollPerPage|hasClass|wrapperOuter|lazyLoad|baseClass|item|touchDrag|mouseDrag|active|goToFirstNav|opacity|orignalItems|maximumPixels|swapTransitionSpeed|owlCarousel|goToFirstSpeed|each|sliding|addTransition|webkit|eachMoveUpdate|all||touchend|ease|moz|mouseup|roundPages|theme|html|checkVisible|addClassActive|isCssFinish|stopOnHover|navigationText|end|relativePos|updateControls|startDragging|jsonPath|newPosY|hoverStatus|height|fn|moveDirection|userItems|responsive|grabbing|move|create|targetElement|touchmove|paginationNumbers|jsonSuccess|checkPagination|is|visible|checkNavigation|watchVisibility|logIn|mousedown|event|animate|beforeMove|length|beforeInit|checkAp|originalEvent|afterMove|src|apStatus|afterInit|Number|click|updateItems|afterAction|updateVars|max|Math|pageX|offsetY|Object|offsetX|calculateAll|dragging|touches|outer|cssText|complete|css2move|gestures|disabledEvents|doTranslate|removeTransition|touchstart|hide|span|mousemove|touchcancel|start|updatePagination|buildButtons|img|buildPagination|min|loops|pageY|calculateWidth|appendWrapperSizes|appendItemsSizes|responsiveRefreshRate|singleItem|style|wrap|position|setInterval|reload|updatePosition|init|block|display|srcElement|moveEvents|response|buildControls|customEvents|getNewPosition|onStartup|disable|improveClosest|wrapItems|loadContent|right|eventTypes|checkTouch|loading|lazyFollow|in|get|string|prototype|duration|extend|createElement|push|document|match|new|ontouchstart|navigator|msMaxTouchPoints|resize|top|controls|toggleClass|clickable|clearTimeout|text|appendTo|5e3|500|returnValue|buttons|wrapAll|onstartup|children|stopImmediatePropagation|stopPropagation|_data|events|pop|splice|baseElWidth|minSwipe|maxSwipe|dargging|clearEvents|wrapperWidth|dragstart|getJSON|bind|disableTextSelect|mouseover|mouseout|lazyOwl|show|destroyControls|checked|continue|remove|round|removeAttr|fadeIn|clientX|50|clientY|1199|979|768|479|800|1e3|carousel|jQuery|window|numbers".split("|"), 0, {}));

! function (a) {
    var b = function (d, e) {
        this.$element = a(d);
        this.options = e;
        var f = this.owl = this.$element.find(".carousel-inner").addClass("owl-carousel").owlCarousel(e);
        a(d).delegate(".left", "click", function () {
            f.trigger("owl.prev")
        }).delegate(".right", "click", function () {
            f.trigger("owl.next")
        }).find(".left, .right").data("data-target", this.$element)
    };
    b.prototype = {
        cycle: function (d) {
            this.owl.trigger("owl.next");
            return this
        },
        getActiveIndex: function () {
            return this.owl.currentItem
        },
        to: function (d) {
            this.owl.trigger("owl.goTo", d);
            return this
        },
        pause: function (d) {
            this.owl.trigger("owl.stop");
            return this
        },
        next: function () {
            this.owl.trigger("owl.next");
            return this
        },
        prev: function () {
            this.owl.trigger("owl.prev");
            return this
        },
        slide: function (e, d) {
            if (!!d) {
                this.owl.trigger("owl." + e);
                return this
            }
            this.owl.trigger("owl.goTo", this.$element.find(".owl-wrapper").children().index(d));
            return this
        }
    };
    var c = a.fn.carousel;
    a.fn.carousel = function (d) {
        return this.each(function () {
            var e = a(this),
                f = e.data("carousel"),
                g = a.extend({}, a.fn.carousel.defaults, typeof d == "object" && d);
            if (!f) {
                e.data("carousel", (f = new b(this, g)))
            }
            if (typeof d == "number") {
                f.to(d)
            }
        })
    };
    a.fn.carousel.defaults = {
        navigation: false,
        pagination: false,
        slideSpeed: 200,
        paginationSpeed: 500,
        autoPlay: true,
        responsive: true,
        singleItem: true
    };
    a.fn.carousel.Constructor = b;
    a.fn.carousel.noConflict = function () {
        a.fn.carousel = c;
        return this
    };
    a(document).on("click.carousel.data-api", "[data-slide], [data-slide-to]", function (g) {
        var f = a(this),
            h, d = a(f.attr("data-target") || (h = f.attr("href")) && h.replace(/.*(?=#[^\s]+$)/, "")),
            i = a.extend({}, d.data(), f.data()),
            j;
        d.carousel(i);
        if (j = f.attr("data-slide-to")) {
            d.data("carousel").pause().to(j)
        }
        g.preventDefault()
    })
}(window.jQuery);

$(function () {
    var c = {
        autoPlay: false,
        pagination: true,
        mouseDrag: false,
        afterMove: function () {
            var g = $(this);
            var f = $(g[0].$elem.find(".item")[g[0].currentSlide]);
            d(f);
            trackEvent("slider usage", "homepage slider", g[0].currentSlide + 1)
        },
        afterInit: function () {
            var g = $(this);
            var f = $(g[0].$elem.find(".item")[g[0].currentSlide]);
            d(f)
        },
        autoHeight: true
    };

    function d(g) {
        var j = g.find("iframe");
        var h = b();
        var o = 1170,
            i = 442;
        if (j.length == 1) {
            if (h != "desktop") {
                var k = j.parents(".owl-item").first().css("width");
                if (k != null && k.indexOf("px") > 0) {
                    o = Number(k.replace("px", "")) - 1;
                    i = Math.round(Number(k.replace("px", "")) * 2 / 3) - 1
                }
            }
            setTimeout(function () {
                e(j, o, i)
            }, 50)
        } else {
            var n = g.find("script");
            if (n.length == 1) {
                var l = g.find("div").first();
                if (l.length == 1) {
                    if (h != "desktop") {
                        var k = l.parents(".owl-item").first().css("width");
                        if (k != null && k.indexOf("px") > 0) {
                            o = Number(k.replace("px", "")) - 1;
                            i = Math.round(Number(k.replace("px", "")) * 2 / 3) - 1
                        }
                    }
                    l.hide().show();
                    setTimeout(function () {
                        e(l, o, i)
                    }, 50)
                }
            }
        }
        var m = $("#CarouselPanel").data("carousel");
        if (m != undefined && m.owl != null) {
            var f = m.owl.data("owlCarousel");
            f.autoHeight()
        }
    }

    function e(l, o, j) {
        var n = "" + (o + 1) + "px",
            i = "" + (j + 1) + "px";
        l.attr("width", "" + n).attr("height", "" + i);
        l.css("height", i).css("width", n);
        var m = "" + o + "px",
            g = "" + j + "px";
        setTimeout(function () {
            l.attr("width", "" + m).attr("height", "" + g);
            l.css("height", g).css("width", m)
        }, 50);
        var k = $("#CarouselPanel").data("carousel");
        if (k != undefined && k.owl != null) {
            var f = k.owl.data("owlCarousel");
            f.autoHeight()
        }
    }

    function b() {
        var g = ["phone", "tablet", "desktop"];
        $el = $("<div>");
        $el.appendTo($("body"));
        for (var h = g.length - 1; h >= 0; h--) {
            var f = g[h];
            $el.addClass("hidden-" + f);
            if ($el.is(":hidden")) {
                $el.remove();
                return f
            }
        }
        return ""
    }

    function a() {
        if (b() == "phone") {
            $(".nice-carousel").addClass("nice-carousel-phone");
            $(".nice-carousel").removeClass("nice-carousel-tabletdesktop")
        } else {
            $(".nice-carousel").removeClass("nice-carousel-phone");
            $(".nice-carousel").addClass("nice-carousel-tabletdesktop")
        }
        var f = $("#CarouselPanel").data("carousel").owl.data("owlCarousel");
        var g = f.owlItems[f.currentSlide];
        d($(g))
    }
    $("#CarouselPanel").carousel(c);
    $("div.carousel-inner.owl-carousel.owl-theme").unbind("mousedown");
    a();
    $(window).on("resize", function () {
        a()
    })
});
