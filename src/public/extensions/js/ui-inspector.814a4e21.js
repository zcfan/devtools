(function(e){function t(t){for(var n,c,s=t[0],d=t[1],a=t[2],u=0,b=[];u<s.length;u++)c=s[u],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&b.push(o[c][0]),o[c]=0;for(n in d)Object.prototype.hasOwnProperty.call(d,n)&&(e[n]=d[n]);l&&l(t);while(b.length)b.shift()();return i.push.apply(i,a||[]),r()}function r(){for(var e,t=0;t<i.length;t++){for(var r=i[t],n=!0,s=1;s<r.length;s++){var d=r[s];0!==o[d]&&(n=!1)}n&&(i.splice(t--,1),e=c(c.s=r[0]))}return e}var n={},o={"ui-inspector":0},i=[];function c(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.e=function(){return Promise.resolve()},c.m=e,c.c=n,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(r,n,function(t){return e[t]}.bind(null,n));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/extensions/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],d=s.push.bind(s);s.push=t,s=s.slice();for(var a=0;a<s.length;a++)t(s[a]);var l=d;i.push([2,"chunk-vendors","chunk-common"]),r()})({"133e":function(e,t,r){},2:function(e,t,r){e.exports=r("81a5")},"32b2":function(e,t,r){},"5f35":function(e,t,r){"use strict";r("133e")},"81a5":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("7a23"),o=r("7864"),i={class:"ui-inspector-wrapper"},c={class:"sider-bar"},s=["onClick"];function d(e,t,r,o,d,a){var l=Object(n["S"])("el-tooltip"),u=Object(n["S"])("multipane-resizer"),b=Object(n["S"])("multipane");return Object(n["J"])(),Object(n["m"])("div",i,[Object(n["n"])("div",c,[(Object(n["J"])(!0),Object(n["m"])(n["b"],null,Object(n["Q"])(e.panes,(function(t,r){return Object(n["J"])(),Object(n["k"])(l,{key:r,effect:"dark",content:t.tip,placement:"right"},{default:Object(n["hb"])((function(){return[Object(n["n"])("div",{class:"pane-thumb",onClick:function(r){return e.togglePane(t.id)}},[Object(n["n"])("i",{class:Object(n["z"])([t.icon,e.showConfig[t.showKey]?"pane-showed":""]),style:Object(n["A"])({fontWeight:e.showConfig[t.showKey]?"500":"400"})},null,6)],8,s)]})),_:2},1032,["content"])})),128))]),Object(n["q"])(b,{class:"custom-resizer",layout:"vertical",onPaneResizeStop:e.onPaneResizeStop},{default:Object(n["hb"])((function(){return[(Object(n["J"])(!0),Object(n["m"])(n["b"],null,Object(n["Q"])(e.visiablePanes,(function(e,t){return Object(n["J"])(),Object(n["m"])(n["b"],{key:t},[0!==t?(Object(n["J"])(),Object(n["k"])(u,{key:0,id:"resizer-"+t},null,8,["id"])):Object(n["l"])("",!0),(Object(n["J"])(),Object(n["k"])(Object(n["U"])(e.component),{class:"pane-wrap",style:Object(n["A"])(e.style)},null,8,["style"]))],64)})),128))]})),_:1},8,["onPaneResizeStop"])])}r("4de4"),r("7db0");var a=r("5502"),l=r("a1d2"),u={class:"screenshot-wrap",ref:"screenshotRef"},b={class:"action-bar"},p=["src"];function m(e,t,r,o,i,c){var s,d,a,l,m=Object(n["S"])("loading"),f=Object(n["S"])("el-icon"),h=Object(n["S"])("refresh"),O=Object(n["S"])("el-tooltip"),v=Object(n["S"])("top-left");return Object(n["J"])(),Object(n["m"])("div",u,[Object(n["n"])("div",b,[Object(n["q"])(O,{class:"item",effect:"dark",content:"refresh",placement:"bottom"},{default:Object(n["hb"])((function(){return[e.isRefreshing?(Object(n["J"])(),Object(n["k"])(f,{key:0,class:"is-loading action-btn",size:20},{default:Object(n["hb"])((function(){return[Object(n["q"])(m)]})),_:1})):(Object(n["J"])(),Object(n["k"])(f,{key:1,class:"action-btn",size:20,onClick:e.update},{default:Object(n["hb"])((function(){return[Object(n["q"])(h)]})),_:1},8,["onClick"]))]})),_:1}),Object(n["q"])(O,{class:"item",effect:"dark",content:"select DOM/render node",placement:"bottom"},{default:Object(n["hb"])((function(){return[Object(n["q"])(f,{class:"action-btn",size:20,color:e.selectIconColor,onClick:e.toggleSelectMode},{default:Object(n["hb"])((function(){return[Object(n["q"])(v)]})),_:1},8,["color","onClick"])]})),_:1})]),Object(n["n"])("div",{class:"screenshot-img-wrap",style:{width:"100%"},onClickCapture:t[0]||(t[0]=function(){return e.selectNode&&e.selectNode.apply(e,arguments)})},[Object(n["n"])("img",{src:e.screenshot,style:{width:"100%"}},null,8,p),Object(n["n"])("div",{class:"node-bounds margin-wrap",style:Object(n["A"])(null===(s=e.selectedNodeBounds)||void 0===s?void 0:s.marginBounds)},null,4),Object(n["n"])("div",{class:"node-bounds border-wrap",style:Object(n["A"])(null===(d=e.selectedNodeBounds)||void 0===d?void 0:d.borderBounds)},null,4),Object(n["n"])("div",{class:"node-bounds padding-wrap",style:Object(n["A"])(null===(a=e.selectedNodeBounds)||void 0===a?void 0:a.paddingBounds)},null,4),Object(n["n"])("div",{class:"node-bounds content-wrap",style:Object(n["A"])(null===(l=e.selectedNodeBounds)||void 0===l?void 0:l.contentBounds)},null,4)],32)],512)}r("96cf"),r("4795"),r("d3b7"),r("3ca3"),r("ddb0");var f,h,O,v=r("9ab4"),j=r("b98b"),g=r("f2fe"),y=r("76b2"),T=(r("4160"),r("159b"),r("b64b"),r("c975"),r("0e44")),R=r("27d7"),S=r("79f6"),w=r("cde6"),D=r("feed"),x=r("a313"),k=r("480e"),N=Object(k["b"])(k["a"].uiInspector),E={format:"jpeg",quality:66,maxWidth:720,maxHeight:1440};(function(e){e["ScreenshotImg"]="screenshotImg"})(f||(f={})),function(e){e["UpdateDomTree"]="updateDomTree",e["UpdateRenderTree"]="updateRenderTree",e["UpdateScreenshot"]="updateScreenshot",e["SelectDomNode"]="selectDomNode",e["SelectRenderNode"]="selectRenderNode",e["ToggleSelectMode"]="toggleSelectMode",e["SetDomExpandedKeys"]="setDomExpandedKeys",e["SetRenderExpandedKeys"]="setRenderExpandedKeys",e["SetVisibility"]="setVisibility",e["SetSupportDomTree"]="setSupportDomTree",e["SetSupportRenderTree"]="setSupportRenderTree",e["UpdateDomTreeError"]="updateDomTreeError",e["UpdateRenderTreeError"]="updateRenderTreeError",e["SetRefreshing"]="setRefreshing"}(h||(h={})),function(e){e["GetDomTree"]="getDomTree",e["GetRenderTree"]="getRenderTree",e["GetScreenshot"]="getScreenshot",e["GetSelectedRenderObject"]="getSelectedRenderObject",e["GegisterDomTreeUpdatedListener"]="registerDomTreeUpdatedListener",e["GegisterRenderTreeUpdatedListener"]="registerRenderTreeUpdatedListener",e["GegisterScreenshotUpdatedListener"]="registerScreenshotUpdatedListener"}(O||(O={}));var U={getters:f,mutations:h,actions:O},K="ui_inspector_vuex",_=Object(a["a"])({plugins:[Object(T["a"])({key:K,paths:["showScreenshot","showDomTree","showRenderTree","showAttribute"]})],state:{screenshot:void 0,domTree:void 0,renderTree:void 0,selectedDomNode:void 0,selectedRenderNode:void 0,screenshotBoundType:void 0,isSelectMode:!1,domExpandedKeys:[],renderExpandedKeys:[],showScreenshot:!0,showDomTree:!0,showRenderTree:!0,showAttribute:!0,getDomTreeError:!1,getRenderTreeError:!1,isRefreshing:!1,isSupportDomTree:!0,isSupportRenderTree:!0},getters:{screenshotImg:function(e){var t,r;return(null===(t=e.screenshot)||void 0===t?void 0:t.data)?"data:image/png;base64,".concat(null===(r=e.screenshot)||void 0===r?void 0:r.data):""}},mutations:{updateDomTree:function(e,t){e.domTree=t},updateRenderTree:function(e,t){e.renderTree=t},updateScreenshot:function(e,t){e.screenshot=t},selectDomNode:function(e,t){e.selectedDomNode=t,e.screenshotBoundType=x["f"].DOM},selectRenderNode:function(e,t){t&&(e.selectedRenderNode||(e.selectedRenderNode={}),Object.keys(t).forEach((function(r){e.selectedRenderNode[r]=t[r]})),e.screenshotBoundType=x["f"].Render)},toggleSelectMode:function(e){e.isSelectMode=!e.isSelectMode},setDomExpandedKeys:function(e,t){e.domExpandedKeys=t},setRenderExpandedKeys:function(e,t){e.renderExpandedKeys=t},setVisibility:function(e,t){var r=t.key,n=t.value;-1!==["showScreenshot","showDomTree","showRenderTree","showAttribute"].indexOf(r)&&(e[r]=n)},setSupportDomTree:function(e,t){e.isSupportDomTree=t},setSupportRenderTree:function(e,t){e.isSupportRenderTree=t},updateDomTreeError:function(e,t){e.getDomTreeError=t},updateRenderTreeError:function(e,t){e.getRenderTreeError=t},setRefreshing:function(e,t){e.isRefreshing=t}},actions:{getDomTree:function(e){var t=e.commit,r=e.state;return Object(v["a"])(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S["g"])();case 3:n=e.sent,t(U.mutations.UpdateDomTree,n.result),t(U.mutations.UpdateDomTreeError,!1),e.next=14;break;case 8:e.prev=8,e.t0=e["catch"](0),D["a"].error(e.t0),e.t0.error.code===x["b"].NotSupportDomTree&&r.showDomTree&&(Object(o["b"])({title:e.t0.error.message,type:x["c"].error}),t(U.mutations.SetVisibility,{key:"showDomTree",value:!1}),t(U.mutations.SetSupportDomTree,!1)),t(U.mutations.UpdateDomTree,void 0),t(U.mutations.UpdateDomTreeError,!0);case 14:case"end":return e.stop()}}),e,null,[[0,8]])})))},getRenderTree:function(e){var t=e.commit,r=e.state;return Object(v["a"])(this,void 0,void 0,regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S["i"])();case 3:n=e.sent,t(U.mutations.UpdateRenderTree,n.result),t(U.mutations.UpdateRenderTreeError,!1),e.next=14;break;case 8:e.prev=8,e.t0=e["catch"](0),D["a"].error(e.t0),e.t0.error.code===x["b"].NotSupportDomTree&&r.showRenderTree&&(Object(o["b"])({title:e.t0.error.message,type:x["c"].error}),t(U.mutations.SetVisibility,{key:"showRenderTree",value:!1}),t("setSupportRenderTree",!1)),t(U.mutations.UpdateDomTree,void 0),t(U.mutations.UpdateRenderTreeError,!0);case 14:case"end":return e.stop()}}),e,null,[[0,8]])})))},getScreenshot:function(e){var t=e.commit;return Object(v["a"])(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(S["j"])(E);case 3:r=e.sent,t(U.mutations.UpdateScreenshot,r.result),e.next=11;break;case 7:e.prev=7,e.t0=e["catch"](0),D["a"].error(e.t0),Object(o["b"])({title:"获取截图失败",type:x["c"].error});case 11:case"end":return e.stop()}}),e,null,[[0,7]])})))},getSelectedRenderObject:function(e,t){var r,n=e.state,i=e.commit;return Object(v["a"])(this,void 0,void 0,regeneratorRuntime.mark((function e(){var c,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.hadFetchedDetailInfo){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,e.next=5,Object(S["k"])({id:t.id});case 5:if(c=e.sent,null===(r=c.result.rtree)||void 0===r?void 0:r.properties){e.next=8;break}return e.abrupt("return");case 8:delete c.result.rtree.child,s=Object(w["b"])(c.result.rtree.properties),i(U.mutations.SelectRenderNode,Object.assign(Object.assign(Object.assign({},n.selectedRenderNode||{}),s),{hadFetchedDetailInfo:!0})),e.next=17;break;case 13:e.prev=13,e.t0=e["catch"](2),D["a"].error(e.t0),Object(o["b"])({title:"获取Render Object失败",type:x["c"].error});case 17:case"end":return e.stop()}}),e,null,[[2,13]])})))},registerDomTreeUpdatedListener:function(e){var t=e.commit;N.addEventListener(R["l"].TDFInspectorDomTreeUpdated,(function(e){t(U.mutations.UpdateDomTree,e.params),t(U.mutations.UpdateDomTreeError,!1)}))},registerRenderTreeUpdatedListener:function(e){var t=e.commit;N.addEventListener(R["l"].TDFInspectorRenderTreeUpdated,(function(e){t(U.mutations.UpdateRenderTree,e.params),t(U.mutations.UpdateRenderTreeError,!1)}))},registerScreenshotUpdatedListener:function(e){var t=e.commit;N.addEventListener(R["l"].TDFInspectorScreenshotUpdated,(function(e){t(U.mutations.UpdateScreenshot,e.params)}))}},modules:{}}),C=r("d257"),M=Object(n["r"])({name:"Screenshot",components:{Refresh:j["a"],TopLeft:g["a"],Loading:y["a"]},setup:function(){var e=Object(n["O"])(null),t=Object(a["b"])(),r=function(){var r,n=(null===(r=e.value)||void 0===r?void 0:r.clientWidth)||0,o=t.state.screenshot||{},i=o.metadata;i=void 0===i?{deviceHeight:void 0,deviceWidth:void 0}:i;var c=i.deviceHeight,s=i.deviceWidth;return n*c/s},o=Object(n["i"])((function(){var n,o,i,c,s,d;if(t.state.screenshot){var a=null===(n=t.state.domTree)||void 0===n?void 0:n.itree,l=null===(o=t.state.renderTree)||void 0===o?void 0:o.rtree;if(t.state.screenshotBoundType===x["f"].DOM&&a){if(!(null===(i=t.state.selectedDomNode)||void 0===i?void 0:i.bounds))return;var u=a.width,b=a.height,p=(null===(c=e.value)||void 0===c?void 0:c.clientWidth)||0,m=r();return Object(C["b"])(t.state.selectedDomNode,{rootWidth:u,rootHeight:b,imgHeight:m,imgWidth:p})}if(t.state.screenshotBoundType===x["f"].Render&&l){if(!(null===(s=t.state.selectedRenderNode)||void 0===s?void 0:s.bounds))return;var f=l.bounds,h=f.left,O=f.right,v=f.top,j=f.bottom,g=O-h,y=j-v,T=(null===(d=e.value)||void 0===d?void 0:d.clientWidth)||0,R=r();return Object(C["d"])(t.state.selectedRenderNode,{rootWidth:g,rootHeight:y,imgHeight:R,imgWidth:T})}return{marginBounds:{},borderBounds:{},paddingBounds:{},contentBounds:{}}}})),i=function(n){var o,i,c,s,d;if(t.state.isSelectMode){var a=(null===(o=e.value)||void 0===o?void 0:o.clientWidth)||0,l=r(),u=null===(c=null===(i=t.state)||void 0===i?void 0:i.renderTree)||void 0===c?void 0:c.rtree,b=null===(d=null===(s=t.state)||void 0===s?void 0:s.domTree)||void 0===d?void 0:d.itree;if(b){var p=b.width,m=b.height,f=Object(C["c"])({x:n.offsetX,y:n.offsetY},b,{rootWidth:p,rootHeight:m,imgHeight:l,imgWidth:a});if(f.length){var h=f[f.length-1];t.commit("selectDomNode",h),t.commit("setDomExpandedKeys",[h.id])}}if(u){var O=u.bounds,v=O.left,j=O.right,g=O.top,y=O.bottom,T=j-v,R=y-g,S=Object(C["c"])({x:n.offsetX,y:n.offsetY},u,{rootWidth:T,rootHeight:R,imgHeight:l,imgWidth:a});if(S.length){var w=S[S.length-1];t.commit("selectRenderNode",w),t.commit("setRenderExpandedKeys",[w.id]),t.dispatch("getSelectedRenderObject",w)}}}};return{screenshotRef:e,screenshot:Object(n["i"])((function(){return t.getters.screenshotImg})),isRefreshing:Object(n["i"])((function(){return t.state.isRefreshing})),isSupportDomTree:Object(n["i"])((function(){return t.state.isSupportDomTree})),selectedNodeBounds:o,selectIconColor:Object(n["i"])((function(){var e=function(e){return getComputedStyle(document.documentElement).getPropertyValue(e)};return t.state.isSelectMode?e("--el-color-primary"):e("--color-text-primary")})),selectNode:i}},methods:{update:function(){return Object(v["a"])(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t,r=this;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return Object(S["c"])(E),this.$store.commit("setRefreshing",!0),t=setTimeout((function(){r.$store.commit("setRefreshing",!1),Object(o["b"])({title:"获取数据超时",type:x["c"].error})}),4e3),e.next=5,Promise.all([this.isSupportDomTree?this.$store.dispatch("getDomTree"):Promise.resolve(),this.$store.dispatch("getRenderTree"),this.$store.dispatch("getScreenshot")]);case 5:this.$store.commit("setRefreshing",!1),clearTimeout(t);case 7:case"end":return e.stop()}}),e,this)})))},toggleSelectMode:function(){this.$store.commit("toggleSelectMode")}}}),P=(r("a1fa"),r("6b0d")),z=r.n(P);const J=z()(M,[["render",m],["__scopeId","data-v-d62f17c8"]]);var A=J,B={class:"attr-wrap"};function I(e,t,r,o,i,c){var s=Object(n["S"])("attr-form"),d=Object(n["S"])("multipane-resizer"),a=Object(n["S"])("multipane");return Object(n["J"])(),Object(n["m"])("div",B,[Object(n["q"])(a,{class:"custom-resizer",layout:"horizontal",onPaneResizeStop:e.onPaneResizeStop},{default:Object(n["hb"])((function(){return[Object(n["n"])("div",{ref:"pane0Ref",class:"attr-sub-pane-wrap dom-pane",style:Object(n["A"])({display:e.showDomTree?"block":"none"})},[Object(n["q"])(s,{node:e.selectedDomNode,"title-class":"action-bar",title:"DOM Node"},null,8,["node"])],4),Object(n["q"])(d,{style:Object(n["A"])({display:e.showDomTree&&e.showRenderTree?"block":"none"})},null,8,["style"]),Object(n["n"])("div",{class:"attr-sub-pane-wrap",style:Object(n["A"])([{flex:"1"},{display:e.showRenderTree?"block":"none"}])},[Object(n["q"])(s,{node:e.selectedRenderNode,"title-class":"action-bar",title:"Render Node"},null,8,["node"])],4)]})),_:1},8,["onPaneResizeStop"])])}var L={key:2,class:"no-node"};function W(e,t,r,o,i,c){var s=Object(n["S"])("el-input"),d=Object(n["S"])("attr-form",!0),a=Object(n["S"])("el-form-item"),l=Object(n["S"])("el-form");return Object(n["J"])(),Object(n["m"])(n["b"],null,[e.title?(Object(n["J"])(),Object(n["m"])("div",{key:0,class:Object(n["z"])([e.titleClass,"title"])},Object(n["W"])(e.title),3)):Object(n["l"])("",!0),e.node?(Object(n["J"])(),Object(n["k"])(l,{key:1,class:"attr-form",size:"mini",model:e.node,disabled:!0,"label-position":"left","label-width":"120px"},{default:Object(n["hb"])((function(){return[(Object(n["J"])(!0),Object(n["m"])(n["b"],null,Object(n["Q"])(Object.keys(e.node),(function(t){return Object(n["J"])(),Object(n["k"])(a,{class:Object(n["z"])([e.node[t]instanceof Object?"form-in-form":""]),label:t,key:t},{default:Object(n["hb"])((function(){return[e.node[t]instanceof Object?(Object(n["J"])(),Object(n["k"])(d,{key:1,node:e.node[t]},null,8,["node"])):(Object(n["J"])(),Object(n["k"])(s,{key:0,"model-value":String(e.node[t])},null,8,["model-value"]))]})),_:2},1032,["class","label"])})),128))]})),_:1},8,["model"])):(Object(n["J"])(),Object(n["m"])("div",L,"未选择节点"))],64)}var q=Object(n["r"])({name:"AttrForm",components:{},props:["node","title","titleClass"]});r("b067");const G=z()(q,[["render",W],["__scopeId","data-v-daf8f70a"]]);var H=G,V=r("d988"),F="ui_inspector_attr_pane_0_height",$=Object(n["r"])({name:"Attribute",components:{AttrForm:H,Multipane:l["a"],MultipaneResizer:l["b"]},setup:function(){var e=Object(a["b"])(),t=localStorage.getItem(F)||"50%",r=Object(n["O"])(null),o=Object(n["Z"])(e.state),i=o.showDomTree,c=o.showRenderTree;Object(n["G"])((function(){c.value?r.value.style.height=t:r.value.style.height="100%"}));var s=function(e,t){0===e&&localStorage.setItem(F,t)};return{selectedDomNode:Object(n["i"])((function(){if(e.state.selectedDomNode){var t=e.state.selectedDomNode,r=Object.assign(Object.assign({},t),{flexNodeStyle:Object.assign(Object.assign({},t.flexNodeStyle),{margin:Object(V["d"])(t.flexNodeStyle.margin),padding:Object(V["d"])(t.flexNodeStyle.padding),border:Object.assign(Object.assign({},Object(V["a"])(t.flexNodeStyle.border)),{color:t.borderColor})})});return delete r.child,r}})),selectedRenderNode:Object(n["i"])((function(){if(e.state.selectedRenderNode){var t=Object.assign({},e.state.selectedRenderNode);return delete t.child,t}})),onPaneResizeStop:s,pane0Ref:r,showDomTree:i,showRenderTree:c}}});r("a141");const Q=z()($,[["render",I],["__scopeId","data-v-746ff158"]]);var X=Q,Y=Object(n["n"])("div",{class:"action-bar"},"Dom Tree",-1);function Z(e,t,r,o,i,c){var s=Object(n["S"])("el-tree");return Object(n["J"])(),Object(n["m"])("div",null,[Y,Object(n["q"])(s,{data:e.tree,"empty-text":e.emptyText,props:e.treeProps,"node-key":"id",ref:"treeRef","default-expanded-keys":e.defaultExpandedKeys,"expand-on-click-node":!1,"highlight-current":"",onNodeClick:e.onNodeClick},null,8,["data","empty-text","props","default-expanded-keys","onNodeClick"])])}var ee=Object(n["r"])({name:"DomTree",components:{},setup:function(){var e=Object(n["O"])(null),t=Object(a["b"])();return{tree:Object(n["i"])((function(){var e,r=null===(e=t.state.domTree)||void 0===e?void 0:e.itree;return r?[r]:null})),treeProps:{label:"nodeType",children:"child"},defaultExpandedKeys:Object(n["i"])((function(){var r,n=t.state,o=n.isSelectMode,i=n.domExpandedKeys;return o&&i.length?(null===(r=e.value)||void 0===r||r.setCurrentKey(i[0]),i):[]})),treeRef:e,emptyText:Object(n["i"])((function(){return t.state.getDomTreeError?"获取DOM树失败":"no data"})),onNodeClick:function(r){var n;null===(n=e.value)||void 0===n||n.setCurrentKey(r.id),t.commit("selectDomNode",r),t.commit("setDomExpandedKeys",[])}}},methods:{}});const te=z()(ee,[["render",Z]]);var re=te,ne=Object(n["n"])("div",{class:"action-bar"},"Render Tree",-1);function oe(e,t,r,o,i,c){var s=Object(n["S"])("el-tree");return Object(n["J"])(),Object(n["m"])("div",null,[ne,Object(n["q"])(s,{data:e.tree,props:e.treeProps,"empty-text":e.emptyText,"node-key":"id",ref:"treeRef","default-expanded-keys":e.defaultExpandedKeys,"expand-on-click-node":!1,"highlight-current":"",onNodeClick:e.onNodeClick},null,8,["data","props","empty-text","default-expanded-keys","onNodeClick"])])}var ie=Object(n["r"])({name:"RenderTree",components:{},setup:function(){var e=Object(n["O"])(null),t=Object(a["b"])();return{tree:Object(n["i"])((function(){var e,r=null===(e=t.state.renderTree)||void 0===e?void 0:e.rtree;return r?[r]:null})),treeProps:{label:"name",children:"child"},defaultExpandedKeys:Object(n["i"])((function(){var r,n=t.state,o=n.isSelectMode,i=n.renderExpandedKeys;return o&&i.length?(null===(r=e.value)||void 0===r||r.setCurrentKey(i[0]),i):[]})),treeRef:e,emptyText:Object(n["i"])((function(){return t.state.getRenderTreeError?"获取render树失败":"no data"})),onNodeClick:function(r){var n;null===(n=e.value)||void 0===n||n.setCurrentKey(r.id),t.commit("selectRenderNode",r),t.commit("setRenderExpandedKeys",[]),t.dispatch("getSelectedRenderObject",r)}}},methods:{}});const ce=z()(ie,[["render",oe]]);var se=ce,de=(r("46dc"),Object(n["r"])({name:"App",components:{Multipane:l["a"],MultipaneResizer:l["b"],Screenshot:A,Attribute:X,DomTree:re,RenderTree:se},setup:function(){var e=Object(a["b"])();e.dispatch(U.actions.GetDomTree),e.dispatch(U.actions.GetRenderTree),e.dispatch(U.actions.GetScreenshot),e.dispatch(U.actions.GegisterDomTreeUpdatedListener),e.dispatch(U.actions.GegisterRenderTreeUpdatedListener),e.dispatch(U.actions.GegisterScreenshotUpdatedListener),Object(S["c"])(E);var t=Object(n["O"])([{id:1,component:Object(n["V"])(A),style:{width:"25%"},showKey:"showScreenshot",tip:"Screenshot",icon:"el-icon-mobile-phone"},{id:2,component:Object(n["V"])(re),style:{width:"25%"},showKey:"showDomTree",tip:"DOM",icon:"el-icon-grape"},{id:3,component:Object(n["V"])(se),style:{width:"25%"},showKey:"showRenderTree",tip:"Render",icon:"el-icon-grape"},{id:4,component:Object(n["V"])(X),style:{flex:1},showKey:"showAttribute",tip:"Attribute",icon:"el-icon-menu"}]),r=Object(n["i"])((function(){return t.value.filter((function(t){return e.state[t.showKey]}))})),o=function(n){var o=t.value.find((function(e){return e.id===n})),i=r.value,c=i[i.length-1],s=i[i.length-2],d=c.id===n,a=e.state[o.showKey],l=!a&&o.id>c.id;d&&(s.style={flex:1}),l&&(o.style={flex:1},1===c.style.flex&&(c.style={width:"25%"})),e.commit(U.mutations.SetVisibility,{key:null===o||void 0===o?void 0:o.showKey,value:!a})},i=function(e,t){r.value[e].style.width=t};return{panes:t,visiablePanes:r,togglePane:o,onPaneResizeStop:i,showConfig:Object(n["i"])((function(){return{showScreenshot:e.state.showScreenshot,showDomTree:e.state.showDomTree,showRenderTree:e.state.showRenderTree,showAttribute:e.state.showAttribute}}))}},beforeDestroy:function(){Object(S["b"])()}}));r("5f35");const ae=z()(de,[["render",d],["__scopeId","data-v-e9dde978"]]);var le=ae,ue=(r("a471"),r("7dd6"),Object(n["j"])(le));ue.use(o["d"]),ue.use(_).mount("#app")},a141:function(e,t,r){"use strict";r("32b2")},a1fa:function(e,t,r){"use strict";r("da2a")},b067:function(e,t,r){"use strict";r("fb55")},da2a:function(e,t,r){},fb55:function(e,t,r){}});