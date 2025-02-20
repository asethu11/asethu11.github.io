/*!
 * 
 *   typed.js - A JavaScript Typing Animation Library
 *   Author: Matt Boldt <me@mattboldt.com>
 *   Version: v2.0.12
 *   Url: https://github.com/mattboldt/typed.js
 *   License(s): MIT
 * 
 */

(function (t, e) {
    "object" == typeof exports && "object" == typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define([], e)
        : "object" == typeof exports
        ? (exports.Typed = e())
        : (t.Typed = e());
})(this, function () {
    return (function (t) {
        function e(n) {
            if (s[n]) return s[n].exports;
            var i = (s[n] = { exports: {}, id: n, loaded: !1 });
            return t[n].call(i.exports, i, i.exports, e), (i.loaded = !0), i.exports;
        }
        var s = {};
        return (e.m = t), (e.c = s), (e.p = ""), e(0);
    })([
        function (t, e, s) {
            "use strict";
            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
            }
            Object.defineProperty(e, "__esModule", { value: !0 });
            var i = (function () {
                function t(t, e) {
                    for (var s = 0; s < e.length; s++) {
                        var n = e[s];
                        (n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            "value" in n && (n.writable = !0),
                            Object.defineProperty(t, n.key, n);
                    }
                }
                return function (e, s, n) {
                    return s && t(e.prototype, s), n && t(e, n), e;
                };
            })(),
            r = s(1),
            o = s(3),
            a = (function () {
                function t(e, s) {
                    n(this, t), r.initializer.load(this, s, e), this.begin();
                }
                return (
                    i(t, [
                        {
                            key: "toggle",
                            value: function () {
                                this.pause.status ? this.start() : this.stop();
                            },
                        },
                        {
                            key: "stop",
                            value: function () {
                                this.typingComplete || this.pause.status || (this.toggleBlinking(!0), (this.pause.status = !0), this.options.onStop(this.arrayPos, this));
                            },
                        },
                        {
                            key: "start",
                            value: function () {
                                this.typingComplete ||
                                    this.pause.status &&
                                        ((this.pause.status = !1),
                                        this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos),
                                        this.options.onStart(this.arrayPos, this));
                            },
                        },
                        {
                            key: "destroy",
                            value: function () {
                                this.reset(!1), this.options.onDestroy(this);
                            },
                        },
                    ]),
                    t
                );
            })();
            e["default"] = a, (t.exports = e["default"]);
        },
    ]);
});
