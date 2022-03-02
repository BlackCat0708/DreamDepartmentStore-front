(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["adminorders"],{"860c":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"adminOrders"}},[a("h1",{staticClass:"management-title"},[t._v("交易管理")]),a("div",{staticClass:"order-container"},[a("b-table",{ref:"table",attrs:{data:t.orders,striped:!0,hoverable:!0},scopedSlots:t._u([{key:"empty",fn:function(){return[a("div",{staticClass:"has-text-centered"},[t._v("沒有委託紀錄")])]},proxy:!0}])},[a("b-table-column",{attrs:{label:"委託者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/member/"+e.row.user._id}},[a("div",{staticClass:"user-headshot"},[a("img",{attrs:{src:e.row.user.headshot}})]),a("span",[t._v(t._s(e.row.user.nickname))])])]}}])}),a("b-table-column",{attrs:{label:"創作者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/member/"+e.row.illustrator._id}},[a("div",{staticClass:"user-headshot"},[a("img",{attrs:{src:e.row.illustrator.headshot}})]),a("span",[t._v(t._s(e.row.illustrator.nickname))])])]}}])}),a("b-table-column",{attrs:{label:"委託項目"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/products/"+e.row.product._id}},[a("span",[t._v(t._s(e.row.product.name))])])]}}])}),a("b-table-column",{attrs:{label:"委託單內容",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{staticClass:"edit",on:{click:function(a){return t.open(e.index)}}},[a("b-icon",{attrs:{pack:"fas",icon:"envelope"}})],1)]}}])}),a("b-table-column",{attrs:{label:"狀態",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[!0===e.row.cancel?a("span",[t._v("創作者取消")]):t._e(),!0===e.row.finish?a("span",[t._v("委託完成")]):t._e(),!1===e.row.finish&&!0===e.row.accept?a("span",[t._v("委託進行中")]):t._e(),!1===e.row.finish&&!1===e.row.accept&&!1===e.row.cancel?a("span",[t._v("待創作者回應中")]):t._e()]}}])})],1)],1),a("b-modal",{attrs:{width:"700px",scroll:"keep"},model:{value:t.openModal,callback:function(e){t.openModal=e},expression:"openModal"}},[a("div",{staticClass:"normal-form"},[a("div",{staticClass:"modal-red"},[a("h1",[t._v("委託單內容")])]),a("div",{staticClass:"modal-white"},[a("div",{staticClass:"modal-items"},[a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 需求描述")]),a("p",[t._v(t._s(t.modal.description))])]),a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 參考圖")]),t._l(t.modal.images,(function(t){return a("div",{key:t,staticClass:"modal-images"},[a("img",{attrs:{src:t}})])}))],2),a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 參考資料來源")]),a("p",[t._v(t._s(t.modal.source))])]),a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 委託時間")]),a("p",[t._v(t._s(new Date(t.modal.date).toLocaleString("zh-tw")))])])])])])])],1)},r=[],o=a("1da1"),n=a("5530"),i=(a("96cf"),{data:function(){return{openModal:!1,orders:[],modal:{description:"",images:[],source:"",date:""}}},methods:{open:function(t){this.modal=Object(n["a"])({},this.orders[t]),this.openModal=!0}},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.api.get("/orders/all",{headers:{authorization:"Bearer "+t.user.token}});case 3:a=e.sent,s=a.data,t.orders=s.result,e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),t.$swal({icon:"error",title:"錯誤",text:"取得交易紀錄失敗"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()}}),l=i,c=a("2877"),d=Object(c["a"])(l,s,r,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=adminorders.aa156c90.js.map