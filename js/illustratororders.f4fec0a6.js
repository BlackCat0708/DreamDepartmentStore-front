(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["illustratororders"],{a434:function(t,e,a){"use strict";var s=a("23e7"),r=a("da84"),n=a("23cb"),o=a("5926"),i=a("07fa"),l=a("7b0b"),c=a("65f0"),u=a("8418"),d=a("1dde"),p=d("splice"),m=r.TypeError,f=Math.max,b=Math.min,h=9007199254740991,v="Maximum allowed length exceeded";s({target:"Array",proto:!0,forced:!p},{splice:function(t,e){var a,s,r,d,p,_,w=l(this),k=i(w),g=n(t,k),x=arguments.length;if(0===x?a=s=0:1===x?(a=0,s=k-g):(a=x-2,s=b(f(o(e),0),k-g)),k+a-s>h)throw m(v);for(r=c(w,s),d=0;d<s;d++)p=g+d,p in w&&u(r,d,w[p]);if(r.length=s,a<s){for(d=g;d<k-s;d++)p=d+s,_=d+a,p in w?w[_]=w[p]:delete w[_];for(d=k;d>k-s+a;d--)delete w[d-1]}else if(a>s)for(d=k-s;d>g;d--)p=d+s-1,_=d+a-1,p in w?w[_]=w[p]:delete w[_];for(d=0;d<a;d++)w[d+g]=arguments[d+2];return w.length=k-s+a,r}})},ae3a:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"illustratorOrders"}},[a("h1",{staticClass:"management-title"},[t._v("委託邀請")]),a("div",{staticClass:"order-container"},[a("b-table",{attrs:{data:t.orders,striped:!0,hoverable:!0},scopedSlots:t._u([{key:"empty",fn:function(){return[a("div",{staticClass:"has-text-centered"},[t._v("沒有委託紀錄")])]},proxy:!0}])},[a("b-table-column",{attrs:{label:"委託者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/member/"+e.row.user._id}},[a("div",{staticClass:"user-headshot"},[a("img",{attrs:{src:e.row.user.headshot}})]),a("span",[t._v(t._s(e.row.user.nickname))])])]}}])}),a("b-table-column",{attrs:{label:"委託項目",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/products/"+e.row.product._id}},[a("span",[t._v(t._s(e.row.product.name))])])]}}])}),a("b-table-column",{attrs:{label:"委託單內容",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{staticClass:"edit",on:{click:function(a){return t.openContent(e.index)}}},[a("b-icon",{attrs:{pack:"fas",icon:"envelope"}})],1)]}}])}),a("b-table-column",{attrs:{label:"時間",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(new Date(e.row.date).toLocaleString("zh-tw")))])]}}])}),a("b-table-column",{attrs:{label:"動作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"button-group"},[a("b-button",{staticClass:"is-success",on:{click:function(a){return t.accept(e.index)}}},[t._v("接受")]),a("b-button",{staticClass:"is-danger",on:{click:function(a){return t.reject(e.index)}}},[t._v("拒絕")])],1)]}}])})],1)],1),a("h1",{staticClass:"management-title"},[t._v("進行中的委託")]),a("div",{staticClass:"order-container"},[a("b-table",{attrs:{data:t.doing,striped:!0,hoverable:!0},scopedSlots:t._u([{key:"empty",fn:function(){return[a("div",{staticClass:"has-text-centered"},[t._v("沒有委託紀錄")])]},proxy:!0}])},[a("b-table-column",{attrs:{label:"委託者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/member/"+e.row.user._id}},[a("div",{staticClass:"user-headshot"},[a("img",{attrs:{src:e.row.user.headshot}})]),a("span",[t._v(t._s(e.row.user.nickname))])])]}}])}),a("b-table-column",{attrs:{label:"委託項目",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/products/"+e.row.product._id}},[a("span",[t._v(t._s(e.row.product.name))])])]}}])}),a("b-table-column",{attrs:{label:"委託單內容",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{staticClass:"edit",on:{click:function(a){return t.openDoing(e.index)}}},[a("b-icon",{attrs:{pack:"fas",icon:"envelope"}})],1)]}}])}),a("b-table-column",{attrs:{label:"時間",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(new Date(e.row.date).toLocaleString("zh-tw")))])]}}])}),a("b-table-column",{attrs:{label:"動作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("div",{staticClass:"button-group"},[a("b-button",{staticClass:"is-success",on:{click:function(a){return t.finish(e.index)}}},[t._v("完成")])],1)]}}])})],1)],1),a("h1",{staticClass:"management-title"},[t._v("完成的委託")]),a("div",{staticClass:"order-container"},[a("b-table",{attrs:{data:t.finished,striped:!0,hoverable:!0},scopedSlots:t._u([{key:"empty",fn:function(){return[a("div",{staticClass:"has-text-centered"},[t._v("沒有委託紀錄")])]},proxy:!0}])},[a("b-table-column",{attrs:{label:"委託者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/member/"+e.row.user._id}},[a("div",{staticClass:"user-headshot"},[a("img",{attrs:{src:e.row.user.headshot}})]),a("span",[t._v(t._s(e.row.user.nickname))])])]}}])}),a("b-table-column",{attrs:{label:"委託項目",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/products/"+e.row.product._id}},[a("span",[t._v(t._s(e.row.product.name))])])]}}])}),a("b-table-column",{attrs:{label:"委託單內容",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{staticClass:"edit",on:{click:function(a){return t.openFinish(e.index)}}},[a("b-icon",{attrs:{pack:"fas",icon:"envelope"}})],1)]}}])}),a("b-table-column",{attrs:{label:"收到的評論",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[void 0===e.row.review?a("span",[t._v("尚未有評論")]):t._e(),void 0!==e.row.review?a("span",[t._v(t._s(e.row.review))]):t._e()]}}])}),a("b-table-column",{attrs:{label:"收到的評價"},scopedSlots:t._u([{key:"default",fn:function(e){return[void 0===e.row.star?a("span",[t._v("尚未有評價")]):t._e(),void 0!==e.row.star?a("b-rate",{attrs:{max:5,disabled:!0},model:{value:e.row.star,callback:function(a){t.$set(e.row,"star",a)},expression:"props.row.star"}}):t._e()]}}])})],1)],1),a("h1",{staticClass:"management-title"},[t._v("拒絕的委託")]),a("div",{staticClass:"order-container"},[a("b-table",{attrs:{data:t.cancel,striped:!0,hoverable:!0},scopedSlots:t._u([{key:"empty",fn:function(){return[a("div",{staticClass:"has-text-centered"},[t._v("沒有委託紀錄")])]},proxy:!0}])},[a("b-table-column",{attrs:{label:"委託者",width:"200"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/member/"+e.row.user._id}},[a("div",{staticClass:"user-headshot"},[a("img",{attrs:{src:e.row.user.headshot}})]),a("span",[t._v(t._s(e.row.user.nickname))])])]}}])}),a("b-table-column",{attrs:{label:"委託項目",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{staticClass:"link",attrs:{to:"/products/"+e.row.product._id}},[a("span",[t._v(t._s(e.row.product.name))])])]}}])}),a("b-table-column",{attrs:{label:"委託單內容",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("b-button",{staticClass:"edit",on:{click:function(a){return t.openCancel(e.index)}}},[a("b-icon",{attrs:{pack:"fas",icon:"envelope"}})],1)]}}])}),a("b-table-column",{attrs:{label:"時間",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(new Date(e.row.date).toLocaleString("zh-tw")))])]}}])}),a("b-table-column",{attrs:{label:"拒絕原因"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",[t._v(t._s(e.row.reason))])]}}])})],1)],1),a("b-modal",{attrs:{width:"700px",scroll:"keep"},model:{value:t.openModal,callback:function(e){t.openModal=e},expression:"openModal"}},[a("div",{staticClass:"normal-form"},[a("div",{staticClass:"modal-red"},[a("h1",[t._v("委託單內容")])]),a("div",{staticClass:"modal-white"},[a("div",{staticClass:"modal-items"},[a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 需求描述")]),a("p",[t._v(t._s(t.modal.description))])]),a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 參考圖")]),t._l(t.modal.images,(function(t){return a("div",{key:t,staticClass:"modal-images"},[a("img",{attrs:{src:t}})])}))],2),a("div",{staticClass:"modal-item"},[a("h3",[t._v("✦ 參考資料來源")]),a("p",[t._v(t._s(t.modal.source))])])])])])]),a("b-modal",{attrs:{width:"700px",scroll:"keep"},on:{close:t.resetAcceptModal},model:{value:t.acceptModal,callback:function(e){t.acceptModal=e},expression:"acceptModal"}},[a("div",{staticClass:"normal-form"},[a("div",{staticClass:"modal-red"},[a("h1",[t._v("接受委託")])]),a("div",{staticClass:"modal-white"},[a("form",{staticClass:"form-group",on:{submit:function(e){return e.preventDefault(),t.submitAcceptModal.apply(null,arguments)}}},[a("b-field",{attrs:{label:"✦ 匯款方式／資訊"}},[a("b-input",{attrs:{placeholder:"請輸入匯款方式／資訊",type:"textarea"},model:{value:t.form1.payment,callback:function(e){t.$set(t.form1,"payment",e)},expression:"form1.payment"}})],1),a("div",{staticClass:"buttons"},[a("b-button",{staticClass:"is-dark",attrs:{disabled:t.modalSubmitting},on:{click:t.resetAcceptModal}},[t._v("取消")]),a("input",{staticClass:"button is-success submit",attrs:{type:"submit",value:"送出",disabled:t.modalSubmitting}})],1)],1)])])]),a("b-modal",{attrs:{width:"700px",scroll:"keep"},on:{close:t.resetRejectModal},model:{value:t.rejectModal,callback:function(e){t.rejectModal=e},expression:"rejectModal"}},[a("div",{staticClass:"normal-form"},[a("div",{staticClass:"modal-red"},[a("h1",[t._v("拒絕委託")])]),a("div",{staticClass:"modal-white"},[a("form",{staticClass:"form-group",on:{submit:function(e){return e.preventDefault(),t.submitRejectModal.apply(null,arguments)}}},[a("b-field",{attrs:{label:"✦ 拒絕原因"}},[a("b-input",{attrs:{placeholder:"請輸入拒絕的原因",type:"textarea"},model:{value:t.form2.reason,callback:function(e){t.$set(t.form2,"reason",e)},expression:"form2.reason"}})],1),a("div",{staticClass:"buttons"},[a("b-button",{staticClass:"is-dark",attrs:{disabled:t.modalSubmitting},on:{click:t.resetRejectModal}},[t._v("取消")]),a("input",{staticClass:"button is-success submit",attrs:{type:"submit",value:"送出",disabled:t.modalSubmitting}})],1)],1)])])])],1)},r=[],n=a("1da1"),o=a("5530"),i=(a("96cf"),a("a434"),{data:function(){return{orders:[],doing:[],cancel:[],finished:[],openModal:!1,acceptModal:!1,rejectModal:!1,modalSubmitting:!1,form1:{_id:"",payment:"",index:-1},form2:{_id:"",reason:""},modal:{description:"",images:[],source:""}}},methods:{openContent:function(t){this.modal=Object(o["a"])({},this.orders[t]),this.openModal=!0},openDoing:function(t){this.modal=Object(o["a"])({},this.doing[t]),this.openModal=!0},openFinish:function(t){this.modal=Object(o["a"])({},this.finished[t]),this.openModal=!0},openCancel:function(t){this.modal=Object(o["a"])({},this.cancel[t]),this.openModal=!0},submitAcceptModal:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:if(t.preventDefault(),0!==e.form1.payment.length){a.next=4;break}return e.$swal({icon:"error",title:"錯誤",text:"請輸入匯款方式／資訊"}),a.abrupt("return");case 4:return e.modalSubmitting=!0,a.prev=5,a.next=8,e.api.patch("/orders/accept/"+e.form1._id,{payment:e.form1.payment},{headers:{authorization:"Bearer "+e.user.token}});case 8:s=a.sent,r=s.data,e.orders.splice(e.form1.index,1),e.doing.push(r.result),e.$swal({icon:"success",title:"成功",text:"已接受委託"}),a.next=18;break;case 15:a.prev=15,a.t0=a["catch"](5),e.$swal({icon:"error",title:"錯誤",text:"送出失敗"});case 18:e.modalSubmitting=!1,e.acceptModal=!1;case 20:case"end":return a.stop()}}),a,null,[[5,15]])})))()},submitRejectModal:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return t.preventDefault(),e.modalSubmitting=!0,a.prev=2,a.next=5,e.api.patch("/orders/cancel/"+e.form2._id,{reason:e.form2.reason},{headers:{authorization:"Bearer "+e.user.token}});case 5:s=a.sent,r=s.data,e.orders.splice(e.form2.index,1),e.cancel.push(r.result),e.$swal({icon:"success",title:"成功",text:"成功拒絕委託"}),a.next=15;break;case 12:a.prev=12,a.t0=a["catch"](2),e.$swal({icon:"error",title:"錯誤",text:"送出失敗"});case 15:e.modalSubmitting=!1,e.rejectModal=!1;case 17:case"end":return a.stop()}}),a,null,[[2,12]])})))()},finish:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var s,r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,e.api.patch("/orders/finish/"+e.doing[t]._id,{headers:{authorization:"Bearer "+e.user.token}});case 3:s=a.sent,r=s.data,e.doing.splice(t,1),e.finished.push(r.result),e.$swal({icon:"success",title:"成功",text:"已完成委託"}),a.next=13;break;case 10:a.prev=10,a.t0=a["catch"](0),e.$swal({icon:"error",title:"錯誤",text:"操作失敗"});case 13:case"end":return a.stop()}}),a,null,[[0,10]])})))()},accept:function(t){this.form1._id=this.orders[t]._id,this.form1.index=t,this.acceptModal=!0},reject:function(t){this.form2._id=this.orders[t]._id,this.form2.index=t,this.rejectModal=!0},resetAcceptModal:function(t){this.modalSubmitting?t.preventDefault():(this.form1={_id:"",payment:""},this.acceptModal=!1)},resetRejectModal:function(t){this.modalSubmitting?t.preventDefault():(this.form2={_id:"",reason:""},this.rejectModal=!1)}},created:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,s,r,n,o,i,l,c;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.api.get("/orders/illustrator",{headers:{authorization:"Bearer "+t.user.token}});case 3:return a=e.sent,s=a.data,t.orders=s.result,e.next=8,t.api.get("/orders/illustrator/doing",{headers:{authorization:"Bearer "+t.user.token}});case 8:return r=e.sent,n=r.data,t.doing=n.result,e.next=13,t.api.get("/orders/illustrator/cancel",{headers:{authorization:"Bearer "+t.user.token}});case 13:return o=e.sent,i=o.data,t.cancel=i.result,e.next=18,t.api.get("/orders/illustrator/finished",{headers:{authorization:"Bearer "+t.user.token}});case 18:l=e.sent,c=l.data,t.finished=c.result,e.next=26;break;case 23:e.prev=23,e.t0=e["catch"](0),t.$router.push("/");case 26:case"end":return e.stop()}}),e,null,[[0,23]])})))()}}),l=i,c=a("2877"),u=Object(c["a"])(l,s,r,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=illustratororders.f4fec0a6.js.map