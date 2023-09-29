!function($){"use strict";(new function(){var e=this;this.init=function(){window.ppFormRecaptchaLoadCallback=this.recaptcha_processing,$(".pp-del-profile-avatar").on("click",this.delete_avatar),$(".pp-del-cover-image").on("click",this.delete_profile_image_cover),$(document).on("click",".has-password-visibility-icon .pp-form-material-icons",this.toggle_password_visibility),$(document.body).on("click","a.showlogin",(function(){$(".pp_wc_login").slideToggle()})),$(window).on("load resize ppress_updated_checkout",(function(){e.defaultUserProfileResponsive()})),$(document).on("click",".ppress-confirm-delete",(function(e){e.preventDefault(),confirm(pp_ajax_form.confirm_delete)&&(window.location.href=$(this).attr("href"))})),"true"!==pp_ajax_form.disable_ajax_form&&($(document).on("submit",'form[data-pp-form-submit="login"]',this.ajax_login),$(document).on("submit",'form[data-pp-form-submit="signup"]',this.ajax_registration),$(document).on("submit",'form[data-pp-form-submit="passwordreset"]',this.ajax_password_reset),$(document).on("submit",'form[data-pp-form-submit="editprofile"]',this.ajax_edit_profile))},this.recaptcha_processing=function(){$(".pp-g-recaptcha").each((function(s,t){var r=$(t).attr("data-sitekey"),o=$(this).parents(".pp-form-container").find("form");if("v3"===$(t).attr("data-type"))o.find("input.pp-submit-form").on("click",(function(s){s.preventDefault(),e._add_processing_label(o),grecaptcha.ready((function(){grecaptcha.execute(r,{action:"form"}).then((function(e){o.find('[name="g-recaptcha-response"]').remove(),o.append($("<input>",{type:"hidden",value:e,name:"g-recaptcha-response"})),o.submit()}))}))}));else{var p=grecaptcha.render(t,{sitekey:r,theme:$(t).attr("data-theme"),size:$(t).attr("data-size")});o.on("pp_form_submitted",(function(){grecaptcha.reset(p)})),$(document).on("ppress_process_checkout_success_callback ppress_process_checkout_error_callback",(function(){grecaptcha.reset(p)}))}}))},this.toggle_password_visibility=function(e){e.preventDefault();var s=$(this).parents(".pp-form-field-input-textarea-wrap").find(".pp-form-field");"password"===s.attr("type")?(s.attr("type","text"),$(this).text("visibility_off")):(s.attr("type","password"),$(this).text("visibility"))},this.ajax_edit_profile=function(s){if(void 0!==window.FormData&&window.FormData){s.preventDefault();var t=$('form[data-pp-form-submit="editprofile"]'),r=e.get_melange_id(t),o=new FormData(this);o.append("action","pp_ajax_editprofile"),o.append("nonce",pp_ajax_form.nonce),o.append("melange_id",r),$(".profilepress-edit-profile-status").remove(),$(".profilepress-edit-profile-success").remove(),""!==window.edit_profile_msg_class&&$("."+window.edit_profile_msg_class).remove(),e._add_processing_label(t),$.post({url:pp_ajax_form.ajaxurl,data:o,cache:!1,contentType:!1,enctype:"multipart/form-data",processData:!1,dataType:"json",success:function(s){t.trigger("pp_form_submitted"),t.trigger("pp_form_edit_profile_success",[t]),"avatar_url"in s&&""!==s.avatar_url&&($("img[data-del='avatar'], img.pp-user-avatar").attr("src",s.avatar_url),$("input[name=eup_avatar]",t).val("")),"cover_image_url"in s&&""!==s.cover_image_url&&($("img[data-del='cover-image'], img.pp-user-cover-image").attr("src",s.cover_image_url),$("input[name=eup_cover_image]",t).val(""),$(".profilepress-myaccount-has-cover-image",t).show(),$(".profilepress-myaccount-cover-image-empty",t).hide()),"message"in s&&(window.edit_profile_msg_class=$(s.message).attr("class"),t.before(s.message)),"redirect"in s&&(t.trigger("pp_edit_profile_success_before_redirect"),window.location.assign(s.redirect)),e._remove_processing_label(t)}},"json")}},this.ajax_password_reset=function(s){s.preventDefault();var t=$(this),r=e.get_melange_id(t),o="true"===t.find('input[name="is-pp-tab-widget"]').val(),p={action:"pp_ajax_passwordreset",data:$(this).serialize()+"&melange_id="+r};e._remove_status_notice(),t.parents(".pp-tab-widget-form").prev(".pp-tab-status").remove(),e._add_processing_label(t),$.post(pp_ajax_form.ajaxurl,p,(function(s){if(t.trigger("pp_form_submitted"),"object"!=typeof s)return e._remove_processing_label(t);if("message"in s){if(t.trigger("pp_password_reset_status"),o){var r=s.message.replace("profilepress-reset-status","pp-tab-status");t.parents(".pp-tab-widget-form").before(r)}else t.parents(".lucidContainer").length>0?t.parents(".lucidContainer").before(s.message):t.before(s.message);"status"in s&&!0===s.status&&t.hide(),$('input[name="user_login"]',t).val("")}e._remove_processing_label(t)}),"json")},this.ajax_registration=function(s){if(void 0!==window.FormData&&window.FormData){s.preventDefault();var t=$(this),r=e.get_melange_id(t),o=new FormData(this),p="true"===t.find('input[name="is-pp-tab-widget"]').val();o.append("action","pp_ajax_signup"),o.append("melange_id",r),e._remove_status_notice(),t.parents(".pp-tab-widget-form").prev(".pp-tab-status").remove(),e._add_processing_label(t),$.post({url:pp_ajax_form.ajaxurl,data:o,cache:!1,contentType:!1,enctype:"multipart/form-data",processData:!1,dataType:"json",success:function(s){if(t.trigger("pp_form_submitted"),"object"!=typeof s)return e._remove_processing_label(t);if("message"in s)if(t.trigger("pp_registration_error",[s]),t.trigger("pp_registration_ajax_response",[s]),p){var r=s.message.replace("profilepress-reg-status","pp-tab-status");t.parents(".pp-tab-widget-form").before(r)}else t.parents(".lucidContainer").length>0?t.parents(".lucidContainer").before(s.message):t.before(s.message);else"redirect"in s&&(t.trigger("pp_registration_success",[s]),window.location.assign(s.redirect));e._remove_processing_label(t)}})}},this.ajax_login=function(s){s.preventDefault();var t=$(this),r={action:"pp_ajax_login",data:$(this).serialize()},o="true"===t.find('input[name="is-pp-tab-widget"]').val();e._remove_status_notice(),e._add_processing_label(t),$.post(pp_ajax_form.ajaxurl,r,(function(s){if(t.trigger("pp_form_submitted"),null===s||"object"!=typeof s)return e._remove_processing_label(t);if("success"in s&&!0===s.success&&"redirect"in s)t.trigger("pp_login_form_success"),window.location.assign(s.redirect);else if(t.trigger("pp_login_form_error"),"code"in s&&"pp2fa_auth_code_invalid"==s.code&&t.find(".pp-2fa").show(),o){var r=s.message.replace("profilepress-login-status","pp-tab-status");t.parents(".pp-tab-widget-form").before(r)}else t.parents(".lucidContainer").length>0?t.parents(".lucidContainer").before(s.message):t.before(s.message);e._remove_processing_label(t)}),"json")},this.delete_avatar=function(e){e.preventDefault();var s=$(this).text(),t=$(this);e.preventDefault(),confirm(pp_ajax_form.confirm_delete)&&(t.is("button")&&t.text(pp_ajax_form.deleting_text),$.post(pp_ajax_form.ajaxurl,{action:"pp_del_avatar",nonce:pp_ajax_form.nonce}).done((function(e){"error"in e&&"nonce_failed"===e.error?(t.text(s),alert(pp_ajax_form.deleting_error)):"success"in e&&($("img[data-del='avatar']").attr("src",e.default),t.remove())})))},this.delete_profile_image_cover=function(e){e.preventDefault();var s=$(this).text(),t=$(this);e.preventDefault(),confirm(pp_ajax_form.confirm_delete)&&(t.is("button")&&t.text(pp_ajax_form.deleting_text),$.post(pp_ajax_form.ajaxurl,{action:"pp_del_cover_image",nonce:pp_ajax_form.nonce}).done((function(e){"error"in e&&"nonce_failed"===e.error&&(t.text(s),alert(pp_ajax_form.deleting_error)),"success"in e&&(""!==e.default?($("img[data-del='cover-image']").attr("src",e.default),t.parent().find(".profilepress-myaccount-has-cover-image").show(),t.parent().find(".profilepress-myaccount-cover-image-empty").hide()):(t.parent().find(".profilepress-myaccount-has-cover-image").hide(),t.parent().find(".profilepress-myaccount-cover-image-empty").show()),t.remove())})))},this.get_melange_id=function(e){var s=$("input.pp_melange_id",e).val();return void 0===s?"":s},this._add_processing_label=function(e){var s=e.find("input[data-pp-submit-label]");s.attr({value:s.data("pp-processing-label"),disabled:"disabled"}).css("opacity",".4")},this._remove_processing_label=function(e){var s=e.find("input[data-pp-submit-label]");s.attr("value",s.data("pp-submit-label")),s.attr({value:s.data("pp-submit-label"),disabled:null}).css("opacity","")},this._remove_status_notice=function(){$(".profilepress-login-status,.pp-tab-status,.profilepress-edit-profile-success,.profilepress-edit-profile-status,.pp-reset-success,.profilepress-reset-status,.profilepress-reg-status").remove()},this.defaultUserProfileResponsive=function(){$(".ppress-default-profile, .pp-member-directory, .ppress-checkout__form").each((function(){var e=$(this),s=e.width();s<=340?(e.removeClass("ppressui340"),e.removeClass("ppressui500"),e.removeClass("ppressui800"),e.removeClass("ppressui768"),e.removeClass("ppressui960"),e.addClass("ppressui340")):s<=500?(e.removeClass("ppressui340"),e.removeClass("ppressui500"),e.removeClass("ppressui768"),e.removeClass("ppressui800"),e.removeClass("ppressui960"),e.addClass("ppressui500")):s<=768?(e.removeClass("ppressui340"),e.removeClass("ppressui500"),e.removeClass("ppressui768"),e.removeClass("ppressui800"),e.removeClass("ppressui960"),e.addClass("ppressui768")):s<=800?(e.removeClass("ppressui340"),e.removeClass("ppressui500"),e.removeClass("ppressui768"),e.removeClass("ppressui800"),e.removeClass("ppressui960"),e.addClass("ppressui800")):s<=960?(e.removeClass("ppressui340"),e.removeClass("ppressui500"),e.removeClass("ppressui768"),e.removeClass("ppressui800"),e.removeClass("ppressui960"),e.addClass("ppressui960")):s>960&&(e.removeClass("ppressui340"),e.removeClass("ppressui500"),e.removeClass("ppressui768"),e.removeClass("ppressui800"),e.removeClass("ppressui960")),e.css("opacity",1)})),$(".ppress-default-profile-cover, .ppress-default-profile-cover-e").each((function(){var e=$(this),s=Math.round(e.width()/e.data("ratio"))+"px";e.height(s),e.find(".ppress-dpf-cover-add").height(s)}))}}).init(),(new function(){let e=this;window.ppressCheckoutForm=this,this.init=function(){"0"!==pp_ajax_form.is_checkout&&0!==$("#ppress_checkout_main_form").length&&($(document).on("click",".ppress-checkout-show-login-form",this.toggle_login_form),$(document).on("click",'.ppress-login-submit-btn input[type="submit"]',this.process_login),$(document).on("click",".ppress-coupon-code-link",this.toggle_discount_code_reveal),$(document).on("click",".ppress-apply-discount-btn",this.apply_discount_code),$(document).on("click","#ppress-remove-applied-coupon",this.remove_applied_discount_code),$(document).on("submit","#ppress_mb_checkout_form",this.process_checkout),$(document).on("click",".ppress-terms-and-conditions-link",(function(e){var s=$(".ppress-checkout-form__terms_condition__content");s.length>0&&(e.preventDefault(),s.slideToggle())})),$(document).on("ppress_update_checkout",this.update_checkout),"1"===pp_ajax_form.is_checkout_tax_enabled?$(document).on("change","#ppress_mb_checkout_form .ppress_billing_country, #ppress_mb_checkout_form .ppress_billing_state, #ppress_mb_checkout_form .ppress_vat_number",e.debounce((function(){$(document.body).trigger("ppress_update_checkout")}),200)):$(document).on("change","#ppress_mb_checkout_form .ppress_billing_country",e.contextual_state_field),$(document.body).on("change","#ppress_checkout_payment_methods [name=ppress_payment_method]",(function(){$(document.body).trigger("ppress_update_checkout")})),$(document.body).on("change","#ppress_mb_checkout_form [name=group_selector]",(function(){e.update_checkout()})),$(document.body).trigger("ppress_update_checkout"),$(document).ajaxError((function(){e.remove_spinner()})))},this.debounce=function(e,s){let t;return s=s||600,function(){clearTimeout(t),t=setTimeout((function(){e()}),s)}},this.contextual_state_field=function(){let e=$(".ppress_billing_state"),s={action:"ppress_contextual_state_field",country:$(this).val(),name:e.prop("name"),id:e.prop("id"),class:e.prop("class"),csrf:$("#ppress_checkout_nonce").val()};$.post(pp_ajax_form.ajaxurl,s,(function(s){e.replaceWith(s.data)}))},this.scroll_to_notices=function(e){(e=e||$(".ppress-checkout-alert")).length&&$("html, body").animate({scrollTop:e.offset().top-100},1e3)},this.update_checkout=function(s){s=s||!1;let t=$("#ppress_mb_checkout_form [name=group_selector]").length>0;e.removeAllAlerts(),e.add_spinner();let r={action:"ppress_update_order_review",plan_id:$("#ppress-checkout-plan-id").val(),ppress_payment_method:$("#ppress_checkout_payment_methods [name=ppress_payment_method]:checked").val(),csrf:$("#ppress_checkout_nonce").val(),address:$(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_address").val(),city:$(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_city").val(),country:$(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_country").val(),state:$(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_state").val(),postcode:$(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_postcode").val(),phone:$(".ppress-checkout-form__payment_method.ppress-active .ppress_billing_phone").val(),vat_number:$("#ppress_checkout_main_form .ppress_vat_number").val(),post_data:$("#ppress_mb_checkout_form").serialize()};!0===t&&(r.isChangePlanUpdate="true"),$.post(pp_ajax_form.ajaxurl,r,(function(o){let p={};if($(".ppress-checkout-form__payment_method :input").each((function(){let e=$(this).attr("id");e&&(-1!==$.inArray($(this).attr("type"),["checkbox","radio"])?p[e]=$(this).prop("checked"):p[e]=$(this).val())})),"data"in o&&void 0!==o.data.fragments&&($.each(o.data.fragments,(function(s,t){e.fragments&&e.fragments[s]===t||$(s).replaceWith(t)})),e.fragments=r.fragments),$.isEmptyObject(p)||$(".ppress-checkout-form__payment_method :input").each((function(){let e=$(this).attr("id");e&&(-1!==$.inArray($(this).attr("type"),["checkbox","radio"])?$(this).prop("checked",p[e]):($.inArray($(this).attr("type"),["select"]),$(this).val(p[e])))})),"success"in o&&!1===o.success){let e=$("#ppress_checkout_main_form");o.data&&e.prepend(o.data),e.find(".input-text, select, input:checkbox").trigger("blur")}$(document.body).trigger("ppress_updated_checkout",[o]);let a,i=$(".ppress-checkout_order_summary__bottom_details");(a=$(".ppress-checkout-alert")).length>0&&(i=a),e.scroll_to_notices(i),e.remove_spinner(),!0===t&&!0!==s&&e.update_checkout(!0)}))},this.toggle_login_form=function(e){e.preventDefault(),$("#ppress_checkout_account_info .ppress-main-checkout-form__login_form_wrap").slideToggle()},this.toggle_discount_code_reveal=function(e){e.preventDefault(),$("#ppress-checkout-coupon-code-wrap").slideToggle()},this.apply_discount_code=function(s){s.preventDefault(),e.removeAllAlerts(),e.add_spinner();let t={action:"ppress_checkout_apply_discount",plan_id:$("#ppress-checkout-plan-id").val(),coupon_code:$("#apply-discount").val(),ppress_checkout_nonce:$("#ppress_checkout_nonce").val()};$.post(pp_ajax_form.ajaxurl,t,(function(s){"success"in s&&!0===s.success?$(document.body).trigger("ppress_update_checkout"):($(".ppress-checkout_order_summary-wrap").before(s.data),e.remove_spinner())}))},this.remove_applied_discount_code=function(s){s.preventDefault(),e.removeAllAlerts(),e.add_spinner();let t={action:"ppress_checkout_remove_discount",plan_id:$("#ppress-checkout-plan-id").val(),ppress_checkout_nonce:$("#ppress_checkout_nonce").val()};$.post(pp_ajax_form.ajaxurl,t,(function(s){"success"in s&&!0===s.success?$(document.body).trigger("ppress_update_checkout"):($(".ppress-checkout_order_summary-wrap").before(s.data),e.remove_spinner())}))},this.process_login=function(s){s.preventDefault(),e.removeAllAlerts(),e.add_spinner();let t={action:"ppress_process_checkout_login",ppmb_user_login:$("#ppress_mb_checkout_form #ppmb_user_login").val(),ppmb_user_pass:$("#ppress_mb_checkout_form #ppmb_user_pass").val(),ppress_checkout_nonce:$("#ppress_checkout_nonce").val()};$.post(pp_ajax_form.ajaxurl,t,(function(s){"success"in s&&(!0===s.success?window.location.reload():"data"in s&&$("#ppress_mb_checkout_form .ppress-login-submit-btn").prepend(s.data)),e.remove_spinner()}))},this.process_checkout=function(s){if("function"!=typeof this.checkValidity||!1!==this.checkValidity()){s.preventDefault(),e.removeAllAlerts(),e.add_spinner();var t=$(this),r=e.get_payment_method();if(!1!==t.triggerHandler("ppress_checkout_place_order_"+r)){let s=new FormData(this);s.append("action","ppress_process_checkout"),s.append("ppress_checkout_nonce",$("#ppress_checkout_nonce").val()),$.post({url:pp_ajax_form.ajaxurl,data:s,cache:!1,contentType:!1,enctype:"multipart/form-data",processData:!1,dataType:"json",success:function(s){if($(document.body).trigger("ppress_process_checkout_success_callback",[s]),"success"in s)return!0===s.success?void(!1!==t.triggerHandler("ppress_process_checkout_"+r,[s,r])&&("redirect_url"in s&&void 0!==s.redirect_url&&s.redirect_url.length>0?window.location.assign(s.redirect_url):($(document.body).trigger("ppress_checkout_success",[s,r]),window.location.assign(s.order_success_url)))):"error_message"in s?e.createAlertMessage(s.error_message):"data"in s&&"string"==typeof s.data?e.createAlertMessage(s.data):void 0;e.remove_spinner()},error:function(s,t,r){$(document.body).trigger("ppress_process_checkout_error_callback",[s,t,r]),e.createAlertMessage(r)}},"json")}}},this.get_payment_method=function(){return $("#ppress_mb_checkout_form").find('input[name="ppress_payment_method"]:checked').val()},this.createAlertMessage=function(e,s){s=s||"error";var t=void 0!==e.indexOf&&-1!==e.indexOf("ppress-checkout-alert"),r="";t||(r='<div class="ppress-checkout-alert ppress-'+s+'"><p>'),r+=e,t||(r+="</p></div>"),$("#ppress_checkout_main_form").prepend(r),ppressCheckoutForm.scroll_to_notices(),ppressCheckoutForm.remove_spinner(),$(document.body).trigger("ppress_checkout_error",[e])},this.removeAllAlerts=function(){$(".ppress-checkout-alert").remove()},this.add_spinner=function(){e.remove_spinner(),$(".ppress-checkout__form").prepend('<div class="ppress-checkout__form__preloader"><div class="ppress-checkout__form__spinner"></div></div>')},this.remove_spinner=function(){$(".ppress-checkout__form .ppress-checkout__form__preloader").remove()},this.is_var_defined=function(e){return null!=e},this.get_obj_val=function(e,s){return this.is_var_defined(e)&&""!==e?e:s}}).init()}(jQuery);