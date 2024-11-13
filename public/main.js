(() => {
  // output/Control.Semigroupoid/index.js
  var semigroupoidFn = {
    compose: function(f) {
      return function(g) {
        return function(x) {
          return f(g(x));
        };
      };
    }
  };

  // output/Control.Category/index.js
  var identity = function(dict) {
    return dict.identity;
  };
  var categoryFn = {
    identity: function(x) {
      return x;
    },
    Semigroupoid0: function() {
      return semigroupoidFn;
    }
  };

  // output/Data.Boolean/index.js
  var otherwise = true;

  // output/Data.Function/index.js
  var on = function(f) {
    return function(g) {
      return function(x) {
        return function(y) {
          return f(g(x))(g(y));
        };
      };
    };
  };
  var flip = function(f) {
    return function(b2) {
      return function(a2) {
        return f(a2)(b2);
      };
    };
  };
  var $$const = function(a2) {
    return function(v) {
      return a2;
    };
  };

  // output/Data.Functor/foreign.js
  var arrayMap = function(f) {
    return function(arr) {
      var l = arr.length;
      var result = new Array(l);
      for (var i2 = 0; i2 < l; i2++) {
        result[i2] = f(arr[i2]);
      }
      return result;
    };
  };

  // output/Data.Unit/foreign.js
  var unit = void 0;

  // output/Type.Proxy/index.js
  var $$Proxy = /* @__PURE__ */ function() {
    function $$Proxy2() {
    }
    ;
    $$Proxy2.value = new $$Proxy2();
    return $$Proxy2;
  }();

  // output/Data.Functor/index.js
  var map = function(dict) {
    return dict.map;
  };
  var mapFlipped = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return function(fa) {
      return function(f) {
        return map111(f)(fa);
      };
    };
  };
  var $$void = function(dictFunctor) {
    return map(dictFunctor)($$const(unit));
  };
  var voidLeft = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return function(f) {
      return function(x) {
        return map111($$const(x))(f);
      };
    };
  };
  var functorArray = {
    map: arrayMap
  };

  // output/Control.Apply/index.js
  var identity2 = /* @__PURE__ */ identity(categoryFn);
  var apply = function(dict) {
    return dict.apply;
  };
  var applySecond = function(dictApply) {
    var apply1 = apply(dictApply);
    var map27 = map(dictApply.Functor0());
    return function(a2) {
      return function(b2) {
        return apply1(map27($$const(identity2))(a2))(b2);
      };
    };
  };

  // output/Control.Applicative/index.js
  var pure = function(dict) {
    return dict.pure;
  };
  var unless = function(dictApplicative) {
    var pure19 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (!v) {
          return v1;
        }
        ;
        if (v) {
          return pure19(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 68, column 1 - line 68, column 65): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var when = function(dictApplicative) {
    var pure19 = pure(dictApplicative);
    return function(v) {
      return function(v1) {
        if (v) {
          return v1;
        }
        ;
        if (!v) {
          return pure19(unit);
        }
        ;
        throw new Error("Failed pattern match at Control.Applicative (line 63, column 1 - line 63, column 63): " + [v.constructor.name, v1.constructor.name]);
      };
    };
  };
  var liftA1 = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    var pure19 = pure(dictApplicative);
    return function(f) {
      return function(a2) {
        return apply3(pure19(f))(a2);
      };
    };
  };

  // output/Control.Bind/index.js
  var discard = function(dict) {
    return dict.discard;
  };
  var bind = function(dict) {
    return dict.bind;
  };
  var bindFlipped = function(dictBind) {
    return flip(bind(dictBind));
  };
  var composeKleisliFlipped = function(dictBind) {
    var bindFlipped12 = bindFlipped(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bindFlipped12(f)(g(a2));
        };
      };
    };
  };
  var composeKleisli = function(dictBind) {
    var bind16 = bind(dictBind);
    return function(f) {
      return function(g) {
        return function(a2) {
          return bind16(f(a2))(g);
        };
      };
    };
  };
  var discardUnit = {
    discard: function(dictBind) {
      return bind(dictBind);
    }
  };

  // output/Data.Semigroup/foreign.js
  var concatArray = function(xs) {
    return function(ys) {
      if (xs.length === 0) return ys;
      if (ys.length === 0) return xs;
      return xs.concat(ys);
    };
  };

  // output/Data.Symbol/index.js
  var reflectSymbol = function(dict) {
    return dict.reflectSymbol;
  };

  // output/Record.Unsafe/foreign.js
  var unsafeGet = function(label5) {
    return function(rec) {
      return rec[label5];
    };
  };

  // output/Data.Semigroup/index.js
  var semigroupArray = {
    append: concatArray
  };
  var append = function(dict) {
    return dict.append;
  };

  // output/Control.Alt/index.js
  var alt = function(dict) {
    return dict.alt;
  };

  // output/Data.Bounded/foreign.js
  var topInt = 2147483647;
  var bottomInt = -2147483648;
  var topChar = String.fromCharCode(65535);
  var bottomChar = String.fromCharCode(0);
  var topNumber = Number.POSITIVE_INFINITY;
  var bottomNumber = Number.NEGATIVE_INFINITY;

  // output/Data.Ord/foreign.js
  var unsafeCompareImpl = function(lt) {
    return function(eq7) {
      return function(gt) {
        return function(x) {
          return function(y) {
            return x < y ? lt : x === y ? eq7 : gt;
          };
        };
      };
    };
  };
  var ordIntImpl = unsafeCompareImpl;
  var ordStringImpl = unsafeCompareImpl;

  // output/Data.Eq/foreign.js
  var refEq = function(r1) {
    return function(r2) {
      return r1 === r2;
    };
  };
  var eqIntImpl = refEq;
  var eqStringImpl = refEq;

  // output/Data.Eq/index.js
  var eqString = {
    eq: eqStringImpl
  };
  var eqInt = {
    eq: eqIntImpl
  };
  var eq = function(dict) {
    return dict.eq;
  };

  // output/Data.Ordering/index.js
  var LT = /* @__PURE__ */ function() {
    function LT2() {
    }
    ;
    LT2.value = new LT2();
    return LT2;
  }();
  var GT = /* @__PURE__ */ function() {
    function GT2() {
    }
    ;
    GT2.value = new GT2();
    return GT2;
  }();
  var EQ = /* @__PURE__ */ function() {
    function EQ2() {
    }
    ;
    EQ2.value = new EQ2();
    return EQ2;
  }();

  // output/Data.Ring/foreign.js
  var intSub = function(x) {
    return function(y) {
      return x - y | 0;
    };
  };

  // output/Data.Semiring/foreign.js
  var intAdd = function(x) {
    return function(y) {
      return x + y | 0;
    };
  };
  var intMul = function(x) {
    return function(y) {
      return x * y | 0;
    };
  };
  var numAdd = function(n1) {
    return function(n2) {
      return n1 + n2;
    };
  };
  var numMul = function(n1) {
    return function(n2) {
      return n1 * n2;
    };
  };

  // output/Data.Semiring/index.js
  var semiringNumber = {
    add: numAdd,
    zero: 0,
    mul: numMul,
    one: 1
  };
  var semiringInt = {
    add: intAdd,
    zero: 0,
    mul: intMul,
    one: 1
  };
  var add = function(dict) {
    return dict.add;
  };

  // output/Data.Ring/index.js
  var ringInt = {
    sub: intSub,
    Semiring0: function() {
      return semiringInt;
    }
  };

  // output/Data.Ord/index.js
  var ordString = /* @__PURE__ */ function() {
    return {
      compare: ordStringImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqString;
      }
    };
  }();
  var ordInt = /* @__PURE__ */ function() {
    return {
      compare: ordIntImpl(LT.value)(EQ.value)(GT.value),
      Eq0: function() {
        return eqInt;
      }
    };
  }();
  var compare = function(dict) {
    return dict.compare;
  };

  // output/Data.Bounded/index.js
  var top = function(dict) {
    return dict.top;
  };
  var boundedInt = {
    top: topInt,
    bottom: bottomInt,
    Ord0: function() {
      return ordInt;
    }
  };
  var bottom = function(dict) {
    return dict.bottom;
  };

  // output/Data.Show/foreign.js
  var showIntImpl = function(n) {
    return n.toString();
  };
  var showNumberImpl = function(n) {
    var str = n.toString();
    return isNaN(str + ".0") ? str : str + ".0";
  };

  // output/Data.Show/index.js
  var showNumber = {
    show: showNumberImpl
  };
  var showInt = {
    show: showIntImpl
  };
  var show = function(dict) {
    return dict.show;
  };

  // output/Data.Maybe/index.js
  var identity3 = /* @__PURE__ */ identity(categoryFn);
  var Nothing = /* @__PURE__ */ function() {
    function Nothing2() {
    }
    ;
    Nothing2.value = new Nothing2();
    return Nothing2;
  }();
  var Just = /* @__PURE__ */ function() {
    function Just2(value0) {
      this.value0 = value0;
    }
    ;
    Just2.create = function(value0) {
      return new Just2(value0);
    };
    return Just2;
  }();
  var maybe = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Nothing) {
          return v;
        }
        ;
        if (v2 instanceof Just) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 237, column 1 - line 237, column 51): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };
  var isNothing = /* @__PURE__ */ maybe(true)(/* @__PURE__ */ $$const(false));
  var isJust = /* @__PURE__ */ maybe(false)(/* @__PURE__ */ $$const(true));
  var functorMaybe = {
    map: function(v) {
      return function(v1) {
        if (v1 instanceof Just) {
          return new Just(v(v1.value0));
        }
        ;
        return Nothing.value;
      };
    }
  };
  var map2 = /* @__PURE__ */ map(functorMaybe);
  var fromMaybe = function(a2) {
    return maybe(a2)(identity3);
  };
  var fromJust = function() {
    return function(v) {
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Maybe (line 288, column 1 - line 288, column 46): " + [v.constructor.name]);
    };
  };
  var applyMaybe = {
    apply: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return map2(v.value0)(v1);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 67, column 1 - line 69, column 30): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Functor0: function() {
      return functorMaybe;
    }
  };
  var bindMaybe = {
    bind: function(v) {
      return function(v1) {
        if (v instanceof Just) {
          return v1(v.value0);
        }
        ;
        if (v instanceof Nothing) {
          return Nothing.value;
        }
        ;
        throw new Error("Failed pattern match at Data.Maybe (line 125, column 1 - line 127, column 28): " + [v.constructor.name, v1.constructor.name]);
      };
    },
    Apply0: function() {
      return applyMaybe;
    }
  };
  var applicativeMaybe = /* @__PURE__ */ function() {
    return {
      pure: Just.create,
      Apply0: function() {
        return applyMaybe;
      }
    };
  }();

  // output/Data.MediaType.Common/index.js
  var applicationJSON = "application/json";
  var applicationFormURLEncoded = "application/x-www-form-urlencoded";

  // output/Affjax.RequestBody/index.js
  var ArrayView = /* @__PURE__ */ function() {
    function ArrayView2(value0) {
      this.value0 = value0;
    }
    ;
    ArrayView2.create = function(value0) {
      return new ArrayView2(value0);
    };
    return ArrayView2;
  }();
  var Blob = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var $$String = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var FormData = /* @__PURE__ */ function() {
    function FormData2(value0) {
      this.value0 = value0;
    }
    ;
    FormData2.create = function(value0) {
      return new FormData2(value0);
    };
    return FormData2;
  }();
  var FormURLEncoded = /* @__PURE__ */ function() {
    function FormURLEncoded2(value0) {
      this.value0 = value0;
    }
    ;
    FormURLEncoded2.create = function(value0) {
      return new FormURLEncoded2(value0);
    };
    return FormURLEncoded2;
  }();
  var Json = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var toMediaType = function(v) {
    if (v instanceof FormURLEncoded) {
      return new Just(applicationFormURLEncoded);
    }
    ;
    if (v instanceof Json) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json = /* @__PURE__ */ function() {
    return Json.create;
  }();

  // output/Affjax.ResponseFormat/index.js
  var identity4 = /* @__PURE__ */ identity(categoryFn);
  var $$ArrayBuffer = /* @__PURE__ */ function() {
    function $$ArrayBuffer2(value0) {
      this.value0 = value0;
    }
    ;
    $$ArrayBuffer2.create = function(value0) {
      return new $$ArrayBuffer2(value0);
    };
    return $$ArrayBuffer2;
  }();
  var Blob2 = /* @__PURE__ */ function() {
    function Blob3(value0) {
      this.value0 = value0;
    }
    ;
    Blob3.create = function(value0) {
      return new Blob3(value0);
    };
    return Blob3;
  }();
  var Document2 = /* @__PURE__ */ function() {
    function Document3(value0) {
      this.value0 = value0;
    }
    ;
    Document3.create = function(value0) {
      return new Document3(value0);
    };
    return Document3;
  }();
  var Json2 = /* @__PURE__ */ function() {
    function Json3(value0) {
      this.value0 = value0;
    }
    ;
    Json3.create = function(value0) {
      return new Json3(value0);
    };
    return Json3;
  }();
  var $$String2 = /* @__PURE__ */ function() {
    function $$String3(value0) {
      this.value0 = value0;
    }
    ;
    $$String3.create = function(value0) {
      return new $$String3(value0);
    };
    return $$String3;
  }();
  var Ignore = /* @__PURE__ */ function() {
    function Ignore2(value0) {
      this.value0 = value0;
    }
    ;
    Ignore2.create = function(value0) {
      return new Ignore2(value0);
    };
    return Ignore2;
  }();
  var toResponseType = function(v) {
    if (v instanceof $$ArrayBuffer) {
      return "arraybuffer";
    }
    ;
    if (v instanceof Blob2) {
      return "blob";
    }
    ;
    if (v instanceof Document2) {
      return "document";
    }
    ;
    if (v instanceof Json2) {
      return "text";
    }
    ;
    if (v instanceof $$String2) {
      return "text";
    }
    ;
    if (v instanceof Ignore) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Affjax.ResponseFormat (line 44, column 3 - line 50, column 19): " + [v.constructor.name]);
  };
  var toMediaType2 = function(v) {
    if (v instanceof Json2) {
      return new Just(applicationJSON);
    }
    ;
    return Nothing.value;
  };
  var json2 = /* @__PURE__ */ function() {
    return new Json2(identity4);
  }();
  var ignore = /* @__PURE__ */ function() {
    return new Ignore(identity4);
  }();

  // output/Affjax.Web/foreign.js
  var driver = {
    newXHR: function() {
      return new XMLHttpRequest();
    },
    fixupUrl: function(url2) {
      return url2 || "/";
    }
  };

  // output/Affjax/foreign.js
  function _ajax(platformSpecificDriver, timeoutErrorMessageIdent, requestFailedMessageIdent, mkHeader, options2) {
    return function(errback, callback) {
      var xhr = platformSpecificDriver.newXHR();
      var fixedUrl = platformSpecificDriver.fixupUrl(options2.url, xhr);
      xhr.open(options2.method || "GET", fixedUrl, true, options2.username, options2.password);
      if (options2.headers) {
        try {
          for (var i2 = 0, header2; (header2 = options2.headers[i2]) != null; i2++) {
            xhr.setRequestHeader(header2.field, header2.value);
          }
        } catch (e) {
          errback(e);
        }
      }
      var onerror = function(msgIdent) {
        return function() {
          errback(new Error(msgIdent));
        };
      };
      xhr.onerror = onerror(requestFailedMessageIdent);
      xhr.ontimeout = onerror(timeoutErrorMessageIdent);
      xhr.onload = function() {
        callback({
          status: xhr.status,
          statusText: xhr.statusText,
          headers: xhr.getAllResponseHeaders().split("\r\n").filter(function(header3) {
            return header3.length > 0;
          }).map(function(header3) {
            var i3 = header3.indexOf(":");
            return mkHeader(header3.substring(0, i3))(header3.substring(i3 + 2));
          }),
          body: xhr.response
        });
      };
      xhr.responseType = options2.responseType;
      xhr.withCredentials = options2.withCredentials;
      xhr.timeout = options2.timeout;
      xhr.send(options2.content);
      return function(error4, cancelErrback, cancelCallback) {
        try {
          xhr.abort();
        } catch (e) {
          return cancelErrback(e);
        }
        return cancelCallback();
      };
    };
  }

  // output/Unsafe.Coerce/foreign.js
  var unsafeCoerce2 = function(x) {
    return x;
  };

  // output/Safe.Coerce/index.js
  var coerce = function() {
    return unsafeCoerce2;
  };

  // output/Data.Newtype/index.js
  var coerce2 = /* @__PURE__ */ coerce();
  var unwrap = function() {
    return coerce2;
  };
  var alaF = function() {
    return function() {
      return function() {
        return function() {
          return function(v) {
            return coerce2;
          };
        };
      };
    };
  };

  // output/Affjax.RequestHeader/index.js
  var unwrap2 = /* @__PURE__ */ unwrap();
  var Accept = /* @__PURE__ */ function() {
    function Accept2(value0) {
      this.value0 = value0;
    }
    ;
    Accept2.create = function(value0) {
      return new Accept2(value0);
    };
    return Accept2;
  }();
  var ContentType = /* @__PURE__ */ function() {
    function ContentType2(value0) {
      this.value0 = value0;
    }
    ;
    ContentType2.create = function(value0) {
      return new ContentType2(value0);
    };
    return ContentType2;
  }();
  var RequestHeader = /* @__PURE__ */ function() {
    function RequestHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RequestHeader2.create = function(value0) {
      return function(value1) {
        return new RequestHeader2(value0, value1);
      };
    };
    return RequestHeader2;
  }();
  var value = function(v) {
    if (v instanceof Accept) {
      return unwrap2(v.value0);
    }
    ;
    if (v instanceof ContentType) {
      return unwrap2(v.value0);
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value1;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 26, column 1 - line 26, column 33): " + [v.constructor.name]);
  };
  var name = function(v) {
    if (v instanceof Accept) {
      return "Accept";
    }
    ;
    if (v instanceof ContentType) {
      return "Content-Type";
    }
    ;
    if (v instanceof RequestHeader) {
      return v.value0;
    }
    ;
    throw new Error("Failed pattern match at Affjax.RequestHeader (line 21, column 1 - line 21, column 32): " + [v.constructor.name]);
  };

  // output/Affjax.ResponseHeader/index.js
  var ResponseHeader = /* @__PURE__ */ function() {
    function ResponseHeader2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseHeader2.create = function(value0) {
      return function(value1) {
        return new ResponseHeader2(value0, value1);
      };
    };
    return ResponseHeader2;
  }();

  // output/Data.Either/index.js
  var Left = /* @__PURE__ */ function() {
    function Left2(value0) {
      this.value0 = value0;
    }
    ;
    Left2.create = function(value0) {
      return new Left2(value0);
    };
    return Left2;
  }();
  var Right = /* @__PURE__ */ function() {
    function Right2(value0) {
      this.value0 = value0;
    }
    ;
    Right2.create = function(value0) {
      return new Right2(value0);
    };
    return Right2;
  }();
  var note = function(a2) {
    return maybe(new Left(a2))(Right.create);
  };
  var functorEither = {
    map: function(f) {
      return function(m) {
        if (m instanceof Left) {
          return new Left(m.value0);
        }
        ;
        if (m instanceof Right) {
          return new Right(f(m.value0));
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 0, column 0 - line 0, column 0): " + [m.constructor.name]);
      };
    }
  };
  var either = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2 instanceof Left) {
          return v(v2.value0);
        }
        ;
        if (v2 instanceof Right) {
          return v1(v2.value0);
        }
        ;
        throw new Error("Failed pattern match at Data.Either (line 208, column 1 - line 208, column 64): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
      };
    };
  };

  // output/Effect/foreign.js
  var pureE = function(a2) {
    return function() {
      return a2;
    };
  };
  var bindE = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Monad/index.js
  var unlessM = function(dictMonad) {
    var bind16 = bind(dictMonad.Bind1());
    var unless2 = unless(dictMonad.Applicative0());
    return function(mb) {
      return function(m) {
        return bind16(mb)(function(b2) {
          return unless2(b2)(m);
        });
      };
    };
  };
  var ap = function(dictMonad) {
    var bind16 = bind(dictMonad.Bind1());
    var pure19 = pure(dictMonad.Applicative0());
    return function(f) {
      return function(a2) {
        return bind16(f)(function(f$prime) {
          return bind16(a2)(function(a$prime) {
            return pure19(f$prime(a$prime));
          });
        });
      };
    };
  };

  // output/Data.EuclideanRing/foreign.js
  var intDegree = function(x) {
    return Math.min(Math.abs(x), 2147483647);
  };
  var intDiv = function(x) {
    return function(y) {
      if (y === 0) return 0;
      return y > 0 ? Math.floor(x / y) : -Math.floor(x / -y);
    };
  };
  var intMod = function(x) {
    return function(y) {
      if (y === 0) return 0;
      var yy = Math.abs(y);
      return (x % yy + yy) % yy;
    };
  };

  // output/Data.CommutativeRing/index.js
  var commutativeRingInt = {
    Ring0: function() {
      return ringInt;
    }
  };

  // output/Data.EuclideanRing/index.js
  var mod = function(dict) {
    return dict.mod;
  };
  var euclideanRingInt = {
    degree: intDegree,
    div: intDiv,
    mod: intMod,
    CommutativeRing0: function() {
      return commutativeRingInt;
    }
  };
  var div = function(dict) {
    return dict.div;
  };

  // output/Data.Monoid/index.js
  var mempty = function(dict) {
    return dict.mempty;
  };

  // output/Effect/index.js
  var $runtime_lazy = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var monadEffect = {
    Applicative0: function() {
      return applicativeEffect;
    },
    Bind1: function() {
      return bindEffect;
    }
  };
  var bindEffect = {
    bind: bindE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var applicativeEffect = {
    pure: pureE,
    Apply0: function() {
      return $lazy_applyEffect(0);
    }
  };
  var $lazy_functorEffect = /* @__PURE__ */ $runtime_lazy("functorEffect", "Effect", function() {
    return {
      map: liftA1(applicativeEffect)
    };
  });
  var $lazy_applyEffect = /* @__PURE__ */ $runtime_lazy("applyEffect", "Effect", function() {
    return {
      apply: ap(monadEffect),
      Functor0: function() {
        return $lazy_functorEffect(0);
      }
    };
  });
  var functorEffect = /* @__PURE__ */ $lazy_functorEffect(20);

  // output/Effect.Exception/foreign.js
  function error(msg) {
    return new Error(msg);
  }
  function message(e) {
    return e.message;
  }
  function throwException(e) {
    return function() {
      throw e;
    };
  }

  // output/Effect.Exception/index.js
  var $$throw = function($4) {
    return throwException(error($4));
  };

  // output/Control.Monad.Error.Class/index.js
  var throwError = function(dict) {
    return dict.throwError;
  };
  var catchError = function(dict) {
    return dict.catchError;
  };
  var $$try = function(dictMonadError) {
    var catchError1 = catchError(dictMonadError);
    var Monad0 = dictMonadError.MonadThrow0().Monad0();
    var map27 = map(Monad0.Bind1().Apply0().Functor0());
    var pure19 = pure(Monad0.Applicative0());
    return function(a2) {
      return catchError1(map27(Right.create)(a2))(function($52) {
        return pure19(Left.create($52));
      });
    };
  };

  // output/Data.Identity/index.js
  var Identity = function(x) {
    return x;
  };
  var functorIdentity = {
    map: function(f) {
      return function(m) {
        return f(m);
      };
    }
  };
  var applyIdentity = {
    apply: function(v) {
      return function(v1) {
        return v(v1);
      };
    },
    Functor0: function() {
      return functorIdentity;
    }
  };
  var bindIdentity = {
    bind: function(v) {
      return function(f) {
        return f(v);
      };
    },
    Apply0: function() {
      return applyIdentity;
    }
  };
  var applicativeIdentity = {
    pure: Identity,
    Apply0: function() {
      return applyIdentity;
    }
  };
  var monadIdentity = {
    Applicative0: function() {
      return applicativeIdentity;
    },
    Bind1: function() {
      return bindIdentity;
    }
  };

  // output/Effect.Ref/foreign.js
  var _new = function(val) {
    return function() {
      return { value: val };
    };
  };
  var read = function(ref2) {
    return function() {
      return ref2.value;
    };
  };
  var modifyImpl = function(f) {
    return function(ref2) {
      return function() {
        var t = f(ref2.value);
        ref2.value = t.state;
        return t.value;
      };
    };
  };
  var write = function(val) {
    return function(ref2) {
      return function() {
        ref2.value = val;
      };
    };
  };

  // output/Effect.Ref/index.js
  var $$void2 = /* @__PURE__ */ $$void(functorEffect);
  var $$new = _new;
  var modify$prime = modifyImpl;
  var modify = function(f) {
    return modify$prime(function(s) {
      var s$prime = f(s);
      return {
        state: s$prime,
        value: s$prime
      };
    });
  };
  var modify_ = function(f) {
    return function(s) {
      return $$void2(modify(f)(s));
    };
  };

  // output/Control.Monad.Rec.Class/index.js
  var bindFlipped2 = /* @__PURE__ */ bindFlipped(bindEffect);
  var map3 = /* @__PURE__ */ map(functorEffect);
  var Loop = /* @__PURE__ */ function() {
    function Loop2(value0) {
      this.value0 = value0;
    }
    ;
    Loop2.create = function(value0) {
      return new Loop2(value0);
    };
    return Loop2;
  }();
  var Done = /* @__PURE__ */ function() {
    function Done2(value0) {
      this.value0 = value0;
    }
    ;
    Done2.create = function(value0) {
      return new Done2(value0);
    };
    return Done2;
  }();
  var tailRecM = function(dict) {
    return dict.tailRecM;
  };
  var monadRecEffect = {
    tailRecM: function(f) {
      return function(a2) {
        var fromDone = function(v) {
          if (v instanceof Done) {
            return v.value0;
          }
          ;
          throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 137, column 30 - line 137, column 44): " + [v.constructor.name]);
        };
        return function __do4() {
          var r = bindFlipped2($$new)(f(a2))();
          (function() {
            while (!function __do5() {
              var v = read(r)();
              if (v instanceof Loop) {
                var e = f(v.value0)();
                write(e)(r)();
                return false;
              }
              ;
              if (v instanceof Done) {
                return true;
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Rec.Class (line 128, column 22 - line 133, column 28): " + [v.constructor.name]);
            }()) {
            }
            ;
            return {};
          })();
          return map3(fromDone)(read(r))();
        };
      };
    },
    Monad0: function() {
      return monadEffect;
    }
  };

  // output/Control.Monad.ST.Internal/foreign.js
  var map_ = function(f) {
    return function(a2) {
      return function() {
        return f(a2());
      };
    };
  };
  var pure_ = function(a2) {
    return function() {
      return a2;
    };
  };
  var bind_ = function(a2) {
    return function(f) {
      return function() {
        return f(a2())();
      };
    };
  };

  // output/Control.Monad.ST.Internal/index.js
  var $runtime_lazy2 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var functorST = {
    map: map_
  };
  var monadST = {
    Applicative0: function() {
      return applicativeST;
    },
    Bind1: function() {
      return bindST;
    }
  };
  var bindST = {
    bind: bind_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var applicativeST = {
    pure: pure_,
    Apply0: function() {
      return $lazy_applyST(0);
    }
  };
  var $lazy_applyST = /* @__PURE__ */ $runtime_lazy2("applyST", "Control.Monad.ST.Internal", function() {
    return {
      apply: ap(monadST),
      Functor0: function() {
        return functorST;
      }
    };
  });

  // output/Data.HeytingAlgebra/foreign.js
  var boolConj = function(b1) {
    return function(b2) {
      return b1 && b2;
    };
  };
  var boolDisj = function(b1) {
    return function(b2) {
      return b1 || b2;
    };
  };
  var boolNot = function(b2) {
    return !b2;
  };

  // output/Data.HeytingAlgebra/index.js
  var tt = function(dict) {
    return dict.tt;
  };
  var not = function(dict) {
    return dict.not;
  };
  var implies = function(dict) {
    return dict.implies;
  };
  var ff = function(dict) {
    return dict.ff;
  };
  var disj = function(dict) {
    return dict.disj;
  };
  var heytingAlgebraBoolean = {
    ff: false,
    tt: true,
    implies: function(a2) {
      return function(b2) {
        return disj(heytingAlgebraBoolean)(not(heytingAlgebraBoolean)(a2))(b2);
      };
    },
    conj: boolConj,
    disj: boolDisj,
    not: boolNot
  };
  var conj = function(dict) {
    return dict.conj;
  };
  var heytingAlgebraFunction = function(dictHeytingAlgebra) {
    var ff1 = ff(dictHeytingAlgebra);
    var tt1 = tt(dictHeytingAlgebra);
    var implies1 = implies(dictHeytingAlgebra);
    var conj1 = conj(dictHeytingAlgebra);
    var disj1 = disj(dictHeytingAlgebra);
    var not1 = not(dictHeytingAlgebra);
    return {
      ff: function(v) {
        return ff1;
      },
      tt: function(v) {
        return tt1;
      },
      implies: function(f) {
        return function(g) {
          return function(a2) {
            return implies1(f(a2))(g(a2));
          };
        };
      },
      conj: function(f) {
        return function(g) {
          return function(a2) {
            return conj1(f(a2))(g(a2));
          };
        };
      },
      disj: function(f) {
        return function(g) {
          return function(a2) {
            return disj1(f(a2))(g(a2));
          };
        };
      },
      not: function(f) {
        return function(a2) {
          return not1(f(a2));
        };
      }
    };
  };

  // output/Data.Tuple/index.js
  var Tuple = /* @__PURE__ */ function() {
    function Tuple2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Tuple2.create = function(value0) {
      return function(value1) {
        return new Tuple2(value0, value1);
      };
    };
    return Tuple2;
  }();
  var snd = function(v) {
    return v.value1;
  };
  var functorTuple = {
    map: function(f) {
      return function(m) {
        return new Tuple(m.value0, f(m.value1));
      };
    }
  };
  var fst = function(v) {
    return v.value0;
  };
  var eqTuple = function(dictEq) {
    var eq7 = eq(dictEq);
    return function(dictEq1) {
      var eq14 = eq(dictEq1);
      return {
        eq: function(x) {
          return function(y) {
            return eq7(x.value0)(y.value0) && eq14(x.value1)(y.value1);
          };
        }
      };
    };
  };
  var ordTuple = function(dictOrd) {
    var compare2 = compare(dictOrd);
    var eqTuple1 = eqTuple(dictOrd.Eq0());
    return function(dictOrd1) {
      var compare12 = compare(dictOrd1);
      var eqTuple2 = eqTuple1(dictOrd1.Eq0());
      return {
        compare: function(x) {
          return function(y) {
            var v = compare2(x.value0)(y.value0);
            if (v instanceof LT) {
              return LT.value;
            }
            ;
            if (v instanceof GT) {
              return GT.value;
            }
            ;
            return compare12(x.value1)(y.value1);
          };
        },
        Eq0: function() {
          return eqTuple2;
        }
      };
    };
  };

  // output/Control.Monad.State.Class/index.js
  var state = function(dict) {
    return dict.state;
  };
  var modify_2 = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(unit, f(s));
      });
    };
  };
  var gets = function(dictMonadState) {
    var state1 = state(dictMonadState);
    return function(f) {
      return state1(function(s) {
        return new Tuple(f(s), s);
      });
    };
  };
  var get = function(dictMonadState) {
    return state(dictMonadState)(function(s) {
      return new Tuple(s, s);
    });
  };

  // output/Effect.Class/index.js
  var monadEffectEffect = {
    liftEffect: /* @__PURE__ */ identity(categoryFn),
    Monad0: function() {
      return monadEffect;
    }
  };
  var liftEffect = function(dict) {
    return dict.liftEffect;
  };

  // output/Control.Monad.Except.Trans/index.js
  var map4 = /* @__PURE__ */ map(functorEither);
  var ExceptT = function(x) {
    return x;
  };
  var runExceptT = function(v) {
    return v;
  };
  var mapExceptT = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var functorExceptT = function(dictFunctor) {
    var map111 = map(dictFunctor);
    return {
      map: function(f) {
        return mapExceptT(map111(map4(f)));
      }
    };
  };
  var monadExceptT = function(dictMonad) {
    return {
      Applicative0: function() {
        return applicativeExceptT(dictMonad);
      },
      Bind1: function() {
        return bindExceptT(dictMonad);
      }
    };
  };
  var bindExceptT = function(dictMonad) {
    var bind16 = bind(dictMonad.Bind1());
    var pure19 = pure(dictMonad.Applicative0());
    return {
      bind: function(v) {
        return function(k) {
          return bind16(v)(either(function($193) {
            return pure19(Left.create($193));
          })(function(a2) {
            var v1 = k(a2);
            return v1;
          }));
        };
      },
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var applyExceptT = function(dictMonad) {
    var functorExceptT1 = functorExceptT(dictMonad.Bind1().Apply0().Functor0());
    return {
      apply: ap(monadExceptT(dictMonad)),
      Functor0: function() {
        return functorExceptT1;
      }
    };
  };
  var applicativeExceptT = function(dictMonad) {
    return {
      pure: function() {
        var $194 = pure(dictMonad.Applicative0());
        return function($195) {
          return ExceptT($194(Right.create($195)));
        };
      }(),
      Apply0: function() {
        return applyExceptT(dictMonad);
      }
    };
  };
  var monadThrowExceptT = function(dictMonad) {
    var monadExceptT1 = monadExceptT(dictMonad);
    return {
      throwError: function() {
        var $204 = pure(dictMonad.Applicative0());
        return function($205) {
          return ExceptT($204(Left.create($205)));
        };
      }(),
      Monad0: function() {
        return monadExceptT1;
      }
    };
  };
  var altExceptT = function(dictSemigroup) {
    var append7 = append(dictSemigroup);
    return function(dictMonad) {
      var Bind1 = dictMonad.Bind1();
      var bind16 = bind(Bind1);
      var pure19 = pure(dictMonad.Applicative0());
      var functorExceptT1 = functorExceptT(Bind1.Apply0().Functor0());
      return {
        alt: function(v) {
          return function(v1) {
            return bind16(v)(function(rm) {
              if (rm instanceof Right) {
                return pure19(new Right(rm.value0));
              }
              ;
              if (rm instanceof Left) {
                return bind16(v1)(function(rn) {
                  if (rn instanceof Right) {
                    return pure19(new Right(rn.value0));
                  }
                  ;
                  if (rn instanceof Left) {
                    return pure19(new Left(append7(rm.value0)(rn.value0)));
                  }
                  ;
                  throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 87, column 9 - line 89, column 49): " + [rn.constructor.name]);
                });
              }
              ;
              throw new Error("Failed pattern match at Control.Monad.Except.Trans (line 83, column 5 - line 89, column 49): " + [rm.constructor.name]);
            });
          };
        },
        Functor0: function() {
          return functorExceptT1;
        }
      };
    };
  };

  // output/Control.Monad.Except/index.js
  var unwrap3 = /* @__PURE__ */ unwrap();
  var runExcept = function($3) {
    return unwrap3(runExceptT($3));
  };

  // output/Data.Argonaut.Core/foreign.js
  function id(x) {
    return x;
  }
  var jsonNull = null;
  function stringify(j) {
    return JSON.stringify(j);
  }

  // output/Foreign.Object/foreign.js
  function _copyST(m) {
    return function() {
      var r = {};
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r[k] = m[k];
        }
      }
      return r;
    };
  }
  var empty = {};
  function runST(f) {
    return f();
  }
  function _lookup(no, yes, k, m) {
    return k in m ? yes(m[k]) : no;
  }
  function toArrayWithKey(f) {
    return function(m) {
      var r = [];
      for (var k in m) {
        if (hasOwnProperty.call(m, k)) {
          r.push(f(k)(m[k]));
        }
      }
      return r;
    };
  }
  var keys = Object.keys || toArrayWithKey(function(k) {
    return function() {
      return k;
    };
  });

  // output/Data.Array/foreign.js
  var rangeImpl = function(start2, end) {
    var step4 = start2 > end ? -1 : 1;
    var result = new Array(step4 * (end - start2) + 1);
    var i2 = start2, n = 0;
    while (i2 !== end) {
      result[n++] = i2;
      i2 += step4;
    }
    result[n] = i2;
    return result;
  };
  var replicateFill = function(count, value18) {
    if (count < 1) {
      return [];
    }
    var result = new Array(count);
    return result.fill(value18);
  };
  var replicatePolyfill = function(count, value18) {
    var result = [];
    var n = 0;
    for (var i2 = 0; i2 < count; i2++) {
      result[n++] = value18;
    }
    return result;
  };
  var replicateImpl = typeof Array.prototype.fill === "function" ? replicateFill : replicatePolyfill;
  var length = function(xs) {
    return xs.length;
  };
  var indexImpl = function(just, nothing, xs, i2) {
    return i2 < 0 || i2 >= xs.length ? nothing : just(xs[i2]);
  };
  var findIndexImpl = function(just, nothing, f, xs) {
    for (var i2 = 0, l = xs.length; i2 < l; i2++) {
      if (f(xs[i2])) return just(i2);
    }
    return nothing;
  };
  var _deleteAt = function(just, nothing, i2, l) {
    if (i2 < 0 || i2 >= l.length) return nothing;
    var l1 = l.slice();
    l1.splice(i2, 1);
    return just(l1);
  };
  var _updateAt = function(just, nothing, i2, a2, l) {
    if (i2 < 0 || i2 >= l.length) return nothing;
    var l1 = l.slice();
    l1[i2] = a2;
    return just(l1);
  };
  var filterImpl = function(f, xs) {
    return xs.filter(f);
  };
  var sliceImpl = function(s, e, l) {
    return l.slice(s, e);
  };
  var zipWithImpl = function(f, xs, ys) {
    var l = xs.length < ys.length ? xs.length : ys.length;
    var result = new Array(l);
    for (var i2 = 0; i2 < l; i2++) {
      result[i2] = f(xs[i2])(ys[i2]);
    }
    return result;
  };

  // output/Data.Array.ST/foreign.js
  function unsafeFreezeThawImpl(xs) {
    return xs;
  }
  var unsafeFreezeImpl = unsafeFreezeThawImpl;
  function copyImpl(xs) {
    return xs.slice();
  }
  var thawImpl = copyImpl;
  var pushImpl = function(a2, xs) {
    return xs.push(a2);
  };

  // output/Control.Monad.ST.Uncurried/foreign.js
  var runSTFn1 = function runSTFn12(fn) {
    return function(a2) {
      return function() {
        return fn(a2);
      };
    };
  };
  var runSTFn2 = function runSTFn22(fn) {
    return function(a2) {
      return function(b2) {
        return function() {
          return fn(a2, b2);
        };
      };
    };
  };

  // output/Data.Array.ST/index.js
  var unsafeFreeze = /* @__PURE__ */ runSTFn1(unsafeFreezeImpl);
  var thaw = /* @__PURE__ */ runSTFn1(thawImpl);
  var withArray = function(f) {
    return function(xs) {
      return function __do4() {
        var result = thaw(xs)();
        f(result)();
        return unsafeFreeze(result)();
      };
    };
  };
  var push = /* @__PURE__ */ runSTFn2(pushImpl);

  // output/Data.Foldable/foreign.js
  var foldrArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = len - 1; i2 >= 0; i2--) {
          acc = f(xs[i2])(acc);
        }
        return acc;
      };
    };
  };
  var foldlArray = function(f) {
    return function(init3) {
      return function(xs) {
        var acc = init3;
        var len = xs.length;
        for (var i2 = 0; i2 < len; i2++) {
          acc = f(acc)(xs[i2]);
        }
        return acc;
      };
    };
  };

  // output/Control.Plus/index.js
  var empty2 = function(dict) {
    return dict.empty;
  };

  // output/Data.Bifunctor/index.js
  var bimap = function(dict) {
    return dict.bimap;
  };

  // output/Data.Monoid.Disj/index.js
  var Disj = function(x) {
    return x;
  };
  var semigroupDisj = function(dictHeytingAlgebra) {
    var disj2 = disj(dictHeytingAlgebra);
    return {
      append: function(v) {
        return function(v1) {
          return disj2(v)(v1);
        };
      }
    };
  };
  var monoidDisj = function(dictHeytingAlgebra) {
    var semigroupDisj1 = semigroupDisj(dictHeytingAlgebra);
    return {
      mempty: ff(dictHeytingAlgebra),
      Semigroup0: function() {
        return semigroupDisj1;
      }
    };
  };

  // output/Data.Foldable/index.js
  var alaF2 = /* @__PURE__ */ alaF()()()();
  var foldr = function(dict) {
    return dict.foldr;
  };
  var traverse_ = function(dictApplicative) {
    var applySecond2 = applySecond(dictApplicative.Apply0());
    var pure19 = pure(dictApplicative);
    return function(dictFoldable) {
      var foldr22 = foldr(dictFoldable);
      return function(f) {
        return foldr22(function($454) {
          return applySecond2(f($454));
        })(pure19(unit));
      };
    };
  };
  var for_ = function(dictApplicative) {
    var traverse_14 = traverse_(dictApplicative);
    return function(dictFoldable) {
      return flip(traverse_14(dictFoldable));
    };
  };
  var foldl = function(dict) {
    return dict.foldl;
  };
  var foldableMaybe = {
    foldr: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v2.value0)(v1);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldl: function(v) {
      return function(v1) {
        return function(v2) {
          if (v2 instanceof Nothing) {
            return v1;
          }
          ;
          if (v2 instanceof Just) {
            return v(v1)(v2.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      return function(v) {
        return function(v1) {
          if (v1 instanceof Nothing) {
            return mempty2;
          }
          ;
          if (v1 instanceof Just) {
            return v(v1.value0);
          }
          ;
          throw new Error("Failed pattern match at Data.Foldable (line 138, column 1 - line 144, column 27): " + [v.constructor.name, v1.constructor.name]);
        };
      };
    }
  };
  var foldMapDefaultR = function(dictFoldable) {
    var foldr22 = foldr(dictFoldable);
    return function(dictMonoid) {
      var append7 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldr22(function(x) {
          return function(acc) {
            return append7(f(x))(acc);
          };
        })(mempty2);
      };
    };
  };
  var foldableArray = {
    foldr: foldrArray,
    foldl: foldlArray,
    foldMap: function(dictMonoid) {
      return foldMapDefaultR(foldableArray)(dictMonoid);
    }
  };
  var foldMap = function(dict) {
    return dict.foldMap;
  };
  var any = function(dictFoldable) {
    var foldMap2 = foldMap(dictFoldable);
    return function(dictHeytingAlgebra) {
      return alaF2(Disj)(foldMap2(monoidDisj(dictHeytingAlgebra)));
    };
  };

  // output/Data.Function.Uncurried/foreign.js
  var runFn2 = function(fn) {
    return function(a2) {
      return function(b2) {
        return fn(a2, b2);
      };
    };
  };
  var runFn3 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return fn(a2, b2, c);
        };
      };
    };
  };
  var runFn4 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return fn(a2, b2, c, d);
          };
        };
      };
    };
  };
  var runFn5 = function(fn) {
    return function(a2) {
      return function(b2) {
        return function(c) {
          return function(d) {
            return function(e) {
              return fn(a2, b2, c, d, e);
            };
          };
        };
      };
    };
  };

  // output/Data.Traversable/foreign.js
  var traverseArrayImpl = /* @__PURE__ */ function() {
    function array1(a2) {
      return [a2];
    }
    function array2(a2) {
      return function(b2) {
        return [a2, b2];
      };
    }
    function array3(a2) {
      return function(b2) {
        return function(c) {
          return [a2, b2, c];
        };
      };
    }
    function concat2(xs) {
      return function(ys) {
        return xs.concat(ys);
      };
    }
    return function(apply3) {
      return function(map27) {
        return function(pure19) {
          return function(f) {
            return function(array) {
              function go2(bot, top3) {
                switch (top3 - bot) {
                  case 0:
                    return pure19([]);
                  case 1:
                    return map27(array1)(f(array[bot]));
                  case 2:
                    return apply3(map27(array2)(f(array[bot])))(f(array[bot + 1]));
                  case 3:
                    return apply3(apply3(map27(array3)(f(array[bot])))(f(array[bot + 1])))(f(array[bot + 2]));
                  default:
                    var pivot = bot + Math.floor((top3 - bot) / 4) * 2;
                    return apply3(map27(concat2)(go2(bot, pivot)))(go2(pivot, top3));
                }
              }
              return go2(0, array.length);
            };
          };
        };
      };
    };
  }();

  // output/Data.Traversable/index.js
  var identity5 = /* @__PURE__ */ identity(categoryFn);
  var traverse = function(dict) {
    return dict.traverse;
  };
  var sequenceDefault = function(dictTraversable) {
    var traverse22 = traverse(dictTraversable);
    return function(dictApplicative) {
      return traverse22(dictApplicative)(identity5);
    };
  };
  var traversableArray = {
    traverse: function(dictApplicative) {
      var Apply0 = dictApplicative.Apply0();
      return traverseArrayImpl(apply(Apply0))(map(Apply0.Functor0()))(pure(dictApplicative));
    },
    sequence: function(dictApplicative) {
      return sequenceDefault(traversableArray)(dictApplicative);
    },
    Functor0: function() {
      return functorArray;
    },
    Foldable1: function() {
      return foldableArray;
    }
  };

  // output/Data.Array/index.js
  var fromJust2 = /* @__PURE__ */ fromJust();
  var zipWith = /* @__PURE__ */ runFn3(zipWithImpl);
  var zip = /* @__PURE__ */ function() {
    return zipWith(Tuple.create);
  }();
  var updateAt = /* @__PURE__ */ function() {
    return runFn5(_updateAt)(Just.create)(Nothing.value);
  }();
  var snoc = function(xs) {
    return function(x) {
      return withArray(push(x))(xs)();
    };
  };
  var slice = /* @__PURE__ */ runFn3(sliceImpl);
  var take = function(n) {
    return function(xs) {
      var $152 = n < 1;
      if ($152) {
        return [];
      }
      ;
      return slice(0)(n)(xs);
    };
  };
  var replicate = /* @__PURE__ */ runFn2(replicateImpl);
  var range2 = /* @__PURE__ */ runFn2(rangeImpl);
  var index = /* @__PURE__ */ function() {
    return runFn4(indexImpl)(Just.create)(Nothing.value);
  }();
  var last = function(xs) {
    return index(xs)(length(xs) - 1 | 0);
  };
  var head = function(xs) {
    return index(xs)(0);
  };
  var foldl2 = /* @__PURE__ */ foldl(foldableArray);
  var findIndex = /* @__PURE__ */ function() {
    return runFn4(findIndexImpl)(Just.create)(Nothing.value);
  }();
  var filter = /* @__PURE__ */ runFn2(filterImpl);
  var drop = function(n) {
    return function(xs) {
      var $173 = n < 1;
      if ($173) {
        return xs;
      }
      ;
      return slice(n)(length(xs))(xs);
    };
  };
  var deleteAt = /* @__PURE__ */ function() {
    return runFn4(_deleteAt)(Just.create)(Nothing.value);
  }();
  var deleteBy = function(v) {
    return function(v1) {
      return function(v2) {
        if (v2.length === 0) {
          return [];
        }
        ;
        return maybe(v2)(function(i2) {
          return fromJust2(deleteAt(i2)(v2));
        })(findIndex(v(v1))(v2));
      };
    };
  };

  // output/Foreign.Object.ST/foreign.js
  var newImpl = function() {
    return {};
  };
  function poke2(k) {
    return function(v) {
      return function(m) {
        return function() {
          m[k] = v;
          return m;
        };
      };
    };
  }

  // output/Foreign.Object/index.js
  var bindFlipped3 = /* @__PURE__ */ bindFlipped(bindST);
  var thawST = _copyST;
  var singleton2 = function(k) {
    return function(v) {
      return runST(bindFlipped3(poke2(k)(v))(newImpl));
    };
  };
  var mutate = function(f) {
    return function(m) {
      return runST(function __do4() {
        var s = thawST(m)();
        f(s)();
        return s;
      });
    };
  };
  var lookup = /* @__PURE__ */ function() {
    return runFn4(_lookup)(Nothing.value)(Just.create);
  }();
  var insert = function(k) {
    return function(v) {
      return mutate(poke2(k)(v));
    };
  };

  // output/Data.Argonaut.Core/index.js
  var jsonSingletonObject = function(key2) {
    return function(val) {
      return id(singleton2(key2)(val));
    };
  };
  var jsonEmptyObject = /* @__PURE__ */ id(empty);

  // output/Data.Argonaut.Parser/foreign.js
  function _jsonParser(fail3, succ2, s) {
    try {
      return succ2(JSON.parse(s));
    } catch (e) {
      return fail3(e.message);
    }
  }

  // output/Data.Argonaut.Parser/index.js
  var jsonParser = function(j) {
    return _jsonParser(Left.create, Right.create, j);
  };

  // output/Data.String.Common/foreign.js
  var toLower = function(s) {
    return s.toLowerCase();
  };
  var joinWith = function(s) {
    return function(xs) {
      return xs.join(s);
    };
  };

  // output/JSURI/foreign.js
  function encodeURIComponent_to_RFC3986(input3) {
    return input3.replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16);
    });
  }
  function _encodeFormURLComponent(fail3, succeed, input3) {
    try {
      return succeed(encodeURIComponent_to_RFC3986(encodeURIComponent(input3)).replace(/%20/g, "+"));
    } catch (err) {
      return fail3(err);
    }
  }

  // output/JSURI/index.js
  var encodeFormURLComponent = /* @__PURE__ */ function() {
    return runFn3(_encodeFormURLComponent)($$const(Nothing.value))(Just.create);
  }();

  // output/Data.FormURLEncoded/index.js
  var apply2 = /* @__PURE__ */ apply(applyMaybe);
  var map5 = /* @__PURE__ */ map(functorMaybe);
  var traverse2 = /* @__PURE__ */ traverse(traversableArray)(applicativeMaybe);
  var toArray = function(v) {
    return v;
  };
  var encode = /* @__PURE__ */ function() {
    var encodePart = function(v) {
      if (v.value1 instanceof Nothing) {
        return encodeFormURLComponent(v.value0);
      }
      ;
      if (v.value1 instanceof Just) {
        return apply2(map5(function(key2) {
          return function(val) {
            return key2 + ("=" + val);
          };
        })(encodeFormURLComponent(v.value0)))(encodeFormURLComponent(v.value1.value0));
      }
      ;
      throw new Error("Failed pattern match at Data.FormURLEncoded (line 37, column 16 - line 39, column 114): " + [v.constructor.name]);
    };
    var $37 = map5(joinWith("&"));
    var $38 = traverse2(encodePart);
    return function($39) {
      return $37($38(toArray($39)));
    };
  }();

  // output/Data.HTTP.Method/index.js
  var OPTIONS = /* @__PURE__ */ function() {
    function OPTIONS2() {
    }
    ;
    OPTIONS2.value = new OPTIONS2();
    return OPTIONS2;
  }();
  var GET = /* @__PURE__ */ function() {
    function GET3() {
    }
    ;
    GET3.value = new GET3();
    return GET3;
  }();
  var HEAD = /* @__PURE__ */ function() {
    function HEAD2() {
    }
    ;
    HEAD2.value = new HEAD2();
    return HEAD2;
  }();
  var POST = /* @__PURE__ */ function() {
    function POST3() {
    }
    ;
    POST3.value = new POST3();
    return POST3;
  }();
  var PUT = /* @__PURE__ */ function() {
    function PUT2() {
    }
    ;
    PUT2.value = new PUT2();
    return PUT2;
  }();
  var DELETE = /* @__PURE__ */ function() {
    function DELETE2() {
    }
    ;
    DELETE2.value = new DELETE2();
    return DELETE2;
  }();
  var TRACE = /* @__PURE__ */ function() {
    function TRACE2() {
    }
    ;
    TRACE2.value = new TRACE2();
    return TRACE2;
  }();
  var CONNECT = /* @__PURE__ */ function() {
    function CONNECT2() {
    }
    ;
    CONNECT2.value = new CONNECT2();
    return CONNECT2;
  }();
  var PROPFIND = /* @__PURE__ */ function() {
    function PROPFIND2() {
    }
    ;
    PROPFIND2.value = new PROPFIND2();
    return PROPFIND2;
  }();
  var PROPPATCH = /* @__PURE__ */ function() {
    function PROPPATCH2() {
    }
    ;
    PROPPATCH2.value = new PROPPATCH2();
    return PROPPATCH2;
  }();
  var MKCOL = /* @__PURE__ */ function() {
    function MKCOL2() {
    }
    ;
    MKCOL2.value = new MKCOL2();
    return MKCOL2;
  }();
  var COPY = /* @__PURE__ */ function() {
    function COPY2() {
    }
    ;
    COPY2.value = new COPY2();
    return COPY2;
  }();
  var MOVE = /* @__PURE__ */ function() {
    function MOVE2() {
    }
    ;
    MOVE2.value = new MOVE2();
    return MOVE2;
  }();
  var LOCK = /* @__PURE__ */ function() {
    function LOCK2() {
    }
    ;
    LOCK2.value = new LOCK2();
    return LOCK2;
  }();
  var UNLOCK = /* @__PURE__ */ function() {
    function UNLOCK2() {
    }
    ;
    UNLOCK2.value = new UNLOCK2();
    return UNLOCK2;
  }();
  var PATCH = /* @__PURE__ */ function() {
    function PATCH2() {
    }
    ;
    PATCH2.value = new PATCH2();
    return PATCH2;
  }();
  var unCustomMethod = function(v) {
    return v;
  };
  var showMethod = {
    show: function(v) {
      if (v instanceof OPTIONS) {
        return "OPTIONS";
      }
      ;
      if (v instanceof GET) {
        return "GET";
      }
      ;
      if (v instanceof HEAD) {
        return "HEAD";
      }
      ;
      if (v instanceof POST) {
        return "POST";
      }
      ;
      if (v instanceof PUT) {
        return "PUT";
      }
      ;
      if (v instanceof DELETE) {
        return "DELETE";
      }
      ;
      if (v instanceof TRACE) {
        return "TRACE";
      }
      ;
      if (v instanceof CONNECT) {
        return "CONNECT";
      }
      ;
      if (v instanceof PROPFIND) {
        return "PROPFIND";
      }
      ;
      if (v instanceof PROPPATCH) {
        return "PROPPATCH";
      }
      ;
      if (v instanceof MKCOL) {
        return "MKCOL";
      }
      ;
      if (v instanceof COPY) {
        return "COPY";
      }
      ;
      if (v instanceof MOVE) {
        return "MOVE";
      }
      ;
      if (v instanceof LOCK) {
        return "LOCK";
      }
      ;
      if (v instanceof UNLOCK) {
        return "UNLOCK";
      }
      ;
      if (v instanceof PATCH) {
        return "PATCH";
      }
      ;
      throw new Error("Failed pattern match at Data.HTTP.Method (line 43, column 1 - line 59, column 23): " + [v.constructor.name]);
    }
  };
  var print = /* @__PURE__ */ either(/* @__PURE__ */ show(showMethod))(unCustomMethod);

  // output/Data.NonEmpty/index.js
  var NonEmpty = /* @__PURE__ */ function() {
    function NonEmpty2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    NonEmpty2.create = function(value0) {
      return function(value1) {
        return new NonEmpty2(value0, value1);
      };
    };
    return NonEmpty2;
  }();
  var singleton3 = function(dictPlus) {
    var empty7 = empty2(dictPlus);
    return function(a2) {
      return new NonEmpty(a2, empty7);
    };
  };

  // output/Data.List.Types/index.js
  var Nil = /* @__PURE__ */ function() {
    function Nil2() {
    }
    ;
    Nil2.value = new Nil2();
    return Nil2;
  }();
  var Cons = /* @__PURE__ */ function() {
    function Cons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Cons2.create = function(value0) {
      return function(value1) {
        return new Cons2(value0, value1);
      };
    };
    return Cons2;
  }();
  var NonEmptyList = function(x) {
    return x;
  };
  var toList = function(v) {
    return new Cons(v.value0, v.value1);
  };
  var listMap = function(f) {
    var chunkedRevMap = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Cons && (v1.value1 instanceof Cons && v1.value1.value1 instanceof Cons)) {
            $tco_var_v = new Cons(v1, v);
            $copy_v1 = v1.value1.value1.value1;
            return;
          }
          ;
          var unrolledMap = function(v2) {
            if (v2 instanceof Cons && (v2.value1 instanceof Cons && v2.value1.value1 instanceof Nil)) {
              return new Cons(f(v2.value0), new Cons(f(v2.value1.value0), Nil.value));
            }
            ;
            if (v2 instanceof Cons && v2.value1 instanceof Nil) {
              return new Cons(f(v2.value0), Nil.value);
            }
            ;
            return Nil.value;
          };
          var reverseUnrolledMap = function($copy_v2) {
            return function($copy_v3) {
              var $tco_var_v2 = $copy_v2;
              var $tco_done1 = false;
              var $tco_result2;
              function $tco_loop2(v2, v3) {
                if (v2 instanceof Cons && (v2.value0 instanceof Cons && (v2.value0.value1 instanceof Cons && v2.value0.value1.value1 instanceof Cons))) {
                  $tco_var_v2 = v2.value1;
                  $copy_v3 = new Cons(f(v2.value0.value0), new Cons(f(v2.value0.value1.value0), new Cons(f(v2.value0.value1.value1.value0), v3)));
                  return;
                }
                ;
                $tco_done1 = true;
                return v3;
              }
              ;
              while (!$tco_done1) {
                $tco_result2 = $tco_loop2($tco_var_v2, $copy_v3);
              }
              ;
              return $tco_result2;
            };
          };
          $tco_done = true;
          return reverseUnrolledMap(v)(unrolledMap(v1));
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return chunkedRevMap(Nil.value);
  };
  var functorList = {
    map: listMap
  };
  var foldableList = {
    foldr: function(f) {
      return function(b2) {
        var rev3 = function() {
          var go2 = function($copy_v) {
            return function($copy_v1) {
              var $tco_var_v = $copy_v;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1) {
                if (v1 instanceof Nil) {
                  $tco_done = true;
                  return v;
                }
                ;
                if (v1 instanceof Cons) {
                  $tco_var_v = new Cons(v1.value0, v);
                  $copy_v1 = v1.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.List.Types (line 107, column 7 - line 107, column 23): " + [v.constructor.name, v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $copy_v1);
              }
              ;
              return $tco_result;
            };
          };
          return go2(Nil.value);
        }();
        var $284 = foldl(foldableList)(flip(f))(b2);
        return function($285) {
          return $284(rev3($285));
        };
      };
    },
    foldl: function(f) {
      var go2 = function($copy_b) {
        return function($copy_v) {
          var $tco_var_b = $copy_b;
          var $tco_done1 = false;
          var $tco_result;
          function $tco_loop(b2, v) {
            if (v instanceof Nil) {
              $tco_done1 = true;
              return b2;
            }
            ;
            if (v instanceof Cons) {
              $tco_var_b = f(b2)(v.value0);
              $copy_v = v.value1;
              return;
            }
            ;
            throw new Error("Failed pattern match at Data.List.Types (line 111, column 12 - line 113, column 30): " + [v.constructor.name]);
          }
          ;
          while (!$tco_done1) {
            $tco_result = $tco_loop($tco_var_b, $copy_v);
          }
          ;
          return $tco_result;
        };
      };
      return go2;
    },
    foldMap: function(dictMonoid) {
      var append22 = append(dictMonoid.Semigroup0());
      var mempty2 = mempty(dictMonoid);
      return function(f) {
        return foldl(foldableList)(function(acc) {
          var $286 = append22(acc);
          return function($287) {
            return $286(f($287));
          };
        })(mempty2);
      };
    }
  };
  var foldr2 = /* @__PURE__ */ foldr(foldableList);
  var semigroupList = {
    append: function(xs) {
      return function(ys) {
        return foldr2(Cons.create)(ys)(xs);
      };
    }
  };
  var append1 = /* @__PURE__ */ append(semigroupList);
  var semigroupNonEmptyList = {
    append: function(v) {
      return function(as$prime) {
        return new NonEmpty(v.value0, append1(v.value1)(toList(as$prime)));
      };
    }
  };
  var altList = {
    alt: append1,
    Functor0: function() {
      return functorList;
    }
  };
  var plusList = /* @__PURE__ */ function() {
    return {
      empty: Nil.value,
      Alt0: function() {
        return altList;
      }
    };
  }();

  // output/Data.List/index.js
  var reverse2 = /* @__PURE__ */ function() {
    var go2 = function($copy_v) {
      return function($copy_v1) {
        var $tco_var_v = $copy_v;
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v, v1) {
          if (v1 instanceof Nil) {
            $tco_done = true;
            return v;
          }
          ;
          if (v1 instanceof Cons) {
            $tco_var_v = new Cons(v1.value0, v);
            $copy_v1 = v1.value1;
            return;
          }
          ;
          throw new Error("Failed pattern match at Data.List (line 368, column 3 - line 368, column 19): " + [v.constructor.name, v1.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($tco_var_v, $copy_v1);
        }
        ;
        return $tco_result;
      };
    };
    return go2(Nil.value);
  }();
  var $$null = function(v) {
    if (v instanceof Nil) {
      return true;
    }
    ;
    return false;
  };

  // output/Partial.Unsafe/foreign.js
  var _unsafePartial = function(f) {
    return f();
  };

  // output/Partial/foreign.js
  var _crashWith = function(msg) {
    throw new Error(msg);
  };

  // output/Partial/index.js
  var crashWith = function() {
    return _crashWith;
  };

  // output/Partial.Unsafe/index.js
  var crashWith2 = /* @__PURE__ */ crashWith();
  var unsafePartial = _unsafePartial;
  var unsafeCrashWith = function(msg) {
    return unsafePartial(function() {
      return crashWith2(msg);
    });
  };

  // output/Data.List.NonEmpty/index.js
  var singleton4 = /* @__PURE__ */ function() {
    var $200 = singleton3(plusList);
    return function($201) {
      return NonEmptyList($200($201));
    };
  }();
  var head2 = function(v) {
    return v.value0;
  };
  var cons = function(y) {
    return function(v) {
      return new NonEmpty(y, new Cons(v.value0, v.value1));
    };
  };

  // output/Data.Nullable/foreign.js
  var nullImpl = null;
  function nullable(a2, r, f) {
    return a2 == null ? r : f(a2);
  }
  function notNull(x) {
    return x;
  }

  // output/Data.Nullable/index.js
  var toNullable = /* @__PURE__ */ maybe(nullImpl)(notNull);
  var toMaybe = function(n) {
    return nullable(n, Nothing.value, Just.create);
  };

  // output/Effect.Aff/foreign.js
  var Aff = function() {
    var EMPTY = {};
    var PURE = "Pure";
    var THROW = "Throw";
    var CATCH = "Catch";
    var SYNC = "Sync";
    var ASYNC = "Async";
    var BIND = "Bind";
    var BRACKET = "Bracket";
    var FORK = "Fork";
    var SEQ = "Sequential";
    var MAP = "Map";
    var APPLY = "Apply";
    var ALT = "Alt";
    var CONS = "Cons";
    var RESUME = "Resume";
    var RELEASE = "Release";
    var FINALIZER = "Finalizer";
    var FINALIZED = "Finalized";
    var FORKED = "Forked";
    var FIBER = "Fiber";
    var THUNK = "Thunk";
    function Aff2(tag, _1, _2, _3) {
      this.tag = tag;
      this._1 = _1;
      this._2 = _2;
      this._3 = _3;
    }
    function AffCtr(tag) {
      var fn = function(_1, _2, _3) {
        return new Aff2(tag, _1, _2, _3);
      };
      fn.tag = tag;
      return fn;
    }
    function nonCanceler2(error4) {
      return new Aff2(PURE, void 0);
    }
    function runEff(eff) {
      try {
        eff();
      } catch (error4) {
        setTimeout(function() {
          throw error4;
        }, 0);
      }
    }
    function runSync(left, right, eff) {
      try {
        return right(eff());
      } catch (error4) {
        return left(error4);
      }
    }
    function runAsync(left, eff, k) {
      try {
        return eff(k)();
      } catch (error4) {
        k(left(error4))();
        return nonCanceler2;
      }
    }
    var Scheduler = function() {
      var limit = 1024;
      var size5 = 0;
      var ix = 0;
      var queue = new Array(limit);
      var draining = false;
      function drain() {
        var thunk;
        draining = true;
        while (size5 !== 0) {
          size5--;
          thunk = queue[ix];
          queue[ix] = void 0;
          ix = (ix + 1) % limit;
          thunk();
        }
        draining = false;
      }
      return {
        isDraining: function() {
          return draining;
        },
        enqueue: function(cb) {
          var i2, tmp;
          if (size5 === limit) {
            tmp = draining;
            drain();
            draining = tmp;
          }
          queue[(ix + size5) % limit] = cb;
          size5++;
          if (!draining) {
            drain();
          }
        }
      };
    }();
    function Supervisor(util) {
      var fibers = {};
      var fiberId = 0;
      var count = 0;
      return {
        register: function(fiber) {
          var fid = fiberId++;
          fiber.onComplete({
            rethrow: true,
            handler: function(result) {
              return function() {
                count--;
                delete fibers[fid];
              };
            }
          })();
          fibers[fid] = fiber;
          count++;
        },
        isEmpty: function() {
          return count === 0;
        },
        killAll: function(killError, cb) {
          return function() {
            if (count === 0) {
              return cb();
            }
            var killCount = 0;
            var kills = {};
            function kill2(fid) {
              kills[fid] = fibers[fid].kill(killError, function(result) {
                return function() {
                  delete kills[fid];
                  killCount--;
                  if (util.isLeft(result) && util.fromLeft(result)) {
                    setTimeout(function() {
                      throw util.fromLeft(result);
                    }, 0);
                  }
                  if (killCount === 0) {
                    cb();
                  }
                };
              })();
            }
            for (var k in fibers) {
              if (fibers.hasOwnProperty(k)) {
                killCount++;
                kill2(k);
              }
            }
            fibers = {};
            fiberId = 0;
            count = 0;
            return function(error4) {
              return new Aff2(SYNC, function() {
                for (var k2 in kills) {
                  if (kills.hasOwnProperty(k2)) {
                    kills[k2]();
                  }
                }
              });
            };
          };
        }
      };
    }
    var SUSPENDED = 0;
    var CONTINUE = 1;
    var STEP_BIND = 2;
    var STEP_RESULT = 3;
    var PENDING = 4;
    var RETURN = 5;
    var COMPLETED = 6;
    function Fiber(util, supervisor, aff) {
      var runTick = 0;
      var status = SUSPENDED;
      var step4 = aff;
      var fail3 = null;
      var interrupt = null;
      var bhead = null;
      var btail = null;
      var attempts = null;
      var bracketCount = 0;
      var joinId = 0;
      var joins = null;
      var rethrow = true;
      function run3(localRunTick) {
        var tmp, result, attempt;
        while (true) {
          tmp = null;
          result = null;
          attempt = null;
          switch (status) {
            case STEP_BIND:
              status = CONTINUE;
              try {
                step4 = bhead(step4);
                if (btail === null) {
                  bhead = null;
                } else {
                  bhead = btail._1;
                  btail = btail._2;
                }
              } catch (e) {
                status = RETURN;
                fail3 = util.left(e);
                step4 = null;
              }
              break;
            case STEP_RESULT:
              if (util.isLeft(step4)) {
                status = RETURN;
                fail3 = step4;
                step4 = null;
              } else if (bhead === null) {
                status = RETURN;
              } else {
                status = STEP_BIND;
                step4 = util.fromRight(step4);
              }
              break;
            case CONTINUE:
              switch (step4.tag) {
                case BIND:
                  if (bhead) {
                    btail = new Aff2(CONS, bhead, btail);
                  }
                  bhead = step4._2;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case PURE:
                  if (bhead === null) {
                    status = RETURN;
                    step4 = util.right(step4._1);
                  } else {
                    status = STEP_BIND;
                    step4 = step4._1;
                  }
                  break;
                case SYNC:
                  status = STEP_RESULT;
                  step4 = runSync(util.left, util.right, step4._1);
                  break;
                case ASYNC:
                  status = PENDING;
                  step4 = runAsync(util.left, step4._1, function(result2) {
                    return function() {
                      if (runTick !== localRunTick) {
                        return;
                      }
                      runTick++;
                      Scheduler.enqueue(function() {
                        if (runTick !== localRunTick + 1) {
                          return;
                        }
                        status = STEP_RESULT;
                        step4 = result2;
                        run3(runTick);
                      });
                    };
                  });
                  return;
                case THROW:
                  status = RETURN;
                  fail3 = util.left(step4._1);
                  step4 = null;
                  break;
                // Enqueue the Catch so that we can call the error handler later on
                // in case of an exception.
                case CATCH:
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                // Enqueue the Bracket so that we can call the appropriate handlers
                // after resource acquisition.
                case BRACKET:
                  bracketCount++;
                  if (bhead === null) {
                    attempts = new Aff2(CONS, step4, attempts, interrupt);
                  } else {
                    attempts = new Aff2(CONS, step4, new Aff2(CONS, new Aff2(RESUME, bhead, btail), attempts, interrupt), interrupt);
                  }
                  bhead = null;
                  btail = null;
                  status = CONTINUE;
                  step4 = step4._1;
                  break;
                case FORK:
                  status = STEP_RESULT;
                  tmp = Fiber(util, supervisor, step4._2);
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
                  if (step4._1) {
                    tmp.run();
                  }
                  step4 = util.right(tmp);
                  break;
                case SEQ:
                  status = CONTINUE;
                  step4 = sequential3(util, supervisor, step4._1);
                  break;
              }
              break;
            case RETURN:
              bhead = null;
              btail = null;
              if (attempts === null) {
                status = COMPLETED;
                step4 = interrupt || fail3 || step4;
              } else {
                tmp = attempts._3;
                attempt = attempts._1;
                attempts = attempts._2;
                switch (attempt.tag) {
                  // We cannot recover from an unmasked interrupt. Otherwise we should
                  // continue stepping, or run the exception handler if an exception
                  // was raised.
                  case CATCH:
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      status = RETURN;
                    } else if (fail3) {
                      status = CONTINUE;
                      step4 = attempt._2(util.fromLeft(fail3));
                      fail3 = null;
                    }
                    break;
                  // We cannot resume from an unmasked interrupt or exception.
                  case RESUME:
                    if (interrupt && interrupt !== tmp && bracketCount === 0 || fail3) {
                      status = RETURN;
                    } else {
                      bhead = attempt._1;
                      btail = attempt._2;
                      status = STEP_BIND;
                      step4 = util.fromRight(step4);
                    }
                    break;
                  // If we have a bracket, we should enqueue the handlers,
                  // and continue with the success branch only if the fiber has
                  // not been interrupted. If the bracket acquisition failed, we
                  // should not run either.
                  case BRACKET:
                    bracketCount--;
                    if (fail3 === null) {
                      result = util.fromRight(step4);
                      attempts = new Aff2(CONS, new Aff2(RELEASE, attempt._2, result), attempts, tmp);
                      if (interrupt === tmp || bracketCount > 0) {
                        status = CONTINUE;
                        step4 = attempt._3(result);
                      }
                    }
                    break;
                  // Enqueue the appropriate handler. We increase the bracket count
                  // because it should not be cancelled.
                  case RELEASE:
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    if (interrupt && interrupt !== tmp && bracketCount === 0) {
                      step4 = attempt._1.killed(util.fromLeft(interrupt))(attempt._2);
                    } else if (fail3) {
                      step4 = attempt._1.failed(util.fromLeft(fail3))(attempt._2);
                    } else {
                      step4 = attempt._1.completed(util.fromRight(step4))(attempt._2);
                    }
                    fail3 = null;
                    bracketCount++;
                    break;
                  case FINALIZER:
                    bracketCount++;
                    attempts = new Aff2(CONS, new Aff2(FINALIZED, step4, fail3), attempts, interrupt);
                    status = CONTINUE;
                    step4 = attempt._1;
                    break;
                  case FINALIZED:
                    bracketCount--;
                    status = RETURN;
                    step4 = attempt._1;
                    fail3 = attempt._2;
                    break;
                }
              }
              break;
            case COMPLETED:
              for (var k in joins) {
                if (joins.hasOwnProperty(k)) {
                  rethrow = rethrow && joins[k].rethrow;
                  runEff(joins[k].handler(step4));
                }
              }
              joins = null;
              if (interrupt && fail3) {
                setTimeout(function() {
                  throw util.fromLeft(fail3);
                }, 0);
              } else if (util.isLeft(step4) && rethrow) {
                setTimeout(function() {
                  if (rethrow) {
                    throw util.fromLeft(step4);
                  }
                }, 0);
              }
              return;
            case SUSPENDED:
              status = CONTINUE;
              break;
            case PENDING:
              return;
          }
        }
      }
      function onComplete(join4) {
        return function() {
          if (status === COMPLETED) {
            rethrow = rethrow && join4.rethrow;
            join4.handler(step4)();
            return function() {
            };
          }
          var jid = joinId++;
          joins = joins || {};
          joins[jid] = join4;
          return function() {
            if (joins !== null) {
              delete joins[jid];
            }
          };
        };
      }
      function kill2(error4, cb) {
        return function() {
          if (status === COMPLETED) {
            cb(util.right(void 0))();
            return function() {
            };
          }
          var canceler = onComplete({
            rethrow: false,
            handler: function() {
              return cb(util.right(void 0));
            }
          })();
          switch (status) {
            case SUSPENDED:
              interrupt = util.left(error4);
              status = COMPLETED;
              step4 = interrupt;
              run3(runTick);
              break;
            case PENDING:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                if (status === PENDING) {
                  attempts = new Aff2(CONS, new Aff2(FINALIZER, step4(error4)), attempts, interrupt);
                }
                status = RETURN;
                step4 = null;
                fail3 = null;
                run3(++runTick);
              }
              break;
            default:
              if (interrupt === null) {
                interrupt = util.left(error4);
              }
              if (bracketCount === 0) {
                status = RETURN;
                step4 = null;
                fail3 = null;
              }
          }
          return canceler;
        };
      }
      function join3(cb) {
        return function() {
          var canceler = onComplete({
            rethrow: false,
            handler: cb
          })();
          if (status === SUSPENDED) {
            run3(runTick);
          }
          return canceler;
        };
      }
      return {
        kill: kill2,
        join: join3,
        onComplete,
        isSuspended: function() {
          return status === SUSPENDED;
        },
        run: function() {
          if (status === SUSPENDED) {
            if (!Scheduler.isDraining()) {
              Scheduler.enqueue(function() {
                run3(runTick);
              });
            } else {
              run3(runTick);
            }
          }
        }
      };
    }
    function runPar(util, supervisor, par, cb) {
      var fiberId = 0;
      var fibers = {};
      var killId = 0;
      var kills = {};
      var early = new Error("[ParAff] Early exit");
      var interrupt = null;
      var root = EMPTY;
      function kill2(error4, par2, cb2) {
        var step4 = par2;
        var head4 = null;
        var tail2 = null;
        var count = 0;
        var kills2 = {};
        var tmp, kid;
        loop: while (true) {
          tmp = null;
          switch (step4.tag) {
            case FORKED:
              if (step4._3 === EMPTY) {
                tmp = fibers[step4._1];
                kills2[count++] = tmp.kill(error4, function(result) {
                  return function() {
                    count--;
                    if (count === 0) {
                      cb2(result)();
                    }
                  };
                });
              }
              if (head4 === null) {
                break loop;
              }
              step4 = head4._2;
              if (tail2 === null) {
                head4 = null;
              } else {
                head4 = tail2._1;
                tail2 = tail2._2;
              }
              break;
            case MAP:
              step4 = step4._2;
              break;
            case APPLY:
            case ALT:
              if (head4) {
                tail2 = new Aff2(CONS, head4, tail2);
              }
              head4 = step4;
              step4 = step4._1;
              break;
          }
        }
        if (count === 0) {
          cb2(util.right(void 0))();
        } else {
          kid = 0;
          tmp = count;
          for (; kid < tmp; kid++) {
            kills2[kid] = kills2[kid]();
          }
        }
        return kills2;
      }
      function join3(result, head4, tail2) {
        var fail3, step4, lhs, rhs, tmp, kid;
        if (util.isLeft(result)) {
          fail3 = result;
          step4 = null;
        } else {
          step4 = result;
          fail3 = null;
        }
        loop: while (true) {
          lhs = null;
          rhs = null;
          tmp = null;
          kid = null;
          if (interrupt !== null) {
            return;
          }
          if (head4 === null) {
            cb(fail3 || step4)();
            return;
          }
          if (head4._3 !== EMPTY) {
            return;
          }
          switch (head4.tag) {
            case MAP:
              if (fail3 === null) {
                head4._3 = util.right(head4._1(util.fromRight(step4)));
                step4 = head4._3;
              } else {
                head4._3 = fail3;
              }
              break;
            case APPLY:
              lhs = head4._1._3;
              rhs = head4._2._3;
              if (fail3) {
                head4._3 = fail3;
                tmp = true;
                kid = killId++;
                kills[kid] = kill2(early, fail3 === lhs ? head4._2 : head4._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(fail3, null, null);
                    } else {
                      join3(fail3, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              } else if (lhs === EMPTY || rhs === EMPTY) {
                return;
              } else {
                step4 = util.right(util.fromRight(lhs)(util.fromRight(rhs)));
                head4._3 = step4;
              }
              break;
            case ALT:
              lhs = head4._1._3;
              rhs = head4._2._3;
              if (lhs === EMPTY && util.isLeft(rhs) || rhs === EMPTY && util.isLeft(lhs)) {
                return;
              }
              if (lhs !== EMPTY && util.isLeft(lhs) && rhs !== EMPTY && util.isLeft(rhs)) {
                fail3 = step4 === lhs ? rhs : lhs;
                step4 = null;
                head4._3 = fail3;
              } else {
                head4._3 = step4;
                tmp = true;
                kid = killId++;
                kills[kid] = kill2(early, step4 === lhs ? head4._2 : head4._1, function() {
                  return function() {
                    delete kills[kid];
                    if (tmp) {
                      tmp = false;
                    } else if (tail2 === null) {
                      join3(step4, null, null);
                    } else {
                      join3(step4, tail2._1, tail2._2);
                    }
                  };
                });
                if (tmp) {
                  tmp = false;
                  return;
                }
              }
              break;
          }
          if (tail2 === null) {
            head4 = null;
          } else {
            head4 = tail2._1;
            tail2 = tail2._2;
          }
        }
      }
      function resolve(fiber) {
        return function(result) {
          return function() {
            delete fibers[fiber._1];
            fiber._3 = result;
            join3(result, fiber._2._1, fiber._2._2);
          };
        };
      }
      function run3() {
        var status = CONTINUE;
        var step4 = par;
        var head4 = null;
        var tail2 = null;
        var tmp, fid;
        loop: while (true) {
          tmp = null;
          fid = null;
          switch (status) {
            case CONTINUE:
              switch (step4.tag) {
                case MAP:
                  if (head4) {
                    tail2 = new Aff2(CONS, head4, tail2);
                  }
                  head4 = new Aff2(MAP, step4._1, EMPTY, EMPTY);
                  step4 = step4._2;
                  break;
                case APPLY:
                  if (head4) {
                    tail2 = new Aff2(CONS, head4, tail2);
                  }
                  head4 = new Aff2(APPLY, EMPTY, step4._2, EMPTY);
                  step4 = step4._1;
                  break;
                case ALT:
                  if (head4) {
                    tail2 = new Aff2(CONS, head4, tail2);
                  }
                  head4 = new Aff2(ALT, EMPTY, step4._2, EMPTY);
                  step4 = step4._1;
                  break;
                default:
                  fid = fiberId++;
                  status = RETURN;
                  tmp = step4;
                  step4 = new Aff2(FORKED, fid, new Aff2(CONS, head4, tail2), EMPTY);
                  tmp = Fiber(util, supervisor, tmp);
                  tmp.onComplete({
                    rethrow: false,
                    handler: resolve(step4)
                  })();
                  fibers[fid] = tmp;
                  if (supervisor) {
                    supervisor.register(tmp);
                  }
              }
              break;
            case RETURN:
              if (head4 === null) {
                break loop;
              }
              if (head4._1 === EMPTY) {
                head4._1 = step4;
                status = CONTINUE;
                step4 = head4._2;
                head4._2 = EMPTY;
              } else {
                head4._2 = step4;
                step4 = head4;
                if (tail2 === null) {
                  head4 = null;
                } else {
                  head4 = tail2._1;
                  tail2 = tail2._2;
                }
              }
          }
        }
        root = step4;
        for (fid = 0; fid < fiberId; fid++) {
          fibers[fid].run();
        }
      }
      function cancel(error4, cb2) {
        interrupt = util.left(error4);
        var innerKills;
        for (var kid in kills) {
          if (kills.hasOwnProperty(kid)) {
            innerKills = kills[kid];
            for (kid in innerKills) {
              if (innerKills.hasOwnProperty(kid)) {
                innerKills[kid]();
              }
            }
          }
        }
        kills = null;
        var newKills = kill2(error4, root, cb2);
        return function(killError) {
          return new Aff2(ASYNC, function(killCb) {
            return function() {
              for (var kid2 in newKills) {
                if (newKills.hasOwnProperty(kid2)) {
                  newKills[kid2]();
                }
              }
              return nonCanceler2;
            };
          });
        };
      }
      run3();
      return function(killError) {
        return new Aff2(ASYNC, function(killCb) {
          return function() {
            return cancel(killError, killCb);
          };
        });
      };
    }
    function sequential3(util, supervisor, par) {
      return new Aff2(ASYNC, function(cb) {
        return function() {
          return runPar(util, supervisor, par, cb);
        };
      });
    }
    Aff2.EMPTY = EMPTY;
    Aff2.Pure = AffCtr(PURE);
    Aff2.Throw = AffCtr(THROW);
    Aff2.Catch = AffCtr(CATCH);
    Aff2.Sync = AffCtr(SYNC);
    Aff2.Async = AffCtr(ASYNC);
    Aff2.Bind = AffCtr(BIND);
    Aff2.Bracket = AffCtr(BRACKET);
    Aff2.Fork = AffCtr(FORK);
    Aff2.Seq = AffCtr(SEQ);
    Aff2.ParMap = AffCtr(MAP);
    Aff2.ParApply = AffCtr(APPLY);
    Aff2.ParAlt = AffCtr(ALT);
    Aff2.Fiber = Fiber;
    Aff2.Supervisor = Supervisor;
    Aff2.Scheduler = Scheduler;
    Aff2.nonCanceler = nonCanceler2;
    return Aff2;
  }();
  var _pure = Aff.Pure;
  var _throwError = Aff.Throw;
  function _catchError(aff) {
    return function(k) {
      return Aff.Catch(aff, k);
    };
  }
  function _map(f) {
    return function(aff) {
      if (aff.tag === Aff.Pure.tag) {
        return Aff.Pure(f(aff._1));
      } else {
        return Aff.Bind(aff, function(value18) {
          return Aff.Pure(f(value18));
        });
      }
    };
  }
  function _bind(aff) {
    return function(k) {
      return Aff.Bind(aff, k);
    };
  }
  function _fork(immediate) {
    return function(aff) {
      return Aff.Fork(immediate, aff);
    };
  }
  var _liftEffect = Aff.Sync;
  function _parAffMap(f) {
    return function(aff) {
      return Aff.ParMap(f, aff);
    };
  }
  function _parAffApply(aff1) {
    return function(aff2) {
      return Aff.ParApply(aff1, aff2);
    };
  }
  var makeAff = Aff.Async;
  function generalBracket(acquire) {
    return function(options2) {
      return function(k) {
        return Aff.Bracket(acquire, options2, k);
      };
    };
  }
  function _makeFiber(util, aff) {
    return function() {
      return Aff.Fiber(util, null, aff);
    };
  }
  var _delay = /* @__PURE__ */ function() {
    function setDelay(n, k) {
      if (n === 0 && typeof setImmediate !== "undefined") {
        return setImmediate(k);
      } else {
        return setTimeout(k, n);
      }
    }
    function clearDelay(n, t) {
      if (n === 0 && typeof clearImmediate !== "undefined") {
        return clearImmediate(t);
      } else {
        return clearTimeout(t);
      }
    }
    return function(right, ms) {
      return Aff.Async(function(cb) {
        return function() {
          var timer = setDelay(ms, cb(right()));
          return function() {
            return Aff.Sync(function() {
              return right(clearDelay(ms, timer));
            });
          };
        };
      });
    };
  }();
  var _sequential = Aff.Seq;

  // output/Control.Parallel.Class/index.js
  var sequential = function(dict) {
    return dict.sequential;
  };
  var parallel = function(dict) {
    return dict.parallel;
  };

  // output/Control.Parallel/index.js
  var identity6 = /* @__PURE__ */ identity(categoryFn);
  var parTraverse_ = function(dictParallel) {
    var sequential3 = sequential(dictParallel);
    var parallel4 = parallel(dictParallel);
    return function(dictApplicative) {
      var traverse_8 = traverse_(dictApplicative);
      return function(dictFoldable) {
        var traverse_14 = traverse_8(dictFoldable);
        return function(f) {
          var $51 = traverse_14(function($53) {
            return parallel4(f($53));
          });
          return function($52) {
            return sequential3($51($52));
          };
        };
      };
    };
  };
  var parSequence_ = function(dictParallel) {
    var parTraverse_1 = parTraverse_(dictParallel);
    return function(dictApplicative) {
      var parTraverse_2 = parTraverse_1(dictApplicative);
      return function(dictFoldable) {
        return parTraverse_2(dictFoldable)(identity6);
      };
    };
  };

  // output/Effect.Unsafe/foreign.js
  var unsafePerformEffect = function(f) {
    return f();
  };

  // output/Effect.Aff/index.js
  var $runtime_lazy3 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var pure2 = /* @__PURE__ */ pure(applicativeEffect);
  var $$void3 = /* @__PURE__ */ $$void(functorEffect);
  var map6 = /* @__PURE__ */ map(functorEffect);
  var Canceler = function(x) {
    return x;
  };
  var suspendAff = /* @__PURE__ */ _fork(false);
  var functorParAff = {
    map: _parAffMap
  };
  var functorAff = {
    map: _map
  };
  var map1 = /* @__PURE__ */ map(functorAff);
  var forkAff = /* @__PURE__ */ _fork(true);
  var ffiUtil = /* @__PURE__ */ function() {
    var unsafeFromRight = function(v) {
      if (v instanceof Right) {
        return v.value0;
      }
      ;
      if (v instanceof Left) {
        return unsafeCrashWith("unsafeFromRight: Left");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 412, column 21 - line 414, column 54): " + [v.constructor.name]);
    };
    var unsafeFromLeft = function(v) {
      if (v instanceof Left) {
        return v.value0;
      }
      ;
      if (v instanceof Right) {
        return unsafeCrashWith("unsafeFromLeft: Right");
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 407, column 20 - line 409, column 55): " + [v.constructor.name]);
    };
    var isLeft = function(v) {
      if (v instanceof Left) {
        return true;
      }
      ;
      if (v instanceof Right) {
        return false;
      }
      ;
      throw new Error("Failed pattern match at Effect.Aff (line 402, column 12 - line 404, column 21): " + [v.constructor.name]);
    };
    return {
      isLeft,
      fromLeft: unsafeFromLeft,
      fromRight: unsafeFromRight,
      left: Left.create,
      right: Right.create
    };
  }();
  var makeFiber = function(aff) {
    return _makeFiber(ffiUtil, aff);
  };
  var launchAff = function(aff) {
    return function __do4() {
      var fiber = makeFiber(aff)();
      fiber.run();
      return fiber;
    };
  };
  var delay = function(v) {
    return _delay(Right.create, v);
  };
  var bracket = function(acquire) {
    return function(completed) {
      return generalBracket(acquire)({
        killed: $$const(completed),
        failed: $$const(completed),
        completed: $$const(completed)
      });
    };
  };
  var applyParAff = {
    apply: _parAffApply,
    Functor0: function() {
      return functorParAff;
    }
  };
  var monadAff = {
    Applicative0: function() {
      return applicativeAff;
    },
    Bind1: function() {
      return bindAff;
    }
  };
  var bindAff = {
    bind: _bind,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var applicativeAff = {
    pure: _pure,
    Apply0: function() {
      return $lazy_applyAff(0);
    }
  };
  var $lazy_applyAff = /* @__PURE__ */ $runtime_lazy3("applyAff", "Effect.Aff", function() {
    return {
      apply: ap(monadAff),
      Functor0: function() {
        return functorAff;
      }
    };
  });
  var applyAff = /* @__PURE__ */ $lazy_applyAff(73);
  var pure22 = /* @__PURE__ */ pure(applicativeAff);
  var bind1 = /* @__PURE__ */ bind(bindAff);
  var bindFlipped4 = /* @__PURE__ */ bindFlipped(bindAff);
  var $$finally = function(fin) {
    return function(a2) {
      return bracket(pure22(unit))($$const(fin))($$const(a2));
    };
  };
  var parallelAff = {
    parallel: unsafeCoerce2,
    sequential: _sequential,
    Apply0: function() {
      return applyAff;
    },
    Apply1: function() {
      return applyParAff;
    }
  };
  var parallel2 = /* @__PURE__ */ parallel(parallelAff);
  var applicativeParAff = {
    pure: function($76) {
      return parallel2(pure22($76));
    },
    Apply0: function() {
      return applyParAff;
    }
  };
  var monadEffectAff = {
    liftEffect: _liftEffect,
    Monad0: function() {
      return monadAff;
    }
  };
  var liftEffect2 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var effectCanceler = function($77) {
    return Canceler($$const(liftEffect2($77)));
  };
  var joinFiber = function(v) {
    return makeAff(function(k) {
      return map6(effectCanceler)(v.join(k));
    });
  };
  var functorFiber = {
    map: function(f) {
      return function(t) {
        return unsafePerformEffect(makeFiber(map1(f)(joinFiber(t))));
      };
    }
  };
  var killFiber = function(e) {
    return function(v) {
      return bind1(liftEffect2(v.isSuspended))(function(suspended) {
        if (suspended) {
          return liftEffect2($$void3(v.kill(e, $$const(pure2(unit)))));
        }
        ;
        return makeAff(function(k) {
          return map6(effectCanceler)(v.kill(e, k));
        });
      });
    };
  };
  var monadThrowAff = {
    throwError: _throwError,
    Monad0: function() {
      return monadAff;
    }
  };
  var monadErrorAff = {
    catchError: _catchError,
    MonadThrow0: function() {
      return monadThrowAff;
    }
  };
  var $$try2 = /* @__PURE__ */ $$try(monadErrorAff);
  var runAff = function(k) {
    return function(aff) {
      return launchAff(bindFlipped4(function($83) {
        return liftEffect2(k($83));
      })($$try2(aff)));
    };
  };
  var runAff_ = function(k) {
    return function(aff) {
      return $$void3(runAff(k)(aff));
    };
  };
  var monadRecAff = {
    tailRecM: function(k) {
      var go2 = function(a2) {
        return bind1(k(a2))(function(res) {
          if (res instanceof Done) {
            return pure22(res.value0);
          }
          ;
          if (res instanceof Loop) {
            return go2(res.value0);
          }
          ;
          throw new Error("Failed pattern match at Effect.Aff (line 104, column 7 - line 106, column 23): " + [res.constructor.name]);
        });
      };
      return go2;
    },
    Monad0: function() {
      return monadAff;
    }
  };
  var nonCanceler = /* @__PURE__ */ $$const(/* @__PURE__ */ pure22(unit));

  // output/Effect.Aff.Compat/index.js
  var fromEffectFnAff = function(v) {
    return makeAff(function(k) {
      return function __do4() {
        var v1 = v(function($9) {
          return k(Left.create($9))();
        }, function($10) {
          return k(Right.create($10))();
        });
        return function(e) {
          return makeAff(function(k2) {
            return function __do5() {
              v1(e, function($11) {
                return k2(Left.create($11))();
              }, function($12) {
                return k2(Right.create($12))();
              });
              return nonCanceler;
            };
          });
        };
      };
    });
  };

  // output/Foreign/foreign.js
  function typeOf(value18) {
    return typeof value18;
  }
  function tagOf(value18) {
    return Object.prototype.toString.call(value18).slice(8, -1);
  }
  var isArray = Array.isArray || function(value18) {
    return Object.prototype.toString.call(value18) === "[object Array]";
  };

  // output/Data.Int/foreign.js
  var fromNumberImpl = function(just) {
    return function(nothing) {
      return function(n) {
        return (n | 0) === n ? just(n) : nothing;
      };
    };
  };
  var toNumber = function(n) {
    return n;
  };
  var fromStringAsImpl = function(just) {
    return function(nothing) {
      return function(radix) {
        var digits;
        if (radix < 11) {
          digits = "[0-" + (radix - 1).toString() + "]";
        } else if (radix === 11) {
          digits = "[0-9a]";
        } else {
          digits = "[0-9a-" + String.fromCharCode(86 + radix) + "]";
        }
        var pattern2 = new RegExp("^[\\+\\-]?" + digits + "+$", "i");
        return function(s) {
          if (pattern2.test(s)) {
            var i2 = parseInt(s, radix);
            return (i2 | 0) === i2 ? just(i2) : nothing;
          } else {
            return nothing;
          }
        };
      };
    };
  };

  // output/Data.Number/foreign.js
  var isFiniteImpl = isFinite;
  function fromStringImpl(str, isFinite2, just, nothing) {
    var num = parseFloat(str);
    if (isFinite2(num)) {
      return just(num);
    } else {
      return nothing;
    }
  }
  var floor = Math.floor;

  // output/Data.Number/index.js
  var fromString = function(str) {
    return fromStringImpl(str, isFiniteImpl, Just.create, Nothing.value);
  };

  // output/Data.Int/index.js
  var top2 = /* @__PURE__ */ top(boundedInt);
  var bottom2 = /* @__PURE__ */ bottom(boundedInt);
  var fromStringAs = /* @__PURE__ */ function() {
    return fromStringAsImpl(Just.create)(Nothing.value);
  }();
  var fromString2 = /* @__PURE__ */ fromStringAs(10);
  var fromNumber = /* @__PURE__ */ function() {
    return fromNumberImpl(Just.create)(Nothing.value);
  }();
  var unsafeClamp = function(x) {
    if (!isFiniteImpl(x)) {
      return 0;
    }
    ;
    if (x >= toNumber(top2)) {
      return top2;
    }
    ;
    if (x <= toNumber(bottom2)) {
      return bottom2;
    }
    ;
    if (otherwise) {
      return fromMaybe(0)(fromNumber(x));
    }
    ;
    throw new Error("Failed pattern match at Data.Int (line 72, column 1 - line 72, column 29): " + [x.constructor.name]);
  };
  var floor2 = function($39) {
    return unsafeClamp(floor($39));
  };

  // output/Data.String.CodeUnits/foreign.js
  var singleton5 = function(c) {
    return c;
  };
  var _charAt = function(just) {
    return function(nothing) {
      return function(i2) {
        return function(s) {
          return i2 >= 0 && i2 < s.length ? just(s.charAt(i2)) : nothing;
        };
      };
    };
  };
  var _indexOf = function(just) {
    return function(nothing) {
      return function(x) {
        return function(s) {
          var i2 = s.indexOf(x);
          return i2 === -1 ? nothing : just(i2);
        };
      };
    };
  };

  // output/Data.String.CodeUnits/index.js
  var indexOf = /* @__PURE__ */ function() {
    return _indexOf(Just.create)(Nothing.value);
  }();
  var contains = function(pat) {
    var $23 = indexOf(pat);
    return function($24) {
      return isJust($23($24));
    };
  };
  var charAt2 = /* @__PURE__ */ function() {
    return _charAt(Just.create)(Nothing.value);
  }();

  // output/Foreign/index.js
  var ForeignError = /* @__PURE__ */ function() {
    function ForeignError2(value0) {
      this.value0 = value0;
    }
    ;
    ForeignError2.create = function(value0) {
      return new ForeignError2(value0);
    };
    return ForeignError2;
  }();
  var TypeMismatch = /* @__PURE__ */ function() {
    function TypeMismatch2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TypeMismatch2.create = function(value0) {
      return function(value1) {
        return new TypeMismatch2(value0, value1);
      };
    };
    return TypeMismatch2;
  }();
  var unsafeToForeign = unsafeCoerce2;
  var unsafeFromForeign = unsafeCoerce2;
  var fail = function(dictMonad) {
    var $153 = throwError(monadThrowExceptT(dictMonad));
    return function($154) {
      return $153(singleton4($154));
    };
  };
  var unsafeReadTagged = function(dictMonad) {
    var pure19 = pure(applicativeExceptT(dictMonad));
    var fail1 = fail(dictMonad);
    return function(tag) {
      return function(value18) {
        if (tagOf(value18) === tag) {
          return pure19(unsafeFromForeign(value18));
        }
        ;
        if (otherwise) {
          return fail1(new TypeMismatch(tag, tagOf(value18)));
        }
        ;
        throw new Error("Failed pattern match at Foreign (line 123, column 1 - line 123, column 104): " + [tag.constructor.name, value18.constructor.name]);
      };
    };
  };
  var readBoolean = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("Boolean");
  };
  var readString = function(dictMonad) {
    return unsafeReadTagged(dictMonad)("String");
  };

  // output/Affjax/index.js
  var pure3 = /* @__PURE__ */ pure(/* @__PURE__ */ applicativeExceptT(monadIdentity));
  var fail2 = /* @__PURE__ */ fail(monadIdentity);
  var unsafeReadTagged2 = /* @__PURE__ */ unsafeReadTagged(monadIdentity);
  var alt2 = /* @__PURE__ */ alt(/* @__PURE__ */ altExceptT(semigroupNonEmptyList)(monadIdentity));
  var composeKleisliFlipped2 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var map7 = /* @__PURE__ */ map(functorMaybe);
  var any2 = /* @__PURE__ */ any(foldableArray)(heytingAlgebraBoolean);
  var eq2 = /* @__PURE__ */ eq(eqString);
  var bindFlipped5 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var map12 = /* @__PURE__ */ map(functorArray);
  var mapFlipped2 = /* @__PURE__ */ mapFlipped(functorAff);
  var $$try3 = /* @__PURE__ */ $$try(monadErrorAff);
  var pure1 = /* @__PURE__ */ pure(applicativeAff);
  var RequestContentError = /* @__PURE__ */ function() {
    function RequestContentError2(value0) {
      this.value0 = value0;
    }
    ;
    RequestContentError2.create = function(value0) {
      return new RequestContentError2(value0);
    };
    return RequestContentError2;
  }();
  var ResponseBodyError = /* @__PURE__ */ function() {
    function ResponseBodyError2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ResponseBodyError2.create = function(value0) {
      return function(value1) {
        return new ResponseBodyError2(value0, value1);
      };
    };
    return ResponseBodyError2;
  }();
  var TimeoutError = /* @__PURE__ */ function() {
    function TimeoutError2() {
    }
    ;
    TimeoutError2.value = new TimeoutError2();
    return TimeoutError2;
  }();
  var RequestFailedError = /* @__PURE__ */ function() {
    function RequestFailedError2() {
    }
    ;
    RequestFailedError2.value = new RequestFailedError2();
    return RequestFailedError2;
  }();
  var XHROtherError = /* @__PURE__ */ function() {
    function XHROtherError2(value0) {
      this.value0 = value0;
    }
    ;
    XHROtherError2.create = function(value0) {
      return new XHROtherError2(value0);
    };
    return XHROtherError2;
  }();
  var request = function(driver2) {
    return function(req) {
      var parseJSON = function(v2) {
        if (v2 === "") {
          return pure3(jsonEmptyObject);
        }
        ;
        return either(function($74) {
          return fail2(ForeignError.create($74));
        })(pure3)(jsonParser(v2));
      };
      var fromResponse = function() {
        if (req.responseFormat instanceof $$ArrayBuffer) {
          return unsafeReadTagged2("ArrayBuffer");
        }
        ;
        if (req.responseFormat instanceof Blob2) {
          return unsafeReadTagged2("Blob");
        }
        ;
        if (req.responseFormat instanceof Document2) {
          return function(x) {
            return alt2(unsafeReadTagged2("Document")(x))(alt2(unsafeReadTagged2("XMLDocument")(x))(unsafeReadTagged2("HTMLDocument")(x)));
          };
        }
        ;
        if (req.responseFormat instanceof Json2) {
          return composeKleisliFlipped2(function($75) {
            return req.responseFormat.value0(parseJSON($75));
          })(unsafeReadTagged2("String"));
        }
        ;
        if (req.responseFormat instanceof $$String2) {
          return unsafeReadTagged2("String");
        }
        ;
        if (req.responseFormat instanceof Ignore) {
          return $$const(req.responseFormat.value0(pure3(unit)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 274, column 18 - line 283, column 57): " + [req.responseFormat.constructor.name]);
      }();
      var extractContent = function(v2) {
        if (v2 instanceof ArrayView) {
          return new Right(v2.value0(unsafeToForeign));
        }
        ;
        if (v2 instanceof Blob) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof Document) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof $$String) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormData) {
          return new Right(unsafeToForeign(v2.value0));
        }
        ;
        if (v2 instanceof FormURLEncoded) {
          return note("Body contains values that cannot be encoded as application/x-www-form-urlencoded")(map7(unsafeToForeign)(encode(v2.value0)));
        }
        ;
        if (v2 instanceof Json) {
          return new Right(unsafeToForeign(stringify(v2.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 235, column 20 - line 250, column 69): " + [v2.constructor.name]);
      };
      var addHeader = function(mh) {
        return function(hs) {
          if (mh instanceof Just && !any2(on(eq2)(name)(mh.value0))(hs)) {
            return snoc(hs)(mh.value0);
          }
          ;
          return hs;
        };
      };
      var headers = function(reqContent) {
        return addHeader(map7(ContentType.create)(bindFlipped5(toMediaType)(reqContent)))(addHeader(map7(Accept.create)(toMediaType2(req.responseFormat)))(req.headers));
      };
      var ajaxRequest = function(v2) {
        return {
          method: print(req.method),
          url: req.url,
          headers: map12(function(h) {
            return {
              field: name(h),
              value: value(h)
            };
          })(headers(req.content)),
          content: v2,
          responseType: toResponseType(req.responseFormat),
          username: toNullable(req.username),
          password: toNullable(req.password),
          withCredentials: req.withCredentials,
          timeout: fromMaybe(0)(map7(function(v1) {
            return v1;
          })(req.timeout))
        };
      };
      var send = function(content3) {
        return mapFlipped2($$try3(fromEffectFnAff(_ajax(driver2, "AffjaxTimeoutErrorMessageIdent", "AffjaxRequestFailedMessageIdent", ResponseHeader.create, ajaxRequest(content3)))))(function(v2) {
          if (v2 instanceof Right) {
            var v1 = runExcept(fromResponse(v2.value0.body));
            if (v1 instanceof Left) {
              return new Left(new ResponseBodyError(head2(v1.value0), v2.value0));
            }
            ;
            if (v1 instanceof Right) {
              return new Right({
                headers: v2.value0.headers,
                status: v2.value0.status,
                statusText: v2.value0.statusText,
                body: v1.value0
              });
            }
            ;
            throw new Error("Failed pattern match at Affjax (line 209, column 9 - line 211, column 52): " + [v1.constructor.name]);
          }
          ;
          if (v2 instanceof Left) {
            return new Left(function() {
              var message2 = message(v2.value0);
              var $61 = message2 === "AffjaxTimeoutErrorMessageIdent";
              if ($61) {
                return TimeoutError.value;
              }
              ;
              var $62 = message2 === "AffjaxRequestFailedMessageIdent";
              if ($62) {
                return RequestFailedError.value;
              }
              ;
              return new XHROtherError(v2.value0);
            }());
          }
          ;
          throw new Error("Failed pattern match at Affjax (line 207, column 144 - line 219, column 28): " + [v2.constructor.name]);
        });
      };
      if (req.content instanceof Nothing) {
        return send(toNullable(Nothing.value));
      }
      ;
      if (req.content instanceof Just) {
        var v = extractContent(req.content.value0);
        if (v instanceof Right) {
          return send(toNullable(new Just(v.value0)));
        }
        ;
        if (v instanceof Left) {
          return pure1(new Left(new RequestContentError(v.value0)));
        }
        ;
        throw new Error("Failed pattern match at Affjax (line 199, column 7 - line 203, column 48): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Affjax (line 195, column 3 - line 203, column 48): " + [req.content.constructor.name]);
    };
  };
  var defaultRequest = /* @__PURE__ */ function() {
    return {
      method: new Left(GET.value),
      url: "/",
      headers: [],
      content: Nothing.value,
      username: Nothing.value,
      password: Nothing.value,
      withCredentials: false,
      responseFormat: ignore,
      timeout: Nothing.value
    };
  }();
  var post = function(driver2) {
    return function(rf) {
      return function(u2) {
        return function(c) {
          return request(driver2)({
            headers: defaultRequest.headers,
            username: defaultRequest.username,
            password: defaultRequest.password,
            withCredentials: defaultRequest.withCredentials,
            timeout: defaultRequest.timeout,
            method: new Left(POST.value),
            url: u2,
            content: c,
            responseFormat: rf
          });
        };
      };
    };
  };

  // output/Affjax.Web/index.js
  var post2 = /* @__PURE__ */ post(driver);

  // output/DOM.HTML.Indexed.InputType/index.js
  var InputButton = /* @__PURE__ */ function() {
    function InputButton2() {
    }
    ;
    InputButton2.value = new InputButton2();
    return InputButton2;
  }();
  var InputCheckbox = /* @__PURE__ */ function() {
    function InputCheckbox2() {
    }
    ;
    InputCheckbox2.value = new InputCheckbox2();
    return InputCheckbox2;
  }();
  var InputColor = /* @__PURE__ */ function() {
    function InputColor2() {
    }
    ;
    InputColor2.value = new InputColor2();
    return InputColor2;
  }();
  var InputDate = /* @__PURE__ */ function() {
    function InputDate2() {
    }
    ;
    InputDate2.value = new InputDate2();
    return InputDate2;
  }();
  var InputDatetimeLocal = /* @__PURE__ */ function() {
    function InputDatetimeLocal2() {
    }
    ;
    InputDatetimeLocal2.value = new InputDatetimeLocal2();
    return InputDatetimeLocal2;
  }();
  var InputEmail = /* @__PURE__ */ function() {
    function InputEmail2() {
    }
    ;
    InputEmail2.value = new InputEmail2();
    return InputEmail2;
  }();
  var InputFile = /* @__PURE__ */ function() {
    function InputFile2() {
    }
    ;
    InputFile2.value = new InputFile2();
    return InputFile2;
  }();
  var InputHidden = /* @__PURE__ */ function() {
    function InputHidden2() {
    }
    ;
    InputHidden2.value = new InputHidden2();
    return InputHidden2;
  }();
  var InputImage = /* @__PURE__ */ function() {
    function InputImage2() {
    }
    ;
    InputImage2.value = new InputImage2();
    return InputImage2;
  }();
  var InputMonth = /* @__PURE__ */ function() {
    function InputMonth2() {
    }
    ;
    InputMonth2.value = new InputMonth2();
    return InputMonth2;
  }();
  var InputNumber = /* @__PURE__ */ function() {
    function InputNumber2() {
    }
    ;
    InputNumber2.value = new InputNumber2();
    return InputNumber2;
  }();
  var InputPassword = /* @__PURE__ */ function() {
    function InputPassword2() {
    }
    ;
    InputPassword2.value = new InputPassword2();
    return InputPassword2;
  }();
  var InputRadio = /* @__PURE__ */ function() {
    function InputRadio2() {
    }
    ;
    InputRadio2.value = new InputRadio2();
    return InputRadio2;
  }();
  var InputRange = /* @__PURE__ */ function() {
    function InputRange2() {
    }
    ;
    InputRange2.value = new InputRange2();
    return InputRange2;
  }();
  var InputReset = /* @__PURE__ */ function() {
    function InputReset2() {
    }
    ;
    InputReset2.value = new InputReset2();
    return InputReset2;
  }();
  var InputSearch = /* @__PURE__ */ function() {
    function InputSearch2() {
    }
    ;
    InputSearch2.value = new InputSearch2();
    return InputSearch2;
  }();
  var InputSubmit = /* @__PURE__ */ function() {
    function InputSubmit2() {
    }
    ;
    InputSubmit2.value = new InputSubmit2();
    return InputSubmit2;
  }();
  var InputTel = /* @__PURE__ */ function() {
    function InputTel2() {
    }
    ;
    InputTel2.value = new InputTel2();
    return InputTel2;
  }();
  var InputText = /* @__PURE__ */ function() {
    function InputText2() {
    }
    ;
    InputText2.value = new InputText2();
    return InputText2;
  }();
  var InputTime = /* @__PURE__ */ function() {
    function InputTime2() {
    }
    ;
    InputTime2.value = new InputTime2();
    return InputTime2;
  }();
  var InputUrl = /* @__PURE__ */ function() {
    function InputUrl2() {
    }
    ;
    InputUrl2.value = new InputUrl2();
    return InputUrl2;
  }();
  var InputWeek = /* @__PURE__ */ function() {
    function InputWeek2() {
    }
    ;
    InputWeek2.value = new InputWeek2();
    return InputWeek2;
  }();
  var renderInputType = function(v) {
    if (v instanceof InputButton) {
      return "button";
    }
    ;
    if (v instanceof InputCheckbox) {
      return "checkbox";
    }
    ;
    if (v instanceof InputColor) {
      return "color";
    }
    ;
    if (v instanceof InputDate) {
      return "date";
    }
    ;
    if (v instanceof InputDatetimeLocal) {
      return "datetime-local";
    }
    ;
    if (v instanceof InputEmail) {
      return "email";
    }
    ;
    if (v instanceof InputFile) {
      return "file";
    }
    ;
    if (v instanceof InputHidden) {
      return "hidden";
    }
    ;
    if (v instanceof InputImage) {
      return "image";
    }
    ;
    if (v instanceof InputMonth) {
      return "month";
    }
    ;
    if (v instanceof InputNumber) {
      return "number";
    }
    ;
    if (v instanceof InputPassword) {
      return "password";
    }
    ;
    if (v instanceof InputRadio) {
      return "radio";
    }
    ;
    if (v instanceof InputRange) {
      return "range";
    }
    ;
    if (v instanceof InputReset) {
      return "reset";
    }
    ;
    if (v instanceof InputSearch) {
      return "search";
    }
    ;
    if (v instanceof InputSubmit) {
      return "submit";
    }
    ;
    if (v instanceof InputTel) {
      return "tel";
    }
    ;
    if (v instanceof InputText) {
      return "text";
    }
    ;
    if (v instanceof InputTime) {
      return "time";
    }
    ;
    if (v instanceof InputUrl) {
      return "url";
    }
    ;
    if (v instanceof InputWeek) {
      return "week";
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.InputType (line 33, column 19 - line 55, column 22): " + [v.constructor.name]);
  };

  // output/Effect.Aff.Class/index.js
  var monadAffAff = {
    liftAff: /* @__PURE__ */ identity(categoryFn),
    MonadEffect0: function() {
      return monadEffectAff;
    }
  };
  var liftAff = function(dict) {
    return dict.liftAff;
  };

  // output/Effect.Exception.Unsafe/index.js
  var unsafeThrowException = function($1) {
    return unsafePerformEffect(throwException($1));
  };
  var unsafeThrow = function($2) {
    return unsafeThrowException(error($2));
  };

  // output/Extras/foreign.js
  function readCookieImpl(name17) {
    return function() {
      const match = document.cookie.match(new RegExp("(^| )" + name17 + "=([^;]+)"));
      return match ? match[2] : "";
    };
  }
  function setStageCookie(stage) {
    return function() {
      var date2 = /* @__PURE__ */ new Date();
      date2.setTime(date2.getTime() + 7 * 24 * 60 * 60 * 1e3);
      expires = "; expires=" + date2.toUTCString();
      document.cookie = "stage=" + stage + expires + "; path=/";
    };
  }

  // output/Data.Exists/index.js
  var runExists = unsafeCoerce2;
  var mkExists = unsafeCoerce2;

  // output/Data.Coyoneda/index.js
  var CoyonedaF = /* @__PURE__ */ function() {
    function CoyonedaF2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CoyonedaF2.create = function(value0) {
      return function(value1) {
        return new CoyonedaF2(value0, value1);
      };
    };
    return CoyonedaF2;
  }();
  var unCoyoneda = function(f) {
    return function(v) {
      return runExists(function(v1) {
        return f(v1.value0)(v1.value1);
      })(v);
    };
  };
  var coyoneda = function(k) {
    return function(fi) {
      return mkExists(new CoyonedaF(k, fi));
    };
  };
  var functorCoyoneda = {
    map: function(f) {
      return function(v) {
        return runExists(function(v1) {
          return coyoneda(function($180) {
            return f(v1.value0($180));
          })(v1.value1);
        })(v);
      };
    }
  };
  var liftCoyoneda = /* @__PURE__ */ coyoneda(/* @__PURE__ */ identity(categoryFn));

  // output/Data.Map.Internal/index.js
  var $runtime_lazy4 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var map8 = /* @__PURE__ */ map(functorMaybe);
  var Leaf = /* @__PURE__ */ function() {
    function Leaf2() {
    }
    ;
    Leaf2.value = new Leaf2();
    return Leaf2;
  }();
  var Node = /* @__PURE__ */ function() {
    function Node2(value0, value1, value22, value32, value42, value52) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
      this.value4 = value42;
      this.value5 = value52;
    }
    ;
    Node2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return function(value42) {
              return function(value52) {
                return new Node2(value0, value1, value22, value32, value42, value52);
              };
            };
          };
        };
      };
    };
    return Node2;
  }();
  var Split = /* @__PURE__ */ function() {
    function Split2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Split2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Split2(value0, value1, value22);
        };
      };
    };
    return Split2;
  }();
  var SplitLast = /* @__PURE__ */ function() {
    function SplitLast2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    SplitLast2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new SplitLast2(value0, value1, value22);
        };
      };
    };
    return SplitLast2;
  }();
  var unsafeNode = function(k, v, l, r) {
    if (l instanceof Leaf) {
      if (r instanceof Leaf) {
        return new Node(1, 1, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + r.value0 | 0, 1 + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 702, column 5 - line 706, column 39): " + [r.constructor.name]);
    }
    ;
    if (l instanceof Node) {
      if (r instanceof Leaf) {
        return new Node(1 + l.value0 | 0, 1 + l.value1 | 0, k, v, l, r);
      }
      ;
      if (r instanceof Node) {
        return new Node(1 + function() {
          var $280 = l.value0 > r.value0;
          if ($280) {
            return l.value0;
          }
          ;
          return r.value0;
        }() | 0, (1 + l.value1 | 0) + r.value1 | 0, k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 708, column 5 - line 712, column 68): " + [r.constructor.name]);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 700, column 32 - line 712, column 68): " + [l.constructor.name]);
  };
  var singleton6 = function(k) {
    return function(v) {
      return new Node(1, 1, k, v, Leaf.value, Leaf.value);
    };
  };
  var unsafeBalancedNode = /* @__PURE__ */ function() {
    var height8 = function(v) {
      if (v instanceof Leaf) {
        return 0;
      }
      ;
      if (v instanceof Node) {
        return v.value0;
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 757, column 12 - line 759, column 26): " + [v.constructor.name]);
    };
    var rotateLeft = function(k, v, l, rk, rv, rl, rr) {
      if (rl instanceof Node && rl.value0 > height8(rr)) {
        return unsafeNode(rl.value2, rl.value3, unsafeNode(k, v, l, rl.value4), unsafeNode(rk, rv, rl.value5, rr));
      }
      ;
      return unsafeNode(rk, rv, unsafeNode(k, v, l, rl), rr);
    };
    var rotateRight = function(k, v, lk, lv, ll, lr, r) {
      if (lr instanceof Node && height8(ll) <= lr.value0) {
        return unsafeNode(lr.value2, lr.value3, unsafeNode(lk, lv, ll, lr.value4), unsafeNode(k, v, lr.value5, r));
      }
      ;
      return unsafeNode(lk, lv, ll, unsafeNode(k, v, lr, r));
    };
    return function(k, v, l, r) {
      if (l instanceof Leaf) {
        if (r instanceof Leaf) {
          return singleton6(k)(v);
        }
        ;
        if (r instanceof Node && r.value0 > 1) {
          return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      if (l instanceof Node) {
        if (r instanceof Node) {
          if (r.value0 > (l.value0 + 1 | 0)) {
            return rotateLeft(k, v, l, r.value2, r.value3, r.value4, r.value5);
          }
          ;
          if (l.value0 > (r.value0 + 1 | 0)) {
            return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
          }
          ;
        }
        ;
        if (r instanceof Leaf && l.value0 > 1) {
          return rotateRight(k, v, l.value2, l.value3, l.value4, l.value5, r);
        }
        ;
        return unsafeNode(k, v, l, r);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 717, column 40 - line 738, column 34): " + [l.constructor.name]);
    };
  }();
  var $lazy_unsafeSplit = /* @__PURE__ */ $runtime_lazy4("unsafeSplit", "Data.Map.Internal", function() {
    return function(comp, k, m) {
      if (m instanceof Leaf) {
        return new Split(Nothing.value, Leaf.value, Leaf.value);
      }
      ;
      if (m instanceof Node) {
        var v = comp(k)(m.value2);
        if (v instanceof LT) {
          var v1 = $lazy_unsafeSplit(793)(comp, k, m.value4);
          return new Split(v1.value0, v1.value1, unsafeBalancedNode(m.value2, m.value3, v1.value2, m.value5));
        }
        ;
        if (v instanceof GT) {
          var v1 = $lazy_unsafeSplit(796)(comp, k, m.value5);
          return new Split(v1.value0, unsafeBalancedNode(m.value2, m.value3, m.value4, v1.value1), v1.value2);
        }
        ;
        if (v instanceof EQ) {
          return new Split(new Just(m.value3), m.value4, m.value5);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 791, column 5 - line 799, column 30): " + [v.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 787, column 34 - line 799, column 30): " + [m.constructor.name]);
    };
  });
  var unsafeSplit = /* @__PURE__ */ $lazy_unsafeSplit(786);
  var $lazy_unsafeSplitLast = /* @__PURE__ */ $runtime_lazy4("unsafeSplitLast", "Data.Map.Internal", function() {
    return function(k, v, l, r) {
      if (r instanceof Leaf) {
        return new SplitLast(k, v, l);
      }
      ;
      if (r instanceof Node) {
        var v1 = $lazy_unsafeSplitLast(779)(r.value2, r.value3, r.value4, r.value5);
        return new SplitLast(v1.value0, v1.value1, unsafeBalancedNode(k, v, l, v1.value2));
      }
      ;
      throw new Error("Failed pattern match at Data.Map.Internal (line 776, column 37 - line 780, column 57): " + [r.constructor.name]);
    };
  });
  var unsafeSplitLast = /* @__PURE__ */ $lazy_unsafeSplitLast(775);
  var unsafeJoinNodes = function(v, v1) {
    if (v instanceof Leaf) {
      return v1;
    }
    ;
    if (v instanceof Node) {
      var v2 = unsafeSplitLast(v.value2, v.value3, v.value4, v.value5);
      return unsafeBalancedNode(v2.value0, v2.value1, v2.value2, v1);
    }
    ;
    throw new Error("Failed pattern match at Data.Map.Internal (line 764, column 25 - line 768, column 38): " + [v.constructor.name, v1.constructor.name]);
  };
  var pop = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(m) {
        var v = unsafeSplit(compare2, k, m);
        return map8(function(a2) {
          return new Tuple(a2, unsafeJoinNodes(v.value1, v.value2));
        })(v.value0);
      };
    };
  };
  var lookup2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      var go2 = function($copy_v) {
        var $tco_done = false;
        var $tco_result;
        function $tco_loop(v) {
          if (v instanceof Leaf) {
            $tco_done = true;
            return Nothing.value;
          }
          ;
          if (v instanceof Node) {
            var v1 = compare2(k)(v.value2);
            if (v1 instanceof LT) {
              $copy_v = v.value4;
              return;
            }
            ;
            if (v1 instanceof GT) {
              $copy_v = v.value5;
              return;
            }
            ;
            if (v1 instanceof EQ) {
              $tco_done = true;
              return new Just(v.value3);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 283, column 7 - line 286, column 22): " + [v1.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 280, column 8 - line 286, column 22): " + [v.constructor.name]);
        }
        ;
        while (!$tco_done) {
          $tco_result = $tco_loop($copy_v);
        }
        ;
        return $tco_result;
      };
      return go2;
    };
  };
  var insert2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      return function(v) {
        var go2 = function(v1) {
          if (v1 instanceof Leaf) {
            return singleton6(k)(v);
          }
          ;
          if (v1 instanceof Node) {
            var v2 = compare2(k)(v1.value2);
            if (v2 instanceof LT) {
              return unsafeBalancedNode(v1.value2, v1.value3, go2(v1.value4), v1.value5);
            }
            ;
            if (v2 instanceof GT) {
              return unsafeBalancedNode(v1.value2, v1.value3, v1.value4, go2(v1.value5));
            }
            ;
            if (v2 instanceof EQ) {
              return new Node(v1.value0, v1.value1, k, v, v1.value4, v1.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 471, column 7 - line 474, column 35): " + [v2.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 468, column 8 - line 474, column 35): " + [v1.constructor.name]);
        };
        return go2;
      };
    };
  };
  var foldableMap = {
    foldr: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy4("go", "Data.Map.Internal", function() {
          return function(m$prime, z$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(172)(m$prime.value4, f(m$prime.value3)($lazy_go(172)(m$prime.value5, z$prime)));
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 169, column 26 - line 172, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(169);
        return function(m) {
          return go2(m, z);
        };
      };
    },
    foldl: function(f) {
      return function(z) {
        var $lazy_go = $runtime_lazy4("go", "Data.Map.Internal", function() {
          return function(z$prime, m$prime) {
            if (m$prime instanceof Leaf) {
              return z$prime;
            }
            ;
            if (m$prime instanceof Node) {
              return $lazy_go(178)(f($lazy_go(178)(z$prime, m$prime.value4))(m$prime.value3), m$prime.value5);
            }
            ;
            throw new Error("Failed pattern match at Data.Map.Internal (line 175, column 26 - line 178, column 43): " + [m$prime.constructor.name]);
          };
        });
        var go2 = $lazy_go(175);
        return function(m) {
          return go2(z, m);
        };
      };
    },
    foldMap: function(dictMonoid) {
      var mempty2 = mempty(dictMonoid);
      var append13 = append(dictMonoid.Semigroup0());
      return function(f) {
        var go2 = function(v) {
          if (v instanceof Leaf) {
            return mempty2;
          }
          ;
          if (v instanceof Node) {
            return append13(go2(v.value4))(append13(f(v.value3))(go2(v.value5)));
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 181, column 10 - line 184, column 28): " + [v.constructor.name]);
        };
        return go2;
      };
    }
  };
  var empty3 = /* @__PURE__ */ function() {
    return Leaf.value;
  }();
  var $$delete2 = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(k) {
      var go2 = function(v) {
        if (v instanceof Leaf) {
          return Leaf.value;
        }
        ;
        if (v instanceof Node) {
          var v1 = compare2(k)(v.value2);
          if (v1 instanceof LT) {
            return unsafeBalancedNode(v.value2, v.value3, go2(v.value4), v.value5);
          }
          ;
          if (v1 instanceof GT) {
            return unsafeBalancedNode(v.value2, v.value3, v.value4, go2(v.value5));
          }
          ;
          if (v1 instanceof EQ) {
            return unsafeJoinNodes(v.value4, v.value5);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 498, column 7 - line 501, column 43): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Data.Map.Internal (line 495, column 8 - line 501, column 43): " + [v.constructor.name]);
      };
      return go2;
    };
  };
  var alter = function(dictOrd) {
    var compare2 = compare(dictOrd);
    return function(f) {
      return function(k) {
        return function(m) {
          var v = unsafeSplit(compare2, k, m);
          var v2 = f(v.value0);
          if (v2 instanceof Nothing) {
            return unsafeJoinNodes(v.value1, v.value2);
          }
          ;
          if (v2 instanceof Just) {
            return unsafeBalancedNode(k, v2.value0, v.value1, v.value2);
          }
          ;
          throw new Error("Failed pattern match at Data.Map.Internal (line 514, column 3 - line 518, column 41): " + [v2.constructor.name]);
        };
      };
    };
  };

  // output/Halogen.Data.OrdBox/index.js
  var OrdBox = /* @__PURE__ */ function() {
    function OrdBox2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    OrdBox2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new OrdBox2(value0, value1, value22);
        };
      };
    };
    return OrdBox2;
  }();
  var mkOrdBox = function(dictOrd) {
    return OrdBox.create(eq(dictOrd.Eq0()))(compare(dictOrd));
  };
  var eqOrdBox = {
    eq: function(v) {
      return function(v1) {
        return v.value0(v.value2)(v1.value2);
      };
    }
  };
  var ordOrdBox = {
    compare: function(v) {
      return function(v1) {
        return v.value1(v.value2)(v1.value2);
      };
    },
    Eq0: function() {
      return eqOrdBox;
    }
  };

  // output/Halogen.Data.Slot/index.js
  var ordTuple2 = /* @__PURE__ */ ordTuple(ordString)(ordOrdBox);
  var pop1 = /* @__PURE__ */ pop(ordTuple2);
  var lookup1 = /* @__PURE__ */ lookup2(ordTuple2);
  var insert1 = /* @__PURE__ */ insert2(ordTuple2);
  var pop2 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(v) {
              return pop1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(v);
            };
          };
        };
      };
    };
  };
  var lookup3 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(v) {
              return lookup1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(v);
            };
          };
        };
      };
    };
  };
  var insert3 = function() {
    return function(dictIsSymbol) {
      var reflectSymbol2 = reflectSymbol(dictIsSymbol);
      return function(dictOrd) {
        var mkOrdBox2 = mkOrdBox(dictOrd);
        return function(sym) {
          return function(key2) {
            return function(val) {
              return function(v) {
                return insert1(new Tuple(reflectSymbol2(sym), mkOrdBox2(key2)))(val)(v);
              };
            };
          };
        };
      };
    };
  };
  var foreachSlot = function(dictApplicative) {
    var traverse_8 = traverse_(dictApplicative)(foldableMap);
    return function(v) {
      return function(k) {
        return traverse_8(function($54) {
          return k($54);
        })(v);
      };
    };
  };
  var empty4 = empty3;

  // output/DOM.HTML.Indexed.StepValue/index.js
  var show2 = /* @__PURE__ */ show(showNumber);
  var Any = /* @__PURE__ */ function() {
    function Any2() {
    }
    ;
    Any2.value = new Any2();
    return Any2;
  }();
  var Step = /* @__PURE__ */ function() {
    function Step3(value0) {
      this.value0 = value0;
    }
    ;
    Step3.create = function(value0) {
      return new Step3(value0);
    };
    return Step3;
  }();
  var renderStepValue = function(v) {
    if (v instanceof Any) {
      return "any";
    }
    ;
    if (v instanceof Step) {
      return show2(v.value0);
    }
    ;
    throw new Error("Failed pattern match at DOM.HTML.Indexed.StepValue (line 13, column 19 - line 15, column 19): " + [v.constructor.name]);
  };

  // output/Halogen.Query.Input/index.js
  var RefUpdate = /* @__PURE__ */ function() {
    function RefUpdate2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    RefUpdate2.create = function(value0) {
      return function(value1) {
        return new RefUpdate2(value0, value1);
      };
    };
    return RefUpdate2;
  }();
  var Action = /* @__PURE__ */ function() {
    function Action3(value0) {
      this.value0 = value0;
    }
    ;
    Action3.create = function(value0) {
      return new Action3(value0);
    };
    return Action3;
  }();

  // output/Halogen.VDom.Machine/index.js
  var Step2 = /* @__PURE__ */ function() {
    function Step3(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Step3.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Step3(value0, value1, value22, value32);
          };
        };
      };
    };
    return Step3;
  }();
  var unStep = unsafeCoerce2;
  var step = function(v, a2) {
    return v.value2(v.value1, a2);
  };
  var mkStep = unsafeCoerce2;
  var halt = function(v) {
    return v.value3(v.value1);
  };
  var extract2 = /* @__PURE__ */ unStep(function(v) {
    return v.value0;
  });

  // output/Halogen.VDom.Types/index.js
  var map9 = /* @__PURE__ */ map(functorArray);
  var map13 = /* @__PURE__ */ map(functorTuple);
  var Text = /* @__PURE__ */ function() {
    function Text2(value0) {
      this.value0 = value0;
    }
    ;
    Text2.create = function(value0) {
      return new Text2(value0);
    };
    return Text2;
  }();
  var Elem = /* @__PURE__ */ function() {
    function Elem2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Elem2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Elem2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Elem2;
  }();
  var Keyed = /* @__PURE__ */ function() {
    function Keyed2(value0, value1, value22, value32) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
      this.value3 = value32;
    }
    ;
    Keyed2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return function(value32) {
            return new Keyed2(value0, value1, value22, value32);
          };
        };
      };
    };
    return Keyed2;
  }();
  var Widget = /* @__PURE__ */ function() {
    function Widget2(value0) {
      this.value0 = value0;
    }
    ;
    Widget2.create = function(value0) {
      return new Widget2(value0);
    };
    return Widget2;
  }();
  var Grafted = /* @__PURE__ */ function() {
    function Grafted2(value0) {
      this.value0 = value0;
    }
    ;
    Grafted2.create = function(value0) {
      return new Grafted2(value0);
    };
    return Grafted2;
  }();
  var Graft = /* @__PURE__ */ function() {
    function Graft2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Graft2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Graft2(value0, value1, value22);
        };
      };
    };
    return Graft2;
  }();
  var unGraft = function(f) {
    return function($61) {
      return f($61);
    };
  };
  var graft = unsafeCoerce2;
  var bifunctorGraft = {
    bimap: function(f) {
      return function(g) {
        return unGraft(function(v) {
          return graft(new Graft(function($63) {
            return f(v.value0($63));
          }, function($64) {
            return g(v.value1($64));
          }, v.value2));
        });
      };
    }
  };
  var bimap2 = /* @__PURE__ */ bimap(bifunctorGraft);
  var runGraft = /* @__PURE__ */ unGraft(function(v) {
    var go2 = function(v2) {
      if (v2 instanceof Text) {
        return new Text(v2.value0);
      }
      ;
      if (v2 instanceof Elem) {
        return new Elem(v2.value0, v2.value1, v.value0(v2.value2), map9(go2)(v2.value3));
      }
      ;
      if (v2 instanceof Keyed) {
        return new Keyed(v2.value0, v2.value1, v.value0(v2.value2), map9(map13(go2))(v2.value3));
      }
      ;
      if (v2 instanceof Widget) {
        return new Widget(v.value1(v2.value0));
      }
      ;
      if (v2 instanceof Grafted) {
        return new Grafted(bimap2(v.value0)(v.value1)(v2.value0));
      }
      ;
      throw new Error("Failed pattern match at Halogen.VDom.Types (line 86, column 7 - line 86, column 27): " + [v2.constructor.name]);
    };
    return go2(v.value2);
  });

  // output/Halogen.VDom.Util/foreign.js
  function unsafeGetAny(key2, obj) {
    return obj[key2];
  }
  function unsafeHasAny(key2, obj) {
    return obj.hasOwnProperty(key2);
  }
  function unsafeSetAny(key2, val, obj) {
    obj[key2] = val;
  }
  function forE2(a2, f) {
    var b2 = [];
    for (var i2 = 0; i2 < a2.length; i2++) {
      b2.push(f(i2, a2[i2]));
    }
    return b2;
  }
  function forEachE(a2, f) {
    for (var i2 = 0; i2 < a2.length; i2++) {
      f(a2[i2]);
    }
  }
  function forInE(o, f) {
    var ks = Object.keys(o);
    for (var i2 = 0; i2 < ks.length; i2++) {
      var k = ks[i2];
      f(k, o[k]);
    }
  }
  function diffWithIxE(a1, a2, f1, f2, f3) {
    var a3 = [];
    var l1 = a1.length;
    var l2 = a2.length;
    var i2 = 0;
    while (1) {
      if (i2 < l1) {
        if (i2 < l2) {
          a3.push(f1(i2, a1[i2], a2[i2]));
        } else {
          f2(i2, a1[i2]);
        }
      } else if (i2 < l2) {
        a3.push(f3(i2, a2[i2]));
      } else {
        break;
      }
      i2++;
    }
    return a3;
  }
  function strMapWithIxE(as, fk, f) {
    var o = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      o[k] = f(k, i2, a2);
    }
    return o;
  }
  function diffWithKeyAndIxE(o1, as, fk, f1, f2, f3) {
    var o2 = {};
    for (var i2 = 0; i2 < as.length; i2++) {
      var a2 = as[i2];
      var k = fk(a2);
      if (o1.hasOwnProperty(k)) {
        o2[k] = f1(k, i2, o1[k], a2);
      } else {
        o2[k] = f3(k, i2, a2);
      }
    }
    for (var k in o1) {
      if (k in o2) {
        continue;
      }
      f2(k, o1[k]);
    }
    return o2;
  }
  function refEq2(a2, b2) {
    return a2 === b2;
  }
  function createTextNode(s, doc) {
    return doc.createTextNode(s);
  }
  function setTextContent(s, n) {
    n.textContent = s;
  }
  function createElement(ns, name17, doc) {
    if (ns != null) {
      return doc.createElementNS(ns, name17);
    } else {
      return doc.createElement(name17);
    }
  }
  function insertChildIx(i2, a2, b2) {
    var n = b2.childNodes.item(i2) || null;
    if (n !== a2) {
      b2.insertBefore(a2, n);
    }
  }
  function removeChild(a2, b2) {
    if (b2 && a2.parentNode === b2) {
      b2.removeChild(a2);
    }
  }
  function parentNode(a2) {
    return a2.parentNode;
  }
  function setAttribute(ns, attr3, val, el) {
    if (ns != null) {
      el.setAttributeNS(ns, attr3, val);
    } else {
      el.setAttribute(attr3, val);
    }
  }
  function removeAttribute(ns, attr3, el) {
    if (ns != null) {
      el.removeAttributeNS(ns, attr3);
    } else {
      el.removeAttribute(attr3);
    }
  }
  function hasAttribute(ns, attr3, el) {
    if (ns != null) {
      return el.hasAttributeNS(ns, attr3);
    } else {
      return el.hasAttribute(attr3);
    }
  }
  function addEventListener(ev, listener, el) {
    el.addEventListener(ev, listener, false);
  }
  function removeEventListener(ev, listener, el) {
    el.removeEventListener(ev, listener, false);
  }
  var jsUndefined = void 0;

  // output/Halogen.VDom.Util/index.js
  var unsafeLookup = unsafeGetAny;
  var unsafeFreeze2 = unsafeCoerce2;
  var pokeMutMap = unsafeSetAny;
  var newMutMap = newImpl;

  // output/Web.DOM.Element/foreign.js
  var getProp = function(name17) {
    return function(doctype) {
      return doctype[name17];
    };
  };
  var _namespaceURI = getProp("namespaceURI");
  var _prefix = getProp("prefix");
  var localName = getProp("localName");
  var tagName = getProp("tagName");

  // output/Web.DOM.ParentNode/foreign.js
  var getEffProp = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var children = getEffProp("children");
  var _firstElementChild = getEffProp("firstElementChild");
  var _lastElementChild = getEffProp("lastElementChild");
  var childElementCount = getEffProp("childElementCount");
  function _querySelector(selector) {
    return function(node) {
      return function() {
        return node.querySelector(selector);
      };
    };
  }

  // output/Web.DOM.ParentNode/index.js
  var map10 = /* @__PURE__ */ map(functorEffect);
  var querySelector = function(qs) {
    var $2 = map10(toMaybe);
    var $3 = _querySelector(qs);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.DOM.Element/index.js
  var toNode = unsafeCoerce2;

  // output/Halogen.VDom.DOM/index.js
  var $runtime_lazy5 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var haltWidget = function(v) {
    return halt(v.widget);
  };
  var $lazy_patchWidget = /* @__PURE__ */ $runtime_lazy5("patchWidget", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchWidget(291)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Widget) {
        var res = step(state3.widget, vdom.value0);
        var res$prime = unStep(function(v) {
          return mkStep(new Step2(v.value0, {
            build: state3.build,
            widget: res
          }, $lazy_patchWidget(296), haltWidget));
        })(res);
        return res$prime;
      }
      ;
      haltWidget(state3);
      return state3.build(vdom);
    };
  });
  var patchWidget = /* @__PURE__ */ $lazy_patchWidget(286);
  var haltText = function(v) {
    var parent2 = parentNode(v.node);
    return removeChild(v.node, parent2);
  };
  var $lazy_patchText = /* @__PURE__ */ $runtime_lazy5("patchText", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchText(82)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Text) {
        if (state3.value === vdom.value0) {
          return mkStep(new Step2(state3.node, state3, $lazy_patchText(85), haltText));
        }
        ;
        if (otherwise) {
          var nextState = {
            build: state3.build,
            node: state3.node,
            value: vdom.value0
          };
          setTextContent(vdom.value0, state3.node);
          return mkStep(new Step2(state3.node, nextState, $lazy_patchText(89), haltText));
        }
        ;
      }
      ;
      haltText(state3);
      return state3.build(vdom);
    };
  });
  var patchText = /* @__PURE__ */ $lazy_patchText(77);
  var haltKeyed = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forInE(v.children, function(v1, s) {
      return halt(s);
    });
    return halt(v.attrs);
  };
  var haltElem = function(v) {
    var parent2 = parentNode(v.node);
    removeChild(v.node, parent2);
    forEachE(v.children, halt);
    return halt(v.attrs);
  };
  var eqElemSpec = function(ns1, v, ns2, v1) {
    var $63 = v === v1;
    if ($63) {
      if (ns1 instanceof Just && (ns2 instanceof Just && ns1.value0 === ns2.value0)) {
        return true;
      }
      ;
      if (ns1 instanceof Nothing && ns2 instanceof Nothing) {
        return true;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var $lazy_patchElem = /* @__PURE__ */ $runtime_lazy5("patchElem", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchElem(135)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Elem && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length(vdom.value3);
        var v1 = length(state3.children);
        if (v1 === 0 && v === 0) {
          var attrs2 = step(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children
          };
          return mkStep(new Step2(state3.node, nextState, $lazy_patchElem(149), haltElem));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(ix, s, v2) {
          var res = step(s, v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var onThat = function(ix, v2) {
          var res = state3.build(v2);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithIxE(state3.children, vdom.value3, onThese, onThis, onThat);
        var attrs2 = step(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2
        };
        return mkStep(new Step2(state3.node, nextState, $lazy_patchElem(172), haltElem));
      }
      ;
      haltElem(state3);
      return state3.build(vdom);
    };
  });
  var patchElem = /* @__PURE__ */ $lazy_patchElem(130);
  var $lazy_patchKeyed = /* @__PURE__ */ $runtime_lazy5("patchKeyed", "Halogen.VDom.DOM", function() {
    return function(state3, vdom) {
      if (vdom instanceof Grafted) {
        return $lazy_patchKeyed(222)(state3, runGraft(vdom.value0));
      }
      ;
      if (vdom instanceof Keyed && eqElemSpec(state3.ns, state3.name, vdom.value0, vdom.value1)) {
        var v = length(vdom.value3);
        if (state3.length === 0 && v === 0) {
          var attrs2 = step(state3.attrs, vdom.value2);
          var nextState = {
            build: state3.build,
            node: state3.node,
            attrs: attrs2,
            ns: vdom.value0,
            name: vdom.value1,
            children: state3.children,
            length: 0
          };
          return mkStep(new Step2(state3.node, nextState, $lazy_patchKeyed(237), haltKeyed));
        }
        ;
        var onThis = function(v2, s) {
          return halt(s);
        };
        var onThese = function(v2, ix$prime, s, v3) {
          var res = step(s, v3.value1);
          insertChildIx(ix$prime, extract2(res), state3.node);
          return res;
        };
        var onThat = function(v2, ix, v3) {
          var res = state3.build(v3.value1);
          insertChildIx(ix, extract2(res), state3.node);
          return res;
        };
        var children2 = diffWithKeyAndIxE(state3.children, vdom.value3, fst, onThese, onThis, onThat);
        var attrs2 = step(state3.attrs, vdom.value2);
        var nextState = {
          build: state3.build,
          node: state3.node,
          attrs: attrs2,
          ns: vdom.value0,
          name: vdom.value1,
          children: children2,
          length: v
        };
        return mkStep(new Step2(state3.node, nextState, $lazy_patchKeyed(261), haltKeyed));
      }
      ;
      haltKeyed(state3);
      return state3.build(vdom);
    };
  });
  var patchKeyed = /* @__PURE__ */ $lazy_patchKeyed(217);
  var buildWidget = function(v, build, w) {
    var res = v.buildWidget(v)(w);
    var res$prime = unStep(function(v1) {
      return mkStep(new Step2(v1.value0, {
        build,
        widget: res
      }, patchWidget, haltWidget));
    })(res);
    return res$prime;
  };
  var buildText = function(v, build, s) {
    var node = createTextNode(s, v.document);
    var state3 = {
      build,
      node,
      value: s
    };
    return mkStep(new Step2(node, state3, patchText, haltText));
  };
  var buildKeyed = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode(el);
    var onChild = function(v1, ix, v2) {
      var res = build(v2.value1);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = strMapWithIxE(ch1, fst, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2,
      length: length(ch1)
    };
    return mkStep(new Step2(node, state3, patchKeyed, haltKeyed));
  };
  var buildElem = function(v, build, ns1, name1, as1, ch1) {
    var el = createElement(toNullable(ns1), name1, v.document);
    var node = toNode(el);
    var onChild = function(ix, child) {
      var res = build(child);
      insertChildIx(ix, extract2(res), node);
      return res;
    };
    var children2 = forE2(ch1, onChild);
    var attrs = v.buildAttributes(el)(as1);
    var state3 = {
      build,
      node,
      attrs,
      ns: ns1,
      name: name1,
      children: children2
    };
    return mkStep(new Step2(node, state3, patchElem, haltElem));
  };
  var buildVDom = function(spec) {
    var $lazy_build = $runtime_lazy5("build", "Halogen.VDom.DOM", function() {
      return function(v) {
        if (v instanceof Text) {
          return buildText(spec, $lazy_build(59), v.value0);
        }
        ;
        if (v instanceof Elem) {
          return buildElem(spec, $lazy_build(60), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Keyed) {
          return buildKeyed(spec, $lazy_build(61), v.value0, v.value1, v.value2, v.value3);
        }
        ;
        if (v instanceof Widget) {
          return buildWidget(spec, $lazy_build(62), v.value0);
        }
        ;
        if (v instanceof Grafted) {
          return $lazy_build(63)(runGraft(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Halogen.VDom.DOM (line 58, column 27 - line 63, column 52): " + [v.constructor.name]);
      };
    });
    var build = $lazy_build(58);
    return build;
  };

  // output/Web.Event.EventTarget/foreign.js
  function eventListener(fn) {
    return function() {
      return function(event) {
        return fn(event)();
      };
    };
  }
  function addEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.addEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }
  function removeEventListener2(type) {
    return function(listener) {
      return function(useCapture) {
        return function(target6) {
          return function() {
            return target6.removeEventListener(type, listener, useCapture);
          };
        };
      };
    };
  }

  // output/Halogen.VDom.DOM.Prop/index.js
  var $runtime_lazy6 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var Created = /* @__PURE__ */ function() {
    function Created2(value0) {
      this.value0 = value0;
    }
    ;
    Created2.create = function(value0) {
      return new Created2(value0);
    };
    return Created2;
  }();
  var Removed = /* @__PURE__ */ function() {
    function Removed2(value0) {
      this.value0 = value0;
    }
    ;
    Removed2.create = function(value0) {
      return new Removed2(value0);
    };
    return Removed2;
  }();
  var Attribute = /* @__PURE__ */ function() {
    function Attribute2(value0, value1, value22) {
      this.value0 = value0;
      this.value1 = value1;
      this.value2 = value22;
    }
    ;
    Attribute2.create = function(value0) {
      return function(value1) {
        return function(value22) {
          return new Attribute2(value0, value1, value22);
        };
      };
    };
    return Attribute2;
  }();
  var Property = /* @__PURE__ */ function() {
    function Property2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Property2.create = function(value0) {
      return function(value1) {
        return new Property2(value0, value1);
      };
    };
    return Property2;
  }();
  var Handler = /* @__PURE__ */ function() {
    function Handler2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Handler2.create = function(value0) {
      return function(value1) {
        return new Handler2(value0, value1);
      };
    };
    return Handler2;
  }();
  var Ref = /* @__PURE__ */ function() {
    function Ref2(value0) {
      this.value0 = value0;
    }
    ;
    Ref2.create = function(value0) {
      return new Ref2(value0);
    };
    return Ref2;
  }();
  var unsafeGetProperty = unsafeGetAny;
  var setProperty = unsafeSetAny;
  var removeProperty = function(key2, el) {
    var v = hasAttribute(nullImpl, key2, el);
    if (v) {
      return removeAttribute(nullImpl, key2, el);
    }
    ;
    var v1 = typeOf(unsafeGetAny(key2, el));
    if (v1 === "string") {
      return unsafeSetAny(key2, "", el);
    }
    ;
    if (key2 === "rowSpan") {
      return unsafeSetAny(key2, 1, el);
    }
    ;
    if (key2 === "colSpan") {
      return unsafeSetAny(key2, 1, el);
    }
    ;
    return unsafeSetAny(key2, jsUndefined, el);
  };
  var propToStrKey = function(v) {
    if (v instanceof Attribute && v.value0 instanceof Just) {
      return "attr/" + (v.value0.value0 + (":" + v.value1));
    }
    ;
    if (v instanceof Attribute) {
      return "attr/:" + v.value1;
    }
    ;
    if (v instanceof Property) {
      return "prop/" + v.value0;
    }
    ;
    if (v instanceof Handler) {
      return "handler/" + v.value0;
    }
    ;
    if (v instanceof Ref) {
      return "ref";
    }
    ;
    throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 182, column 16 - line 187, column 16): " + [v.constructor.name]);
  };
  var propFromString = unsafeCoerce2;
  var propFromInt = unsafeCoerce2;
  var propFromBoolean = unsafeCoerce2;
  var buildProp = function(emit) {
    return function(el) {
      var removeProp = function(prevEvents) {
        return function(v, v1) {
          if (v1 instanceof Attribute) {
            return removeAttribute(toNullable(v1.value0), v1.value1, el);
          }
          ;
          if (v1 instanceof Property) {
            return removeProperty(v1.value0, el);
          }
          ;
          if (v1 instanceof Handler) {
            var handler3 = unsafeLookup(v1.value0, prevEvents);
            return removeEventListener(v1.value0, fst(handler3), el);
          }
          ;
          if (v1 instanceof Ref) {
            return unit;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 169, column 5 - line 179, column 18): " + [v1.constructor.name]);
        };
      };
      var mbEmit = function(v) {
        if (v instanceof Just) {
          return emit(v.value0)();
        }
        ;
        return unit;
      };
      var haltProp = function(state3) {
        var v = lookup("ref")(state3.props);
        if (v instanceof Just && v.value0 instanceof Ref) {
          return mbEmit(v.value0.value0(new Removed(el)));
        }
        ;
        return unit;
      };
      var diffProp = function(prevEvents, events) {
        return function(v, v1, v11, v2) {
          if (v11 instanceof Attribute && v2 instanceof Attribute) {
            var $66 = v11.value2 === v2.value2;
            if ($66) {
              return v2;
            }
            ;
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v11 instanceof Property && v2 instanceof Property) {
            var v4 = refEq2(v11.value1, v2.value1);
            if (v4) {
              return v2;
            }
            ;
            if (v2.value0 === "value") {
              var elVal = unsafeGetProperty("value", el);
              var $75 = refEq2(elVal, v2.value1);
              if ($75) {
                return v2;
              }
              ;
              setProperty(v2.value0, v2.value1, el);
              return v2;
            }
            ;
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v11 instanceof Handler && v2 instanceof Handler) {
            var handler3 = unsafeLookup(v2.value0, prevEvents);
            write(v2.value1)(snd(handler3))();
            pokeMutMap(v2.value0, handler3, events);
            return v2;
          }
          ;
          return v2;
        };
      };
      var applyProp = function(events) {
        return function(v, v1, v2) {
          if (v2 instanceof Attribute) {
            setAttribute(toNullable(v2.value0), v2.value1, v2.value2, el);
            return v2;
          }
          ;
          if (v2 instanceof Property) {
            setProperty(v2.value0, v2.value1, el);
            return v2;
          }
          ;
          if (v2 instanceof Handler) {
            var v3 = unsafeGetAny(v2.value0, events);
            if (unsafeHasAny(v2.value0, events)) {
              write(v2.value1)(snd(v3))();
              return v2;
            }
            ;
            var ref2 = $$new(v2.value1)();
            var listener = eventListener(function(ev) {
              return function __do4() {
                var f$prime = read(ref2)();
                return mbEmit(f$prime(ev));
              };
            })();
            pokeMutMap(v2.value0, new Tuple(listener, ref2), events);
            addEventListener(v2.value0, listener, el);
            return v2;
          }
          ;
          if (v2 instanceof Ref) {
            mbEmit(v2.value0(new Created(el)));
            return v2;
          }
          ;
          throw new Error("Failed pattern match at Halogen.VDom.DOM.Prop (line 113, column 5 - line 135, column 15): " + [v2.constructor.name]);
        };
      };
      var $lazy_patchProp = $runtime_lazy6("patchProp", "Halogen.VDom.DOM.Prop", function() {
        return function(state3, ps2) {
          var events = newMutMap();
          var onThis = removeProp(state3.events);
          var onThese = diffProp(state3.events, events);
          var onThat = applyProp(events);
          var props = diffWithKeyAndIxE(state3.props, ps2, propToStrKey, onThese, onThis, onThat);
          var nextState = {
            events: unsafeFreeze2(events),
            props
          };
          return mkStep(new Step2(unit, nextState, $lazy_patchProp(100), haltProp));
        };
      });
      var patchProp = $lazy_patchProp(87);
      var renderProp = function(ps1) {
        var events = newMutMap();
        var ps1$prime = strMapWithIxE(ps1, propToStrKey, applyProp(events));
        var state3 = {
          events: unsafeFreeze2(events),
          props: ps1$prime
        };
        return mkStep(new Step2(unit, state3, patchProp, haltProp));
      };
      return renderProp;
    };
  };

  // output/Halogen.HTML.Core/index.js
  var HTML = function(x) {
    return x;
  };
  var widget = function($28) {
    return HTML(Widget.create($28));
  };
  var toPropValue = function(dict) {
    return dict.toPropValue;
  };
  var text = function($29) {
    return HTML(Text.create($29));
  };
  var prop = function(dictIsProp) {
    var toPropValue1 = toPropValue(dictIsProp);
    return function(v) {
      var $31 = Property.create(v);
      return function($32) {
        return $31(toPropValue1($32));
      };
    };
  };
  var isPropString = {
    toPropValue: propFromString
  };
  var isPropStepValue = {
    toPropValue: function($36) {
      return propFromString(renderStepValue($36));
    }
  };
  var isPropInt = {
    toPropValue: propFromInt
  };
  var isPropInputType = {
    toPropValue: function($45) {
      return propFromString(renderInputType($45));
    }
  };
  var isPropBoolean = {
    toPropValue: propFromBoolean
  };
  var handler = /* @__PURE__ */ function() {
    return Handler.create;
  }();
  var element = function(ns) {
    return function(name17) {
      return function(props) {
        return function(children2) {
          return new Elem(ns, name17, props, children2);
        };
      };
    };
  };
  var attr = function(ns) {
    return function(v) {
      return Attribute.create(ns)(v);
    };
  };

  // output/Control.Applicative.Free/index.js
  var identity7 = /* @__PURE__ */ identity(categoryFn);
  var Pure = /* @__PURE__ */ function() {
    function Pure2(value0) {
      this.value0 = value0;
    }
    ;
    Pure2.create = function(value0) {
      return new Pure2(value0);
    };
    return Pure2;
  }();
  var Lift = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var Ap = /* @__PURE__ */ function() {
    function Ap2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Ap2.create = function(value0) {
      return function(value1) {
        return new Ap2(value0, value1);
      };
    };
    return Ap2;
  }();
  var mkAp = function(fba) {
    return function(fb) {
      return new Ap(fba, fb);
    };
  };
  var liftFreeAp = /* @__PURE__ */ function() {
    return Lift.create;
  }();
  var goLeft = function(dictApplicative) {
    var pure19 = pure(dictApplicative);
    return function(fStack) {
      return function(valStack) {
        return function(nat) {
          return function(func) {
            return function(count) {
              if (func instanceof Pure) {
                return new Tuple(new Cons({
                  func: pure19(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Lift) {
                return new Tuple(new Cons({
                  func: nat(func.value0),
                  count
                }, fStack), valStack);
              }
              ;
              if (func instanceof Ap) {
                return goLeft(dictApplicative)(fStack)(cons(func.value1)(valStack))(nat)(func.value0)(count + 1 | 0);
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 102, column 41 - line 105, column 81): " + [func.constructor.name]);
            };
          };
        };
      };
    };
  };
  var goApply = function(dictApplicative) {
    var apply3 = apply(dictApplicative.Apply0());
    return function(fStack) {
      return function(vals) {
        return function(gVal) {
          if (fStack instanceof Nil) {
            return new Left(gVal);
          }
          ;
          if (fStack instanceof Cons) {
            var gRes = apply3(fStack.value0.func)(gVal);
            var $31 = fStack.value0.count === 1;
            if ($31) {
              if (fStack.value1 instanceof Nil) {
                return new Left(gRes);
              }
              ;
              return goApply(dictApplicative)(fStack.value1)(vals)(gRes);
            }
            ;
            if (vals instanceof Nil) {
              return new Left(gRes);
            }
            ;
            if (vals instanceof Cons) {
              return new Right(new Tuple(new Cons({
                func: gRes,
                count: fStack.value0.count - 1 | 0
              }, fStack.value1), new NonEmpty(vals.value0, vals.value1)));
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 83, column 11 - line 88, column 50): " + [vals.constructor.name]);
          }
          ;
          throw new Error("Failed pattern match at Control.Applicative.Free (line 72, column 3 - line 88, column 50): " + [fStack.constructor.name]);
        };
      };
    };
  };
  var functorFreeAp = {
    map: function(f) {
      return function(x) {
        return mkAp(new Pure(f))(x);
      };
    }
  };
  var foldFreeAp = function(dictApplicative) {
    var goApply1 = goApply(dictApplicative);
    var pure19 = pure(dictApplicative);
    var goLeft1 = goLeft(dictApplicative);
    return function(nat) {
      return function(z) {
        var go2 = function($copy_v) {
          var $tco_done = false;
          var $tco_result;
          function $tco_loop(v) {
            if (v.value1.value0 instanceof Pure) {
              var v1 = goApply1(v.value0)(v.value1.value1)(pure19(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 54, column 17 - line 56, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Lift) {
              var v1 = goApply1(v.value0)(v.value1.value1)(nat(v.value1.value0.value0));
              if (v1 instanceof Left) {
                $tco_done = true;
                return v1.value0;
              }
              ;
              if (v1 instanceof Right) {
                $copy_v = v1.value0;
                return;
              }
              ;
              throw new Error("Failed pattern match at Control.Applicative.Free (line 57, column 17 - line 59, column 24): " + [v1.constructor.name]);
            }
            ;
            if (v.value1.value0 instanceof Ap) {
              var nextVals = new NonEmpty(v.value1.value0.value1, v.value1.value1);
              $copy_v = goLeft1(v.value0)(nextVals)(nat)(v.value1.value0.value0)(1);
              return;
            }
            ;
            throw new Error("Failed pattern match at Control.Applicative.Free (line 53, column 5 - line 62, column 47): " + [v.value1.value0.constructor.name]);
          }
          ;
          while (!$tco_done) {
            $tco_result = $tco_loop($copy_v);
          }
          ;
          return $tco_result;
        };
        return go2(new Tuple(Nil.value, singleton4(z)));
      };
    };
  };
  var retractFreeAp = function(dictApplicative) {
    return foldFreeAp(dictApplicative)(identity7);
  };
  var applyFreeAp = {
    apply: function(fba) {
      return function(fb) {
        return mkAp(fba)(fb);
      };
    },
    Functor0: function() {
      return functorFreeAp;
    }
  };
  var applicativeFreeAp = /* @__PURE__ */ function() {
    return {
      pure: Pure.create,
      Apply0: function() {
        return applyFreeAp;
      }
    };
  }();
  var foldFreeAp1 = /* @__PURE__ */ foldFreeAp(applicativeFreeAp);
  var hoistFreeAp = function(f) {
    return foldFreeAp1(function($54) {
      return liftFreeAp(f($54));
    });
  };

  // output/Data.CatQueue/index.js
  var CatQueue = /* @__PURE__ */ function() {
    function CatQueue2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatQueue2.create = function(value0) {
      return function(value1) {
        return new CatQueue2(value0, value1);
      };
    };
    return CatQueue2;
  }();
  var uncons2 = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
        $tco_done = true;
        return Nothing.value;
      }
      ;
      if (v.value0 instanceof Nil) {
        $copy_v = new CatQueue(reverse2(v.value1), Nil.value);
        return;
      }
      ;
      if (v.value0 instanceof Cons) {
        $tco_done = true;
        return new Just(new Tuple(v.value0.value0, new CatQueue(v.value0.value1, v.value1)));
      }
      ;
      throw new Error("Failed pattern match at Data.CatQueue (line 82, column 1 - line 82, column 63): " + [v.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var snoc3 = function(v) {
    return function(a2) {
      return new CatQueue(v.value0, new Cons(a2, v.value1));
    };
  };
  var $$null2 = function(v) {
    if (v.value0 instanceof Nil && v.value1 instanceof Nil) {
      return true;
    }
    ;
    return false;
  };
  var empty5 = /* @__PURE__ */ function() {
    return new CatQueue(Nil.value, Nil.value);
  }();

  // output/Data.CatList/index.js
  var CatNil = /* @__PURE__ */ function() {
    function CatNil2() {
    }
    ;
    CatNil2.value = new CatNil2();
    return CatNil2;
  }();
  var CatCons = /* @__PURE__ */ function() {
    function CatCons2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    CatCons2.create = function(value0) {
      return function(value1) {
        return new CatCons2(value0, value1);
      };
    };
    return CatCons2;
  }();
  var link = function(v) {
    return function(v1) {
      if (v instanceof CatNil) {
        return v1;
      }
      ;
      if (v1 instanceof CatNil) {
        return v;
      }
      ;
      if (v instanceof CatCons) {
        return new CatCons(v.value0, snoc3(v.value1)(v1));
      }
      ;
      throw new Error("Failed pattern match at Data.CatList (line 108, column 1 - line 108, column 54): " + [v.constructor.name, v1.constructor.name]);
    };
  };
  var foldr3 = function(k) {
    return function(b2) {
      return function(q2) {
        var foldl3 = function($copy_v) {
          return function($copy_v1) {
            return function($copy_v2) {
              var $tco_var_v = $copy_v;
              var $tco_var_v1 = $copy_v1;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(v, v1, v2) {
                if (v2 instanceof Nil) {
                  $tco_done = true;
                  return v1;
                }
                ;
                if (v2 instanceof Cons) {
                  $tco_var_v = v;
                  $tco_var_v1 = v(v1)(v2.value0);
                  $copy_v2 = v2.value1;
                  return;
                }
                ;
                throw new Error("Failed pattern match at Data.CatList (line 124, column 3 - line 124, column 59): " + [v.constructor.name, v1.constructor.name, v2.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_v, $tco_var_v1, $copy_v2);
              }
              ;
              return $tco_result;
            };
          };
        };
        var go2 = function($copy_xs) {
          return function($copy_ys) {
            var $tco_var_xs = $copy_xs;
            var $tco_done1 = false;
            var $tco_result;
            function $tco_loop(xs, ys) {
              var v = uncons2(xs);
              if (v instanceof Nothing) {
                $tco_done1 = true;
                return foldl3(function(x) {
                  return function(i2) {
                    return i2(x);
                  };
                })(b2)(ys);
              }
              ;
              if (v instanceof Just) {
                $tco_var_xs = v.value0.value1;
                $copy_ys = new Cons(k(v.value0.value0), ys);
                return;
              }
              ;
              throw new Error("Failed pattern match at Data.CatList (line 120, column 14 - line 122, column 67): " + [v.constructor.name]);
            }
            ;
            while (!$tco_done1) {
              $tco_result = $tco_loop($tco_var_xs, $copy_ys);
            }
            ;
            return $tco_result;
          };
        };
        return go2(q2)(Nil.value);
      };
    };
  };
  var uncons3 = function(v) {
    if (v instanceof CatNil) {
      return Nothing.value;
    }
    ;
    if (v instanceof CatCons) {
      return new Just(new Tuple(v.value0, function() {
        var $66 = $$null2(v.value1);
        if ($66) {
          return CatNil.value;
        }
        ;
        return foldr3(link)(CatNil.value)(v.value1);
      }()));
    }
    ;
    throw new Error("Failed pattern match at Data.CatList (line 99, column 1 - line 99, column 61): " + [v.constructor.name]);
  };
  var empty6 = /* @__PURE__ */ function() {
    return CatNil.value;
  }();
  var append2 = link;
  var semigroupCatList = {
    append: append2
  };
  var snoc4 = function(cat) {
    return function(a2) {
      return append2(cat)(new CatCons(a2, empty5));
    };
  };

  // output/Control.Monad.Free/index.js
  var $runtime_lazy7 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var append3 = /* @__PURE__ */ append(semigroupCatList);
  var Free = /* @__PURE__ */ function() {
    function Free2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Free2.create = function(value0) {
      return function(value1) {
        return new Free2(value0, value1);
      };
    };
    return Free2;
  }();
  var Return = /* @__PURE__ */ function() {
    function Return2(value0) {
      this.value0 = value0;
    }
    ;
    Return2.create = function(value0) {
      return new Return2(value0);
    };
    return Return2;
  }();
  var Bind = /* @__PURE__ */ function() {
    function Bind2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Bind2.create = function(value0) {
      return function(value1) {
        return new Bind2(value0, value1);
      };
    };
    return Bind2;
  }();
  var toView = function($copy_v) {
    var $tco_done = false;
    var $tco_result;
    function $tco_loop(v) {
      var runExpF = function(v22) {
        return v22;
      };
      var concatF = function(v22) {
        return function(r) {
          return new Free(v22.value0, append3(v22.value1)(r));
        };
      };
      if (v.value0 instanceof Return) {
        var v2 = uncons3(v.value1);
        if (v2 instanceof Nothing) {
          $tco_done = true;
          return new Return(v.value0.value0);
        }
        ;
        if (v2 instanceof Just) {
          $copy_v = concatF(runExpF(v2.value0.value0)(v.value0.value0))(v2.value0.value1);
          return;
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 227, column 7 - line 231, column 64): " + [v2.constructor.name]);
      }
      ;
      if (v.value0 instanceof Bind) {
        $tco_done = true;
        return new Bind(v.value0.value0, function(a2) {
          return concatF(v.value0.value1(a2))(v.value1);
        });
      }
      ;
      throw new Error("Failed pattern match at Control.Monad.Free (line 225, column 3 - line 233, column 56): " + [v.value0.constructor.name]);
    }
    ;
    while (!$tco_done) {
      $tco_result = $tco_loop($copy_v);
    }
    ;
    return $tco_result;
  };
  var fromView = function(f) {
    return new Free(f, empty6);
  };
  var freeMonad = {
    Applicative0: function() {
      return freeApplicative;
    },
    Bind1: function() {
      return freeBind;
    }
  };
  var freeFunctor = {
    map: function(k) {
      return function(f) {
        return bindFlipped(freeBind)(function() {
          var $189 = pure(freeApplicative);
          return function($190) {
            return $189(k($190));
          };
        }())(f);
      };
    }
  };
  var freeBind = {
    bind: function(v) {
      return function(k) {
        return new Free(v.value0, snoc4(v.value1)(k));
      };
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var freeApplicative = {
    pure: function($191) {
      return fromView(Return.create($191));
    },
    Apply0: function() {
      return $lazy_freeApply(0);
    }
  };
  var $lazy_freeApply = /* @__PURE__ */ $runtime_lazy7("freeApply", "Control.Monad.Free", function() {
    return {
      apply: ap(freeMonad),
      Functor0: function() {
        return freeFunctor;
      }
    };
  });
  var pure4 = /* @__PURE__ */ pure(freeApplicative);
  var liftF = function(f) {
    return fromView(new Bind(f, function($192) {
      return pure4($192);
    }));
  };
  var foldFree = function(dictMonadRec) {
    var Monad0 = dictMonadRec.Monad0();
    var map111 = map(Monad0.Bind1().Apply0().Functor0());
    var pure19 = pure(Monad0.Applicative0());
    var tailRecM4 = tailRecM(dictMonadRec);
    return function(k) {
      var go2 = function(f) {
        var v = toView(f);
        if (v instanceof Return) {
          return map111(Done.create)(pure19(v.value0));
        }
        ;
        if (v instanceof Bind) {
          return map111(function($199) {
            return Loop.create(v.value1($199));
          })(k(v.value0));
        }
        ;
        throw new Error("Failed pattern match at Control.Monad.Free (line 158, column 10 - line 160, column 37): " + [v.constructor.name]);
      };
      return tailRecM4(go2);
    };
  };

  // output/Halogen.Query.ChildQuery/index.js
  var unChildQueryBox = unsafeCoerce2;

  // output/Unsafe.Reference/foreign.js
  function reallyUnsafeRefEq(a2) {
    return function(b2) {
      return a2 === b2;
    };
  }

  // output/Unsafe.Reference/index.js
  var unsafeRefEq = reallyUnsafeRefEq;

  // output/Halogen.Subscription/index.js
  var $$void4 = /* @__PURE__ */ $$void(functorEffect);
  var bind2 = /* @__PURE__ */ bind(bindEffect);
  var append4 = /* @__PURE__ */ append(semigroupArray);
  var traverse_2 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_1 = /* @__PURE__ */ traverse_2(foldableArray);
  var unsubscribe = function(v) {
    return v;
  };
  var subscribe = function(v) {
    return function(k) {
      return v(function($76) {
        return $$void4(k($76));
      });
    };
  };
  var notify = function(v) {
    return function(a2) {
      return v(a2);
    };
  };
  var create = function __do() {
    var subscribers = $$new([])();
    return {
      emitter: function(k) {
        return function __do4() {
          modify_(function(v) {
            return append4(v)([k]);
          })(subscribers)();
          return modify_(deleteBy(unsafeRefEq)(k))(subscribers);
        };
      },
      listener: function(a2) {
        return bind2(read(subscribers))(traverse_1(function(k) {
          return k(a2);
        }));
      }
    };
  };

  // output/Halogen.Query.HalogenM/index.js
  var SubscriptionId = function(x) {
    return x;
  };
  var ForkId = function(x) {
    return x;
  };
  var State = /* @__PURE__ */ function() {
    function State2(value0) {
      this.value0 = value0;
    }
    ;
    State2.create = function(value0) {
      return new State2(value0);
    };
    return State2;
  }();
  var Subscribe = /* @__PURE__ */ function() {
    function Subscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Subscribe2.create = function(value0) {
      return function(value1) {
        return new Subscribe2(value0, value1);
      };
    };
    return Subscribe2;
  }();
  var Unsubscribe = /* @__PURE__ */ function() {
    function Unsubscribe2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Unsubscribe2.create = function(value0) {
      return function(value1) {
        return new Unsubscribe2(value0, value1);
      };
    };
    return Unsubscribe2;
  }();
  var Lift2 = /* @__PURE__ */ function() {
    function Lift3(value0) {
      this.value0 = value0;
    }
    ;
    Lift3.create = function(value0) {
      return new Lift3(value0);
    };
    return Lift3;
  }();
  var ChildQuery2 = /* @__PURE__ */ function() {
    function ChildQuery3(value0) {
      this.value0 = value0;
    }
    ;
    ChildQuery3.create = function(value0) {
      return new ChildQuery3(value0);
    };
    return ChildQuery3;
  }();
  var Raise = /* @__PURE__ */ function() {
    function Raise2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Raise2.create = function(value0) {
      return function(value1) {
        return new Raise2(value0, value1);
      };
    };
    return Raise2;
  }();
  var Par = /* @__PURE__ */ function() {
    function Par2(value0) {
      this.value0 = value0;
    }
    ;
    Par2.create = function(value0) {
      return new Par2(value0);
    };
    return Par2;
  }();
  var Fork = /* @__PURE__ */ function() {
    function Fork2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Fork2.create = function(value0) {
      return function(value1) {
        return new Fork2(value0, value1);
      };
    };
    return Fork2;
  }();
  var Join = /* @__PURE__ */ function() {
    function Join2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Join2.create = function(value0) {
      return function(value1) {
        return new Join2(value0, value1);
      };
    };
    return Join2;
  }();
  var Kill = /* @__PURE__ */ function() {
    function Kill2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Kill2.create = function(value0) {
      return function(value1) {
        return new Kill2(value0, value1);
      };
    };
    return Kill2;
  }();
  var GetRef = /* @__PURE__ */ function() {
    function GetRef2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    GetRef2.create = function(value0) {
      return function(value1) {
        return new GetRef2(value0, value1);
      };
    };
    return GetRef2;
  }();
  var HalogenM = function(x) {
    return x;
  };
  var raise = function(o) {
    return liftF(new Raise(o, unit));
  };
  var ordSubscriptionId = ordInt;
  var ordForkId = ordInt;
  var monadHalogenM = freeMonad;
  var monadStateHalogenM = {
    state: function($181) {
      return HalogenM(liftF(State.create($181)));
    },
    Monad0: function() {
      return monadHalogenM;
    }
  };
  var monadEffectHalogenM = function(dictMonadEffect) {
    return {
      liftEffect: function() {
        var $186 = liftEffect(dictMonadEffect);
        return function($187) {
          return HalogenM(liftF(Lift2.create($186($187))));
        };
      }(),
      Monad0: function() {
        return monadHalogenM;
      }
    };
  };
  var monadAffHalogenM = function(dictMonadAff) {
    var monadEffectHalogenM1 = monadEffectHalogenM(dictMonadAff.MonadEffect0());
    return {
      liftAff: function() {
        var $188 = liftAff(dictMonadAff);
        return function($189) {
          return HalogenM(liftF(Lift2.create($188($189))));
        };
      }(),
      MonadEffect0: function() {
        return monadEffectHalogenM1;
      }
    };
  };
  var functorHalogenM = freeFunctor;
  var bindHalogenM = freeBind;
  var applicativeHalogenM = freeApplicative;

  // output/Halogen.Query.HalogenQ/index.js
  var Initialize = /* @__PURE__ */ function() {
    function Initialize2(value0) {
      this.value0 = value0;
    }
    ;
    Initialize2.create = function(value0) {
      return new Initialize2(value0);
    };
    return Initialize2;
  }();
  var Finalize = /* @__PURE__ */ function() {
    function Finalize2(value0) {
      this.value0 = value0;
    }
    ;
    Finalize2.create = function(value0) {
      return new Finalize2(value0);
    };
    return Finalize2;
  }();
  var Receive = /* @__PURE__ */ function() {
    function Receive2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Receive2.create = function(value0) {
      return function(value1) {
        return new Receive2(value0, value1);
      };
    };
    return Receive2;
  }();
  var Action2 = /* @__PURE__ */ function() {
    function Action3(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Action3.create = function(value0) {
      return function(value1) {
        return new Action3(value0, value1);
      };
    };
    return Action3;
  }();
  var Query = /* @__PURE__ */ function() {
    function Query2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Query2.create = function(value0) {
      return function(value1) {
        return new Query2(value0, value1);
      };
    };
    return Query2;
  }();

  // output/Halogen.VDom.Thunk/index.js
  var $runtime_lazy8 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var unsafeEqThunk = function(v, v1) {
    return refEq2(v.value0, v1.value0) && (refEq2(v.value1, v1.value1) && v.value1(v.value3, v1.value3));
  };
  var runThunk = function(v) {
    return v.value2(v.value3);
  };
  var buildThunk = function(toVDom) {
    var haltThunk = function(state3) {
      return halt(state3.vdom);
    };
    var $lazy_patchThunk = $runtime_lazy8("patchThunk", "Halogen.VDom.Thunk", function() {
      return function(state3, t2) {
        var $48 = unsafeEqThunk(state3.thunk, t2);
        if ($48) {
          return mkStep(new Step2(extract2(state3.vdom), state3, $lazy_patchThunk(112), haltThunk));
        }
        ;
        var vdom = step(state3.vdom, toVDom(runThunk(t2)));
        return mkStep(new Step2(extract2(vdom), {
          vdom,
          thunk: t2
        }, $lazy_patchThunk(115), haltThunk));
      };
    });
    var patchThunk = $lazy_patchThunk(108);
    var renderThunk = function(spec) {
      return function(t) {
        var vdom = buildVDom(spec)(toVDom(runThunk(t)));
        return mkStep(new Step2(extract2(vdom), {
          thunk: t,
          vdom
        }, patchThunk, haltThunk));
      };
    };
    return renderThunk;
  };

  // output/Halogen.Component/index.js
  var voidLeft2 = /* @__PURE__ */ voidLeft(functorHalogenM);
  var traverse_3 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableMaybe);
  var map11 = /* @__PURE__ */ map(functorHalogenM);
  var pure5 = /* @__PURE__ */ pure(applicativeHalogenM);
  var lookup4 = /* @__PURE__ */ lookup3();
  var pop3 = /* @__PURE__ */ pop2();
  var insert4 = /* @__PURE__ */ insert3();
  var ComponentSlot = /* @__PURE__ */ function() {
    function ComponentSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ComponentSlot2.create = function(value0) {
      return new ComponentSlot2(value0);
    };
    return ComponentSlot2;
  }();
  var ThunkSlot = /* @__PURE__ */ function() {
    function ThunkSlot2(value0) {
      this.value0 = value0;
    }
    ;
    ThunkSlot2.create = function(value0) {
      return new ThunkSlot2(value0);
    };
    return ThunkSlot2;
  }();
  var unComponentSlot = unsafeCoerce2;
  var unComponent = unsafeCoerce2;
  var mkEval = function(args) {
    return function(v) {
      if (v instanceof Initialize) {
        return voidLeft2(traverse_3(args.handleAction)(args.initialize))(v.value0);
      }
      ;
      if (v instanceof Finalize) {
        return voidLeft2(traverse_3(args.handleAction)(args.finalize))(v.value0);
      }
      ;
      if (v instanceof Receive) {
        return voidLeft2(traverse_3(args.handleAction)(args.receive(v.value0)))(v.value1);
      }
      ;
      if (v instanceof Action2) {
        return voidLeft2(args.handleAction(v.value0))(v.value1);
      }
      ;
      if (v instanceof Query) {
        return unCoyoneda(function(g) {
          var $45 = map11(maybe(v.value1(unit))(g));
          return function($46) {
            return $45(args.handleQuery($46));
          };
        })(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Halogen.Component (line 182, column 15 - line 192, column 71): " + [v.constructor.name]);
    };
  };
  var mkComponentSlot = unsafeCoerce2;
  var mkComponent = unsafeCoerce2;
  var defaultEval = /* @__PURE__ */ function() {
    return {
      handleAction: $$const(pure5(unit)),
      handleQuery: $$const(pure5(Nothing.value)),
      receive: $$const(Nothing.value),
      initialize: Nothing.value,
      finalize: Nothing.value
    };
  }();
  var componentSlot = function() {
    return function(dictIsSymbol) {
      var lookup13 = lookup4(dictIsSymbol);
      var pop12 = pop3(dictIsSymbol);
      var insert13 = insert4(dictIsSymbol);
      return function(dictOrd) {
        var lookup23 = lookup13(dictOrd);
        var pop22 = pop12(dictOrd);
        var insert22 = insert13(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(comp) {
              return function(input3) {
                return function(output2) {
                  return mkComponentSlot({
                    get: lookup23(label5)(p2),
                    pop: pop22(label5)(p2),
                    set: insert22(label5)(p2),
                    component: comp,
                    input: input3,
                    output: output2
                  });
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Halogen.HTML.Elements/index.js
  var element2 = /* @__PURE__ */ function() {
    return element(Nothing.value);
  }();
  var form = /* @__PURE__ */ element2("form");
  var h1 = /* @__PURE__ */ element2("h1");
  var h1_ = /* @__PURE__ */ h1([]);
  var h2 = /* @__PURE__ */ element2("h2");
  var h2_ = /* @__PURE__ */ h2([]);
  var h3 = /* @__PURE__ */ element2("h3");
  var h3_ = /* @__PURE__ */ h3([]);
  var img = function(props) {
    return element2("img")(props)([]);
  };
  var input = function(props) {
    return element2("input")(props)([]);
  };
  var label = /* @__PURE__ */ element2("label");
  var label_ = /* @__PURE__ */ label([]);
  var option = /* @__PURE__ */ element2("option");
  var p = /* @__PURE__ */ element2("p");
  var p_ = /* @__PURE__ */ p([]);
  var select = /* @__PURE__ */ element2("select");
  var small = /* @__PURE__ */ element2("small");
  var small_ = /* @__PURE__ */ small([]);
  var table = /* @__PURE__ */ element2("table");
  var table_ = /* @__PURE__ */ table([]);
  var tbody = /* @__PURE__ */ element2("tbody");
  var tbody_ = /* @__PURE__ */ tbody([]);
  var td = /* @__PURE__ */ element2("td");
  var td_ = /* @__PURE__ */ td([]);
  var th = /* @__PURE__ */ element2("th");
  var th_ = /* @__PURE__ */ th([]);
  var thead = /* @__PURE__ */ element2("thead");
  var thead_ = /* @__PURE__ */ thead([]);
  var tr = /* @__PURE__ */ element2("tr");
  var div2 = /* @__PURE__ */ element2("div");
  var div_ = /* @__PURE__ */ div2([]);
  var button = /* @__PURE__ */ element2("button");
  var br = function(props) {
    return element2("br")(props)([]);
  };
  var br_ = /* @__PURE__ */ br([]);

  // output/Foreign.Index/foreign.js
  function unsafeReadPropImpl(f, s, key2, value18) {
    return value18 == null ? f : s(value18[key2]);
  }

  // output/Foreign.Index/index.js
  var unsafeReadProp = function(dictMonad) {
    var fail3 = fail(dictMonad);
    var pure19 = pure(applicativeExceptT(dictMonad));
    return function(k) {
      return function(value18) {
        return unsafeReadPropImpl(fail3(new TypeMismatch("object", typeOf(value18))), pure19, k, value18);
      };
    };
  };
  var readProp = function(dictMonad) {
    return unsafeReadProp(dictMonad);
  };

  // output/Web.Event.Event/foreign.js
  function _currentTarget(e) {
    return e.currentTarget;
  }
  function preventDefault(e) {
    return function() {
      return e.preventDefault();
    };
  }

  // output/Web.Event.Event/index.js
  var currentTarget = function($5) {
    return toMaybe(_currentTarget($5));
  };

  // output/Web.HTML.Event.DragEvent.EventTypes/index.js
  var drop4 = "drop";
  var dragover = "dragover";

  // output/Web.HTML.Event.EventTypes/index.js
  var input2 = "input";
  var domcontentloaded = "DOMContentLoaded";
  var change = "change";

  // output/Web.UIEvent.KeyboardEvent.EventTypes/index.js
  var keydown = "keydown";

  // output/Web.UIEvent.MouseEvent.EventTypes/index.js
  var mousedown = "mousedown";
  var click = "click";

  // output/Halogen.HTML.Events/index.js
  var map14 = /* @__PURE__ */ map(functorMaybe);
  var composeKleisli2 = /* @__PURE__ */ composeKleisli(bindMaybe);
  var composeKleisliFlipped3 = /* @__PURE__ */ composeKleisliFlipped(/* @__PURE__ */ bindExceptT(monadIdentity));
  var readProp2 = /* @__PURE__ */ readProp(monadIdentity);
  var readString2 = /* @__PURE__ */ readString(monadIdentity);
  var mouseHandler = unsafeCoerce2;
  var keyHandler = unsafeCoerce2;
  var handler$prime = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return map14(Action.create)(f(ev));
      });
    };
  };
  var handler2 = function(et) {
    return function(f) {
      return handler(et)(function(ev) {
        return new Just(new Action(f(ev)));
      });
    };
  };
  var onClick = /* @__PURE__ */ function() {
    var $15 = handler2(click);
    return function($16) {
      return $15(mouseHandler($16));
    };
  }();
  var onKeyDown = /* @__PURE__ */ function() {
    var $23 = handler2(keydown);
    return function($24) {
      return $23(keyHandler($24));
    };
  }();
  var onMouseDown = /* @__PURE__ */ function() {
    var $27 = handler2(mousedown);
    return function($28) {
      return $27(mouseHandler($28));
    };
  }();
  var onSubmit = /* @__PURE__ */ handler2("submit");
  var dragHandler = unsafeCoerce2;
  var onDragOver = /* @__PURE__ */ function() {
    var $73 = handler2(dragover);
    return function($74) {
      return $73(dragHandler($74));
    };
  }();
  var onDrop = /* @__PURE__ */ function() {
    var $77 = handler2(drop4);
    return function($78) {
      return $77(dragHandler($78));
    };
  }();
  var addForeignPropHandler = function(key2) {
    return function(prop4) {
      return function(reader) {
        return function(f) {
          var go2 = function(a2) {
            return composeKleisliFlipped3(reader)(readProp2(prop4))(unsafeToForeign(a2));
          };
          return handler$prime(key2)(composeKleisli2(currentTarget)(function(e) {
            return either($$const(Nothing.value))(function($85) {
              return Just.create(f($85));
            })(runExcept(go2(e)));
          }));
        };
      };
    };
  };
  var onChecked = /* @__PURE__ */ addForeignPropHandler(change)("checked")(/* @__PURE__ */ readBoolean(monadIdentity));
  var onValueChange = /* @__PURE__ */ addForeignPropHandler(change)("value")(readString2);
  var onValueInput = /* @__PURE__ */ addForeignPropHandler(input2)("value")(readString2);

  // output/Halogen.HTML.Properties/index.js
  var unwrap4 = /* @__PURE__ */ unwrap();
  var prop2 = function(dictIsProp) {
    return prop(dictIsProp);
  };
  var prop1 = /* @__PURE__ */ prop2(isPropBoolean);
  var prop22 = /* @__PURE__ */ prop2(isPropString);
  var prop3 = /* @__PURE__ */ prop2(isPropInt);
  var required2 = /* @__PURE__ */ prop1("required");
  var selected = /* @__PURE__ */ prop1("selected");
  var src2 = /* @__PURE__ */ prop22("src");
  var step3 = /* @__PURE__ */ prop2(isPropStepValue)("step");
  var tabIndex = /* @__PURE__ */ prop3("tabIndex");
  var title = /* @__PURE__ */ prop22("title");
  var type_3 = function(dictIsProp) {
    return prop2(dictIsProp)("type");
  };
  var value3 = function(dictIsProp) {
    return prop2(dictIsProp)("value");
  };
  var name4 = /* @__PURE__ */ prop22("name");
  var id3 = /* @__PURE__ */ prop22("id");
  var draggable = /* @__PURE__ */ prop1("draggable");
  var disabled2 = /* @__PURE__ */ prop1("disabled");
  var class_ = /* @__PURE__ */ function() {
    var $36 = prop22("className");
    return function($37) {
      return $36(unwrap4($37));
    };
  }();
  var attr2 = /* @__PURE__ */ function() {
    return attr(Nothing.value);
  }();
  var style = /* @__PURE__ */ attr2("style");

  // output/Extras/index.js
  var type_4 = /* @__PURE__ */ type_3(isPropInputType);
  var value4 = /* @__PURE__ */ value3(isPropString);
  var identity8 = /* @__PURE__ */ identity(categoryFn);
  var DoneReading = /* @__PURE__ */ function() {
    function DoneReading2() {
    }
    ;
    DoneReading2.value = new DoneReading2();
    return DoneReading2;
  }();
  var ClickedDone = /* @__PURE__ */ function() {
    function ClickedDone2() {
    }
    ;
    ClickedDone2.value = new ClickedDone2();
    return ClickedDone2;
  }();
  var readCookie = function(name17) {
    return function __do4() {
      var cookieString = readCookieImpl(name17)();
      var $13 = cookieString === "";
      if ($13) {
        return Nothing.value;
      }
      ;
      return new Just(cookieString);
    };
  };
  var mkInstructions = function(instructions3) {
    return div2([class_("instructions-container")])([text(instructions3), br_, input([type_4(InputButton.value), onClick(function(v) {
      return ClickedDone.value;
    }), value4("Continuar")])]);
  };
  var renderInstructions = function(instructions3) {
    return mkInstructions(instructions3);
  };
  var handleAction = function(dictMonadAff) {
    return function(v) {
      return raise(DoneReading.value);
    };
  };
  var instructionsComponent = function(dictMonadAff) {
    var handleAction1 = handleAction(dictMonadAff);
    return function(instructions3) {
      return mkComponent({
        initialState: identity8,
        render: function(v) {
          return renderInstructions(instructions3);
        },
        "eval": mkEval({
          handleQuery: defaultEval.handleQuery,
          receive: defaultEval.receive,
          initialize: defaultEval.initialize,
          finalize: defaultEval.finalize,
          handleAction: handleAction1
        })
      });
    };
  };

  // output/Halogen.HTML/index.js
  var componentSlot2 = /* @__PURE__ */ componentSlot();
  var slot = function() {
    return function(dictIsSymbol) {
      var componentSlot1 = componentSlot2(dictIsSymbol);
      return function(dictOrd) {
        var componentSlot22 = componentSlot1(dictOrd);
        return function(label5) {
          return function(p2) {
            return function(component2) {
              return function(input3) {
                return function(outputQuery) {
                  return widget(new ComponentSlot(componentSlot22(label5)(p2)(component2)(input3)(function($11) {
                    return Just.create(outputQuery($11));
                  })));
                };
              };
            };
          };
        };
      };
    };
  };

  // output/Barrat/index.js
  var bind3 = /* @__PURE__ */ bind(bindHalogenM);
  var gets2 = /* @__PURE__ */ gets(monadStateHalogenM);
  var modify_3 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var type_5 = /* @__PURE__ */ type_3(isPropInputType);
  var show3 = /* @__PURE__ */ show(showInt);
  var value5 = /* @__PURE__ */ value3(isPropString);
  var discard2 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var pure6 = /* @__PURE__ */ pure(applicativeHalogenM);
  var slot2 = /* @__PURE__ */ slot();
  var slot1 = /* @__PURE__ */ slot2({
    reflectSymbol: function() {
      return "barratInstructions";
    }
  })(ordInt);
  var slot22 = /* @__PURE__ */ slot2({
    reflectSymbol: function() {
      return "barratForm";
    }
  })(ordInt);
  var BarratDone = /* @__PURE__ */ function() {
    function BarratDone2() {
    }
    ;
    BarratDone2.value = new BarratDone2();
    return BarratDone2;
  }();
  var BarratInstructions = /* @__PURE__ */ function() {
    function BarratInstructions2() {
    }
    ;
    BarratInstructions2.value = new BarratInstructions2();
    return BarratInstructions2;
  }();
  var BarratForm = /* @__PURE__ */ function() {
    function BarratForm2() {
    }
    ;
    BarratForm2.value = new BarratForm2();
    return BarratForm2;
  }();
  var BarratInstructionsDone = /* @__PURE__ */ function() {
    function BarratInstructionsDone2(value0) {
      this.value0 = value0;
    }
    ;
    BarratInstructionsDone2.create = function(value0) {
      return new BarratInstructionsDone2(value0);
    };
    return BarratInstructionsDone2;
  }();
  var UpdateAnswers = /* @__PURE__ */ function() {
    function UpdateAnswers2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UpdateAnswers2.create = function(value0) {
      return function(value1) {
        return new UpdateAnswers2(value0, value1);
      };
    };
    return UpdateAnswers2;
  }();
  var HandleSubmit = /* @__PURE__ */ function() {
    function HandleSubmit3(value0) {
      this.value0 = value0;
    }
    ;
    HandleSubmit3.create = function(value0) {
      return new HandleSubmit3(value0);
    };
    return HandleSubmit3;
  }();
  var HandleBarratDone = /* @__PURE__ */ function() {
    function HandleBarratDone2(value0) {
      this.value0 = value0;
    }
    ;
    HandleBarratDone2.create = function(value0) {
      return new HandleBarratDone2(value0);
    };
    return HandleBarratDone2;
  }();
  var setAnswer = function(dictMonadEffect) {
    return function(index4) {
      return function(val) {
        return bind3(gets2(function(v) {
          return v.answers;
        }))(function(arr) {
          var v = updateAt(index4)(val)(arr);
          if (v instanceof Nothing) {
            return unsafeThrow("Could not update array");
          }
          ;
          if (v instanceof Just) {
            return modify_3(function(state3) {
              var $54 = {};
              for (var $55 in state3) {
                if ({}.hasOwnProperty.call(state3, $55)) {
                  $54[$55] = state3[$55];
                }
                ;
              }
              ;
              $54.answers = v.value0;
              return $54;
            });
          }
          ;
          throw new Error("Failed pattern match at Barrat (line 87, column 3 - line 89, column 73): " + [v.constructor.name]);
        });
      };
    };
  };
  var questions = ["1. Planifico mis tareas con cuidado", "2. Hago las cosas sin pensarlas", "3. Casi nunca me tomo las cosas a pecho (no me perturbo con facilidad)", "4. Mis pensamientos pueden tener gran velocidad (tengo pensamientos que van muy r\xE1pido en mi mente)", "5. Planifico mis viajes con antelaci\xF3n", "6. Soy una persona con autocontrol", "7. Me concentro con facilidad (se me hace f\xE1cil concentrarme)", "8. Ahorro con regularidad", "9. Se me hace dif\xEDcil estar quieto/a durante largos per\xEDodos de tiempo", "10. Pienso las cosas cuidadosamente", "11. Planifico para tener un trabajo fijo (me esfuerzo por asegurar que tendr\xE9 dinero para pagar mis gastos)", "12. Digo las cosas sin pensarlas", "13. Me gusta pensar sobre problemas complicados (me gusta pensar sobre problemas complejos)", "14. Cambio de trabajo frecuentemente (no me quedo en el mismo trabajo durante largos per\xEDodos de tiempo)", "15. Act\xFAo impulsivamente", "16. Me aburro con facilidad tratando de resolver problemas en mi mente (me aburre pensar en algo por demasiado tiempo)", "17. Visito al m\xE9dico y al dentista con regularidad", "18. Hago las cosas en el momento que se me ocurren", "19. Soy una persona que piensa sin distraerse (puedo enfocar mi mente en una sola cosa por mucho tiempo)", "20. Cambio de vivienda a menudo (me mudo con frecuencia o no me gusta vivir en el mismo sitio por mucho tiempo)", "21. Compro cosas impulsivamente", "22. Termino lo que empiezo", "23. Camino y me muevo con rapidez", "24. Resuelvo los problemas experimentando (resuelvo los problemas empleando una posible soluci\xF3n y viendo si funciona)", "25. Gasto en efectivo o a cr\xE9dito m\xE1s de lo que gano (gasto m\xE1s de lo gano)", "26. Hablo r\xE1pido", "27. Tengo pensamientos extra\xF1os cuando estoy pensando (a veces tengo pensamientos irrelevantes cuando pienso)", "28. Me interesa m\xE1s el presente que el futuro", "29. Me siento inquieto/a en clases o charlas (me siento inquieto/a si tengo que o\xEDr a alguien hablar durante un largo per\xEDodo de tiempo)", "30. Planifico el futuro (me interesa m\xE1s el futuro que el presente)"];
  var mkQuestion = function(q2) {
    return function(index4) {
      return tr([])([td_([text(q2)]), td_([input([type_5(InputRadio.value), name4(show3(index4)), required2(true), onChecked(function(v) {
        return new UpdateAnswers(index4, "1");
      })])]), td_([input([type_5(InputRadio.value), name4(show3(index4)), onChecked(function(v) {
        return new UpdateAnswers(index4, "2");
      })])]), td_([input([type_5(InputRadio.value), name4(show3(index4)), onChecked(function(v) {
        return new UpdateAnswers(index4, "3");
      })])]), td_([input([type_5(InputRadio.value), name4(show3(index4)), onChecked(function(v) {
        return new UpdateAnswers(index4, "4");
      })])])]);
    };
  };
  var mkAllQuestions = /* @__PURE__ */ function() {
    var zipped = zip(questions)(range2(0)(29));
    var step4 = function(arr) {
      return function(v) {
        return snoc(arr)(mkQuestion(v.value0)(v.value1));
      };
    };
    return foldl2(step4)([])(zipped);
  }();
  var renderBarrat = function(v) {
    return div2([class_("container")])([form([id3("barrat_form"), onSubmit(function(ev) {
      return new HandleSubmit(ev);
    })])([table_([thead_([tr([])([th_([]), th_([text("Raramente o nunca")]), th_([text("Ocasionalmente")]), th_([text("A menudo")]), th_([text("Siempre o casi siempre")])])]), tbody_(mkAllQuestions)]), input([type_5(InputSubmit.value), title("Siguiente"), value5("Siguiente")])])]);
  };
  var instructions = /* @__PURE__ */ function() {
    return "Las personas son diferentes en cuanto a la forma en que se comportan y piensan en distintas situaciones. \xC9sta es una  prueba para medir algunas de las formas en que usted act\xFAa y piensa. No se detenga demasiado tiempo en ninguna de las oraciones. Responda r\xE1pida y honestamente.";
  }();
  var initialState = function(v) {
    return {
      answers: replicate(30)(""),
      stage: BarratInstructions.value
    };
  };
  var handleSubmit = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    return function(ev) {
      return discard2(liftEffect7(preventDefault(ev)))(function() {
        return bind3(gets2(function(v) {
          return v.answers;
        }))(function(answers) {
          return bind3(liftAff3(post2(ignore)("/barrat")(new Just(new $$String(joinWith(" ")(answers))))))(function() {
            return raise(BarratDone.value);
          });
        });
      });
    };
  };
  var handleAction2 = function(dictMonadAff) {
    var setAnswer1 = setAnswer(dictMonadAff.MonadEffect0());
    var handleSubmit1 = handleSubmit(dictMonadAff);
    return function(action2) {
      if (action2 instanceof UpdateAnswers) {
        return setAnswer1(action2.value0)(action2.value1);
      }
      ;
      if (action2 instanceof HandleSubmit) {
        return handleSubmit1(action2.value0);
      }
      ;
      return pure6(unit);
    };
  };
  var barratHandler = function(dictMonadEffect) {
    return function(v) {
      if (v instanceof BarratInstructionsDone) {
        return modify_3(function(state3) {
          var $67 = {};
          for (var $68 in state3) {
            if ({}.hasOwnProperty.call(state3, $68)) {
              $67[$68] = state3[$68];
            }
            ;
          }
          ;
          $67.stage = BarratForm.value;
          return $67;
        });
      }
      ;
      if (v instanceof HandleBarratDone) {
        return raise(BarratDone.value);
      }
      ;
      return pure6(unit);
    };
  };
  var barratFormComponent = function(dictMonadAff) {
    return mkComponent({
      initialState,
      render: renderBarrat,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: handleAction2(dictMonadAff)
      })
    });
  };
  var _barratInstructions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _barratForm = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var render = function(dictMonadAff) {
    var instructionsComponent2 = instructionsComponent(dictMonadAff);
    var barratFormComponent1 = barratFormComponent(dictMonadAff);
    return function(state3) {
      if (state3.stage instanceof BarratInstructions) {
        return slot1(_barratInstructions)(20)(instructionsComponent2(instructions))(unit)(BarratInstructionsDone.create);
      }
      ;
      if (state3.stage instanceof BarratForm) {
        return slot22(_barratForm)(21)(barratFormComponent1)(unit)(HandleBarratDone.create);
      }
      ;
      throw new Error("Failed pattern match at Barrat (line 58, column 16 - line 60, column 81): " + [state3.stage.constructor.name]);
    };
  };
  var barratComponent = function(dictMonadAff) {
    return mkComponent({
      initialState,
      render: render(dictMonadAff),
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: barratHandler(dictMonadAff.MonadEffect0())
      })
    });
  };

  // output/Data.String.CodePoints/foreign.js
  var hasArrayFrom = typeof Array.from === "function";
  var hasStringIterator = typeof Symbol !== "undefined" && Symbol != null && typeof Symbol.iterator !== "undefined" && typeof String.prototype[Symbol.iterator] === "function";
  var hasFromCodePoint = typeof String.prototype.fromCodePoint === "function";
  var hasCodePointAt = typeof String.prototype.codePointAt === "function";

  // output/Data.Argonaut.Encode.Encoders/index.js
  var map16 = /* @__PURE__ */ map(functorArray);
  var encodeString = id;
  var encodeNumber = id;
  var encodeMaybe = function(encoder) {
    return function(v) {
      if (v instanceof Nothing) {
        return jsonNull;
      }
      ;
      if (v instanceof Just) {
        return encoder(v.value0);
      }
      ;
      throw new Error("Failed pattern match at Data.Argonaut.Encode.Encoders (line 31, column 23 - line 33, column 22): " + [v.constructor.name]);
    };
  };
  var encodeInt = function($53) {
    return id(toNumber($53));
  };
  var encodeBoolean = id;
  var encodeArray = function(encoder) {
    var $58 = map16(encoder);
    return function($59) {
      return id($58($59));
    };
  };

  // output/Record/index.js
  var get3 = function(dictIsSymbol) {
    var reflectSymbol2 = reflectSymbol(dictIsSymbol);
    return function() {
      return function(l) {
        return function(r) {
          return unsafeGet(reflectSymbol2(l))(r);
        };
      };
    };
  };

  // output/Data.Argonaut.Encode.Class/index.js
  var gEncodeJsonNil = {
    gEncodeJson: function(v) {
      return function(v1) {
        return empty;
      };
    }
  };
  var gEncodeJson = function(dict) {
    return dict.gEncodeJson;
  };
  var encodeRecord = function(dictGEncodeJson) {
    var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
    return function() {
      return {
        encodeJson: function(rec) {
          return id(gEncodeJson1(rec)($$Proxy.value));
        }
      };
    };
  };
  var encodeJsonJString = {
    encodeJson: encodeString
  };
  var encodeJsonJNumber = {
    encodeJson: encodeNumber
  };
  var encodeJsonJBoolean = {
    encodeJson: encodeBoolean
  };
  var encodeJsonInt = {
    encodeJson: encodeInt
  };
  var encodeJson = function(dict) {
    return dict.encodeJson;
  };
  var encodeJsonArray = function(dictEncodeJson) {
    return {
      encodeJson: encodeArray(encodeJson(dictEncodeJson))
    };
  };
  var encodeJsonMaybe = function(dictEncodeJson) {
    return {
      encodeJson: encodeMaybe(encodeJson(dictEncodeJson))
    };
  };
  var gEncodeJsonCons = function(dictEncodeJson) {
    var encodeJson1 = encodeJson(dictEncodeJson);
    return function(dictGEncodeJson) {
      var gEncodeJson1 = gEncodeJson(dictGEncodeJson);
      return function(dictIsSymbol) {
        var reflectSymbol2 = reflectSymbol(dictIsSymbol);
        var get6 = get3(dictIsSymbol)();
        return function() {
          return {
            gEncodeJson: function(row) {
              return function(v) {
                return insert(reflectSymbol2($$Proxy.value))(encodeJson1(get6($$Proxy.value)(row)))(gEncodeJson1(row)($$Proxy.value));
              };
            }
          };
        };
      };
    };
  };

  // output/Effect.Console/foreign.js
  var log2 = function(s) {
    return function() {
      console.log(s);
    };
  };
  var warn = function(s) {
    return function() {
      console.warn(s);
    };
  };

  // output/Effect.Class.Console/index.js
  var log3 = function(dictMonadEffect) {
    var $67 = liftEffect(dictMonadEffect);
    return function($68) {
      return $67(log2($68));
    };
  };

  // output/Beck/index.js
  var bind4 = /* @__PURE__ */ bind(bindHalogenM);
  var gets3 = /* @__PURE__ */ gets(monadStateHalogenM);
  var modify_4 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var type_6 = /* @__PURE__ */ type_3(isPropInputType);
  var show4 = /* @__PURE__ */ show(showInt);
  var discard3 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var log4 = /* @__PURE__ */ log3(monadEffectEffect);
  var pure7 = /* @__PURE__ */ pure(applicativeHalogenM);
  var gEncodeJsonCons2 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonArray(encodeJsonInt));
  var encodeJson2 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons2(/* @__PURE__ */ gEncodeJsonCons2(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "depression";
    }
  })())({
    reflectSymbol: function() {
      return "anxiety";
    }
  })())());
  var append5 = /* @__PURE__ */ append(semigroupArray);
  var value6 = /* @__PURE__ */ value3(isPropString);
  var identity9 = /* @__PURE__ */ identity(categoryFn);
  var slot3 = /* @__PURE__ */ slot();
  var slot12 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "anxietyInstructions";
    }
  })(ordInt);
  var slot23 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "anxietySlot";
    }
  })(ordInt);
  var slot32 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "depressionInstructions";
    }
  })(ordInt);
  var slot4 = /* @__PURE__ */ slot3({
    reflectSymbol: function() {
      return "depressionSlot";
    }
  })(ordInt);
  var BeckDone = /* @__PURE__ */ function() {
    function BeckDone2() {
    }
    ;
    BeckDone2.value = new BeckDone2();
    return BeckDone2;
  }();
  var AnxietyCompleted = /* @__PURE__ */ function() {
    function AnxietyCompleted2(value0) {
      this.value0 = value0;
    }
    ;
    AnxietyCompleted2.create = function(value0) {
      return new AnxietyCompleted2(value0);
    };
    return AnxietyCompleted2;
  }();
  var AnxietyInstructions = /* @__PURE__ */ function() {
    function AnxietyInstructions2() {
    }
    ;
    AnxietyInstructions2.value = new AnxietyInstructions2();
    return AnxietyInstructions2;
  }();
  var AnxietyForm = /* @__PURE__ */ function() {
    function AnxietyForm2() {
    }
    ;
    AnxietyForm2.value = new AnxietyForm2();
    return AnxietyForm2;
  }();
  var DepressionInstructions = /* @__PURE__ */ function() {
    function DepressionInstructions2() {
    }
    ;
    DepressionInstructions2.value = new DepressionInstructions2();
    return DepressionInstructions2;
  }();
  var DepressionForm = /* @__PURE__ */ function() {
    function DepressionForm2() {
    }
    ;
    DepressionForm2.value = new DepressionForm2();
    return DepressionForm2;
  }();
  var UpdateAnxiety = /* @__PURE__ */ function() {
    function UpdateAnxiety2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UpdateAnxiety2.create = function(value0) {
      return function(value1) {
        return new UpdateAnxiety2(value0, value1);
      };
    };
    return UpdateAnxiety2;
  }();
  var UpdateDepression = /* @__PURE__ */ function() {
    function UpdateDepression2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UpdateDepression2.create = function(value0) {
      return function(value1) {
        return new UpdateDepression2(value0, value1);
      };
    };
    return UpdateDepression2;
  }();
  var HandleSubmit2 = /* @__PURE__ */ function() {
    function HandleSubmit3(value0) {
      this.value0 = value0;
    }
    ;
    HandleSubmit3.create = function(value0) {
      return new HandleSubmit3(value0);
    };
    return HandleSubmit3;
  }();
  var AnxietyInstructionsDone = /* @__PURE__ */ function() {
    function AnxietyInstructionsDone2(value0) {
      this.value0 = value0;
    }
    ;
    AnxietyInstructionsDone2.create = function(value0) {
      return new AnxietyInstructionsDone2(value0);
    };
    return AnxietyInstructionsDone2;
  }();
  var AnxietyFormDone = /* @__PURE__ */ function() {
    function AnxietyFormDone2(value0) {
      this.value0 = value0;
    }
    ;
    AnxietyFormDone2.create = function(value0) {
      return new AnxietyFormDone2(value0);
    };
    return AnxietyFormDone2;
  }();
  var DepressionInstructionsDone = /* @__PURE__ */ function() {
    function DepressionInstructionsDone2(value0) {
      this.value0 = value0;
    }
    ;
    DepressionInstructionsDone2.create = function(value0) {
      return new DepressionInstructionsDone2(value0);
    };
    return DepressionInstructionsDone2;
  }();
  var GoDepressionInstructions = /* @__PURE__ */ function() {
    function GoDepressionInstructions2() {
    }
    ;
    GoDepressionInstructions2.value = new GoDepressionInstructions2();
    return GoDepressionInstructions2;
  }();
  var HandleAnxietyDone = /* @__PURE__ */ function() {
    function HandleAnxietyDone2(value0) {
      this.value0 = value0;
    }
    ;
    HandleAnxietyDone2.create = function(value0) {
      return new HandleAnxietyDone2(value0);
    };
    return HandleAnxietyDone2;
  }();
  var HandleDepressionDone = /* @__PURE__ */ function() {
    function HandleDepressionDone2(value0) {
      this.value0 = value0;
    }
    ;
    HandleDepressionDone2.create = function(value0) {
      return new HandleDepressionDone2(value0);
    };
    return HandleDepressionDone2;
  }();
  var setDepressionAnswer = function(dictMonadEffect) {
    return function(index4) {
      return function(val) {
        return bind4(gets3(function(v) {
          return v.depressionAnswers;
        }))(function(arr) {
          var v = updateAt(index4)(val)(arr);
          if (v instanceof Nothing) {
            return unsafeThrow("Could not update array");
          }
          ;
          if (v instanceof Just) {
            return modify_4(function(state3) {
              var $105 = {};
              for (var $106 in state3) {
                if ({}.hasOwnProperty.call(state3, $106)) {
                  $105[$106] = state3[$106];
                }
                ;
              }
              ;
              $105.depressionAnswers = v.value0;
              return $105;
            });
          }
          ;
          throw new Error("Failed pattern match at Beck (line 104, column 3 - line 106, column 83): " + [v.constructor.name]);
        });
      };
    };
  };
  var setAnxietyAnswer = function(dictMonadEffect) {
    return function(index4) {
      return function(val) {
        return bind4(gets3(function(v) {
          return v.anxietyAnswers;
        }))(function(arr) {
          var v = updateAt(index4)(val)(arr);
          if (v instanceof Nothing) {
            return unsafeThrow("Could not update array");
          }
          ;
          if (v instanceof Just) {
            return modify_4(function(state3) {
              var $110 = {};
              for (var $111 in state3) {
                if ({}.hasOwnProperty.call(state3, $111)) {
                  $110[$111] = state3[$111];
                }
                ;
              }
              ;
              $110.anxietyAnswers = v.value0;
              return $110;
            });
          }
          ;
          throw new Error("Failed pattern match at Beck (line 97, column 3 - line 99, column 80): " + [v.constructor.name]);
        });
      };
    };
  };
  var mkAnxietyQuestion = function(q2) {
    return function(index4) {
      return tr([])([td_([text(q2)]), td_([input([type_6(InputRadio.value), name4(show4(index4)), required2(true), onChecked(function(v) {
        return new UpdateAnxiety(index4, 0);
      })])]), td_([input([type_6(InputRadio.value), name4(show4(index4)), onChecked(function(v) {
        return new UpdateAnxiety(index4, 1);
      })])]), td_([input([type_6(InputRadio.value), name4(show4(index4)), onChecked(function(v) {
        return new UpdateAnxiety(index4, 2);
      })])]), td_([input([type_6(InputRadio.value), name4(show4(index4)), onChecked(function(v) {
        return new UpdateAnxiety(index4, 3);
      })])])]);
    };
  };
  var mainHandler = function(dictMonadEffect) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadEffect));
    return function(v) {
      if (v instanceof AnxietyInstructionsDone) {
        return modify_4(function(state3) {
          var $115 = {};
          for (var $116 in state3) {
            if ({}.hasOwnProperty.call(state3, $116)) {
              $115[$116] = state3[$116];
            }
            ;
          }
          ;
          $115.stage = AnxietyForm.value;
          return $115;
        });
      }
      ;
      if (v instanceof GoDepressionInstructions) {
        return modify_4(function(state3) {
          var $119 = {};
          for (var $120 in state3) {
            if ({}.hasOwnProperty.call(state3, $120)) {
              $119[$120] = state3[$120];
            }
            ;
          }
          ;
          $119.stage = DepressionInstructions.value;
          return $119;
        });
      }
      ;
      if (v instanceof DepressionInstructionsDone) {
        return modify_4(function(state3) {
          var $122 = {};
          for (var $123 in state3) {
            if ({}.hasOwnProperty.call(state3, $123)) {
              $122[$123] = state3[$123];
            }
            ;
          }
          ;
          $122.stage = DepressionForm.value;
          return $122;
        });
      }
      ;
      if (v instanceof HandleAnxietyDone && v.value0 instanceof AnxietyCompleted) {
        return modify_4(function(state3) {
          var $126 = {};
          for (var $127 in state3) {
            if ({}.hasOwnProperty.call(state3, $127)) {
              $126[$127] = state3[$127];
            }
            ;
          }
          ;
          $126.stage = DepressionInstructions.value;
          $126.anxietyAnswers = v.value0.value0;
          return $126;
        });
      }
      ;
      if (v instanceof HandleDepressionDone && v.value0 instanceof BeckDone) {
        return discard3(liftEffect7(log4("??????")))(function() {
          return raise(BeckDone.value);
        });
      }
      ;
      return pure7(unit);
    };
  };
  var initialState2 = function(v) {
    return {
      anxietyAnswers: replicate(21)(-100 | 0),
      depressionAnswers: replicate(21)(-100 | 0),
      stage: AnxietyInstructions.value
    };
  };
  var handleSubmit2 = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    return function(ev) {
      return discard3(liftEffect7(preventDefault(ev)))(function() {
        return bind4(gets3(function(v) {
          return v.anxietyAnswers;
        }))(function(anxietyAnswers) {
          return bind4(gets3(function(v) {
            return v.depressionAnswers;
          }))(function(depressionAnswers) {
            var body2 = {
              anxiety: anxietyAnswers,
              depression: depressionAnswers
            };
            return bind4(liftAff3(post2(ignore)("/beck")(new Just(new Json(encodeJson2(body2))))))(function() {
              return raise(BeckDone.value);
            });
          });
        });
      });
    };
  };
  var handleAction3 = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var setAnxietyAnswer1 = setAnxietyAnswer(MonadEffect0);
    var setDepressionAnswer1 = setDepressionAnswer(MonadEffect0);
    var liftEffect7 = liftEffect(monadEffectHalogenM(MonadEffect0));
    var handleSubmit1 = handleSubmit2(dictMonadAff);
    var mainHandler1 = mainHandler(MonadEffect0);
    return function(action2) {
      if (action2 instanceof UpdateAnxiety) {
        return setAnxietyAnswer1(action2.value0)(action2.value1);
      }
      ;
      if (action2 instanceof UpdateDepression) {
        return setDepressionAnswer1(action2.value0)(action2.value1);
      }
      ;
      if (action2 instanceof AnxietyFormDone) {
        return discard3(liftEffect7(preventDefault(action2.value0)))(function() {
          return modify_4(function(state3) {
            var $137 = {};
            for (var $138 in state3) {
              if ({}.hasOwnProperty.call(state3, $138)) {
                $137[$138] = state3[$138];
              }
              ;
            }
            ;
            $137.stage = DepressionInstructions.value;
            return $137;
          });
        });
      }
      ;
      if (action2 instanceof HandleSubmit2) {
        return discard3(handleSubmit1(action2.value0))(function() {
          return mainHandler1(new HandleDepressionDone(BeckDone.value));
        });
      }
      ;
      if (action2 instanceof AnxietyInstructionsDone) {
        return modify_4(function(state3) {
          var $142 = {};
          for (var $143 in state3) {
            if ({}.hasOwnProperty.call(state3, $143)) {
              $142[$143] = state3[$143];
            }
            ;
          }
          ;
          $142.stage = AnxietyForm.value;
          return $142;
        });
      }
      ;
      return pure7(unit);
    };
  };
  var genDepressionRadios = function(answers) {
    return function(index4) {
      var step4 = function(arr) {
        return function(v) {
          return append5(arr)([input([type_6(InputRadio.value), name4(show4(index4)), required2(true), onChecked(function(v1) {
            return new UpdateDepression(index4, v.value0);
          })]), text("    " + v.value1), br_]);
        };
      };
      return foldl2(step4)([])(answers);
    };
  };
  var mkDepressionQuestion = function(q2) {
    return function(index4) {
      return div2([class_("question")])([label_([text(q2.question)]), br_, div_(genDepressionRadios(q2.answers)(index4))]);
    };
  };
  var depressionQuestions = /* @__PURE__ */ function() {
    return [{
      question: "Tristeza",
      answers: [new Tuple(0, "No me siento triste."), new Tuple(1, "Me siento triste gran parte del tiempo."), new Tuple(2, "Me siento triste todo el tiempo."), new Tuple(3, "Me siento tan triste o soy tan infeliz que no puedo soportarlo.")]
    }, {
      question: "Pesimismo",
      answers: [new Tuple(0, "No estoy desalentado respecto a mi futuro"), new Tuple(1, "Me siento m\xE1s desalentado respecto de mi futuro que lo que sol\xEDa estarlo."), new Tuple(2, "No espero que las cosas funcionen para m\xED."), new Tuple(3, "Siento que no hay esperanza para mi futuro y que s\xF3lo puede empeorar.")]
    }, {
      question: "Fracaso",
      answers: [new Tuple(0, "No me siento como un fracasado."), new Tuple(1, "He fracasado m\xE1s de lo que hubiera debido."), new Tuple(2, "Cuando miro hacia atr\xE1s, veo muchos fracasos."), new Tuple(3, "Siento que como persona soy un fracaso total.")]
    }, {
      question: "P\xE9rdida de placer",
      answers: [new Tuple(0, "Obtengo tanto placer como siempre por las cosas de las que disfruto."), new Tuple(1, "No disfruto tanto las cosas como sol\xEDa hacerlo."), new Tuple(2, "Obtengo muy poco placer de las cosas que sol\xEDa disfrutar."), new Tuple(3, "No puedo obtener ning\xFAn placer de las cosas de las que sol\xEDa disfrutar.")]
    }, {
      question: "Sentimiento de culpa",
      answers: [new Tuple(0, "No me siento particularmente culpable."), new Tuple(1, "Me siento culpable respecto de varias cosas que he hecho o que deber\xEDa haber hecho."), new Tuple(2, "Me siento bastante la mayor parte del tiempo."), new Tuple(3, "Me siento culpable todo el tiempo.")]
    }, {
      question: "Sentimiento de castigo",
      answers: [new Tuple(0, "No siento que este siendo castigado."), new Tuple(1, "Siento que tal vez pueda ser castigado."), new Tuple(2, "Espero ser castigado."), new Tuple(3, "Siento que estoy siendo castigado.")]
    }, {
      question: "Disconformidad con uno mismo",
      answers: [new Tuple(0, "Siento acerca de mi lo mismo que siempre."), new Tuple(1, "He perdido la confianza en m\xED mismo."), new Tuple(2, "Estoy decepcionado conmigo mismo."), new Tuple(3, "No me gusto a mi mismo.")]
    }, {
      question: "Autocr\xEDtica",
      answers: [new Tuple(0, "No me critico ni me culpo m\xE1s de lo habitual."), new Tuple(1, "Estoy m\xE1s cr\xEDtico conmigo de lo que sol\xEDa estarlo."), new Tuple(2, "Me critico a m\xED mismo por todos mis errores."), new Tuple(3, "Me culpo a m\xED mismo por todo lo malo que sucede.")]
    }, {
      question: "Pensamientos o deseos suicidas",
      answers: [new Tuple(0, "No tengo ning\xFAn pensamiento de matarme."), new Tuple(1, "He tenido pensamientos de matarme, pero no lo har\xEDa."), new Tuple(2, "Querr\xEDa matarme."), new Tuple(3, "Me matar\xEDa si tuviera la oportunidad de hacerlo.")]
    }, {
      question: "Llanto",
      answers: [new Tuple(0, "No lloro m\xE1s de lo que sol\xEDa hacerlo."), new Tuple(1, "Lloro m\xE1s de lo que sol\xEDa hacerlo."), new Tuple(2, "Lloro por cualquier peque\xF1ez."), new Tuple(3, "Siento ganas de llorar, pero no puedo.")]
    }, {
      question: "Agitaci\xF3n",
      answers: [new Tuple(0, "No estoy m\xE1s inquieto o tenso de lo habitual."), new Tuple(1, "Me siento m\xE1s inquieto o tenso que lo habitual."), new Tuple(2, "Estoy tan inquieto o agitado que me es dif\xEDcil quedarme quieto."), new Tuple(3, "Estoy tan inquieto o agitado que tengo que estar siempre en movimiento o haciendo algo.")]
    }, {
      question: "P\xE9rdida de inter\xE9s",
      answers: [new Tuple(0, "No he perdido el inter\xE9s en otras actividades o personas."), new Tuple(1, "Estoy menos interesado que antes en otras personas o cosas."), new Tuple(2, "He perdido casi todo el inter\xE9s en otras personas o cosas."), new Tuple(3, "Me es dif\xEDcil interesarme por algo.")]
    }, {
      question: "Indecisi\xF3n",
      answers: [new Tuple(0, "Tomo mis propias decisiones tan bien como siempre."), new Tuple(1, "Me resulta m\xE1s dif\xEDcil que de costumbre tomar decisiones."), new Tuple(2, "Encuentro mucha m\xE1s dificultad que antes de tomar decisiones."), new Tuple(3, "Tengo problemas para tomar cualquier decisi\xF3n.")]
    }, {
      question: "Desvalorizaci\xF3n",
      answers: [new Tuple(0, "No siento que yo no sea valioso."), new Tuple(1, "No me considero a m\xED mismo tan valioso y \xFAtil como considerarme."), new Tuple(2, "Me siento menos valioso cuando me comparo con otros."), new Tuple(3, "Siento que no valgo nada.")]
    }, {
      question: "P\xE9rdida de energ\xEDa",
      answers: [new Tuple(0, "Tengo tanta energ\xEDa como siempre."), new Tuple(1, "Tengo menos energ\xEDa que la que sol\xEDa tener."), new Tuple(2, "No tengo suficiente energ\xEDa para hacer demasiado."), new Tuple(3, "No tengo energ\xEDa suficiente para hacer nada.")]
    }, {
      question: "Cambio de h\xE1bitos de sue\xF1o",
      answers: [new Tuple(0, "No he experimento ning\xFAn cambio en mis h\xE1bitos de sue\xF1o."), new Tuple(1, "Duermo un poco m\xE1s que lo habitual."), new Tuple(1, "Duermo un poco menos que lo habitual."), new Tuple(2, "Duermo mucho m\xE1s que lo habitual."), new Tuple(2, "Duermo mucho menos que lo habitual"), new Tuple(3, "Duermo la mayor parte del d\xEDa."), new Tuple(3, "Me despierto 1-2 horas m\xE1s temprano y no puedo volver a dormirme")]
    }, {
      question: "Irritabilidad",
      answers: [new Tuple(0, "No estoy tan irritable que lo habitual."), new Tuple(1, "Estoy m\xE1s irritable que lo habitual."), new Tuple(2, "Estoy mucho m\xE1s irritable que lo habitual."), new Tuple(3, "Estoy irritable todo el tiempo.")]
    }, {
      question: "Cambios en apetito",
      answers: [new Tuple(0, "No he experimentado ning\xFAn cambio en mi apetito."), new Tuple(1, "Mi apetito es un poco menor que lo habitual."), new Tuple(1, "Mi apetito es un poco mayor que lo habitual."), new Tuple(2, "Mi apetito es mucho menor que antes."), new Tuple(2, "Mi apetito es mucho es mucho mayor que lo habitual."), new Tuple(3, "No tengo apetito en absoluto."), new Tuple(3, "Quiero comer todo el d\xEDa.")]
    }, {
      question: "Dificultad en la concentraci\xF3n",
      answers: [new Tuple(0, "Puedo concentrarme tan bien como siempre."), new Tuple(1, "No puedo concentrarme tan bien como habitualmente."), new Tuple(2, "Me es dif\xEDcil mantener la mente en algo por mucho tiempo."), new Tuple(3, "Encuentro que no puedo concentrarme en nada.")]
    }, {
      question: "Cansancio o fatiga",
      answers: [new Tuple(0, "No estoy m\xE1s cansado o fatigado que lo habitual."), new Tuple(1, "Me fatigo o me canso m\xE1s f\xE1cilmente que lo habitual."), new Tuple(2, "Estoy demasiado fatigado o cansado para hacer muchas de las cosas que sol\xEDa hacer."), new Tuple(3, "Estoy demasiado fatigado o cansado para hacer la mayor\xEDa de las cosas que sol\xEDa hacer.")]
    }, {
      question: "P\xE9rdida de inter\xE9s en el sexo",
      answers: [new Tuple(0, "No he notado ning\xFAn cambio reciente en mi inter\xE9s por el sexo."), new Tuple(1, "Estoy menos interesado en el sexo de lo que sol\xEDa estarlo."), new Tuple(2, "Estoy mucho menos interesado en el sexo."), new Tuple(3, "He perdido completamente el inter\xE9s en el sexo.")]
    }];
  }();
  var mkAllDepressionQuestions = /* @__PURE__ */ function() {
    var zipped = zip(depressionQuestions)(range2(0)(20));
    var step4 = function(arr) {
      return function(v) {
        return snoc(arr)(mkDepressionQuestion(v.value0)(v.value1));
      };
    };
    return foldl2(step4)([])(zipped);
  }();
  var renderDepression = /* @__PURE__ */ function() {
    return div2([class_("container")])([form([id3("depression_form"), onSubmit(function(ev) {
      return new HandleSubmit2(ev);
    })])([div_(mkAllDepressionQuestions), input([type_6(InputSubmit.value), title("Siguiente"), value6("Siguiente")])])]);
  }();
  var depressionInstructions = /* @__PURE__ */ function() {
    return "Este cuestionario consta de 21 grupos de afirmaciones, por favor, lea con atenci\xF3n cada uno de ellos cuidadosamente. Luego elija uno de cada grupo, el que mejor describa el modo en que se ha sentido las \xFAltimas 2 semanas, incluyendo el d\xEDa de hoy";
  }();
  var depressionComponent = function(dictMonadAff) {
    return mkComponent({
      initialState: identity9,
      render: function(v) {
        return renderDepression;
      },
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: handleAction3(dictMonadAff)
      })
    });
  };
  var anxietyQuestions = ["1. Torpe o entumecido", "2. Acalorado", "3. Con temblor en las piernas", "4. Incapaz de relajarse", "5. Con temor a que ocurra lo peor", "6. Mareado, o que se le va la cabeza", "7. Con latidos del coraz\xF3n fuerte y acelerados", "8. Inestable", "9. Atemorizado o asustado", "10. Nervioso", "11. Con sensaci\xF3n de bloqueo", "12. Con temblores en las manos", "13. Inquieto, inseguro", "14. Con miedo a perder el control", "15. Con sensaci\xF3n de ahogo", "16. Con temor a morir", "17. Con miedo", "18. Con problemas digestivos", "19. Con desvanecimientos", "20. Con rubor facial", "21. Con sudores, frios o calientes"];
  var mkAllAnxietyQuestions = /* @__PURE__ */ function() {
    var zipped = zip(anxietyQuestions)(range2(0)(29));
    var step4 = function(arr) {
      return function(v) {
        return snoc(arr)(mkAnxietyQuestion(v.value0)(v.value1));
      };
    };
    return foldl2(step4)([])(zipped);
  }();
  var renderAnxiety = /* @__PURE__ */ function() {
    return div2([class_("container")])([form([id3("anxiety_form"), onSubmit(function(ev) {
      return new AnxietyFormDone(ev);
    })])([table_([thead_([tr([])([th_([]), th_([text("En absoluto")]), th_([text("Levemente")]), th_([text("Moderadamente")]), th_([text("Severamente")])])]), tbody_(mkAllAnxietyQuestions)]), input([type_6(InputSubmit.value), title("Siguiente"), value6("Siguiente")])])]);
  }();
  var anxietyInstructions = /* @__PURE__ */ function() {
    return "En este cuestionario hay una lista de s\xEDntomas comunes de la ansiedad. Lea cada uno de los \xEDtems atentamente, e indique cuanto le ha afectado en las \xFAltimas 2 semanas incluyendo hoy.";
  }();
  var anxietyComponent = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var handleAction1 = handleAction3(dictMonadAff);
    return mkComponent({
      initialState: identity9,
      render: function(v) {
        return renderAnxiety;
      },
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: function(action2) {
          if (action2 instanceof AnxietyFormDone) {
            return discard3(liftEffect7(preventDefault(action2.value0)))(function() {
              return bind4(gets3(function(v1) {
                return v1.anxietyAnswers;
              }))(function(anxAns) {
                return raise(new AnxietyCompleted(anxAns));
              });
            });
          }
          ;
          return handleAction1(action2);
        }
      })
    });
  };
  var _depressionSlot = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _depressionInstructions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _anxietySlot = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _anxietyInstructions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var render2 = function(dictMonadAff) {
    var instructionsComponent2 = instructionsComponent(dictMonadAff);
    var anxietyComponent1 = anxietyComponent(dictMonadAff);
    var depressionComponent1 = depressionComponent(dictMonadAff);
    return function(state3) {
      if (state3.stage instanceof AnxietyInstructions) {
        return slot12(_anxietyInstructions)(30)(instructionsComponent2(anxietyInstructions))(state3)(AnxietyInstructionsDone.create);
      }
      ;
      if (state3.stage instanceof AnxietyForm) {
        return slot23(_anxietySlot)(31)(anxietyComponent1)(state3)(HandleAnxietyDone.create);
      }
      ;
      if (state3.stage instanceof DepressionInstructions) {
        return slot32(_depressionInstructions)(32)(instructionsComponent2(depressionInstructions))(state3)(DepressionInstructionsDone.create);
      }
      ;
      if (state3.stage instanceof DepressionForm) {
        return slot4(_depressionSlot)(33)(depressionComponent1)(state3)(HandleDepressionDone.create);
      }
      ;
      throw new Error("Failed pattern match at Beck (line 141, column 16 - line 147, column 94): " + [state3.stage.constructor.name]);
    };
  };
  var mainComponent = function(dictMonadAff) {
    return mkComponent({
      initialState: initialState2,
      render: render2(dictMonadAff),
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: mainHandler(dictMonadAff.MonadEffect0())
      })
    });
  };

  // output/Data.DateTime.Instant/index.js
  var unInstant = function(v) {
    return v;
  };

  // output/Effect.Now/foreign.js
  function now() {
    return Date.now();
  }

  // output/Effect.Random/foreign.js
  var random = Math.random;

  // output/Effect.Random/index.js
  var randomInt = function(low2) {
    return function(high2) {
      return function __do4() {
        var n = random();
        var asNumber = (toNumber(high2) - toNumber(low2) + 1) * n + toNumber(low2);
        return floor2(asNumber);
      };
    };
  };

  // output/Web.UIEvent.MouseEvent/index.js
  var toEvent = unsafeCoerce2;

  // output/Web.HTML.Event.DragEvent/index.js
  var toEvent2 = unsafeCoerce2;

  // output/Wisconsin/index.js
  var discard4 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_5 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind5 = /* @__PURE__ */ bind(bindHalogenM);
  var gets4 = /* @__PURE__ */ gets(monadStateHalogenM);
  var when2 = /* @__PURE__ */ when(applicativeHalogenM);
  var mod2 = /* @__PURE__ */ mod(euclideanRingInt);
  var div3 = /* @__PURE__ */ div(euclideanRingInt);
  var append12 = /* @__PURE__ */ append(semigroupArray);
  var pure12 = /* @__PURE__ */ pure(applicativeHalogenM);
  var log5 = /* @__PURE__ */ log3(monadEffectEffect);
  var show5 = /* @__PURE__ */ show(showInt);
  var gEncodeJsonCons3 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonInt);
  var gEncodeJsonCons1 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonJNumber);
  var encodeJson3 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonArray(encodeJsonInt))(/* @__PURE__ */ gEncodeJsonCons3(/* @__PURE__ */ gEncodeJsonCons3(/* @__PURE__ */ gEncodeJsonCons3(/* @__PURE__ */ gEncodeJsonCons3(/* @__PURE__ */ gEncodeJsonCons3(/* @__PURE__ */ gEncodeJsonCons1(/* @__PURE__ */ gEncodeJsonCons1(/* @__PURE__ */ gEncodeJsonCons1(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "totalTime";
    }
  })())({
    reflectSymbol: function() {
      return "timeToFirst";
    }
  })())({
    reflectSymbol: function() {
      return "timeAfterError";
    }
  })())({
    reflectSymbol: function() {
      return "score";
    }
  })())({
    reflectSymbol: function() {
      return "perseverations";
    }
  })())({
    reflectSymbol: function() {
      return "maintenanceErrors";
    }
  })())({
    reflectSymbol: function() {
      return "errors";
    }
  })())({
    reflectSymbol: function() {
      return "deferredPerseverations";
    }
  })())({
    reflectSymbol: function() {
      return "criterionAttempts";
    }
  })())());
  var identity10 = /* @__PURE__ */ identity(categoryFn);
  var slot5 = /* @__PURE__ */ slot();
  var slot13 = /* @__PURE__ */ slot5({
    reflectSymbol: function() {
      return "wisconsinInstructions";
    }
  })(ordInt);
  var slot24 = /* @__PURE__ */ slot5({
    reflectSymbol: function() {
      return "wisconsinTest";
    }
  })(ordInt);
  var WisconsinInstructions = /* @__PURE__ */ function() {
    function WisconsinInstructions2() {
    }
    ;
    WisconsinInstructions2.value = new WisconsinInstructions2();
    return WisconsinInstructions2;
  }();
  var WisconsinTest = /* @__PURE__ */ function() {
    function WisconsinTest2() {
    }
    ;
    WisconsinTest2.value = new WisconsinTest2();
    return WisconsinTest2;
  }();
  var Shape = /* @__PURE__ */ function() {
    function Shape2() {
    }
    ;
    Shape2.value = new Shape2();
    return Shape2;
  }();
  var Color = /* @__PURE__ */ function() {
    function Color2() {
    }
    ;
    Color2.value = new Color2();
    return Color2;
  }();
  var $$Number = /* @__PURE__ */ function() {
    function $$Number2() {
    }
    ;
    $$Number2.value = new $$Number2();
    return $$Number2;
  }();
  var Square = /* @__PURE__ */ function() {
    function Square2() {
    }
    ;
    Square2.value = new Square2();
    return Square2;
  }();
  var Rhombus = /* @__PURE__ */ function() {
    function Rhombus2() {
    }
    ;
    Rhombus2.value = new Rhombus2();
    return Rhombus2;
  }();
  var Trapeze = /* @__PURE__ */ function() {
    function Trapeze2() {
    }
    ;
    Trapeze2.value = new Trapeze2();
    return Trapeze2;
  }();
  var Octagon = /* @__PURE__ */ function() {
    function Octagon2() {
    }
    ;
    Octagon2.value = new Octagon2();
    return Octagon2;
  }();
  var One = /* @__PURE__ */ function() {
    function One2() {
    }
    ;
    One2.value = new One2();
    return One2;
  }();
  var Two = /* @__PURE__ */ function() {
    function Two2() {
    }
    ;
    Two2.value = new Two2();
    return Two2;
  }();
  var Three = /* @__PURE__ */ function() {
    function Three2() {
    }
    ;
    Three2.value = new Three2();
    return Three2;
  }();
  var Four = /* @__PURE__ */ function() {
    function Four2() {
    }
    ;
    Four2.value = new Four2();
    return Four2;
  }();
  var Other = /* @__PURE__ */ function() {
    function Other2() {
    }
    ;
    Other2.value = new Other2();
    return Other2;
  }();
  var OneErr = /* @__PURE__ */ function() {
    function OneErr2(value0) {
      this.value0 = value0;
    }
    ;
    OneErr2.create = function(value0) {
      return new OneErr2(value0);
    };
    return OneErr2;
  }();
  var TwoErr = /* @__PURE__ */ function() {
    function TwoErr2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    TwoErr2.create = function(value0) {
      return function(value1) {
        return new TwoErr2(value0, value1);
      };
    };
    return TwoErr2;
  }();
  var Correct = /* @__PURE__ */ function() {
    function Correct2() {
    }
    ;
    Correct2.value = new Correct2();
    return Correct2;
  }();
  var Incorrect = /* @__PURE__ */ function() {
    function Incorrect2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    Incorrect2.create = function(value0) {
      return function(value1) {
        return new Incorrect2(value0, value1);
      };
    };
    return Incorrect2;
  }();
  var Blue = /* @__PURE__ */ function() {
    function Blue2() {
    }
    ;
    Blue2.value = new Blue2();
    return Blue2;
  }();
  var Brown = /* @__PURE__ */ function() {
    function Brown2() {
    }
    ;
    Brown2.value = new Brown2();
    return Brown2;
  }();
  var Cyan = /* @__PURE__ */ function() {
    function Cyan2() {
    }
    ;
    Cyan2.value = new Cyan2();
    return Cyan2;
  }();
  var Red = /* @__PURE__ */ function() {
    function Red2() {
    }
    ;
    Red2.value = new Red2();
    return Red2;
  }();
  var WisconsinDone = /* @__PURE__ */ function() {
    function WisconsinDone2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    WisconsinDone2.create = function(value0) {
      return function(value1) {
        return new WisconsinDone2(value0, value1);
      };
    };
    return WisconsinDone2;
  }();
  var WisconsinInstructionsDone = /* @__PURE__ */ function() {
    function WisconsinInstructionsDone2(value0) {
      this.value0 = value0;
    }
    ;
    WisconsinInstructionsDone2.create = function(value0) {
      return new WisconsinInstructionsDone2(value0);
    };
    return WisconsinInstructionsDone2;
  }();
  var HandleWisconsinDone = /* @__PURE__ */ function() {
    function HandleWisconsinDone2(value0) {
      this.value0 = value0;
    }
    ;
    HandleWisconsinDone2.create = function(value0) {
      return new HandleWisconsinDone2(value0);
    };
    return HandleWisconsinDone2;
  }();
  var HandleDrop = /* @__PURE__ */ function() {
    function HandleDrop2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    HandleDrop2.create = function(value0) {
      return function(value1) {
        return new HandleDrop2(value0, value1);
      };
    };
    return HandleDrop2;
  }();
  var PreventDefault = /* @__PURE__ */ function() {
    function PreventDefault3(value0) {
      this.value0 = value0;
    }
    ;
    PreventDefault3.create = function(value0) {
      return new PreventDefault3(value0);
    };
    return PreventDefault3;
  }();
  var unsafeIndex2 = function(arr) {
    return function(index4) {
      var v = index(arr)(index4);
      if (v instanceof Just) {
        return v.value0;
      }
      ;
      return unsafeThrow("unsafeIndex exception");
    };
  };
  var unsafeFromJust = function(v) {
    if (v instanceof Just) {
      return v.value0;
    }
    ;
    return unsafeThrow("unsafeFromJust exception");
  };
  var unsafeArrUpdate = function(index4) {
    return function($$new2) {
      return function(arr) {
        var v = updateAt(index4)($$new2)(arr);
        if (v instanceof Just) {
          return v.value0;
        }
        ;
        return unsafeThrow("unsafeArrUpdate exception");
      };
    };
  };
  var timerShowIncorrect = function(dictMonadAff) {
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    return discard4(modify_5(function(state3) {
      var $191 = {};
      for (var $192 in state3) {
        if ({}.hasOwnProperty.call(state3, $192)) {
          $191[$192] = state3[$192];
        }
        ;
      }
      ;
      $191.showIncorrect = true;
      return $191;
    }))(function() {
      return discard4(liftAff3(delay(500)))(function() {
        return modify_5(function(state3) {
          var $194 = {};
          for (var $195 in state3) {
            if ({}.hasOwnProperty.call(state3, $195)) {
              $194[$195] = state3[$195];
            }
            ;
          }
          ;
          $194.showIncorrect = false;
          return $194;
        });
      });
    });
  };
  var sortingArea = function(areaId) {
    return function(mbCard) {
      return div2([class_("sorting-area"), onDrop(function(ev) {
        return new HandleDrop(ev, areaId);
      }), onDragOver(function(ev) {
        return new PreventDefault(toEvent2(ev));
      })])(function() {
        if (mbCard instanceof Just) {
          return [img([src2(mbCard.value0.image), style("overflow:hidden")])];
        }
        ;
        if (mbCard instanceof Nothing) {
          return [];
        }
        ;
        throw new Error("Failed pattern match at Wisconsin (line 149, column 5 - line 156, column 23): " + [mbCard.constructor.name]);
      }());
    };
  };
  var sortingAreas = function(sortedCards) {
    return div2([id3("card-area")])([div2([id3("card-area")])([sortingArea(0)(unsafeIndex2(sortedCards)(0)), sortingArea(1)(unsafeIndex2(sortedCards)(1)), sortingArea(2)(unsafeIndex2(sortedCards)(2)), sortingArea(3)(unsafeIndex2(sortedCards)(3))])]);
  };
  var renderIncorrect = /* @__PURE__ */ div2([/* @__PURE__ */ id3("message"), /* @__PURE__ */ class_("message-container")])([/* @__PURE__ */ text("Incorrecto")]);
  var nowToNumber = function __do2() {
    var timer = now();
    var v = unInstant(timer);
    return v;
  };
  var isIncorrect = function(v) {
    if (v instanceof Incorrect) {
      return true;
    }
    ;
    return false;
  };
  var instructions2 = /* @__PURE__ */ function() {
    return "En esta tarea lo que tiene que hacer es tomar cada una de las cartas mostradas y colocarlas sobre una de las zonas designadas seg\xFAn como crea que se relacionan o deban clasificarse.\n Los criterios de clasificaci\xF3n ir\xE1n cambiando conforme avance la prueba.\n Si la carta que coloc\xF3 es correcta, no suceder\xE1 nada, pero si es incorrecta, se le notificar\xE1.\n Entonces tome la siguiente carta y trate de colocarla en el lugar adecuado.";
  }();
  var initResults = {
    score: 0,
    errors: 0,
    maintenanceErrors: 0,
    perseverations: 0,
    deferredPerseverations: 0,
    timeToFirst: 0,
    timeAfterError: 0,
    totalTime: 0,
    criterionAttempts: []
  };
  var hiddenCard = function(card) {
    return img([src2(card.image), style("display: none")]);
  };
  var eqCriterion = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Shape && y instanceof Shape) {
          return true;
        }
        ;
        if (x instanceof Color && y instanceof Color) {
          return true;
        }
        ;
        if (x instanceof $$Number && y instanceof $$Number) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq12 = /* @__PURE__ */ eq(eqCriterion);
  var eqCardShape = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Square && y instanceof Square) {
          return true;
        }
        ;
        if (x instanceof Rhombus && y instanceof Rhombus) {
          return true;
        }
        ;
        if (x instanceof Trapeze && y instanceof Trapeze) {
          return true;
        }
        ;
        if (x instanceof Octagon && y instanceof Octagon) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq22 = /* @__PURE__ */ eq(eqCardShape);
  var eqCardNumber = {
    eq: function(x) {
      return function(y) {
        if (x instanceof One && y instanceof One) {
          return true;
        }
        ;
        if (x instanceof Two && y instanceof Two) {
          return true;
        }
        ;
        if (x instanceof Three && y instanceof Three) {
          return true;
        }
        ;
        if (x instanceof Four && y instanceof Four) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq3 = /* @__PURE__ */ eq(eqCardNumber);
  var eqCardError = {
    eq: function(v) {
      return function(v1) {
        if (v instanceof Other && v1 instanceof Other) {
          return true;
        }
        ;
        if (v instanceof Other) {
          return false;
        }
        ;
        if (v instanceof OneErr) {
          if (v1 instanceof Other) {
            return false;
          }
          ;
          if (v1 instanceof OneErr) {
            return eq12(v.value0)(v1.value0);
          }
          ;
          if (v1 instanceof TwoErr) {
            return eq12(v.value0)(v1.value0) || eq12(v.value0)(v1.value1);
          }
          ;
          throw new Error("Failed pattern match at Wisconsin (line 376, column 5 - line 379, column 48): " + [v1.constructor.name]);
        }
        ;
        if (v instanceof TwoErr) {
          if (v1 instanceof Other) {
            return false;
          }
          ;
          if (v1 instanceof OneErr) {
            return eq12(v.value0)(v1.value0) || eq12(v.value1)(v1.value0);
          }
          ;
          if (v1 instanceof TwoErr) {
            return eq12(v.value0)(v1.value0) || (eq12(v.value0)(v1.value1) || (eq12(v.value1)(v1.value0) || eq12(v.value1)(v1.value1)));
          }
          ;
          throw new Error("Failed pattern match at Wisconsin (line 381, column 5 - line 384, column 72): " + [v1.constructor.name]);
        }
        ;
        throw new Error("Failed pattern match at Wisconsin (line 372, column 1 - line 384, column 72): " + [v.constructor.name, v1.constructor.name]);
      };
    }
  };
  var eq4 = /* @__PURE__ */ eq(eqCardError);
  var eqGrade = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Correct && y instanceof Correct) {
          return true;
        }
        ;
        if (x instanceof Incorrect && y instanceof Incorrect) {
          return eq12(x.value0)(y.value0) && eq4(x.value1)(y.value1);
        }
        ;
        return false;
      };
    }
  };
  var eq5 = /* @__PURE__ */ eq(eqGrade);
  var eqCardColor = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Blue && y instanceof Blue) {
          return true;
        }
        ;
        if (x instanceof Brown && y instanceof Brown) {
          return true;
        }
        ;
        if (x instanceof Cyan && y instanceof Cyan) {
          return true;
        }
        ;
        if (x instanceof Red && y instanceof Red) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq6 = /* @__PURE__ */ eq(eqCardColor);
  var deckArea = function(card) {
    return div2([class_("deck-area"), draggable(true)])([img([src2(card.image), style("overflow: hidden"), id3("deck-card")])]);
  };
  var criterionCards = /* @__PURE__ */ function() {
    return [{
      image: "public/wisconsin/init1.png",
      shape: Square.value,
      color: Cyan.value,
      number: One.value
    }, {
      image: "public/wisconsin/init2.png",
      shape: Octagon.value,
      color: Red.value,
      number: Two.value
    }, {
      image: "public/wisconsin/init3.png",
      shape: Rhombus.value,
      color: Brown.value,
      number: Three.value
    }, {
      image: "public/wisconsin/init4.png",
      shape: Trapeze.value,
      color: Blue.value,
      number: Four.value
    }];
  }();
  var criterionCard = function(card) {
    return div2([class_("sorting-area")])([img([src2(card.image), style("overflow: hidden")])]);
  };
  var criteriaCards = /* @__PURE__ */ div2([/* @__PURE__ */ id3("criteria-cards")])([/* @__PURE__ */ criterionCard(/* @__PURE__ */ unsafeIndex2(criterionCards)(0)), /* @__PURE__ */ criterionCard(/* @__PURE__ */ unsafeIndex2(criterionCards)(1)), /* @__PURE__ */ criterionCard(/* @__PURE__ */ unsafeIndex2(criterionCards)(2)), /* @__PURE__ */ criterionCard(/* @__PURE__ */ unsafeIndex2(criterionCards)(3))]);
  var criteria = /* @__PURE__ */ function() {
    return [Color.value, Shape.value, $$Number.value, Shape.value, $$Number.value, Color.value];
  }();
  var maybeNextCriterion = function(dictMonadAff) {
    return bind5(gets4(function(v) {
      return v.score;
    }))(function(score) {
      return when2(mod2(score)(10) === 0)(modify_5(function(state3) {
        var $231 = {};
        for (var $232 in state3) {
          if ({}.hasOwnProperty.call(state3, $232)) {
            $231[$232] = state3[$232];
          }
          ;
        }
        ;
        $231.currentCriterion = unsafeIndex2(criteria)(div3(score)(10));
        $231.foundCriterion = false;
        return $231;
      }));
    });
  };
  var compareForError = function(c1) {
    return function(c2) {
      var matches2 = append12(function() {
        var $234 = eq22(c1.shape)(c2.shape);
        if ($234) {
          return [Shape.value];
        }
        ;
        return [];
      }())(append12(function() {
        var $235 = eq6(c1.color)(c2.color);
        if ($235) {
          return [Color.value];
        }
        ;
        return [];
      }())(function() {
        var $236 = eq3(c1.number)(c2.number);
        if ($236) {
          return [$$Number.value];
        }
        ;
        return [];
      }()));
      var v = length(matches2);
      if (v === 0) {
        return Other.value;
      }
      ;
      if (v === 1) {
        return new OneErr(unsafeFromJust(index(matches2)(0)));
      }
      ;
      if (v === 2) {
        return new TwoErr(unsafeFromJust(index(matches2)(0)), unsafeFromJust(index(matches2)(1)));
      }
      ;
      return unsafeThrow("Unreachable");
    };
  };
  var evalAnswer = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    return function(areaId) {
      var critCard = unsafeIndex2(criterionCards)(areaId);
      return bind5(gets4(function(v) {
        return v.currentCriterion;
      }))(function(currentCriterion) {
        return bind5(gets4(function(v) {
          return v.currentCard;
        }))(function(currentCard) {
          return bind5(gets4(function(v) {
            return v.lastTimer;
          }))(function(timerOld) {
            return bind5(liftEffect7(nowToNumber))(function(timerNew) {
              return bind5(gets4(function(v) {
                return v.currentAttempts;
              }))(function(currentAttempts) {
                return bind5(gets4(function(v) {
                  return v.criterionAttempts;
                }))(function(criterionAttempts) {
                  return bind5(gets4(function(v) {
                    return v.foundCriterion;
                  }))(function(foundCriterion) {
                    var time4 = timerNew - timerOld;
                    var updateState = function(grade) {
                      return modify_5(function(state3) {
                        var $238 = {};
                        for (var $239 in state3) {
                          if ({}.hasOwnProperty.call(state3, $239)) {
                            $238[$239] = state3[$239];
                          }
                          ;
                        }
                        ;
                        $238.answers = snoc(state3.answers)({
                          grade,
                          timeTaken: time4
                        });
                        $238.currentAttempts = state3.currentAttempts + 1 | 0;
                        return $238;
                      });
                    };
                    if (currentCriterion instanceof Shape) {
                      var $242 = eq22(currentCard.shape)(critCard.shape);
                      if ($242) {
                        return discard4(updateState(Correct.value))(function() {
                          return discard4(modify_5(function(state3) {
                            var $244 = {};
                            for (var $245 in state3) {
                              if ({}.hasOwnProperty.call(state3, $245)) {
                                $244[$245] = state3[$245];
                              }
                              ;
                            }
                            ;
                            $244.score = state3.score + 1 | 0;
                            $244.currentAttempts = 0;
                            $244.criterionAttempts = function() {
                              if (foundCriterion) {
                                return state3.criterionAttempts;
                              }
                              ;
                              return snoc(criterionAttempts)(currentAttempts + 1 | 0);
                            }();
                            $244.foundCriterion = true;
                            return $244;
                          }))(function() {
                            return pure12(true);
                          });
                        });
                      }
                      ;
                      return discard4(updateState(new Incorrect(currentCriterion, compareForError(critCard)(currentCard))))(function() {
                        return discard4(modify_5(function(state3) {
                          var $247 = {};
                          for (var $248 in state3) {
                            if ({}.hasOwnProperty.call(state3, $248)) {
                              $247[$248] = state3[$248];
                            }
                            ;
                          }
                          ;
                          $247.currentAttempts = currentAttempts + 1 | 0;
                          return $247;
                        }))(function() {
                          return pure12(false);
                        });
                      });
                    }
                    ;
                    if (currentCriterion instanceof Color) {
                      var $250 = eq6(currentCard.color)(critCard.color);
                      if ($250) {
                        return discard4(updateState(Correct.value))(function() {
                          return discard4(modify_5(function(state3) {
                            var $252 = {};
                            for (var $253 in state3) {
                              if ({}.hasOwnProperty.call(state3, $253)) {
                                $252[$253] = state3[$253];
                              }
                              ;
                            }
                            ;
                            $252.score = state3.score + 1 | 0;
                            $252.currentAttempts = 0;
                            $252.criterionAttempts = function() {
                              if (foundCriterion) {
                                return state3.criterionAttempts;
                              }
                              ;
                              return snoc(criterionAttempts)(currentAttempts + 1 | 0);
                            }();
                            $252.foundCriterion = true;
                            return $252;
                          }))(function() {
                            return pure12(true);
                          });
                        });
                      }
                      ;
                      return discard4(updateState(new Incorrect(currentCriterion, compareForError(critCard)(currentCard))))(function() {
                        return discard4(modify_5(function(state3) {
                          var $255 = {};
                          for (var $256 in state3) {
                            if ({}.hasOwnProperty.call(state3, $256)) {
                              $255[$256] = state3[$256];
                            }
                            ;
                          }
                          ;
                          $255.currentAttempts = currentAttempts + 1 | 0;
                          return $255;
                        }))(function() {
                          return pure12(false);
                        });
                      });
                    }
                    ;
                    if (currentCriterion instanceof $$Number) {
                      var $258 = eq3(currentCard.number)(critCard.number);
                      if ($258) {
                        return discard4(updateState(Correct.value))(function() {
                          return discard4(modify_5(function(state3) {
                            var $260 = {};
                            for (var $261 in state3) {
                              if ({}.hasOwnProperty.call(state3, $261)) {
                                $260[$261] = state3[$261];
                              }
                              ;
                            }
                            ;
                            $260.score = state3.score + 1 | 0;
                            $260.currentAttempts = 0;
                            $260.criterionAttempts = function() {
                              if (foundCriterion) {
                                return state3.criterionAttempts;
                              }
                              ;
                              return snoc(criterionAttempts)(currentAttempts + 1 | 0);
                            }();
                            $260.foundCriterion = true;
                            return $260;
                          }))(function() {
                            return pure12(true);
                          });
                        });
                      }
                      ;
                      return discard4(updateState(new Incorrect(currentCriterion, compareForError(critCard)(currentCard))))(function() {
                        return discard4(modify_5(function(state3) {
                          var $263 = {};
                          for (var $264 in state3) {
                            if ({}.hasOwnProperty.call(state3, $264)) {
                              $263[$264] = state3[$264];
                            }
                            ;
                          }
                          ;
                          $263.currentAttempts = currentAttempts + 1 | 0;
                          return $263;
                        }))(function() {
                          return pure12(false);
                        });
                      });
                    }
                    ;
                    throw new Error("Failed pattern match at Wisconsin (line 221, column 3 - line 272, column 25): " + [currentCriterion.constructor.name]);
                  });
                });
              });
            });
          });
        });
      });
    };
  };
  var checkForPerseveration = function(last4) {
    return function(grade) {
      var v = last(last4);
      if (v instanceof Nothing) {
        return false;
      }
      ;
      if (v instanceof Just) {
        if (v.value0.grade instanceof Correct) {
          return false;
        }
        ;
        if (v.value0.grade instanceof Incorrect) {
          return eq5(v.value0.grade)(grade);
        }
        ;
        throw new Error("Failed pattern match at Wisconsin (line 419, column 17 - line 421, column 42): " + [v.value0.grade.constructor.name]);
      }
      ;
      throw new Error("Failed pattern match at Wisconsin (line 417, column 3 - line 421, column 42): " + [v.constructor.name]);
    };
  };
  var checkForMaintenanceError = function(last4) {
    var v = index(last4)(0);
    if (v instanceof Just && eq5(v.value0.grade)(Correct.value)) {
      var v1 = index(last4)(1);
      if (v1 instanceof Just && eq5(v1.value0.grade)(Correct.value)) {
        var v2 = index(last4)(2);
        if (v2 instanceof Just && eq5(v2.value0.grade)(Correct.value)) {
          return true;
        }
        ;
        return false;
      }
      ;
      return false;
    }
    ;
    return false;
  };
  var checkForDeferred = function(last4) {
    return function(grade) {
      var v = index(last4)(0);
      if (v instanceof Just && eq5(v.value0.grade)(grade)) {
        return true;
      }
      ;
      var v1 = index(last4)(1);
      if (v1 instanceof Just && eq5(v1.value0.grade)(grade)) {
        return true;
      }
      ;
      var v2 = index(last4)(2);
      if (v2 instanceof Just && eq5(v2.value0.grade)(grade)) {
        return true;
      }
      ;
      return false;
    };
  };
  var evalStep = function(result) {
    return function(last4) {
      return function(answer) {
        var result$prime = {
          criterionAttempts: result.criterionAttempts,
          deferredPerseverations: result.deferredPerseverations,
          errors: result.errors,
          maintenanceErrors: result.maintenanceErrors,
          perseverations: result.perseverations,
          score: result.score,
          timeAfterError: result.timeAfterError,
          timeToFirst: result.timeToFirst,
          totalTime: result.totalTime + answer.timeTaken
        };
        var result$prime$prime = function() {
          var v = head(take(1)(last4));
          if (v instanceof Just && isIncorrect(v.value0.grade)) {
            return {
              criterionAttempts: result$prime.criterionAttempts,
              deferredPerseverations: result$prime.deferredPerseverations,
              errors: result$prime.errors,
              maintenanceErrors: result$prime.maintenanceErrors,
              perseverations: result$prime.perseverations,
              score: result$prime.score,
              timeToFirst: result$prime.timeToFirst,
              totalTime: result$prime.totalTime,
              timeAfterError: result$prime.timeAfterError + answer.timeTaken
            };
          }
          ;
          return result$prime;
        }();
        if (answer.grade instanceof Correct) {
          return {
            errors: result$prime$prime.errors,
            maintenanceErrors: result$prime$prime.maintenanceErrors,
            perseverations: result$prime$prime.perseverations,
            deferredPerseverations: result$prime$prime.deferredPerseverations,
            timeToFirst: result$prime$prime.timeToFirst,
            timeAfterError: result$prime$prime.timeAfterError,
            totalTime: result$prime$prime.totalTime,
            criterionAttempts: result$prime$prime.criterionAttempts,
            score: result$prime$prime.score + 1 | 0
          };
        }
        ;
        if (answer.grade instanceof Incorrect) {
          var $286 = checkForPerseveration(last4)(answer.grade);
          if ($286) {
            return {
              score: result$prime$prime.score,
              errors: result$prime$prime.errors,
              maintenanceErrors: result$prime$prime.maintenanceErrors,
              deferredPerseverations: result$prime$prime.deferredPerseverations,
              timeToFirst: result$prime$prime.timeToFirst,
              timeAfterError: result$prime$prime.timeAfterError,
              totalTime: result$prime$prime.totalTime,
              criterionAttempts: result$prime$prime.criterionAttempts,
              perseverations: result$prime$prime.perseverations + 1 | 0
            };
          }
          ;
          var $287 = checkForDeferred(last4)(answer.grade);
          if ($287) {
            return {
              score: result$prime$prime.score,
              errors: result$prime$prime.errors,
              maintenanceErrors: result$prime$prime.maintenanceErrors,
              perseverations: result$prime$prime.perseverations,
              timeToFirst: result$prime$prime.timeToFirst,
              timeAfterError: result$prime$prime.timeAfterError,
              totalTime: result$prime$prime.totalTime,
              criterionAttempts: result$prime$prime.criterionAttempts,
              deferredPerseverations: result$prime$prime.deferredPerseverations + 1 | 0
            };
          }
          ;
          var $288 = checkForMaintenanceError(last4);
          if ($288) {
            return {
              score: result$prime$prime.score,
              errors: result$prime$prime.errors,
              perseverations: result$prime$prime.perseverations,
              deferredPerseverations: result$prime$prime.deferredPerseverations,
              timeToFirst: result$prime$prime.timeToFirst,
              timeAfterError: result$prime$prime.timeAfterError,
              totalTime: result$prime$prime.totalTime,
              criterionAttempts: result$prime$prime.criterionAttempts,
              maintenanceErrors: result$prime$prime.maintenanceErrors + 1 | 0
            };
          }
          ;
          return {
            score: result$prime$prime.score,
            maintenanceErrors: result$prime$prime.maintenanceErrors,
            perseverations: result$prime$prime.perseverations,
            deferredPerseverations: result$prime$prime.deferredPerseverations,
            timeToFirst: result$prime$prime.timeToFirst,
            timeAfterError: result$prime$prime.timeAfterError,
            totalTime: result$prime$prime.totalTime,
            criterionAttempts: result$prime$prime.criterionAttempts,
            errors: result$prime$prime.errors + 1 | 0
          };
        }
        ;
        throw new Error("Failed pattern match at Wisconsin (line 444, column 5 - line 454, column 52): " + [answer.grade.constructor.name]);
      };
    };
  };
  var $$eval = function(answers) {
    return function(attempts) {
      var v = head(answers);
      if (v instanceof Nothing) {
        return initResults;
      }
      ;
      if (v instanceof Just) {
        var initialResult = {
          deferredPerseverations: initResults.deferredPerseverations,
          errors: initResults.errors,
          maintenanceErrors: initResults.maintenanceErrors,
          perseverations: initResults.perseverations,
          score: initResults.score,
          timeAfterError: initResults.timeAfterError,
          totalTime: initResults.totalTime,
          timeToFirst: v.value0.timeTaken,
          criterionAttempts: attempts
        };
        var go2 = function($copy_acc) {
          return function($copy_last4) {
            return function($copy_remainingAnswers) {
              var $tco_var_acc = $copy_acc;
              var $tco_var_last4 = $copy_last4;
              var $tco_done = false;
              var $tco_result;
              function $tco_loop(acc, last4, remainingAnswers) {
                var v1 = head(remainingAnswers);
                if (v1 instanceof Nothing) {
                  $tco_done = true;
                  return acc;
                }
                ;
                if (v1 instanceof Just) {
                  var newLast4 = take(4)(snoc(last4)(v1.value0));
                  var newAcc = evalStep(acc)(last4)(v1.value0);
                  $tco_var_acc = newAcc;
                  $tco_var_last4 = newLast4;
                  $copy_remainingAnswers = drop(1)(remainingAnswers);
                  return;
                }
                ;
                throw new Error("Failed pattern match at Wisconsin (line 465, column 11 - line 472, column 61): " + [v1.constructor.name]);
              }
              ;
              while (!$tco_done) {
                $tco_result = $tco_loop($tco_var_acc, $tco_var_last4, $copy_remainingAnswers);
              }
              ;
              return $tco_result;
            };
          };
        };
        return go2(initialResult)([])(answers);
      }
      ;
      throw new Error("Failed pattern match at Wisconsin (line 458, column 3 - line 474, column 36): " + [v.constructor.name]);
    };
  };
  var cards = /* @__PURE__ */ function() {
    return [{
      image: "public/wisconsin/card1.png",
      shape: Square.value,
      color: Blue.value,
      number: One.value
    }, {
      image: "public/wisconsin/card2.png",
      shape: Rhombus.value,
      color: Brown.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card3.png",
      shape: Trapeze.value,
      color: Cyan.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card4.png",
      shape: Octagon.value,
      color: Red.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card5.png",
      shape: Rhombus.value,
      color: Blue.value,
      number: One.value
    }, {
      image: "public/wisconsin/card6.png",
      shape: Square.value,
      color: Brown.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card7.png",
      shape: Octagon.value,
      color: Cyan.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card8.png",
      shape: Rhombus.value,
      color: Red.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card9.png",
      shape: Octagon.value,
      color: Blue.value,
      number: One.value
    }, {
      image: "public/wisconsin/card10.png",
      shape: Trapeze.value,
      color: Brown.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card11.png",
      shape: Rhombus.value,
      color: Cyan.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card12.png",
      shape: Square.value,
      color: Red.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card13.png",
      shape: Trapeze.value,
      color: Blue.value,
      number: One.value
    }, {
      image: "public/wisconsin/card14.png",
      shape: Octagon.value,
      color: Brown.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card15.png",
      shape: Square.value,
      color: Cyan.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card16.png",
      shape: Trapeze.value,
      color: Red.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card17.png",
      shape: Octagon.value,
      color: Cyan.value,
      number: One.value
    }, {
      image: "public/wisconsin/card18.png",
      shape: Trapeze.value,
      color: Red.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card19.png",
      shape: Square.value,
      color: Blue.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card20.png",
      shape: Rhombus.value,
      color: Brown.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card21.png",
      shape: Rhombus.value,
      color: Cyan.value,
      number: One.value
    }, {
      image: "public/wisconsin/card22.png",
      shape: Octagon.value,
      color: Red.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card23.png",
      shape: Trapeze.value,
      color: Blue.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card24.png",
      shape: Square.value,
      color: Brown.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card25.png",
      shape: Trapeze.value,
      color: Cyan.value,
      number: One.value
    }, {
      image: "public/wisconsin/card26.png",
      shape: Square.value,
      color: Red.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card27.png",
      shape: Rhombus.value,
      color: Blue.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card28.png",
      shape: Octagon.value,
      color: Brown.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card29.png",
      shape: Square.value,
      color: Cyan.value,
      number: One.value
    }, {
      image: "public/wisconsin/card30.png",
      shape: Rhombus.value,
      color: Red.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card31.png",
      shape: Octagon.value,
      color: Blue.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card32.png",
      shape: Trapeze.value,
      color: Brown.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card33.png",
      shape: Octagon.value,
      color: Brown.value,
      number: One.value
    }, {
      image: "public/wisconsin/card34.png",
      shape: Rhombus.value,
      color: Blue.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card35.png",
      shape: Octagon.value,
      color: Red.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card36.png",
      shape: Square.value,
      color: Cyan.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card37.png",
      shape: Rhombus.value,
      color: Brown.value,
      number: One.value
    }, {
      image: "public/wisconsin/card38.png",
      shape: Octagon.value,
      color: Blue.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card39.png",
      shape: Square.value,
      color: Red.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card40.png",
      shape: Trapeze.value,
      color: Cyan.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card41.png",
      shape: Square.value,
      color: Brown.value,
      number: One.value
    }, {
      image: "public/wisconsin/card42.png",
      shape: Trapeze.value,
      color: Blue.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card43.png",
      shape: Rhombus.value,
      color: Red.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card44.png",
      shape: Octagon.value,
      color: Cyan.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card45.png",
      shape: Trapeze.value,
      color: Brown.value,
      number: One.value
    }, {
      image: "public/wisconsin/card46.png",
      shape: Square.value,
      color: Blue.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card47.png",
      shape: Octagon.value,
      color: Red.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card48.png",
      shape: Rhombus.value,
      color: Cyan.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card49.png",
      shape: Octagon.value,
      color: Red.value,
      number: One.value
    }, {
      image: "public/wisconsin/card50.png",
      shape: Trapeze.value,
      color: Cyan.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card51.png",
      shape: Rhombus.value,
      color: Brown.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card52.png",
      shape: Square.value,
      color: Blue.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card53.png",
      shape: Trapeze.value,
      color: Red.value,
      number: One.value
    }, {
      image: "public/wisconsin/card54.png",
      shape: Octagon.value,
      color: Cyan.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card55.png",
      shape: Square.value,
      color: Brown.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card56.png",
      shape: Rhombus.value,
      color: Blue.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card57.png",
      shape: Rhombus.value,
      color: Red.value,
      number: One.value
    }, {
      image: "public/wisconsin/card58.png",
      shape: Square.value,
      color: Cyan.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card59.png",
      shape: Octagon.value,
      color: Brown.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card60.png",
      shape: Trapeze.value,
      color: Blue.value,
      number: Four.value
    }, {
      image: "public/wisconsin/card61.png",
      shape: Square.value,
      color: Red.value,
      number: One.value
    }, {
      image: "public/wisconsin/card62.png",
      shape: Rhombus.value,
      color: Cyan.value,
      number: Two.value
    }, {
      image: "public/wisconsin/card63.png",
      shape: Trapeze.value,
      color: Brown.value,
      number: Three.value
    }, {
      image: "public/wisconsin/card64.png",
      shape: Octagon.value,
      color: Blue.value,
      number: Four.value
    }];
  }();
  var hiddenCards = /* @__PURE__ */ div2([])(/* @__PURE__ */ map(functorArray)(hiddenCard)(cards));
  var renderWisconsin = function(state3) {
    return div2([class_("wisconsin-container")])([function() {
      if (state3.showIncorrect) {
        return renderIncorrect;
      }
      ;
      return div_([]);
    }(), criteriaCards, hiddenCards, br_, sortingAreas(state3.sortedCards), deckArea(state3.currentCard)]);
  };
  var initialState3 = function(v) {
    return {
      currentCard: unsafeIndex2(cards)(0),
      score: 0,
      answers: [],
      currentCriterion: unsafeIndex2(criteria)(0),
      currentIndex: 0,
      stage: WisconsinInstructions.value,
      lastTimer: 0,
      showIncorrect: false,
      sortedCards: replicate(4)(Nothing.value),
      currentAttempts: 0,
      criterionAttempts: [],
      foundCriterion: false
    };
  };
  var setNextCard = function(dictMonadEffect) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadEffect));
    var nextCard = function(newIndex) {
      return unsafeIndex2(cards)(newIndex);
    };
    return bind5(gets4(function(v) {
      return v.currentIndex;
    }))(function(currentIndex) {
      return discard4(liftEffect7(log5(show5(currentIndex))))(function() {
        var newIndex = currentIndex + 1 | 0;
        var $296 = newIndex >= 64;
        if ($296) {
          return bind5(gets4(function(v) {
            return v.answers;
          }))(function(answers) {
            return bind5(gets4(function(v) {
              return v.criterionAttempts;
            }))(function(attempts) {
              return raise(new WisconsinDone(answers, attempts));
            });
          });
        }
        ;
        return modify_5(function(state3) {
          var $297 = {};
          for (var $298 in state3) {
            if ({}.hasOwnProperty.call(state3, $298)) {
              $297[$298] = state3[$298];
            }
            ;
          }
          ;
          $297.currentIndex = newIndex;
          $297.currentCard = nextCard(newIndex);
          return $297;
        });
      });
    });
  };
  var handleDrop = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var liftEffect7 = liftEffect(monadEffectHalogenM(MonadEffect0));
    var evalAnswer1 = evalAnswer(dictMonadAff);
    var timerShowIncorrect1 = timerShowIncorrect(dictMonadAff);
    var setNextCard1 = setNextCard(MonadEffect0);
    var maybeNextCriterion1 = maybeNextCriterion(dictMonadAff);
    return function(ev) {
      return function(areaId) {
        return discard4(liftEffect7(preventDefault(toEvent2(ev))))(function() {
          return bind5(gets4(function(v) {
            return v.sortedCards;
          }))(function(sortedCards) {
            return bind5(gets4(function(v) {
              return v.currentCard;
            }))(function(currentCard) {
              var newSorted = unsafeArrUpdate(areaId)(new Just(currentCard))(sortedCards);
              return discard4(modify_5(function(state3) {
                var $300 = {};
                for (var $301 in state3) {
                  if ({}.hasOwnProperty.call(state3, $301)) {
                    $300[$301] = state3[$301];
                  }
                  ;
                }
                ;
                $300.sortedCards = newSorted;
                return $300;
              }))(function() {
                return bind5(evalAnswer1(areaId))(function(isCorrect) {
                  return discard4(when2(!isCorrect)(timerShowIncorrect1))(function() {
                    return discard4(setNextCard1)(function() {
                      return discard4(maybeNextCriterion1)(function() {
                        return bind5(liftEffect7(nowToNumber))(function(timer) {
                          return modify_5(function(state3) {
                            var $303 = {};
                            for (var $304 in state3) {
                              if ({}.hasOwnProperty.call(state3, $304)) {
                                $303[$304] = state3[$304];
                              }
                              ;
                            }
                            ;
                            $303.lastTimer = timer;
                            return $303;
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      };
    };
  };
  var wisconsinHandler = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var handleDrop1 = handleDrop(dictMonadAff);
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    return function(action2) {
      if (action2 instanceof WisconsinInstructionsDone) {
        return bind5(liftEffect7(nowToNumber))(function(ms) {
          return modify_5(function(state3) {
            var $307 = {};
            for (var $308 in state3) {
              if ({}.hasOwnProperty.call(state3, $308)) {
                $307[$308] = state3[$308];
              }
              ;
            }
            ;
            $307.stage = WisconsinTest.value;
            $307.lastTimer = ms;
            return $307;
          });
        });
      }
      ;
      if (action2 instanceof PreventDefault) {
        return liftEffect7(preventDefault(action2.value0));
      }
      ;
      if (action2 instanceof HandleDrop) {
        return handleDrop1(action2.value0)(action2.value1);
      }
      ;
      if (action2 instanceof HandleWisconsinDone) {
        var results = $$eval(action2.value0.value0)(action2.value0.value1);
        return bind5(liftAff3(post2(ignore)("/wisconsin")(new Just(new Json(encodeJson3(results))))))(function() {
          return raise(new WisconsinDone([], []));
        });
      }
      ;
      return pure12(unit);
    };
  };
  var wisconsinComponent = function(dictMonadAff) {
    return mkComponent({
      initialState: identity10,
      render: renderWisconsin,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: wisconsinHandler(dictMonadAff)
      })
    });
  };
  var _wisconsinTest = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _wisconsinInstructions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var render3 = function(dictMonadAff) {
    var instructionsComponent2 = instructionsComponent(dictMonadAff);
    var wisconsinComponent1 = wisconsinComponent(dictMonadAff);
    return function(state3) {
      if (state3.stage instanceof WisconsinInstructions) {
        return slot13(_wisconsinInstructions)(40)(instructionsComponent2(instructions2))(unit)(WisconsinInstructionsDone.create);
      }
      ;
      if (state3.stage instanceof WisconsinTest) {
        return slot24(_wisconsinTest)(41)(wisconsinComponent1)(state3)(HandleWisconsinDone.create);
      }
      ;
      throw new Error("Failed pattern match at Wisconsin (line 115, column 16 - line 119, column 75): " + [state3.stage.constructor.name]);
    };
  };
  var mainComponent2 = function(dictMonadAff) {
    return mkComponent({
      initialState: initialState3,
      render: render3(dictMonadAff),
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: wisconsinHandler(dictMonadAff)
      })
    });
  };

  // output/GoNoGo/index.js
  var bind6 = /* @__PURE__ */ bind(bindHalogenM);
  var modify_6 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var map17 = /* @__PURE__ */ map(functorEffect);
  var gets5 = /* @__PURE__ */ gets(monadStateHalogenM);
  var discard5 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var map18 = /* @__PURE__ */ map(functorArray);
  var pure13 = /* @__PURE__ */ pure(applicativeHalogenM);
  var get4 = /* @__PURE__ */ get(monadStateHalogenM);
  var gEncodeJsonCons4 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonInt);
  var encodeJson4 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons4(/* @__PURE__ */ gEncodeJsonCons4(/* @__PURE__ */ gEncodeJsonCons(encodeJsonJNumber)(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "responseTime";
    }
  })())({
    reflectSymbol: function() {
      return "omissionErrors";
    }
  })())({
    reflectSymbol: function() {
      return "comissionErrors";
    }
  })())());
  var Go = /* @__PURE__ */ function() {
    function Go2() {
    }
    ;
    Go2.value = new Go2();
    return Go2;
  }();
  var NoGo = /* @__PURE__ */ function() {
    function NoGo2() {
    }
    ;
    NoGo2.value = new NoGo2();
    return NoGo2;
  }();
  var GoNoGoComplete = /* @__PURE__ */ function() {
    function GoNoGoComplete2() {
    }
    ;
    GoNoGoComplete2.value = new GoNoGoComplete2();
    return GoNoGoComplete2;
  }();
  var GoNoGoInstructions = /* @__PURE__ */ function() {
    function GoNoGoInstructions2() {
    }
    ;
    GoNoGoInstructions2.value = new GoNoGoInstructions2();
    return GoNoGoInstructions2;
  }();
  var PrepareMessage = /* @__PURE__ */ function() {
    function PrepareMessage2() {
    }
    ;
    PrepareMessage2.value = new PrepareMessage2();
    return PrepareMessage2;
  }();
  var PracticeSession = /* @__PURE__ */ function() {
    function PracticeSession2() {
    }
    ;
    PracticeSession2.value = new PracticeSession2();
    return PracticeSession2;
  }();
  var TestMessage = /* @__PURE__ */ function() {
    function TestMessage2() {
    }
    ;
    TestMessage2.value = new TestMessage2();
    return TestMessage2;
  }();
  var GoNoGoTest = /* @__PURE__ */ function() {
    function GoNoGoTest2() {
    }
    ;
    GoNoGoTest2.value = new GoNoGoTest2();
    return GoNoGoTest2;
  }();
  var Complete = /* @__PURE__ */ function() {
    function Complete3() {
    }
    ;
    Complete3.value = new Complete3();
    return Complete3;
  }();
  var GoNoGoInstructionsDone = /* @__PURE__ */ function() {
    function GoNoGoInstructionsDone2() {
    }
    ;
    GoNoGoInstructionsDone2.value = new GoNoGoInstructionsDone2();
    return GoNoGoInstructionsDone2;
  }();
  var StartPractice = /* @__PURE__ */ function() {
    function StartPractice2() {
    }
    ;
    StartPractice2.value = new StartPractice2();
    return StartPractice2;
  }();
  var StartTest = /* @__PURE__ */ function() {
    function StartTest3() {
    }
    ;
    StartTest3.value = new StartTest3();
    return StartTest3;
  }();
  var HandleResponse = /* @__PURE__ */ function() {
    function HandleResponse2(value0) {
      this.value0 = value0;
    }
    ;
    HandleResponse2.create = function(value0) {
      return new HandleResponse2(value0);
    };
    return HandleResponse2;
  }();
  var PreventDefault2 = /* @__PURE__ */ function() {
    function PreventDefault3(value0) {
      this.value0 = value0;
    }
    ;
    PreventDefault3.create = function(value0) {
      return new PreventDefault3(value0);
    };
    return PreventDefault3;
  }();
  var GoNoGoCompleteRaiser = /* @__PURE__ */ function() {
    function GoNoGoCompleteRaiser2() {
    }
    ;
    GoNoGoCompleteRaiser2.value = new GoNoGoCompleteRaiser2();
    return GoNoGoCompleteRaiser2;
  }();
  var sum2 = /* @__PURE__ */ foldl2(/* @__PURE__ */ add(semiringNumber))(0);
  var stimuli = /* @__PURE__ */ function() {
    return [Go.value, Go.value, NoGo.value, NoGo.value, Go.value, Go.value, Go.value, NoGo.value, Go.value, NoGo.value, NoGo.value, Go.value, NoGo.value, NoGo.value, Go.value, Go.value, Go.value, Go.value, Go.value, NoGo.value, Go.value, NoGo.value, Go.value, Go.value, Go.value, Go.value, Go.value, NoGo.value, Go.value, Go.value, Go.value, NoGo.value, NoGo.value, NoGo.value, Go.value, Go.value, Go.value, Go.value, NoGo.value, Go.value, Go.value, NoGo.value, Go.value, Go.value, NoGo.value, NoGo.value, Go.value, NoGo.value, NoGo.value, NoGo.value, Go.value, Go.value, Go.value, Go.value, Go.value, Go.value, Go.value, Go.value, Go.value, NoGo.value, Go.value, Go.value, Go.value, NoGo.value, Go.value, NoGo.value, NoGo.value, Go.value, NoGo.value, NoGo.value, Go.value, Go.value, Go.value, NoGo.value, Go.value];
  }();
  var replicateM_ = function(dictMonad) {
    var pure23 = pure(dictMonad.Applicative0());
    var applySecond2 = applySecond(dictMonad.Bind1().Apply0());
    return function(v) {
      return function(v1) {
        if (v <= 0) {
          return pure23(unit);
        }
        ;
        return applySecond2(v1)(replicateM_(dictMonad)(v - 1 | 0)(v1));
      };
    };
  };
  var replicateM_1 = /* @__PURE__ */ replicateM_(monadHalogenM);
  var renderTestMessage = /* @__PURE__ */ div2([/* @__PURE__ */ class_("instructions-container")])([/* @__PURE__ */ h2_([/* @__PURE__ */ text("Ahora vamos con la prueba")])]);
  var renderResult = function(message2) {
    return div2([id3("gonogo-message"), class_("gonogo-message")])([text(message2)]);
  };
  var renderPrepareMessage = /* @__PURE__ */ div2([/* @__PURE__ */ class_("instructions-container")])([/* @__PURE__ */ h2_([/* @__PURE__ */ text("Prep\xE1rate")]), /* @__PURE__ */ p_([/* @__PURE__ */ text("Coloca tu mano en el click izquierdo del mouse.")])]);
  var renderInstructions2 = /* @__PURE__ */ function() {
    return div2([class_("instructions-container")])([p_([text("En esta prueba ver\xE1s una serie de est\xEDmulos, uno a la vez.")]), p_([text("Haz click a la pantalla cuando veas un C\xCDRCULO VERDE. No des click a otro color, \xFAnicamente cuando veas el C\xCDRCULO VERDE.")]), p_([text("Procura dar click lo m\xE1s r\xE1pido posible sin cometer ning\xFAn error.")]), p_([text("Comenzaremos con una versi\xF3n de pr\xE1ctica.")]), button([onClick(function(v) {
      return GoNoGoInstructionsDone.value;
    })])([text("Comenzar")])]);
  }();
  var renderGoNoGo = function(state3) {
    return function(isPractice) {
      return div2([class_("go-no-go-area"), onMouseDown(function(ev) {
        return new HandleResponse(ev);
      })])([function() {
        if (state3.showStimulus) {
          if (state3.currentStimulus instanceof Just && state3.currentStimulus.value0 instanceof Go) {
            return div2([class_("stimulus go")])([div2([class_("circle green")])([])]);
          }
          ;
          if (state3.currentStimulus instanceof Just && state3.currentStimulus.value0 instanceof NoGo) {
            return div2([class_("stimulus no-go")])([div2([class_("circle red")])([])]);
          }
          ;
          if (state3.currentStimulus instanceof Nothing) {
            return div_([]);
          }
          ;
          throw new Error("Failed pattern match at GoNoGo (line 159, column 12 - line 166, column 33): " + [state3.currentStimulus.constructor.name]);
        }
        ;
        return div2([class_("fixation-cross")])([text("+")]);
      }(), function() {
        var $107 = isPractice && state3.showResult;
        if ($107) {
          return renderResult(state3.message);
        }
        ;
        return div_([]);
      }()]);
    };
  };
  var renderComplete = /* @__PURE__ */ div2([/* @__PURE__ */ class_("instructions-container")])([/* @__PURE__ */ h2_([/* @__PURE__ */ text("Has terminado esta prueba")]), /* @__PURE__ */ button([/* @__PURE__ */ onClick(function(v) {
    return GoNoGoCompleteRaiser.value;
  })])([/* @__PURE__ */ text("Siguiente")])]);
  var render4 = function(state3) {
    return div2([class_("go-no-go-container")])([function() {
      if (state3.stage instanceof GoNoGoInstructions) {
        return renderInstructions2;
      }
      ;
      if (state3.stage instanceof PrepareMessage) {
        return renderPrepareMessage;
      }
      ;
      if (state3.stage instanceof PracticeSession) {
        return renderGoNoGo(state3)(true);
      }
      ;
      if (state3.stage instanceof TestMessage) {
        return renderTestMessage;
      }
      ;
      if (state3.stage instanceof GoNoGoTest) {
        return renderGoNoGo(state3)(false);
      }
      ;
      if (state3.stage instanceof Complete) {
        return renderComplete;
      }
      ;
      throw new Error("Failed pattern match at GoNoGo (line 114, column 7 - line 120, column 35): " + [state3.stage.constructor.name]);
    }()]);
  };
  var randomStimulus = function __do3() {
    var n = randomInt(0)(1)();
    var $109 = n === 0;
    if ($109) {
      return Go.value;
    }
    ;
    return NoGo.value;
  };
  var showStimulusRandom = function(dictMonadAff) {
    return bind6(liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()))(randomStimulus))(function(stim) {
      return modify_6(function(v) {
        var $110 = {};
        for (var $111 in v) {
          if ({}.hasOwnProperty.call(v, $111)) {
            $110[$111] = v[$111];
          }
          ;
        }
        ;
        $110.currentStimulus = new Just(stim);
        $110.showStimulus = true;
        $110.responded = false;
        $110.showResult = false;
        return $110;
      });
    });
  };
  var nowToNumber2 = /* @__PURE__ */ map17(function(v) {
    return v;
  })(/* @__PURE__ */ map17(unInstant)(now));
  var showStimulus = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    return bind6(gets5(function(v) {
      return v.currentIndex;
    }))(function(currentIndex) {
      var stim = unsafeIndex2(stimuli)(currentIndex);
      return bind6(liftEffect7(nowToNumber2))(function(now2) {
        return modify_6(function(v) {
          var $114 = {};
          for (var $115 in v) {
            if ({}.hasOwnProperty.call(v, $115)) {
              $114[$115] = v[$115];
            }
            ;
          }
          ;
          $114.currentStimulus = new Just(stim);
          $114.showStimulus = true;
          $114.lastTimer = now2;
          $114.showResult = false;
          $114.responded = false;
          return $114;
        });
      });
    });
  };
  var initialState4 = function(v) {
    return {
      stage: GoNoGoInstructions.value,
      currentStimulus: Nothing.value,
      currentIndex: 0,
      responded: false,
      responses: [],
      practiceResponses: [],
      showStimulus: false,
      lastTimer: 0,
      showResult: false,
      message: ""
    };
  };
  var hideStimulus = function(dictMonadAff) {
    return modify_6(function(state3) {
      var $117 = {};
      for (var $118 in state3) {
        if ({}.hasOwnProperty.call(state3, $118)) {
          $117[$118] = state3[$118];
        }
        ;
      }
      ;
      $117.showStimulus = false;
      $117.currentIndex = state3.currentIndex + 1 | 0;
      return $117;
    });
  };
  var runTestSession = function(dictMonadAff) {
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    var hideStimulus1 = hideStimulus(dictMonadAff);
    return discard5(replicateM_1(75)(discard5(showStimulus(dictMonadAff))(function() {
      return discard5(liftAff3(delay(500)))(function() {
        return discard5(hideStimulus1)(function() {
          return liftAff3(delay(1500));
        });
      });
    })))(function() {
      return modify_6(function(v) {
        var $120 = {};
        for (var $121 in v) {
          if ({}.hasOwnProperty.call(v, $121)) {
            $120[$121] = v[$121];
          }
          ;
        }
        ;
        $120.stage = Complete.value;
        return $120;
      });
    });
  };
  var filter3 = function(pred2) {
    return function(arr) {
      return filter(pred2)(arr);
    };
  };
  var eqStimulus = {
    eq: function(x) {
      return function(y) {
        if (x instanceof Go && y instanceof Go) {
          return true;
        }
        ;
        if (x instanceof NoGo && y instanceof NoGo) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq13 = /* @__PURE__ */ eq(eqStimulus);
  var eqGoNoGoStage = {
    eq: function(x) {
      return function(y) {
        if (x instanceof GoNoGoInstructions && y instanceof GoNoGoInstructions) {
          return true;
        }
        ;
        if (x instanceof PrepareMessage && y instanceof PrepareMessage) {
          return true;
        }
        ;
        if (x instanceof PracticeSession && y instanceof PracticeSession) {
          return true;
        }
        ;
        if (x instanceof TestMessage && y instanceof TestMessage) {
          return true;
        }
        ;
        if (x instanceof GoNoGoTest && y instanceof GoNoGoTest) {
          return true;
        }
        ;
        if (x instanceof Complete && y instanceof Complete) {
          return true;
        }
        ;
        return false;
      };
    }
  };
  var eq23 = /* @__PURE__ */ eq(eqGoNoGoStage);
  var computeResult = function(responses) {
    var totalResponseTime = sum2(map18(function(v) {
      return v.responseTime;
    })(responses));
    var countOmission = length(filter3(function(response) {
      return eq13(response.stimulus)(Go.value) && !response.responded;
    })(responses));
    var countComission = length(filter3(function(response) {
      return eq13(response.stimulus)(NoGo.value) && response.responded;
    })(responses));
    return {
      comissionErrors: countComission,
      omissionErrors: countOmission,
      responseTime: totalResponseTime
    };
  };
  var runPracticeSession = function(dictMonadAff) {
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    var hideStimulus1 = hideStimulus(dictMonadAff);
    return discard5(replicateM_1(5)(discard5(showStimulusRandom(dictMonadAff))(function() {
      return discard5(liftAff3(delay(500)))(function() {
        return discard5(hideStimulus1)(function() {
          return liftAff3(delay(1500));
        });
      });
    })))(function() {
      return discard5(modify_6(function(v) {
        var $127 = {};
        for (var $128 in v) {
          if ({}.hasOwnProperty.call(v, $128)) {
            $127[$128] = v[$128];
          }
          ;
        }
        ;
        $127.stage = TestMessage.value;
        $127.currentIndex = 0;
        return $127;
      }))(function() {
        return discard5(liftAff3(delay(4e3)))(function() {
          return goNoGoHandler(dictMonadAff)(StartTest.value);
        });
      });
    });
  };
  var goNoGoHandler = function(dictMonadAff) {
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    var runTestSession1 = runTestSession(dictMonadAff);
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    return function(v) {
      if (v instanceof GoNoGoInstructionsDone) {
        return discard5(modify_6(function(v1) {
          var $131 = {};
          for (var $132 in v1) {
            if ({}.hasOwnProperty.call(v1, $132)) {
              $131[$132] = v1[$132];
            }
            ;
          }
          ;
          $131.stage = PrepareMessage.value;
          return $131;
        }))(function() {
          return discard5(liftAff3(delay(4e3)))(function() {
            return goNoGoHandler(dictMonadAff)(StartPractice.value);
          });
        });
      }
      ;
      if (v instanceof StartPractice) {
        return discard5(modify_6(function(v1) {
          var $134 = {};
          for (var $135 in v1) {
            if ({}.hasOwnProperty.call(v1, $135)) {
              $134[$135] = v1[$135];
            }
            ;
          }
          ;
          $134.stage = PracticeSession.value;
          return $134;
        }))(function() {
          return runPracticeSession(dictMonadAff);
        });
      }
      ;
      if (v instanceof StartTest) {
        return discard5(modify_6(function(v1) {
          var $137 = {};
          for (var $138 in v1) {
            if ({}.hasOwnProperty.call(v1, $138)) {
              $137[$138] = v1[$138];
            }
            ;
          }
          ;
          $137.stage = GoNoGoTest.value;
          $137.showResult = false;
          return $137;
        }))(function() {
          return runTestSession1;
        });
      }
      ;
      if (v instanceof HandleResponse) {
        return discard5(liftEffect7(preventDefault(toEvent(v.value0))))(function() {
          return bind6(gets5(function(v1) {
            return v1.responded;
          }))(function(responded) {
            if (responded) {
              return pure13(unit);
            }
            ;
            return bind6(liftEffect7(nowToNumber2))(function(now2) {
              return bind6(get4)(function(state3) {
                return discard5(modify_6(function(v1) {
                  var $141 = {};
                  for (var $142 in v1) {
                    if ({}.hasOwnProperty.call(v1, $142)) {
                      $141[$142] = v1[$142];
                    }
                    ;
                  }
                  ;
                  $141.responded = true;
                  return $141;
                }))(function() {
                  if (state3.currentStimulus instanceof Just) {
                    var response = {
                      stimulus: state3.currentStimulus.value0,
                      responded: true,
                      responseTime: now2 - state3.lastTimer
                    };
                    var $145 = eq23(state3.stage)(PracticeSession.value);
                    if ($145) {
                      return modify_6(function(s) {
                        var $147 = {};
                        for (var $148 in s) {
                          if ({}.hasOwnProperty.call(s, $148)) {
                            $147[$148] = s[$148];
                          }
                          ;
                        }
                        ;
                        $147.practiceResponses = snoc(s.practiceResponses)(response);
                        $147.showResult = true;
                        $147.message = function() {
                          var $146 = eq13(state3.currentStimulus.value0)(Go.value);
                          if ($146) {
                            return "Correcto";
                          }
                          ;
                          return "Incorrecto";
                        }();
                        return $147;
                      });
                    }
                    ;
                    return modify_6(function(s) {
                      var $150 = {};
                      for (var $151 in s) {
                        if ({}.hasOwnProperty.call(s, $151)) {
                          $150[$151] = s[$151];
                        }
                        ;
                      }
                      ;
                      $150.responses = snoc(s.responses)(response);
                      return $150;
                    });
                  }
                  ;
                  if (state3.currentStimulus instanceof Nothing) {
                    return pure13(unit);
                  }
                  ;
                  throw new Error("Failed pattern match at GoNoGo (line 214, column 9 - line 223, column 31): " + [state3.currentStimulus.constructor.name]);
                });
              });
            });
          });
        });
      }
      ;
      if (v instanceof PreventDefault2) {
        return liftEffect7(preventDefault(v.value0));
      }
      ;
      if (v instanceof GoNoGoCompleteRaiser) {
        return bind6(gets5(function(v1) {
          return v1.responses;
        }))(function(responses) {
          var results = computeResult(responses);
          return bind6(liftAff3(post2(ignore)("/gonogo")(new Just(new Json(encodeJson4(results))))))(function(serverResponse) {
            return raise(GoNoGoComplete.value);
          });
        });
      }
      ;
      throw new Error("Failed pattern match at GoNoGo (line 194, column 17 - line 230, column 28): " + [v.constructor.name]);
    };
  };
  var component = function(dictMonadAff) {
    return mkComponent({
      initialState: initialState4,
      render: render4,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: goNoGoHandler(dictMonadAff)
      })
    });
  };

  // output/Questions/index.js
  var bind7 = /* @__PURE__ */ bind(bindAff);
  var pure8 = /* @__PURE__ */ pure(applicativeAff);
  var bind12 = /* @__PURE__ */ bind(bindHalogenM);
  var gets6 = /* @__PURE__ */ gets(monadStateHalogenM);
  var modify_7 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var append6 = /* @__PURE__ */ append(semigroupArray);
  var type_7 = /* @__PURE__ */ type_3(isPropInputType);
  var value7 = /* @__PURE__ */ value3(isPropString);
  var gEncodeJsonCons5 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonInt);
  var gEncodeJsonCons12 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonMaybe(encodeJsonJString));
  var gEncodeJsonCons22 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonJBoolean);
  var gEncodeJsonCons32 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonMaybe(encodeJsonInt));
  var gEncodeJsonCons42 = /* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonMaybe(encodeJsonJNumber));
  var discard6 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var traverse_4 = /* @__PURE__ */ traverse_(applicativeHalogenM)(foldableArray);
  var Submitted = /* @__PURE__ */ function() {
    function Submitted2() {
    }
    ;
    Submitted2.value = new Submitted2();
    return Submitted2;
  }();
  var BadCodes = /* @__PURE__ */ function() {
    function BadCodes2() {
    }
    ;
    BadCodes2.value = new BadCodes2();
    return BadCodes2;
  }();
  var UpdateForm = /* @__PURE__ */ function() {
    function UpdateForm2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    UpdateForm2.create = function(value0) {
      return function(value1) {
        return new UpdateForm2(value0, value1);
      };
    };
    return UpdateForm2;
  }();
  var UpdateCode = /* @__PURE__ */ function() {
    function UpdateCode2(value0) {
      this.value0 = value0;
    }
    ;
    UpdateCode2.create = function(value0) {
      return new UpdateCode2(value0);
    };
    return UpdateCode2;
  }();
  var ShowQuestion = /* @__PURE__ */ function() {
    function ShowQuestion2(value0, value1) {
      this.value0 = value0;
      this.value1 = value1;
    }
    ;
    ShowQuestion2.create = function(value0) {
      return function(value1) {
        return new ShowQuestion2(value0, value1);
      };
    };
    return ShowQuestion2;
  }();
  var CompositeAction = /* @__PURE__ */ function() {
    function CompositeAction2(value0) {
      this.value0 = value0;
    }
    ;
    CompositeAction2.create = function(value0) {
      return new CompositeAction2(value0);
    };
    return CompositeAction2;
  }();
  var SendForm = /* @__PURE__ */ function() {
    function SendForm2(value0) {
      this.value0 = value0;
    }
    ;
    SendForm2.create = function(value0) {
      return new SendForm2(value0);
    };
    return SendForm2;
  }();
  var validateCode = function(code3) {
    return bind7(post2(json2)("/code-validation")(new Just(json(jsonSingletonObject("code")(id(code3))))))(function(result) {
      if (result instanceof Left) {
        return pure8(false);
      }
      ;
      if (result instanceof Right) {
        return pure8(stringify(result.value0.body) === "true");
      }
      ;
      throw new Error("Failed pattern match at Questions (line 247, column 3 - line 251, column 51): " + [result.constructor.name]);
    });
  };
  var updateForm = function(dictMonadEffect) {
    return function(key2) {
      return function(value1) {
        return bind12(gets6(function(v) {
          return v.formData;
        }))(function(formData) {
          return modify_7(function(state3) {
            var $242 = {};
            for (var $243 in state3) {
              if ({}.hasOwnProperty.call(state3, $243)) {
                $242[$243] = state3[$243];
              }
              ;
            }
            ;
            $242.formData = function() {
              if (key2 === "age") {
                var $185 = {};
                for (var $186 in formData) {
                  if ({}.hasOwnProperty.call(formData, $186)) {
                    $185[$186] = formData[$186];
                  }
                  ;
                }
                ;
                $185.age = fromMaybe(-1 | 0)(fromString2(value1));
                return $185;
              }
              ;
              if (key2 === "sex") {
                var $188 = {};
                for (var $189 in formData) {
                  if ({}.hasOwnProperty.call(formData, $189)) {
                    $188[$189] = formData[$189];
                  }
                  ;
                }
                ;
                $188.sex = fromMaybe(-1 | 0)(fromString2(value1));
                return $188;
              }
              ;
              if (key2 === "major") {
                var $191 = {};
                for (var $192 in formData) {
                  if ({}.hasOwnProperty.call(formData, $192)) {
                    $191[$192] = formData[$192];
                  }
                  ;
                }
                ;
                $191.major = value1;
                return $191;
              }
              ;
              if (key2 === "alcohol") {
                var $194 = {};
                for (var $195 in formData) {
                  if ({}.hasOwnProperty.call(formData, $195)) {
                    $194[$195] = formData[$195];
                  }
                  ;
                }
                ;
                $194.alcohol = value1 === "1";
                return $194;
              }
              ;
              if (key2 === "alcoholFrequency") {
                var $197 = {};
                for (var $198 in formData) {
                  if ({}.hasOwnProperty.call(formData, $198)) {
                    $197[$198] = formData[$198];
                  }
                  ;
                }
                ;
                $197.alcoholFrequency = new Just(fromMaybe(-1 | 0)(fromString2(value1)));
                return $197;
              }
              ;
              if (key2 === "alcoholIntensity") {
                var $200 = {};
                for (var $201 in formData) {
                  if ({}.hasOwnProperty.call(formData, $201)) {
                    $200[$201] = formData[$201];
                  }
                  ;
                }
                ;
                $200.alcoholIntensity = new Just(fromMaybe(-1 | 0)(fromString2(value1)));
                return $200;
              }
              ;
              if (key2 === "smoke") {
                var $203 = {};
                for (var $204 in formData) {
                  if ({}.hasOwnProperty.call(formData, $204)) {
                    $203[$204] = formData[$204];
                  }
                  ;
                }
                ;
                $203.smoke = value1 === "1";
                return $203;
              }
              ;
              if (key2 === "smokingYears") {
                var $206 = {};
                for (var $207 in formData) {
                  if ({}.hasOwnProperty.call(formData, $207)) {
                    $206[$207] = formData[$207];
                  }
                  ;
                }
                ;
                $206.smokingYears = new Just(fromMaybe(-1)(fromString(value1)));
                return $206;
              }
              ;
              if (key2 === "smokingIntensity") {
                var $209 = {};
                for (var $210 in formData) {
                  if ({}.hasOwnProperty.call(formData, $210)) {
                    $209[$210] = formData[$210];
                  }
                  ;
                }
                ;
                $209.smokingIntensity = new Just(fromMaybe(-1)(fromString(value1)));
                return $209;
              }
              ;
              if (key2 === "drugs") {
                var $212 = {};
                for (var $213 in formData) {
                  if ({}.hasOwnProperty.call(formData, $213)) {
                    $212[$213] = formData[$213];
                  }
                  ;
                }
                ;
                $212.drugs = value1 === "1";
                return $212;
              }
              ;
              if (key2 === "drugsFrequency") {
                var $215 = {};
                for (var $216 in formData) {
                  if ({}.hasOwnProperty.call(formData, $216)) {
                    $215[$216] = formData[$216];
                  }
                  ;
                }
                ;
                $215.drugsFrequency = new Just(fromMaybe(-1 | 0)(fromString2(value1)));
                return $215;
              }
              ;
              if (key2 === "disorder") {
                var $218 = {};
                for (var $219 in formData) {
                  if ({}.hasOwnProperty.call(formData, $219)) {
                    $218[$219] = formData[$219];
                  }
                  ;
                }
                ;
                $218.disorder = value1 === "1";
                return $218;
              }
              ;
              if (key2 === "disorderInput") {
                var $221 = {};
                for (var $222 in formData) {
                  if ({}.hasOwnProperty.call(formData, $222)) {
                    $221[$222] = formData[$222];
                  }
                  ;
                }
                ;
                $221.disorderInput = new Just(value1);
                return $221;
              }
              ;
              if (key2 === "injury") {
                var $224 = {};
                for (var $225 in formData) {
                  if ({}.hasOwnProperty.call(formData, $225)) {
                    $224[$225] = formData[$225];
                  }
                  ;
                }
                ;
                $224.injury = value1 === "1";
                return $224;
              }
              ;
              if (key2 === "injuryLocation") {
                var $227 = {};
                for (var $228 in formData) {
                  if ({}.hasOwnProperty.call(formData, $228)) {
                    $227[$228] = formData[$228];
                  }
                  ;
                }
                ;
                $227.injuryLocation = new Just(value1);
                return $227;
              }
              ;
              if (key2 === "injuryTreated") {
                var $230 = {};
                for (var $231 in formData) {
                  if ({}.hasOwnProperty.call(formData, $231)) {
                    $230[$231] = formData[$231];
                  }
                  ;
                }
                ;
                $230.injuryTreated = new Just(value1 === "1");
                return $230;
              }
              ;
              if (key2 === "abuse") {
                var $233 = {};
                for (var $234 in formData) {
                  if ({}.hasOwnProperty.call(formData, $234)) {
                    $233[$234] = formData[$234];
                  }
                  ;
                }
                ;
                $233.abuse = formData.abuse + fromMaybe(0)(fromString2(value1)) | 0;
                return $233;
              }
              ;
              if (key2 === "abuseOther") {
                var $236 = {};
                for (var $237 in formData) {
                  if ({}.hasOwnProperty.call(formData, $237)) {
                    $236[$237] = formData[$237];
                  }
                  ;
                }
                ;
                $236.abuseOther = new Just(value1);
                return $236;
              }
              ;
              if (key2 === "shortage") {
                var $239 = {};
                for (var $240 in formData) {
                  if ({}.hasOwnProperty.call(formData, $240)) {
                    $239[$240] = formData[$240];
                  }
                  ;
                }
                ;
                $239.shortage = formData.shortage + fromMaybe(0)(fromString2(value1)) | 0;
                return $239;
              }
              ;
              return formData;
            }();
            return $242;
          });
        });
      };
    };
  };
  var updateCode = function(dictMonadEffect) {
    return function(newCode) {
      return modify_7(function(state3) {
        var $245 = {};
        for (var $246 in state3) {
          if ({}.hasOwnProperty.call(state3, $246)) {
            $245[$246] = state3[$246];
          }
          ;
        }
        ;
        $245.code = newCode;
        return $245;
      });
    };
  };
  var showQuestion = function(dictMonadEffect) {
    return function(key2) {
      return function(shouldShow) {
        return modify_7(function(state3) {
          var $267 = {};
          for (var $268 in state3) {
            if ({}.hasOwnProperty.call(state3, $268)) {
              $267[$268] = state3[$268];
            }
            ;
          }
          ;
          $267.conditionalDivs = function() {
            if (key2 === "alcoholFrequency") {
              var $249 = {};
              for (var $250 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $250)) {
                  $249[$250] = state3["conditionalDivs"][$250];
                }
                ;
              }
              ;
              $249.alcoholFrequency = shouldShow;
              return $249;
            }
            ;
            if (key2 === "smokeFreq") {
              var $252 = {};
              for (var $253 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $253)) {
                  $252[$253] = state3["conditionalDivs"][$253];
                }
                ;
              }
              ;
              $252.smokeFreq = shouldShow;
              return $252;
            }
            ;
            if (key2 === "drugsFrequency") {
              var $255 = {};
              for (var $256 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $256)) {
                  $255[$256] = state3["conditionalDivs"][$256];
                }
                ;
              }
              ;
              $255.drugsFrequency = shouldShow;
              return $255;
            }
            ;
            if (key2 === "disorder") {
              var $258 = {};
              for (var $259 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $259)) {
                  $258[$259] = state3["conditionalDivs"][$259];
                }
                ;
              }
              ;
              $258.disorder = shouldShow;
              return $258;
            }
            ;
            if (key2 === "injury") {
              var $261 = {};
              for (var $262 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $262)) {
                  $261[$262] = state3["conditionalDivs"][$262];
                }
                ;
              }
              ;
              $261.injury = shouldShow;
              return $261;
            }
            ;
            if (key2 === "abuseOther") {
              var $264 = {};
              for (var $265 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $265)) {
                  $264[$265] = state3["conditionalDivs"][$265];
                }
                ;
              }
              ;
              $264.abuseOther = shouldShow;
              return $264;
            }
            ;
            return state3.conditionalDivs;
          }();
          return $267;
        });
      };
    };
  };
  var mkQuestion2 = function(label5) {
    return function(innerHtml) {
      return div2([class_("question")])(append6([label_([text(label5)]), br_])(append6(innerHtml)([br_])));
    };
  };
  var sexQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("Sexo")([input([type_7(InputRadio.value), name4("sex"), required2(true), value7("0"), onChecked(function(v) {
      return new UpdateForm("sex", "0");
    })]), text("Masculino"), br_, input([type_7(InputRadio.value), name4("sex"), required2(true), value7("1"), onChecked(function(v) {
      return new UpdateForm("sex", "1");
    })]), text("Femenino")]);
  }();
  var shortageQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFEn tu vida viviste carencia econ\xF3mica, social o emocional?")([input([type_7(InputCheckbox.value), name4("shortage"), onChecked(function(c) {
      return new UpdateForm("shortage", function() {
        if (c) {
          return "1";
        }
        ;
        return "-1";
      }());
    })]), text("Econ\xF3mica"), br_, input([type_7(InputCheckbox.value), name4("shortage"), onChecked(function(c) {
      return new UpdateForm("shortage", function() {
        if (c) {
          return "2";
        }
        ;
        return "-2";
      }());
    })]), text("Social"), br_, input([type_7(InputCheckbox.value), name4("shortage"), onChecked(function(c) {
      return new UpdateForm("shortage", function() {
        if (c) {
          return "4";
        }
        ;
        return "-4";
      }());
    })]), text("Emocional"), br_, input([type_7(InputCheckbox.value), name4("shortage"), onChecked(function(c) {
      return new UpdateForm("shortage", function() {
        if (c) {
          return "-1000";
        }
        ;
        return "1000";
      }());
    })]), text("Ninguna")]);
  }();
  var smokeQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFFumas?")([input([type_7(InputRadio.value), id3("smoke_yes"), name4("smoke"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("smoke", "1"), new ShowQuestion("smokeFreq", true)]);
    })]), text("S\xED"), br_, input([type_7(InputRadio.value), id3("smoke_no"), name4("smoke"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("smoke", "0"), new ShowQuestion("smokeFreq", false)]);
    })]), text("No")]);
  }();
  var smokeYearsQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFCu\xE1ntos a\xF1os llevas fumando?")([input([type_7(InputNumber.value), name4("smoke_years"), step3(new Step(0.01)), onValueChange(function(val) {
      return new UpdateForm("smokingYears", val);
    })])]);
  }();
  var smokingIntensityQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFCu\xE1ntos cigarros fumas aproximadamente en un d\xEDa?")([input([type_7(InputNumber.value), name4("smoke_intensity"), step3(new Step(0.01)), onValueChange(function(val) {
      return new UpdateForm("smokingIntensity", val);
    })])]);
  }();
  var majorQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("Carrera")([input([type_7(InputText.value), id3("major"), required2(true), onValueInput(function(val) {
      return new UpdateForm("major", val);
    })])]);
  }();
  var lossQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFHas vivido alguna p\xE9rdida importante recientemente?")([small_([text("Alg\xFAn familiar, mascota, trabajo, etc.")]), input([type_7(InputRadio.value), id3("loss_yes"), name4("loss"), value7("1"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("loss", "1"), new ShowQuestion("loss", true)]);
    })]), text("S\xED"), br_, input([type_7(InputRadio.value), id3("loss_no"), name4("loss"), value7("0"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("loss", "0"), new ShowQuestion("disorder", false)]);
    })]), text("No")]);
  }();
  var injuryTreatedQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFFue tratado el traumatismo?")([input([type_7(InputRadio.value), id3("treated_yes"), name4("treated"), value7("1"), required2(true), onChecked(function(v) {
      return new UpdateForm("injuryTreated", "1");
    })]), text("S\xED"), input([type_7(InputRadio.value), id3("treated_no"), name4("treated"), value7("0"), required2(true), onChecked(function(v) {
      return new UpdateForm("injuryTreated", "0");
    })]), text("No")]);
  }();
  var injuryQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFHas presentado alg\xFAn golpe en la cabeza importante?")([small_([text("Por el cual te hayan hecho una tomograf\xEDa y que haya generado alg\xFAn traumatismo en el cerebro")]), input([type_7(InputRadio.value), id3("injury_yes"), name4("injury"), value7("1"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("injury", "1"), new ShowQuestion("injury", true)]);
    })]), text("S\xED"), br_, input([type_7(InputRadio.value), id3("injury_no"), name4("injury"), value7("0"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("injury", "0"), new ShowQuestion("injury", false)]);
    })]), text("No")]);
  }();
  var injuryLocationQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFEn d\xF3nde se ubic\xF3 el golpe?")([small_([text("A nivel de la frente, cerca de la oreja, en la nuca o en la coronilla, o en dado caso a nivel frontal, parietal, occipital o temporal, tambi\xE9n mencionar si fue del lado izquierdo o derecho")]), input([type_7(InputText.value), id3("injury_location_input"), name4("injury_location"), required2(true), onValueChange(function(val) {
      return new UpdateForm("injuryLocation", val);
    })])]);
  }();
  var initialState5 = function(v) {
    return {
      formData: {
        age: -1 | 0,
        sex: -1 | 0,
        major: "",
        alcohol: false,
        alcoholFrequency: Nothing.value,
        alcoholIntensity: Nothing.value,
        smoke: false,
        smokingYears: Nothing.value,
        smokingIntensity: Nothing.value,
        drugs: false,
        drugsFrequency: Nothing.value,
        disorder: false,
        disorderInput: Nothing.value,
        injury: false,
        injuryLocation: Nothing.value,
        injuryTreated: Nothing.value,
        abuse: -1 | 0,
        abuseOther: Nothing.value,
        shortage: -1 | 0,
        loss: false
      },
      conditionalDivs: {
        alcoholFrequency: false,
        smokeFreq: false,
        drugsFrequency: false,
        disorder: false,
        injury: false,
        abuseOther: false,
        badCode: false
      },
      code: "",
      codeAttempts: 0
    };
  };
  var formToJSON = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons5(/* @__PURE__ */ gEncodeJsonCons12(/* @__PURE__ */ gEncodeJsonCons5(/* @__PURE__ */ gEncodeJsonCons22(/* @__PURE__ */ gEncodeJsonCons32(/* @__PURE__ */ gEncodeJsonCons32(/* @__PURE__ */ gEncodeJsonCons22(/* @__PURE__ */ gEncodeJsonCons12(/* @__PURE__ */ gEncodeJsonCons22(/* @__PURE__ */ gEncodeJsonCons32(/* @__PURE__ */ gEncodeJsonCons22(/* @__PURE__ */ gEncodeJsonCons12(/* @__PURE__ */ gEncodeJsonCons(/* @__PURE__ */ encodeJsonMaybe(encodeJsonJBoolean))(/* @__PURE__ */ gEncodeJsonCons22(/* @__PURE__ */ gEncodeJsonCons(encodeJsonJString)(/* @__PURE__ */ gEncodeJsonCons5(/* @__PURE__ */ gEncodeJsonCons5(/* @__PURE__ */ gEncodeJsonCons22(/* @__PURE__ */ gEncodeJsonCons42(/* @__PURE__ */ gEncodeJsonCons42(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "smokingYears";
    }
  })())({
    reflectSymbol: function() {
      return "smokingIntensity";
    }
  })())({
    reflectSymbol: function() {
      return "smoke";
    }
  })())({
    reflectSymbol: function() {
      return "shortage";
    }
  })())({
    reflectSymbol: function() {
      return "sex";
    }
  })())({
    reflectSymbol: function() {
      return "major";
    }
  })())({
    reflectSymbol: function() {
      return "loss";
    }
  })())({
    reflectSymbol: function() {
      return "injuryTreated";
    }
  })())({
    reflectSymbol: function() {
      return "injuryLocation";
    }
  })())({
    reflectSymbol: function() {
      return "injury";
    }
  })())({
    reflectSymbol: function() {
      return "drugsFrequency";
    }
  })())({
    reflectSymbol: function() {
      return "drugs";
    }
  })())({
    reflectSymbol: function() {
      return "disorderInput";
    }
  })())({
    reflectSymbol: function() {
      return "disorder";
    }
  })())({
    reflectSymbol: function() {
      return "alcoholIntensity";
    }
  })())({
    reflectSymbol: function() {
      return "alcoholFrequency";
    }
  })())({
    reflectSymbol: function() {
      return "alcohol";
    }
  })())({
    reflectSymbol: function() {
      return "age";
    }
  })())({
    reflectSymbol: function() {
      return "abuseOther";
    }
  })())({
    reflectSymbol: function() {
      return "abuse";
    }
  })())());
  var sendForm = function(form2) {
    return bind7(post2(json2)("/participant")(new Just(json(formToJSON(form2)))))(function() {
      return pure8(unit);
    });
  };
  var formHandler = function(dictMonadAff) {
    var liftAff3 = liftAff(monadAffHalogenM(dictMonadAff));
    return bind12(gets6(function(v) {
      return v.code;
    }))(function(code3) {
      return bind12(liftAff3(validateCode(code3)))(function(codeResult) {
        if (codeResult) {
          return bind12(gets6(function(v) {
            return v.formData;
          }))(function(form2) {
            return discard6(liftAff3(sendForm(form2)))(function() {
              return raise(Submitted.value);
            });
          });
        }
        ;
        return bind12(gets6(function(v) {
          return v.codeAttempts;
        }))(function(att) {
          var $275 = att >= 3;
          if ($275) {
            return raise(BadCodes.value);
          }
          ;
          return modify_7(function(state3) {
            var $279 = {};
            for (var $280 in state3) {
              if ({}.hasOwnProperty.call(state3, $280)) {
                $279[$280] = state3[$280];
              }
              ;
            }
            ;
            $279.codeAttempts = state3.codeAttempts + 1 | 0;
            $279.conditionalDivs = function() {
              var $276 = {};
              for (var $277 in state3.conditionalDivs) {
                if ({}.hasOwnProperty.call(state3.conditionalDivs, $277)) {
                  $276[$277] = state3["conditionalDivs"][$277];
                }
                ;
              }
              ;
              $276.badCode = true;
              return $276;
            }();
            return $279;
          });
        });
      });
    });
  };
  var eventHandler = function(dictMonadAff) {
    var MonadEffect0 = dictMonadAff.MonadEffect0();
    var liftEffect7 = liftEffect(monadEffectHalogenM(MonadEffect0));
    var formHandler1 = formHandler(dictMonadAff);
    var updateForm1 = updateForm(MonadEffect0);
    var showQuestion1 = showQuestion(MonadEffect0);
    var updateCode1 = updateCode(MonadEffect0);
    return function(v) {
      if (v instanceof SendForm) {
        return discard6(liftEffect7(preventDefault(v.value0)))(function() {
          return formHandler1;
        });
      }
      ;
      if (v instanceof UpdateForm) {
        return updateForm1(v.value0)(v.value1);
      }
      ;
      if (v instanceof ShowQuestion) {
        return showQuestion1(v.value0)(v.value1);
      }
      ;
      if (v instanceof UpdateCode) {
        return updateCode1(v.value0);
      }
      ;
      if (v instanceof CompositeAction) {
        return traverse_4(eventHandler(dictMonadAff))(v.value0);
      }
      ;
      return raise(Submitted.value);
    };
  };
  var drugsQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFConsumes drogas?")([input([type_7(InputRadio.value), name4("drugs"), id3("drugs_yes"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("drugs", "1"), new ShowQuestion("drugsFrequency", true)]);
    })]), text("S\xED"), br_, input([type_7(InputRadio.value), name4("drugs"), id3("drugs_no"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("drugs", "0"), new ShowQuestion("drugsFrequency", false)]);
    })]), text("No")]);
  }();
  var drugsFrequencyQuestion = /* @__PURE__ */ mkQuestion2("\xBFCon qu\xE9 frecuencia consumes? (Sin importar la cantidad)")([/* @__PURE__ */ select([/* @__PURE__ */ id3("drugs"), /* @__PURE__ */ onValueChange(function(val) {
    return new UpdateForm("drugsFrequency", val);
  }), /* @__PURE__ */ required2(true)])([/* @__PURE__ */ option([/* @__PURE__ */ disabled2(true), /* @__PURE__ */ selected(true), /* @__PURE__ */ value7("")])([/* @__PURE__ */ text("Seleccionar frecuencia")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("0")])([/* @__PURE__ */ text("Todos los d\xEDas")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("1")])([/* @__PURE__ */ text("Una vez a la semana")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("2")])([/* @__PURE__ */ text("Cada dos semanas")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("3")])([/* @__PURE__ */ text("Una vez al mes")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("4")])([/* @__PURE__ */ text("De manera espor\xE1dica")])])]);
  var disorderQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("Tienes alg\xFAn diagn\xF3stico psiqui\xE1trico o neurol\xF3gico?")([small_([text("Dicho diagn\xF3stico debe de haber sido designado por un profesional de la salud, puede ser diagn\xF3stico de ansiedad, depresi\xF3n, bipolaridad tipo I o II, TDA-H, autismo, alguna enfermedad neurodegenerativa, etc.")]), input([type_7(InputRadio.value), id3("disorder_yes"), name4("disorder"), value7("1"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("disorder", "1"), new ShowQuestion("disorder", true)]);
    })]), text("S\xED"), br_, input([type_7(InputRadio.value), id3("disorder_no"), name4("disorder"), value7("0"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("disorder", "0"), new ShowQuestion("disorder", false)]);
    })]), text("No")]);
  }();
  var disorderInputQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFCu\xE1l es tu diagn\xF3stico?")([input([type_7(InputText.value), id3("disorder_input"), name4("disorder"), required2(true), onValueChange(function(val) {
      return new UpdateForm("disorderInput", val);
    })])]);
  }();
  var codeVerification = function(isBad) {
    return mkQuestion2("Ingresa aqu\xED el c\xF3digo que te proporcion\xF3 la persona que est\xE1 aplicando la prueba")([input([type_7(InputText.value), id3("code"), required2(true), onValueInput(function(val) {
      return new UpdateCode(val);
    })]), function() {
      if (isBad) {
        return label_([text("C\xF3digo equivocado")]);
      }
      ;
      return div_([]);
    }()]);
  };
  var alcoholQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("\xBFConsumes alcohol?")([input([type_7(InputRadio.value), id3("alcohol_yes"), name4("alcohol"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("alcohol", "1"), new ShowQuestion("alcoholFrequency", true)]);
    })]), text("S\xED"), br_, input([type_7(InputRadio.value), id3("alcohol_no"), name4("alcohol"), required2(true), onChecked(function(v) {
      return new CompositeAction([new UpdateForm("alcohol", "0"), new ShowQuestion("alcoholFrequency", false)]);
    })]), text("No")]);
  }();
  var alcoholIntensityQuestion = /* @__PURE__ */ mkQuestion2("\xBFCu\xE1ntas bebidas alcoh\xF3licas sueles tomar en un d\xEDa de consumo?")([/* @__PURE__ */ select([/* @__PURE__ */ id3("alcoholIntensity"), /* @__PURE__ */ onValueChange(function(value1) {
    return new UpdateForm("alcoholIntensity", value1);
  }), /* @__PURE__ */ required2(true)])([/* @__PURE__ */ option([/* @__PURE__ */ disabled2(true), /* @__PURE__ */ selected(true), /* @__PURE__ */ value7("")])([/* @__PURE__ */ text("Seleccionar cantidad")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("0")])([/* @__PURE__ */ text("1 o 2")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("1")])([/* @__PURE__ */ text("3 o 4")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("2")])([/* @__PURE__ */ text("5 o 6")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("3")])([/* @__PURE__ */ text("7 o m\xE1s")])])]);
  var alcoholFrequencyQuestion = /* @__PURE__ */ mkQuestion2("\xBFCon qu\xE9 frecuencia consumes? (Sin importar la cantidad)")([/* @__PURE__ */ select([/* @__PURE__ */ id3("alcohol"), /* @__PURE__ */ onValueChange(function(value1) {
    return new UpdateForm("alcoholFrequency", value1);
  }), /* @__PURE__ */ required2(true)])([/* @__PURE__ */ option([/* @__PURE__ */ disabled2(true), /* @__PURE__ */ selected(true), /* @__PURE__ */ value7("")])([/* @__PURE__ */ text("Seleccionar frecuencia")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("0")])([/* @__PURE__ */ text("Una o menos veces al mes")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("1")])([/* @__PURE__ */ text("De 2 a 4 veces al mes")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("2")])([/* @__PURE__ */ text("De 2 a 3 veces a la semana")]), /* @__PURE__ */ option([/* @__PURE__ */ value7("3")])([/* @__PURE__ */ text("4 o m\xE1s veces a la semana")])])]);
  var ageQuestion = /* @__PURE__ */ function() {
    return mkQuestion2("Edad")([input([type_7(InputNumber.value), id3("age"), required2(true), onValueInput(function(val) {
      return new UpdateForm("age", val);
    })])]);
  }();
  var abuseQuestionOther = /* @__PURE__ */ function() {
    return input([type_7(InputText.value), name4("abuseOther"), required2(true), onValueChange(function(val) {
      return new UpdateForm("abuseOther", val);
    })]);
  }();
  var abuseQuestion = function(other) {
    return mkQuestion2("\xBFEn tu vida viviste alg\xFAn tipo de abuso?")([input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new UpdateForm("abuse", function() {
        if (c) {
          return "1";
        }
        ;
        return "-1";
      }());
    })]), text("Abuso psicol\xF3gico"), br_, input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new UpdateForm("abuse", function() {
        if (c) {
          return "2";
        }
        ;
        return "-2";
      }());
    })]), text("Violencia f\xEDsica"), br_, input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new UpdateForm("abuse", function() {
        if (c) {
          return "4";
        }
        ;
        return "-4";
      }());
    })]), text("Abuso sexual"), br_, input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new UpdateForm("abuse", function() {
        if (c) {
          return "8";
        }
        ;
        return "-8";
      }());
    })]), text("Abuso escolar o bullying"), br_, input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new UpdateForm("abuse", function() {
        if (c) {
          return "16";
        }
        ;
        return "-16";
      }());
    })]), text("Abuso financiero"), br_, input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new UpdateForm("abuse", function() {
        if (c) {
          return "-1000";
        }
        ;
        return "1000";
      }());
    })]), text("Ninguno"), br_, input([type_7(InputCheckbox.value), name4("abuse"), onChecked(function(c) {
      return new CompositeAction([new UpdateForm("abuse", function() {
        if (c) {
          return "32";
        }
        ;
        return "-32";
      }()), new ShowQuestion("abuseOther", c)]);
    })]), text("Otro"), function() {
      if (other) {
        return abuseQuestionOther;
      }
      ;
      return div_([]);
    }()]);
  };
  var renderQuestionsForm = function(state3) {
    return div2([class_("container")])([h1_([text("Evaluaci\xF3n neuropsicol\xF3gica")]), h3_([text("Hola, muchas gracias por tomarte el tiempo para participar, por favor contesta con sinceridad, se te asignar\xE1 un n\xFAmero de participante por lo que tus respuestas ser\xE1n an\xF3nimas.")]), form([id3("participant_form"), onSubmit(function(ev) {
      return new SendForm(ev);
    })])([ageQuestion, sexQuestion, majorQuestion, alcoholQuestion, function() {
      if (state3.conditionalDivs.alcoholFrequency) {
        return alcoholFrequencyQuestion;
      }
      ;
      return div_([]);
    }(), function() {
      if (state3.conditionalDivs.alcoholFrequency) {
        return alcoholIntensityQuestion;
      }
      ;
      return div_([]);
    }(), smokeQuestion, function() {
      if (state3.conditionalDivs.smokeFreq) {
        return smokeYearsQuestion;
      }
      ;
      return div_([]);
    }(), function() {
      if (state3.conditionalDivs.smokeFreq) {
        return smokingIntensityQuestion;
      }
      ;
      return div_([]);
    }(), drugsQuestion, function() {
      if (state3.conditionalDivs.drugsFrequency) {
        return drugsFrequencyQuestion;
      }
      ;
      return div_([]);
    }(), disorderQuestion, function() {
      if (state3.conditionalDivs.disorder) {
        return disorderInputQuestion;
      }
      ;
      return div_([]);
    }(), injuryQuestion, function() {
      if (state3.conditionalDivs.injury) {
        return injuryLocationQuestion;
      }
      ;
      return div_([]);
    }(), function() {
      if (state3.conditionalDivs.injury) {
        return injuryTreatedQuestion;
      }
      ;
      return div_([]);
    }(), abuseQuestion(state3.conditionalDivs.abuseOther), shortageQuestion, lossQuestion, codeVerification(state3.conditionalDivs.badCode), input([type_7(InputSubmit.value), title("Siguiente"), value7("Siguiente")])])]);
  };
  var questionsComponent = function(dictMonadAff) {
    return mkComponent({
      initialState: initialState5,
      render: renderQuestionsForm,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: eventHandler(dictMonadAff)
      })
    });
  };

  // output/Web.DOM.Document/foreign.js
  var getEffProp2 = function(name17) {
    return function(doc) {
      return function() {
        return doc[name17];
      };
    };
  };
  var url = getEffProp2("URL");
  var documentURI = getEffProp2("documentURI");
  var origin = getEffProp2("origin");
  var compatMode = getEffProp2("compatMode");
  var characterSet = getEffProp2("characterSet");
  var contentType = getEffProp2("contentType");
  var _documentElement = getEffProp2("documentElement");

  // output/Web.DOM.Document/index.js
  var toNonElementParentNode = unsafeCoerce2;

  // output/Web.DOM.NonElementParentNode/foreign.js
  function _getElementById(id4) {
    return function(node) {
      return function() {
        return node.getElementById(id4);
      };
    };
  }

  // output/Web.DOM.NonElementParentNode/index.js
  var map19 = /* @__PURE__ */ map(functorEffect);
  var getElementById = function(eid) {
    var $2 = map19(toMaybe);
    var $3 = _getElementById(eid);
    return function($4) {
      return $2($3($4));
    };
  };

  // output/Web.HTML/foreign.js
  var windowImpl = function() {
    return window;
  };

  // output/Web.HTML.HTMLDocument/foreign.js
  function _readyState(doc) {
    return doc.readyState;
  }

  // output/Web.HTML.HTMLDocument.ReadyState/index.js
  var Loading = /* @__PURE__ */ function() {
    function Loading2() {
    }
    ;
    Loading2.value = new Loading2();
    return Loading2;
  }();
  var Interactive = /* @__PURE__ */ function() {
    function Interactive2() {
    }
    ;
    Interactive2.value = new Interactive2();
    return Interactive2;
  }();
  var Complete2 = /* @__PURE__ */ function() {
    function Complete3() {
    }
    ;
    Complete3.value = new Complete3();
    return Complete3;
  }();
  var parse = function(v) {
    if (v === "loading") {
      return new Just(Loading.value);
    }
    ;
    if (v === "interactive") {
      return new Just(Interactive.value);
    }
    ;
    if (v === "complete") {
      return new Just(Complete2.value);
    }
    ;
    return Nothing.value;
  };

  // output/Web.HTML.HTMLDocument/index.js
  var map20 = /* @__PURE__ */ map(functorEffect);
  var toParentNode = unsafeCoerce2;
  var toDocument = unsafeCoerce2;
  var readyState = function(doc) {
    return map20(function() {
      var $4 = fromMaybe(Loading.value);
      return function($5) {
        return $4(parse($5));
      };
    }())(function() {
      return _readyState(doc);
    });
  };

  // output/Web.HTML.HTMLElement/foreign.js
  function _read(nothing, just, value18) {
    var tag = Object.prototype.toString.call(value18);
    if (tag.indexOf("[object HTML") === 0 && tag.indexOf("Element]") === tag.length - 8) {
      return just(value18);
    } else {
      return nothing;
    }
  }
  function focus2(elt) {
    return function() {
      return elt.focus();
    };
  }

  // output/Web.HTML.HTMLElement/index.js
  var toNode2 = unsafeCoerce2;
  var fromElement = function(x) {
    return _read(Nothing.value, Just.create, x);
  };

  // output/Web.HTML.Window/foreign.js
  function document2(window2) {
    return function() {
      return window2.document;
    };
  }

  // output/Web.HTML.Window/index.js
  var toEventTarget = unsafeCoerce2;

  // output/Web.UIEvent.KeyboardEvent/foreign.js
  function key(e) {
    return e.key;
  }

  // output/Web.UIEvent.KeyboardEvent/index.js
  var toEvent3 = unsafeCoerce2;

  // output/Stroop/index.js
  var discard7 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var modify_8 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var bind8 = /* @__PURE__ */ bind(bindHalogenM);
  var pure9 = /* @__PURE__ */ pure(applicativeHalogenM);
  var gets7 = /* @__PURE__ */ gets(monadStateHalogenM);
  var get5 = /* @__PURE__ */ get(monadStateHalogenM);
  var liftAff2 = /* @__PURE__ */ liftAff(monadAffAff);
  var gEncodeJsonCons6 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonInt);
  var gEncodeJsonCons13 = /* @__PURE__ */ gEncodeJsonCons(encodeJsonJNumber);
  var encodeJson5 = /* @__PURE__ */ encodeJson(/* @__PURE__ */ encodeRecord(/* @__PURE__ */ gEncodeJsonCons6(/* @__PURE__ */ gEncodeJsonCons6(/* @__PURE__ */ gEncodeJsonCons13(/* @__PURE__ */ gEncodeJsonCons6(/* @__PURE__ */ gEncodeJsonCons6(/* @__PURE__ */ gEncodeJsonCons13(gEncodeJsonNil)({
    reflectSymbol: function() {
      return "stroopTime";
    }
  })())({
    reflectSymbol: function() {
      return "stroopStimuli";
    }
  })())({
    reflectSymbol: function() {
      return "stroopErrors";
    }
  })())({
    reflectSymbol: function() {
      return "nonStroopTime";
    }
  })())({
    reflectSymbol: function() {
      return "nonStroopStimuli";
    }
  })())({
    reflectSymbol: function() {
      return "nonStroopErrors";
    }
  })())());
  var StroopInstructions = /* @__PURE__ */ function() {
    function StroopInstructions2() {
    }
    ;
    StroopInstructions2.value = new StroopInstructions2();
    return StroopInstructions2;
  }();
  var StroopTest = /* @__PURE__ */ function() {
    function StroopTest2() {
    }
    ;
    StroopTest2.value = new StroopTest2();
    return StroopTest2;
  }();
  var StroopDone = /* @__PURE__ */ function() {
    function StroopDone2() {
    }
    ;
    StroopDone2.value = new StroopDone2();
    return StroopDone2;
  }();
  var StroopDoneOut = /* @__PURE__ */ function() {
    function StroopDoneOut2() {
    }
    ;
    StroopDoneOut2.value = new StroopDoneOut2();
    return StroopDoneOut2;
  }();
  var StartTest2 = /* @__PURE__ */ function() {
    function StartTest3() {
    }
    ;
    StartTest3.value = new StartTest3();
    return StartTest3;
  }();
  var HandleKeyPress = /* @__PURE__ */ function() {
    function HandleKeyPress2(value0) {
      this.value0 = value0;
    }
    ;
    HandleKeyPress2.create = function(value0) {
      return new HandleKeyPress2(value0);
    };
    return HandleKeyPress2;
  }();
  var NextTrial = /* @__PURE__ */ function() {
    function NextTrial2() {
    }
    ;
    NextTrial2.value = new NextTrial2();
    return NextTrial2;
  }();
  var SubmitResults = /* @__PURE__ */ function() {
    function SubmitResults2() {
    }
    ;
    SubmitResults2.value = new SubmitResults2();
    return SubmitResults2;
  }();
  var wordsIndices = [2, 2, 1, 2, 1, 3, 2, 2, 1, 1, 3, 2, 1, 2, 3, 3, 3, 0, 0, 3, 2, 0, 2, 1, 2, 1, 0, 3, 0, 3, 0, 3, 1, 0, 0, 1, 0, 0, 3, 3];
  var words = ["Rojo", "Azul", "Verde", "Morado"];
  var unInst = function(instant) {
    var v = unInstant(instant);
    return v;
  };
  var initialState6 = function(v) {
    return {
      currentWord: "",
      currentColor: "",
      score: 0,
      totalTrials: 0,
      responded: false,
      showFeedback: false,
      feedbackMessage: "",
      stage: StroopInstructions.value,
      startTime: Nothing.value,
      stroopTime: 0,
      stroopStimuli: 0,
      nonStroopTime: 0,
      nonStroopStimuli: 0,
      stroopErrors: 0,
      nonStroopErrors: 0
    };
  };
  var firstLetter = function(str) {
    var v = charAt2(0)(str);
    if (v instanceof Just) {
      return toLower(singleton5(v.value0));
    }
    ;
    if (v instanceof Nothing) {
      return "";
    }
    ;
    throw new Error("Failed pattern match at Stroop (line 253, column 19 - line 255, column 16): " + [v.constructor.name]);
  };
  var colorsIndices = [0, 2, 1, 3, 2, 2, 2, 0, 1, 0, 3, 1, 0, 2, 3, 1, 3, 0, 2, 2, 2, 1, 2, 3, 0, 1, 0, 3, 0, 1, 0, 3, 3, 0, 2, 1, 1, 3, 1, 3];
  var handleAction4 = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var liftAff1 = liftAff(monadAffHalogenM(dictMonadAff));
    return function(v) {
      if (v instanceof StartTest2) {
        return discard7(modify_8(function(v1) {
          var $72 = {};
          for (var $73 in v1) {
            if ({}.hasOwnProperty.call(v1, $73)) {
              $72[$73] = v1[$73];
            }
            ;
          }
          ;
          $72.stage = StroopTest.value;
          return $72;
        }))(function() {
          return discard7(handleAction4(dictMonadAff)(NextTrial.value))(function() {
            return bind8(liftEffect7(windowImpl))(function(w) {
              return bind8(liftEffect7(document2(w)))(function(d) {
                return bind8(liftEffect7(getElementById("stroop-test")(toNonElementParentNode(toDocument(d)))))(function(mbElem) {
                  if (mbElem instanceof Just) {
                    var v1 = fromElement(mbElem.value0);
                    if (v1 instanceof Just) {
                      return liftEffect7(focus2(v1.value0));
                    }
                    ;
                    return pure9(unit);
                  }
                  ;
                  return pure9(unit);
                });
              });
            });
          });
        });
      }
      ;
      if (v instanceof HandleKeyPress) {
        return bind8(gets7(function(v1) {
          return v1.responded;
        }))(function(responded) {
          if (responded) {
            return pure9(unit);
          }
          ;
          return discard7(liftEffect7(preventDefault(toEvent3(v.value0))))(function() {
            var userInput = key(v.value0);
            var $80 = contains(userInput)("RAVMravm");
            if ($80) {
              return discard7(modify_8(function(v1) {
                var $81 = {};
                for (var $82 in v1) {
                  if ({}.hasOwnProperty.call(v1, $82)) {
                    $81[$82] = v1[$82];
                  }
                  ;
                }
                ;
                $81.responded = true;
                return $81;
              }))(function() {
                return bind8(get5)(function(state3) {
                  return bind8(liftEffect7(now))(function(currentTime2) {
                    var cTime = unInst(currentTime2);
                    var isStroop = state3.currentWord !== state3.currentColor;
                    var timeTaken = function() {
                      if (state3.startTime instanceof Just) {
                        return cTime - state3.startTime.value0;
                      }
                      ;
                      if (state3.startTime instanceof Nothing) {
                        return 0;
                      }
                      ;
                      throw new Error("Failed pattern match at Stroop (line 173, column 29 - line 175, column 45): " + [state3.startTime.constructor.name]);
                    }();
                    return discard7(function() {
                      var $86 = userInput === firstLetter(state3.currentColor);
                      if ($86) {
                        return modify_8(function(v1) {
                          var $91 = {};
                          for (var $92 in v1) {
                            if ({}.hasOwnProperty.call(v1, $92)) {
                              $91[$92] = v1[$92];
                            }
                            ;
                          }
                          ;
                          $91.score = state3.score + 1 | 0;
                          $91.totalTrials = state3.totalTrials + 1 | 0;
                          $91.showFeedback = true;
                          $91.feedbackMessage = "Correcto";
                          $91.stroopTime = function() {
                            if (isStroop) {
                              return state3.stroopTime + timeTaken;
                            }
                            ;
                            return state3.stroopTime;
                          }();
                          $91.stroopStimuli = function() {
                            if (isStroop) {
                              return state3.stroopStimuli + 1 | 0;
                            }
                            ;
                            return state3.stroopStimuli;
                          }();
                          $91.nonStroopTime = function() {
                            if (isStroop) {
                              return state3.nonStroopTime;
                            }
                            ;
                            return state3.nonStroopTime + timeTaken;
                          }();
                          $91.nonStroopStimuli = function() {
                            if (isStroop) {
                              return state3.nonStroopStimuli;
                            }
                            ;
                            return state3.nonStroopStimuli + 1 | 0;
                          }();
                          return $91;
                        });
                      }
                      ;
                      return modify_8(function(v1) {
                        var $98 = {};
                        for (var $99 in v1) {
                          if ({}.hasOwnProperty.call(v1, $99)) {
                            $98[$99] = v1[$99];
                          }
                          ;
                        }
                        ;
                        $98.totalTrials = state3.totalTrials + 1 | 0;
                        $98.showFeedback = true;
                        $98.feedbackMessage = "Incorrecto";
                        $98.stroopTime = function() {
                          if (isStroop) {
                            return state3.stroopTime + timeTaken;
                          }
                          ;
                          return state3.stroopTime;
                        }();
                        $98.nonStroopTime = function() {
                          if (isStroop) {
                            return state3.nonStroopTime;
                          }
                          ;
                          return state3.nonStroopTime + timeTaken;
                        }();
                        $98.stroopErrors = function() {
                          if (isStroop) {
                            return state3.stroopErrors + 1 | 0;
                          }
                          ;
                          return state3.stroopErrors;
                        }();
                        $98.nonStroopErrors = function() {
                          if (isStroop) {
                            return state3.nonStroopErrors;
                          }
                          ;
                          return state3.nonStroopErrors + 1 | 0;
                        }();
                        return $98;
                      });
                    }())(function() {
                      return discard7(liftAff1(liftAff2(delay(400))))(function() {
                        return handleAction4(dictMonadAff)(NextTrial.value);
                      });
                    });
                  });
                });
              });
            }
            ;
            return pure9(unit);
          });
        });
      }
      ;
      if (v instanceof NextTrial) {
        return bind8(get5)(function(state3) {
          var $102 = state3.totalTrials >= 40;
          if ($102) {
            return modify_8(function(v1) {
              var $103 = {};
              for (var $104 in v1) {
                if ({}.hasOwnProperty.call(v1, $104)) {
                  $103[$104] = v1[$104];
                }
                ;
              }
              ;
              $103.stage = StroopDone.value;
              return $103;
            });
          }
          ;
          var newWord = fromMaybe("Rojo")(index(words)(unsafeIndex2(wordsIndices)(state3.totalTrials)));
          var newColor = fromMaybe("Rojo")(index(words)(unsafeIndex2(colorsIndices)(state3.totalTrials)));
          return bind8(liftEffect7(now))(function(startTime) {
            return modify_8(function(v1) {
              var $106 = {};
              for (var $107 in v1) {
                if ({}.hasOwnProperty.call(v1, $107)) {
                  $106[$107] = v1[$107];
                }
                ;
              }
              ;
              $106.currentWord = newWord;
              $106.currentColor = newColor;
              $106.showFeedback = false;
              $106.startTime = new Just(unInst(startTime));
              $106.responded = false;
              return $106;
            });
          });
        });
      }
      ;
      if (v instanceof SubmitResults) {
        return bind8(get5)(function(state3) {
          var results = {
            stroopTime: state3.stroopTime,
            stroopStimuli: state3.stroopStimuli,
            nonStroopTime: state3.nonStroopTime,
            nonStroopStimuli: state3.nonStroopStimuli,
            stroopErrors: state3.stroopErrors,
            nonStroopErrors: state3.nonStroopErrors
          };
          return bind8(liftAff1(post2(ignore)("/stroop")(new Just(new Json(encodeJson5(results))))))(function(response) {
            if (response instanceof Left) {
              return raise(StroopDoneOut.value);
            }
            ;
            if (response instanceof Right) {
              return raise(StroopDoneOut.value);
            }
            ;
            throw new Error("Failed pattern match at Stroop (line 228, column 5 - line 230, column 39): " + [response.constructor.name]);
          });
        });
      }
      ;
      throw new Error("Failed pattern match at Stroop (line 145, column 16 - line 230, column 39): " + [v.constructor.name]);
    };
  };
  var colorFromName = function(v) {
    if (v === "Rojo") {
      return "#FF0000";
    }
    ;
    if (v === "Verde") {
      return "#00FF00";
    }
    ;
    if (v === "Azul") {
      return "#0000FF";
    }
    ;
    if (v === "Morado") {
      return "#8a2be2";
    }
    ;
    return "";
  };
  var render5 = function(state3) {
    if (state3.stage instanceof StroopInstructions) {
      return div2([class_("instructions-container")])([p_([text("En esta prueba ver\xE1s una serie de palabras de un color determinado.")]), p_([text("Deber\xE1s presionar en el teclado la letra inicial del color con la que est\xE1 escrita la palabra lo m\xE1s r\xE1pido posible.")]), p_([text("R para Rojo, A para Azul, V para Verde y M para morado.")]), button([onClick(function(v) {
        return StartTest2.value;
      })])([text("Comenzar prueba")])]);
    }
    ;
    if (state3.stage instanceof StroopTest) {
      return div2([class_("stroop-container"), id3("stroop-test"), onKeyDown(HandleKeyPress.create), tabIndex(0)])([div2([class_("stroop-word"), style("color: " + colorFromName(state3.currentColor))])([text(state3.currentWord)]), function() {
        if (state3.showFeedback) {
          return div2([class_("feedback")])([text(state3.feedbackMessage)]);
        }
        ;
        return text("");
      }()]);
    }
    ;
    if (state3.stage instanceof StroopDone) {
      return div2([class_("instructions-container")])([p_([text("Has concluido esta prueba")]), button([onClick(function(v) {
        return SubmitResults.value;
      })])([text("Siguiente")])]);
    }
    ;
    throw new Error("Failed pattern match at Stroop (line 106, column 16 - line 142, column 8): " + [state3.stage.constructor.name]);
  };
  var stroopComponent = function(dictMonadAff) {
    return mkComponent({
      initialState: initialState6,
      render: render5,
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: handleAction4(dictMonadAff)
      })
    });
  };

  // output/Coordinator/index.js
  var modify_9 = /* @__PURE__ */ modify_2(monadStateHalogenM);
  var discard8 = /* @__PURE__ */ discard(discardUnit)(bindHalogenM);
  var pure10 = /* @__PURE__ */ pure(applicativeHalogenM);
  var slot6 = /* @__PURE__ */ slot();
  var slot14 = /* @__PURE__ */ slot6({
    reflectSymbol: function() {
      return "questions";
    }
  })(ordInt);
  var slot25 = /* @__PURE__ */ slot6({
    reflectSymbol: function() {
      return "barrat";
    }
  })(ordInt);
  var slot33 = /* @__PURE__ */ slot6({
    reflectSymbol: function() {
      return "beck";
    }
  })(ordInt);
  var slot42 = /* @__PURE__ */ slot6({
    reflectSymbol: function() {
      return "wisconsin";
    }
  })(ordInt);
  var slot52 = /* @__PURE__ */ slot6({
    reflectSymbol: function() {
      return "goNoGo";
    }
  })(ordInt);
  var slot62 = /* @__PURE__ */ slot6({
    reflectSymbol: function() {
      return "stroop";
    }
  })(ordInt);
  var Questions = /* @__PURE__ */ function() {
    function Questions2() {
    }
    ;
    Questions2.value = new Questions2();
    return Questions2;
  }();
  var Barrat = /* @__PURE__ */ function() {
    function Barrat2() {
    }
    ;
    Barrat2.value = new Barrat2();
    return Barrat2;
  }();
  var Beck = /* @__PURE__ */ function() {
    function Beck2() {
    }
    ;
    Beck2.value = new Beck2();
    return Beck2;
  }();
  var Wisconsin = /* @__PURE__ */ function() {
    function Wisconsin2() {
    }
    ;
    Wisconsin2.value = new Wisconsin2();
    return Wisconsin2;
  }();
  var GoNoGo = /* @__PURE__ */ function() {
    function GoNoGo2() {
    }
    ;
    GoNoGo2.value = new GoNoGo2();
    return GoNoGo2;
  }();
  var Stroop = /* @__PURE__ */ function() {
    function Stroop2() {
    }
    ;
    Stroop2.value = new Stroop2();
    return Stroop2;
  }();
  var Ending = /* @__PURE__ */ function() {
    function Ending2() {
    }
    ;
    Ending2.value = new Ending2();
    return Ending2;
  }();
  var Void = /* @__PURE__ */ function() {
    function Void2() {
    }
    ;
    Void2.value = new Void2();
    return Void2;
  }();
  var HandleQuestions = /* @__PURE__ */ function() {
    function HandleQuestions2(value0) {
      this.value0 = value0;
    }
    ;
    HandleQuestions2.create = function(value0) {
      return new HandleQuestions2(value0);
    };
    return HandleQuestions2;
  }();
  var HandleBarrat = /* @__PURE__ */ function() {
    function HandleBarrat2(value0) {
      this.value0 = value0;
    }
    ;
    HandleBarrat2.create = function(value0) {
      return new HandleBarrat2(value0);
    };
    return HandleBarrat2;
  }();
  var HandleBeck = /* @__PURE__ */ function() {
    function HandleBeck2(value0) {
      this.value0 = value0;
    }
    ;
    HandleBeck2.create = function(value0) {
      return new HandleBeck2(value0);
    };
    return HandleBeck2;
  }();
  var HandleWisconsin = /* @__PURE__ */ function() {
    function HandleWisconsin2(value0) {
      this.value0 = value0;
    }
    ;
    HandleWisconsin2.create = function(value0) {
      return new HandleWisconsin2(value0);
    };
    return HandleWisconsin2;
  }();
  var HandleGoNoGo = /* @__PURE__ */ function() {
    function HandleGoNoGo2(value0) {
      this.value0 = value0;
    }
    ;
    HandleGoNoGo2.create = function(value0) {
      return new HandleGoNoGo2(value0);
    };
    return HandleGoNoGo2;
  }();
  var HandleStroop = /* @__PURE__ */ function() {
    function HandleStroop2(value0) {
      this.value0 = value0;
    }
    ;
    HandleStroop2.create = function(value0) {
      return new HandleStroop2(value0);
    };
    return HandleStroop2;
  }();
  var stageFromMbStr = function(v) {
    if (v instanceof Nothing) {
      return Questions.value;
    }
    ;
    if (v instanceof Just) {
      if (v.value0 === "barrat") {
        return Barrat.value;
      }
      ;
      if (v.value0 === "beck") {
        return Beck.value;
      }
      ;
      if (v.value0 === "wisconsin") {
        return Wisconsin.value;
      }
      ;
      if (v.value0 === "gonogo") {
        return GoNoGo.value;
      }
      ;
      if (v.value0 === "stroop") {
        return Stroop.value;
      }
      ;
      if (v.value0 === "void") {
        return Void.value;
      }
      ;
      if (v.value0 === "ending") {
        return Ending.value;
      }
      ;
      return Questions.value;
    }
    ;
    throw new Error("Failed pattern match at Coordinator (line 33, column 1 - line 33, column 40): " + [v.constructor.name]);
  };
  var initialState7 = function(stage) {
    return {
      currentStage: stage
    };
  };
  var fadeToStage = function(dictMonadAff) {
    return function(nextStage) {
      return modify_9(function(s) {
        var $49 = {};
        for (var $50 in s) {
          if ({}.hasOwnProperty.call(s, $50)) {
            $49[$50] = s[$50];
          }
          ;
        }
        ;
        $49.currentStage = nextStage;
        return $49;
      });
    };
  };
  var mainHandler2 = function(dictMonadAff) {
    var liftEffect7 = liftEffect(monadEffectHalogenM(dictMonadAff.MonadEffect0()));
    var fadeToStage1 = fadeToStage(dictMonadAff);
    return function(action2) {
      if (action2 instanceof HandleQuestions && action2.value0 instanceof Submitted) {
        return discard8(liftEffect7(setStageCookie("barrat")))(function() {
          return fadeToStage1(Barrat.value);
        });
      }
      ;
      if (action2 instanceof HandleQuestions && action2.value0 instanceof BadCodes) {
        return discard8(liftEffect7(setStageCookie("void")))(function() {
          return fadeToStage1(Void.value);
        });
      }
      ;
      if (action2 instanceof HandleBarrat) {
        return discard8(liftEffect7(setStageCookie("beck")))(function() {
          return fadeToStage1(Beck.value);
        });
      }
      ;
      if (action2 instanceof HandleBeck) {
        return discard8(liftEffect7(setStageCookie("wisconsin")))(function() {
          return fadeToStage1(Wisconsin.value);
        });
      }
      ;
      if (action2 instanceof HandleWisconsin) {
        return discard8(liftEffect7(setStageCookie("gonogo")))(function() {
          return fadeToStage1(GoNoGo.value);
        });
      }
      ;
      if (action2 instanceof HandleGoNoGo) {
        return discard8(liftEffect7(setStageCookie("stroop")))(function() {
          return fadeToStage1(Stroop.value);
        });
      }
      ;
      if (action2 instanceof HandleStroop) {
        return discard8(liftEffect7(setStageCookie("ending")))(function() {
          return fadeToStage1(Ending.value);
        });
      }
      ;
      return pure10(unit);
    };
  };
  var ending = function(dictMonadAff) {
    return div2([class_("ending-container")])([img([src2("public/gracias.jpeg"), style("width: 50vw;")]), br_, h2_([text("Has finalizado toda la prueba, agradecemos tu participaci\xF3n.")])]);
  };
  var _wisconsin = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _stroop = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _questions = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _goNoGo = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _beck = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var _barrat = /* @__PURE__ */ function() {
    return $$Proxy.value;
  }();
  var renderCurrent = function(dictMonadAff) {
    var questionsComponent2 = questionsComponent(dictMonadAff);
    var barratComponent2 = barratComponent(dictMonadAff);
    var mainComponent1 = mainComponent(dictMonadAff);
    var mainComponent22 = mainComponent2(dictMonadAff);
    var component2 = component(dictMonadAff);
    var stroopComponent2 = stroopComponent(dictMonadAff);
    var ending1 = ending(dictMonadAff);
    return function(stage) {
      return div2([class_("fade-in")])([function() {
        if (stage instanceof Questions) {
          return slot14(_questions)(0)(questionsComponent2)(unit)(HandleQuestions.create);
        }
        ;
        if (stage instanceof Barrat) {
          return slot25(_barrat)(1)(barratComponent2)(unit)(HandleBarrat.create);
        }
        ;
        if (stage instanceof Beck) {
          return slot33(_beck)(2)(mainComponent1)(unit)(HandleBeck.create);
        }
        ;
        if (stage instanceof Wisconsin) {
          return slot42(_wisconsin)(3)(mainComponent22)(unit)(HandleWisconsin.create);
        }
        ;
        if (stage instanceof GoNoGo) {
          return slot52(_goNoGo)(4)(component2)(unit)(HandleGoNoGo.create);
        }
        ;
        if (stage instanceof Stroop) {
          return slot62(_stroop)(5)(stroopComponent2)(unit)(HandleStroop.create);
        }
        ;
        if (stage instanceof Ending) {
          return ending1;
        }
        ;
        if (stage instanceof Void) {
          return text("");
        }
        ;
        throw new Error("Failed pattern match at Coordinator (line 97, column 7 - line 105, column 27): " + [stage.constructor.name]);
      }()]);
    };
  };
  var render6 = function(dictMonadAff) {
    var renderCurrent1 = renderCurrent(dictMonadAff);
    return function(state3) {
      return div2([class_("coordinator-container")])([div2([class_("stage-container")])([renderCurrent1(state3.currentStage)])]);
    };
  };
  var mainComponent3 = function(dictMonadAff) {
    return mkComponent({
      initialState: initialState7,
      render: render6(dictMonadAff),
      "eval": mkEval({
        handleQuery: defaultEval.handleQuery,
        receive: defaultEval.receive,
        initialize: defaultEval.initialize,
        finalize: defaultEval.finalize,
        handleAction: mainHandler2(dictMonadAff)
      })
    });
  };

  // output/Halogen.Aff.Util/index.js
  var bind9 = /* @__PURE__ */ bind(bindAff);
  var liftEffect3 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var bindFlipped6 = /* @__PURE__ */ bindFlipped(bindEffect);
  var composeKleisliFlipped4 = /* @__PURE__ */ composeKleisliFlipped(bindEffect);
  var pure11 = /* @__PURE__ */ pure(applicativeAff);
  var bindFlipped1 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var pure14 = /* @__PURE__ */ pure(applicativeEffect);
  var map21 = /* @__PURE__ */ map(functorEffect);
  var discard9 = /* @__PURE__ */ discard(discardUnit);
  var throwError2 = /* @__PURE__ */ throwError(monadThrowAff);
  var selectElement = function(query2) {
    return bind9(liftEffect3(bindFlipped6(composeKleisliFlipped4(function() {
      var $16 = querySelector(query2);
      return function($17) {
        return $16(toParentNode($17));
      };
    }())(document2))(windowImpl)))(function(mel) {
      return pure11(bindFlipped1(fromElement)(mel));
    });
  };
  var runHalogenAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure14(unit))));
  var awaitLoad = /* @__PURE__ */ makeAff(function(callback) {
    return function __do4() {
      var rs = bindFlipped6(readyState)(bindFlipped6(document2)(windowImpl))();
      if (rs instanceof Loading) {
        var et = map21(toEventTarget)(windowImpl)();
        var listener = eventListener(function(v) {
          return callback(new Right(unit));
        })();
        addEventListener2(domcontentloaded)(listener)(false)(et)();
        return effectCanceler(removeEventListener2(domcontentloaded)(listener)(false)(et));
      }
      ;
      callback(new Right(unit))();
      return nonCanceler;
    };
  });
  var awaitBody = /* @__PURE__ */ discard9(bindAff)(awaitLoad)(function() {
    return bind9(selectElement("body"))(function(body2) {
      return maybe(throwError2(error("Could not find body")))(pure11)(body2);
    });
  });

  // output/Control.Monad.Fork.Class/index.js
  var monadForkAff = {
    suspend: suspendAff,
    fork: forkAff,
    join: joinFiber,
    Monad0: function() {
      return monadAff;
    },
    Functor1: function() {
      return functorFiber;
    }
  };
  var fork = function(dict) {
    return dict.fork;
  };

  // output/Halogen.Aff.Driver.State/index.js
  var unRenderStateX = unsafeCoerce2;
  var unDriverStateX = unsafeCoerce2;
  var renderStateX_ = function(dictApplicative) {
    var traverse_8 = traverse_(dictApplicative)(foldableMaybe);
    return function(f) {
      return unDriverStateX(function(st) {
        return traverse_8(f)(st.rendering);
      });
    };
  };
  var mkRenderStateX = unsafeCoerce2;
  var renderStateX = function(dictFunctor) {
    return function(f) {
      return unDriverStateX(function(st) {
        return mkRenderStateX(f(st.rendering));
      });
    };
  };
  var mkDriverStateXRef = unsafeCoerce2;
  var mapDriverState = function(f) {
    return function(v) {
      return f(v);
    };
  };
  var initDriverState = function(component2) {
    return function(input3) {
      return function(handler3) {
        return function(lchs) {
          return function __do4() {
            var selfRef = $$new({})();
            var childrenIn = $$new(empty4)();
            var childrenOut = $$new(empty4)();
            var handlerRef = $$new(handler3)();
            var pendingQueries = $$new(new Just(Nil.value))();
            var pendingOuts = $$new(new Just(Nil.value))();
            var pendingHandlers = $$new(Nothing.value)();
            var fresh2 = $$new(1)();
            var subscriptions = $$new(new Just(empty3))();
            var forks = $$new(empty3)();
            var ds = {
              component: component2,
              state: component2.initialState(input3),
              refs: empty3,
              children: empty4,
              childrenIn,
              childrenOut,
              selfRef,
              handlerRef,
              pendingQueries,
              pendingOuts,
              pendingHandlers,
              rendering: Nothing.value,
              fresh: fresh2,
              subscriptions,
              forks,
              lifecycleHandlers: lchs
            };
            write(ds)(selfRef)();
            return mkDriverStateXRef(selfRef);
          };
        };
      };
    };
  };

  // output/Halogen.Aff.Driver.Eval/index.js
  var traverse_5 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var bindFlipped7 = /* @__PURE__ */ bindFlipped(bindMaybe);
  var lookup5 = /* @__PURE__ */ lookup2(ordSubscriptionId);
  var bind13 = /* @__PURE__ */ bind(bindAff);
  var liftEffect4 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var discard10 = /* @__PURE__ */ discard(discardUnit);
  var discard1 = /* @__PURE__ */ discard10(bindAff);
  var traverse_12 = /* @__PURE__ */ traverse_(applicativeAff);
  var traverse_22 = /* @__PURE__ */ traverse_12(foldableList);
  var fork3 = /* @__PURE__ */ fork(monadForkAff);
  var parSequence_2 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var pure15 = /* @__PURE__ */ pure(applicativeAff);
  var map22 = /* @__PURE__ */ map(functorCoyoneda);
  var parallel3 = /* @__PURE__ */ parallel(parallelAff);
  var map110 = /* @__PURE__ */ map(functorAff);
  var sequential2 = /* @__PURE__ */ sequential(parallelAff);
  var map23 = /* @__PURE__ */ map(functorMaybe);
  var insert6 = /* @__PURE__ */ insert2(ordSubscriptionId);
  var retractFreeAp2 = /* @__PURE__ */ retractFreeAp(applicativeParAff);
  var $$delete4 = /* @__PURE__ */ $$delete2(ordForkId);
  var unlessM2 = /* @__PURE__ */ unlessM(monadEffect);
  var insert12 = /* @__PURE__ */ insert2(ordForkId);
  var traverse_32 = /* @__PURE__ */ traverse_12(foldableMaybe);
  var lookup12 = /* @__PURE__ */ lookup2(ordForkId);
  var lookup22 = /* @__PURE__ */ lookup2(ordString);
  var foldFree2 = /* @__PURE__ */ foldFree(monadRecAff);
  var alter2 = /* @__PURE__ */ alter(ordString);
  var unsubscribe3 = function(sid) {
    return function(ref2) {
      return function __do4() {
        var v = read(ref2)();
        var subs = read(v.subscriptions)();
        return traverse_5(unsubscribe)(bindFlipped7(lookup5(sid))(subs))();
      };
    };
  };
  var queueOrRun = function(ref2) {
    return function(au) {
      return bind13(liftEffect4(read(ref2)))(function(v) {
        if (v instanceof Nothing) {
          return au;
        }
        ;
        if (v instanceof Just) {
          return liftEffect4(write(new Just(new Cons(au, v.value0)))(ref2));
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 188, column 33 - line 190, column 57): " + [v.constructor.name]);
      });
    };
  };
  var handleLifecycle = function(lchs) {
    return function(f) {
      return discard1(liftEffect4(write({
        initializers: Nil.value,
        finalizers: Nil.value
      })(lchs)))(function() {
        return bind13(liftEffect4(f))(function(result) {
          return bind13(liftEffect4(read(lchs)))(function(v) {
            return discard1(traverse_22(fork3)(v.finalizers))(function() {
              return discard1(parSequence_2(v.initializers))(function() {
                return pure15(result);
              });
            });
          });
        });
      });
    };
  };
  var handleAff = /* @__PURE__ */ runAff_(/* @__PURE__ */ either(throwException)(/* @__PURE__ */ $$const(/* @__PURE__ */ pure(applicativeEffect)(unit))));
  var fresh = function(f) {
    return function(ref2) {
      return bind13(liftEffect4(read(ref2)))(function(v) {
        return liftEffect4(modify$prime(function(i2) {
          return {
            state: i2 + 1 | 0,
            value: f(i2)
          };
        })(v.fresh));
      });
    };
  };
  var evalQ = function(render7) {
    return function(ref2) {
      return function(q2) {
        return bind13(liftEffect4(read(ref2)))(function(v) {
          return evalM(render7)(ref2)(v["component"]["eval"](new Query(map22(Just.create)(liftCoyoneda(q2)), $$const(Nothing.value))));
        });
      };
    };
  };
  var evalM = function(render7) {
    return function(initRef) {
      return function(v) {
        var evalChildQuery = function(ref2) {
          return function(cqb) {
            return bind13(liftEffect4(read(ref2)))(function(v1) {
              return unChildQueryBox(function(v2) {
                var evalChild = function(v3) {
                  return parallel3(bind13(liftEffect4(read(v3)))(function(dsx) {
                    return unDriverStateX(function(ds) {
                      return evalQ(render7)(ds.selfRef)(v2.value1);
                    })(dsx);
                  }));
                };
                return map110(v2.value2)(sequential2(v2.value0(applicativeParAff)(evalChild)(v1.children)));
              })(cqb);
            });
          };
        };
        var go2 = function(ref2) {
          return function(v1) {
            if (v1 instanceof State) {
              return bind13(liftEffect4(read(ref2)))(function(v2) {
                var v3 = v1.value0(v2.state);
                if (unsafeRefEq(v2.state)(v3.value1)) {
                  return pure15(v3.value0);
                }
                ;
                if (otherwise) {
                  return discard1(liftEffect4(write({
                    component: v2.component,
                    refs: v2.refs,
                    children: v2.children,
                    childrenIn: v2.childrenIn,
                    childrenOut: v2.childrenOut,
                    selfRef: v2.selfRef,
                    handlerRef: v2.handlerRef,
                    pendingQueries: v2.pendingQueries,
                    pendingOuts: v2.pendingOuts,
                    pendingHandlers: v2.pendingHandlers,
                    rendering: v2.rendering,
                    fresh: v2.fresh,
                    subscriptions: v2.subscriptions,
                    forks: v2.forks,
                    lifecycleHandlers: v2.lifecycleHandlers,
                    state: v3.value1
                  })(ref2)))(function() {
                    return discard1(handleLifecycle(v2.lifecycleHandlers)(render7(v2.lifecycleHandlers)(ref2)))(function() {
                      return pure15(v3.value0);
                    });
                  });
                }
                ;
                throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 86, column 7 - line 92, column 21): " + [v3.constructor.name]);
              });
            }
            ;
            if (v1 instanceof Subscribe) {
              return bind13(fresh(SubscriptionId)(ref2))(function(sid) {
                return bind13(liftEffect4(subscribe(v1.value0(sid))(function(act) {
                  return handleAff(evalF(render7)(ref2)(new Action(act)));
                })))(function(finalize) {
                  return bind13(liftEffect4(read(ref2)))(function(v2) {
                    return discard1(liftEffect4(modify_(map23(insert6(sid)(finalize)))(v2.subscriptions)))(function() {
                      return pure15(v1.value1(sid));
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Unsubscribe) {
              return discard1(liftEffect4(unsubscribe3(v1.value0)(ref2)))(function() {
                return pure15(v1.value1);
              });
            }
            ;
            if (v1 instanceof Lift2) {
              return v1.value0;
            }
            ;
            if (v1 instanceof ChildQuery2) {
              return evalChildQuery(ref2)(v1.value0);
            }
            ;
            if (v1 instanceof Raise) {
              return bind13(liftEffect4(read(ref2)))(function(v2) {
                return bind13(liftEffect4(read(v2.handlerRef)))(function(handler3) {
                  return discard1(queueOrRun(v2.pendingOuts)(handler3(v1.value0)))(function() {
                    return pure15(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Par) {
              return sequential2(retractFreeAp2(hoistFreeAp(function() {
                var $119 = evalM(render7)(ref2);
                return function($120) {
                  return parallel3($119($120));
                };
              }())(v1.value0)));
            }
            ;
            if (v1 instanceof Fork) {
              return bind13(fresh(ForkId)(ref2))(function(fid) {
                return bind13(liftEffect4(read(ref2)))(function(v2) {
                  return bind13(liftEffect4($$new(false)))(function(doneRef) {
                    return bind13(fork3($$finally(liftEffect4(function __do4() {
                      modify_($$delete4(fid))(v2.forks)();
                      return write(true)(doneRef)();
                    }))(evalM(render7)(ref2)(v1.value0))))(function(fiber) {
                      return discard1(liftEffect4(unlessM2(read(doneRef))(modify_(insert12(fid)(fiber))(v2.forks))))(function() {
                        return pure15(v1.value1(fid));
                      });
                    });
                  });
                });
              });
            }
            ;
            if (v1 instanceof Join) {
              return bind13(liftEffect4(read(ref2)))(function(v2) {
                return bind13(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(joinFiber)(lookup12(v1.value0)(forkMap)))(function() {
                    return pure15(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof Kill) {
              return bind13(liftEffect4(read(ref2)))(function(v2) {
                return bind13(liftEffect4(read(v2.forks)))(function(forkMap) {
                  return discard1(traverse_32(killFiber(error("Cancelled")))(lookup12(v1.value0)(forkMap)))(function() {
                    return pure15(v1.value1);
                  });
                });
              });
            }
            ;
            if (v1 instanceof GetRef) {
              return bind13(liftEffect4(read(ref2)))(function(v2) {
                return pure15(v1.value1(lookup22(v1.value0)(v2.refs)));
              });
            }
            ;
            throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 83, column 12 - line 139, column 33): " + [v1.constructor.name]);
          };
        };
        return foldFree2(go2(initRef))(v);
      };
    };
  };
  var evalF = function(render7) {
    return function(ref2) {
      return function(v) {
        if (v instanceof RefUpdate) {
          return liftEffect4(flip(modify_)(ref2)(mapDriverState(function(st) {
            return {
              component: st.component,
              state: st.state,
              children: st.children,
              childrenIn: st.childrenIn,
              childrenOut: st.childrenOut,
              selfRef: st.selfRef,
              handlerRef: st.handlerRef,
              pendingQueries: st.pendingQueries,
              pendingOuts: st.pendingOuts,
              pendingHandlers: st.pendingHandlers,
              rendering: st.rendering,
              fresh: st.fresh,
              subscriptions: st.subscriptions,
              forks: st.forks,
              lifecycleHandlers: st.lifecycleHandlers,
              refs: alter2($$const(v.value1))(v.value0)(st.refs)
            };
          })));
        }
        ;
        if (v instanceof Action) {
          return bind13(liftEffect4(read(ref2)))(function(v1) {
            return evalM(render7)(ref2)(v1["component"]["eval"](new Action2(v.value0, unit)));
          });
        }
        ;
        throw new Error("Failed pattern match at Halogen.Aff.Driver.Eval (line 52, column 20 - line 58, column 62): " + [v.constructor.name]);
      };
    };
  };

  // output/Halogen.Aff.Driver/index.js
  var bind10 = /* @__PURE__ */ bind(bindEffect);
  var discard11 = /* @__PURE__ */ discard(discardUnit);
  var for_2 = /* @__PURE__ */ for_(applicativeEffect)(foldableMaybe);
  var traverse_6 = /* @__PURE__ */ traverse_(applicativeAff)(foldableList);
  var fork4 = /* @__PURE__ */ fork(monadForkAff);
  var bindFlipped8 = /* @__PURE__ */ bindFlipped(bindEffect);
  var traverse_13 = /* @__PURE__ */ traverse_(applicativeEffect);
  var traverse_23 = /* @__PURE__ */ traverse_13(foldableMaybe);
  var traverse_33 = /* @__PURE__ */ traverse_13(foldableMap);
  var discard22 = /* @__PURE__ */ discard11(bindAff);
  var parSequence_3 = /* @__PURE__ */ parSequence_(parallelAff)(applicativeParAff)(foldableList);
  var liftEffect5 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var pure16 = /* @__PURE__ */ pure(applicativeEffect);
  var map24 = /* @__PURE__ */ map(functorEffect);
  var pure17 = /* @__PURE__ */ pure(applicativeAff);
  var when3 = /* @__PURE__ */ when(applicativeEffect);
  var renderStateX2 = /* @__PURE__ */ renderStateX(functorEffect);
  var $$void5 = /* @__PURE__ */ $$void(functorAff);
  var foreachSlot2 = /* @__PURE__ */ foreachSlot(applicativeEffect);
  var renderStateX_2 = /* @__PURE__ */ renderStateX_(applicativeEffect);
  var tailRecM3 = /* @__PURE__ */ tailRecM(monadRecEffect);
  var voidLeft3 = /* @__PURE__ */ voidLeft(functorEffect);
  var bind14 = /* @__PURE__ */ bind(bindAff);
  var liftEffect1 = /* @__PURE__ */ liftEffect(monadEffectEffect);
  var newLifecycleHandlers = /* @__PURE__ */ function() {
    return $$new({
      initializers: Nil.value,
      finalizers: Nil.value
    });
  }();
  var handlePending = function(ref2) {
    return function __do4() {
      var queue = read(ref2)();
      write(Nothing.value)(ref2)();
      return for_2(queue)(function() {
        var $59 = traverse_6(fork4);
        return function($60) {
          return handleAff($59(reverse2($60)));
        };
      }())();
    };
  };
  var cleanupSubscriptionsAndForks = function(v) {
    return function __do4() {
      bindFlipped8(traverse_23(traverse_33(unsubscribe)))(read(v.subscriptions))();
      write(Nothing.value)(v.subscriptions)();
      bindFlipped8(traverse_33(function() {
        var $61 = killFiber(error("finalized"));
        return function($62) {
          return handleAff($61($62));
        };
      }()))(read(v.forks))();
      return write(empty3)(v.forks)();
    };
  };
  var runUI = function(renderSpec2) {
    return function(component2) {
      return function(i2) {
        var squashChildInitializers = function(lchs) {
          return function(preInits) {
            return unDriverStateX(function(st) {
              var parentInitializer = evalM(render7)(st.selfRef)(st["component"]["eval"](new Initialize(unit)));
              return modify_(function(handlers) {
                return {
                  initializers: new Cons(discard22(parSequence_3(reverse2(handlers.initializers)))(function() {
                    return discard22(parentInitializer)(function() {
                      return liftEffect5(function __do4() {
                        handlePending(st.pendingQueries)();
                        return handlePending(st.pendingOuts)();
                      });
                    });
                  }), preInits),
                  finalizers: handlers.finalizers
                };
              })(lchs);
            });
          };
        };
        var runComponent = function(lchs) {
          return function(handler3) {
            return function(j) {
              return unComponent(function(c) {
                return function __do4() {
                  var lchs$prime = newLifecycleHandlers();
                  var $$var2 = initDriverState(c)(j)(handler3)(lchs$prime)();
                  var pre2 = read(lchs)();
                  write({
                    initializers: Nil.value,
                    finalizers: pre2.finalizers
                  })(lchs)();
                  bindFlipped8(unDriverStateX(function() {
                    var $63 = render7(lchs);
                    return function($64) {
                      return $63(function(v) {
                        return v.selfRef;
                      }($64));
                    };
                  }()))(read($$var2))();
                  bindFlipped8(squashChildInitializers(lchs)(pre2.initializers))(read($$var2))();
                  return $$var2;
                };
              });
            };
          };
        };
        var renderChild = function(lchs) {
          return function(handler3) {
            return function(childrenInRef) {
              return function(childrenOutRef) {
                return unComponentSlot(function(slot7) {
                  return function __do4() {
                    var childrenIn = map24(slot7.pop)(read(childrenInRef))();
                    var $$var2 = function() {
                      if (childrenIn instanceof Just) {
                        write(childrenIn.value0.value1)(childrenInRef)();
                        var dsx = read(childrenIn.value0.value0)();
                        unDriverStateX(function(st) {
                          return function __do5() {
                            flip(write)(st.handlerRef)(function() {
                              var $65 = maybe(pure17(unit))(handler3);
                              return function($66) {
                                return $65(slot7.output($66));
                              };
                            }())();
                            return handleAff(evalM(render7)(st.selfRef)(st["component"]["eval"](new Receive(slot7.input, unit))))();
                          };
                        })(dsx)();
                        return childrenIn.value0.value0;
                      }
                      ;
                      if (childrenIn instanceof Nothing) {
                        return runComponent(lchs)(function() {
                          var $67 = maybe(pure17(unit))(handler3);
                          return function($68) {
                            return $67(slot7.output($68));
                          };
                        }())(slot7.input)(slot7.component)();
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 213, column 14 - line 222, column 98): " + [childrenIn.constructor.name]);
                    }();
                    var isDuplicate = map24(function($69) {
                      return isJust(slot7.get($69));
                    })(read(childrenOutRef))();
                    when3(isDuplicate)(warn("Halogen: Duplicate slot address was detected during rendering, unexpected results may occur"))();
                    modify_(slot7.set($$var2))(childrenOutRef)();
                    return bind10(read($$var2))(renderStateX2(function(v) {
                      if (v instanceof Nothing) {
                        return $$throw("Halogen internal error: child was not initialized in renderChild");
                      }
                      ;
                      if (v instanceof Just) {
                        return pure16(renderSpec2.renderChild(v.value0));
                      }
                      ;
                      throw new Error("Failed pattern match at Halogen.Aff.Driver (line 227, column 37 - line 229, column 50): " + [v.constructor.name]);
                    }))();
                  };
                });
              };
            };
          };
        };
        var render7 = function(lchs) {
          return function($$var2) {
            return function __do4() {
              var v = read($$var2)();
              var shouldProcessHandlers = map24(isNothing)(read(v.pendingHandlers))();
              when3(shouldProcessHandlers)(write(new Just(Nil.value))(v.pendingHandlers))();
              write(empty4)(v.childrenOut)();
              write(v.children)(v.childrenIn)();
              var handler3 = function() {
                var $70 = queueOrRun(v.pendingHandlers);
                var $71 = evalF(render7)(v.selfRef);
                return function($72) {
                  return $70($$void5($71($72)));
                };
              }();
              var childHandler = function() {
                var $73 = queueOrRun(v.pendingQueries);
                return function($74) {
                  return $73(handler3(Action.create($74)));
                };
              }();
              var rendering = renderSpec2.render(function($75) {
                return handleAff(handler3($75));
              })(renderChild(lchs)(childHandler)(v.childrenIn)(v.childrenOut))(v.component.render(v.state))(v.rendering)();
              var children2 = read(v.childrenOut)();
              var childrenIn = read(v.childrenIn)();
              foreachSlot2(childrenIn)(function(v1) {
                return function __do5() {
                  var childDS = read(v1)();
                  renderStateX_2(renderSpec2.removeChild)(childDS)();
                  return finalize(lchs)(childDS)();
                };
              })();
              flip(modify_)(v.selfRef)(mapDriverState(function(ds$prime) {
                return {
                  component: ds$prime.component,
                  state: ds$prime.state,
                  refs: ds$prime.refs,
                  childrenIn: ds$prime.childrenIn,
                  childrenOut: ds$prime.childrenOut,
                  selfRef: ds$prime.selfRef,
                  handlerRef: ds$prime.handlerRef,
                  pendingQueries: ds$prime.pendingQueries,
                  pendingOuts: ds$prime.pendingOuts,
                  pendingHandlers: ds$prime.pendingHandlers,
                  fresh: ds$prime.fresh,
                  subscriptions: ds$prime.subscriptions,
                  forks: ds$prime.forks,
                  lifecycleHandlers: ds$prime.lifecycleHandlers,
                  rendering: new Just(rendering),
                  children: children2
                };
              }))();
              return when3(shouldProcessHandlers)(flip(tailRecM3)(unit)(function(v1) {
                return function __do5() {
                  var handlers = read(v.pendingHandlers)();
                  write(new Just(Nil.value))(v.pendingHandlers)();
                  traverse_23(function() {
                    var $76 = traverse_6(fork4);
                    return function($77) {
                      return handleAff($76(reverse2($77)));
                    };
                  }())(handlers)();
                  var mmore = read(v.pendingHandlers)();
                  var $52 = maybe(false)($$null)(mmore);
                  if ($52) {
                    return voidLeft3(write(Nothing.value)(v.pendingHandlers))(new Done(unit))();
                  }
                  ;
                  return new Loop(unit);
                };
              }))();
            };
          };
        };
        var finalize = function(lchs) {
          return unDriverStateX(function(st) {
            return function __do4() {
              cleanupSubscriptionsAndForks(st)();
              var f = evalM(render7)(st.selfRef)(st["component"]["eval"](new Finalize(unit)));
              modify_(function(handlers) {
                return {
                  initializers: handlers.initializers,
                  finalizers: new Cons(f, handlers.finalizers)
                };
              })(lchs)();
              return foreachSlot2(st.children)(function(v) {
                return function __do5() {
                  var dsx = read(v)();
                  return finalize(lchs)(dsx)();
                };
              })();
            };
          });
        };
        var evalDriver = function(disposed) {
          return function(ref2) {
            return function(q2) {
              return bind14(liftEffect5(read(disposed)))(function(v) {
                if (v) {
                  return pure17(Nothing.value);
                }
                ;
                return evalQ(render7)(ref2)(q2);
              });
            };
          };
        };
        var dispose = function(disposed) {
          return function(lchs) {
            return function(dsx) {
              return handleLifecycle(lchs)(function __do4() {
                var v = read(disposed)();
                if (v) {
                  return unit;
                }
                ;
                write(true)(disposed)();
                finalize(lchs)(dsx)();
                return unDriverStateX(function(v1) {
                  return function __do5() {
                    var v2 = liftEffect1(read(v1.selfRef))();
                    return for_2(v2.rendering)(renderSpec2.dispose)();
                  };
                })(dsx)();
              });
            };
          };
        };
        return bind14(liftEffect5(newLifecycleHandlers))(function(lchs) {
          return bind14(liftEffect5($$new(false)))(function(disposed) {
            return handleLifecycle(lchs)(function __do4() {
              var sio = create();
              var dsx = bindFlipped8(read)(runComponent(lchs)(function() {
                var $78 = notify(sio.listener);
                return function($79) {
                  return liftEffect5($78($79));
                };
              }())(i2)(component2))();
              return unDriverStateX(function(st) {
                return pure16({
                  query: evalDriver(disposed)(st.selfRef),
                  messages: sio.emitter,
                  dispose: dispose(disposed)(lchs)(dsx)
                });
              })(dsx)();
            });
          });
        });
      };
    };
  };

  // output/Web.DOM.Node/foreign.js
  var getEffProp3 = function(name17) {
    return function(node) {
      return function() {
        return node[name17];
      };
    };
  };
  var baseURI = getEffProp3("baseURI");
  var _ownerDocument = getEffProp3("ownerDocument");
  var _parentNode = getEffProp3("parentNode");
  var _parentElement = getEffProp3("parentElement");
  var childNodes = getEffProp3("childNodes");
  var _firstChild = getEffProp3("firstChild");
  var _lastChild = getEffProp3("lastChild");
  var _previousSibling = getEffProp3("previousSibling");
  var _nextSibling = getEffProp3("nextSibling");
  var _nodeValue = getEffProp3("nodeValue");
  var textContent = getEffProp3("textContent");
  function insertBefore(node1) {
    return function(node2) {
      return function(parent2) {
        return function() {
          parent2.insertBefore(node1, node2);
        };
      };
    };
  }
  function appendChild(node) {
    return function(parent2) {
      return function() {
        parent2.appendChild(node);
      };
    };
  }
  function removeChild2(node) {
    return function(parent2) {
      return function() {
        parent2.removeChild(node);
      };
    };
  }

  // output/Web.DOM.Node/index.js
  var map25 = /* @__PURE__ */ map(functorEffect);
  var parentNode2 = /* @__PURE__ */ function() {
    var $6 = map25(toMaybe);
    return function($7) {
      return $6(_parentNode($7));
    };
  }();
  var nextSibling = /* @__PURE__ */ function() {
    var $15 = map25(toMaybe);
    return function($16) {
      return $15(_nextSibling($16));
    };
  }();

  // output/Halogen.VDom.Driver/index.js
  var $runtime_lazy9 = function(name17, moduleName, init3) {
    var state3 = 0;
    var val;
    return function(lineNumber) {
      if (state3 === 2) return val;
      if (state3 === 1) throw new ReferenceError(name17 + " was needed before it finished initializing (module " + moduleName + ", line " + lineNumber + ")", moduleName, lineNumber);
      state3 = 1;
      val = init3();
      state3 = 2;
      return val;
    };
  };
  var $$void6 = /* @__PURE__ */ $$void(functorEffect);
  var pure18 = /* @__PURE__ */ pure(applicativeEffect);
  var traverse_7 = /* @__PURE__ */ traverse_(applicativeEffect)(foldableMaybe);
  var unwrap5 = /* @__PURE__ */ unwrap();
  var when4 = /* @__PURE__ */ when(applicativeEffect);
  var not2 = /* @__PURE__ */ not(/* @__PURE__ */ heytingAlgebraFunction(/* @__PURE__ */ heytingAlgebraFunction(heytingAlgebraBoolean)));
  var identity11 = /* @__PURE__ */ identity(categoryFn);
  var bind15 = /* @__PURE__ */ bind(bindAff);
  var liftEffect6 = /* @__PURE__ */ liftEffect(monadEffectAff);
  var map26 = /* @__PURE__ */ map(functorEffect);
  var bindFlipped9 = /* @__PURE__ */ bindFlipped(bindEffect);
  var substInParent = function(v) {
    return function(v1) {
      return function(v2) {
        if (v1 instanceof Just && v2 instanceof Just) {
          return $$void6(insertBefore(v)(v1.value0)(v2.value0));
        }
        ;
        if (v1 instanceof Nothing && v2 instanceof Just) {
          return $$void6(appendChild(v)(v2.value0));
        }
        ;
        return pure18(unit);
      };
    };
  };
  var removeChild3 = function(v) {
    return function __do4() {
      var npn = parentNode2(v.node)();
      return traverse_7(function(pn) {
        return removeChild2(v.node)(pn);
      })(npn)();
    };
  };
  var mkSpec = function(handler3) {
    return function(renderChildRef) {
      return function(document3) {
        var getNode = unRenderStateX(function(v) {
          return v.node;
        });
        var done = function(st) {
          if (st instanceof Just) {
            return halt(st.value0);
          }
          ;
          return unit;
        };
        var buildWidget2 = function(spec) {
          var buildThunk2 = buildThunk(unwrap5)(spec);
          var $lazy_patch = $runtime_lazy9("patch", "Halogen.VDom.Driver", function() {
            return function(st, slot7) {
              if (st instanceof Just) {
                if (slot7 instanceof ComponentSlot) {
                  halt(st.value0);
                  return $lazy_renderComponentSlot(100)(slot7.value0);
                }
                ;
                if (slot7 instanceof ThunkSlot) {
                  var step$prime = step(st.value0, slot7.value0);
                  return mkStep(new Step2(extract2(step$prime), new Just(step$prime), $lazy_patch(103), done));
                }
                ;
                throw new Error("Failed pattern match at Halogen.VDom.Driver (line 97, column 22 - line 103, column 79): " + [slot7.constructor.name]);
              }
              ;
              return $lazy_render(104)(slot7);
            };
          });
          var $lazy_render = $runtime_lazy9("render", "Halogen.VDom.Driver", function() {
            return function(slot7) {
              if (slot7 instanceof ComponentSlot) {
                return $lazy_renderComponentSlot(86)(slot7.value0);
              }
              ;
              if (slot7 instanceof ThunkSlot) {
                var step4 = buildThunk2(slot7.value0);
                return mkStep(new Step2(extract2(step4), new Just(step4), $lazy_patch(89), done));
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 84, column 7 - line 89, column 75): " + [slot7.constructor.name]);
            };
          });
          var $lazy_renderComponentSlot = $runtime_lazy9("renderComponentSlot", "Halogen.VDom.Driver", function() {
            return function(cs) {
              var renderChild = read(renderChildRef)();
              var rsx = renderChild(cs)();
              var node = getNode(rsx);
              return mkStep(new Step2(node, Nothing.value, $lazy_patch(117), done));
            };
          });
          var patch2 = $lazy_patch(91);
          var render7 = $lazy_render(82);
          var renderComponentSlot = $lazy_renderComponentSlot(109);
          return render7;
        };
        var buildAttributes = buildProp(handler3);
        return {
          buildWidget: buildWidget2,
          buildAttributes,
          document: document3
        };
      };
    };
  };
  var renderSpec = function(document3) {
    return function(container) {
      var render7 = function(handler3) {
        return function(child) {
          return function(v) {
            return function(v1) {
              if (v1 instanceof Nothing) {
                return function __do4() {
                  var renderChildRef = $$new(child)();
                  var spec = mkSpec(handler3)(renderChildRef)(document3);
                  var machine = buildVDom(spec)(v);
                  var node = extract2(machine);
                  $$void6(appendChild(node)(toNode2(container)))();
                  return {
                    machine,
                    node,
                    renderChildRef
                  };
                };
              }
              ;
              if (v1 instanceof Just) {
                return function __do4() {
                  write(child)(v1.value0.renderChildRef)();
                  var parent2 = parentNode2(v1.value0.node)();
                  var nextSib = nextSibling(v1.value0.node)();
                  var machine$prime = step(v1.value0.machine, v);
                  var newNode = extract2(machine$prime);
                  when4(not2(unsafeRefEq)(v1.value0.node)(newNode))(substInParent(newNode)(nextSib)(parent2))();
                  return {
                    machine: machine$prime,
                    node: newNode,
                    renderChildRef: v1.value0.renderChildRef
                  };
                };
              }
              ;
              throw new Error("Failed pattern match at Halogen.VDom.Driver (line 157, column 5 - line 173, column 80): " + [v1.constructor.name]);
            };
          };
        };
      };
      return {
        render: render7,
        renderChild: identity11,
        removeChild: removeChild3,
        dispose: removeChild3
      };
    };
  };
  var runUI2 = function(component2) {
    return function(i2) {
      return function(element3) {
        return bind15(liftEffect6(map26(toDocument)(bindFlipped9(document2)(windowImpl))))(function(document3) {
          return runUI(renderSpec(document3)(element3))(component2)(i2);
        });
      };
    };
  };

  // output/Main/index.js
  var bind11 = /* @__PURE__ */ bind(bindAff);
  var mainComponent4 = /* @__PURE__ */ mainComponent3(monadAffAff);
  var main2 = /* @__PURE__ */ runHalogenAff(/* @__PURE__ */ bind11(/* @__PURE__ */ liftEffect(monadEffectAff)(/* @__PURE__ */ readCookie("stage")))(function(stageCookie) {
    var stage = stageFromMbStr(stageCookie);
    return bind11(awaitBody)(function(body2) {
      return runUI2(mainComponent4)(stage)(body2);
    });
  }));

  // <stdin>
  main2();
})();
