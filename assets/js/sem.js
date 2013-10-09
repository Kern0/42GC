!function(a,b,c,d){a.fn.form=function(b,e){var f,g=a(this),h=a.extend(!0,{},a.fn.form.settings,e),i=a.extend({},a.fn.form.settings.defaults,b),j=h.namespace,k=h.metadata,l=h.selector,m=h.className,n=h.error,o="."+j,p="module-"+j,q=g.selector||"",r=(new Date).getTime(),s=[],t=arguments[0],u="string"==typeof t,v=[].slice.call(arguments,1);return g.each(function(){var b,e=a(this),j=a(this).find(l.field),w=a(this).find(l.group),x=a(this).find(l.message),y=(a(this).find(l.prompt),a(this).find(l.submit)),z=[],A=this,B=e.data(p);b={initialize:function(){b.verbose("Initializing form validation",e,i,h),h.keyboardShortcuts&&j.on("keydown"+o,b.event.field.keydown),e.on("submit"+o,b.validate.form),j.on("blur"+o,b.event.field.blur),y.on("click"+o,b.submit),j.on(b.get.changeEvent()+o,b.event.field.change),b.instantiate()},instantiate:function(){b.verbose("Storing instance of module",b),B=b,e.data(p,b)},destroy:function(){b.verbose("Destroying previous module",B),e.off(o).removeData(p)},refresh:function(){b.verbose("Refreshing selector cache"),j=e.find(l.field)},submit:function(){b.verbose("Submitting form",e),e.submit()},event:{field:{keydown:function(c){var d=a(this),e=c.which,f={enter:13,escape:27};return e==f.escape&&(b.verbose("Escape key pressed blurring field"),d.blur()),!c.ctrlKey&&e==f.enter&&d.is(l.input)?(b.debug("Enter key pressed, submitting form"),y.addClass(m.down),d.one("keyup"+o,b.event.field.keyup),c.preventDefault(),!1):void 0},keyup:function(){b.verbose("Doing keyboard shortcut form submit"),y.removeClass(m.down),b.submit()},blur:function(){var c=a(this),d=c.closest(w);d.hasClass(m.error)?(b.debug("Revalidating field",c,b.get.validation(c)),b.validate.field(b.get.validation(c))):("blur"==h.on||"change"==h.on)&&b.validate.field(b.get.validation(c))},change:function(){var c=a(this),d=c.closest(w);d.hasClass(m.error)?(b.debug("Revalidating field",c,b.get.validation(c)),b.validate.field(b.get.validation(c))):"change"==h.on&&b.validate.field(b.get.validation(c))}}},get:{changeEvent:function(){return c.createElement("input").oninput!==d?"input":c.createElement("input").onpropertychange!==d?"propertychange":"keyup"},field:function(c){return b.verbose("Finding field with identifier",c),j.filter("#"+c).size()>0?j.filter("#"+c):j.filter('[name="'+c+'"]').size()>0?j.filter('[name="'+c+'"]'):j.filter("[data-"+k.validate+'="'+c+'"]').size()>0?j.filter("[data-"+k.validate+'="'+c+'"]'):a("<input/>")},validation:function(c){var d;return a.each(i,function(a,e){b.get.field(e.identifier).get(0)==c.get(0)&&(d=e)}),d||!1}},has:{field:function(a){return b.verbose("Checking for existence of a field with identifier",a),j.filter("#"+a).size()>0?!0:j.filter('[name="'+a+'"]').size()>0?!0:j.filter("[data-"+k.validate+'="'+a+'"]').size()>0?!0:!1}},add:{prompt:function(c,e){var f=b.get.field(c.identifier),g=f.closest(w),i=g.find(l.prompt),j=0!==i.size();b.verbose("Adding inline error",c),g.addClass(m.error),h.inline&&(j||(i=h.templates.prompt(e),i.appendTo(g)),i.html(e[0]),j||(h.transition&&a.fn.transition!==d?(b.verbose("Displaying error with css transition",h.transition),i.transition(h.transition+" in",h.duration)):(b.verbose("Displaying error with fallback javascript animation"),i.fadeIn(h.duration))))},errors:function(a){b.debug("Adding form error messages",a),x.html(h.templates.error(a))}},remove:{prompt:function(c){var e=b.get.field(c.identifier),f=e.closest(w),g=f.find(l.prompt);f.removeClass(m.error),h.inline&&g.is(":visible")&&(b.verbose("Removing prompt for field",c),h.transition&&a.fn.transition!==d?g.transition(h.transition+" out",h.duration,function(){g.remove()}):g.fadeOut(h.duration,function(){g.remove()}))}},validate:{form:function(c){var d=!0;return z=[],a.each(i,function(a,c){b.validate.field(c)||(d=!1)}),d?(b.debug("Form has no validation errors, submitting"),e.removeClass(m.error).addClass(m.success),a.proxy(h.onSuccess,this)(c),void 0):(b.debug("Form has errors"),e.addClass(m.error),h.inline||b.add.errors(z),a.proxy(h.onFailure,this)(z))},field:function(c){var e=b.get.field(c.identifier),f=!0,g=[];return c.rules!==d&&a.each(c.rules,function(a,d){b.has.field(c.identifier)&&!b.validate.rule(c,d)&&(b.debug("Field is invalid",c.identifier,d.type),g.push(d.prompt),f=!1)}),f?(b.remove.prompt(c,g),a.proxy(h.onValid,e)(),!0):(z=z.concat(g),b.add.prompt(c,g),a.proxy(h.onInvalid,e)(g),!1)},rule:function(c,f){var g,i,j=b.get.field(c.identifier),k=f.type,l=j.val(),m=/\[(.*?)\]/i,n=m.exec(k),o=!0;return n!==d&&null!==n?(g=n[1],i=k.replace(n[0],""),o=a.proxy(h.rules[i],e)(l,g)):o=a.proxy(h.rules[k],j)(l),o}},setting:function(c,e){return b.debug("Changing setting",c,e),e===d?h[c]:(a.isPlainObject(c)?a.extend(!0,h,c):h[c]=e,void 0)},internal:function(c,e){return b.debug("Changing internal",c,e),e===d?b[c]:(a.isPlainObject(c)?a.extend(!0,b,c):b[c]=e,void 0)},debug:function(){h.debug&&(h.performance?b.performance.log(arguments):(b.debug=Function.prototype.bind.call(console.info,console,h.name+":"),b.debug.apply(console,arguments)))},verbose:function(){h.verbose&&h.debug&&(h.performance?b.performance.log(arguments):(b.verbose=Function.prototype.bind.call(console.info,console,h.name+":"),b.verbose.apply(console,arguments)))},error:function(){b.error=Function.prototype.bind.call(console.error,console,h.name+":"),b.error.apply(console,arguments)},performance:{log:function(a){var c,d,e;h.performance&&(c=(new Date).getTime(),e=r||c,d=c-e,r=c,s.push({Element:A,Name:a[0],Arguments:[].slice.call(a,1)||"","Execution Time":d})),clearTimeout(b.performance.timer),b.performance.timer=setTimeout(b.performance.display,100)},display:function(){var c=h.name+":",e=0;r=!1,clearTimeout(b.performance.timer),a.each(s,function(a,b){e+=b["Execution Time"]}),c+=" "+e+"ms",q&&(c+=" '"+q+"'"),g.size()>1&&(c+=" ("+g.size()+")"),(console.group!==d||console.table!==d)&&s.length>0&&(console.groupCollapsed(c),console.table?console.table(s):a.each(s,function(a,b){console.log(b.Name+": "+b["Execution Time"]+"ms")}),console.groupEnd()),s=[]}},invoke:function(c,e,g){var h,i,j;return e=e||v,g=A||g,"string"==typeof c&&B!==d&&(c=c.split(/[\. ]/),h=c.length-1,a.each(c,function(e,f){var g=e!=h?f+c[e+1].charAt(0).toUpperCase()+c[e+1].slice(1):c;if(a.isPlainObject(B[f])&&e!=h)B=B[f];else{if(!a.isPlainObject(B[g])||e==h)return B[f]!==d?(i=B[f],!1):B[g]!==d?(i=B[g],!1):(b.error(n.method),!1);B=B[g]}})),a.isFunction(i)?j=i.apply(g,e):i!==d&&(j=i),a.isArray(f)?f.push(j):"string"==typeof f?f=[f,j]:j!==d&&(f=j),i}},u?(B===d&&b.initialize(),b.invoke(t)):(B!==d&&b.destroy(),b.initialize())}),f!==d?f:this},a.fn.form.settings={name:"Form",namespace:"form",debug:!0,verbose:!0,performance:!0,keyboardShortcuts:!0,on:"submit",inline:!1,transition:"scale",duration:150,onValid:function(){},onInvalid:function(){},onSuccess:function(){return!0},onFailure:function(){return!1},metadata:{validate:"validate"},selector:{message:".error.message",field:"input, textarea, select",group:".field",input:"input",prompt:".prompt",submit:".submit"},className:{error:"error",success:"success",down:"down",label:"ui label prompt"},error:{method:"The method you called is not defined."},templates:{error:function(b){var c='<ul class="list">';return a.each(b,function(a,b){c+="<li>"+b+"</li>"}),c+="</ul>",a(c)},prompt:function(b){return a("<div/>").addClass("ui red pointing prompt label").html(b[0])}},rules:{checked:function(){return a(this).filter(":checked").size()>0},empty:function(a){return!(a===d||""===a)},email:function(a){var b=new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");return b.test(a)},length:function(a,b){return a!==d?a.length>=b:!1},not:function(a,b){return a!=b},contains:function(a,b){return-1!==a.search(b)},is:function(a,b){return a==b},maxLength:function(a,b){return a!==d?a.length<=b:!1},match:function(b,c){var e,f=a(this);return f.find("#"+c).size()>0?e=f.find("#"+c).val():f.find("[name="+c+"]").size()>0?e=f.find("[name="+c+"]").val():f.find('[data-validate="'+c+'"]').size()>0&&(e=f.find('[data-validate="'+c+'"]').val()),e!==d?b.toString()==e.toString():!1},url:function(a){var b=/(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;return b.test(a)}}}}(jQuery,window,document);